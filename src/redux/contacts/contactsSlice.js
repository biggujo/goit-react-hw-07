import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { nanoid } from 'nanoid';

const initialContactsState = {
  list: [
    {
      id: 'id-1',
      name: 'Rosie Simpson',
      phone: '459-12-56',
    },
    {
      id: 'id-2',
      name: 'Hermione Kline',
      phone: '443-89-12',
    },
    {
      id: 'id-3',
      name: 'Eden Clements',
      phone: '645-17-79',
    },
    {
      id: 'id-4',
      name: 'Annie Copeland',
      phone: '227-91-26',
    },
  ],
};

const slice = createSlice({
  name: 'contacts',
  initialState: initialContactsState,
  reducers: {
    addContact: {
      reducer: (state, action) => {
        state.list.unshift(action.payload.newContact);
      },
      prepare: ({
        name = 'John Smith',
        phone = '555-SMITH',
      }) => ({
        payload: {
          newContact: {
            id: nanoid(),
            name,
            phone,
          },
        },
      }),
    },
    deleteContactById: {
      reducer: (state, action) => {
        const idx = state.list.findIndex(({ id }) => id === action.payload.id);
        state.list.splice(idx, 1);
      },
      prepare: (id) => ({
        payload: {
          id,
        },
      }),
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
};

export const {
  addContact,
  deleteContactById,
} = slice.actions;
export const contactsReducer = persistReducer(persistConfig, slice.reducer);
