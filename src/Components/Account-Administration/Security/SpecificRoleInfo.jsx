import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useFormik as formValidate } from "formik";
import API from "../../../Api/ClientApi";
import Swal from "sweetalert2";
import AccountAdminCat from "../UserManagment/Categories/AccountAdminCat";
import AppointmentCat from "../UserManagment/Categories/AppointmentCat";
import ClaimCat from "../UserManagment/Categories/ClaimCat";
import CustomerCat from "../UserManagment/Categories/CustomerCat";
import DocumentsCat from "../UserManagment/Categories/DocumentsCat";
import HomeCat from "../UserManagment/Categories/HomeCat";
import InterfaceCat from "../UserManagment/Categories/InterfaceCat";
import OtherCat from "../UserManagment/Categories/OtherCat";
import PatientCat from "../UserManagment/Categories/PatientCat";
import PaymentCat from "../UserManagment/Categories/PaymentCat";
import ReportsCat from "../UserManagment/Categories/ReportsCat";
import useLocalStorage from "../../../Hooks/useLocalStorage";
import {
  setRoleId,
  setName,
} from "../../../Redux/features/Security/ShowAllRolesSlice";
const SpecificRoleInfo = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [roleStatusIs, setRoleStatusIs] = useState(0);
  // const name = useSelector((state) => state.ShowAllRolesSlice.name);
  // const [namesave, setname] = useLocalStorage("rolename",rolename)
  const name = localStorage.getItem("rolename");
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
  const handleOnClick = useCallback(
    () => navigate("/permission-roles", { replace: true }),
    [navigate]
  );
  // states for permission
  const [
    accountAdministrationAccountSetup,
    setaccountAdministrationAccountSetup,
  ] = useState("Account Administration Account Setup Deny");
  const [
    accountAdministrationBillPayment,
    setaccountAdministrationBillPayment,
  ] = useState("Account Administration Bill Payment Deny");
  const [
    accountAdministrationMonthlyInvoice,
    setaccountAdministrationMonthlyInvoice,
  ] = useState("Account Administration Monthly Invoice Deny");
  const [appointmentSchedule, setAppointmentSchedule] = useState(
    "Appointments Scheduler Deny"
  );
  const [
    appointmentScheduleConfiguration,
    setAppointmentScheduleConfiguration,
  ] = useState("Appointments Scheduler Configuration Deny");
  const [appointmentControl, setappointmentControl] = useState(
    "Appointments Appointment Control Deny"
  );
  const [appointmentBatchPrinting, setAppointmentBatchPrinting] = useState(
    "Appointments Batch Printing Deny"
  );
  const [appointmentDepartment, setAppointmentDepartment] = useState(
    "Appointments Department Deny"
  );
  const [appointmentPatientActivity, setAppointmentPatientActivity] = useState(
    "Appointments Patient Activity Deny"
  );
  const [appointmentPatientPayment, setappointmentPatientPayment] = useState(
    "Appointments Patient Payments Deny"
  );
  const [claimProfessionalClaim, setClaimProfessionalClaim] = useState(
    "Claim Professional Claim Deny"
  );
  const [claimInstitutionalClaim, setClaimInstitutionalClaim] = useState(
    "Claim Institutional Claim Deny"
  );
  const [claimBacthPrinting, setClaimBacthPrinting] = useState(
    "Claim Batch Printing Deny"
  );
  const [claimFollowUp, setClaimFollowUp] = useState(
    "Claim Claim Follow Up Deny"
  );
  const [claimClearingHouseReports, setClaimClearingHouseReports] = useState(
    "Claim Clearinghouse Reports Deny"
  );
  const [claimControl, setClaimControl] = useState("Claim Control Deny");
  const [claimNyWorkersCompForm, setClaimNyWorkersCompForm] = useState(
    "Claim NY Workers Comp Form Deny"
  );
  const [claimPatientActivity, setClaimPatientActivity] = useState(
    "Claim Patient Activity Deny"
  );
  const [claimPatientPayment, setClaimPatientPayment] = useState(
    "Claim Patient Payments Deny"
  );
  const [claimTracking, setClaimTracking] = useState("Claim Tracking Deny");
  const [customerSetupPractice, setCustomerSetupPractice] = useState(
    "Customer Setup Practice Deny"
  );
  const [customerSetupProvider, setCustomerSetupProvider] = useState(
    "Customer Setup Provider Deny"
  );
  const [customerSetupFacility, setCustomerSetupFacility] = useState(
    "Customer Setup Facility Deny"
  );
  const [customerSetupReferring, setCustomerSetupReferring] = useState(
    "Customer Setup Referring Deny"
  );
  const [customerSetupPayer, setCustomerSetupPayer] = useState(
    "Customer Setup Payer Deny"
  );
  const [customerSetupPayerAgreement, setCustomerSetupPayerAgreement] =
    useState("Customer Setup Payer Agreements Deny");
  const [customerSetupCodes, setCustomerSetupCodes] = useState(
    "Customer Setup Codes Deny"
  );
  const [customerSetupInventory, setCustomerSetupInventory] = useState(
    "Customer Setup Inventory Deny"
  );
  const [cusomerSetupFeeSchedule, setCusomerSetupFeeSchedule] = useState(
    "Customer Setup Fee Schedules Deny"
  );
  const [customerSetupContractMgmnt, setCustomerSetupContractMgmnt] = useState(
    "Customer Setup Contract Management Deny"
  );
  const [customerSetupAlertControl, setCustomerSetupAlertControl] = useState(
    "Customer Setup Alert Control Deny"
  );
  const [
    customerSetupStatementAutomation,
    setCustomerSetupStatementAutomation,
  ] = useState("Customer Setup Statement Automation Deny");
  const [customerSetupLblSpblConfig, setCustomerSetupLblSpblConfig] = useState(
    "Customer Setup Label and Superbill Configuration Deny"
  );
  const [customerSetupPersnlIdInfoSSN, setCustomerSetupPersnlIdInfoSSN] =
    useState("Customer Setup Personally Identifiable Information-SSN Deny");
  const [customerSetupAccSetup, setCustomerSetupAccSetup] = useState(
    "Customer Setup Account Setup Deny"
  );
  const [customerSetupBillPaymnt, setCustomerSetupBillPaymnt] = useState(
    "Customer Setup Bill Payment Deny"
  );
  const [customerSetupCustomiztion, setCustomerSetupCustomiztion] = useState(
    "Customer Setup Customization Deny"
  );
  const [documentDocMangmnt, setDocumentDocMangmnt] = useState(
    "Documents Document Management Deny"
  );
  const [homeDashboard, setHomeDashboard] = useState("Home Dashboard Deny");
  const [homeMessging, setHomeMessging] = useState("Home Messaging Deny");
  const [homeContact, setHomeContact] = useState("Home Contacts Deny");
  const [homeAdminstrTask, setHomeAdminstrTask] = useState(
    "Home Administer Tasks Own Tasks Only"
  );
  const [interfaceInterfceTracking, setInterfaceInterfceTracking] = useState(
    "Interface Interface Tracking Deny"
  );
  const [otherPaymentPortal, setOtherPaymentPortal] = useState(
    "Other Payment Portal Deny"
  );
  const [patientPatient, setPatientPatient] = useState("Patient Patient Deny");
  const [patientAddVerif, setPatientAddVerif] = useState(
    "Patient Address Verification Deny"
  );
  const [patientBatchEligib, setPatientBatchEligib] = useState(
    "Patient Batch Eligibility Deny"
  );
  const [patientBatchPrinting, setPatientBatchPrinting] = useState(
    "Patient Batch Printing Deny"
  );
  const [patientContrl, setPatientContrl] = useState("Patient Control Deny");
  const [patientDebitCredit, setPatientDebitCredit] = useState(
    "Patient Debit/Credit Deny"
  );
  const [patienteditNots, setPatienteditNots] = useState(
    "Patient Edit Notes Deny"
  );
  const [patientEligb, setPatientEligb] = useState("Patient Eligibility Deny");
  const [patientEnhancedStatement, setPatientEnhancedStatement] = useState(
    "Patient Enhanced Statement Printing Deny"
  );
  const [patientAccMgmnt, setPatientAccMgmnt] = useState(
    "Patient Patient Account Management Deny"
  );
  const [patientActivity, setPatientActivity] = useState(
    "Patient Patient Activity Deny"
  );
  const [patientMerg, setPatientMerg] = useState("Patient Patient Merge Deny");
  const [patientNots, setPatientNots] = useState("Patient Patient Notes Deny");
  const [patientPaymnt, setPatientPaymnt] = useState(
    "Patient Patient Payments Deny"
  );
  const [patientpaymPortal, setPatientPaymPortal] = useState(
    "Patient Payment Portal Invite Deny"
  );
  const [patientIdInfoSSn, setPatientIdInfoSSn] = useState(
    "Patient Personally Identifiable Information-SSN Deny"
  );
  const [patientTrackng, setPatientTrackng] = useState("Patient Tracking Deny");
  const [paymentPatientPymnt, setPaymentPatientPymnt] = useState(
    "Payment Patient Payments Deny"
  );
  const [paymentInsurance, setPaymentInsurance] = useState(
    "Payment Insurance Payments Deny"
  );
  const [paymentEraAutoApply, setPaymentEraAutoApply] = useState(
    "Payment ERA Auto Apply Deny"
  );
  const [paymentPatientActvty, setPaymentPatientActvty] = useState(
    "Payment Patient Activity Deny"
  );
  const [paymentTrackng, setPaymentTrackng] = useState("Payment Tracking Deny");
  const [reportsReports, setReportsReports] = useState("Reports Reports Deny");
  const [reportsArMgmntReports, setReportsArMgmntReports] = useState(
    "Reports A/R Management Reports Deny"
  );
  const [reportMngmntReports, setReportMngmntReports] = useState(
    "Reports Management Reports Deny"
  );
  const [reportReportsBuilder, setReportReportsBuilder] = useState(
    "Reports Report Builder Deny"
  );

  // functions for getting permissions
  // account admin
  function getaccount(permissions) {
    setaccountAdministrationAccountSetup(permissions);
  }

  function billpayment(permissions) {
    setaccountAdministrationBillPayment(permissions);
  }

  function getmonthlyInvoice(permissions) {
    setaccountAdministrationMonthlyInvoice(permissions);
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
      API.post("accountadmin/security/permission/role/create", {
        rolename: name.toUpperCase(),
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
      })
        .then(function (response) {
          console.log("our resp", response.data.status);
          if (response.data.status != 1) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Role Added",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/permission-roles", { replace: true });
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Role Already Exists!",
              showConfirmButton: false,
              timer: 2500,
            });
          }
        })
        .catch(function (error) {
          console.log("the is error", error);
        });
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
                value={name.toUpperCase()}
                // onChange={handleChange}
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
                Save
              </button>
            </div>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              onChange={roleStatusHandler}
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
              <AccountAdminCat
                fetchdata={getaccount}
                billpayment={billpayment}
                monthlyInvoice={getmonthlyInvoice}
                showDescription={checked}
                permissionType="2"
              />
            )}
            {option === "Appointments" && (
              <AppointmentCat
                appointmentSchedule={getappointmentSchedule}
                appointmentScheduleConfiguration={
                  getappointmentScheduleConfiguration
                }
                appointmentControl={getappointmentControl}
                appointmentBatchPrinting={getappointmentBatchPrinting}
                appointmentDepartment={getappointmentDepartment}
                appointmentPatientActivity={getappointmentPatientActivity}
                appointmentPatientPayment={getappointmentPatientPayment}
                showDescription={checked}
                permissionType="2"
              />
            )}
            {option === "Claim" && (
              <ClaimCat
                claimProfessionalClaim={getclaimProfessionalClaim}
                claimInstitutionalClaim={getclaimInstitutionalClaim}
                claimBacthPrinting={getclaimBacthPrinting}
                claimFollowUp={getclaimFollowUp}
                claimClearingHouseReports={getclaimClearingHouseReports}
                claimControl={getclaimControl}
                claimNyWorkersCompForm={getclaimNyWorkersCompForm}
                claimPatientActivity={getclaimPatientActivity}
                claimPatientPayment={getclaimPatientPayment}
                claimTracking={getclaimTracking}
                showDescription={checked}
                permissionType="2"
              />
            )}
            {option === "Customer-Setup" && (
              <CustomerCat
                customerSetupPractice={getcustomerSetupPractice}
                customerSetupProvider={getcustomerSetupProvider}
                customerSetupFacility={getcustomerSetupFacility}
                customerSetupReferring={getcustomerSetupReferring}
                customerSetupPayer={getcustomerSetupPayer}
                customerSetupPayerAgreement={getcustomerSetupPayerAgreement}
                customerSetupCodes={getcustomerSetupCodes}
                customerSetupInventory={getcustomerSetupInventory}
                customerSetupFeeSchedule={getCusomerSetupFeeSchedule}
                customerSetupContractMgmnt={getcustomerSetupContractMgmnt}
                customerSetupAlertControl={getcustomerSetupAlertControl}
                customerSetupStatementAutomation={
                  getcustomerSetupStatementAutomation
                }
                customerSetupLblSpblConfig={getcustomerSetupLblSpblConfig}
                customerSetupPersnlIdInfoSSN={getcustomerSetupPersnlIdInfoSSN}
                customerSetupAccSetup={getcustomerSetupAccSetup}
                customerSetupBillPaymnt={getcustomerSetupBillPaymnt}
                customerSetupCustomiztion={getcustomerSetupCustomiztion}
                showDescription={checked}
                permissionType="2"
              />
            )}
            {option === "Documents" && (
              <DocumentsCat
                documentDocMangmnt={getdocumentDocMangmnt}
                showDescription={checked}
                permissionType="2"
              />
            )}
            {option === "Home" && (
              <HomeCat
                homeDashboard={gethomeDashboard}
                homeMessging={gethomeMessging}
                homeContact={gethomeContact}
                homeAdminstrTask={gethomeAdminstrTask}
                showDescription={checked}
                permissionType="2"
              />
            )}
            {option === "Interface" && (
              <InterfaceCat
                interfaceInterfceTracking={getinterfaceInterfceTracking}
                showDescription={checked}
                permissionType="2"
              />
            )}
            {option === "Other" && (
              <OtherCat
                otherPaymentPortal={getotherPaymentPortal}
                showDescription={checked}
                permissionType="2"
              />
            )}
            {option === "Patient" && (
              <PatientCat
                patientPatient={getpatientPatient}
                patientAddVerifies={getpatientAddVerif}
                patientBatchEligib={getpatientBatchEligib}
                patientBatchPrinting={getpatientBatchPrinting}
                patientContrl={getpatientContrl}
                patientDebitCredit={getpatientDebitCredit}
                patienteditNots={getpatienteditNots}
                patientEligb={getpatientEligb}
                patientEnhancedStatement={getpatientEnhancedStatement}
                patientAccMgmnt={getpatientAccMgmnt}
                patientActivity={getpatientActivity}
                patientMerg={getpatientMerg}
                patientNots={getpatientNots}
                patientPaymnt={getpatientPaymnt}
                patientpaymPortal={getpatientpaymPortal}
                patientIdInfoSSn={getpatientIdInfoSSn}
                patientTrackng={getpatientTrackng}
                showDescription={checked}
                permissionType="2"
              />
            )}
            {option === "Payment" && (
              <PaymentCat
                paymentPatientPymnt={getpaymentPatientPymnt}
                paymentInsurance={getpaymentInsurance}
                paymentEraAutoApply={getpaymentEraAutoApply}
                paymentPatientActvty={getpaymentPatientActvty}
                paymentTrackng={getpaymentTrackng}
                showDescription={checked}
                permissionType="2"
              />
            )}
            {option === "Reports" && (
              <ReportsCat
                reportsReports={getreportsReports}
                reportsArMgmntReports={getreportsArMgmntReports}
                reportMngmntReports={getreportMngmntReports}
                reportReportsBuilder={getreportReportsBuilder}
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
