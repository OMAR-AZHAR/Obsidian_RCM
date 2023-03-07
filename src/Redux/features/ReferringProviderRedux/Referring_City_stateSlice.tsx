import { createSlice } from "@reduxjs/toolkit";

import API from "../../../Api/ClientApi";

const Referring_City_stateSlice = createSlice({
  name: "RefCityStateZip",
  initialState: {
    data: [],
    zipcode: "",
    edit_zipcode: "",
  },
  reducers: {
    getRefZipCode(state, action) {
      state.zipcode = action.payload;
    },
    getEditRefZipCode(state, action) {
      state.edit_zipcode = action.payload;
    },

    getRefCityStateData(state, action) {
      state.data = action.payload;
    },

    // setState(state, action) {
    //   state.status = action.payload;
    // },
  },
});
export const { getRefZipCode, getRefCityStateData, getEditRefZipCode } =
  Referring_City_stateSlice.actions;
export default Referring_City_stateSlice.reducer;
// thunk to fetch data of specific practice based on its ID

export function RefEditCity_stateFetch(zip: string) {
  return async function RefEditCity_stateFetchThunk(
    dispatch: (arg0: {
      payload: any;
      type: "RefCityStateZip/getEditRefZipCode";
    }) => void
  ) {
    // dispatch(setStatus(STATUSES.LOADING));
    let user = JSON.parse(sessionStorage.getItem("access")!);
    let customerID = JSON.parse(sessionStorage.getItem("customer_id")!);

    await API.get(`customersetup/practice/uspsapi?zip=${zip}`, {
      headers: {
        Authorization: `Bearer ${user}`,
        customer_id: customerID,
      },
    })
      .then(function (response) {
        //   if ((response.data = true)) {
        console.log("USPS Edit Referring Data", response.data);
        dispatch(getEditRefZipCode(response.data));

        // dispatch(setStatus(STATUSES.IDLE));
        //   }
      })
      .catch(function (error) {
        console.log("Editable Ref Error", error);
      });
  };
}

export function RefCity_stateFetch(zip: string) {
  return async function RefCity_stateFetchThunk(
    dispatch: (arg0: {
      payload: any;
      type: "RefCityStateZip/getRefZipCode";
    }) => void
  ) {
    // dispatch(setStatus(STATUSES.LOADING));
    let user = JSON.parse(sessionStorage.getItem("access")!);
    let customerID = JSON.parse(sessionStorage.getItem("customer_id")!);

    await API.get(`customersetup/practice/uspsapi?zip=${zip}`, {
      headers: {
        Authorization: `Bearer ${user}`,
        customer_id: customerID,
      },
    })
      .then(function (response) {
        console.log("USPS Referring  Data", response.data);
        dispatch(getRefZipCode(response.data));
      })
      .catch(function (error) {
        console.log("Referring USPS error", error);
      });
  };
}
