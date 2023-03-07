import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CustomerCatEdit = (props) => {
  const dispatch = useDispatch();
  const practice = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.customerSetuppractice);
  const facility = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.customerSetupfacility);
  const provider = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.customerSetupprovider);
  const referring = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.customerSetupreferringprovider);
  const payer = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.customerSetuppayer);
  const payeragreement = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.customerSetuppayeraggrement);
  const codes = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.customerSetupcodes);
  const inventory = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.customerSetupinventory);
  const feeschedules = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.customerSetupfeeshedule);
  const contractmanagement = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.customerSetupcontractManagement);
  const alertcontrol = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.customerSetupalertcontrol);
  const statementautomation = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.customerSetupstatementAutomation);
  const labelandsuperbillconfig = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.customerSetuplabelAndSuperBill);
  const piissncustomer = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.customerSetuppersonalIdnSsn);
  const accountsetupcustomer = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.customerSetupAccount);
  const billpaymentcustomer = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.customerSetupbillPatment);
  const customization = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.customerSetupcustomization);
  //useState are defined here
  const [practiceState, setpracticeState] = useState('');
  const [facilityState, setfacilityState] = useState('');
  const [providerState, setproviderState] = useState('');
  const [referringState, setreferringState] = useState('');
  const [payerState, setpayerState] = useState('');
  const [payeragreementState, setpayeragreementState] = useState('');
  const [codesState, setcodesState] = useState('');
  const [inventoryState, setinventoryState] = useState('');
  const [feeschedulesState, setfeeschedulesState] = useState('');
  const [contractmanagementState, setcontractmanagementState] = useState('');
  const [alertcontrolState, setalertcontrolState] = useState('');
  const [statementautomationState, setstatementautomationState] = useState('');
  const [labelandsuperbillconfigState, setlabelandsuperbillconfigState] = useState('');
  const [piissncustomerState, setpiissncustomerState] = useState('');
  const [accountsetupcustomerState, setaccountsetupcustomerState] = useState('');
  const [billpaymentcustomerState, setbillpaymentcustomerState] = useState('');
  const [customizationState, setcustomizationState] = useState('');
  useEffect(() => {

    setpracticeState(practice)
    setfacilityState(facility)
    setproviderState(provider)
    setreferringState(referring)
    setpayerState(payer)
    setpayeragreementState(payeragreement)
    setcodesState(codes)
    setinventoryState(inventory)
    setfeeschedulesState(feeschedules)
    setcontractmanagementState(contractmanagement)
    setalertcontrolState(alertcontrol)
    setstatementautomationState(statementautomation)
    setlabelandsuperbillconfigState(labelandsuperbillconfig)
    setpiissncustomerState(piissncustomer)
    setaccountsetupcustomerState(accountsetupcustomer)
    setbillpaymentcustomerState(billpaymentcustomer)
    setcustomizationState(customization)
  }, [practice,
    facility,
    provider,
    referring,
    payer,
    payeragreement,
    codes,
    inventory,
    feeschedules,
    contractmanagement,
    alertcontrol,
    statementautomation,
    labelandsuperbillconfig,
    piissncustomer,
    accountsetupcustomer,
    billpaymentcustomer,
    customization,

  ]);
  return (
    <div className="mb-4">
      <div className="col-md-12 d-flex">
        <div className="col-md-5 mt-3">
          <label>Practice</label>
        </div>
        <div className="col-md-5 mt-1">
          {practiceState ?
            <select
              onChange={(e) => props.customerSetupPracticeEdit(e.target.value)}
              disabled={props.permissionStatus}
              className="form-select form-select-sm"
              name="CustomerSetupPractice"
              id="CustomerSetupPractice"
            >
              <option value="Customer Setup Practice Deny"
                selected={practiceState == "Customer Setup Practice Deny"}
              >Deny </option>
              <option value="Customer Setup Practice Access Only"
                selected={practiceState == "Customer Setup Practice Access Only"}
              >Access Only</option>
              <option value="Customer Setup Practice Access and Modify"
                selected={practiceState == "Customer Setup Practice Access and Modify"}
              >Access and Modify</option>
              <option value="Customer Setup Practice Access, Modify, and Create"
                selected={practiceState == "Customer Setup Practice Access, Modify, and Create"}
              >Access, Modify, & Create</option>
            </select> : ''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#practice">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="practice" name="Practice Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="practice" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to view, modify, and create Practices used throughout the application for this customer.
          This permission is also required to change customer-level settings for Patient, Claim and Payment.
        </p>
      )}

      {/*Second Group*/}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Provider</label>
        </div>
        <div className="col-md-5 mt-1">
          {providerState ? <select
            onChange={(e) => props.customerSetupProviderEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupProvider"
            id="CustomerSetupProvider"
          >
            <option value="Customer Setup Provider Deny"
              selected={providerState == "Customer Setup Provider Deny"}
            >Deny</option>
            <option value="Customer Setup Provider Access Only"
              selected={providerState == "Customer Setup Provider Access Only"}
            >Access Only</option>
            <option value="Customer Setup Provider Access and Modify"
              selected={providerState == "Customer Setup Provider Access and Modify"}
            >Access and Modify</option>
          </select> : ''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#provider">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="provider" name="Provider Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="provider" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to view, modify, and create Billing/Rendering Providers used throughout the application
          for this customer.
        </p>
      )}
      {/*3rd Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Facility</label>
        </div>
        <div className="col-md-5 mt-1">
          {facilityState ?
            <select
              onChange={(e) => props.customerSetupFacilityEdit(e.target.value)}
              disabled={props.permissionStatus}
              className="form-select form-select-sm"
              name="CustomerSetupFacility"
              id="CustomerSetupFacility"
            >
              <option value="Customer Setup Facility Deny"
                selected={facilityState == "Customer Setup Facility Deny"}
              >Deny</option>
              <option value="Customer Setup Facility Access Only"
                selected={facilityState == "Customer Setup Facility Access Only"}
              >Access Only</option>
              <option value="Customer Setup Facility Access and Modify"
                selected={facilityState == "Customer Setup Facility Access and Modify"}
              >Access and Modify</option>
            </select> : ''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#facility">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="facility" name="Facility Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="facility" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to view, modify, and create Facilities used throughout the application for this customer.{' '}
        </p>
      )}
      {/*4th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Referring</label>
        </div>
        <div className="col-md-5 mt-1">
          {referringState ? <select
            onChange={(e) => props.customerSetupReferringEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupReferring"
            id="CustomerSetupReferring"
          >
            <option value="Customer Setup Referring Deny"
              selected={referringState == "Customer Setup Referring Deny"}
            >Deny</option>
            <option value="Customer Setup Referring Access Only"
              selected={referringState == "Customer Setup Referring Access Only"}
            >Access Only</option>
            <option value="Customer Setup Referring Access and Modify"
              selected={referringState == "Customer Setup Referring Access and Modify"}
            >Access and Modify</option>
          </select> : ''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#reffering">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="reffering" name="Referring Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="reffering" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to view, modify, and create Referring Providers used throughout the application for this
          customer{' '}
        </p>
      )}
      {/*5th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Payer</label>
        </div>
        <div className="col-md-5 mt-1">
          {
            payerState ?
              <select
                onChange={(e) => props.customerSetupPayerEdit(e.target.value)}
                disabled={props.permissionStatus}
                className="form-select form-select-sm"
                name="CustomerSetupPayer"
                id="CustomerSetupPayer"
              >
                <option value="Customer Setup Payer Deny"
                  selected={payerState == "Customer Setup Payer Deny"}
                >Deny</option>
                <option value="Customer Setup Payer Access Only"
                  selected={payerState == "Customer Setup Payer Access Only"}
                >Access Only</option>
                <option value="Customer Setup Payer Access and Modify"
                  selected={payerState == "Customer Setup Payer Access and Modify"}
                >Access and Modify</option>
              </select> : ''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#payer">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="payer" name="Payer Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="payer" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to view, modify, and create Payers used throughout the application for this customer.{' '}
        </p>
      )}
      {/*6th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Payer Agreements</label>
        </div>
        <div className="col-md-5 mt-1">
          {payeragreementState ? <select
            onChange={(e) => props.customerSetupPayerAgreementEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupPayerAgreements"
            id="CustomerSetupPayerAgreements"
          >
            <option value="Customer Setup Payer Agreements Deny"
              selected={payeragreementState == "Customer Setup Payer Agreements Deny"}
            >Deny</option>
            <option value="Customer Setup Payer Agreements Verify Status"
              selected={payeragreementState == "Customer Setup Payer Agreements Verify Status"}
            >Verify Status</option>
            <option value="Customer Setup Payer Agreements Create and Verify"
              selected={payeragreementState == "Customer Setup Payer Agreements Create and Verify"}
            >Create and Verify</option>
          </select> : ''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#payerAgreement">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="payerAgreement" name="Payer Agreements Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="payerAgreement" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to submit new payer agreements and check the status of previously completed agreements.{' '}
        </p>
      )}
      {/*7th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Codes</label>
        </div>
        <div className="col-md-5 mt-1">
          {codesState ? <select
            onChange={(e) => props.customerSetupCodesEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupCodes"
            id="CustomerSetupCodes"
          >
            <option value="Customer Setup Codes Deny"
              selected={codesState == "Customer Setup Codes Deny"}
            >Deny</option>
            <option value="Customer Setup Codes Access Only"
              selected={codesState == "Customer Setup Codes Access Only"}
            >Access Only</option>
            <option value="Customer Setup Codes Access and Modify"
              selected={codesState == "Customer Setup Codes Access and Modify"}
            >Access and Modify</option>
          </select> : ''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#codes">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="codes" name="Codes Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="codes" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to view, modify, and create Procedure, Diagnosis, Adjustment, Remittance, ICD Procedure,
          and Revenue Codes used throughout the application for this customer.{' '}
        </p>
      )}
      {/*8th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Inventory</label>
        </div>
        <div className="col-md-5 mt-1">
          {inventoryState ? <select
            onChange={(e) => props.customerSetupInventoryEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupInventory"
            id="CustomerSetupInventory"
          >
            <option value="Customer Setup Inventory Deny"
              selected={inventoryState == "Customer Setup Inventory Deny"}
            >Deny</option>
            <option value="Customer Setup Inventory Access Only"
            selected={inventoryState == "Customer Setup Inventory Access Only"}
            >Access Only</option>
            <option value="Customer Setup Inventory Access and Modify"
            selected={inventoryState == "Customer Setup Inventory Access and Modify"}
            >Access and Modify</option>
          </select> : ''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#inventory">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="inventory" name="Inventory Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="inventory" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && (
        <p>Controls the ability to view, modify, and create Inventory used on claims for this customer. </p>
      )}
      {/*9th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Fee Schedules</label>
        </div>
        <div className="col-md-5 mt-1">
          {feeschedulesState?<select
            onChange={(e) => props.customerSetupFeeScheduleEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupFeeSchedules"
            id="CustomerSetupFeeSchedules"
          >
            <option value="Customer Setup Fee Schedules Deny"
            selected={feeschedulesState =="Customer Setup Fee Schedules Deny"}
            >Deny</option>
            <option value="Customer Setup Fee Schedules Access Only"
            selected={feeschedulesState =="Customer Setup Fee Schedules Access Only"}
            >Access Only</option>
            <option value="Customer Setup Fee Schedules Access and Modify"
            selected={feeschedulesState =="Customer Setup Fee Schedules Access and Modify"}
            >Access and Modify</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#feeSchedules">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="feeSchedules" name="Fee Schedules Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="feeSchedules" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && (
        <p>Controls the ability to view, modify, and create Fee Schedules used on claims for this customer. </p>
      )}
      {/*10th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Contract Management</label>
        </div>
        <div className="col-md-5 mt-1">
          {contractmanagementState?<select
            onChange={(e) => props.customerSetupContractMgmntEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupContractManagement"
            id="CustomerSetupContractManagement"
          >
            <option value="Customer Setup Contract Management Deny"
            selected={contractmanagementState =="Customer Setup Contract Management Deny"}
            >Deny</option>
            <option value="Customer Setup Contract Management Access Only"
            selected={contractmanagementState =="Customer Setup Contract Management Access Only"}
            >Access Only</option>
            <option value="Customer Setup Contract Management Access and Modify"
            selected={contractmanagementState =="Customer Setup Contract Management Access and Modify"}
            >Access and Modify</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#contractManag">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="contractManag" name="Contract Management Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="contractManag" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to view, modify, and create Contracts used when posting insurance payments for this
          customer.{' '}
        </p>
      )}
      {/*11th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Alert Control</label>
        </div>
        <div className="col-md-5 mt-1">
          {alertcontrolState?<select
            onChange={(e) => props.customerSetupAlertControlEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupAlertControl"
            id="CustomerSetupAlertControl"
          >
            <option value="Customer Setup Alert Control Deny"
            selected={alertcontrolState =="Customer Setup Alert Control Deny"}
            >Deny</option>
            <option value="Customer Setup Alert Control Search"
            selected={alertcontrolState =="Customer Setup Alert Control Search"}
            >Search</option>
            <option value="Customer Setup Alert Control Search and Modify"
            selected={alertcontrolState =="Customer Setup Alert Control Search and Modify"}
            >Search and Modify</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#alertControl">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="alertControl" name="Alert Control Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="alertControl" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && (
        <p>Controls the ability to use the Alert Control feature to view and update alerts for multiple records. </p>
      )}
      {/*12th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Statement Automation</label>
        </div>
        <div className="col-md-5 mt-1">
          {statementautomationState?<select
            onChange={(e) => props.customerSetupStatementAutomationEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupStatementAutomation"
            id="CustomerSetupStatementAutomation"
          >
            <option value="Customer Setup Statement Automation Deny"
            selected={statementautomationState =="Customer Setup Statement Automation Deny"}
            >Deny</option>
            <option value="Customer Setup Statement Automation Allow"
             selected={statementautomationState =="Customer Setup Statement Automation Allow"}
            >Allow</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button
            className="btn btn-outline-primary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#statementAutomatio"
          >
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission
            modelTarget="statementAutomatio"
            name="Statement Automation Permission History"
          ></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="statementAutomatio" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to modify the statement automation settings. Note: The user must also have Access and
          Modify set for the practice permission in order to change the statement setting for a practice.{' '}
        </p>
      )}
      {/*13th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Label and Superbill Configuration</label>
        </div>
        <div className="col-md-5 mt-1">
         {labelandsuperbillconfigState? <select
            onChange={(e) => props.customerSetupLblSpblConfigEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupLabelandSuperbillConfiguration"
            id="CustomerSetupLabelandSuperbillConfiguration"
          >
            <option value="Customer Setup Label and Superbill Configuration Deny"
            selected={labelandsuperbillconfigState =="Customer Setup Label and Superbill Configuration Deny"}
            >Deny</option>
            <option value="Customer Setup Label and Superbill Configuration Allow"
            selected={labelandsuperbillconfigState =="Customer Setup Label and Superbill Configuration Allow"}
            >Allow</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button
            className="btn btn-outline-primary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#labelndSuperbillConfig"
          >
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission
            modelTarget="labelndSuperbillConfig"
            name="Label and Superbill Configuration Permission History"
          ></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="labelndSuperbillConfig" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && (
        <p>Controls the ability to view, modify, create, and delete Label and Superbill configurations. </p>
      )}
      {/*14th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Personally Identifiable Information - SSN</label>
        </div>
        <div className="col-md-5 mt-1">
          {piissncustomerState?<select
            onChange={(e) => props.customerSetupPersnlIdInfoSSNEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupPersonallyIdentifiableInformationSSN"
            id="CustomerSetupPersonallyIdentifiableInformationSSN"
          >
            <option value="Customer Setup Personally Identifiable Information-SSN Deny"
            selected={piissncustomerState =="Customer Setup Personally Identifiable Information-SSN Deny"}
            >Deny</option>
            <option value="Customer Setup Personally Identifiable Information-SSN Allow"
            selected={piissncustomerState =="Customer Setup Personally Identifiable Information-SSN Allow"}
            >Allow</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#pdiSSNPermHist">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission
            modelTarget="pdiSSNPermHist"
            name="Personally Identifiable Information - SSN Permission History"
          ></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="pdiSSNPermHist" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to view the complete Social Security Number shown in places on the Patient and Provider
          screens.{' '}
        </p>
      )}
      {/*15th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Account Setup</label>
        </div>
        <div className="col-md-5 mt-1">
          {accountsetupcustomerState?<select
            onChange={(e) => props.customerSetupAccSetupEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupAccountSetup"
            id="CustomerSetupAccountSetup"
          >
            <option value="Customer Setup Account Setup Deny"
            selected={accountsetupcustomerState =="Customer Setup Account Setup Deny"}
            >Deny</option>
            <option value="Customer Setup Account Setup Allow"
            selected={accountsetupcustomerState =="Customer Setup Account Setup Allow"}
            >Allow</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#accSetupp">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="accSetupp" name="Account Setup Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="accSetupp" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to create new customers within the current account as well as providers within the
          current customer. Note: The user must also have Access and Modify set for the provider permission in order to
          create new providers and, in certain situations where a TaxID Add-On is needed, the Bill Payment permission.{' '}
        </p>
      )}
      {/*16th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Bill Payment</label>
        </div>
        <div className="col-md-5 mt-1">
         {billpaymentcustomerState? <select
            onChange={(e) => props.customerSetupBillPaymntEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupBillPayment"
            id="CustomerSetupBillPayment"
          >
            <option value="Customer Setup Bill Payment Deny"
            selected={billpaymentcustomerState =="Customer Setup Bill Payment Deny"}
            >Deny</option>
            <option value="Customer Setup Bill Payment Allow"
            selected={billpaymentcustomerState =="Customer Setup Bill Payment Allow"}
            >Allow</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#billPay">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="billPay" name="Bill Payment Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="billPay" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to pay invoices, view payment history, and create/edit payment profiles. This includes
          paying Tax ID Add-On invoices for new providers (requires Access and Modify for Provider permission).{' '}
        </p>
      )}
      {/*17th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Customization</label>
        </div>
        <div className="col-md-5 mt-1">
          {customizationState?<select
            onChange={(e) => props.customerSetupCustomiztionEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupCustomization"
            id="CustomerSetupCustomization"
          >
            <option value="Customer Setup Customization Deny"
            selected={customizationState =="Customer Setup Customization Deny"}
            >Deny</option>
            <option value="Customer Setup Customization Allow"
            selected={customizationState =="Customer Setup Customization Allow"}
            >Allow</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#custom">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="custom" name="Customization Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="custom" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && <p>Controls the ability to view, modify, and create custom info lines. </p>}
    </div>
  );
};

export default CustomerCatEdit;
