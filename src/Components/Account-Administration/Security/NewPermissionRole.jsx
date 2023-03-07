import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormValNewPermissionRole } from "../../../Schemas/FormValNewPermissionRole";
import { setName } from "../../../Redux/features/Security/ShowAllRolesSlice";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import API from "../../../Api/ClientApi";

const NewPermissionRole = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [saveCliked, setSaveCliked] = useState(false);
  const [enterPermissionClicked, setEnterPermissionClicked] = useState(false);
  // state for permissions
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
  // const handleOnClick = useCallback(
  //   () => navigate("/specificRole", { replace: true }),
  //   [navigate]
  // );
  const initialValues = {
    rolename: "",
    roleStatus: 1,
  };
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: FormValNewPermissionRole,
      validateOnChange: true,
      validateOnBlur: true,
      // By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: (values, action) => {
        console.log("Values inserted, Formik", values);
        // dispatch userName

        // post to db for showing into table
        if (saveCliked) {
          API.post("accountadmin/security/permission/role/create", {
            rolename: values.rolename.toUpperCase(),
            roleStatus: values.roleStatus,
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
          })
            //reset form
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

          navigate("/permission-roles", { replace: true });
        } else if (enterPermissionClicked) {
          navigate("/specificRole", { replace: true });
          dispatch(setName(values.rolename));
        }

        //  if(enterPermissionClicked){
        //   navigate("/specificRole", { replace: true })
        //  }else{
        //   navigate("/permission-roles", { replace: true })
        //  }
      },
    });
  const enterNewPermissionHandler = () => {
    setEnterPermissionClicked(true);
    handleSubmit();
  };
  const handleSaveClick = () => {
    setSaveCliked(true);
    handleSubmit();
  };
  const handleCloseClick = () => {
    navigate("/permission-roles");
  };
  return (
    <div className="container mt-4">
      <div className="row d-flex flex-column">
        <form onSubmit={handleSubmit} action="">
          <div className="col-md d-flex">
            <button
              type="submit"
              onClick={enterNewPermissionHandler}
              className="btn btn-outline-primary btn-sm"
            >
              {" "}
              <span className="fa fa-plus"></span> Enter New Permission
            </button>
            <button
              type="submit"
              onClick={handleSaveClick}
              className="btn btn-outline-primary btn-sm mx-2"
            >
              {" "}
              <span className="fas fa-check"></span> Save
            </button>
            <button
              onClick={handleCloseClick}
              className="btn btn-outline-danger btn-sm"
            >
              {" "}
              <span className="fas fa-times"></span> Cancel
            </button>
          </div>

          <div>
            <label className="mt-2" htmlFor="">Enter Role</label>
            <input
              className="form-control form-control-sm w-25"
              type="text"
              name="rolename"
              id="rolename"
              placeholder="Enter Role"
              value={values.rolename.toUpperCase()}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className="col-md-12">
              {touched.rolename && errors.rolename ? (
                <p className="form-error">*{errors.rolename}</p>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPermissionRole;
