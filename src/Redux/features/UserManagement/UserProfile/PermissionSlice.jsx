import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  customers: sessionStorage.getItem("customer_id"),
  // assignrole: null,
  selectrole: 'user',
  statusRole: 'Role',
  statusPermission: 'Permissions',
  selectpermcategory: 'Account Administration',
  // Account Administration
  accountsetup: 'Account Administration Account Setup Deny',
  billpayment: 'Account Administration Bill Payment Deny',
  monthlyinvoice: 'Account Administration Monthly Invoice Deny',
  // Appointments
  scheduler: 'Appointments Scheduler Deny',
  schedulerconfiguration: 'Appointments Scheduler Configuration Deny',
  appointmentcontrol: 'Appointments Appointment Control Deny',
  batchprintingappointment: 'Appointments Batch Printing Deny',
  department: 'Appointments Department Deny',
  patientactivityappointments: 'Appointments Patient Activity Deny',
  patientpaymentsappointments: 'Appointments Patient Payments Deny',
  // Claim
  professionalclaim: 'Claim Professional Claim Deny',
  institutionalclaim: 'Claim Institutional Claim Deny',
  batchprintingclaim: 'Claim Batch Printing Deny',
  claimfollowup: 'Claim Claim Follow Up Deny',
  clearinghousereports: 'Claim Clearinghouse Reports Deny',
  controlclaim: 'Claim Control Deny',
  nyworkerscompform: 'Claim NY Workers Comp Form Deny',
  patientactivityclaim: 'Claim Patient Activity Deny',
  patientpaymentclaim: 'Claim Patient Payments Deny',
  trackingclaim: 'Claim Tracking Deny',
  // Customer Setup
  practice: 'Customer Setup Practice Deny',
  facility: 'Customer Setup Facility Deny',
  provider: 'Customer Setup Provider Deny',
  referring: 'Customer Setup Referring Deny',
  payer: 'Customer Setup Payer Deny',
  payeragreement: 'Customer Setup Payer Agreements Deny',
  codes: 'Customer Setup Codes Deny',
  inventory: 'Customer Setup Inventory Deny',
  feeschedules: 'Customer Setup Fee Schedules Deny',
  contractmanagement: 'Customer Setup Contract Management Deny',
  alertcontrol: 'Customer Setup Alert Control Deny',
  statementautomation: 'Customer Setup Statement Automation Deny',
  labelandsuperbillconfig: 'Customer Setup Label and Superbill Configuration Deny',
  piissncustomer: 'Customer Setup Personally Identifiable Information-SSN Deny',
  accountsetupcustomer: 'Customer Setup Account Setup Deny',
  billpaymentcustomer: 'Customer Setup Bill Payment Deny',
  customization: 'Customer Setup Customization Deny',
  // Documents
  documentmanagement: 'Documents Document Management Deny',
  // Home
  dashboard: 'Home Dashboard Deny',
  messaging: 'Home Messaging Deny',
  contacts: ' Home Contacts Deny',
  administertasks: 'Home Administer Tasks Own Tasks Only',
  // Interface
  interfacetracking: 'Interface Interface Tracking Deny',
  // Other
  paymentportal: 'Other Payment Portal Deny',
  // Patient
  patient: 'Patient Patient Deny',
  addressverification: 'Patient Address Verification Deny',
  batcheligibility: 'Patient Batch Eligibility Deny',
  batchprinting: 'Patient Batch Printing Deny',
  controlpatient: 'Patient Control Deny',
  debitpatient: 'Patient Debit/Credit Deny',
  editnotes: 'Patient Edit Notes Deny',
  eligibilitypatient: 'Patient Eligibility Deny',
  enhancedstatementprinting: 'Patient Enhanced Statement Printing Deny',
  patientaccountmanagement: 'Patient Patient Account Management Deny',
  patientactivitypatient: 'Patient Patient Activity Deny',
  patientmerge: 'Patient Patient Merge Deny',
  patientnotes: 'Patient Patient Notes Deny',
  patientpaymentspatient: 'Patient Patient Payments Deny',
  patientportalinvite: 'Patient Payment Portal Invite Deny',
  piissnpatient: 'Patient Personally Identifiable Information-SSN Deny',
  trackingpatient: 'Patient Tracking Deny',
  // Payment
  patient_payments: 'Payment Patient Payments Deny',
  insurancepayments: 'Payment Insurance Payments Deny',
  eraautoapply: 'Payment ERA Auto Apply Deny',
  patientactivitypayment: 'Payment Patient Activity Deny',
  trackingpayments: 'Payment Tracking Deny',
  // Reports
  reports: 'Reports Reports Deny',
  armanagementreports: 'Reports A/R Management Reports Deny',

  managementreports: 'Reports Management Reports Deny',
  reportbuilder: 'Reports Report Builder Deny',
};

export const PermissionSlice = createSlice({
  name: 'PermissionCustomers',
  initialState,
  reducers: {
    // Actions definitions
    CustomerChange: (state, action) => {
      // On Change Customer
      state.customers = action.payload;
    },
    // AssignedValueCheck: (state, action) => {
    //   // Assign to an existing Permissions Radio btn
    //   state.assignrole = action.payload;
    // },
    // Select Role
    SelectRole: (state, action) => {
      state.selectrole = action.payload;
    },
    SelectPermStatus: (state, action) => {
      state.statusPermission = action.payload;
    },

    SelectRoleStatus: (state, action) => {
      state.statusRole = action.payload;
    },
    // Select Permissions Category
    SelectPermissionCategory: (state, action) => {
      state.selectpermcategory = action.payload;
    },
    // Permission categories ***********************
    AccountSetup: (state, action) => {
      state.accountsetup = action.payload;
    },
    BillPayment: (state, action) => {
      state.billpayment = action.payload;
    },
    MonthlyInvoice: (state, action) => {
      state.monthlyinvoice = action.payload;
    },
    Scheduler: (state, action) => {
      state.scheduler = action.payload;
    },
    SchedulerConfiguration: (state, action) => {
      state.schedulerconfiguration = action.payload;
    },
    AppointmentControl: (state, action) => {
      state.appointmentcontrol = action.payload;
    },
    BatchPrintingAppointments: (state, action) => {
      state.batchprintingappointment = action.payload;
    },
    Department: (state, action) => {
      state.department = action.payload;
    },

    PatientActivityAppointments: (state, action) => {
      state.patientactivityappointments = action.payload;
    },
    PatientPaymentsAppointments: (state, action) => {
      state.patientpaymentsappointments = action.payload;
    },
    ProfessionalClaim: (state, action) => {
      state.professionalclaim = action.payload;
    },
    InstitutionalClaim: (state, action) => {
      state.institutionalclaim = action.payload;
    },
    BatchPrintingClaim: (state, action) => {
      state.batchprintingclaim = action.payload;
    },
    ClaimFollowUp: (state, action) => {
      state.claimfollowup = action.payload;
    },
    ClearinghouseReports: (state, action) => {
      state.clearinghousereports = action.payload;
    },
    ControlClaims: (state, action) => {
      state.controlclaim = action.payload;
    },
    NYWorkerCompForm: (state, action) => {
      state.nyworkerscompform = action.payload;
    },
    PatientActivityClaim: (state, action) => {
      state.patientactivityclaim = action.payload;
    },
    PatientPaymentsClaim: (state, action) => {
      state.patientpaymentclaim = action.payload;
    },
    TrackingClaim: (state, action) => {
      state.trackingclaim = action.payload;
    },
    // Customer Setup
    Practice: (state, action) => {
      state.practice = action.payload;
    },
    Provider: (state, action) => {
      state.provider = action.payload;
    },
    Facility: (state, action) => {
      state.facility = action.payload;
    },
    Referring: (state, action) => {
      state.referring = action.payload;
    },
    Payer: (state, action) => {
      state.payer = action.payload;
    },
    PayerAgreements: (state, action) => {
      state.payeragreement = action.payload;
    },
    Codes: (state, action) => {
      state.codes = action.payload;
    },
    Inventory: (state, action) => {
      state.inventory = action.payload;
    },
    FeeSchedules: (state, action) => {
      state.feeschedules = action.payload;
    },
    ContractManagement: (state, action) => {
      state.contractmanagement = action.payload;
    },
    AlertControl: (state, action) => {
      state.alertcontrol = action.payload;
    },
    StatementAutomation: (state, action) => {
      state.statementautomation = action.payload;
    },
    LabelSuperbillConfig: (state, action) => {
      state.labelandsuperbillconfig = action.payload;
    },
    PIISSNCustomer: (state, action) => {
      state.piissncustomer = action.payload;
    },

    Customization: (state, action) => {
      state.customization = action.payload;
    },
    AccountSetupCustomer: (state, action) => {
      state.accountsetupcustomer = action.payload;
    },
    BillPaymentCustomer: (state, action) => {
      state.billpaymentcustomer = action.payload;
    },
    DocumentManagement: (state, action) => {
      state.documentmanagement = action.payload;
    },
    // Home
    Dashboard: (state, action) => {
      state.dashboard = action.payload;
    },
    Messaging: (state, action) => {
      state.messaging = action.payload;
    },
    Contacts: (state, action) => {
      state.contacts = action.payload;
    },
    AdministerTasks: (state, action) => {
      state.administertasks = action.payload;
    },
    // Interface
    InterfaceTracking: (state, action) => {
      state.interfacetracking = action.payload;
    },
    // Other
    PaymentPortal: (state, action) => {
      state.paymentportal = action.payload;
    },
    // Patient
    Patient: (state, action) => {
      state.patient = action.payload;
    },
    AddressVerify: (state, action) => {
      state.addressverification = action.payload;
    },
    BatchEligibilityPatient: (state, action) => {
      state.batcheligibility = action.payload;
    },
    BatchPrintingPatient: (state, action) => {
      state.batchprinting = action.payload;
    },
    ControlPatient: (state, action) => {
      state.controlpatient = action.payload;
    },
    DebitPatient: (state, action) => {
      state.debitpatient = action.payload;
    },
    EditNotesPatient: (state, action) => {
      state.editnotes = action.payload;
    },
    Eligibility: (state, action) => {
      state.eligibilitypatient = action.payload;
    },
    EnhancedStatementPrinting: (state, action) => {
      state.enhancedstatementprinting = action.payload;
    },
    PatientAccountManagement: (state, action) => {
      state.patientaccountmanagement = action.payload;
    },
    PatientActivityPatients: (state, action) => {
      state.patientactivitypatient = action.payload;
    },
    PatientMerge: (state, action) => {
      state.patientmerge = action.payload;
    },
    PatientNotes: (state, action) => {
      state.patientnotes = action.payload;
    },
    PatientPaymentsPatients: (state, action) => {
      state.patientpaymentspatient = action.payload;
    },
    PaymentPortalInvite: (state, action) => {
      state.patientportalinvite = action.payload;
    },
    PIISSNPatient: (state, action) => {
      state.piissnpatient = action.payload;
    },
    TrackingPatient: (state, action) => {
      state.trackingpatient = action.payload;
    },
    // Paayment
    PatientPayments: (state, action) => {
      state.patient_payments = action.payload;
    },
    InsurancePayments: (state, action) => {
      state.insurancepayments = action.payload;
    },
    ERAautoApply: (state, action) => {
      state.eraautoapply = action.payload;
    },
    PatientActivityPayment: (state, action) => {
      state.patientactivitypayment = action.payload;
    },
    TrackingPayment: (state, action) => {
      state.trackingpayments = action.payload;
    },
    Report: (state, action) => {
      state.reports = action.payload;
    },
    ARManagementReports: (state, action) => {
      state.armanagementreports = action.payload;
    },
    ManagementReports: (state, action) => {
      state.managementreports = action.payload;
    },
    ReportBuilder: (state, action) => {
      state.reportbuilder = action.payload;
    },
  },
});

export const {
  CustomerChange,
  // AssignedValueCheck,
  CustomPermValue,
  SelectRole,
  SelectPermStatus,
  SelectRoleStatus,
  SelectPermissionCategory,
  AccountSetup,
  BillPayment,
  MonthlyInvoice,
  Scheduler,
  SchedulerConfiguration,
  AppointmentControl,
  BatchPrintingAppointments,
  Department,
  PatientActivityAppointments,
  PatientPaymentsAppointments,
  ProfessionalClaim,

  InstitutionalClaim,

  BatchPrintingClaim,

  ClaimFollowUp,

  ClearinghouseReports,

  ControlClaims,

  NYWorkerCompForm,

  PatientActivityClaim,
  PatientPaymentsClaim,

  TrackingClaim,

  Practice,
  Provider,
  Facility,
  Referring,
  Payer,
  PayerAgreements,
  Codes,

  Inventory,
  FeeSchedules,
  ContractManagement,

  AlertControl,
  StatementAutomation,
  LabelSuperbillConfig,

  PIISSNCustomer,

  AccountSetupCustomer,
  BillPaymentCustomer,

  Customization,

  DocumentManagement,
  // Home
  Dashboard,
  Messaging,
  Contacts,
  AdministerTasks,
  // Interface
  InterfaceTracking,
  // Other
  PaymentPortal,
  // Patient
  Patient,
  AddressVerify,

  BatchEligibilityPatient,
  BatchPrintingPatient,
  ControlPatient,
  DebitPatient,
  EditNotesPatient,
  Eligibility,

  EnhancedStatementPrinting,

  PatientAccountManagement,
  PatientActivityPatients,
  PatientMerge,
  PatientNotes,
  PatientPaymentsPatients,

  PaymentPortalInvite,
  PIISSNPatient,
  TrackingPatient,
  //
  PatientPayments,

  InsurancePayments,
  ERAautoApply,

  PatientActivityPayment,
  TrackingPayment,
  //
  Report,
  ARManagementReports,
  ManagementReports,
  ReportBuilder,
} = PermissionSlice.actions;
export default PermissionSlice.reducer;

// Thunks
