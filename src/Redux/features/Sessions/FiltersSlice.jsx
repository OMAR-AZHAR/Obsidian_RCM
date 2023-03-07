import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterlabel: 'Today',
  start_date: null,
  end_date: null,
};
export const FiltersSlice = createSlice({
  name: 'SessionsFilters',
  initialState,
  reducers: {
    GetLabel: (state, action) => {
      state.filterlabel = action.payload;
    },
    StartDate: (state, action) => {
      state.start_date = action.payload;
    },
    EndDate: (state, action) => {
      state.end_date = action.payload;
    },
  },
});

export const { GetLabel, StartDate, EndDate } = FiltersSlice.actions;
export default FiltersSlice.reducer;
