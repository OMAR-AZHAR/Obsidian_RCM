import { createSlice } from "@reduxjs/toolkit";

import API from "../../../Api/ClientApi";

const PayersCityZipSlice = createSlice({
  name: "PayersCityStateZip",
  initialState: {
    data: [],
    zipcode: "",
    zipcode2: "",
    edit_zipcode1: "",
    edit_zipcode2: "",
  },
  reducers: {
    getPayersZipCode(state, action) {
      state.zipcode = action.payload;
    },
    getPayersZipCode2(state, action) {
      state.zipcode2 = action.payload;
    },
    // Editable Payers
    getEditPayersZipCode(state, action) {
      state.edit_zipcode1 = action.payload;
    },
    getEditPayersZipCode2(state, action) {
      state.edit_zipcode2 = action.payload;
    },
  },
});
export const {
  getPayersZipCode,
  getPayersZipCode2,
  getEditPayersZipCode,
  getEditPayersZipCode2,
} = PayersCityZipSlice.actions;
export default PayersCityZipSlice.reducer;
// thunk to fetch data of specific Payer based on its ID

export function PayersCityZipSliceFetch(zip: string) {
  return async function PayersCityZipSliceThunk(
    dispatch: (arg0: {
      payload: any;
      type: "PayersCityStateZip/getPayersZipCode";
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
        dispatch(getPayersZipCode(response.data));
      })
      .catch(function (error) {
        console.log("Payer Zipcode1 is error", error);
      });
  };
}
export function PayersCityZipSliceFetch2(zip: string) {
  return async function PayersCityZipSliceThunk2(
    dispatch: (arg0: {
      payload: any;
      type: "PayersCityStateZip/getPayersZipCode2";
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
        dispatch(getPayersZipCode2(response.data));
      })
      .catch(function (error) {
        console.log("Payer Zipcode2 is error", error);
      });
  };
}
// Editable Payers Form Slices

export function PayersEditCityZipSliceFetch(zip: string) {
  return async function PayersEditCityZipSliceThunk(
    dispatch: (arg0: {
      payload: any;
      type: "PayersCityStateZip/getEditPayersZipCode";
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
        dispatch(getEditPayersZipCode(response.data));
      })
      .catch(function (error) {
        console.log("Payer Zipcode3 is error", error);
      });
  };
}
export function PayersEditCityZipSliceFetch2(zip: string) {
  return async function PayersCityZipSliceThunk2(
    dispatch: (arg0: {
      payload: any;
      type: "PayersCityStateZip/getEditPayersZipCode2";
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
        dispatch(getEditPayersZipCode2(response.data));
      })
      .catch(function (error) {
        console.log("Payer Zipcode4 is error", error);
      });
  };
}
