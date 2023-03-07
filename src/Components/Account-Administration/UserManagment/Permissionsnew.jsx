import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../../Hooks/useFetch";

import { fetCustomerNames } from "../../../Redux/features/UserManagement/UserProfile/CustomerNamesSlice";
import {
  CustomerChange,
  SelectPermissionCategory,
  SelectRole,
  SelectPermStatus,
  SelectRoleStatus,
} from "../../../Redux/features/UserManagement/UserProfile/PermissionSlice";
import AccessHours from "./AccessHours";
import AccountAdminCat from "./Categories/AccountAdminCat";
import AppointmentCat from "./Categories/AppointmentCat";
import ClaimCat from "./Categories/ClaimCat";
import CustomerCat from "./Categories/CustomerCat";
import DocumentsCat from "./Categories/DocumentsCat";
import HomeCat from "./Categories/HomeCat";
import InterfaceCat from "./Categories/InterfaceCat";
import OtherCat from "./Categories/OtherCat";
import PatientCat from "./Categories/PatientCat";
import PaymentCat from "./Categories/PaymentCat";
import ReportsCat from "./Categories/ReportsCat";
import CustomerAccess from "./CustomerAccess";
import DepartHours from "./DepartHours";

export default function Permissionsnew(props) {
  const [checked, setChecked] = useState(false);

  const toggle = (value) => {
    return !value;
  };
  const [showhide, setShowhide] = useState("Account Administration");
  const handleCategory = (e) => {
    const getCategory = e.target.value;
    setShowhide(getCategory);
    dispatch(SelectPermissionCategory(e.target.value));
  };

  const { data: customers, loading } = useFetch(
    "accountadmin/customermanagement"
  );
  console.log("all customers", customers);
  const [customerValue, setCustomerValue] = useState(
    sessionStorage.getItem("customer_id")
  );
  const [selectedCustomer, setSelectedCustomer] = useState(
    sessionStorage.getItem("customername")?.toString()
  );

  useEffect(() => {
    dispatch(CustomerChange(customerValue));
  }, [customerValue]);

  // get customer names
  useEffect(() => {
    dispatch(fetCustomerNames());
  }, []);
  const permissioncustomer = useSelector(
    (state) => state.PermissionCustomers.customers
  );
  const assignpermissionrole = useSelector(
    (state) => state.PermissionCustomers.status
  );
  const customrole = useSelector(
    (state) => state.PermissionCustomers.custompermission
  );
  // const selectrole = useSelector((state) => state.PermissionCustomers.selectrole);
  const permcategory = useSelector(
    (state) => state.PermissionCustomers.selectpermcategory
  );

  // methods
  function getaccount(id) {
    props.accountadministrationaccountsetup(id);
  }

  function billpayment(id) {
    props.accountadministrationbillpayment(id);
  }

  function getmonthlyInvoice(id) {
    props.accountadministrationmonthlyInvoice(id);
  }
  function getappointmentSchedule(id) {
    props.appointmentSchedule(id);
  }
  function getappointmentScheduleConfiguration(id) {
    props.appointmentScheduleConfiguration(id);
  }
  function getappointmentControl(id) {
    props.appointmentControl(id);
  }
  function getappointmentBatchPrinting(id) {
    props.appointmentBatchPrinting(id);
  }
  function getappointmentDepartment(id) {
    props.appointmentDepartment(id);
  }
  function getappointmentPatientActivity(id) {
    props.appointmentPatientActivity(id);
  }
  function getappointmentPatientPayment(id) {
    props.appointmentPatientPayment(id);
  }
  function getclaimProfessionalClaim(id) {
    props.claimProfessionalClaim(id);
  }
  function getclaimInstitutionalClaim(id) {
    props.claimInstitutionalClaim(id);
  }
  function getclaimBacthPrinting(id) {
    props.claimBacthPrinting(id);
  }
  function getclaimFollowUp(id) {
    props.claimFollowUp(id);
  }
  function getclaimClearingHouseReports(id) {
    props.claimClearingHouseReports(id);
  }
  function getclaimControl(id) {
    props.claimControl(id);
  }
  function getclaimNyWorkersCompForm(id) {
    props.claimNyWorkersCompForm(id);
  }
  function getclaimPatientActivity(id) {
    props.claimPatientActivity(id);
  }
  function getclaimPatientPayment(id) {
    props.claimPatientPayment(id);
  }
  function getclaimTracking(id) {
    props.claimTracking(id);
  }
  function getcustomerSetupPractice(id) {
    props.customerSetupPractice(id);
  }
  function getcustomerSetupProvider(id) {
    props.customerSetupProvider(id);
  }
  function getcustomerSetupFacility(id) {
    props.customerSetupFacility(id);
  }
  function getcustomerSetupReferring(id) {
    props.customerSetupReferring(id);
  }
  function getcustomerSetupPayer(id) {
    props.customerSetupPayer(id);
  }
  function getcustomerSetupPayerAgreement(id) {
    props.customerSetupPayerAgreement(id);
  }
  function getcustomerSetupCodes(id) {
    props.customerSetupCodes(id);
  }
  function getcustomerSetupInventory(id) {
    props.customerSetupInventory(id);
  }
  function getCusomerSetupFeeSchedule(id) {
    props.cusomerSetupFeeSchedule(id);
  }
  function getcustomerSetupContractMgmnt(id) {
    props.customerSetupContractMgmnt(id);
  }
  function getcustomerSetupAlertControl(id) {
    props.customerSetupAlertControl(id);
  }
  function getcustomerSetupStatementAutomation(id) {
    props.customerSetupStatementAutomation(id);
  }
  function getcustomerSetupLblSpblConfig(id) {
    props.customerSetupLblSpblConfig(id);
  }
  function getcustomerSetupPersnlIdInfoSSN(id) {
    props.customerSetupPersnlIdInfoSSN(id);
  }
  function getcustomerSetupAccSetup(id) {
    props.customerSetupAccSetup(id);
  }
  function getcustomerSetupBillPaymnt(id) {
    props.customerSetupBillPaymnt(id);
  }
  function getcustomerSetupCustomiztion(id) {
    props.customerSetupCustomiztion(id);
  }
  function getdocumentDocMangmnt(id) {
    props.documentDocMangmnt(id);
  }
  function gethomeDashboard(id) {
    props.homeDashboard(id);
  }
  function gethomeMessging(id) {
    props.homeMessging(id);
  }
  function gethomeContact(id) {
    props.homeContact(id);
  }
  function gethomeAdminstrTask(id) {
    props.homeAdminstrTask(id);
  }
  function getinterfaceInterfceTracking(id) {
    props.interfaceInterfceTracking(id);
  }
  function getotherPaymentPortal(id) {
    props.otherPaymentPortal(id);
  }
  function getpatientPatient(id) {
    props.patientPatient(id);
  }
  function getpatientAddVerif(id) {
    props.patientAddVerif(id);
  }
  function getpatientBatchEligib(id) {
    props.patientBatchEligib(id);
  }
  function getpatientBatchPrinting(id) {
    props.patientBatchPrinting(id);
  }
  function getpatientContrl(id) {
    props.patientContrl(id);
  }
  function getpatientDebitCredit(id) {
    props.patientDebitCredit(id);
  }
  function getpatienteditNots(id) {
    props.patienteditNots(id);
  }
  function getpatientEligb(id) {
    props.patientEligb(id);
  }
  function getpatientEnhancedStatement(id) {
    props.patientEnhancedStatement(id);
  }
  function getpatientAccMgmnt(id) {
    props.patientAccMgmnt(id);
  }
  function getpatientActivity(id) {
    props.patientActivity(id);
  }
  function getpatientMerg(id) {
    props.patientMerg(id);
  }
  function getpatientNots(id) {
    props.patientNots(id);
  }
  function getpatientPaymnt(id) {
    props.patientPaymnt(id);
  }
  function getpatientpaymPortal(id) {
    props.patientpaymPortal(id);
  }
  function getpatientIdInfoSSn(id) {
    props.patientIdInfoSSn(id);
  }
  function getpatientTrackng(id) {
    props.patientTrackng(id);
  }
  function getpaymentPatientPymnt(id) {
    props.paymentPatientPymnt(id);
  }
  function getpaymentInsurance(id) {
    props.paymentInsurance(id);
  }
  function getpaymentEraAutoApply(id) {
    props.paymentEraAutoApply(id);
  }
  function getpaymentPatientActvty(id) {
    props.paymentPatientActvty(id);
  }
  function getpaymentTrackng(id) {
    props.paymentTrackng(id);
  }
  function getreportsReports(id) {
    props.reportsReports(id);
  }
  function getreportsArMgmntReports(id) {
    props.reportsArMgmntReports(id);
  }
  function getreportMngmntReports(id) {
    props.reportMngmntReports(id);
  }
  function getreportReportsBuilder(id) {
    props.reportReportsBuilder(id);
  }

  const dispatch = useDispatch();

  //useeffect
  const [users, setUsers] = useState("Deny");
  // Array of User Profile Permissions Category Select Options
  const category = [
    {
      id: 1,
      cat: "Account Administration",
      val: "Account Administration",
    },
    {
      id: 2,
      cat: "Appointments",
      val: "Appointments",
    },
    {
      id: 3,
      cat: "Claim",
      val: "Claim",
    },
    {
      id: 4,
      cat: "Customer Setup",
      val: "Customer Setup",
    },
    {
      id: 5,
      cat: "Documents",
      val: "Documents",
    },
    {
      id: 6,
      cat: "Home",
      val: "Home",
    },
    {
      id: 7,
      cat: "Interface",
      val: "Interface",
    },
    {
      id: 8,
      cat: "Other",
      val: "Other",
    },
    {
      id: 9,
      cat: "Patient",
      val: "Patient",
    },
    {
      id: 10,
      cat: "Payment",
      val: "Payment",
    },
    {
      id: 11,
      cat: "Reports",
      val: "Reports",
    },
  ];

  // Array of User Profile Permission Customers Select Options
  // const [userprofilecustomers, setuserprofilecustomers] = useState([]);
  // useEffect(() => {
  //   const cancelToken = axios.CancelToken.source();
  //   API
  //     .get("customer-management", {
  //       cancelToken: cancelToken.token,
  //     })
  //     .then((data) => setuserprofilecustomers(data.data))
  //     .catch((error) => {
  //       if (axios.isCancel(error)) {
  //       } else {
  //         //todo
  //       }
  //     });

  // Array of User Profile Permissions Roles Select Options
  const PermissionsRole = [
    {
      role: "Auth Rep",
      value: "auth-rep",
    },
    {
      role: "Admin",
      value: "admin",
    },
    {
      role: "User",
      value: "user",
    },
  ];
  const [roleStatus, setRoleStatus] = useState(true);
  const [permissionStatus, setPermissionStatus] = useState(false);

  const togglebtn = () => {
    setRoleStatus(!roleStatus);
    setPermissionStatus(!permissionStatus);
  };

  return (
    <div className="accordion" id="accordionExample">
      {/* permission tab */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="false"
            aria-controls="collapseOne"
          >
            Permissions
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <div className="col-md-12">
              <select
                className="form-select form-select-sm"
                name="UserManagementUserProfilePermissionsCustomers"
                value={selectedCustomer}
                onChange={(e) => setCustomerValue(e.target.value)}
              >
                {customers?.map((upc, i) => {
                  return (
                    <option value={upc.customer_id} key={i}>
                      {upc.customer_name}
                    </option>
                  );
                })}
              </select>
              {/* </form> */}

              <div className="row">
                <div className="col-md-8 mt-2">
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="radio1"
                      name="optradio1"
                      value="Role"
                      onChange={togglebtn}
                      disabled
                      defaultChecked={roleStatus}
                      onClick={(e) =>
                        dispatch(SelectRoleStatus(e.target.value))
                      }
                    />

                    <label className="form-check-label" htmlFor="radio1">
                      Assign to an existing permission role
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="radio2"
                      name="optradio1"
                      value="Permissions"
                      onChange={togglebtn}
                      onClick={(e) =>
                        dispatch(SelectPermStatus(e.target.value))
                      }
                      defaultChecked={permissionStatus}
                      chacked="true"
                    />
                    <label className="form-check-label" htmlFor="radio2">
                      {" "}
                      Set custom permissions
                    </label>
                  </div>
                </div>
                <div className="col-md-3 mt-1 flex-fill">
                  <select
                    disabled={!roleStatus}
                    className="form-select form-select-sm"
                    name="UserManagementUserProfilePermissionsRole"
                    id="UserManagementUserProfilePermissionsRole"
                    onChange={(e) => {
                      dispatch(SelectRole(e.target.value));
                    }}
                  >
                    {" "}
                    <option value={"Select a role"} disabled={true} selected>
                      Select a role
                    </option>
                    {customers?.role?.map((pr, i) => {
                      return (
                        <option key={i} value={pr.id}>
                          {pr.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-md-12">
                  <input
                    className="form-control form-control-sm me-2 mb-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </div>

                <label>Select Category to View Permissions</label>
                <div className="col-md-5">
                  <select
                    onChange={(e) => {
                      handleCategory(e);
                    }}
                    className="form-select form-select-sm"
                    name="category"
                    id="category"
                    defaultValue={"Account Administration"}
                  >
                    {category.map((items) => {
                      return (
                        <option
                          className="dropdown-item"
                          value={items.val}
                          key={items.id}
                          {...items}
                        >
                          {items.cat}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-md-7 mt-2">
                  {" "}
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="permdesc"
                      name="permdesc"
                      onChange={() => setChecked(toggle)}
                    />

                    <label htmlFor="permdesc">
                      Show Permission Descriptions
                    </label>
                  </div>
                </div>

                {showhide === "Account Administration" && (
                  <AccountAdminCat
                    fetchdata={getaccount}
                    billpayment={billpayment}
                    monthlyInvoice={getmonthlyInvoice}
                    permissionStatus={!permissionStatus}
                    showDescription={checked}
                    permissionType="1"
                  />
                )}

                {showhide === "Appointments" && (
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
                    permissionStatus={!permissionStatus}
                    showDescription={checked}
                    permissionType="1"
                  />
                )}
                {showhide === "Claim" && (
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
                    permissionStatus={!permissionStatus}
                    showDescription={checked}
                    permissionType="1"
                  />
                )}

                {showhide === "Customer Setup" && (
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
                    customerSetupPersnlIdInfoSSN={
                      getcustomerSetupPersnlIdInfoSSN
                    }
                    customerSetupAccSetup={getcustomerSetupAccSetup}
                    customerSetupBillPaymnt={getcustomerSetupBillPaymnt}
                    customerSetupCustomiztion={getcustomerSetupCustomiztion}
                    permissionStatus={!permissionStatus}
                    showDescription={checked}
                    permissionType="1"
                  />
                )}

                {showhide === "Documents" && (
                  <DocumentsCat
                    documentDocMangmnt={getdocumentDocMangmnt}
                    permissionStatus={!permissionStatus}
                    showDescription={checked}
                    permissionType="1"
                  />
                )}
                {showhide === "Home" && (
                  <HomeCat
                    homeDashboard={gethomeDashboard}
                    homeMessging={gethomeMessging}
                    homeContact={gethomeContact}
                    homeAdminstrTask={gethomeAdminstrTask}
                    permissionStatus={!permissionStatus}
                    showDescription={checked}
                    permissionType="1"
                  />
                )}
                {showhide === "Interface" && (
                  <InterfaceCat
                    interfaceInterfceTracking={getinterfaceInterfceTracking}
                    permissionStatus={!permissionStatus}
                    showDescription={checked}
                    permissionType="1"
                  />
                )}
                {showhide === "Other" && (
                  <OtherCat
                    otherPaymentPortal={getotherPaymentPortal}
                    permissionStatus={!permissionStatus}
                    showDescription={checked}
                    permissionType="1"
                  />
                )}

                {showhide === "Patient" && (
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
                    permissionStatus={!permissionStatus}
                    showDescription={checked}
                    permissionType="1"
                  />
                )}

                {showhide === "Payment" && (
                  <PaymentCat
                    paymentPatientPymnt={getpaymentPatientPymnt}
                    paymentInsurance={getpaymentInsurance}
                    paymentEraAutoApply={getpaymentEraAutoApply}
                    paymentPatientActvty={getpaymentPatientActvty}
                    paymentTrackng={getpaymentTrackng}
                    permissionStatus={!permissionStatus}
                    showDescription={checked}
                    permissionType="1"
                  />
                )}

                {showhide === "Reports" && (
                  <ReportsCat
                    reportsReports={getreportsReports}
                    reportsArMgmntReports={getreportsArMgmntReports}
                    reportMngmntReports={getreportMngmntReports}
                    reportReportsBuilder={getreportReportsBuilder}
                    permissionStatus={!permissionStatus}
                    showDescription={checked}
                    permissionType="1"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomerAccess />
      <AccessHours />
      <DepartHours />
    </div>
  );
}
