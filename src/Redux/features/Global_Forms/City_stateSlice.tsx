import { createSlice } from "@reduxjs/toolkit";

import API from "../../../Api/ClientApi";

const City_stateSlice = createSlice({
  name: "CityStateZip",
  initialState: {
    data: [],
    zipcode: "",
    zipcode2: "",
    editpracticezip: "",
    editpracticezip2: "",
  },
  reducers: {
    getZipCode(state, action) {
      state.zipcode = action.payload;
    },
    getZipCode2(state, action) {
      state.zipcode2 = action.payload;
    },
    // Editable Practice functions
    getEditPractZipCode1(state, action) {
      state.editpracticezip = action.payload;
    },
    getEditPractZipCode2(state, action) {
      state.editpracticezip2 = action.payload;
    },
    getCityStateData(state, action) {
      state.data = action.payload;
    },

    // setState(state, action) {
    //   state.status = action.payload;
    // },
  },
});
export const {
  getZipCode,
  getCityStateData,
  getZipCode2,
  getEditPractZipCode1,
  getEditPractZipCode2,
} = City_stateSlice.actions;
export default City_stateSlice.reducer;
// thunk to fetch data of specific practice based on its ID

export function City_stateFetch(zip: string) {
  return async function City_stateFetchThunk(
    dispatch: (arg0: { payload: any; type: "CityStateZip/getZipCode" }) => void
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
        console.log("USPS Data", response.data);
        dispatch(getZipCode(response.data));

        // dispatch(setStatus(STATUSES.IDLE));
        //   }
      })
      .catch(function (error) {
        console.log("the is error", error);
      });
  };
}

export function City_stateFetch2(zip: string) {
  return async function City_stateFetchThunk2(
    dispatch: (arg0: { payload: any; type: "CityStateZip/getZipCode2" }) => void
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
        console.log("USPS Data2", response.data);
        dispatch(getZipCode2(response.data));

        // dispatch(setStatus(STATUSES.IDLE));
        //   }
      })
      .catch(function (error) {
        console.log("the is error", error);
      });
  };
}

// ******************************* Editable Practice  ************************************

export function EditPractice_City_stateFetch(zip: string) {
  return async function EditPractice_City_stateFetchThunk(
    dispatch: (arg0: {
      payload: any;
      type: "CityStateZip/getEditPractZipCode1";
    }) => void
  ) {
    let user = JSON.parse(sessionStorage.getItem("access")!);
    let customerID = JSON.parse(sessionStorage.getItem("customer_id")!);
    await API.get(`customersetup/practice/uspsapi?zip=${zip}`, {
      headers: {
        Authorization: `Bearer ${user}`,
        customer_id: customerID,
      },
    })
      .then(function (response) {
        dispatch(getEditPractZipCode1(response.data));
      })
      .catch(function (error) {
        console.log("the is error", error);
      });
  };
}

export function EditPractice_City_stateFetch2(zip: string) {
  return async function EditPractice_City_stateFetchThunk2(
    dispatch: (arg0: {
      payload: any;
      type: "CityStateZip/getEditPractZipCode2";
    }) => void
  ) {
    let user = JSON.parse(sessionStorage.getItem("access")!);
    let customerID = JSON.parse(sessionStorage.getItem("customer_id")!);
    await API.get(`customersetup/practice/uspsapi?zip=${zip}`, {
      headers: {
        Authorization: `Bearer ${user}`,
        customer_id: customerID,
      },
    })
      .then(function (response) {
        dispatch(getEditPractZipCode2(response.data));
      })
      .catch(function (error) {
        console.log("the is error", error);
      });
  };
}
