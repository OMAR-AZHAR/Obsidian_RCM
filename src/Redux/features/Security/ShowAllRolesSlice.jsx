import { createSlice } from "@reduxjs/toolkit";

import API from "../../../Api/ClientApi";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const ShowAllRolesSlice = createSlice({
  name: "showAllRoles",
  initialState: {
    data: [],
    singleRoleData: [],
    nameSource: "nameinitialHint",
    name: "",
    id: "",
    editPermissionData: [],
    editPermissionDataUser:[],
    status: STATUSES.IDLE,
  },
  reducers: {
    ShowAllRoles(state, action) {
      state.data = action.payload;
    },
    ShowSingleRoleAction(state, action) {
      state.singleRoleData = action.payload;
    },
    EditPermissionData(state, action) {
      state.editPermissionData = action.payload;
    },
    EditPermissionDataUser(state, action) {
      state.editPermissionDataUser = action.payload;
    },
    setRoleId(state, action) {
      state.id = action.payload;
    },
    setName(state, action) {
      state.name = localStorage.setItem("rolename", action.payload);
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});
export const {
  ShowAllRoles,
  ShowSingleRoleAction,
  EditPermissionDataUser,
  EditPermissionData,
  setName,
  setRoleId,
  setStatus,
} = ShowAllRolesSlice.actions;
export default ShowAllRolesSlice.reducer;

// thunk added user
export function FetchAllRoles() {
  return async function FetchAllRolesThunk(dispatch, getState) {
    API.get("accountadmin/security/permission/getroles")
      .then(function (response) {
        //   if ((response.data = true)) {
        console.log("all roles data", response.data.data);
        dispatch(ShowAllRoles(response.data.data));

        dispatch(setStatus(STATUSES.IDLE));
        //   }
      })
      .catch(function (error) {
        console.log("roles not fuond", error);
        //   alert('User not found', error)
      });
  };
}
// single role permss
export function ShowSingleRole(id) {
  return async function ShowSingleRoleThunk(dispatch, getState) {
    API.get(`accountadmin/security/permission/getsinglerolepermission/${id}`)
      .then(function (response) {
        //   if ((response.data = true)) {
        console.log("single role data", response.data.data);
        dispatch(ShowSingleRole(response.data.data));

        dispatch(setStatus(STATUSES.IDLE));
        //   }
      })
      .catch(function (error) {
        console.log("roles not fuond", error);
        //   alert('User not found', error)
      });
  };
}
