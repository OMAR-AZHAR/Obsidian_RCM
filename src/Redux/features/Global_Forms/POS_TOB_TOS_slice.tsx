import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  POS_id: "",
  TOS_id: "",
  TOB_id: "",
};
export const POSSlice = createSlice({
  name: "POSSlice",
  initialState,
  reducers: {
    // Set Value of Place of Service
    SetPOS: (state, action) => {
      state.POS_id = action.payload;
    },
    // Set Value of Type of Service
    SetTOS: (state, action) => {
      state.TOS_id = action.payload;
    },
    // Set Value of Type of Bill
    SetTOB: (state: any, action) => {
      state.TOB_id = localStorage.setItem("TOB_Value", action.payload);
    },
  },
});
export const { SetPOS, SetTOS, SetTOB } = POSSlice.actions;
export default POSSlice.reducer;
