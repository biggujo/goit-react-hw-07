import { createSlice } from '@reduxjs/toolkit';
import {
  addContactThunk, deleteContactByIdThunk, fetchContactsThunk,
} from './operations';
import { Status } from './constants';

const handlePending = (state) => {
  state.isLoading = true;
  state.status = Status.PENDING;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  state.status = Status.REJECTED;
};

const fetchContactsFulfilled = (state, action) => {
  state.isLoading = false;
  state.items = action.payload;
  state.error = null;
  state.status = Status.FULFILLED;
};

const handleAddContactFulfilled = (state, action) => {
  state.isLoading = false;
  state.items.push(action.payload);
  state.error = null;
  state.status = Status.FULFILLED;
};

const handleDeleteContactByIdFulfilled = (state, action) => {
  state.isLoading = false;

  const index = state.items.findIndex(({ id }) => id === action.payload.id);
  state.items.splice(index, 1);

  state.error = null;
  state.status = Status.FULFILLED;
};

const slice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    status: Status.IDLE,
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchContactsThunk.pending, handlePending)
    .addCase(fetchContactsThunk.rejected, handleRejected)
    .addCase(fetchContactsThunk.fulfilled, fetchContactsFulfilled)
    .addCase(addContactThunk.pending, handlePending)
    .addCase(addContactThunk.rejected, handleRejected)
    .addCase(addContactThunk.fulfilled, handleAddContactFulfilled)
    .addCase(deleteContactByIdThunk.pending, handlePending)
    .addCase(deleteContactByIdThunk.rejected, handleRejected)
    .addCase(deleteContactByIdThunk.fulfilled,
      handleDeleteContactByIdFulfilled,
    );
  },
});

export const contactsReducer = slice.reducer;
