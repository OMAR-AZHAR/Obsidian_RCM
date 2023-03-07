import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// initial state
const initialState = {
  editCustomer: "initial customer",
  selectroleEdit: "user",
  status: "RoleEdit",
  selectpermcategoryEdit: "Account Administration",
  accountsetupEdit: "Account Administration Account Setup Deny",
  billpaymentEdit: "Account Administration Bill Payment Deny",
  monthlyinvoiceEdit: "Account Administration Monthly Invoice Deny",
  // appointment
  schedulerEdit: "Appointments Scheduler Deny",
  schedulerconfigurationEdit: "Appointments Scheduler Configuration Deny",
  appointmentcontrolEdit: "Appointments Appointment Control Deny",
  batchprintingappointmentEdit: "Appointments Batch Printing Deny",
  departmentEdit: "Appointments Department Deny",
  patientactivityappointmentseEdit: "Appointments Patient Activity Deny",
  patientpaymentsappointmentsEdit: "Appointments Patient Payments Deny",
  // calim
  professionalclaimEdit: "Claim Professional Claim Deny",
  institutionalclaimEdit: "Claim Institutional Claim Deny",
  batchprintingclaimEdit: "Claim Batch Printing Deny",
  claimfollowupEdit: "Claim Claim Follow Up Deny",
  clearinghousereportsEdit: "Claim Clearinghouse Reports Deny",
  controlclaimEdit: "Claim Control Deny",
  nyworkerscompformEdit: "Claim NY Workers Comp Form Deny",
  patientactivityclaimEdit: "Claim Patient Activity Deny",
  patientpaymentclaimEdit: "Claim Patient Payments Deny",
  trackingclaimEdit: "Claim Tracking Deny",
  // customer setup
  practiceEdit: "Customer Setup Practice Deny",
  providerEdit: "Customer Setup Provider Deny",
  facilityEdit: "Customer Setup Facility Deny",
  referringEdit: "Customer Setup Referring Deny",
  payerEdit: "Customer Setup Payer Deny",
  payeragreementEdit: "Customer Setup Payer Agreements Deny",
  codesEdit: "Customer Setup Codes Deny",
  inventoryEdit: "Customer Setup Inventory Deny",
  feeschedulesEdit: "Customer Setup Fee Schedules Deny",
  contractmanagementEdit: "Customer Setup Contract Management Deny",
  alertcontrolEdit: "Customer Setup Alert Control Deny",
  statementautomationEdit: "Customer Setup Statement Automation Deny",
  labelandsuperbillconfigEdit:
    "Customer Setup Label and Superbill Configuration Deny",
  piissncustomerEdit:
    "Customer Setup Personally Identifiable Information-SSN Deny",
  accountsetupcustomerEdit: "Customer Setup Account Setup Deny",
  billpaymentcustomerEdit: "Customer Setup Bill Payment Deny",
  customizationEdit: "Customer Setup Customization Deny",

  documentmanagementEdit: "Documents Document Management Deny",
  // Home
  dashboardEdit: "Home Dashboard Deny",
  messagingEdit: "Home Messaging Deny",
  contactsEdit: " Home Contacts Deny",
  administertasksEdit: "Home Administer Tasks Own Tasks Only",
  // Interface
  interfacetrackingEdit: "Interface Interface Tracking Deny",
  // Other
  paymentportalEdit: "Other Payment Portal Deny",
  // Patient
  patientEdit: "Patient Patient Deny",
  addressverificationEdit: "Patient Address Verification Deny",
  batcheligibilityEdit: "Patient Batch Eligibility Deny",
  batchprintingEdit: "Patient Batch Printing Deny",
  controlpatientEdit: "Patient Control Deny",
  debitpatientEdit: "Patient Debit/Credit Deny",
  editnotesEdit: "Patient Edit Notes Deny",
  eligibilitypatientEdit: "Patient Eligibility Deny",
  enhancedstatementprintingEdit: "Patient Enhanced Statement Printing Deny",
  patientaccountmanagementEdit: "Patient Patient Account Management Deny",
  patientactivitypatientEdit: "Patient Patient Activity Deny",
  patientmergeEdit: "Patient Patient Merge Deny",
  patientnotesEdit: "Patient Patient Notes Deny",
  patientpaymentspatientEdit: "Patient Patient Payments Deny",
  patientportalinviteEdit: "Patient Payment Portal Invite Deny",
  piissnpatientEdit: "Patient Personally Identifiable Information-SSN Deny",
  trackingpatientEdit: "Patient Tracking Deny",
  // Payment
  patient_paymentsEdit: "Payment Patient Payments Deny",
  insurancepaymentsEdit: "Payment Insurance Payments Deny",
  eraautoapplyEdit: "Payment ERA Auto Apply Deny",
  patientactivitypaymentEdit: "Payment Patient Activity Deny",
  trackingpaymentsEdit: "Payment Tracking Deny",
  // Reports
  reportsEdit: "Reports Reports Deny",
  armanagementreportsEdit: "Reports A/R Management Reports Deny",

  managementreportsEdit: "Reports Management Reports Deny",
  reportbuilderEdit: "Reports Report Builder Deny",
};
export const PermissionEditSlice = createSlice({
  name: "EditPermissionCustomer",
  initialState,
  reducers: {
    // actions
    CustomerEditChange: (state, action) => {
      // On Change Customer
      state.editCustomer = action.payload;
    },
    SelectRoleEdit: (state, action) => {
      state.selectroleEdit = action.payload;
    },
    SelectRolePermEdit: (state, action) => {
      state.status = action.payload;
    },
    SelectPermissionCategoryEdit: (state, action) => {
      state.selectpermcategoryEdit = action.payload;
    },
    AccountSetupEdit: (state, action) => {
      state.accountsetupEdit = action.payload;
    },
    BillPaymentEdit: (state, action) => {
      state.billpaymentEdit = action.payload;
    },
    MonthlyInvoiceEdit: (state, action) => {
      state.monthlyinvoiceEdit = action.payload;
    },
    // appointment
    SchedulerEdit: (state, action) => {
      state.schedulerEdit = action.payload;
    },
    SchedulerConfigurationEdit: (state, action) => {
      state.schedulerconfigurationEdit = action.payload;
    },
    AppointmentControlEdit: (state, action) => {
      state.appointmentcontrolEdit = action.payload;
    },
    BatchPrintingAppointmentsEdit: (state, action) => {
      state.batchprintingappointmentEdit = action.payload;
    },
    DepartmentEdit: (state, action) => {
      state.departmentEdit = action.payload;
    },
    PatientActivityAppointmentsEdit: (state, action) => {
      state.patientactivityappointmentseEdit = action.payload;
    },
    PatientPaymentsAppointmentsEdit: (state, action) => {
      state.patientpaymentsappointmentsEdit = action.payload;
    },
    //   claim
    ProfessionalClaimEdit: (state, action) => {
      state.professionalclaimEdit = action.payload;
    },
    InstitutionalClaimEdit: (state, action) => {
      state.institutionalclaimEdit = action.payload;
    },
    BatchPrintingClaimEdit: (state, action) => {
      state.batchprintingclaimEdit = action.payload;
    },
    ClaimFollowUpEdit: (state, action) => {
      state.claimfollowupEdit = action.payload;
    },
    ClearinghouseReportsEdit: (state, action) => {
      state.clearinghousereportsEdit = action.payload;
    },
    ControlClaimsEdit: (state, action) => {
      state.controlclaimEdit = action.payload;
    },
    NYWorkerCompFormEdit: (state, action) => {
      state.nyworkerscompformEdit = action.payload;
    },
    PatientActivityClaimEdit: (state, action) => {
      state.patientactivityclaimEdit = action.payload;
    },
    PatientPaymentsClaimEdit: (state, action) => {
      state.patientpaymentclaimEdit = action.payload;
    },
    TrackingClaimEdit: (state, action) => {
      state.trackingclaimEdit = action.payload;
    },
    //   customer setup
    PracticeEdit: (state, action) => {
      state.practiceEdit = action.payload;
    },
    ProviderEdit: (state, action) => {
      state.providerEdit = action.payload;
    },
    FacilityEdit: (state, action) => {
      state.facilityEdit = action.payload;
    },
    ReferringEdit: (state, action) => {
      state.referringEdit = action.payload;
    },
    PayerEdit: (state, action) => {
      state.payerEdit = action.payload;
    },
    PayerAgreementsEdit: (state, action) => {
      state.payeragreementEdit = action.payload;
    },
    CodesEdit: (state, action) => {
      state.codesEdit = action.payload;
    },
    InventoryEdit: (state, action) => {
      state.inventoryEdit = action.payload;
    },
    FeeSchedulesEdit: (state, action) => {
      state.feeschedulesEdit = action.payload;
    },
    ContractManagementEdit: (state, action) => {
      state.contractmanagementEdit = action.payload;
    },
    AlertControlEdit: (state, action) => {
      state.alertcontrolEdit = action.payload;
    },
    StatementAutomationEdit: (state, action) => {
      state.statementautomationEdit = action.payload;
    },
    LabelSuperbillConfigEdit: (state, action) => {
      state.labelandsuperbillconfigEdit = action.payload;
    },
    PIISSNCustomerEdit: (state, action) => {
      state.piissncustomerEdit = action.payload;
    },
    AccountSetupCustomerEdit: (state, action) => {
      state.accountsetupcustomerEdit = action.payload;
    },
    BillPaymentCustomerEdit: (state, action) => {
      state.billpaymentcustomerEdit = action.payload;
    },
    CustomizationEdit: (state, action) => {
      state.customizationEdit = action.payload;
    },

    //Document
    DocumentManagementEdit: (state, action) => {
      state.documentmanagementEdit = action.payload;
    },

    DashboardEdit: (state, action) => {
      state.dashboardEdit = action.payload;
    },
    MessagingEdit: (state, action) => {
      state.messagingEdit = action.payload;
    },
    ContactsEdit: (state, action) => {
      state.contactsEdit = action.payload;
    },
    AdministerTasksEdit: (state, action) => {
      state.administertasksEdit = action.payload;
    },
    // Interface
    InterfaceTrackingEdit: (state, action) => {
      state.interfacetrackingEdit = action.payload;
    },
    // Other
    PaymentPortalEdit: (state, action) => {
      state.paymentportalEdit = action.payload;
    },

    // Patient
    PatientEdit: (state, action) => {
      state.patientEdit = action.payload;
    },
    AddressVerifyEdit: (state, action) => {
      state.addressverificationEdit = action.payload;
    },
    BatchEligibilityPatientEdit: (state, action) => {
      state.batcheligibilityEdit = action.payload;
    },
    BatchPrintingPatientEdit: (state, action) => {
      state.batchprintingEdit = action.payload;
    },
    ControlPatientEdit: (state, action) => {
      state.controlpatientEdit = action.payload;
    },
    DebitPatientEdit: (state, action) => {
      state.debitpatientEdit = action.payload;
    },
    EditNotesPatientEdit: (state, action) => {
      state.editnotesEdit = action.payload;
    },
    EligibilityEdit: (state, action) => {
      state.eligibilitypatientEdit = action.payload;
    },
    EnhancedStatementPrintingEdit: (state, action) => {
      state.enhancedstatementprintingEdit = action.payload;
    },
    PatientAccountManagementEdit: (state, action) => {
      state.patientaccountmanagementEdit = action.payload;
    },
    PatientActivityPatientsEdit: (state, action) => {
      state.patientactivitypatientEdit = action.payload;
    },
    PatientMergeEdit: (state, action) => {
      state.patientmergeEdit = action.payload;
    },
    PatientNotesEdit: (state, action) => {
      state.patientnotesEdit = action.payload;
    },
    PatientPaymentsPatientsEdit: (state, action) => {
      state.patientpaymentspatientEdit = action.payload;
    },
    PaymentPortalInviteEdit: (state, action) => {
      state.patientportalinviteEdit = action.payload;
    },
    PIISSNPatientEdit: (state, action) => {
      state.piissnpatientEdit = action.payload;
    },
    TrackingPatientEdit: (state, action) => {
      state.trackingpatientEdit = action.payload;
    },
    // Paayment
    PatientPaymentsEdit: (state, action) => {
      state.patient_paymentsEdit = action.payload;
    },
    InsurancePaymentsEdit: (state, action) => {
      state.insurancepaymentsEdit = action.payload;
    },
    ERAautoApplyEdit: (state, action) => {
      state.eraautoapplyEdit = action.payload;
    },
    PatientActivityPaymentEdit: (state, action) => {
      state.patientactivitypaymentEdit = action.payload;
    },
    TrackingPaymentEdit: (state, action) => {
      state.trackingpaymentsEdit = action.payload;
    },
    ReportEdit: (state, action) => {
      state.reportsEdit = action.payload;
    },
    ARManagementReportsEdit: (state, action) => {
      state.armanagementreportsEdit = action.payload;
    },
    ManagementReportsEdit: (state, action) => {
      state.managementreportsEdit = action.payload;
    },
    ReportBuilderEdit: (state, action) => {
      state.reportbuilderEdit = action.payload;
    },
  },
});
export const {
  CustomerEditChange,
  SelectRoleEdit,
  SelectRolePermEdit,
  SelectPermissionCategoryEdit,
  // account admin actions
  AccountSetupEdit,
  BillPaymentEdit,
  MonthlyInvoiceEdit,
  // appointment actions
  SchedulerEdit,
  SchedulerConfigurationEdit,
  AppointmentControlEdit,
  BatchPrintingAppointmentsEdit,
  DepartmentEdit,
  PatientActivityAppointmentsEdit,
  PatientPaymentsAppointmentsEdit,
  // claim actions
  ProfessionalClaimEdit,
  InstitutionalClaimEdit,
  BatchPrintingClaimEdit,
  ClaimFollowUpEdit,
  ClearinghouseReportsEdit,
  ControlClaimsEdit,
  NYWorkerCompFormEdit,
  PatientActivityClaimEdit,
  PatientPaymentsClaimEdit,
  TrackingClaimEdit,
  // customer setup
  PracticeEdit,
  ProviderEdit,
  FacilityEdit,
  ReferringEdit,
  PayerEdit,
  PayerAgreementsEdit,
  CodesEdit,
  InventoryEdit,
  FeeSchedulesEdit,
  ContractManagementEdit,
  AlertControlEdit,
  StatementAutomationEdit,
  LabelSuperbillConfigEdit,
  PIISSNCustomerEdit,
  AccountSetupCustomerEdit,
  BillPaymentCustomerEdit,
  CustomizationEdit,

  DocumentManagementEdit,
  // Home
  DashboardEdit,
  MessagingEdit,
  ContactsEdit,
  AdministerTasksEdit,
  // Interface
  InterfaceTrackingEdit,
  // Other
  PaymentPortalEdit,
  // Patient
  PatientEdit,
  AddressVerifyEdit,

  BatchEligibilityPatientEdit,
  BatchPrintingPatientEdit,
  ControlPatientEdit,
  DebitPatientEdit,
  EditNotesPatientEdit,
  EligibilityEdit,

  EnhancedStatementPrintingEdit,

  PatientAccountManagementEdit,
  PatientActivityPatientsEdit,
  PatientMergeEdit,
  PatientNotesEdit,
  PatientPaymentsPatientsEdit,

  PaymentPortalInviteEdit,
  PIISSNPatientEdit,
  TrackingPatientEdit,
  //
  PatientPaymentsEdit,

  InsurancePaymentsEdit,
  ERAautoApplyEdit,

  PatientActivityPaymentEdit,
  TrackingPaymentEdit,
  //
  ReportEdit,
  ARManagementReportsEdit,
  ManagementReportsEdit,
  ReportBuilderEdit,
} = PermissionEditSlice.actions;
export default PermissionEditSlice.reducer;
