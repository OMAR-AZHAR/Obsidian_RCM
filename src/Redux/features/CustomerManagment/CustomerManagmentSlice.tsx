import { createSlice } from "@reduxjs/toolkit";
import API from "../../../Api/ClientApi";
export const STATUSES = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});
const CustomerManagmentSlice = createSlice({
  name: "CustomersManagment",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },
  reducers: {
    setCustomerData(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});
export const { setCustomerData, setStatus } = CustomerManagmentSlice.actions;
export default CustomerManagmentSlice.reducer;
// Thunk
export function fetchCustomers() {
  return async function fetchCutomerThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      let user = JSON.parse(sessionStorage.getItem("access")!);
      let customerID = JSON.parse(sessionStorage.getItem("customer_id")!);
      await API.get("accountadmin/customermanagement", {
        headers: {
          Authorization: `Bearer ${user}`,
          customer_id: customerID,
        },
      })
        .then(function (response) {
          if (response.data.status == 200) {
            dispatch(setCustomerData(response.data.data));
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
