import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik as formValidate } from "formik";
import API from "../../../../../src/Api/ClientApi";
import { useSelector, useDispatch } from "react-redux";
import { PatternFormat } from "react-number-format";
// import {EditPermissionDataUser} from "../../../Redux/features/Security/ShowAllRolesSlice";
import {
  EditUserFetch,
  getUserTypeChangeHint,
} from "../../../../Redux/features/UserManagement/EditUserSlice";
import Swal from "sweetalert2";
import PermissionsEdit from "./PermissionsEdit";
import {
  AccountSetupEdit,
  SelectRoleEdit,
} from "../../../../Redux/features/UserManagement/UserProfile/PermissionEditSlice";
import { FormValuserprofileEdit } from "../../../../Schemas/FormValuserprofileEdit";

export default function UserProf(props) {
  const [image, setImage] = useState({ preview: "", raw: "" });
  const params = useParams();

  const accountsetupEdit = useSelector(
    (state) => state.EditUser?.edituserpermission?.accountAdminAccountSetup
  );
  const billpaymentEdit = useSelector(
    (state) => state.EditUser?.edituserpermission?.accountAdminBillPayment
  );
  const monthlyinvoiceEdit = useSelector(
    (state) => state.EditUser?.edituserpermission?.accountAdminMonthlyInvoice
  );
  const scheduler = useSelector(
    (state) => state.EditUser?.edituserpermission?.appointmentsScheduler
  );
  const schedulerconfiguration = useSelector(
    (state) =>
      state.EditUser?.edituserpermission?.AppointmentsSchedulerConfiguration
  );
  const appointmentcontrol = useSelector(
    (state) => state.EditUser?.edituserpermission?.appointmentControl
  );
  const batchprinting = useSelector(
    (state) => state.EditUser?.edituserpermission?.appointmentBatchPrinting
  );
  const department = useSelector(
    (state) => state.EditUser?.edituserpermission?.appointmentsDepartment
  );
  const patient_payments = useSelector(
    (state) => state.EditUser?.edituserpermission?.appointmentsPatientPayments
  );
  const patientactivityappointments = useSelector(
    (state) => state.EditUser?.edituserpermission?.appointmentsPatientActivity
  );

  const professionalClaim = useSelector(
    (state) => state.EditUser?.edituserpermission?.claimProfessional
  );
  const institutionalClaim = useSelector(
    (state) => state.EditUser?.edituserpermission?.claimInstitutional
  );
  const bacthprintng = useSelector(
    (state) => state.EditUser?.edituserpermission?.claimBatchPrinting
  );
  const claimfollowup = useSelector(
    (state) => state.EditUser?.edituserpermission?.claimFollowup
  );
  const clearinghousereports = useSelector(
    (state) => state.EditUser?.edituserpermission?.claimClearinghousereports
  );
  const controlclaim = useSelector(
    (state) => state.EditUser?.edituserpermission?.claimControl
  );
  const nyworkerscompform = useSelector(
    (state) => state.EditUser?.edituserpermission?.claimNyworkersCompForm
  );
  const patientactivityclaim = useSelector(
    (state) => state.EditUser?.edituserpermission?.climPatientActivity
  );
  const patientpaymentclaim = useSelector(
    (state) => state.EditUser?.edituserpermission?.climPatientPayment
  );
  const trackingclaim = useSelector(
    (state) => state.EditUser?.edituserpermission?.claimTracking
  );

  const facility = useSelector(
    (state) => state.EditUser?.edituserpermission?.customerSetupfacility
  );
  const practice = useSelector(
    (state) => state.EditUser?.edituserpermission?.customerSetuppractice
  );
  const provider = useSelector(
    (state) => state.EditUser?.edituserpermission?.customerSetupprovider
  );
  const referring = useSelector(
    (state) =>
      state.EditUser?.edituserpermission?.customerSetupreferringprovider
  );
  const payer = useSelector(
    (state) => state.EditUser?.edituserpermission?.customerSetuppayer
  );
  const payeragreement = useSelector(
    (state) => state.EditUser?.edituserpermission?.customerSetuppayeraggrement
  );
  const codes = useSelector(
    (state) => state.EditUser?.edituserpermission?.customerSetupcodes
  );
  const inventory = useSelector(
    (state) => state.EditUser?.edituserpermission?.customerSetupinventory
  );
  const feeschedules = useSelector(
    (state) => state.EditUser?.edituserpermission?.customerSetupfeeshedule
  );
  const contractmanagement = useSelector(
    (state) =>
      state.EditUser?.edituserpermission?.customerSetupcontractManagement
  );
  const alertcontrol = useSelector(
    (state) => state.EditUser?.edituserpermission?.customerSetupalertcontrol
  );
  const statementautomation = useSelector(
    (state) =>
      state.EditUser?.edituserpermission?.customerSetupstatementAutomation
  );
  const labelandsuperbillconfig = useSelector(
    (state) =>
      state.EditUser?.edituserpermission?.customerSetuplabelAndSuperBill
  );
  const piissncustomer = useSelector(
    (state) => state.EditUser?.edituserpermission?.customerSetuppersonalIdnSsn
  );
  const accountsetupcustomer = useSelector(
    (state) => state.EditUser?.edituserpermission?.customerSetupAccount
  );
  const billpaymentcustomer = useSelector(
    (state) => state.EditUser?.edituserpermission?.customerSetupbillPatment
  );
  const customization = useSelector(
    (state) => state.EditUser?.edituserpermission?.customerSetupcustomization
  );
  const documentmanagement = useSelector(
    (state) => state.EditUser?.edituserpermission?.documentmanagement
  );

  const dashboard = useSelector(
    (state) => state.EditUser?.edituserpermission?.homeDashboard
  );
  const messaging = useSelector(
    (state) => state.EditUser?.edituserpermission?.homeMessaging
  );
  const contacts = useSelector(
    (state) => state.EditUser?.edituserpermission?.homeContacts
  );
  const administertasks = useSelector(
    (state) => state.EditUser?.edituserpermission?.homeAdministerTasks
  );

  const interfacetracking = useSelector(
    (state) => state.EditUser?.edituserpermission?.interfaceTracking
  );

  const paymentportal = useSelector(
    (state) => state.EditUser?.edituserpermission?.OtherPaymentPortal
  );

  const patient = useSelector(
    (state) => state.EditUser?.edituserpermission?.patientPatient
  );
  const addressverification = useSelector(
    (state) => state.EditUser?.edituserpermission?.PatientAddressVerification
  );
  const batcheligibility = useSelector(
    (state) => state.EditUser?.edituserpermission?.patientBatchEligibility
  );
  const patientbatchprinting = useSelector(
    (state) => state.EditUser?.edituserpermission?.patientBatchPrinting
  );
  const controlpatient = useSelector(
    (state) => state.EditUser?.edituserpermission?.patientControl
  );
  const debitpatient = useSelector(
    (state) => state.EditUser?.edituserpermission?.patientDebitPatient
  );
  const editnotes = useSelector(
    (state) => state.EditUser?.edituserpermission?.patientEditNotes
  );
  const eligibilitypatient = useSelector(
    (state) => state.EditUser?.edituserpermission?.patientEligibilityDeny
  );
  const enhancedstatementprinting = useSelector(
    (state) => state.EditUser?.edituserpermission?.patientEnhancedStatement
  );
  const patientaccountmanagement = useSelector(
    (state) => state.EditUser?.edituserpermission?.patientPatientAccount
  );
  const patientactivitypatient = useSelector(
    (state) => state.EditUser?.edituserpermission?.patientPatientActivity
  );
  const patientmerge = useSelector(
    (state) => state.EditUser?.edituserpermission?.patientPatientMerge
  );
  const patientnotes = useSelector(
    (state) => state.EditUser?.edituserpermission?.patientPatientNotes
  );
  const patientpaymentspatient = useSelector(
    (state) => state.EditUser?.edituserpermission?.patientpaymentspatient
  );
  const patientportalinvite = useSelector(
    (state) => state.EditUser?.edituserpermission?.patientPaymentPortalInvite
  );
  const piissnpatient = useSelector(
    (state) => state.EditUser?.edituserpermission?.patientIdnSSN
  );
  const trackingpatient = useSelector(
    (state) => state.EditUser?.edituserpermission?.patientTracking
  );

  const Patpatient_payments = useSelector(
    (state) => state.EditUser?.edituserpermission?.paymentsPatient
  );
  const insurancepayments = useSelector(
    (state) => state.EditUser?.edituserpermission?.paymentsInsurance
  );
  const eraautoapply = useSelector(
    (state) => state.EditUser?.edituserpermission?.PaymentEraAutoApply
  );
  const patientactivitypayment = useSelector(
    (state) => state.EditUser?.edituserpermission?.paymentPatientactivity
  );
  const trackingpayments = useSelector(
    (state) => state.EditUser?.edituserpermission?.paymentsTracking
  );

  const reports = useSelector(
    (state) => state.EditUser?.edituserpermission?.reportsReports
  );
  const ARMReports = useSelector(
    (state) => state.EditUser?.edituserpermission?.reportsARManagement
  );
  const managementreports = useSelector(
    (state) => state.EditUser?.edituserpermission?.reportsmanagementreports
  );
  const reportbuilder = useSelector(
    (state) => state.EditUser?.edituserpermission?.reportbuilder
  );
  // get data from api
  useEffect(() => {
    if (params.id) {
      dispatch(EditUserFetch(params.id));
      // permissions from backend
      setaccountAdministrationAccountSetupedit(accountsetupEdit);
      setaccountAdministrationBillPaymentedit(billpaymentEdit);
      setaccountAdministrationMonthlyInvoiceedit(monthlyinvoiceEdit);
      setAppointmentScheduleConfigurationedit(scheduler);
      setappointmentControledit(appointmentcontrol);
      setAppointmentBatchPrintingedit(batchprinting);
      setAppointmentDepartmentedit(department);
      setAppointmentPatientActivityedit(patientactivityappointments);
      setappointmentPatientPaymentedit(patient_payments);
      setClaimProfessionalClaimedit(professionalClaim);
      setClaimInstitutionalClaimedit(institutionalClaim);
      setClaimBacthPrintingedit(bacthprintng);
      setClaimFollowUpedit(claimfollowup);
      setClaimClearingHouseReportsedit(clearinghousereports);
      setClaimControledit(controlclaim);
      setClaimNyWorkersCompFormedit(nyworkerscompform);
      setClaimPatientActivityedit(patientactivityclaim);
      setClaimPatientPaymentedit(patientpaymentclaim);
      setClaimTrackingedit(trackingclaim);
      setCustomerSetupPracticeedit(practice);
      setCustomerSetupProvideredit(provider);
      setCustomerSetupFacilityedit(facility);
      setCustomerSetupReferringedit(referring);
      setCustomerSetupPayeredit(payer);
      setCustomerSetupPayerAgreementedit(payeragreement);
      setCustomerSetupCodesedit(codes);
      setCustomerSetupInventoryedit(inventory);
      setCusomerSetupFeeScheduleedit(feeschedules);
      setCustomerSetupContractMgmntedit(contractmanagement);
      setCustomerSetupAlertControledit(alertcontrol);
      setCustomerSetupStatementAutomationedit(statementautomation);
      setCustomerSetupLblSpblConfigedit(labelandsuperbillconfig);
      setCustomerSetupPersnlIdInfoSSNedit(piissncustomer);
      setCustomerSetupAccSetupedit(accountsetupcustomer);
      setCustomerSetupBillPaymntedit(billpaymentcustomer);
      setCustomerSetupCustomiztionedit(customization);
      setDocumentDocMangmntedit(documentmanagement);
      setHomeDashboardedit(dashboard);
      setHomeMessgingedit(messaging);
      setHomeContacteditedit(contacts);
      setHomeAdminstrTaskedit(administertasks);
      setInterfaceInterfceTrackingedit(interfacetracking);
      setOtherPaymentPortaledit(paymentportal);
      setPatientPatientedit(patient);
      setPatientAddVerifedit(addressverification);
      setPatientBatchEligibedit(batcheligibility);
      setPatientBatchPrintingedit(patientbatchprinting);
      setPatientContrledit(controlpatient);
      setPatientDebitCreditedit(debitpatient);
      setPatienteditNotsedit(editnotes);
      setPatientEligbedit(eligibilitypatient);
      setPatientEnhancedStatementedit(enhancedstatementprinting);
      setPatientAccMgmntedit(patientaccountmanagement);
      setPatientActivityedit(patientactivitypatient);
      setPatientMergedit(patientmerge);
      setPatientNotsedit(patientnotes);
      setPatientPaymntedit(patientpaymentspatient);
      setPatientPaymPortaledit(patientportalinvite);
      setPatientIdInfoSSnedit(piissnpatient);
      setPatientTrackngedit(trackingpatient);
      setPaymentPatientPymntedit(Patpatient_payments);
      setPaymentInsuranceedit(insurancepayments);
      setPaymentEraAutoApplyedit(eraautoapply);
      setPaymentPatientActvtyedit(patientactivitypayment);
      setPaymentTrackngedit(trackingpayments);
      setReportsReportsedit(reports);
      setReportsArMgmntReportsedit(ARMReports);
      setReportMngmntReportsedit(managementreports);
      setReportReportsBuilderedit(reportbuilder);
    }
  }, [params]);
  const [
    accountAdministrationAccountSetup,
    setaccountAdministrationAccountSetupedit,
  ] = useState("");

  const [
    accountAdministrationBillPayment,
    setaccountAdministrationBillPaymentedit,
  ] = useState("");
  const [
    accountAdministrationMonthlyInvoice,
    setaccountAdministrationMonthlyInvoiceedit,
  ] = useState("");

  const [appointmentSchedule, setAppointmentScheduleedit] = useState("");
  const [
    appointmentScheduleConfiguration,
    setAppointmentScheduleConfigurationedit,
  ] = useState("");
  const [appointmentControl, setappointmentControledit] = useState("");

  const [appointmentBatchPrinting, setAppointmentBatchPrintingedit] =
    useState("");
  const [appointmentDepartment, setAppointmentDepartmentedit] = useState("");
  const [appointmentPatientActivity, setAppointmentPatientActivityedit] =
    useState("");
  const [appointmentPatientPayment, setappointmentPatientPaymentedit] =
    useState("");
  const [claimProfessionalClaim, setClaimProfessionalClaimedit] = useState("");
  const [claimInstitutionalClaim, setClaimInstitutionalClaimedit] =
    useState("");
  const [claimBacthPrinting, setClaimBacthPrintingedit] = useState("");
  const [claimFollowUp, setClaimFollowUpedit] = useState("");

  const [claimClearingHouseReports, setClaimClearingHouseReportsedit] =
    useState("");
  const [claimControl, setClaimControledit] = useState("");
  const [claimNyWorkersCompForm, setClaimNyWorkersCompFormedit] = useState("");
  const [claimPatientActivity, setClaimPatientActivityedit] = useState("");
  const [claimPatientPayment, setClaimPatientPaymentedit] = useState("");
  const [claimTracking, setClaimTrackingedit] = useState("");
  const [customerSetupPractice, setCustomerSetupPracticeedit] = useState("");
  const [customerSetupProvider, setCustomerSetupProvideredit] = useState("");
  const [customerSetupFacility, setCustomerSetupFacilityedit] = useState("");
  const [customerSetupReferring, setCustomerSetupReferringedit] = useState("");
  const [customerSetupPayer, setCustomerSetupPayeredit] = useState("");
  const [customerSetupPayerAgreement, setCustomerSetupPayerAgreementedit] =
    useState("");
  const [customerSetupCodes, setCustomerSetupCodesedit] = useState("");
  const [customerSetupInventory, setCustomerSetupInventoryedit] = useState("");
  const [cusomerSetupFeeSchedule, setCusomerSetupFeeScheduleedit] =
    useState("");
  const [customerSetupContractMgmnt, setCustomerSetupContractMgmntedit] =
    useState("");
  const [customerSetupAlertControl, setCustomerSetupAlertControledit] =
    useState("");
  const [
    customerSetupStatementAutomation,
    setCustomerSetupStatementAutomationedit,
  ] = useState("");
  const [customerSetupLblSpblConfig, setCustomerSetupLblSpblConfigedit] =
    useState("");
  const [customerSetupPersnlIdInfoSSN, setCustomerSetupPersnlIdInfoSSNedit] =
    useState("");
  const [customerSetupAccSetup, setCustomerSetupAccSetupedit] = useState("");
  const [customerSetupBillPaymnt, setCustomerSetupBillPaymntedit] =
    useState("");
  const [customerSetupCustomiztion, setCustomerSetupCustomiztionedit] =
    useState("");
  const [documentDocMangmnt, setDocumentDocMangmntedit] = useState("");
  const [homeDashboard, setHomeDashboardedit] = useState("");
  const [homeMessging, setHomeMessgingedit] = useState("");
  const [homeContact, setHomeContacteditedit] = useState("");
  const [homeAdminstrTask, setHomeAdminstrTaskedit] = useState("");
  const [interfaceInterfceTracking, setInterfaceInterfceTrackingedit] =
    useState("");
  const [otherPaymentPortal, setOtherPaymentPortaledit] = useState("");
  const [patientPatient, setPatientPatientedit] = useState("");
  const [patientAddVerif, setPatientAddVerifedit] = useState("");
  const [patientBatchEligib, setPatientBatchEligibedit] = useState("");
  const [patientBatchPrinting, setPatientBatchPrintingedit] = useState("");
  const [patientContrl, setPatientContrledit] = useState("");
  const [patientDebitCredit, setPatientDebitCreditedit] = useState("");
  const [patienteditNots, setPatienteditNotsedit] = useState("");
  const [patientEligb, setPatientEligbedit] = useState("");
  const [patientEnhancedStatement, setPatientEnhancedStatementedit] =
    useState("");
  const [patientAccMgmnt, setPatientAccMgmntedit] = useState("");
  const [patientActivity, setPatientActivityedit] = useState("");
  const [patientMerg, setPatientMergedit] = useState("");
  const [patientNots, setPatientNotsedit] = useState("");
  const [patientPaymnt, setPatientPaymntedit] = useState("");
  const [patientpaymPortal, setPatientPaymPortaledit] = useState("");
  const [patientIdInfoSSn, setPatientIdInfoSSnedit] = useState("");
  const [patientTrackng, setPatientTrackngedit] = useState("");
  const [paymentPatientPymnt, setPaymentPatientPymntedit] = useState("");
  const [paymentInsurance, setPaymentInsuranceedit] = useState("");
  const [paymentEraAutoApply, setPaymentEraAutoApplyedit] = useState("");
  const [paymentPatientActvty, setPaymentPatientActvtyedit] = useState("");
  const [paymentTrackng, setPaymentTrackngedit] = useState("");
  const [reportsReports, setReportsReportsedit] = useState("");

  const [reportsArMgmntReports, setReportsArMgmntReportsedit] = useState("");

  const [reportMngmntReports, setReportMngmntReportsedit] = useState("");

  const [reportReportsBuilder, setReportReportsBuilderedit] = useState("");

  // update btn disable,conditionaly
  const [updatedisable, setUpdatedisable] = useState(false);
  // methods for permissions
  function accountAdministrationAccountSetupMethodedit(name) {
    setaccountAdministrationAccountSetupedit(name);
  }
  function accountAdministrationbillPaymentMethodedit(name) {
    setaccountAdministrationBillPaymentedit(name);
  }
  function accountAdministrationmonthlyInvoiceMethodedit(name) {
    setaccountAdministrationMonthlyInvoiceedit(name);
  }
  function appointmentScheduleMethodedit(name) {
    setAppointmentScheduleedit(name);
  }
  function appointmentScheduleConfigurationMethodedit(name) {
    setAppointmentScheduleConfigurationedit(name);
  }
  function appointmentControlMethodedit(name) {
    setappointmentControledit(name);
  }
  function appointmentBatchPrintingMethodedit(name) {
    setAppointmentBatchPrintingedit(name);
  }
  function AppointmentDepartmentMethodedit(name) {
    setAppointmentDepartmentedit(name);
  }
  function AppointmentPatientActivityMethodedit(name) {
    setAppointmentPatientActivityedit(name);
  }
  function appointmentPatientPaymentMethodedit(name) {
    setappointmentPatientPaymentedit(name);
  }
  function claimProfessionalClaimMethodedit(name) {
    setClaimProfessionalClaimedit(name);
  }
  function claimInstitutionalClaimMethodedit(name) {
    setClaimInstitutionalClaimedit(name);
  }
  function ClaimBacthPrintingMethodedit(name) {
    setClaimBacthPrintingedit(name);
  }
  function ClaimFollowUpMethodedit(name) {
    setClaimFollowUpedit(name);
  }
  function ClaimClearingHouseReportsMethodedit(name) {
    setClaimClearingHouseReportsedit(name);
  }
  function ClaimControlsMethodedit(name) {
    setClaimControledit(name);
  }
  function ClaimNyWorkersCompFormMethodedit(name) {
    setClaimNyWorkersCompFormedit(name);
  }
  function ClaimPatientActivityMethodedit(name) {
    setClaimPatientActivityedit(name);
  }
  function ClaimPatientPaymentMethodedit(name) {
    setClaimPatientPaymentedit(name);
  }
  function ClaimTrackingMethodedit(name) {
    setClaimTrackingedit(name);
  }
  function CustomerSetupPracticeMethodedit(name) {
    setCustomerSetupPracticeedit(name);
  }
  function CustomerSetupProviderMethodeditedit(name) {
    setCustomerSetupProvideredit(name);
  }
  function CustomerSetupFacilityMethodedit(name) {
    setCustomerSetupFacilityedit(name);
  }
  function CustomerSetupReferringMethodedit(name) {
    setCustomerSetupReferringedit(name);
  }
  function CustomerSetupPayerMethodedit(name) {
    setCustomerSetupPayeredit(name);
  }
  function CustomerSetupPayerAgreementMethodedit(editname) {
    setCustomerSetupPayerAgreementedit(name);
  }
  function CustomerSetupCodesMethodedit(name) {
    setCustomerSetupCodesedit(name);
  }
  function CustomerSetupInventoryMethodedit(name) {
    setCustomerSetupInventoryedit(name);
  }
  function CusomerSetupFeeScheduleMethodedit(name) {
    setCusomerSetupFeeScheduleedit(name);
  }
  function CustomerSetupContractMgmntMethodedit(name) {
    setCustomerSetupContractMgmntedit(name);
  }
  function CustomerSetupAlertControlMethodedit(name) {
    setCustomerSetupAlertControledit(name);
  }
  function CustomerSetupStatementAutomationMethodedit(name) {
    setCustomerSetupStatementAutomationedit(name);
  }
  function CustomerSetupLblSpblConfigMethodedit(name) {
    setCustomerSetupLblSpblConfigedit(name);
  }
  function CustomerSetupPersnlIdInfoSSNMethodedit(name) {
    setCustomerSetupPersnlIdInfoSSNedit(name);
  }
  function CustomerSetupAccSetupMethodedit(name) {
    setCustomerSetupAccSetupedit(name);
  }
  function CustomerSetupBillPaymntMethodedit(name) {
    setCustomerSetupBillPaymntedit(name);
  }
  function CustomerSetupCustomiztionMethodedit(name) {
    setCustomerSetupCustomiztionedit(name);
  }
  function DocumentDocMangmntMethodedit(name) {
    setDocumentDocMangmntedit(name);
  }
  function HomeDashboardMethodedit(name) {
    setHomeDashboardedit(name);
  }
  function HomeMessgingMethodedit(name) {
    setHomeMessgingedit(name);
  }
  function HomeContactMethodedit(name) {
    setHomeContacteditedit(name);
  }
  function HomeAdminstrTaskMethodedit(name) {
    setHomeAdminstrTaskedit(name);
  }
  function InterfaceInterfceTrackingMethodedit(name) {
    setInterfaceInterfceTrackingedit(name);
  }
  function OtherPaymentPortalMethodedit(name) {
    setOtherPaymentPortaledit(name);
  }
  function PatientPatientMethodedit(name) {
    setPatientPatientedit(name);
  }
  function PatientAddVerifMethodedit(name) {
    setPatientAddVerifedit(name);
  }
  function PatientBatchEligibMethodedit(name) {
    setPatientBatchEligibedit(name);
  }
  function PatientBatchPrintingMethodedit(name) {
    setPatientBatchPrintingedit(name);
  }
  function PatientContrlMethodedit(name) {
    setPatientContrledit(name);
  }
  function PatientDebitCreditMethodedit(name) {
    setPatientDebitCreditedit(name);
  }
  function PatienteditNotsMethodedit(name) {
    setPatienteditNotsedit(name);
  }
  function PatientEligbMethodedit(name) {
    setPatientEligbedit(name);
  }
  function PatientEnhancedStatementbMethodedit(name) {
    setPatientEnhancedStatementedit(name);
  }
  function PatientAccMgmntMethodedit(name) {
    setPatientAccMgmntedit(name);
  }
  function PatientActivityMethodedit(name) {
    setPatientActivityedit(name);
  }
  function PatientMergMethodedit(name) {
    setPatientMergedit(name);
  }
  function PatientNotsMethodedit(name) {
    setPatientNotsedit(name);
  }
  function PatientPaymntMethodedit(name) {
    setPatientPaymntedit(name);
  }
  function PatientPaymPortalMethodedit(name) {
    setPatientPaymPortaledit(name);
  }
  function PatientIdInfoSSnMethodedit(name) {
    setPatientIdInfoSSnedit(name);
  }
  function PatientTrackngMethodedit(name) {
    setPatientTrackngedit(name);
  }
  function PaymentPatientPymntMethodedit(name) {
    setPaymentPatientPymntedit(name);
  }
  function PaymentInsuranceMethodedit(name) {
    setPaymentInsuranceedit(name);
  }
  function PaymentEraAutoApplyMethodedit(name) {
    setPaymentEraAutoApplyedit(name);
  }
  function PaymentPatientActvtyMethodedit(name) {
    setPaymentPatientActvtyedit(name);
  }
  function PaymentTrackngMethodedit(name) {
    setPaymentTrackngedit(name);
  }
  function ReportsReportsMethodedit(name) {
    setReportsReportsedit(name);
  }
  function ReportsArMgmntReportsMethodedit(name) {
    setReportsArMgmntReportsedit(name);
  }
  function ReportMngmntReportsMethodedit(name) {
    setReportMngmntReportsedit(name);
  }
  function ReportReportsBuilderMethodedit(name) {
    setReportReportsBuilderedit(name);
  }

  // editCustomer

  const dispatch = useDispatch();
  const [permissionValues, setPermissionValues] = useState(
    useSelector((state) => state.PermissionEditSlice)
  );
  const [customerName, setCustomerName] = useState(
    useSelector((state) => state.PermissionEditSlice.editCustomer)
  );
  const permissionsValuefJson = JSON.stringify(permissionValues);

  const { data: usersEdit, status } = useSelector((state) => state.EditUser);
  const userseditid = params?.id;

  const title = useSelector((state) => state.EditUser?.data?.data?.title);
  const role = useSelector((state) => state.EditUser?.data?.data?.role);
  const name = useSelector((state) => state.EditUser?.data?.data?.username);
  const fName = useSelector((state) => state.EditUser?.data?.data?.first_name);
  const lName = useSelector((state) => state.EditUser?.data?.data?.last_name);
  const email = useSelector((state) => state.EditUser?.data?.data?.email);
  const phone1 = useSelector((state) => state.EditUser?.data?.data?.phone);
  const createdAt = useSelector(
    (state) => state.EditUser?.data?.data?.created_at
  );
  const deleted_at = useSelector(
    (state) => state.EditUser?.data?.data?.deleted_at
  );
  const phone2 = useSelector((state) => state.EditUser?.data?.data?.phone2);
  const ext1 = useSelector((state) => state.EditUser?.data?.data?.ext1);
  const ext2 = useSelector((state) => state.EditUser?.data?.data?.ext2);
  const mi = useSelector((state) => state.EditUser?.data?.data?.mi);
  const permissionsdata = useSelector(
    (state) => state.EditUser.edituserpermission
  );
  // const phone1 = useSelector((state) => state.EditUser.data.phone);

  const [editname, setEditName] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editfName, setEditfName] = useState("");
  const [editlName, setEditlName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editMi, setEditMi] = useState("");
  const [editPhone1, setEditPhone1] = useState("");
  const [editExt1, setEditExt1] = useState("");
  const [editPhone2, setEditPhone2] = useState("");
  const [editExt2, setEditExt2] = useState("");
  const [permissions, setPermissions] = useState("");

  useEffect(() => {
    setEditName(name);
    setEditfName(fName);
    setEditlName(lName);
    setEditPhone1(phone1);
    setEditEmail(email);
    setEditTitle(title);
    setEditMi(mi);
    setEditRole(role);
    setEditExt1(ext1);
    setEditPhone2(phone2);
    setEditExt2(ext2);
    setPermissions(permissionsdata);
  }, [name, fName, lName, phone1, email]);

  const navigate = useNavigate();

  // change image
  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };
  const selectrole = useSelector(
    (state) => state.PermissionEditSlice.selectrole
  );
  const selectStatus = useSelector((state) => state.PermissionEditSlice);
  // customer Access Pending
  const customeraccess = useSelector((state) => state.CustomersAccess);
  const [customaccess, setCustomaccess] = useState([]);

  useEffect(() => {
    setCustomaccess(customeraccess);
  }, [customeraccess]);

  const permvalues = useSelector((state) => state.PermissionEditSlice); // get values from redux
  const jsonperms = JSON.stringify(permvalues); // Convert Values to JSON String object
  const [fjson, setfjson] = useState(jsonperms); // Set Values frrom JSON String

  const [activate, setActivate] = useState(0);

  // form initial vaues formik
  const initialValues = {
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    title: "",
    phone1: "",
    phone2: "",
    ext1: "",
    ext2: "",
    userprofilemi: "",
    // permission values
    accountsetupEdit: "",
    user_type: selectrole,
    // status_type: selectStatus,
    activation_Status: activate,
    permissionsValue: useSelector((state) => state.PermissionEditSlice),
    customersaccess: [useSelector((state) => state.CustomersAccess)],
    image: [],
  };

  useEffect(() => {
    setfjson(permvalues);
  }, [permvalues]);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    formValidate({
      initialValues,
      validationSchema: FormValuserprofileEdit,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: (values, action) => {
        // API update user by id

        API.put(`/accountadmin/usermanagement/updateuser/${userseditid}`, {
          username: editname,
          email: editEmail,
          title: editTitle?.toString()?.toUpperCase(),
          firstname: editfName,
          lastname: editlName,
          userprofilemi: editMi,
          phone1: editPhone1,
          phone2: editPhone2,
          ext1: editExt1,
          ext2: editExt2,
          // permission values
          accountsetup: accountAdministrationAccountSetup,
          billpayment: accountAdministrationBillPayment,
          monthlyInvoice: accountAdministrationMonthlyInvoice,
          appointmentSchedule: appointmentSchedule,
          appointmentScheduleConfiguration: appointmentScheduleConfiguration,
          appointmentControl: appointmentControl,
          appointmentBatchPrinting: appointmentBatchPrinting,
          appointmentDepartment: appointmentDepartment,
          appointmentPatientActivity: appointmentPatientActivity,
          appointmentPatientPayment: appointmentPatientPayment,
          claimProfessionalClaim: claimProfessionalClaim,
          claimInstitutionalClaim: claimInstitutionalClaim,
          claimBacthPrinting: claimBacthPrinting,
          claimFollowUp: claimFollowUp,
          claimClearingHouseReports: claimClearingHouseReports,
          claimControl: claimControl,
          claimNyWorkersCompForm: claimNyWorkersCompForm,
          claimPatientActivity: claimPatientActivity,
          claimPatientPayment: claimPatientPayment,
          claimTracking: claimTracking,
          customerSetupPractice: customerSetupPractice,
          customerSetupProvider: customerSetupProvider,
          customerSetupFacility: customerSetupFacility,
          customerSetupReferring: customerSetupReferring,
          customerSetupPayer: customerSetupPayer,
          customerSetupPayerAgreement: customerSetupPayerAgreement,
          customerSetupCodes: customerSetupCodes,
          customerSetupInventory: customerSetupInventory,
          cusomerSetupFeeSchedule: cusomerSetupFeeSchedule,
          customerSetupContractMgmnt: customerSetupContractMgmnt,
          customerSetupAlertControl: customerSetupAlertControl,
          customerSetupStatementAutomation: customerSetupStatementAutomation,
          customerSetupLblSpblConfig: customerSetupBillPaymnt,
          customerSetupPersnlIdInfoSSN: customerSetupPersnlIdInfoSSN,
          customerSetupAccSetup: customerSetupAccSetup,
          customerSetupBillPaymnt: customerSetupBillPaymnt,
          customerSetupCustomiztion: customerSetupCustomiztion,
          documentDocMangmnt: documentDocMangmnt,
          homeDashboard: homeDashboard,
          homeMessging: homeMessging,
          homeContact: homeContact,
          homeAdminstrTask: homeAdminstrTask,
          interfaceInterfceTracking: interfaceInterfceTracking,
          otherPaymentPortal: otherPaymentPortal,
          patientPatient: patientPatient,
          patientAddVerif: patientAddVerif,
          patientBatchEligib: patientBatchEligib,
          patientBatchPrinting: patientBatchPrinting,
          patientContrl: patientContrl,
          patientDebitCredit: patientDebitCredit,
          patienteditNots: patienteditNots,
          patientEligb: patientEligb,
          patientEnhancedStatement: patientEnhancedStatement,
          patientAccMgmnt: patientAccMgmnt,
          patientActivity: patientActivity,
          patientMerg: patientMerg,
          patientNots: patientNots,
          patientPaymnt: patientPaymnt,
          patientpaymPortal: patientpaymPortal,
          patientIdInfoSSn: patientIdInfoSSn,
          patientTrackng: patientTrackng,
          paymentPatientPymnt: paymentPatientPymnt,
          paymentInsurance: paymentInsurance,
          paymentEraAutoApply: paymentEraAutoApply,
          paymentPatientActvty: paymentPatientActvty,
          paymentTrackng: paymentTrackng,
          reportsReports: reportsReports,
          reportsArMgmntReports: reportsArMgmntReports,
          reportMngmntReports: reportMngmntReports,
          reportReportsBuilder: reportReportsBuilder,

          customaccess: customaccess,
          activation_Status: activate,
          image: image.preview,
          fjson: fjson, // Values from Permission including user_type
        });

        // to get rid of all the values after submitting the form
        image.preview = null;
        setUpdatedisable(true);
        // Sweet Alert on Successful User Entry
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        action.resetForm();
        navigate("/user-managment");
      },
    });
  const userTypeHandler = (e) => {
    dispatch(SelectRoleEdit(e.target.value));
    dispatch(getUserTypeChangeHint(true));
  };
  return (
    <>
      {editEmail ? (
        <form className="row" method="post" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <div className="row g-3">
              {/* Profile Picture is Defined in a Component Below */}
              <div>
                <label htmlFor="userprofilepic">
                  {image.preview ? (
                    <img
                      src={image.preview}
                      className="rounded-circle pe-auto"
                      alt="Profile Picture"
                      width="80"
                      height="80"
                    />
                  ) : (
                    <>
                      <span
                        className="fa-stack fa-2x mt-3 mb-2 pe-auto"
                        style={{ cursor: "pointer" }}
                      >
                        <i className="fa-sharp fa-solid fa-circle-user fa-2x pe-auto"></i>
                      </span>
                      {/* <h5 className="text-center">Upload your photo</h5> */}
                    </>
                  )}
                </label>
                <input
                  type="file"
                  id="userprofilepic"
                  name="userprofilepic"
                  style={{ display: "none" }}
                  onChange={handleChangeImage}
                  onSubmit={() =>
                    setFieldValue("file", event.currentTarget.files[0])
                  }
                />
                <br />
              </div>
              <br />
              <div className="col-10">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="username"
                  placeholder="Username"
                  autoComplete="off"
                  autoFocus
                  name="username"
                  value={editname.trim()}
                  // onChange={(e) => setEditName(e.target.value)}
                  onBlur={handleBlur}
                  maxLength="25"
                />
                {touched.username && errors.username ? (
                  <p className="form-error">{errors.username}</p>
                ) : null}
              </div>
              <div className="row px-2 mt-2">
                {" "}
                <div className="col-md-4">
                  <label htmlFor="inputState" className="form-label">
                    Type
                  </label>
                  <select
                    disabled={false}
                    id="user_type"
                    name="user_type"
                    className="form-select form-select-sm"
                    value={values.selectrole}
                    // onChange={handleChange}
                    // required={true}
                    // defaultValue={'user'}
                    onChange={(e) => userTypeHandler(e)}
                  >
                    {/* <option value={""} selected disabled={true}></option> */}
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="auth-rep">Auth-Rep</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputStatus" className="form-label">
                    Status
                  </label>
                  <select
                    disabled={false}
                    id="user_type"
                    name="user_type"
                    className="form-select form-select-sm"
                    value={values.selectStatus}
                    // onChange={handleChange}
                    // required={true}
                    // defaultValue={'user'}
                    onChange={(e) => {
                      dispatch(selectStatus(e.target.value));
                      setActivate(e.target.value);
                    }}
                  >
                    {/* <option value={""} selected disabled={true}></option> */}
                    <option value="0">Active</option>
                    <option value="1">Suspended</option>
                    <option value="1">Deleted</option>
                  </select>
                </div>
              </div>

              <div className="col-md-4 ">
                <input
                  type="text"
                  className="form-control form-control-sm "
                  id="firstname"
                  placeholder="First Name"
                  name="firstname"
                  value={editfName}
                  onChange={(e) => setEditfName(e.target.value)}
                  onBlur={handleBlur}
                  onKeyUp={handleChange}
                  maxLength="20"
                />
                {touched.firstname && errors.firstname ? (
                  <span className="form-error d-flex">{errors.firstname}</span>
                ) : null}
              </div>

              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="lastname"
                  placeholder="Last Name"
                  name="lastname"
                  value={editlName}
                  onChange={(e) => setEditlName(e.target.value)}
                  onBlur={handleBlur}
                  onKeyUp={handleChange}
                  maxLength="20"
                />
                {touched.lastname && errors.lastname ? (
                  <span className="d-flex form-error">{errors.lastname}</span>
                ) : null}
              </div>
              {/* USer Profile MI */}
              <div className="col-md-2 col-sm-2">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="userprofilemi"
                  placeholder="MI"
                  value={editMi}
                  onChange={(e) => setEditMi(e.target.value)}
                  onBlur={handleBlur}
                  onKeyUp={handleChange}
                  name="userprofilemi"
                  maxLength="1"
                />

                {touched.userprofilemi && errors.userprofilemi ? (
                  <p className="form-error row">{errors.userprofilemi}</p>
                ) : null}
              </div>

              <div className="col-md-10">
                <input
                  type="email"
                  autoComplete="off"
                  name="email"
                  id="email"
                  className="form-control form-control-sm"
                  placeholder="Email"
                  value={editEmail}
                  //  onChange={(e) => setEditEmail(e.target.value)}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <p className="form-error">{errors.email}</p>
                ) : null}
              </div>

              <div className="col-10">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="title"
                  placeholder="Title"
                  name="title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={handleBlur}
                  onKeyUp={handleChange}
                  maxLength="10"
                />
                <div className="col-md-9">
                  {touched.title && errors.title ? (
                    <p className="form-error">{errors.title}</p>
                  ) : null}
                </div>
              </div>
              <div className="col-md-6">
                <PatternFormat
                  format="(###) ###-####"
                  mask=" "
                  type="tel"
                  className="form-control form-control-sm"
                  id="phone1"
                  placeholder="(888) 888-8888"
                  name="phone1"
                  value={editPhone1}
                  onChange={(e) => setEditPhone1(e.target.value)}
                  onBlur={handleBlur}
                />
                <div className="col-md-9">
                  {touched.phone1 && errors.phone1 ? (
                    <p className="form-error">{errors.phone1}</p>
                  ) : null}
                </div>
              </div>

              <div className="col-md-2">
                <input
                  type="tel"
                  className="form-control form-control-sm"
                  id="ext1"
                  placeholder="Ext"
                  name="ext1"
                  value={editExt1 ? editExt1.replace(/[^0-9]/gi, "") : ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyUp={handleChange}
                  maxLength="5"
                />
                <div className="col-md-2">
                  {touched.ext1 && errors.ext1 ? (
                    <p className="form-error">{errors.ext1}</p>
                  ) : null}
                </div>
              </div>
              <div className="col-md-6">
                <PatternFormat
                  format="(###) ###-####"
                  mask=" "
                  type="tel"
                  className="form-control form-control-sm"
                  id="phone2"
                  placeholder="(888) 888-8888"
                  name="phone2"
                  value={editPhone2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyUp={handleChange}
                />
                <div className="col-md-9">
                  {touched.phone2 && errors.phone2 ? (
                    <p className="form-error">{errors.phone2}</p>
                  ) : null}
                </div>
              </div>

              <div className="col-md-2">
                <input
                  type="tel"
                  className="form-control form-control-sm"
                  id="ext2"
                  placeholder="Ext"
                  name="ext2"
                  value={editExt2 ? editExt2.replace(/[^0-9]/gi, "") : ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyUp={handleChange}
                  maxLength="5"
                />
                <div className="col-md-2">
                  {touched.ext2 && errors.ext2 ? (
                    <p className="form-error">{errors.ext2}</p>
                  ) : null}
                </div>
              </div>

              <div className="col-12">
                <button
                  disabled={updatedisable}
                  type="submit"
                  className="btn btn-outline-primary me-2 btn-sm"
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => navigate("/user-managment")}
                >
                  Cancel
                </button>
              </div>
            </div>
            <h6 className="mt-4">Created At: {createdAt}</h6>
          </div>

          <div className="col-md-6 mt-5">
            <PermissionsEdit
              accountAdministrationAccountSetupedit={
                accountAdministrationAccountSetupMethodedit
              }
              accountAdministrationBillPaymentedit={
                accountAdministrationbillPaymentMethodedit
              }
              accountAdministrationMonthlyInvoiceedit={
                accountAdministrationmonthlyInvoiceMethodedit
              }
              appointmentScheduleedit={appointmentScheduleMethodedit}
              appointmentScheduleConfigurationeditedit={
                appointmentScheduleConfigurationMethodedit
              }
              appointmentControledit={appointmentControlMethodedit}
              appointmentBatchPrintingedit={appointmentBatchPrintingMethodedit}
              appointmentDepartmentedit={AppointmentDepartmentMethodedit}
              appointmentPatientActivityedit={
                AppointmentPatientActivityMethodedit
              }
              appointmentPatientPaymentedit={
                appointmentPatientPaymentMethodedit
              }
              claimProfessionalClaimedit={claimProfessionalClaimMethodedit}
              claimInstitutionalClaimedit={claimInstitutionalClaimMethodedit}
              claimBacthPrintingedit={ClaimBacthPrintingMethodedit}
              claimFollowUpedit={ClaimFollowUpMethodedit}
              claimClearingHouseReportsedit={
                ClaimClearingHouseReportsMethodedit
              }
              claimControledit={ClaimControlsMethodedit}
              claimNyWorkersCompFormedit={ClaimNyWorkersCompFormMethodedit}
              claimPatientActivityedit={ClaimPatientActivityMethodedit}
              claimPatientPaymentedit={ClaimPatientPaymentMethodedit}
              claimTrackingedit={ClaimTrackingMethodedit}
              customerSetupPracticeedit={CustomerSetupPracticeMethodedit}
              customerSetupProvideredit={CustomerSetupProviderMethodeditedit}
              customerSetupFacilityedit={CustomerSetupFacilityMethodedit}
              customerSetupReferringedit={CustomerSetupReferringMethodedit}
              customerSetupPayeredit={CustomerSetupPayerMethodedit}
              customerSetupPayerAgreementedit={
                CustomerSetupPayerAgreementMethodedit
              }
              customerSetupCodesedit={CustomerSetupCodesMethodedit}
              customerSetupInventoryedit={CustomerSetupInventoryMethodedit}
              cusomerSetupFeeScheduleedit={CusomerSetupFeeScheduleMethodedit}
              customerSetupContractMgmntedit={
                CustomerSetupContractMgmntMethodedit
              }
              customerSetupAlertControledit={
                CustomerSetupAlertControlMethodedit
              }
              customerSetupStatementAutomationedit={
                CustomerSetupStatementAutomationMethodedit
              }
              customerSetupLblSpblConfigedit={
                CustomerSetupLblSpblConfigMethodedit
              }
              customerSetupPersnlIdInfoSSNedit={
                CustomerSetupPersnlIdInfoSSNMethodedit
              }
              customerSetupAccSetupedit={CustomerSetupAccSetupMethodedit}
              customerSetupBillPaymntedit={CustomerSetupBillPaymntMethodedit}
              customerSetupCustomiztionedit={
                CustomerSetupCustomiztionMethodedit
              }
              documentDocMangmntedit={DocumentDocMangmntMethodedit}
              homeDashboardedit={HomeDashboardMethodedit}
              homeMessgingedit={HomeMessgingMethodedit}
              homeContactedit={HomeContactMethodedit}
              homeAdminstrTaskedit={HomeAdminstrTaskMethodedit}
              interfaceInterfceTrackingedit={
                InterfaceInterfceTrackingMethodedit
              }
              otherPaymentPortaledit={OtherPaymentPortalMethodedit}
              patientPatientedit={PatientPatientMethodedit}
              patientAddVerifedit={PatientAddVerifMethodedit}
              patientBatchEligibedit={PatientBatchEligibMethodedit}
              patientBatchPrintingedit={PatientBatchPrintingMethodedit}
              patientContrledit={PatientContrlMethodedit}
              patientDebitCreditedit={PatientDebitCreditMethodedit}
              patienteditNotsedit={PatienteditNotsMethodedit}
              patientEligbedit={PatientEligbMethodedit}
              patientEnhancedStatementedit={PatientEnhancedStatementbMethodedit}
              patientAccMgmntedit={PatientAccMgmntMethodedit}
              patientActivityedit={PatientActivityMethodedit}
              patientMergedit={PatientMergMethodedit}
              patientNotsedit={PatientNotsMethodedit}
              patientPaymntedit={PatientPaymntMethodedit}
              patientpaymPortaledit={PatientPaymPortalMethodedit}
              patientIdInfoSSnedit={PatientIdInfoSSnMethodedit}
              patientTrackngedit={PatientTrackngMethodedit}
              paymentPatientPymntedit={PaymentPatientPymntMethodedit}
              paymentInsuranceedit={PaymentInsuranceMethodedit}
              paymentEraAutoApplyedit={PaymentEraAutoApplyMethodedit}
              paymentPatientActvtyedit={PaymentPatientActvtyMethodedit}
              paymentTrackngedit={PaymentTrackngMethodedit}
              reportsReportsedit={ReportsReportsMethodedit}
              reportsArMgmntReportsedit={ReportsArMgmntReportsMethodedit}
              reportMngmntReportsedit={ReportMngmntReportsMethodedit}
              reportReportsBuilderedit={ReportReportsBuilderMethodedit}
            />
          </div>
        </form>
      ) : (
        ""
      )}
    </>
  );
}
