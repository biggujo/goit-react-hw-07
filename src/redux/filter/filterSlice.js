import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter: {
      reducer: (state, action) => action.payload.value,
      prepare: (value) => ({
        payload: {
          value,
        },
      }),
    },
  },
});

export const { setFilter } = slice.actions;
export const filterReducer = slice.reducer;
