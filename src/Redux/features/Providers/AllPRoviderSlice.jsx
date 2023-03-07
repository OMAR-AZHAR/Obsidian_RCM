import { createSlice } from '@reduxjs/toolkit';

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  LOADING: 'loading',
  ERROR: 'error',
});
const initialState = {
  billClaimUnder: '',
  eligibilitUnder: '',
  billClicked: '',
  checkEligibilityClicked: '',
  displayClearButton: false,
  status: STATUSES.IDLE,
};
const AllProviderSlice = createSlice({
  name: 'allProvider',
  initialState,
  reducers: {
    setBillClaimUnder(state, action) {
      state.billClaimUnder = action.payload;
    },
    setEligibilityUnder(state, action) {
      state.eligibilitUnder = action.payload;
    },
    setBillClicked(state, action) {
      state.billClicked = action.payload;
    },
    setEligibilityUnderClicked(state, action) {
      state.checkEligibilityClicked = action.payload;
    },
    //toggle clear button
    setToggleClearButton(state, action) {
      state.displayClearButton = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});
export const {
  setBillClaimUnder,
  setEligibilityUnder,
  setBillClicked,
  setEligibilityUnderClicked,
  setToggleClearButton,
  setStatus,
} = AllProviderSlice.actions;
export default AllProviderSlice.reducer;
