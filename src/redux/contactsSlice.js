import { createSelector, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './contactsOps.js';
import { selectNameFilter } from './filtersSlice.js';

export const selectContacts = (state) => state.contacts.items;

export const selectLoading = (state) => state.contacts.loading;

export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector([
  selectContacts,
  selectNameFilter,
], (contacts, filter) => {
  const normalizedFilter = filter.toLowerCase();

  return contacts.filter(({ name }) => {
    return name.toLowerCase().includes(normalizedFilter);
  });
});

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const handlePending = (state) => ({
  ...state,
  loading: true,
  error: null,
});

const handleRejected = (state, action) => ({
  ...state,
  loading: false,
  error: action.payload,
});

const handleFetchContactsFulfilled = (state, action) => ({
  ...state,
  items: action.payload,
  loading: false,
});

const handleAddContactFulfilled = (state, action) => ({
  ...state,
  items: [
    ...state.items,
    action.payload,
  ],
  loading: false,
});

const handleDeleteContactFulfilled = (state, action) => {
  return ({
    ...state,
    items: state.items.filter(({ id }) => id !== action.payload.id),
    loading: false,
  });
};

const slice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(fetchContacts.fulfilled, handleFetchContactsFulfilled)
    .addCase(addContact.fulfilled, handleAddContactFulfilled)
    .addCase(deleteContact.fulfilled, handleDeleteContactFulfilled)
    .addMatcher(
      isAnyOf(fetchContacts.pending,
        addContact.pending,
        deleteContact.pending,
      ),
      handlePending,
    )
    .addMatcher(
      isAnyOf(fetchContacts.rejected,
        addContact.rejected,
        deleteContact.rejected,
      ),
      handleRejected,
    );
  },
});

export const contactsReducer = slice.reducer;
