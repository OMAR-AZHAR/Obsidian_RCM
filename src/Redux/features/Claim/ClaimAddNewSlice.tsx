import { createSlice } from '@reduxjs/toolkit';
export const STATUSES = Object.freeze({
  IDLE: 'idle',
  LOADING: 'loading',
  ERROR: 'error'
});
// initial states
const initialState = {
  patientName: '',
  renderProviderName: '',
  billProviderName: '',
  supervisingProviderName: '',
  orderProviderName: '',
  refPCPProviderName: '',
  salesRepProviderName: '',
  facilityProviderName: '',
  primaryInsProviderName: '',
  secondaryInsProviderName: '',
  ternaryInsProviderName: '',
  displayClearButton: false,
  showPrimaryInsurDetails: false,
  showSecondaryInsurDetails: false,
  showTernaryInsurDetails: false,
  status: STATUSES.IDLE
};
// reducers
const ClaimAddNewSlice = createSlice({
  name: 'Claim',
  initialState,
  reducers: {
    setPatientData(state, action) {
      state.patientName = action.payload;
    },
    setRenderProviderData(state, action) {
      state.renderProviderName = action.payload;
    },
    setBillProviderData(state, action) {
      state.billProviderName = action.payload;
    },
    setSupervisingProviderData(state, action) {
      state.supervisingProviderName = action.payload;
    },
    setOrderingProviderData(state, action) {
      state.orderProviderName = action.payload;
    },
    setrefPCPProviderData(state, action) {
      state.refPCPProviderName = action.payload;
    },
    setSalesRepProviderData(state, action) {
      state.salesRepProviderName = action.payload;
    },
    setFacilityProviderData(state, action) {
      state.facilityProviderName = action.payload;
    },
    setPrimInsuranceProviderData(state, action) {
      state.primaryInsProviderName = action.payload;
    },
    setSecInsuranceProviderData(state, action) {
      state.secondaryInsProviderName = action.payload;
    },
    setTernInsuranceProviderData(state, action) {
      state.ternaryInsProviderName = action.payload;
    },
    //toggle clear button
    setToggleClearButton(state, action) {
      state.displayClearButton = action.payload;
    },
    //  toggle insurance dertails
    setTogglePrimaryDetails(state, action) {
      state.showPrimaryInsurDetails = action.payload;
    },
    setToggleSecondaryDetails(state, action) {
      state.displayClearButton = action.payload;
    },
    setToggleTernaryDetails(state, action) {
      state.showTernaryInsurDetails = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    }
  }
});
// export actions
export const {
  setPatientData,
  setRenderProviderData,
  setBillProviderData,
  setSupervisingProviderData,
  setOrderingProviderData,
  setrefPCPProviderData,
  setSalesRepProviderData,
  setFacilityProviderData,
  setPrimInsuranceProviderData,
  setSecInsuranceProviderData,
  setTernInsuranceProviderData,
  setToggleClearButton,
  setTogglePrimaryDetails,
  setToggleSecondaryDetails,
  setToggleTernaryDetails,
  setStatus
} = ClaimAddNewSlice.actions;
export default ClaimAddNewSlice.reducer;
