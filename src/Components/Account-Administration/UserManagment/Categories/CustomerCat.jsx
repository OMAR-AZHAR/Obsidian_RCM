import { useDispatch, useSelector } from 'react-redux';

import {
  AccountSetupCustomer,
  AlertControl,
  BillPaymentCustomer,
  Codes,
  ContractManagement,
  Customization,
  Facility,
  FeeSchedules,
  Inventory,
  LabelSuperbillConfig,
  Payer,
  PayerAgreements,
  PIISSNCustomer,
  Practice,
  Provider,
  Referring,
  StatementAutomation,
} from '../../../../Redux/features/UserManagement/UserProfile/PermissionSlice';
import ModalPermission from '../../Security/ModalPermission';
import ModelUserManagment from './ModelUserManagment';
export default function CustomerCat(props) {
  const dispatch = useDispatch();
  const ac = useSelector((state) => state.PermissionCustomers.patient);
  const cd = useSelector((state) => state.PermissionCustomers.addressverification);
  const fg = useSelector((state) => state.PermissionCustomers.batcheligibility);
  const hj = useSelector((state) => state.PermissionCustomers.batchprinting);
  const re = useSelector((state) => state.PermissionCustomers.debitpatient);
  const ty = useSelector((state) => state.PermissionCustomers.editnotes);
  const qw = useSelector((state) => state.PermissionCustomers.eligibilitypatient);
  const ui = useSelector((state) => state.PermissionCustomers.enhancedstatementprinting);
  const gf = useSelector((state) => state.PermissionCustomers.patientaccountmanagement);
  const as = useSelector((state) => state.PermissionCustomers.patientactivitypatient);
  const pk = useSelector((state) => state.PermissionCustomers.patientmerge);
  const lg = useSelector((state) => state.PermissionCustomers.patientnotes);
  const op = useSelector((state) => state.PermissionCustomers.patientpaymentspatient);
  const er = useSelector((state) => state.PermissionCustomers.patientportalinvite);
  const bt = useSelector((state) => state.PermissionCustomers.piissnpatient);
  const yr = useSelector((state) => state.PermissionCustomers.trackingpatient);
  return (
    <div className="">
      <div className="col-md-12 d-flex">
        <div className="col-md-5 mt-3">
          <label>Practice</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.customerSetupPractice(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupPractice"
            id="CustomerSetupPractice"
          >
            <option value="Customer Setup Practice Deny">Deny </option>
            <option value="Customer Setup Practice Access Only">Access Only</option>
            <option value="Customer Setup Practice Access and Modify">Access and Modify</option>
            <option value="Customer Setup Practice Access, Modify, and Create">Access, Modify, & Create</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#practice">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="practice" name="Practice Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="practice" name="Test Permission History" />
        ) : (
          ''
        )}
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
          <select
            onChange={(e) => props.customerSetupProvider(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupProvider"
            id="CustomerSetupProvider"
          >
            <option value="Customer Setup Provider Deny">Deny</option>
            <option value="Customer Setup Provider Access Only">Access Only</option>
            <option value="Customer Setup Provider Access and Modify">Access and Modify</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#provider">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="provider" name="Provider Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="provider" name="Test Permission History" />
        ) : (
          ''
        )}
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
          <select
            onChange={(e) => props.customerSetupFacility(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupFacility"
            id="CustomerSetupFacility"
          >
            <option value="Customer Setup Facility Deny">Deny</option>
            <option value="Customer Setup Facility Access Only">Access Only</option>
            <option value="Customer Setup Facility Access and Modify">Access and Modify</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#facility">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="facility" name="Facility Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="facility" name="Test Permission History" />
        ) : (
          ''
        )}
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
          <select
            onChange={(e) => props.customerSetupReferring(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupReferring"
            id="CustomerSetupReferring"
          >
            <option value="Customer Setup Referring Deny">Deny</option>
            <option value="Customer Setup Referring Access Only">Access Only</option>
            <option value="Customer Setup Referring Access and Modify">Access and Modify</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#reffering">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="reffering" name="Referring Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="reffering" name="Test Permission History" />
        ) : (
          ''
        )}
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
          <select
            onChange={(e) => props.customerSetupPayer(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupPayer"
            id="CustomerSetupPayer"
          >
            <option value="Customer Setup Payer Deny">Deny</option>
            <option value="Customer Setup Payer Access Only">Access Only</option>
            <option value="Customer Setup Payer Access and Modify">Access and Modify</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#payer">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="payer" name="Payer Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="payer" name="Test Permission History" />
        ) : (
          ''
        )}
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
          <select
            onChange={(e) => props.customerSetupPayerAgreement(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupPayerAgreements"
            id="CustomerSetupPayerAgreements"
          >
            <option value="Customer Setup Payer Agreements Deny">Deny</option>
            <option value="Customer Setup Payer Agreements Verify Status">Verify Status</option>
            <option value="Customer Setup Payer Agreements Create and Verify">Create and Verify</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#payerAgreement">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="payerAgreement" name="Payer Agreements Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="payerAgreement" name="Test Permission History" />
        ) : (
          ''
        )}
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
          <select
            onChange={(e) => props.customerSetupCodes(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupCodes"
            id="CustomerSetupCodes"
          >
            <option value="Customer Setup Codes Deny">Deny</option>
            <option value="Customer Setup Codes Access Only">Access Only</option>
            <option value="Customer Setup Codes Access and Modify">Access and Modify</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#codes">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="codes" name="Codes Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="codes" name="Test Permission History" />
        ) : (
          ''
        )}
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
          <select
            onChange={(e) => props.customerSetupInventory(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupInventory"
            id="CustomerSetupInventory"
          >
            <option value="Customer Setup Inventory Deny">Deny</option>
            <option value="Customer Setup Inventory Access Only">Access Only</option>
            <option value="Customer Setup Inventory Access and Modify">Access and Modify</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#inventory">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="inventory" name="Inventory Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="inventory" name="Test Permission History" />
        ) : (
          ''
        )}
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
          <select
            onChange={(e) => props.customerSetupFeeSchedule(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupFeeSchedules"
            id="CustomerSetupFeeSchedules"
          >
            <option value="Customer Setup Fee Schedules Deny">Deny</option>
            <option value="Customer Setup Fee Schedules Access Only">Access Only</option>
            <option value="Customer Setup Fee Schedules Access and Modify">Access and Modify</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#feeSchedules">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="feeSchedules" name="Fee Schedules Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="feeSchedules" name="Test Permission History" />
        ) : (
          ''
        )}
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
          <select
            onChange={(e) => props.customerSetupContractMgmnt(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupContractManagement"
            id="CustomerSetupContractManagement"
          >
            <option value="Customer Setup Contract Management Deny">Deny</option>
            <option value="Customer Setup Contract Management Access Only">Access Only</option>
            <option value="Customer Setup Contract Management Access and Modify">Access and Modify</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#contractManag">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="contractManag" name="Contract Management Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="contractManag" name="Test Permission History" />
        ) : (
          ''
        )}
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
          <select
            onChange={(e) => props.customerSetupAlertControl(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupAlertControl"
            id="CustomerSetupAlertControl"
          >
            <option value="Customer Setup Alert Control Deny">Deny</option>
            <option value="Customer Setup Alert Control Search">Search</option>
            <option value="Customer Setup Alert Control Search and Modify">Search and Modify</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#alertControl">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="alertControl" name="Alert Control Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="alertControl" name="Test Permission History" />
        ) : (
          ''
        )}
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
          <select
            onChange={(e) => props.customerSetupStatementAutomation(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupStatementAutomation"
            id="CustomerSetupStatementAutomation"
          >
            <option value="Customer Setup Statement Automation Deny">Deny</option>
            <option value="Customer Setup Statement Automation Allow">Allow</option>
          </select>
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
        {props.permissionType == 2 ? (
          <ModalPermission
            modelTarget="statementAutomatio"
            name="Statement Automation Permission History"
          ></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="statementAutomatio" name="Test Permission History" />
        ) : (
          ''
        )}
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
          <select
            onChange={(e) => props.customerSetupLblSpblConfig(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupLabelandSuperbillConfiguration"
            id="CustomerSetupLabelandSuperbillConfiguration"
          >
            <option value="Customer Setup Label and Superbill Configuration Deny">Deny</option>
            <option value="Customer Setup Label and Superbill Configuration Allow">Allow</option>
          </select>
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
        {props.permissionType == 2 ? (
          <ModalPermission
            modelTarget="labelndSuperbillConfig"
            name="Label and Superbill Configuration Permission History"
          ></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="labelndSuperbillConfig" name="Test Permission History" />
        ) : (
          ''
        )}
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
          <select
            onChange={(e) => props.customerSetupPersnlIdInfoSSN(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupPersonallyIdentifiableInformationSSN"
            id="CustomerSetupPersonallyIdentifiableInformationSSN"
          >
            <option value="Customer Setup Personally Identifiable Information-SSN Deny">Deny</option>
            <option value="Customer Setup Personally Identifiable Information - SSN Allow">Allow</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#pdiSSNPermHist">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission
            modelTarget="pdiSSNPermHist"
            name="Personally Identifiable Information - SSN Permission History"
          ></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="pdiSSNPermHist" name="Test Permission History" />
        ) : (
          ''
        )}
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
          <select
            onChange={(e) => props.customerSetupAccSetup(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupAccountSetup"
            id="CustomerSetupAccountSetup"
          >
            <option value="Customer Setup Account Setup Deny">Deny</option>
            <option value="Customer Setup Account Setup Allow">Allow</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#accSetupp">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="accSetupp" name="Account Setup Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="accSetupp" name="Test Permission History" />
        ) : (
          ''
        )}
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
          <select
            onChange={(e) => props.customerSetupBillPaymnt(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupBillPayment"
            id="CustomerSetupBillPayment"
          >
            <option value="Customer Setup Bill Payment Deny">Deny</option>
            <option value="Customer Setup Bill Payment Allow">Allow</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#billPay">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="billPay" name="Bill Payment Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="billPay" name="Test Permission History" />
        ) : (
          ''
        )}
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
          <select
            onChange={(e) => props.customerSetupCustomiztion(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="CustomerSetupCustomization"
            id="CustomerSetupCustomization"
          >
            <option value="Customer Setup Customization Deny">Deny</option>
            <option value="Customer Setup Customization Allow">Allow</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#custom">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="custom" name="Customization Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="custom" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && <p>Controls the ability to view, modify, and create custom info lines. </p>}
    </div>
  );
}
