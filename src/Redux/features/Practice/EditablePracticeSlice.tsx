import { createSlice } from "@reduxjs/toolkit";

import API from "../../../Api/ClientApi";

const EditablePracticeSlice = createSlice({
  name: "EditPractice",
  initialState: {
    data: [],
    id: "",
  },
  reducers: {
    getPracticeIdfromTable(state, action) {
      state.id = action.payload;
    },
    getPractDataEdit(state, action) {
      state.data = action.payload;
    },
  },
});
export const {
  getPracticeIdfromTable,

  getPractDataEdit,
} = EditablePracticeSlice.actions;
export default EditablePracticeSlice.reducer;
// thunk to fetch data of specific practice based on its ID

export function EditPracticeFetch(id1: string) {
  return async function EditPracticeFetchThunk(
    dispatch: (arg0: {
      payload: any;
      type: "EditPractice/getPractDataEdit" | "EditPractice/setStatus";
    }) => void
  ) {
    let user = JSON.parse(sessionStorage.getItem("access")!);
    let customerID = JSON.parse(sessionStorage.getItem("customer_id")!);
    await API.get(`customersetup/practice/edit/${id1}`, {
      headers: {
        Authorization: `Bearer ${user}`,
        customer_id: customerID,
      },
    })
      .then(function (response) {
        dispatch(getPractDataEdit(response.data.data));
      })
      .catch(function (error) {
        console.log("EditablePractice Slice error", error);
      });
  };
}
