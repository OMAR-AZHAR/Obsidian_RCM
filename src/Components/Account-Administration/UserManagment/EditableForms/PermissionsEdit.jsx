import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccessHourseEdit from "./AccessHourseEdit";
import CustomerAccessEdit from "./CustomerAccessEdit";
import DepartmentHoursEdit from "./DepartmentHoursEdit";
import AccountAdminCat from "../Categories/AccountAdminCat";
import AppointmentCat from "../Categories/AppointmentCat";
// import actions
import { CustomerEditChange, SelectRoleEdit, SelectRolePermEdit, SelectPermissionCategoryEdit, AccountSetupEdit } from "../../../../Redux/features/UserManagement/UserProfile/PermissionEditSlice";
import AccountAdminCatEdit from "./Categories/AccountAdminCatEdit";
import AppointmentCatEdit from "./Categories/AppointmentCatEdit";
import ClaimCatEdit from "./Categories/ClaimCatEdit";
import CustomerCatEdit from "./Categories/CustomerCatEdit";
import DocumentsCatEdit from "./Categories/DocumentsCatEdit";
import HomeCatEdit from "./Categories/HomeCatEdit";
import InterfaceCatEdit from "./Categories/InterfaceCatEdit";
import OtherCatEdit from "./Categories/OtherCatEdit";
import PaymentCatEdit from "./Categories/PaymentCatEdit";
import ReportsCatEdit from "./Categories/ReportsCatEdit";
import PatientCatEdit from "./Categories/PatientCatEdit";

const categoryEdit = [
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

const PermissionsEdit = (props) => {

    // hooks
    // const [PermissionsRoleedit,setPermissionsRoleedit]=useState();
    const dispatch = useDispatch();
    const [showhideEdit, setShowhideEdit] = useState("Account Administration");
    // const userType = useSelector(state => state.userTypeChange);
    const userType = useSelector((state) => state.EditUser.userTypeChange)
    console.log("user type change or not:",userType);
    const [checked, setChecked] = useState(false);
    // methods
    function getaccountEdit(id) {
        props.accountAdministrationAccountSetupedit(id)
    }

    function billpaymentEdit(id) {
        props.accountAdministrationBillPaymentedit(id)
    }

    function getmonthlyInvoiceEdit(id) {
        props.accountAdministrationMonthlyInvoiceedit(id)
    }
    function getappointmentScheduleEdit(id) {
        props.appointmentScheduleedit(id)
    }
    function getappointmentScheduleConfigurationEdit(id) {
        props.appointmentScheduleConfigurationeditedit(id)
    }
    function getappointmentControlEdit(id) {
        props.appointmentControledit(id)
    }
    function getappointmentBatchPrintingEdit(id) {
        props.appointmentBatchPrintingedit(id)
    }
    function getappointmentDepartmentEdit(id) {
        props.appointmentDepartmentedit(id)
    }
    function getappointmentPatientActivityEdit(id) {
        props.appointmentPatientActivityedit(id)
    }
    function getappointmentPatientPaymentEdit(id) {
        props.appointmentPatientPaymentedit(id)
    }
    function getclaimProfessionalClaimEdit(id) {
        props.claimProfessionalClaimedit(id)
    }
    function getclaimInstitutionalClaimEdit(id) {
        props.claimInstitutionalClaimedit(id)
    }
    function getclaimBacthPrintingEdit(id) {
        props.claimBacthPrintingedit(id)
    }
    function getclaimFollowUpEdit(id) {
        props.claimFollowUpedit(id)
    }
    function getclaimClearingHouseReportsEdit(id) {
        props.claimClearingHouseReportsedit(id)
    }
    function getclaimControlEdit(id) {
        props.claimControledit(id)
    }
    function getclaimNyWorkersCompFormEdit(id) {
        props.claimNyWorkersCompFormedit(id)
    }
    function getclaimPatientActivityEdit(id) {
        props.claimPatientActivityedit(id)
    }
    function getclaimPatientPaymentEdit(id) {
        props.claimPatientPaymentedit(id)
    }
    function getclaimTrackingEdit(id) {
        props.claimTrackingedit(id)
    }
    function getcustomerSetupPracticeEdit(id) {
        props.customerSetupPracticeedit(id)
    }
    function getcustomerSetupProviderEdit(id) {
        props.customerSetupProvideredit(id)
    }
    function getcustomerSetupFacilityEdit(id) {
        props.customerSetupFacilityedit(id)
    }
    function getcustomerSetupReferringEdit(id) {
        props.customerSetupReferringedit(id)
    }
    function getcustomerSetupPayerEdit(id) {
        props.customerSetupPayeredit(id)
    }
    function getcustomerSetupPayerAgreementEdit(id) {
        props.customerSetupPayerAgreementedit(id)
    }
    function getcustomerSetupCodesEdit(id) {
        props.customerSetupCodesedit(id)
    }
    function getcustomerSetupInventoryEdit(id) {
        props.customerSetupInventoryedit(id)
    }
    function getCusomerSetupFeeScheduleEdit(id) {
        props.cusomerSetupFeeScheduleedit(id)
    }
    function getcustomerSetupContractMgmntEdit(id) {
        props.customerSetupContractMgmntedit(id)
    }
    function getcustomerSetupAlertControlEdit(id) {
        props.customerSetupAlertControledit(id)
    }
    function getcustomerSetupStatementAutomationEdit(id) {
        props.customerSetupStatementAutomationedit(id)
    }
    function getcustomerSetupLblSpblConfigEdit(id) {
        props.customerSetupLblSpblConfigedit(id)
    }
    function getcustomerSetupPersnlIdInfoSSNEdit(id) {
        props.customerSetupPersnlIdInfoSSNedit(id)
    }
    function getcustomerSetupAccSetupEdit(id) {
        props.customerSetupAccSetupedit(id)
    }
    function getcustomerSetupBillPaymntEdit(id) {
        props.customerSetupBillPaymntedit(id)
    }
    function getcustomerSetupCustomiztionEdit(id) {
        props.customerSetupCustomiztionedit(id)
    }
    function getdocumentDocMangmntEdit(id) {
        props.documentDocMangmntedit(id)
    }
    function gethomeDashboardEdit(id) {
        props.homeDashboardedit(id)
    }
    function gethomeMessgingEdit(id) {
        props.homeMessgingedit(id)
    }
    function gethomeContactEdit(id) {
        props.homeContactedit(id)
    }
    function gethomeAdminstrTaskEdit(id) {
        props.homeAdminstrTaskedit(id)
    }
    function getinterfaceInterfceTrackingEdit(id) {
        props.interfaceInterfceTrackingedit(id)
    }
    function getotherPaymentPortalEdit(id) {
        props.otherPaymentPortaledit(id)
    }
    function getpatientPatientEdit(id) {
        props.patientPatientedit(id)
    }
    function getpatientAddVerifEdit(id) {
        props.patientAddVerifedit(id)
    }
    function getpatientBatchEligibEdit(id) {
        props.patientBatchEligibedit(id)
    }
    function getpatientBatchPrintingEdit(id) {
        props.patientBatchPrintingedit(id)
    }
    function getpatientContrlEdit(id) {
        props.patientContrledit(id)
    }
    function getpatientDebitCreditEdit(id) {
        props.patientDebitCreditedit(id)
    }
    function getpatienteditNotsEdit(id) {
        props.patienteditNotsedit(id)
    }
    function getpatientEligbEdit(id) {
        props.patientEligbedit(id)
    }
    function getpatientEnhancedStatementEdit(id) {
        props.patientEnhancedStatementedit(id)
    }
    function getpatientAccMgmntEdit(id) {
        props.patientAccMgmntedit(id)
    }
    function getpatientActivityEdit(id) {
        props.patientActivityedit(id)
    }
    function getpatientMergEdit(id) {
        props.patientMergedit(id)
    }
    function getpatientNotsEdit(id) {
        props.patientNotsedit(id)
    }
    function getpatientPaymntEdit(id) {
        props.patientPaymntedit(id)
    }
    function getpatientpaymPortalEdit(id) {
        props.patientpaymPortaledit(id)
    }
    function getpatientIdInfoSSnEdit(id) {
        props.patientIdInfoSSnedit(id)
    }
    function getpatientTrackngEdit(id) {
        props.patientTrackngedit(id)
    }
    function getpaymentPatientPymntEdit(id) {
        props.paymentPatientPymntedit(id)
    }
    function getpaymentInsuranceEdit(id) {
        props.paymentInsuranceedit(id)
    }
    function getpaymentEraAutoApplyEdit(id) {
        props.paymentEraAutoApplyedit(id)
    }
    function getpaymentPatientActvtyEdit(id) {
        props.paymentPatientActvtyedit(id)
    }
    function getpaymentTrackngEdit(id) {
        props.paymentTrackngedit(id)
    }
    function getreportsReportsEdit(id) {
        props.reportsReportsedit(id)
    }
    function getreportsArMgmntReportsEdit(id) {
        props.reportsArMgmntReportsedit(id)
    }
    function getreportMngmntReportsEdit(id) {
        props.reportMngmntReportsedit(id)
    }
    function getreportReportsBuilderEdit(id) {
        props.reportReportsBuilderedit(id)
    }
    const toggle = (value) => {
        return !value;
    };
    const PermissionsRoleedit = useSelector((state) => state.EditUser.roles)
    const userprofilecustomersedit = useSelector((state) => state.EditUser.customers);

    const [customerValue, setCustomerValue] = useState(JSON.stringify(userprofilecustomersedit[0].id));
    useEffect(()=>{
        dispatch(CustomerEditChange(customerValue));
    },[customerValue]);
    // category dropdown
    const handleCategoryEdit = (e) => {
        const getCategoryEdit = e.target.value;
        setShowhideEdit(getCategoryEdit);
        dispatch(SelectPermissionCategoryEdit(e.target.value));
    };
    // check for select role and permissions(allow/deny)
    
    const [roleStatusedit, setRoleStatusEdit] = useState(false);
    const [permissionStatusedit, setPermissionStatusEdit] = useState(true);
    
    const togglebtnEdit = () => {
       
        setRoleStatusEdit(!roleStatusedit);
        setPermissionStatusEdit(!permissionStatusedit);
       
    };
    useEffect(() => {
        if(userType==true && roleStatusedit==true){
         setRoleStatusEdit(true)
        }
        else if(userType==true && permissionStatusedit==true){
            setPermissionStatusEdit(!permissionStatusedit)
        }
    },[userType])
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
                                name="UserManagementUserProfileEditPermissionsCustomers"
                                id="UserManagementUserProfileEditPermissionsCustomers"
                                // onChange={(e) => {
                                //     dispatch(CustomerEditChange(e.target.value));
                                // }}
                                onChange={(e)=>setCustomerValue(e.target.value)}
                            >
                                {userprofilecustomersedit?.map((upc, i) => {
                                    return (
                                        <option value={upc.id} key={i} {...upc}>
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
                                            value="RoleEdit"
                                            onChange={togglebtnEdit}
                                            defaultChecked={roleStatusedit}
                                            onClick={(e) => dispatch(SelectRolePermEdit(e.target.value))}
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
                                            value="PermissionsEdit"
                                            onChange={togglebtnEdit}
                                            onClick={(e) => dispatch(SelectRolePermEdit(e.target.value))}
                                             defaultChecked={permissionStatusedit}
                                        />
                                        <label className="form-check-label" htmlFor="radio2">
                                            {" "}
                                            Set custom permissions
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-3 mt-1 flex-fill">
                                    <select
                                        disabled={!roleStatusedit}
                                        className="form-select form-select-sm"
                                        name="UserManagementUserProfilePermissionsRole"
                                        id="UserManagementUserProfilePermissionsRole"
                                        onChange={(e) => {
                                            dispatch(SelectRoleEdit(e.target.value));
                                        }}
                                    >
                                        {" "}
                                        <option value={"Select a role"} disabled={true} selected>
                                            Select a role
                                        </option>
                                        {PermissionsRoleedit?.map((pr, i) => {
                                            return (
                                                <option key={i} value={pr.value} {...pr}>
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
                                {/* <button className="btn btn-outline-success" type="submit">Search</button> */}

                                <label>Select Category to View Permissions</label>
                                <div className="col-md-5">
                                    <select
                                        onChange={(e) => {
                                            handleCategoryEdit(e);
                                        }}
                                        className="form-select form-select-sm"
                                        name="category"
                                        id="category"
                                        defaultValue={"Account Administration"}
                                    >
                                        {categoryEdit.map((items) => {
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
                                {/* Show Specific Categories on Select */}
                                {showhideEdit === "Account Administration" && (
                                    <AccountAdminCatEdit
                                        fetchdataEdit={getaccountEdit}
                                        billpaymentEdit={billpaymentEdit}
                                        monthlyInvoiceEdit={getmonthlyInvoiceEdit}
                                        permissionStatus={!permissionStatusedit}
                                        showDescription={checked}
                                        permissionType="1"
                                    />
                                )}

                                {showhideEdit === "Appointments" && (
                                    <AppointmentCatEdit
                                        appointmentScheduleEdit={getappointmentScheduleEdit}
                                        appointmentScheduleConfigurationEdit={getappointmentScheduleConfigurationEdit}
                                        appointmentControlEdit={getappointmentControlEdit}
                                        appointmentBatchPrintingEdit={getappointmentBatchPrintingEdit}
                                        appointmentDepartmentEdit={getappointmentDepartmentEdit}
                                        appointmentPatientActivityEdit={getappointmentPatientActivityEdit}
                                        appointmentPatientPaymentEdit={getappointmentPatientPaymentEdit}
                                        permissionStatus={!permissionStatusedit}
                                        showDescription={checked}
                                        permissionType="1"
                                    />
                                )}
                                {showhideEdit === "Claim" && (
                                    <ClaimCatEdit
                                        claimProfessionalClaimEdit={getclaimProfessionalClaimEdit}
                                        claimInstitutionalClaimEdit={getclaimInstitutionalClaimEdit}
                                        claimBacthPrintingEdit={getclaimBacthPrintingEdit}
                                        claimFollowUpEdit={getclaimFollowUpEdit}
                                        claimClearingHouseReportsEdit={getclaimClearingHouseReportsEdit}
                                        claimControlEdit={getclaimControlEdit}
                                        claimNyWorkersCompFormEdit={getclaimNyWorkersCompFormEdit}
                                        claimPatientActivityEdit={getclaimPatientActivityEdit}
                                        claimPatientPaymentEdit={getclaimPatientPaymentEdit}
                                        claimTrackingEdit={getclaimTrackingEdit}
                                        permissionStatus={!permissionStatusedit}
                                        showDescription={checked}
                                        permissionType="1"
                                    />
                                )}

                                {showhideEdit === "Customer Setup" && (
                                    <CustomerCatEdit
                                        customerSetupPracticeEdit={getcustomerSetupPracticeEdit}
                                        customerSetupProviderEdit={getcustomerSetupProviderEdit}
                                        customerSetupFacilityEdit={getcustomerSetupFacilityEdit}
                                        customerSetupReferringEdit={getcustomerSetupReferringEdit}
                                        customerSetupPayerEdit={getcustomerSetupPayerEdit}
                                        customerSetupPayerAgreementEdit={getcustomerSetupPayerAgreementEdit}
                                        customerSetupCodesEdit={getcustomerSetupCodesEdit}
                                        customerSetupInventoryEdit={getcustomerSetupInventoryEdit}
                                        customerSetupFeeScheduleEdit={getCusomerSetupFeeScheduleEdit}
                                        customerSetupContractMgmntEdit={getcustomerSetupContractMgmntEdit}
                                        customerSetupAlertControlEdit={getcustomerSetupAlertControlEdit}
                                        customerSetupStatementAutomationEdit={getcustomerSetupStatementAutomationEdit}
                                        customerSetupLblSpblConfigEdit={getcustomerSetupLblSpblConfigEdit}
                                        customerSetupPersnlIdInfoSSNEdit={getcustomerSetupPersnlIdInfoSSNEdit}
                                        customerSetupAccSetupEdit={getcustomerSetupAccSetupEdit}
                                        customerSetupBillPaymntEdit={getcustomerSetupBillPaymntEdit}
                                        customerSetupCustomiztionEdit={getcustomerSetupCustomiztionEdit}
                                        permissionStatus={!setPermissionStatusEdit}
                                        showDescription={checked}
                                        permissionType="1"
                                    />
                                )}




                                {showhideEdit === "Documents" && (
                                    <DocumentsCatEdit
                                        documentDocMangmntEdit={getdocumentDocMangmntEdit}
                                        permissionStatus={!setPermissionStatusEdit}
                                        showDescription={checked}
                                        permissionType="1"
                                    />
                                )}
                                {showhideEdit === "Home" && (
                                    <HomeCatEdit
                                        homeDashboardEdit={gethomeDashboardEdit}
                                        homeMessgingEdit={gethomeMessgingEdit}
                                        homeContactEdit={gethomeContactEdit}
                                        homeAdminstrTaskEdit={gethomeAdminstrTaskEdit}
                                        permissionStatus={!permissionStatusedit}
                                        showDescription={checked}
                                        permissionType="1"
                                    />
                                )}
                                {showhideEdit === "Interface" && (
                                    <InterfaceCatEdit
                                        interfaceInterfceTrackingEdit={getinterfaceInterfceTrackingEdit}
                                        permissionStatus={!permissionStatusedit}
                                        showDescription={checked}
                                        permissionType="1"
                                    />
                                )}
                                {showhideEdit === "Other" && (
                                    <OtherCatEdit
                                        otherPaymentPortalEdit={getotherPaymentPortalEdit}
                                        permissionStatus={!permissionStatusedit}
                                        showDescription={checked}
                                        permissionType="1"
                                    />
                                )}

                                {showhideEdit === "Patient" && (
                                    <PatientCatEdit
                                        patientPatientEdit={getpatientPatientEdit}
                                        patientAddVerifiesEdit={getpatientAddVerifEdit}
                                        patientBatchEligibEdit={getpatientBatchEligibEdit}
                                        patientBatchPrintingEdit={getpatientBatchPrintingEdit}
                                        patientContrlEdit={getpatientContrlEdit}
                                        patientDebitCreditEdit={getpatientDebitCreditEdit}
                                        patienteditNotsEdit={getpatienteditNotsEdit}
                                        patientEligbEdit={getpatientEligbEdit}
                                        patientEnhancedStatementEdit={getpatientEnhancedStatementEdit}
                                        patientAccMgmntEdit={getpatientAccMgmntEdit}
                                        patientActivityEdit={getpatientActivityEdit}
                                        patientMergEdit={getpatientMergEdit}
                                        patientNotsEdit={getpatientNotsEdit}
                                        patientPaymntEdit={getpatientPaymntEdit}
                                        patientpaymPortalEdit={getpatientpaymPortalEdit}
                                        patientIdInfoSSnEdit={getpatientIdInfoSSnEdit}
                                        patientTrackngEdit={getpatientTrackngEdit}
                                        permissionStatus={!permissionStatusedit}
                                        showDescription={checked}
                                        permissionType="1"
                                    />
                                )}

                                {showhideEdit === "Payment" && (
                                    <PaymentCatEdit
                                        paymentPatientPymntEdit={getpaymentPatientPymntEdit}
                                        paymentInsuranceEdit={getpaymentInsuranceEdit}
                                        paymentEraAutoApplyEdit={getpaymentEraAutoApplyEdit}
                                        paymentPatientActvtyEdit={getpaymentPatientActvtyEdit}
                                        paymentTrackngEdit={getpaymentTrackngEdit}
                                        permissionStatus={!permissionStatusedit}
                                        showDescription={checked}
                                        permissionType="1"
                                    />
                                )}


                                {showhideEdit === "Reports" && (
                                    <ReportsCatEdit
                                        reportsReportsEdit={getreportsReportsEdit}
                                        reportsArMgmntReportsEdit={getreportsArMgmntReportsEdit}
                                        reportMngmntReportsEdit={getreportMngmntReportsEdit}
                                        reportReportsBuilderEdit={getreportReportsBuilderEdit}
                                        permissionStatus={!permissionStatusedit}
                                        showDescription={checked}
                                        permissionType="1"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CustomerAccessEdit />
            <AccessHourseEdit />
            <DepartmentHoursEdit />

        </div>
    )
}

export default PermissionsEdit