import { lazy, useEffect } from "react";

import {
  createBrowserRouter,
  createMemoryRouter,
  createHashRouter,
  useNavigate,
} from "react-router-dom";
// import EditProcedureCode from "./Components/CustomerSetup/Codes/Procedures/EditProcedureCode";
// import EditableFacilityForm from "./Components/CustomerSetup/Facilities/EditableFacility/EditableFacilityForm";

// import EditablePractice from "./Components/CustomerSetup/Practices/EditablePracticeForms/EditablePractice";

const SpecificRoleInfo = lazy(
  () => import("./Components/Account-Administration/Security/SpecificRoleInfo")
);

const Dashboard = lazy(() => import("./Pages/Dashboard"));
const ErrorPage = lazy(() => import("./Pages/ErrorPage"));
// home
const Welcome = lazy(() => import("./Components/Home/Welcome/Welcome"));
const WelcomeDashboard = lazy(
  () => import("./Components/Home/WelcomeDashboard/WelcomeDashboard")
);
const Messages = lazy(() => import("./Components/Home/Messages/Messages"));
const Tasks = lazy(() => import("./Components/Home/Tasks/Tasks"));

// reports
const Viewer = lazy(() => import("./Components/Reports/Viewer/Viewer"));
const Builder = lazy(() => import("./Components/Reports/Builder/Builder"));
// appointments
const Schedular = lazy(
  () => import("./Components/Appointments/Schedular/Schedular")
);
// import Schedular from "./Components/Appointments/Schedular/Schedular";
const ManageWaitingList = lazy(
  () => import("./Components/Appointments/ManageWaitingList/ManageWaitingList")
);
const AppointmentControl = lazy(
  () =>
    import("./Components/Appointments/AppointmentControl/AppointmentControl")
);
const SuperbillBatchPrint = lazy(
  () =>
    import("./Components/Appointments/SuperbillBatchPrint/SuperbillBatchPrint")
);
const Configuration = lazy(
  () => import("./Components/Appointments/Configuration/Configuration")
);
// patient
const Patient = lazy(() => import("./Components/Patient/Patient/Patient"));
const NewPatient = lazy(
  () => import("./Components/Patient/Patient/NewPatient")
);

// import EditablePatient from "./Components/Patient/Patient/EditablePatient/EditablePatient";
const ManageAccount = lazy(
  () => import("./Components/Patient/ManageAccount/ManageAccount")
);
const PaymentaPlans = lazy(
  () => import("./Components/Patient/PaymentPlans/PaymentaPlans")
);
const ARControl = lazy(
  () => import("./Components/Patient/ARControl/ARControl")
);
const BatchEligibilty = lazy(
  () => import("./Components/Patient/BatchEligibility/BatchEligibilty")
);
const StatementBatchPrint = lazy(
  () => import("./Components/Patient/StatementBatchPrint/StatementBatchPrint")
);
const StatementTracker = lazy(
  () => import("./Components/Patient/StatementTracker/StatementTracker")
);
const LabelBatchPrint = lazy(
  () => import("./Components/Patient/LabelBatchPrint/LabelBatchPrint")
);
const SettingPatient = lazy(
  () => import("./Components/Patient/Setting/SettingPatient")
);
// claim
const Claim = lazy(() => import("./Components/Claim/Claim/Claim"));
const AddProfessionalClaim = lazy(
  () => import("./Components/Claim/Claim/AddProfessionalClaim")
);

const InstitutionalClaim = lazy(
  () => import("./Components/Claim/Claim/InstitutionalClaim")
);
const ClaimTracker = lazy(
  () => import("./Components/Claim/ClaimTracker/ClaimTracker")
);
const StatusControl = lazy(
  () => import("./Components/Claim/StatusControl/StatusControl")
);
const FollowUpManagment = lazy(
  () => import("./Components/Claim/FollowUpManagment/FollowUpManagment")
);
const ClaimBatchPrint = lazy(
  () => import("./Components/Claim/ClaimBatchPrint/ClaimBatchPrint")
);
const SettingClaim = lazy(
  () => import("./Components/Claim/Setting/SettingClaim")
);
// payment
const Post = lazy(() => import("./Components/Payment/Post/Post"));
const ApplyCredit = lazy(
  () => import("./Components/Payment/ApplyCredit/ApplyCredit")
);
const View = lazy(() => import("./Components/Payment/View/View"));
const Era = lazy(() => import("./Components/Payment/ERA/Era"));
const PaymentTracker = lazy(
  () => import("./Components/Payment/PaymentTracker/PaymentTracker")
);
const SettingPayment = lazy(
  () => import("./Components/Payment/SettingPayment/SettingPayment")
);
// document
const Documents = lazy(() => import("./Components/Documents/Documents"));
// interface
const InterfaceTracker = lazy(
  () => import("./Components/Interface/InterfaceTracker/InterfaceTracker")
);
const EditSpecificRole = lazy(
  () => import("./Components/Account-Administration/Security/EditSpecificRole")
);

const SettingInterface = lazy(
  () => import("./Components/Interface/SettingInterface/SettingInterface")
);
// customer-setup
const Practices = lazy(
  () => import("./Components/CustomerSetup/Practices/Practices")
);

const NewPractice = lazy(
  () => import("./Components/CustomerSetup/Practices/NewPractice")
);

const Providers = lazy(
  () => import("./Components/CustomerSetup/Providers/Providers")
);
// import EditableProvider from "./Components/CustomerSetup/Providers/EditableProvider";

const Facilities = lazy(
  () => import("./Components/CustomerSetup/Facilities/Facilities")
);

const NewFacilities = lazy(
  () => import("./Components/CustomerSetup/Facilities/NewFacility")
);

const ReferringProviders = lazy(
  () =>
    import("./Components/CustomerSetup/ReferringProviders/ReferringProviders")
);
const NewReferringProviders = lazy(
  () => import("./Components/CustomerSetup/ReferringProviders/NewReferring")
);
const Payers = lazy(() => import("./Components/CustomerSetup/Payers/Payers"));

const NewPayers = lazy(
  () => import("./Components/CustomerSetup/Payers/NewPayer")
);

const PayerAgreement = lazy(
  () => import("./Components/CustomerSetup/PayerAgreement/PayerAgreement")
);
const CollectionAgencies = lazy(
  () =>
    import("./Components/CustomerSetup/CollectionAgencies/CollectionAgencies")
);
const Codes = lazy(() => import("./Components/CustomerSetup/Codes/Codes"));
// all codes
const Procedure = lazy(
  () => import("./Components/CustomerSetup/Codes/Procedures/Procedures")
);
const NewProcedureCode = lazy(
  () => import("./Components/CustomerSetup/Codes/Procedures/NewProcedureCode")
);
const EditProcedureCode = lazy(
  () =>
    import(
      "./Components/CustomerSetup/Codes/Procedures/EditProcedureCode/EditProcedureCode"
    )
);
const Diagnosis = lazy(
  () => import("./Components/CustomerSetup/Codes/Diagnosis/Diagnosis")
);
const NewDiagnosis = lazy(
  () => import("./Components/CustomerSetup/Codes/Diagnosis/NewDiagnosis")
);
const EditDiagnosisCode = lazy(
  () => import("./Components/CustomerSetup/Codes/Diagnosis/EditDiagnosisCode")
);
const ICDProcedure = lazy(
  () => import("./Components/CustomerSetup/Codes/ICDProcedure/ICDProcedure")
);
const EditIcdProcedureCode = lazy(
  () =>
    import("./Components/CustomerSetup/Codes/ICDProcedure/EditIcdProcedureCode")
);
const NewIcdProcedure = lazy(
  () => import("./Components/CustomerSetup/Codes/ICDProcedure/NewIcdProcedure")
);

const Revenue = lazy(
  () => import("./Components/CustomerSetup/Codes/Revenue/Revenue")
);

const NewRevenueCode = lazy(
  () => import("./Components/CustomerSetup/Codes/Revenue/NewRevenueCode")
);
const EditRevenueCode = lazy(
  () => import("./Components/CustomerSetup/Codes/Revenue/EditRevenueCode")
);
const Remmittance = lazy(
  () => import("./Components/CustomerSetup/Codes/Remmittance/Remmittance")
);
const EditRemittanceCode = lazy(
  () =>
    import("./Components/CustomerSetup/Codes/Remmittance/EditRemittanceCode")
);
const NewRemittance = lazy(
  () => import("./Components/CustomerSetup/Codes/Remmittance//NewRemittance")
);
const Adjustment = lazy(
  () => import("./Components/CustomerSetup/Codes/Adjustment/Adjustment")
);
const NewAdjustmentCode = lazy(
  () => import("./Components/CustomerSetup/Codes/Adjustment/NewAdjustmentCode")
);

const EditAdjustmentCode = lazy(
  () => import("./Components/CustomerSetup/Codes/Adjustment/EditAdjustmentCode")
);
const InventoryCode = lazy(
  () => import("./Components/CustomerSetup/Codes/Inventory/InventoryCode")
);
const EditInventoryCode = lazy(
  () => import("./Components/CustomerSetup/Codes/Inventory/EditInventoryCode")
);
const NewInventory = lazy(
  () => import("./Components/CustomerSetup/Codes/Inventory/NewInventory")
);
const ChargePanel = lazy(
  () => import("./Components/CustomerSetup/Codes/ChargePanel/ChargePanel")
);
const FeeScheduleCode = lazy(
  () =>
    import("./Components/CustomerSetup/Codes/FeeScheduleCode/FeeScheduleCode")
);
const ContactsCode = lazy(
  () => import("./Components/CustomerSetup/Codes/ContactsCode/ContactsCode")
);
const AlertControl = lazy(
  () => import("./Components/CustomerSetup/AlertControl/AlertControl")
);
const Statements = lazy(
  () => import("./Components/CustomerSetup/Statements/Statements")
);
const SuperBills = lazy(
  () => import("./Components/CustomerSetup/SuperBills/SuperBills")
);
const Labels = lazy(() => import("./Components/CustomerSetup/Labels/Labels"));
const CustomizeClaimStatuses = lazy(
  () =>
    import(
      "./Components/CustomerSetup/Customizations/CustomizeClaimStatuses/CustomizeClaimStatuses"
    )
);
const CustomizeInfoLines = lazy(
  () =>
    import(
      "./Components/CustomerSetup/Customizations/CustomizeInfoLines/CustomizeInfoLines"
    )
);
const CustomizeAccountType = lazy(
  () =>
    import(
      "./Components/CustomerSetup/Customizations/CustomizeAccountType/CustomizeAccountType"
    )
);
// account admin components
const AccountManagment = lazy(
  () =>
    import(
      "./Components/Account-Administration/AccountManagment/AccountManagment"
    )
);
const CustomerManagment = lazy(
  () =>
    import(
      "./Components/Account-Administration/CustomerManagment/CustomerManagment"
    )
);

const ManageAccess = lazy(
  () =>
    import("./Components/Account-Administration/CustomerManagment/ManageAccess")
);
const UserManagment = lazy(
  () =>
    import("./Components/Account-Administration/UserManagment/UserManagment")
);
// const UserProfileEdit = lazy(
//   () =>
//     import(
//       "./Components/Account-Administration/UserManagment/EditableForms/UserProfileEdit"
//     )
// );
import UserProfileEdit from "./Components/Account-Administration/UserManagment/EditableForms/UserProfileEdit";
const PermissionRoles = lazy(
  () => import("./Components/Account-Administration/Security/PermissionRoles")
);
const NewPermissionRole = lazy(
  () => import("./Components/Account-Administration/Security/NewPermissionRole")
);
const TwoFactorAuthentication = lazy(
  () =>
    import(
      "./Components/Account-Administration/Security/TwoFactorAuthentication"
    )
);
const Invoices = lazy(
  () => import("./Components/Account-Administration/Invoices/Invoices")
);
const PaymentProfiles = lazy(
  () =>
    import(
      "./Components/Account-Administration/PaymentProfiles/PaymentProfiles"
    )
);
const NewPaymentProfile = lazy(
  () =>
    import(
      "./Components/Account-Administration/PaymentProfiles/NewPaymentProfile"
    )
);
const Services = lazy(
  () => import("./Components/Account-Administration/Services/Services")
);
const Locks = lazy(
  () => import("./Components/Account-Administration/Locks/Locks")
);
const Sessions = lazy(
  () => import("./Components/Account-Administration/Sessions/Sessions")
);
const UserProf = lazy(
  () => import("./Components/Account-Administration/UserManagment/UserProf")
);
const NewProvider = lazy(
  () => import("./Components/CustomerSetup/Providers/NewProviders")
);
const ConfigureEligibility = lazy(
  () => import("./Components/CustomerSetup/Providers/ConfigureEligibility")
);
// Login Page
import Login from "./Pages/Login";
import { ProtectedRoute } from "./Pages/ProtectedRoute";
import EditableRefProvider from "./Components/CustomerSetup/ReferringProviders/EditableRefProvider";
import EditablePayers from "./Components/CustomerSetup/Payers/EditablePayers";

import AppealManagementDetail from "./Components/Appeal_Management/appealManagementDetail";
import EditProfessionalClaim from "./Components/Claim/Claim/EditProfessionalClaim";
import AppealManagement from "./Components/Appeal_Management/AppealManagement";
import API from "./Api/ClientApi";
import Swal from "sweetalert2";
// *** *** //
// const Protectedcomponent = ({ children }) => {
//   let isAuth = false;
//   const navigate = useNavigate();
//   useEffect(() => {
//     API.get("appointment/schedular")
//       .then(function (response) {})
//       .catch(function (error) {
//         console.log("Error occured at checkting Schedular component", error);

//         if (error.response.data.data == 403) {
//           isAuth = false;

//           Swal.fire({
//             icon: "error",
//             imageHeight: 30,
//             imageWidth: 30,
//             title: "Sorry...",
//             text: "Please contact your administrator to get Permissions!",
//             confirmButtonColor: "#08619b",
//           });
//           return isAuth ? children : navigate(-1);
//         } else {
//           isAuth = true;
//           return isAuth ? children : "";
//         }

//         // navigate(-1)
//       });
//   }, []);

//   if (isAuth) {
//     return children;
//   }
// };
// *** *** //
export const router = createHashRouter([
  {
    path: "Login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        children: [
          // ====== Home ======
          {
            index: true,
            element: <Welcome />,
            errorElement: <ErrorPage />,
          },
          {
            // Duplicate
            path: "welcome",
            element: <Welcome />,
            errorElement: <ErrorPage />,
          },
          {
            path: "welcome-dashboard",
            element: <WelcomeDashboard />,
            errorElement: <ErrorPage />,
          },
          {
            path: "messages",
            element: <Messages />,
            errorElement: <ErrorPage />,
          },
          {
            path: "tasks",
            element: <Tasks />,
            errorElement: <ErrorPage />,
          },

          // ====== Reports ======
          {
            path: "viewer",
            element: <Viewer />,
            errorElement: <ErrorPage />,
          },
          {
            path: "builder",
            element: <Builder />,
            errorElement: <ErrorPage />,
          },
          // ====== Appointments =======
          // {
          //   path: "schedular",
          //   element: (
          //     <Protectedcomponent>
          //       <Schedular />
          //     </Protectedcomponent>
          //   ),
          //   errorElement: <ErrorPage />,
          // },
          {
            path: "schedular",
            element: <Schedular />,

            errorElement: <ErrorPage />,
          },
          {
            path: "manage-waiting-list",
            element: <ManageWaitingList />,
            errorElement: <ErrorPage />,
          },
          {
            path: "appointment-control",
            element: <AppointmentControl />,
            errorElement: <ErrorPage />,
          },
          {
            path: "superbill-batch-print",
            element: <SuperbillBatchPrint />,
            errorElement: <ErrorPage />,
          },
          {
            path: "configuration",
            element: <Configuration />,
            errorElement: <ErrorPage />,
          },
          // ====== Patient ======
          {
            path: "patient",
            element: <Patient />,
            errorElement: <ErrorPage />,
          },
          {
            path: "new-patient",
            element: <NewPatient />,
            errorElement: <ErrorPage />,
          },
          {
            path: "new-patient/:id",
            element: <NewPatient />,
            errorElement: <ErrorPage />,
          },
          {
            path: "manage-account",
            element: <ManageAccount />,
            errorElement: <ErrorPage />,
          },
          {
            path: "payment-plans",
            element: <PaymentaPlans />,
            errorElement: <ErrorPage />,
          },
          {
            path: "ar-control",
            element: <ARControl />,
            errorElement: <ErrorPage />,
          },
          {
            path: "batch-eligibility",
            element: <BatchEligibilty />,
            errorElement: <ErrorPage />,
          },
          {
            path: "statement-batch-print",
            element: <StatementBatchPrint />,
            errorElement: <ErrorPage />,
          },
          {
            path: "statement-tracker",
            element: <StatementTracker />,
            errorElement: <ErrorPage />,
          },
          {
            path: "label-batch-print",
            element: <LabelBatchPrint />,
            errorElement: <ErrorPage />,
          },
          {
            path: "setting-patient",
            element: <SettingPatient />,
            errorElement: <ErrorPage />,
          },
          // ====== Claim ======
          {
            path: "claim",
            element: <Claim />,
            errorElement: <ErrorPage />,
          },
          {
            path: "professionalClaim",
            element: <AddProfessionalClaim />,
            errorElement: <ErrorPage />,
          },
          {
            path: "edit-professionalClaim/:id",
            element: <EditProfessionalClaim />,
            errorElement: <ErrorPage />,
          },

          {
            path: "institutionalClaim",
            element: <InstitutionalClaim />,
            errorElement: <ErrorPage />,
          },
          {
            path: "claim-tracker",
            element: <ClaimTracker />,
            errorElement: <ErrorPage />,
          },
          {
            path: "status-control",
            element: <StatusControl />,
            errorElement: <ErrorPage />,
          },
          {
            path: "follow-up-managment",
            element: <FollowUpManagment />,
            errorElement: <ErrorPage />,
          },
          {
            path: "claim-batch-print",
            element: <ClaimBatchPrint />,
            errorElement: <ErrorPage />,
          },
          {
            path: "setting-claim",
            element: <SettingClaim />,
            errorElement: <ErrorPage />,
          },
          // ====== Payment ======
          {
            path: "post",
            element: <Post />,
            errorElement: <ErrorPage />,
          },
          {
            path: "apply-credit",
            element: <ApplyCredit />,
            errorElement: <ErrorPage />,
          },
          {
            path: "View",
            element: <View />,
            errorElement: <ErrorPage />,
          },
          {
            path: "Era",
            element: <Era />,
            errorElement: <ErrorPage />,
          },
          {
            path: "payment-tracker",
            element: <PaymentTracker />,
            errorElement: <ErrorPage />,
          },
          {
            path: "setting-payment",
            element: <SettingPayment />,
            errorElement: <ErrorPage />,
          },
          // ====== Document ======
          {
            path: "documents",
            element: <Documents />,
            errorElement: <ErrorPage />,
          },
          // ====== Interface ======
          {
            path: "interface-tracker",
            element: <InterfaceTracker />,
            errorElement: <ErrorPage />,
          },
          {
            path: "setting-interface",
            element: <SettingInterface />,
            errorElement: <ErrorPage />,
          },
          // ====== AppealManagementDetail ======
          {
            path: "appealManagement",
            element: <AppealManagement />,
            errorElement: <ErrorPage />,
          },
          {
            path: "appealdetail/:id",
            element: <AppealManagementDetail />,
            errorElement: <ErrorPage />,
          },
          {
            path: "appealManagement/simple",
            element: <AppealManagementDetail />,
            errorElement: <ErrorPage />,
          },
          // ====== Customer Setup ======
          {
            path: "newpractice/:id",
            element: <NewPractice />,
            errorElement: <ErrorPage />,
          },
          {
            path: "customersetup/practice",
            element: <Practices />,
            errorElement: <ErrorPage />,
          },

          {
            path: "newpractice",
            element: <NewPractice />,
            errorElement: <ErrorPage />,
          },
          {
            path: "customersetup/providers",
            element: <Providers />,
            errorElement: <ErrorPage />,
          },
          {
            path: "newprovider/:id",
            element: <NewProvider />,
            errorElement: <ErrorPage />,
          },
          {
            path: "editable-Refprovider/:id",
            element: <EditableRefProvider />,
            errorElement: <ErrorPage />,
          },
          {
            path: "newprovider",
            element: <NewProvider />,
            errorElement: <ErrorPage />,
          },
          {
            path: "configureEligibility",
            element: <ConfigureEligibility />,
            errorElement: <ErrorPage />,
          },
          {
            path: "customersetup/facilities",
            element: <Facilities />,
            errorElement: <ErrorPage />,
          },
          {
            path: "newfacility",
            element: <NewFacilities />,
            errorElement: <ErrorPage />,
          },
          {
            path: "newfacility/:id",
            element: <NewFacilities />,
            errorElement: <ErrorPage />,
          },
          {
            path: "customersetup/referring-providers",
            element: <ReferringProviders />,
            errorElement: <ErrorPage />,
          },
          {
            path: "newreferring",
            element: <NewReferringProviders />,
            errorElement: <ErrorPage />,
          },
          {
            path: "customersetup/payers",
            element: <Payers />,
            errorElement: <ErrorPage />,
          },
          {
            path: "newpayers",
            element: <NewPayers />,
            errorElement: <ErrorPage />,
          },
          {
            path: "editable-payers/:id",
            element: <EditablePayers />,
            errorElement: <ErrorPage />,
          },
          {
            path: "customersetup/payer-agreement",
            element: <PayerAgreement />,
            errorElement: <ErrorPage />,
          },
          {
            path: "customersetup/collection-agencies",
            element: <CollectionAgencies />,
            errorElement: <ErrorPage />,
          },
          {
            path: "customersetup/alert-control",
            element: <AlertControl />,
            errorElement: <ErrorPage />,
          },
          {
            path: "customersetup/statements",
            element: <Statements />,
            errorElement: <ErrorPage />,
          },
          {
            path: "customersetup/labels",
            element: <Labels />,
            errorElement: <ErrorPage />,
          },
          {
            path: "customersetup/superbills",
            element: <SuperBills />,
            errorElement: <ErrorPage />,
          },
          // ====== Codes ======
          {
            path: "codes",
            element: <Codes />,
            errorElement: <ErrorPage />,
          },

          {
            path: "procedure",
            element: <Procedure />,
            errorElement: <ErrorPage />,
          },
          {
            path: "new-procedureCode",
            element: <NewProcedureCode />,
            errorElement: <ErrorPage />,
          },
          {
            path: "setup/code/procedure/:id",
            element: <EditProcedureCode />,
            errorElement: <ErrorPage />,
          },
          {
            path: "edit-procedureCode/:id",
            element: <EditProcedureCode />,
            errorElement: <ErrorPage />,
          },
          {
            path: "diagnosis",
            element: <Diagnosis />,
            errorElement: <ErrorPage />,
          },
          {
            path: "new-diagnosis",
            element: <NewDiagnosis />,
            errorElement: <ErrorPage />,
          },
          {
            path: "setup/code/diagnosis/:id",
            element: <EditDiagnosisCode />,
            errorElement: <ErrorPage />,
          },

          {
            path: "icdProcedure",
            element: <ICDProcedure />,
            errorElement: <ErrorPage />,
          },
          {
            path: "setup/code/icd/:id",
            element: <EditIcdProcedureCode />,
            errorElement: <ErrorPage />,
          },
          {
            path: "new-icdProcedure",
            element: <NewIcdProcedure />,
            errorElement: <ErrorPage />,
          },
          {
            path: "revenue",
            element: <Revenue />,
            errorElement: <ErrorPage />,
          },
          {
            path: "new-revenueCode",
            element: <NewRevenueCode />,
            errorElement: <ErrorPage />,
          },
          {
            path: "setup/code/revenue/:id",
            element: <EditRevenueCode />,
            errorElement: <ErrorPage />,
          },
          {
            path: "remittance",
            element: <Remmittance />,
            errorElement: <ErrorPage />,
          },
          {
            path: "new-remittance",
            element: <NewRemittance />,
            errorElement: <ErrorPage />,
          },
          {
            path: "setup/code/remittance/:id",
            element: <EditRemittanceCode />,
            errorElement: <ErrorPage />,
          },
          {
            path: "adjustment",
            element: <Adjustment />,
            errorElement: <ErrorPage />,
          },
          {
            path: "new-adjustment",
            element: <NewAdjustmentCode />,
            errorElement: <ErrorPage />,
          },
          {
            path: "setup/code/adjustment/:id",
            element: <EditAdjustmentCode />,
            errorElement: <ErrorPage />,
          },
          {
            path: "setup/code/inventory/:id",
            element: <EditInventoryCode />,
            errorElement: <ErrorPage />,
          },
          {
            path: "inventoryCode",
            element: <InventoryCode />,
            errorElement: <ErrorPage />,
          },
          {
            path: "new-inventoryCode",
            element: <NewInventory />,
            errorElement: <ErrorPage />,
          },
          {
            path: "chargePanel",
            element: <ChargePanel />,
            errorElement: <ErrorPage />,
          },
          {
            path: "feeScheduleCode",
            element: <FeeScheduleCode />,
            errorElement: <ErrorPage />,
          },
          {
            path: "contactsCode",
            element: <ContactsCode />,
            errorElement: <ErrorPage />,
          },
          {
            path: "feeScheduleCode",
            element: <FeeScheduleCode />,
            errorElement: <ErrorPage />,
          },

          {
            path: "customize-claim-statuses",
            element: <CustomizeClaimStatuses />,
            errorElement: <ErrorPage />,
          },
          {
            path: "customize-info-lines",
            element: <CustomizeInfoLines />,
            errorElement: <ErrorPage />,
          },
          {
            path: "customize-account-type",
            element: <CustomizeAccountType />,
            errorElement: <ErrorPage />,
          },
          // ====== Account Administration ======
          {
            path: "account-managment",
            element: <AccountManagment />,
            errorElement: <ErrorPage />,
          },
          {
            path: "customer-managment",
            element: <CustomerManagment />,
            errorElement: <ErrorPage />,
          },
          {
            path: "ManageAccesstoCustomers",
            element: <ManageAccess />,
            errorElement: <ErrorPage />,
          },
          {
            path: "userProfile",
            element: <UserProf />,
            errorElement: <ErrorPage />,
          },
          {
            path: "user-managment",
            element: <UserManagment />,
            errorElement: <ErrorPage />,
          },
          // ====== User-Profile Editable Forms ======
          {
            path: "userProfileEdit/:id",
            element: <UserProfileEdit />,
            errorElement: <ErrorPage />,
          },
          {
            path: "permission-roles",
            element: <PermissionRoles />,
            errorElement: <ErrorPage />,
          },
          {
            path: "specificRole",
            element: <SpecificRoleInfo />,
            errorElement: <ErrorPage />,
          },
          {
            path: "edit-specificRole",
            element: <EditSpecificRole />,
            errorElement: <ErrorPage />,
          },

          {
            path: "new-permission-role",
            element: <NewPermissionRole />,
            errorElement: <ErrorPage />,
          },
          {
            path: "two-factor-authentication",
            element: <TwoFactorAuthentication />,
            errorElement: <ErrorPage />,
          },
          {
            path: "payment-profile",
            element: <PaymentProfiles />,
            errorElement: <ErrorPage />,
          },
          {
            path: "services",
            element: <Services />,
            errorElement: <ErrorPage />,
          },
          {
            path: "new-payment-profile",
            element: <NewPaymentProfile />,
            errorElement: <ErrorPage />,
          },
          {
            path: "invoices",
            element: <Invoices />,
            errorElement: <ErrorPage />,
          },
          {
            path: "locks",
            element: <Locks />,
            errorElement: <ErrorPage />,
          },
          {
            path: "sessions",
            element: <Sessions />,
            errorElement: <ErrorPage />,
          },
          {
            path: "*",
            element: <ErrorPage />,
          },
        ],
      },
    ],
  },
]);
