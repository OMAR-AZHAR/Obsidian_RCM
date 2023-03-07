import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useFormik as formValidate } from "formik";
import API from "../../../Api/ClientApi";
import Swal from "sweetalert2";
// edit categories
import AccountAdminCatEdit from "./CategoriesEdit/AccountAdminCatEdit";
import AppointmentCatEdit from "./CategoriesEdit/AppointmentCatEdit";
import ClaimCatEdit from "./CategoriesEdit/ClaimCatEdit";
import CustomerCatEdit from "./CategoriesEdit/CustomerCatEdit";
import DocumentsCatEdit from "./CategoriesEdit/DocumentsCatEdit";
import HomeCatEdit from "./CategoriesEdit/HomeCatEdit";
import InterfaceCatEdit from "./CategoriesEdit/InterfaceCatEdit";
import OtherCatEdit from "./CategoriesEdit/OtherCatEdit";
import PatientCatEdit from "./CategoriesEdit/PatientCatEdit";
import PaymentCatEdit from "./CategoriesEdit/PaymentCatEdit";
import ReportsCatEdit from "./CategoriesEdit/ReportsCatEdit";
// import AccountAdminCat from "../UserManagment/Categories/AccountAdminCat";
// import AppointmentCat from "../UserManagment/Categories/AppointmentCat";
// import ClaimCat from "../UserManagment/Categories/ClaimCat";
// import CustomerCat from "../UserManagment/Categories/CustomerCat";
// import DocumentsCat from "../UserManagment/Categories/DocumentsCat";
// import HomeCat from "../UserManagment/Categories/HomeCat";
// import InterfaceCat from "../UserManagment/Categories/InterfaceCat";
// import OtherCat from "../UserManagment/Categories/OtherCat";
// import PatientCat from "../UserManagment/Categories/PatientCat";
// import PaymentCat from "../UserManagment/Categories/PaymentCat";
// import ReportsCat from "../UserManagment/Categories/ReportsCat";
import useLocalStorage from "../../../Hooks/useLocalStorage";
import {
  EditPermissionData,
  setRoleId,
  ShowSingleRoleAction,
  setName,
} from "../../../Redux/features/Security/ShowAllRolesSlice";

const SpecificRoleInfo = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const signleRoleId = useSelector((state) => state.ShowAllRolesSlice.id);
  const name = localStorage.getItem("rolename");

  const [editRoledata, setEditRoleData] = useState([]);
  const [roleNameEdit, setRoleNameEdit] = useState("");
  const [roleStatusIs, setRoleStatusIs] = useState("");

  console.log("role  status in  state", roleStatusIs);
  useEffect(() => {
    API.get(
      `accountadmin/security/permission/getsinglerolepermission/${signleRoleId}`
    )
      .then(function (response) {
        //   if ((response.data = true)) {
        console.log("single role data", response.data.data);
        dispatch(EditPermissionData(response.data.data));
        setEditRoleData(response.data.data);
        setRoleNameEdit(response.data.data.role_name);
        setRoleStatusIs(response.data.data.role_status);
        // set prev permissions from db
        setaccountAdministrationAccountSetup(
          response.data.data.accountAdminAccountSetup
        );
        setaccountAdministrationBillPayment(
          response.data.data.accountAdminBillPayment
        );
        setaccountAdministrationMonthlyInvoice(
          response.data.data.accountAdminMonthlyInvoice
        );
        setAppointmentSchedule(response.data.data.appointmentsScheduler);
        setAppointmentScheduleConfiguration(
          response.data.data.AppointmentsSchedulerConfiguration
        );
        setappointmentControl(response.data.data.appointmentControl);
        setAppointmentBatchPrinting(
          response.data.data.appointmentBatchPrinting
        );
        setAppointmentDepartment(response.data.data.appointmentsDepartment);
        setAppointmentPatientActivity(
          response.data.data.appointmentsPatientActivity
        );
        setappointmentPatientPayment(
          response.data.data.appointmentsPatientPayments
        );
        setClaimProfessionalClaim(response.data.data.claimProfessional);
        setClaimInstitutionalClaim(response.data.data.claimInstitutional);
        setClaimBacthPrinting(response.data.data.claimBatchPrinting);
        setClaimFollowUp(response.data.data.claimFollowup);
        setClaimClearingHouseReports(
          response.data.data.claimClearinghousereports
        );
        setClaimControl(response.data.data.claimControl);
        setClaimNyWorkersCompForm(response.data.data.claimNyworkersCompForm);
        setClaimPatientActivity(response.data.data.climPatientActivity);
        setClaimPatientPayment(response.data.data.climPatientPayment);
        setClaimTracking(response.data.data.claimTracking);
        setCustomerSetupPractice(response.data.data.customerSetuppractice);
        setCustomerSetupProvider(response.data.data.customerSetupprovider);
        setCustomerSetupFacility(response.data.data.customerSetupfacility);
        setCustomerSetupReferring(
          response.data.data.customerSetupreferringprovider
        );
        setCustomerSetupPayer(response.data.data.customerSetuppayer);
        setCustomerSetupPayerAgreement(
          response.data.data.customerSetuppayeraggrement
        );
        setCustomerSetupCodes(response.data.data.customerSetupcodes);
        setCustomerSetupInventory(response.data.data.customerSetupinventory);
        setCusomerSetupFeeSchedule(response.data.data.customerSetupfeeshedule);
        setCustomerSetupContractMgmnt(
          response.data.data.customerSetupcontractManagement
        );
        setCustomerSetupAlertControl(
          response.data.data.customerSetupalertcontrol
        );
        setCustomerSetupStatementAutomation(
          response.data.data.customerSetupstatementAutomation
        );
        setCustomerSetupLblSpblConfig(
          response.data.data.customerSetuplabelAndSuperBill
        );
        setCustomerSetupPersnlIdInfoSSN(
          response.data.data.customerSetuppersonalIdnSsn
        );
        setCustomerSetupAccSetup(response.data.data.customerSetupAccount);
        setCustomerSetupBillPaymnt(response.data.data.customerSetupbillPatment);
        setCustomerSetupCustomiztion(
          response.data.data.customerSetupcustomization
        );
        setDocumentDocMangmnt(response.data.data.documentmanagement);
        setHomeDashboard(response.data.data.homeDashboard);
        setHomeMessging(response.data.data.homeMessaging);
        setHomeContact(response.data.data.homeContacts);
        setHomeAdminstrTask(response.data.data.homeAdministerTasks);
        setInterfaceInterfceTracking(response.data.data.interfaceTracking);
        setOtherPaymentPortal(response.data.data.OtherPaymentPortal);
        setPatientPatient(response.data.data.patientPatient);
        setPatientAddVerif(response.data.data.PatientAddressVerification);
        setPatientBatchEligib(response.data.data.patientBatchEligibility);
        setPatientBatchPrinting(response.data.data.patientBatchPrinting);
        setPatientContrl(response.data.data.patientControl);
        setPatientDebitCredit(response.data.data.patientDebitPatient);
        setPatienteditNots(response.data.data.patientEditNotes);
        setPatientEligb(response.data.data.patientEligibilityDeny);
        setPatientEnhancedStatement(
          response.data.data.patientEnhancedStatement
        );
        setPatientAccMgmnt(response.data.data.patientPatientAccount);
        setPatientActivity(response.data.data.patientPatientActivity);
        setPatientMerg(response.data.data.patientPatientMerge);
        setPatientNots(response.data.data.patientPatientNotes);
        setPatientPaymnt(response.data.data.patientpaymentspatient);
        setPatientPaymPortal(response.data.data.patientPaymentPortalInvite);
        setPatientIdInfoSSn(response.data.data.patientIdnSSN);
        setPatientTrackng(response.data.data.patientTracking);
        setPaymentPatientPymnt(response.data.data.paymentsPatient);
        setPaymentInsurance(response.data.data.paymentsInsurance);
        setPaymentEraAutoApply(response.data.data.PaymentEraAutoApply);
        setPaymentPatientActvty(response.data.data.paymentPatientactivity);
        setPaymentTrackng(response.data.data.paymentsTracking);
        setReportsReports(response.data.data.reportsReports);
        setReportsArMgmntReports(response.data.data.reportsARManagement);
        setReportMngmntReports(response.data.data.reportsmanagementreports);
        setReportReportsBuilder(response.data.data.reportbuilder);
        response.data.data.role_status === null
          ? setRoleStatusIs(0)
          : setRoleStatusIs(1);
      })
      .catch(function (error) {
        console.log("roles not fuond", error);
        //   alert('User not found', error)
      });
  }, []);
  // console.log(`single role det ${editRoledata} id${signleRoleId}`);

  console.log("role name in edtform", roleNameEdit);
  const toggle = (value) => {
    return !value;
  };

  // make role inactive
  const roleStatusHandler = () => {
    if (roleStatusIs == 0) {
      setRoleStatusIs(1);
    } else {
      setRoleStatusIs(0);
    }
  };
  console.log("role status:", roleStatusIs);
  const [option, setOption] = useState("Account-Administration");
  const handleChangeCat = (event) => {
    setOption(event.target.value);
  };
  const handleOnClick = () => {
    dispatch(EditPermissionData(""));
    navigate("/permission-roles", { replace: true });
  };

  // states for permission
  const [
    accountAdministrationAccountSetup,
    setaccountAdministrationAccountSetup,
  ] = useState("");
  const [
    accountAdministrationBillPayment,
    setaccountAdministrationBillPayment,
  ] = useState("");
  const [
    accountAdministrationMonthlyInvoice,
    setaccountAdministrationMonthlyInvoice,
  ] = useState("");
  const [appointmentSchedule, setAppointmentSchedule] = useState("");
  const [
    appointmentScheduleConfiguration,
    setAppointmentScheduleConfiguration,
  ] = useState("");
  const [appointmentControl, setappointmentControl] = useState("");
  console.log("app cntrol ", appointmentControl);
  const [appointmentBatchPrinting, setAppointmentBatchPrinting] = useState("");
  const [appointmentDepartment, setAppointmentDepartment] = useState("");
  const [appointmentPatientActivity, setAppointmentPatientActivity] =
    useState("");
  const [appointmentPatientPayment, setappointmentPatientPayment] =
    useState("");
  const [claimProfessionalClaim, setClaimProfessionalClaim] = useState("");
  const [claimInstitutionalClaim, setClaimInstitutionalClaim] = useState("");
  const [claimBacthPrinting, setClaimBacthPrinting] = useState("");
  const [claimFollowUp, setClaimFollowUp] = useState("");
  const [claimClearingHouseReports, setClaimClearingHouseReports] =
    useState("");
  const [claimControl, setClaimControl] = useState("");
  const [claimNyWorkersCompForm, setClaimNyWorkersCompForm] = useState("");
  const [claimPatientActivity, setClaimPatientActivity] = useState("");
  const [claimPatientPayment, setClaimPatientPayment] = useState("");
  const [claimTracking, setClaimTracking] = useState("");
  const [customerSetupPractice, setCustomerSetupPractice] = useState("");
  const [customerSetupProvider, setCustomerSetupProvider] = useState("");
  const [customerSetupFacility, setCustomerSetupFacility] = useState("");
  const [customerSetupReferring, setCustomerSetupReferring] = useState("");
  const [customerSetupPayer, setCustomerSetupPayer] = useState("");
  const [customerSetupPayerAgreement, setCustomerSetupPayerAgreement] =
    useState("");
  const [customerSetupCodes, setCustomerSetupCodes] = useState("");
  const [customerSetupInventory, setCustomerSetupInventory] = useState("");
  const [cusomerSetupFeeSchedule, setCusomerSetupFeeSchedule] = useState("");
  const [customerSetupContractMgmnt, setCustomerSetupContractMgmnt] =
    useState("");
  const [customerSetupAlertControl, setCustomerSetupAlertControl] =
    useState("");
  const [
    customerSetupStatementAutomation,
    setCustomerSetupStatementAutomation,
  ] = useState("");
  const [customerSetupLblSpblConfig, setCustomerSetupLblSpblConfig] =
    useState("");
  const [customerSetupPersnlIdInfoSSN, setCustomerSetupPersnlIdInfoSSN] =
    useState("");
  const [customerSetupAccSetup, setCustomerSetupAccSetup] = useState("");
  const [customerSetupBillPaymnt, setCustomerSetupBillPaymnt] = useState("");
  const [customerSetupCustomiztion, setCustomerSetupCustomiztion] =
    useState("");
  const [documentDocMangmnt, setDocumentDocMangmnt] = useState("");
  const [homeDashboard, setHomeDashboard] = useState("");
  const [homeMessging, setHomeMessging] = useState("");
  const [homeContact, setHomeContact] = useState("");
  const [homeAdminstrTask, setHomeAdminstrTask] = useState("");
  const [interfaceInterfceTracking, setInterfaceInterfceTracking] =
    useState("");
  const [otherPaymentPortal, setOtherPaymentPortal] = useState("");
  const [patientPatient, setPatientPatient] = useState("");
  const [patientAddVerif, setPatientAddVerif] = useState("");
  const [patientBatchEligib, setPatientBatchEligib] = useState("");
  const [patientBatchPrinting, setPatientBatchPrinting] = useState("");
  const [patientContrl, setPatientContrl] = useState("");
  const [patientDebitCredit, setPatientDebitCredit] = useState("");
  const [patienteditNots, setPatienteditNots] = useState("");
  const [patientEligb, setPatientEligb] = useState("");
  const [patientEnhancedStatement, setPatientEnhancedStatement] = useState("");
  const [patientAccMgmnt, setPatientAccMgmnt] = useState("");
  const [patientActivity, setPatientActivity] = useState("");
  const [patientMerg, setPatientMerg] = useState("");
  const [patientNots, setPatientNots] = useState("");
  const [patientPaymnt, setPatientPaymnt] = useState("");
  const [patientpaymPortal, setPatientPaymPortal] = useState("");
  const [patientIdInfoSSn, setPatientIdInfoSSn] = useState("");
  const [patientTrackng, setPatientTrackng] = useState("");
  const [paymentPatientPymnt, setPaymentPatientPymnt] = useState("");
  const [paymentInsurance, setPaymentInsurance] = useState("");
  const [paymentEraAutoApply, setPaymentEraAutoApply] = useState("");
  const [paymentPatientActvty, setPaymentPatientActvty] = useState("");
  const [paymentTrackng, setPaymentTrackng] = useState("");
  const [reportsReports, setReportsReports] = useState("");
  const [reportsArMgmntReports, setReportsArMgmntReports] = useState("");
  const [reportMngmntReports, setReportMngmntReports] = useState("");
  const [reportReportsBuilder, setReportReportsBuilder] = useState("");
  //

  // functions for getting permissions
  // account admin
  function getaccount(permissions) {
    setaccountAdministrationAccountSetup(permissions);
    console.log(permissions);
  }

  function billpayment(permissions) {
    setaccountAdministrationBillPayment(permissions);
    console.log(permissions);
  }

  function getmonthlyInvoice(permissions) {
    setaccountAdministrationMonthlyInvoice(permissions);
    console.log(permissions);
  }
  // appointment
  function getappointmentSchedule(permissions) {
    setAppointmentSchedule(permissions);
  }
  function getappointmentScheduleConfiguration(permissions) {
    setAppointmentScheduleConfiguration(permissions);
  }
  function getappointmentControl(permissions) {
    setappointmentControl(permissions);
  }
  function getappointmentBatchPrinting(permissions) {
    setAppointmentBatchPrinting(permissions);
  }
  function getappointmentDepartment(permissions) {
    setAppointmentDepartment(permissions);
  }
  function getappointmentPatientActivity(permissions) {
    setAppointmentPatientActivity(permissions);
  }
  function getappointmentPatientPayment(permissions) {
    setappointmentPatientPayment(permissions);
  }
  // claim
  function getclaimProfessionalClaim(permissions) {
    setClaimProfessionalClaim(permissions);
  }
  function getclaimInstitutionalClaim(permissions) {
    setClaimInstitutionalClaim(permissions);
  }
  function getclaimBacthPrinting(permissions) {
    setClaimBacthPrinting(permissions);
  }
  function getclaimFollowUp(permissions) {
    setClaimFollowUp(permissions);
  }
  function getclaimClearingHouseReports(permissions) {
    setClaimClearingHouseReports(permissions);
  }
  function getclaimControl(permissions) {
    setClaimControl(permissions);
  }
  function getclaimNyWorkersCompForm(permissions) {
    setClaimNyWorkersCompForm(permissions);
  }
  function getclaimPatientActivity(permissions) {
    setClaimPatientActivity(permissions);
  }
  function getclaimPatientPayment(permissions) {
    setClaimPatientPayment(permissions);
  }
  function getclaimTracking(permissions) {
    setClaimTracking(permissions);
  }
  // customer setup
  function getcustomerSetupPractice(permissions) {
    setCustomerSetupPractice(permissions);
  }
  function getcustomerSetupProvider(permissions) {
    setCustomerSetupProvider(permissions);
  }
  function getcustomerSetupFacility(permissions) {
    setCustomerSetupFacility(permissions);
  }
  function getcustomerSetupReferring(permissions) {
    setCustomerSetupReferring(permissions);
  }
  function getcustomerSetupPayer(permissions) {
    setCustomerSetupPayer(permissions);
  }
  function getcustomerSetupPayerAgreement(permissions) {
    setCustomerSetupPayerAgreement(permissions);
  }
  function getcustomerSetupCodes(permissions) {
    setCustomerSetupCodes(permissions);
  }
  function getcustomerSetupInventory(permissions) {
    setCustomerSetupInventory(permissions);
  }
  function getCusomerSetupFeeSchedule(permissions) {
    setCusomerSetupFeeSchedule(permissions);
  }
  function getcustomerSetupContractMgmnt(permissions) {
    setCustomerSetupContractMgmnt(permissions);
  }
  function getcustomerSetupAlertControl(permissions) {
    setCustomerSetupAlertControl(permissions);
  }
  function getcustomerSetupStatementAutomation(permissions) {
    setCustomerSetupStatementAutomation(permissions);
  }
  function getcustomerSetupLblSpblConfig(permissions) {
    setCustomerSetupLblSpblConfig(permissions);
  }
  function getcustomerSetupPersnlIdInfoSSN(permissions) {
    setCustomerSetupPersnlIdInfoSSN(permissions);
  }
  function getcustomerSetupAccSetup(permissions) {
    setCustomerSetupAccSetup(permissions);
  }
  function getcustomerSetupBillPaymnt(permissions) {
    setCustomerSetupBillPaymnt(permissions);
  }
  function getcustomerSetupCustomiztion(permissions) {
    setCustomerSetupCustomiztion(permissions);
  }
  // document
  function getdocumentDocMangmnt(permissions) {
    setDocumentDocMangmnt(permissions);
  }
  // home
  function gethomeDashboard(permissions) {
    setHomeDashboard(permissions);
  }
  function gethomeMessging(permissions) {
    setHomeMessging(permissions);
  }
  function gethomeContact(permissions) {
    setHomeContact(permissions);
  }
  function gethomeAdminstrTask(permissions) {
    setHomeAdminstrTask(permissions);
  }
  // interface
  function getinterfaceInterfceTracking(permissions) {
    setInterfaceInterfceTracking(permissions);
  }
  // other
  function getotherPaymentPortal(permissions) {
    setOtherPaymentPortal(permissions);
  }
  // patient
  function getpatientPatient(permissions) {
    setPatientPatient(permissions);
  }
  function getpatientAddVerif(permissions) {
    setPatientAddVerif(permissions);
  }
  function getpatientBatchEligib(permissions) {
    setPatientBatchEligib(permissions);
  }
  function getpatientBatchPrinting(permissions) {
    setPatientBatchPrinting(permissions);
  }
  function getpatientContrl(permissions) {
    setPatientContrl(permissions);
  }
  function getpatientDebitCredit(permissions) {
    setPatientDebitCredit(permissions);
  }
  function getpatienteditNots(permissions) {
    setPatienteditNots(permissions);
  }
  function getpatientEligb(permissions) {
    setPatientEligb(permissions);
  }
  function getpatientEnhancedStatement(permissions) {
    setPatientEnhancedStatement(permissions);
  }
  function getpatientAccMgmnt(permissions) {
    setPatientAccMgmnt(permissions);
  }
  function getpatientActivity(permissions) {
    setPatientActivity(permissions);
  }
  function getpatientMerg(permissions) {
    setPatientMerg(permissions);
  }
  function getpatientNots(permissions) {
    setPatientNots(permissions);
  }
  function getpatientPaymnt(permissions) {
    setPatientPaymnt(permissions);
  }
  function getpatientpaymPortal(permissions) {
    setPatientPaymPortal(permissions);
  }
  function getpatientIdInfoSSn(permissions) {
    setPatientIdInfoSSn(permissions);
  }
  function getpatientTrackng(permissions) {
    setPatientTrackng(permissions);
  }
  // payment
  function getpaymentPatientPymnt(permissions) {
    setPaymentPatientPymnt(permissions);
  }
  function getpaymentInsurance(permissions) {
    setPaymentInsurance(permissions);
  }
  function getpaymentEraAutoApply(permissions) {
    setPaymentEraAutoApply(permissions);
  }
  function getpaymentPatientActvty(permissions) {
    setPaymentPatientActvty(permissions);
  }
  function getpaymentTrackng(permissions) {
    setPaymentTrackng(permissions);
  }
  // reports
  function getreportsReports(permissions) {
    setReportsReports(permissions);
  }
  function getreportsArMgmntReports(permissions) {
    setReportsArMgmntReports(permissions);
  }
  function getreportMngmntReports(permissions) {
    setReportMngmntReports(permissions);
  }
  function getreportReportsBuilder(permissions) {
    setReportReportsBuilder(permissions);
    // update value
  }
  // initail values
  const initialValues = {
    rolename: "",
  };
  // submit
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = formValidate({
    initialValues,
    validateOnChange: true,
    validateOnBlur: true,
    // By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: (values, action) => {
      console.log("values in formik:", values);
      API.put(`accountadmin/security/permission/role/update/${signleRoleId}`, {
        rolename: roleNameEdit,
        roleStatus: roleStatusIs,
        // permissions
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
        customerSetupLblSpblConfig: customerSetupLblSpblConfig,
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
        // userprofilepic: [ImageformData],
        //  userprofilepic: ,
        // fjson: fjson, // Values from Permission including user_type
      });
      //  console.log("Values Submited, Formik", values);
      // Sweet Alert on Successful User Entry
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Role Updated",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/permission-roles", { replace: true });
      dispatch(setName(name));
      dispatch(EditPermissionData(editRoledata));
      action.resetForm();
      // setSavedisable(true)
      // navigate("/user-managment")
    },
  });
  return (
    <div className="row mt-3">
      <form method="post" onSubmit={handleSubmit}>
        <div className="col-md-12 d-flex flex-column">
          <div className="d-flex">
            <div className="col-md-5">
              <label htmlFor="exampleInputPassword1">Name</label>
              <input
                value={roleNameEdit}
                onChange={(e) => setRoleNameEdit(e.target.value.toUpperCase())}
                onBlur={handleBlur}
                type="text"
                className="form-control form-control-sm w-75 fs-16 fw-bold"
                id="rolename"
                name="rolename"
              />
            </div>
            <div className="d-flex justify-content-end">
              <button
                // onClick={() => props.closeSpecificRoleinfo()}
                onClick={handleOnClick}
                type="button"
                id="close-btn"
                className="btn btn-outline-danger btn-sm my-3"
                data-bs-dismiss="modal"
              >
                <span className="fas fa-times mx-1"></span>
                Close
              </button>
              <button
                // onClick={() => props.closeSpecificRoleinfo()}
                type="submit"
                id="close-btn"
                className="btn btn-outline-primary btn-sm my-3 mx-2"
                data-bs-dismiss="modal"
              >
                <span className="fas fa-check mx-1"></span>
                Update
              </button>
            </div>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              onChange={roleStatusHandler}
              checked={roleStatusIs}
              type="checkbox"
              id="roleStatus"
              name="roleStatus"
            />
            <label className="form-check-label" htmlFor="roleStatus">
              Make this Role Inactive
            </label>
          </div>
          <div className="col-md-5 my-4">
            <input
              id="permissions"
              name="permissions"
              className="form-control form-control-sm"
              type="text"
              placeholder="Search for Permissions"
            />
          </div>
          <div className="col-md-12 d-flex align-items-center">
            <select
              defaultValue={"Account-Administration"}
              id="select-tab"
              onChange={handleChangeCat}
              className="form-select form-select-sm w-25"
              aria-label=".form-select-sm example"
            >
              <option value="Account-Administration">
                Account Administration
              </option>
              <option value="Appointments">Appointments</option>
              <option value="Claim">Claim</option>
              <option value="Customer-Setup">Customer Setup</option>
              <option value="Documents">Documents</option>
              <option value="Home">Home</option>
              <option value="Interface">Interface</option>
              <option value="Other">Other</option>
              <option value="Patient">Patient</option>
              <option value="Payment">Payment</option>
              <option value="Reports">Reports</option>
            </select>

            <div className="form-check mx-2">
              <input
                className="form-check-input"
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(toggle)}
                id="showpermissiondescription"
                name="showpermissiondescription"
              />
              <label
                className="form-check-label"
                htmlFor="showpermissiondescription"
              >
                Show Permission Description
              </label>
            </div>
          </div>
          <div className="col-md-8">
            {option === "Account-Administration" && (
              <AccountAdminCatEdit
                fetchdataEdit={getaccount}
                billpaymentEdit={billpayment}
                monthlyInvoiceEdit={getmonthlyInvoice}
                showDescription={checked}
                permissionType="2"
              />
            )}
            {option === "Appointments" && (
              <AppointmentCatEdit
                appointmentScheduleEdit={getappointmentSchedule}
                appointmentScheduleConfigurationEdit={
                  getappointmentScheduleConfiguration
                }
                appointmentControlEdit={getappointmentControl}
                appointmentBatchPrintingEdit={getappointmentBatchPrinting}
                appointmentDepartmentEdit={getappointmentDepartment}
                appointmentPatientActivityEdit={getappointmentPatientActivity}
                appointmentPatientPaymentEdit={getappointmentPatientPayment}
                showDescription={checked}
                permissionType="2"
              />
            )}
            {option === "Claim" && (
              <ClaimCatEdit
                claimProfessionalClaimEdit={getclaimProfessionalClaim}
                claimInstitutionalClaimEdit={getclaimInstitutionalClaim}
                claimBacthPrintingEdit={getclaimBacthPrinting}
                claimFollowUpEdit={getclaimFollowUp}
                claimClearingHouseReportsEdit={getclaimClearingHouseReports}
                claimControlEdit={getclaimControl}
                claimNyWorkersCompFormEdit={getclaimNyWorkersCompForm}
                claimPatientActivityEdit={getclaimPatientActivity}
                claimPatientPaymentEdit={getclaimPatientPayment}
                claimTrackingEdit={getclaimTracking}
                showDescription={checked}
                permissionType="2"
              />
            )}
            {option === "Customer-Setup" && (
              <CustomerCatEdit
                customerSetupPracticeEdit={getcustomerSetupPractice}
                customerSetupProviderEdit={getcustomerSetupProvider}
                customerSetupFacilityEdit={getcustomerSetupFacility}
                customerSetupReferringEdit={getcustomerSetupReferring}
                customerSetupPayerEdit={getcustomerSetupPayer}
                customerSetupPayerAgreementEdit={getcustomerSetupPayerAgreement}
                customerSetupCodesEdit={getcustomerSetupCodes}
                customerSetupInventoryEdit={getcustomerSetupInventory}
                customerSetupFeeScheduleEdit={getCusomerSetupFeeSchedule}
                customerSetupContractMgmntEdit={getcustomerSetupContractMgmnt}
                customerSetupAlertControlEdit={getcustomerSetupAlertControl}
                customerSetupStatementAutomationEdit={
                  getcustomerSetupStatementAutomation
                }
                customerSetupLblSpblConfigEdit={getcustomerSetupLblSpblConfig}
                customerSetupPersnlIdInfoSSNEdit={
                  getcustomerSetupPersnlIdInfoSSN
                }
                customerSetupAccSetupEdit={getcustomerSetupAccSetup}
                customerSetupBillPaymntEdit={getcustomerSetupBillPaymnt}
                customerSetupCustomiztionEdit={getcustomerSetupCustomiztion}
                showDescription={checked}
                permissionType="2"
              />
            )}
            {option === "Documents" && (
              <DocumentsCatEdit
                documentDocMangmntEdit={getdocumentDocMangmnt}
                showDescription={checked}
                permissionType="2"
              />
            )}
            {option === "Home" && (
              <HomeCatEdit
                homeDashboardEdit={gethomeDashboard}
                homeMessgingEdit={gethomeMessging}
                homeContactEdit={gethomeContact}
                homeAdminstrTaskEdit={gethomeAdminstrTask}
                showDescription={checked}
                permissionType="2"
              />
            )}
            {option === "Interface" && (
              <InterfaceCatEdit
                interfaceInterfceTrackingEdit={getinterfaceInterfceTracking}
                showDescription={checked}
                permissionType="2"
              />
            )}
            {option === "Other" && (
              <OtherCatEdit
                otherPaymentPortalEdit={getotherPaymentPortal}
                showDescription={checked}
                permissionType="2"
              />
            )}
            {option === "Patient" && (
              <PatientCatEdit
                patientPatientEdit={getpatientPatient}
                patientAddVerifiesEdit={getpatientAddVerif}
                patientBatchEligibEdit={getpatientBatchEligib}
                patientBatchPrintingEdit={getpatientBatchPrinting}
                patientContrlEdit={getpatientContrl}
                patientDebitCreditEdit={getpatientDebitCredit}
                patienteditNotsEdit={getpatienteditNots}
                patientEligbEdit={getpatientEligb}
                patientEnhancedStatementEdit={getpatientEnhancedStatement}
                patientAccMgmntEdit={getpatientAccMgmnt}
                patientActivityEdit={getpatientActivity}
                patientMergEdit={getpatientMerg}
                patientNotsEdit={getpatientNots}
                patientPaymntEdit={getpatientPaymnt}
                patientpaymPortalEdit={getpatientpaymPortal}
                patientIdInfoSSnEdit={getpatientIdInfoSSn}
                patientTrackngEdit={getpatientTrackng}
                showDescription={checked}
                permissionType="2"
              />
            )}
            {option === "Payment" && (
              <PaymentCatEdit
                paymentPatientPymntEdit={getpaymentPatientPymnt}
                paymentInsuranceEdit={getpaymentInsurance}
                paymentEraAutoApplyEdit={getpaymentEraAutoApply}
                paymentPatientActvtyEdit={getpaymentPatientActvty}
                paymentTrackngEdit={getpaymentTrackng}
                showDescription={checked}
                permissionType="2"
              />
            )}
            {option === "Reports" && (
              <ReportsCatEdit
                reportsReportsEdit={getreportsReports}
                reportsArMgmntReportsEdit={getreportsArMgmntReports}
                reportMngmntReportsEdit={getreportMngmntReports}
                reportReportsBuilderEdit={getreportReportsBuilder}
                showDescription={checked}
                permissionType="2"
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SpecificRoleInfo;
