import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils';

export const fetchContacts = createAsyncThunk('contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const contacts = await api.fetchContacts();
      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addContact = createAsyncThunk('contacts/addContact',
  async (data, thunkAPI) => {
    try {
      const addedContact = await api.addContact(data);
      return addedContact;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteContact = createAsyncThunk('contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const deletedContact = await api.deleteContact(id);
      return deletedContact;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
