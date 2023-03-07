import { createSlice } from "@reduxjs/toolkit";

import API from "../../../Api/ClientApi";

const EditableFacility = createSlice({
  name: "EditFacilitySlice",
  initialState: {
    data: [],
    id: "",
  },
  reducers: {
    getFacilityIdfromTable(state, action) {
      state.id = action.payload;
    },
    getFacilityDataEdit(state, action) {
      state.data = action.payload;
    },
  },
});
export const {
  getFacilityIdfromTable,

  getFacilityDataEdit,
} = EditableFacility.actions;
export default EditableFacility.reducer;
// thunk to fetch data of specific facility based on its ID

export function EditFacilityFetch(id1: string) {
  return async function EditFacilityFetchThunk(
    dispatch: (arg0: {
      payload: any;
      type: "EditFacilitySlice/getFacilityDataEdit";
    }) => void
  ) {
    let user = JSON.parse(sessionStorage.getItem("access")!);
    let customerID = JSON.parse(sessionStorage.getItem("customer_id")!);
    await API.get(`customersetup/facility/edit/${id1}`, {
      headers: {
        Authorization: `Bearer ${user}`,
        customer_id: customerID,
      },
    })
      .then(function (response) {
        dispatch(getFacilityDataEdit(response.data.data));
      })
      .catch(function (error) {
        console.log("the is error", error);
      });
  };
}
