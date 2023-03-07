import { createSlice } from "@reduxjs/toolkit";

import API from "../../../Api/ClientApi";

const Patient_EditableSlice = createSlice({
  name: "EditPatient",
  initialState: {
    data: [],
    id: "",
  },
  reducers: {
    getPatientIdfromTable(state, action) {
      state.id = action.payload;
    },
    getPatientDataEdit(state, action) {
      state.data = action.payload;
    },
  },
});
export const {
  getPatientIdfromTable,

  getPatientDataEdit,
} = Patient_EditableSlice.actions;
export default Patient_EditableSlice.reducer;
// thunk to fetch data of specific practice based on its ID

export function EditPatientFetch(id1: string) {
  return async function EditPatientFetchThunk(
    dispatch: (arg0: {
      payload: any;
      type: "EditPatient/getPatientDataEdit";
    }) => void
  ) {
    let user = JSON.parse(sessionStorage.getItem("access")!);
    let customerID = JSON.parse(sessionStorage.getItem("customer_id")!);
    await API.get(`patient/edit/${id1}`, {
      headers: {
        Authorization: `Bearer ${user}`,
        customer_id: customerID,
      },
    })
      .then(function (response) {
        //   if ((response.data = true)) {
        // console.log("the practice edit;", response.data);
        dispatch(getPatientDataEdit(response.data.data));
      })
      .catch(function (error) {
        console.warn("(Editable Patient Slice) the error is", error);
      });
  };
}
