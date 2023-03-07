import { createSlice } from "@reduxjs/toolkit";

import API from "../../../Api/ClientApi";

const Patient_City_State = createSlice({
  name: "PatientCityState",
  initialState: {
    data: [],
    // zipcode: "",
    // zipcode2: "",
    // zipcode3: "",
    // zipcode_insured_data1: "",
    // zipcode_insured_data2_employee_info: "",
    // Editable
    zipcode_editable: "",
    zipcode2_editable: "",
    zipcode3_editable: "",
    zipcode_insured_data1_editable: "",
    zipcode_insured_data2_employee_info_editable: "",
  },
  reducers: {
    // getPatientZipCode(state, action) {
    //   state.zipcode = action.payload;
    // },
    // getPatientZipCode2(state, action) {
    //   state.zipcode2 = action.payload;
    // },
    // getPatientZipCode3(state, action) {
    //   state.zipcode3 = action.payload;
    // },

    // getPatientZipCode_InsuredData(state, action) {
    //   state.zipcode_insured_data1 = action.payload;
    // },
    // getPatientZipCode_InsuredData2(state, action) {
    //   state.zipcode_insured_data2_employee_info = action.payload;
    // },
    // getPatientCityStateData(state, action) {
    //   state.data = action.payload;
    // },

    // Editable Patient
    getEditPatientZipCode(state, action) {
      state.zipcode_editable = action.payload;
    },
    getEditPatientZipCode2(state, action) {
      state.zipcode2_editable = action.payload;
    },
    getEditPatientZipCode3(state, action) {
      state.zipcode3_editable = action.payload;
    },

    getEditPatientZipCode_InsuredData(state, action) {
      state.zipcode_insured_data1_editable = action.payload;
    },
    getEditPatientZipCode_InsuredData2(state, action) {
      state.zipcode_insured_data2_employee_info_editable = action.payload;
    },
  },
});
export const {
  // getPatientZipCode,
  // getPatientZipCode2,
  // getPatientZipCode3,
  // getPatientCityStateData,
  // getPatientZipCode_InsuredData,
  // getPatientZipCode_InsuredData2,
  // Editable Patient
  getEditPatientZipCode,
  getEditPatientZipCode2,
  getEditPatientZipCode3,
  getEditPatientZipCode_InsuredData,
  getEditPatientZipCode_InsuredData2,
} = Patient_City_State.actions;
export default Patient_City_State.reducer;
// thunk to fetch data of specific practice based on its ID

// export function PatientCity_stateFetch(zip: string) {
//   return async function PatientCity_stateFetchThunk(
//     dispatch: (arg0: {
//       payload: any;
//       type: "PatientCityState/getPatientZipCode";
//     }) => void
//   ) {
//     // dispatch(setStatus(STATUSES.LOADING));
//     let user = JSON.parse(sessionStorage.getItem("access")!);

//     await API.get(`customersetup/practice/uspsapi?zip=${zip}`, {
//       headers: {
//         Authorization: `Bearer ${user}`,
//       },
//     })
//       .then(function (response) {
//         //   if ((response.data = true)) {
//         // console.log("USPS Patient Data", response.data);
//         dispatch(getPatientZipCode(response.data));

//         // dispatch(setStatus(STATUSES.IDLE));
//         //   }
//       })
//       .catch(function (error) {
//         console.log("the is error", error);
//       });
//   };
// }
// // Thunk 2 for Second City State in Patient Info

// export function PatientCity_stateFetch2(zip: string) {
//   return async function PatientCity_stateFetchThunk2(
//     dispatch: (arg0: {
//       payload: any;
//       type: "PatientCityState/getPatientZipCode2";
//     }) => void
//   ) {
//     // dispatch(setStatus(STATUSES.LOADING));

//     let user = JSON.parse(sessionStorage.getItem("access")!);

//     await API.get(`customersetup/practice/uspsapi?zip=${zip}`, {
//       headers: {
//         Authorization: `Bearer ${user}`,
//       },
//     })
//       .then(function (response) {
//         //   if ((response.data = true)) {
//         // console.log("USPS 2 Patient Data", response.data);
//         dispatch(getPatientZipCode2(response.data));

//         // dispatch(setStatus(STATUSES.IDLE));
//         //   }
//       })
//       .catch(function (error) {
//         console.log("the is error", error);
//       });
//   };
// }

// // Thunk 3 for Second City State in Patient's Billing info

// export function PatientCity_stateFetch3(zip: string) {
//   return async function PatientCity_stateFetchThunk3(
//     dispatch: (arg0: {
//       payload: any;
//       type: "PatientCityState/getPatientZipCode3";
//     }) => void
//   ) {
//     // dispatch(setStatus(STATUSES.LOADING));

//     let user = JSON.parse(sessionStorage.getItem("access")!);

//     await API.get(`customersetup/practice/uspsapi?zip=${zip}`, {
//       headers: {
//         Authorization: `Bearer ${user}`,
//       },
//     })
//       .then(function (response) {
//         //   if ((response.data = true)) {
//         // console.log("USPS 3 Patient Data", response.data);
//         dispatch(getPatientZipCode3(response.data));

//         // dispatch(setStatus(STATUSES.IDLE));
//         //   }
//       })
//       .catch(function (error) {
//         console.log("the is error", error);
//       });
//   };
// }

// Thunk 4 for Second City State in Patient's Insurance info 1

// export function PatientCity_stateFetch4(zip: string) {
//   return async function PatientCity_stateFetchThunk4(
//     dispatch: (arg0: {
//       payload: any;
//       type: "PatientCityState/getPatientZipCode_InsuredData";
//     }) => void
//   ) {
// dispatch(setStatus(STATUSES.LOADING));

//     let user = JSON.parse(sessionStorage.getItem("access")!);

//     await API.get(`customersetup/practice/uspsapi?zip=${zip}`, {
//       headers: {
//         Authorization: `Bearer ${user}`,
//       },
//     })
//       .then(function (response) {
//         //   if ((response.data = true)) {
//         // console.log("USPS Patient Insured Data 1", response.data);
//         dispatch(getPatientZipCode_InsuredData(response.data));

//         // dispatch(setStatus(STATUSES.IDLE));
//         //   }
//       })
//       .catch(function (error) {
//         console.log("the is error", error);
//       });
//   };
// }

// Thunk 4 for Second City State in Patient's Insurance info 2 (Employee Info)

// export function PatientCity_stateFetch5(zip: string) {
//   return async function PatientCity_stateFetchThunk5(
//     dispatch: (arg0: {
//       payload: any;
//       type: "PatientCityState/getPatientZipCode_InsuredData2";
//     }) => void
//   ) {
// dispatch(setStatus(STATUSES.LOADING));

//     let user = JSON.parse(sessionStorage.getItem("access")!);

//     await API.get(`customersetup/practice/uspsapi?zip=${zip}`, {
//       headers: {
//         Authorization: `Bearer ${user}`,
//       },
//     })
//       .then(function (response) {
//         //   if ((response.data = true)) {
//         // console.log(
//         //   "USPS Patient Insured Data 2 (Employee Info)",
//         //   response.data
//         // );
//         dispatch(getPatientZipCode_InsuredData2(response.data));

//         // dispatch(setStatus(STATUSES.IDLE));
//         //   }
//       })
//       .catch(function (error) {
//         console.log("the is error", error);
//       });
//   };
// }

// ---------------------------------- *** Editable Patient *** ----------------------------------

// thunk to fetch data of specific practice based on its ID

export function PatientEditCity_stateFetch(zip: string) {
  return async function PatientEditCity_stateFetchThunk(
    dispatch: (arg0: {
      payload: any;
      type: "PatientCityState/getEditPatientZipCode";
    }) => void
  ) {
    // dispatch(setStatus(STATUSES.LOADING));
    let user = JSON.parse(sessionStorage.getItem("access")!);

    await API.get(`customersetup/practice/uspsapi?zip=${zip}`, {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    })
      .then(function (response) {
        //   if ((response.data = true)) {
        // console.log("USPS Patient Data", response.data);
        dispatch(getEditPatientZipCode(response.data));

        // dispatch(setStatus(STATUSES.IDLE));
        //   }
      })
      .catch(function (error) {
        console.log("the is error", error);
      });
  };
}
// Thunk 2 for Second City State in Patient Info

export function PatientEditCity_stateFetch2(zip: string) {
  return async function PatientEditCity_stateFetchThunk2(
    dispatch: (arg0: {
      payload: any;
      type: "PatientCityState/getEditPatientZipCode2";
    }) => void
  ) {
    // dispatch(setStatus(STATUSES.LOADING));

    let user = JSON.parse(sessionStorage.getItem("access")!);

    await API.get(`customersetup/practice/uspsapi?zip=${zip}`, {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    })
      .then(function (response) {
        //   if ((response.data = true)) {
        // console.log("USPS 2 Patient Data", response.data);
        dispatch(getEditPatientZipCode2(response.data));

        // dispatch(setStatus(STATUSES.IDLE));
        //   }
      })
      .catch(function (error) {
        console.log("the is error", error);
      });
  };
}

// Thunk 3 for Second City State in Patient's Billing info

export function PatientEditCity_stateFetch3(zip: string) {
  return async function PatientEditCity_stateFetchThunk3(
    dispatch: (arg0: {
      payload: any;
      type: "PatientCityState/getEditPatientZipCode3";
    }) => void
  ) {
    // dispatch(setStatus(STATUSES.LOADING));

    let user = JSON.parse(sessionStorage.getItem("access")!);

    await API.get(`customersetup/practice/uspsapi?zip=${zip}`, {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    })
      .then(function (response) {
        //   if ((response.data = true)) {
        // console.log("USPS 3 Patient Data", response.data);
        dispatch(getEditPatientZipCode3(response.data));

        // dispatch(setStatus(STATUSES.IDLE));
        //   }
      })
      .catch(function (error) {
        console.log("the is error", error);
      });
  };
}

// Thunk 4 for Second City State in Patient's Insurance info 1

export function PatientEditCity_stateFetch4(zip: string) {
  return async function PatientEditCity_stateFetchThunk4(
    dispatch: (arg0: {
      payload: any;
      type: "PatientCityState/getEditPatientZipCode_InsuredData";
    }) => void
  ) {
    // dispatch(setStatus(STATUSES.LOADING));

    let user = JSON.parse(sessionStorage.getItem("access")!);

    await API.get(`customersetup/practice/uspsapi?zip=${zip}`, {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    })
      .then(function (response) {
        //   if ((response.data = true)) {
        // console.log("USPS Patient Insured Data 1", response.data);
        dispatch(getEditPatientZipCode_InsuredData(response.data));

        // dispatch(setStatus(STATUSES.IDLE));
        //   }
      })
      .catch(function (error) {
        console.log("the is error", error);
      });
  };
}

// Thunk 4 for Second City State in Patient's Insurance info 2 (Employee Info)

export function PatientEditCity_stateFetch5(zip: string) {
  return async function PatientEditCity_stateFetchThunk5(
    dispatch: (arg0: {
      payload: any;
      type: "PatientCityState/getEditPatientZipCode_InsuredData2";
    }) => void
  ) {
    // dispatch(setStatus(STATUSES.LOADING));

    let user = JSON.parse(sessionStorage.getItem("access")!);

    await API.get(`customersetup/practice/uspsapi?zip=${zip}`, {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    })
      .then(function (response) {
        //   if ((response.data = true)) {
        // console.log(
        //   "USPS Patient Insured Data 2 (Employee Info)",
        //   response.data
        // );
        dispatch(getEditPatientZipCode_InsuredData2(response.data));

        // dispatch(setStatus(STATUSES.IDLE));
        //   }
      })
      .catch(function (error) {
        console.log("the is error", error);
      });
  };
}
