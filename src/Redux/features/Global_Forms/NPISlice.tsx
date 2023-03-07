import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  NPI_code: "",
};
export const NPISlice = createSlice({
  name: "NPISlice",
  initialState,
  reducers: {
    // Set Value of Place of Service
    SetNPI: (state, action) => {
      state.NPI_code = action.payload;
    },
  },
});
export const { SetNPI } = NPISlice.actions;
export default NPISlice.reducer;
