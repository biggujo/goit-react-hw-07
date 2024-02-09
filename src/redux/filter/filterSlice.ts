import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PayloadFilter = {
  value: string,
}

const initialFilter: string = '';

const slice = createSlice({
  name: 'filter',
  initialState: initialFilter,
  reducers: {
    setFilter: {
      reducer: (state, action: PayloadAction<PayloadFilter>) => action.payload.value,
      prepare: (value: string) => ({
        payload: {
          value,
        },
      }),
    },
  },
});

export const { setFilter } = slice.actions;
export const filterReducer = slice.reducer;
