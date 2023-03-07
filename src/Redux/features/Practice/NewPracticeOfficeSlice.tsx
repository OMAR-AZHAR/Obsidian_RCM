import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  officeName: "",
  officeSequence: "",
  officeNpi: "",
  officeAddress: "",
  officeCity: "",
  officeState: "",
  officeZipCode: "",
  arrayofOffice: [],
};
export const NewPracticeOfficeSlice = createSlice({
  name: "NewOffice",
  initialState,
  reducers: {
    getPractice(state, action) {},
    // getOffices(state, action){
    //     state.officeDetails.push(action.payload);
    // },
    getUser(state: any, action) {
      state.arrayofOffice.push(action.payload);
    },
    getOfficeName(state, action) {
      state.officeName = action.payload;
    },
    getOfficeSequence(state, action) {
      state.officeSequence = action.payload;
    },
    getOfficeNpi(state, action) {
      state.officeNpi = action.payload;
    },
    getOfficeAddress(state, action) {
      state.officeAddress = action.payload;
    },
    getOfficeCity(state, action) {
      state.officeCity = action.payload;
    },
    getOfficeState(state, action) {
      state.officeState = action.payload;
    },
    getOfficeZipCode(state, action) {
      state.officeZipCode = action.payload;
    },
    getArrayofValues(state, action) {},
  },
});
export const {
  // getOffices,
  getOfficeName,
  getOfficeSequence,
  getOfficeNpi,
  getOfficeAddress,
  getOfficeCity,
  getOfficeState,
  getOfficeZipCode,
  getUser,
} = NewPracticeOfficeSlice.actions;
export default NewPracticeOfficeSlice.reducer;
