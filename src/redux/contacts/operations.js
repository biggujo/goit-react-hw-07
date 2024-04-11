import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchContactsThunk = createAsyncThunk('fetchAll',
  async (_, thunkAPI) => {
    try {
      const contacts = await api.fetchContacts();
      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addContactThunk = createAsyncThunk('addContact',
  async (data, thunkAPI) => {
    try {
      const addedContact = await api.addContact(data);
      console.log(addedContact);
      return addedContact;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteContactByIdThunk = createAsyncThunk('deleteContact',
  async (id, thunkAPI) => {
    try {
      const deletedContact = await api.deleteContactById(id);
      return deletedContact;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
