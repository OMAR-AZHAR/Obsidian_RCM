import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  customersaccessdata: [],
  // customerid:[],
  // customername:[],
  // customerstatus:[],
  // customeraccess:[]
}; // Initial State
export const CustomerAccessSlice = createSlice({
  // Create Slice
  name: 'CustomersAccess',
  initialState,
  reducers: {
    // Action Functions to be difined here
    Getcustomers: (state, action) => {
      state.customersaccessdata = action.payload;
      // state.customerid = action.payload;
      // state.customername = action.payload;
      // state.customerstatus = action.payload;
      // state.customeraccess = action.payload;
    },
  },
});

export const { Getcustomers } = CustomerAccessSlice.actions; // Action Functions to be Exported
export default CustomerAccessSlice.reducer; // Reducer with the Name Defined (CustomersAccess)
