import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  // POS_ID_Value: "",
  TOS_ID_Value: "",
  payeraddresslocation: 0,
  printstartstop: 0,
  autodecrement: 0,
  includeaccident: 0,
  excludefacility: 0,
  // Institutional Claim Defaults
  typeofbill: "",
  admtype: "",
  admsource: "",
  patientstatus: "",
  // Default Patient
  maritalstatus: "",
  employedstatus: "",
  studentstatus: "",
  residencetype: "",
  statementtype: "",
  mailstatemento: "",
  sendstatement: "",
  language: "",
  acceptassignment: "",
  gender: "",
  // Default ERAs
  allowautopatientpayment: 1,
  infoline: "",
  usemedicareallow: 0,
};
export const DefaultClaimsSlice = createSlice({
  name: "DefaultClaims",
  initialState,
  reducers: {
    // getPOS_Val(state, action) {
    //   state.POS_ID_Value = action.payload;
    // },
    getTOS_Val(state, action) {
      state.TOS_ID_Value = action.payload;
    },
    getPayerAddress(state, action) {
      state.payeraddresslocation = action.payload;
    },
    getPrintStartStop(state, action) {
      state.printstartstop = action.payload;
    },
    getAutoDecrement(state, action) {
      state.autodecrement = action.payload;
    },
    getIncludeAccident(state, action) {
      state.includeaccident = action.payload;
    },
    getExcludeFacility(state, action) {
      state.excludefacility = action.payload;
    },
    // Institutional Claim Defaults
    getTypeofBill(state, action) {
      state.typeofbill = action.payload;
    },
    getAdmType(state, action) {
      state.admtype = action.payload;
    },
    getAdmSource(state, action) {
      state.admsource = action.payload;
    },
    getPatientStatus(state, action) {
      state.patientstatus = action.payload;
    },
    // Default Patient
    getMaritalStatus(state, action) {
      state.maritalstatus = action.payload;
    },
    getEmployedStatus(state, action) {
      state.employedstatus = action.payload;
    },
    getStudentStatus(state, action) {
      state.studentstatus = action.payload;
    },
    getResidenceType(state, action) {
      state.residencetype = action.payload;
    },
    getStatementType(state, action) {
      state.statementtype = action.payload;
    },
    getMailStatement(state, action) {
      state.mailstatemento = action.payload;
    },
    getSentStatement(state, action) {
      state.sendstatement = action.payload;
    },
    getlanguage(state, action) {
      state.language = action.payload;
    },
    getAcceptAssignment(state, action) {
      state.acceptassignment = action.payload;
    },
    getGender(state, action) {
      state.gender = action.payload;
    },
    // Default ERAs
    getAllowAutoPatPay(state, action) {
      state.allowautopatientpayment = action.payload;
    },
    getInfoLine(state, action) {
      state.infoline = action.payload;
    },
    getMedicareAllow(state, action) {
      state.usemedicareallow = action.payload;
    },
  },
});
export const {
  getPayerAddress,
  getPrintStartStop,
  getAutoDecrement,
  getIncludeAccident,
  getExcludeFacility,
  getTypeofBill,
  getAdmType,
  getAdmSource,
  getPatientStatus,
  getMaritalStatus,
  getEmployedStatus,
  getStudentStatus,
  getResidenceType,
  getStatementType,
  getMailStatement,
  getSentStatement,
  getlanguage,
  getAcceptAssignment,
  getGender,
  getAllowAutoPatPay,
  getInfoLine,
  getMedicareAllow,
  // getPOS_Val,
  getTOS_Val,
} = DefaultClaimsSlice.actions;
export default DefaultClaimsSlice.reducer;
