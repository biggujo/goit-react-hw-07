import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlice.js';
import { filterReducer } from './filtersSlice.js';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
  },
});
