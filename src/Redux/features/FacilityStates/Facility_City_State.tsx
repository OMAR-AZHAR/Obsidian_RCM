import { createSlice } from "@reduxjs/toolkit";

import API from "../../../Api/ClientApi";

const Facility_City_State = createSlice({
  name: "Facility_CityStateZip",
  initialState: {
    data: [],
    zipcode: "",
    // zipcode2: "",
    edit_zipcode: "",
    // edit_zipcode2: "",
  },
  reducers: {
    getFacilityZipCode(state, action) {
      state.zipcode = action.payload;
    },
    // getFacilityZipCode2(state, action) {
    //   state.zipcode2 = action.payload;
    // },
    getEditableFacilityZipCode1(state, action) {
      state.edit_zipcode = action.payload;
    },
    // getEditableFacilityZipCode2(state, action) {
    //   state.edit_zipcode2 = action.payload;
    // },
    getCityStateData(state, action) {
      state.data = action.payload;
    },
  },
});
export const {
  getCityStateData,
  getFacilityZipCode,
  //   getFacilityZipCode2,
  getEditableFacilityZipCode1,
  //   getEditableFacilityZipCode2,
} = Facility_City_State.actions;
export default Facility_City_State.reducer;
// thunk to fetch data of specific facility based on its ID

export function Facility_City_stateFetch(zip: string) {
  return async function City_stateFetchThunk(
    dispatch: (arg0: {
      payload: any;
      type: "Facility_CityStateZip/getFacilityZipCode";
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
        console.log("Facility USPS Data", response.data);
        dispatch(getFacilityZipCode(response.data));
      })
      .catch(function (error) {
        console.log("the is error", error);
      });
  };
}

// export function Facility_City_stateFetch2(zip: string) {
//   return async function City_stateFetchThunk2(
//     dispatch: (arg0: {
//       payload: any;
//       type: "Facility_CityStateZip/getFacilityZipCode2";
//     }) => void
//   ) {
//     await API.get(`customersetup/practice/uspsapi?zip=${zip}`, {
//       headers: {
//         Authorization: `Bearer ${user}`,
//         customer_id: customerID,
//       },
//     })
//       .then(function (response) {
//         console.log("getFacilityZipCode2 USPS Data2", response.data);
//         dispatch(getFacilityZipCode2(response.data));
//       })
//       .catch(function (error) {
//         console.log("the is error", error);
//       });
//   };
// }

// Editable Facility Thunks *******************************************************************

export function Facility_City_stateFetch3(zip: string) {
  return async function City_stateFetchThunk2(
    dispatch: (arg0: {
      payload: any;
      type: "Facility_CityStateZip/getEditableFacilityZipCode1";
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
        console.log("getEditableFacilityZipCode1 USPS Data", response.data);
        dispatch(getEditableFacilityZipCode1(response.data));
      })
      .catch(function (error) {
        console.log("the is error", error);
      });
  };
}

// export function Facility_City_stateFetch4(zip: string) {
//   return async function City_stateFetchThunk2(
//     dispatch: (arg0: {
//       payload: any;
//       type: "Facility_CityStateZip/getEditableFacilityZipCode2";
//     }) => void
//   ) {
//     await API.get(`customersetup/practice/uspsapi?zip=${zip}`, {
//       headers: {
//         Authorization: `Bearer ${user}`,
//         customer_id: customerID,
//       },
//     })
//       .then(function (response) {
//         console.log("getEditableFacilityZipCode2 USPS Data2", response.data);
//         dispatch(getEditableFacilityZipCode2(response.data));
//       })
//       .catch(function (error) {
//         console.log("the is error", error);
//       });
//   };
// }
