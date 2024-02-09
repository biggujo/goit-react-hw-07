import { createAsyncThunk } from '@reduxjs/toolkit';
import { Contact } from '../../interfaces';
import api from '../../utils/api';

export const fetchContactsThunk = createAsyncThunk('fetchAll',
  async (_, thunkAPI) => {
    try {
      const contacts: Array<Contact> = await api.fetchContacts();
      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addContactThunk = createAsyncThunk('addContact',
  async (data: Contact, { rejectWithValue }) => {
    try {
      const addedContact = await api.addContact(data);
      return addedContact;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteContactByIdThunk = createAsyncThunk('deleteContact',
  async (id: string, { rejectWithValue }) => {
    try {
      const deletedContact: Contact = await api.deleteContactById(id);
      return deletedContact;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
