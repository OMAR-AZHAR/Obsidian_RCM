import { createSlice } from '@reduxjs/toolkit';

import API from '../../../../Api/ClientApi';

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  LOADING: 'loading',
  ERROR: 'error',
});
const CustomerNamesSlice = createSlice({
  name: 'CustomerNamesSlice',
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },
  reducers: {
    getCustomerNamesSlice(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});
export const { getCustomerNamesSlice, setStatus } = CustomerNamesSlice.actions;
export default CustomerNamesSlice.reducer;
// thunk
export function fetCustomerNames() {
  return async function fetCustomerNamesThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));

    API.get('/accountadmin/usermanagement/getusermanagementdata')
      .then(function (response) {
        console.log(response.data,);
        //   if ((response.data = true)) {
        dispatch(getCustomerNamesSlice(response.data));
        dispatch(setStatus(STATUSES.IDLE));
        //   }
      })
      .catch(function (error) {
        console.log('the is error', error);
        // alert('User not found', error); // This error msg was showing up in the usermanagement section!
      });
  };
}
