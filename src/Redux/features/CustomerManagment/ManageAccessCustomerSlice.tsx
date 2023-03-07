import { createSlice } from "@reduxjs/toolkit";
import API from "../../../Api/ClientApi";
export const STATUSES = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});
const ManageAcceessCustomerManagmentSlice = createSlice({
  name: "ManageAccessCustomersManagment",
  initialState: {
    data: [],
    manageAccessCustomerId: "",
    status: STATUSES.IDLE,
  },
  reducers: {
    setManageAccessCustomerData(state, action) {
      state.data = action.payload;
    },
    setManageAccessCustomerId(state, action) {
      state.manageAccessCustomerId = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});
export const {
  setManageAccessCustomerData,
  setManageAccessCustomerId,
  setStatus,
} = ManageAcceessCustomerManagmentSlice.actions;
export default ManageAcceessCustomerManagmentSlice.reducer;
// thunk
// customer-management/authrep/users
export function fetchManageAccessCustomers(id) {
  return async function fetchManageAccessCustomersThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      let user = JSON.parse(sessionStorage.getItem("access")!);
      let customerID = JSON.parse(sessionStorage.getItem("customer_id")!);
      API.get(`customer-management/authrep/users/${id}`, {
        headers: {
          Authorization: `Bearer ${user}`,
          customer_id: customerID,
        },
      })
        .then(function (response) {
          console.log("anbc", response);
          if (response.status == 200) {
            dispatch(setManageAccessCustomerData(response.data));
            dispatch(setStatus(STATUSES.IDLE));
          }
        })
        .catch(function (error) {
          console.log(error);
          dispatch(setStatus(STATUSES.ERROR));
        });
    } catch (err) {}
  };
}
