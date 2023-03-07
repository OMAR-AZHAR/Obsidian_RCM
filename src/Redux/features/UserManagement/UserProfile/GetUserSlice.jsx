import { createSlice } from '@reduxjs/toolkit';

import API from '../../../../Api/ClientApi';

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  LOADING: 'loading',
  ERROR: 'error',
});

const GetUsersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },
  reducers: {
    getUsers(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});
export const { getUsers, setStatus } = GetUsersSlice.actions;
export default GetUsersSlice.reducer;

// thunk
export function fetchUsers() {
  return async function fetchUsersThunk(dispatch, getState) {
    //     dispatch(setStatus(STATUSES.LOADING))
    //     try{
    //         const res = await fetch('http://127.0.0.1:8000/api/usermanagement',{Headers: {
    //             Accept: 'application.json',
    //             'Content-Type': 'application/json'
    //           }});
    //         const data = await res.json();

    //         dispatch(getUsers(data));
    //         dispatch(setStatus(STATUSES.IDLE))
    //     }
    //     catch(err){
    //         console.log(err);
    //         dispatch(setStatus(STATUSES.ERROR))
    //  }

    API.get('/usermanagement')
      .then(function (response) {
        //   if ((response.data = true)) {
        console.log('response data', response);
        dispatch(getUsers(response.data.data));

        dispatch(setStatus(STATUSES.IDLE));
        //   }
      })
      .catch(function (error) {
        console.log('the is error', error);
        //   alert('User not found', error)
      });
  };
}
