import { createSlice } from '@reduxjs/toolkit';

export const selectNameFilter = (state) => state.filter.name;

const initialState = {
  name: '',
};

const slice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilter: {
      reducer: (state, action) => {
        state.name = action.payload.value;
      },
      prepare: (value) => ({
        payload: {
          value,
        },
      }),
    },
  },
});

export const { changeFilter } = slice.actions;
export const filterReducer = slice.reducer;
