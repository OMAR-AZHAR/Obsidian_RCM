import { createSlice } from "@reduxjs/toolkit";

import API from "../../../Api/ClientApi";

const EditablePayerSlice = createSlice({
  name: "EditablePayerSlice",
  initialState: {
    data: [],
    id: "",
  },
  reducers: {
    getPayerIdfromTable(state, action) {
      state.id = action.payload;
    },
    getPayerDataEdit(state, action) {
      state.data = action.payload;
    },
  },
});
export const {
  getPayerIdfromTable,

  getPayerDataEdit,
} = EditablePayerSlice.actions;
export default EditablePayerSlice.reducer;
// thunk to fetch data of specific practice based on its ID

export function EditPayerFetch(id1: string) {
  return async function EditPayerFetchThunk(
    dispatch: (arg0: {
      payload: any;
      type: "EditablePayerSlice/getPayerDataEdit";
    }) => void
  ) {
    let user = JSON.parse(sessionStorage.getItem("access")!);
    let customerID = JSON.parse(sessionStorage.getItem("customer_id")!);
    await API.get(`customersetup/payer/edit/${id1}`, {
      headers: {
        Authorization: `Bearer ${user}`,
        customer_id: customerID,
      },
    })
      .then(function (response) {
        dispatch(getPayerDataEdit(response.data.data));
      })
      .catch(function (error) {
        console.log("EditablePayerSlice error", error);
      });
  };
}
