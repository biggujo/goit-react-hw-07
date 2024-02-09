import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addContactThunk, deleteContactByIdThunk, fetchContactsThunk,
} from './operations';
import { Status } from '../../utils';
import { RootState } from '../store';
import { Contact } from '../../interfaces';

interface ContactsState {
  items: Array<Contact>,
  isLoading: boolean,
  error: string,
  status: Status,
}

const handlePending = (state: RootState) => {
  state.isLoading = true;
  state.status = Status.PENDING;
};

const handleRejected = (state: RootState, action: PayloadAction<string>) => {
  state.isLoading = false;
  state.error = action.payload;
  state.status = Status.REJECTED;
};

const fetchContactsFulfilled = (state: RootState, action: PayloadAction<Array<Contact>>) => {
  state.isLoading = false;
  state.items = action.payload;
  state.error = null;
  state.status = Status.FULFILLED;
};

const handleAddContactFulfilled = (state: RootState, action: PayloadAction<Contact>) => {
  state.isLoading = false;
  state.items.push(action.payload);
  state.error = null;
  state.status = Status.FULFILLED;
};

const handleDeleteContactByIdFulfilled = (state: RootState, action: PayloadAction<{ id: string }>) => {
  state.isLoading = false;

  const index = state.items.findIndex(({ id }: { id: string }) => id === action.payload.id);
  state.items.splice(index, 1);

  state.error = null;
  state.status = Status.FULFILLED;
};

const initialContactsState: ContactsState = {
  items: [],
  isLoading: false,
  error: null,
  status: Status.IDLE,
};

const slice = createSlice({
  name: 'contacts',
  initialState: initialContactsState,
  reducers: undefined,
  extraReducers: (builder) => {
    // @ts-ignore
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
