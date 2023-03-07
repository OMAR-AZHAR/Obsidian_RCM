import { createSlice } from "@reduxjs/toolkit";

import API from "../../../Api/ClientApi";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});
const EditUserSlice = createSlice({
  name: "edituserProfile",
  initialState: {
    data: [],
    customers: [],
    edituserpermission: [],
    userTypeChange: false,
    roles: [],
    id: "",
    status: STATUSES.IDLE,
  },
  reducers: {
    getUserTypeChangeHint(state, action) {
      state.userTypeChange = action.payload;
    },
    getUserIdfromTabel(state, action) {
      state.id = action.payload;
    },
    getUserDataEdit(state, action) {
      state.data = action.payload;
    },
    getUserCustomerEdit(state, action) {
      state.customers = action.payload;
    },
    getUserRoleEdit(state, action) {
      state.roles = action.payload;
    },

    getUserPermissionEdit(state, action) {
      state.edituserpermission = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});
export const {
  getUserTypeChangeHint,
  getUserIdfromTabel,
  getUserPermissionEdit,
  getUserDataEdit,
  getUserRoleEdit,
  getUserCustomerEdit,
  setStatus,
} = EditUserSlice.actions;
export default EditUserSlice.reducer;

// thunk
export function EditUserFetch(id1) {
  return async function EditUserFetchThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    let user = JSON.parse(sessionStorage.getItem("access"));
    let customerID = JSON.parse(sessionStorage.getItem("customer_id"));
    API.get(`accountadmin/usermanagement/${id1}/edit`, {
      headers: {
        Authorization: `Bearer ${user}`,
        customer_id: customerID,
      },
    })
      .then(function (response) {
        console.log(response.data, "the data");

        console.log("the perms", response.data);
        dispatch(getUserIdfromTabel(response.data));
        dispatch(getUserDataEdit(response.data));
        dispatch(getUserRoleEdit(response.data.roles));
        dispatch(getUserCustomerEdit(response.data.customer));
        dispatch(getUserPermissionEdit(response.data.permissions));
        dispatch(setStatus(STATUSES.IDLE));
      })
      .catch(function (error) {
        console.log("the is error", error);
      });
  };
}
