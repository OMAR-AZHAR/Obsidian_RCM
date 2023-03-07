import { createSlice } from "@reduxjs/toolkit";

import API from "../../../Api/ClientApi";

const EditableRefProviderSlice = createSlice({
  name: "EditableRefProvider",
  initialState: {
    data: [],
    id: "",
  },
  reducers: {
    getRefProviderIdfromTable(state, action) {
      state.id = action.payload;
    },
    getRefProviderDataEdit(state, action) {
      state.data = action.payload;
    },
  },
});
export const {
  getRefProviderIdfromTable,

  getRefProviderDataEdit,
} = EditableRefProviderSlice.actions;
export default EditableRefProviderSlice.reducer;
// thunk to fetch data of specific practice based on its ID

export function EditRefProviderFetch(id1: string) {
  return async function EditRefProviderFetchThunk(
    dispatch: (arg0: {
      payload: any;
      type: "EditableRefProvider/getRefProviderDataEdit";
    }) => void
  ) {
    let user = JSON.parse(sessionStorage.getItem("access")!);
    let customerID = JSON.parse(sessionStorage.getItem("customer_id")!);
    await API.get(`customersetup/referringprovider/edit/${id1}`, {
      headers: {
        Authorization: `Bearer ${user}`,
        customer_id: customerID,
      },
    })
      .then(function (response) {
        dispatch(getRefProviderDataEdit(response.data.data));
      })
      .catch(function (error) {
        console.log("EditableProv Slice error", error);
      });
  };
}
