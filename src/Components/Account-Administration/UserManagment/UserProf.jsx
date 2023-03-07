import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik as formValidate } from "formik";
import { FormValuserprofile } from "../../../Schemas/FormValuserprofile";
import API from "../../../Api/ClientApi";
import { useSelector, useDispatch } from "react-redux";
import { PatternFormat } from "react-number-format";
import { SelectRole } from "../../../Redux/features/UserManagement/UserProfile/PermissionSlice";
import Swal from "sweetalert2";
import Permissionsnew from "./Permissionsnew";
export default function UserProf() {
  const [User_Password, setUser_Password] = useState("");
  const navigate = useNavigate();
  const [image, setImage] = useState({ preview: "", raw: "" });
  const dispatch = useDispatch();
  // change image
  // const [Imagefile, setImagefile] = useState();
  // console.log(Imagefile);

  // console.log("Preview", image.preview);
  console.log("raw", image.raw);
  // Image Handling
  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      // setFieldValue("userprofilepic", e.target.files[0]);
      // let Image = e.target.files[0];
      // setImagefile({ Image: Image });
      // let data = new FormData()

      // data.append('userprofilepic', 'image')
      // data.append('userprofilepic', event.target.files[0])
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };
  const selectrole = useSelector(
    (state) => state.PermissionCustomers.selectrole
  );

  // customer Access Pending
  const [customerValue, setCustomerValue] = useState(
    sessionStorage.getItem("customer_id")
  );
  const customeraccess = useSelector((state) => state.CustomersAccess);
  const [customaccess, setCustomaccess] = useState([customerValue]);

  useEffect(() => {
    setCustomaccess(customaccess);
  }, [customeraccess]);

  //hooks use state
  const [
    accountAdministrationBillPayment,
    setaccountAdministrationBillPayment,
  ] = useState("Account Administration Bill Payment Deny");
  const [
    accountAdministrationAccountSetup,
    setaccountAdministrationAccountSetup,
  ] = useState("Account Administration Account Setup Deny");
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
  // save btn disable,conditionaly
  const [savedisable, setSavedisable] = useState(false);

  const permvalues = useSelector((state) => state.PermissionCustomers); // get values from redux
  const jsonperms = JSON.stringify(permvalues); // Convert Values to JSON String object
  const [fjson, setfjson] = useState(jsonperms); // Set Values frrom JSON String

  //Methods
  function accountAdministrationAccountSetupMethod(name) {
    setaccountAdministrationAccountSetup(name);
  }
  function accountAdministrationbillPaymentMethod(name) {
    setaccountAdministrationBillPayment(name);
  }
  function accountAdministrationmonthlyInvoiceMethod(name) {
    setaccountAdministrationMonthlyInvoice(name);
  }
  function appointmentScheduleMethod(name) {
    setAppointmentSchedule(name);
  }
  function appointmentScheduleConfigurationMethod(name) {
    setAppointmentScheduleConfiguration(name);
  }
  function appointmentControlMethod(name) {
    setappointmentControl(name);
  }
  function appointmentBatchPrintingMethod(name) {
    setAppointmentBatchPrinting(name);
  }
  function AppointmentDepartmentMethod(name) {
    setAppointmentDepartment(name);
  }
  function AppointmentPatientActivityMethod(name) {
    setAppointmentPatientActivity(name);
  }
  function appointmentPatientPaymentMethod(name) {
    setappointmentPatientPayment(name);
  }
  function claimProfessionalClaimMethod(name) {
    setClaimProfessionalClaim(name);
  }
  function claimInstitutionalClaimMethod(name) {
    setClaimInstitutionalClaim(name);
  }
  function ClaimBacthPrintingMethod(name) {
    setClaimBacthPrinting(name);
  }
  function ClaimFollowUpMethod(name) {
    setClaimFollowUp(name);
  }
  function ClaimClearingHouseReportsMethod(name) {
    setClaimClearingHouseReports(name);
  }
  function ClaimControlsMethod(name) {
    setClaimControl(name);
  }
  function ClaimNyWorkersCompFormMethod(name) {
    setClaimNyWorkersCompForm(name);
  }
  function ClaimPatientActivityMethod(name) {
    setClaimPatientActivity(name);
  }
  function ClaimPatientPaymentMethod(name) {
    setClaimPatientPayment(name);
  }
  function ClaimTrackingMethod(name) {
    setClaimTracking(name);
  }
  function CustomerSetupPracticeMethod(name) {
    setCustomerSetupPractice(name);
  }
  function CustomerSetupProviderMethod(name) {
    setCustomerSetupProvider(name);
  }
  function CustomerSetupFacilityMethod(name) {
    setCustomerSetupFacility(name);
  }
  function CustomerSetupReferringMethod(name) {
    setCustomerSetupReferring(name);
  }
  function CustomerSetupPayerMethod(name) {
    setCustomerSetupPayer(name);
  }
  function CustomerSetupPayerAgreementMethod(name) {
    setCustomerSetupPayerAgreement(name);
  }
  function CustomerSetupCodesMethod(name) {
    setCustomerSetupCodes(name);
  }
  function CustomerSetupInventoryMethod(name) {
    setCustomerSetupInventory(name);
  }
  function CusomerSetupFeeScheduleMethod(name) {
    setCusomerSetupFeeSchedule(name);
  }
  function CustomerSetupContractMgmntMethod(name) {
    setCustomerSetupContractMgmnt(name);
  }
  function CustomerSetupAlertControlMethod(name) {
    setCustomerSetupAlertControl(name);
  }
  function CustomerSetupStatementAutomationMethod(name) {
    setCustomerSetupStatementAutomation(name);
  }
  function CustomerSetupLblSpblConfigMethod(name) {
    setCustomerSetupLblSpblConfig(name);
  }
  function CustomerSetupPersnlIdInfoSSNMethod(name) {
    setCustomerSetupPersnlIdInfoSSN(name);
  }
  function CustomerSetupAccSetupMethod(name) {
    setCustomerSetupAccSetup(name);
  }
  function CustomerSetupBillPaymntMethod(name) {
    setCustomerSetupBillPaymnt(name);
  }
  function CustomerSetupCustomiztionMethod(name) {
    setCustomerSetupCustomiztion(name);
  }
  function DocumentDocMangmntMethod(name) {
    setDocumentDocMangmnt(name);
  }
  function HomeDashboardMethod(name) {
    setHomeDashboard(name);
  }
  function HomeMessgingMethod(name) {
    setHomeMessging(name);
  }
  function HomeContactMethod(name) {
    setHomeContact(name);
  }
  function HomeAdminstrTaskMethod(name) {
    setHomeAdminstrTask(name);
  }
  function InterfaceInterfceTrackingMethod(name) {
    setInterfaceInterfceTracking(name);
  }
  function OtherPaymentPortalMethod(name) {
    setOtherPaymentPortal(name);
  }
  function PatientPatientMethod(name) {
    setPatientPatient(name);
  }
  function PatientAddVerifMethod(name) {
    setPatientAddVerif(name);
  }
  function PatientBatchEligibMethod(name) {
    setPatientBatchEligib(name);
  }
  function PatientBatchPrintingMethod(name) {
    setPatientBatchPrinting(name);
  }
  function PatientContrlMethod(name) {
    setPatientContrl(name);
  }
  function PatientDebitCreditMethod(name) {
    setPatientDebitCredit(name);
  }
  function PatienteditNotsMethod(name) {
    setPatienteditNots(name);
  }
  function PatientEligbMethod(name) {
    setPatientEligb(name);
  }
  function PatientEnhancedStatementbMethod(name) {
    setPatientEnhancedStatement(name);
  }
  function PatientAccMgmntMethod(name) {
    setPatientAccMgmnt(name);
  }
  function PatientActivityMethod(name) {
    setPatientActivity(name);
  }
  function PatientMergMethod(name) {
    setPatientMerg(name);
  }
  function PatientNotsMethod(name) {
    setPatientNots(name);
  }
  function PatientPaymntMethod(name) {
    setPatientPaymnt(name);
  }
  function PatientPaymPortalMethod(name) {
    setPatientPaymPortal(name);
  }
  function PatientIdInfoSSnMethod(name) {
    setPatientIdInfoSSn(name);
  }
  function PatientTrackngMethod(name) {
    setPatientTrackng(name);
  }
  function PaymentPatientPymntMethod(name) {
    setPaymentPatientPymnt(name);
  }
  function PaymentInsuranceMethod(name) {
    setPaymentInsurance(name);
  }
  function PaymentEraAutoApplyMethod(name) {
    setPaymentEraAutoApply(name);
  }
  function PaymentPatientActvtyMethod(name) {
    setPaymentPatientActvty(name);
  }
  function PaymentTrackngMethod(name) {
    setPaymentTrackng(name);
  }
  function ReportsReportsMethod(name) {
    setReportsReports(name);
  }
  function ReportsArMgmntReportsMethod(name) {
    setReportsArMgmntReports(name);
  }
  function ReportMngmntReportsMethod(name) {
    setReportMngmntReports(name);
  }
  function ReportReportsBuilderMethod(name) {
    setReportReportsBuilder(name);
  }

  // Formik-Yup Validation

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
    user_type: selectrole,
    permissionsValue: [useSelector((state) => state.PermissionCustomers)],
    customersaccess: [useSelector((state) => state.CustomersAccess)],
    accountsetup: "",
    billpayment: "",
    monthlyInvoice: "",
  };

  useEffect(() => {
    setfjson(permvalues);
  }, [permvalues]);

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
    validationSchema: FormValuserprofile,
    validateOnChange: true,
    validateOnBlur: true,
    // By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: (values, action) => {
      // API Instance
      // Image before Submiting
      // const ImageformData = new FormData();
      // ImageformData.append("userprofilepic", userprofilepic.files[0]);
      // console.log("formdata", ImageformData);
      // const formData = new FormData();

      // formData.append("title", "test");
      // formData.append(
      //   "userprofilepic",
      //   document.querySelector("#userprofilepic").files[0]
      // );

      // axios.post(
      //   "https://httpbin.org/post",

      //   formData,
      //   {
      //     headers: { "Content-Type": "multipart/form-data" },
      //     // headers: {"Content-Type": "application/json"}
      //   }
      // );

      API.post(
        "accountadmin/usermanagement/registeruser",
        {
          username: values.username.trim(),
          email: values.email.trim(),
          title: values.title.toUpperCase().trimStart(),
          firstname: values.firstname.trimStart(),
          lastname: values.lastname.trimStart(),
          userprofilemi: values.userprofilemi.toUpperCase().trim(),
          phone1: values.phone1.trimStart(),
          phone2: values.phone2.trimStart(),
          ext1: values.ext1.trimStart(),
          ext2: values.ext2.trimStart(),
          customaccess: customaccess,
          image: image.preview,
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
          User_Password,
          // userprofilepic: [ImageformData],
          //  userprofilepic: ,
          fjson: fjson, // Values from Permission including user_type
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log("Values Submited, Formik", values);

      // to get rid of all the values after submitting the form
      image.preview = null;
      // Sweet Alert on Successful User Entry
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      action.resetForm();
      setSavedisable(true);
      navigate("/user-managment");
    },
  });
  // console.log("Image is", image.preview)
  // console.log(errors);
  const userTypeHandler = (e) => {
    dispatch(SelectRole(e.target.value));
  };
  return (
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
              //onSubmit={(e) => resetPic(e.target.value)}
            />
            <br />
          </div>
          <br />
          <div className="col-10">
            <label htmlFor="">UserName</label>
            <input
              type="text"
              className={`form-control form-control-sm ${
                errors.username && touched.username && "is-invalid"
              }`}
              id="username"
              placeholder="Username"
              autoComplete="new-password"
              autoFocus
              name="username"
              value={values.username.trim()}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength="25"
            />
            {touched.username && errors.username ? (
              <p className="form-error">{errors.username}</p>
            ) : null}
          </div>
          <div className="row px-2">
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
          </div>

          <div className="col-md-4 ">
            <label htmlFor="">First Name</label>
            <input
              type="text"
              className={`form-control form-control-sm ${
                errors.firstname && touched.firstname && "is-invalid"
              }`}
              id="firstname"
              placeholder="First Name"
              name="firstname"
              value={values.firstname.replace(/[^A-Za-z ]/gi, "").trimStart()}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyUp={handleChange}
              maxLength="20"
            />
            {touched.firstname && errors.firstname ? (
              <span className="form-error d-flex">{errors.firstname}</span>
            ) : null}
          </div>

          <div className="col-md-4">
            <label htmlFor="">Last Name</label>
            <input
              type="text"
              className={`form-control form-control-sm ${
                errors.lastname && touched.lastname && "is-invalid"
              }`}
              id="lastname"
              placeholder="Last Name"
              name="lastname"
              value={values.lastname.replace(/[^A-Za-z ]/gi, "").trimStart()}
              onChange={handleChange}
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
            <label htmlFor="">MI</label>
            <input
              type="text"
              className={`form-control form-control-sm ${
                errors.userprofilemi && touched.userprofilemi && "is-invalid"
              }`}
              id="userprofilemi"
              placeholder="MI"
              value={values.userprofilemi
                .toUpperCase()
                .replace(/[^A-Za-z]/gi, "")
                .trim()}
              onChange={handleChange}
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
            <label htmlFor="">Email</label>
            <input
              type="text"
              autoComplete="off"
              name="email"
              id="email"
              className={`form-control form-control-sm ${
                errors.email && touched.email && "is-invalid"
              }`}
              placeholder="email"
              value={values.email.trim()}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.email && touched.email && (
              <p className="form-error">{errors.email}</p>
            )}
          </div>

          <div className="col-md-10">
            <label htmlFor="">Password</label>
            <input
              type="password"
              autoComplete="off"
              name="password"
              id="password"
              className={`form-control form-control-sm`}
              placeholder="password"
              value={User_Password}
              onChange={(e) =>
                setUser_Password(e.target.value?.toString()?.trimStart())
              }
              minLength={8}
              maxLength={60}
              required
            />
          </div>

          <div className="col-10">
            <label htmlFor="">Title</label>
            <input
              type="text"
              className={`form-control form-control-sm ${
                errors.title && touched.title && "is-invalid"
              }`}
              id="title"
              placeholder="Title"
              name="title"
              value={values.title
                .toUpperCase()
                .replace(/[^A-Za-z ]/gi, "")
                .trimStart()}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyUp={handleChange}
              maxLength="10"
            />
            {/* <div className="col-md-9">
              {touched.title && errors.title ? (
                <p className="form-error">{errors.title}</p>
              ) : null}
            </div> */}
          </div>
          <div className="col-md-6">
            <label htmlFor="">Phone#1</label>
            <PatternFormat
              format="(###) ###-####"
              mask=" "
              type="tel"
              className={`form-control form-control-sm ${
                errors.phone1 && touched.phone1 && "is-invalid"
              }`}
              id="phone1"
              placeholder="(888) 888-8888"
              name="phone1"
              value={values.phone1.trimStart()}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className="col-md-9">
              {touched.phone1 && errors.phone1 ? (
                <p className="form-error">{errors.phone1}</p>
              ) : null}
            </div>
          </div>

          <div className="col-md-2">
            <label htmlFor="">Ext#1</label>
            <input
              type="tel"
              className={`form-control form-control-sm ${
                errors.ext1 && touched.ext1 && "is-invalid"
              }`}
              id="ext1"
              placeholder="Ext"
              name="ext1"
              value={values.ext1.replace(/[^0-9]/gi, "").trimStart()}
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
            <label htmlFor="">Phone#2</label>
            <PatternFormat
              format="(###) ###-####"
              mask=" "
              type="tel"
              className={`form-control form-control-sm ${
                errors.phone2 && touched.phone2 && "is-invalid"
              }`}
              id="phone2"
              placeholder="(888) 888-8888"
              name="phone2"
              value={values.phone2.trimStart()}
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
            <label htmlFor="">Ext#2</label>
            <input
              type="tel"
              className={`form-control form-control-sm ${
                errors.ext2 && touched.ext2 && "is-invalid"
              }`}
              id="ext2"
              placeholder="Ext"
              name="ext2"
              value={values.ext2.replace(/[^0-9]/gi, "").trimStart()}
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
              disabled={savedisable}
              type="submit"
              className="btn btn-outline-primary me-2 btn-sm"
            >
              Save
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
      </div>

      <div className="col-md-6 mt-5">
        {/* <Permissions /> */}
        <Permissionsnew
          accountadministrationaccountsetup={
            accountAdministrationAccountSetupMethod
          }
          accountadministrationbillpayment={
            accountAdministrationbillPaymentMethod
          }
          accountadministrationmonthlyInvoice={
            accountAdministrationmonthlyInvoiceMethod
          }
          appointmentSchedule={appointmentScheduleMethod}
          appointmentScheduleConfiguration={
            appointmentScheduleConfigurationMethod
          }
          appointmentControl={appointmentControlMethod}
          appointmentBatchPrinting={appointmentBatchPrintingMethod}
          appointmentDepartment={AppointmentDepartmentMethod}
          appointmentPatientActivity={AppointmentPatientActivityMethod}
          appointmentPatientPayment={appointmentPatientPaymentMethod}
          claimProfessionalClaim={claimProfessionalClaimMethod}
          claimInstitutionalClaim={claimInstitutionalClaimMethod}
          claimBacthPrinting={ClaimBacthPrintingMethod}
          claimFollowUp={ClaimFollowUpMethod}
          claimClearingHouseReports={ClaimClearingHouseReportsMethod}
          claimControl={ClaimControlsMethod}
          claimNyWorkersCompForm={ClaimNyWorkersCompFormMethod}
          claimPatientActivity={ClaimPatientActivityMethod}
          claimPatientPayment={ClaimPatientPaymentMethod}
          claimTracking={ClaimTrackingMethod}
          customerSetupPractice={CustomerSetupPracticeMethod}
          customerSetupProvider={CustomerSetupProviderMethod}
          customerSetupFacility={CustomerSetupFacilityMethod}
          customerSetupReferring={CustomerSetupReferringMethod}
          customerSetupPayer={CustomerSetupPayerMethod}
          customerSetupPayerAgreement={CustomerSetupPayerAgreementMethod}
          customerSetupCodes={CustomerSetupCodesMethod}
          customerSetupInventory={CustomerSetupInventoryMethod}
          cusomerSetupFeeSchedule={CusomerSetupFeeScheduleMethod}
          customerSetupContractMgmnt={CustomerSetupContractMgmntMethod}
          customerSetupAlertControl={CustomerSetupAlertControlMethod}
          customerSetupStatementAutomation={
            CustomerSetupStatementAutomationMethod
          }
          customerSetupLblSpblConfig={CustomerSetupLblSpblConfigMethod}
          customerSetupPersnlIdInfoSSN={CustomerSetupPersnlIdInfoSSNMethod}
          customerSetupAccSetup={CustomerSetupAccSetupMethod}
          customerSetupBillPaymnt={CustomerSetupBillPaymntMethod}
          customerSetupCustomiztion={CustomerSetupCustomiztionMethod}
          documentDocMangmnt={DocumentDocMangmntMethod}
          homeDashboard={HomeDashboardMethod}
          homeMessging={HomeMessgingMethod}
          homeContact={HomeContactMethod}
          homeAdminstrTask={HomeAdminstrTaskMethod}
          interfaceInterfceTracking={InterfaceInterfceTrackingMethod}
          otherPaymentPortal={OtherPaymentPortalMethod}
          patientPatient={PatientPatientMethod}
          patientAddVerif={PatientAddVerifMethod}
          patientBatchEligib={PatientBatchEligibMethod}
          patientBatchPrinting={PatientBatchPrintingMethod}
          patientContrl={PatientContrlMethod}
          patientDebitCredit={PatientDebitCreditMethod}
          patienteditNots={PatienteditNotsMethod}
          patientEligb={PatientEligbMethod}
          patientEnhancedStatement={PatientEnhancedStatementbMethod}
          patientAccMgmnt={PatientAccMgmntMethod}
          patientActivity={PatientActivityMethod}
          patientMerg={PatientMergMethod}
          patientNots={PatientNotsMethod}
          patientPaymnt={PatientPaymntMethod}
          patientpaymPortal={PatientPaymPortalMethod}
          patientIdInfoSSn={PatientIdInfoSSnMethod}
          patientTrackng={PatientTrackngMethod}
          paymentPatientPymnt={PaymentPatientPymntMethod}
          paymentInsurance={PaymentInsuranceMethod}
          paymentEraAutoApply={PaymentEraAutoApplyMethod}
          paymentPatientActvty={PaymentPatientActvtyMethod}
          paymentTrackng={PaymentTrackngMethod}
          reportsReports={ReportsReportsMethod}
          reportsArMgmntReports={ReportsArMgmntReportsMethod}
          reportMngmntReports={ReportMngmntReportsMethod}
          reportReportsBuilder={ReportReportsBuilderMethod}
        />
      </div>
    </form>
  );
}
