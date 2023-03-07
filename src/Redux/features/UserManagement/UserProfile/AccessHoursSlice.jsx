import { createSlice } from '@reduxjs/toolkit';
import { useState } from 'react';

const initialState = {
  accesshoursdata: [
    {
      id: '1',
      Day: 'Sunday',
      AccType: '',

      totime: '',
      tilltime: '',
    },
    {
      id: '2',
      Day: 'Monday',
      AccType: '',

      totime: '',
      tilltime: '',
    },
    {
      id: '3',
      Day: 'Tuesday',
      AccType: '',

      totime: '',
      tilltime: '',
    },
    {
      id: '4',
      Day: 'Wednesday',
      AccType: '',

      totime: '',
      tilltime: '',
    },
    {
      id: '5',
      Day: 'Thursday',
      AccType: '',

      totime: '',
      tilltime: '',
    },
    {
      id: '6',
      Day: 'Friday',
      AccType: '',

      totime: '',
      tilltime: '',
    },
    {
      id: '7',
      Day: 'Saturday',
      AccType: '',

      totime: '',
      tilltime: '',
    },
  ],
}; // Initial State
export const AccessHoursSlice = createSlice({
  // Create Slice
  name: 'AccessHoursLimit',
  initialState,
  reducers: {
    GetAccessHours: (state, action) => {
      state.accesshoursdata = action.payload;
      // const acch = {...action.payload}
      // acch.AccType = ""
      // state.acchi = [...state.acchi, acch]
      // state.accesshoursdata.fin
    },
    // GettoTime: (state, action) => {
    //   state.accesshoursdata = action.payload;
    //   // state.accesshoursdata.fin
    // },
    // GettillTime: (state, action) => {
    //   state.accesshoursdata = action.payload;
    //   // state.accesshoursdata.fin
    // },
  },
});

export const { GetAccessHours } = AccessHoursSlice.actions; // Action Functions to be Exported
export default AccessHoursSlice.reducer; // Reducer with the Name Defined (CustomersAccess)
