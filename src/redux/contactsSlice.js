import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { fetchContacts } from './contactsOps.js';

export const selectContacts = (state) => state.contacts.items;

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const handlePending = (state) => ({
  ...state,
  items: [],
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

const handleDeleteContactFulfilled = (state, action) => ({
  ...state,
  items: state.items.filter(({ id }) => id !== action.payload),
  loading: false,
});

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

export const {
  addContact,
  deleteContact,
} = slice.actions;
export const contactsReducer = slice.reducer;
