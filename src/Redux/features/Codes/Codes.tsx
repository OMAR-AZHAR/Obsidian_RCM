import { createSlice } from "@reduxjs/toolkit";


const Codes = createSlice({
  name: "Codes",
  initialState: {
   procedureCode:"",
   description:"",
  },
  reducers: {
    getProcedureCode(state, action) {
    state.procedureCode = action.payload;
  },
  getDescription(state,action){
    state.description = action.payload;
  }

  },
});
export const {getProcedureCode,getDescription} = Codes.actions;
export default Codes.reducer;

