import { createSlice } from "@reduxjs/toolkit";

import API from "../../../Api/ClientApi";

const EditableProviderSlice = createSlice({
  name: "EditableProvider",
  initialState: {
    data: [],
    id: "",
  },
  reducers: {
    getProviderIdfromTable(state, action) {
      state.id = action.payload;
    },
    getProviderDataEdit(state, action) {
      state.data = action.payload;
    },
  },
});
export const {
  getProviderIdfromTable,

  getProviderDataEdit,
} = EditableProviderSlice.actions;
export default EditableProviderSlice.reducer;
// thunk to fetch data of specific practice based on its ID

export function EditProviderFetch(id1: string) {
  return async function EditProviderFetchThunk(
    dispatch: (arg0: {
      payload: any;
      type: "EditableProvider/getProviderDataEdit";
    }) => void
  ) {
    let user = JSON.parse(sessionStorage.getItem("access")!);
    let customerID = JSON.parse(sessionStorage.getItem("customer_id")!);
    await API.get(`customersetup/provider/edit/${id1}`, {
      headers: {
        Authorization: `Bearer ${user}`,
        customer_id: customerID,
      },
    })
      .then(function (response) {
        dispatch(getProviderDataEdit(response.data.data));
      })
      .catch(function (error) {
        console.log("EditableProv Slice error", error);
      });
  };
}
