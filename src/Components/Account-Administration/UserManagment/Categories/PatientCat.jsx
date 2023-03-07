import { useDispatch, useSelector } from 'react-redux';

import {
  AddressVerify,
  BatchEligibilityPatient,
  BatchPrintingPatient,
  ControlPatient,
  DebitPatient,
  EditNotesPatient,
  Eligibility,
  EnhancedStatementPrinting,
  Patient,
  PatientAccountManagement,
  PatientActivityPatients,
  PatientMerge,
  PatientNotes,
  PatientPaymentsPatients,
  PaymentPortalInvite,
  PIISSNPatient,
  TrackingPatient,
} from '../../../../Redux/features/UserManagement/UserProfile/PermissionSlice';
import ModalPermission from '../../Security/ModalPermission';
import ModelUserManagment from './ModelUserManagment';
export default function PatientCat(props) {
  const dispatch = useDispatch();
  const accountsetupadmin = useSelector((state) => state.PermissionCustomers.patient);
  const ay = useSelector((state) => state.PermissionCustomers.addressverification);
  const ta = useSelector((state) => state.PermissionCustomers.batcheligibility);
  const ba = useSelector((state) => state.PermissionCustomers.batchprinting);
  const ak = useSelector((state) => state.PermissionCustomers.controlpatient);
  const ka = useSelector((state) => state.PermissionCustomers.debitpatient);
  const hg = useSelector((state) => state.PermissionCustomers.editnotes);
  const ig = useSelector((state) => state.PermissionCustomers.eligibilitypatient);
  const rv = useSelector((state) => state.PermissionCustomers.enhancedstatementprinting);
  const or = useSelector((state) => state.PermissionCustomers.patientaccountmanagement);
  const mn = useSelector((state) => state.PermissionCustomers.patientactivitypatient);
  const sa = useSelector((state) => state.PermissionCustomers.patientmerge);
  const we = useSelector((state) => state.PermissionCustomers.patientnotes);
  const ew = useSelector((state) => state.PermissionCustomers.patientpaymentspatient);
  const vc = useSelector((state) => state.PermissionCustomers.patientportalinvite);
  const ewe = useSelector((state) => state.PermissionCustomers.piissnpatient);
  const cvc = useSelector((state) => state.PermissionCustomers.trackingpatient);
  return (
    <div className="">
      <div className="col-md-12 d-flex">
        <div className="col-md-5 mt-3">
          <label>Patient</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientPatient"
            id="PatientPatient"
            onChange={(e) => props.patientPatient(e.target.value)}
          >
            <option value="Patient Patient Deny">Deny </option>
            <option value="Patient Patient Access Only">Access Only</option>
            <option value="Patient Patient Access and Modify">Access and Modify</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#patient">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="patient" name="Patient Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="patient" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to view, create, modify, and inactivate patients. When set to Access, Modify, and Delete,
          the user will be able to view, update, create, and inactivate patients.
        </p>
      )}
      {/*Second Group*/}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Address Verification</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.patientAddVerifies(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientAddressVerification"
            id="PatientAddressVerification"
          >
            <option value="Patient Address Verification Deny">Deny</option>
            <option value="Patient Address Verification Allow">Allow</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addVerif">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="addVerif" name="Address Verification Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="addVerif" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to manually perform address verification for the patient, insured, or guarantor
          addresses.
        </p>
      )}
      {/*3rd Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Batch Eligibility</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.patientBatchEligib(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientBatchEligibility"
            id="PatientBatchEligibility"
          >
            <option value="Patient Batch Eligibility Deny">Deny</option>
            <option value="Patient Batch Eligibility Search">Search</option>
            <option value="Patient Batch Eligibility Search and Check Eligibility">Search and Check Eligibility</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#batchEligibility">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="batchEligibility" name="Batch Eligibility Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="batchEligibility" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to use the Batch Eligibility feature to view eligibility records for multiple patients.
          When set to Search and Check Eligibility, users will be able perform searches, view results from past
          eligibility checks, and perform new checks for multiple patients at the same time.
        </p>
      )}
      {/*4rth Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Batch Printing</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.patientBatchPrinting(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientBatchPrinting"
            id="PatientBatchPrinting"
          >
            <option value="Patient Batch Printing Deny">Deny</option>
            <option value="Patient Batch Printing Search">Search</option>
            <option value="Patient Batch Printing Search and Print">Search and Print</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#batchPrinting">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="batchPrinting" name="Batch Printing Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="batchPrinting" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to use the Claim, Statement, Label, and Superbill Batch Printing features. Note: In order
          to print claims, users must have Access Only permission for the claim type that they are attempting to
          search/print. When set to Search, users will be able to perform searches but cannot print from the results.
        </p>
      )}
      {/*5th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Control</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.patientContrl(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientControl"
            id="PatientControl"
          >
            <option value="Patient Control Deny">Deny</option>
            <option value="Patient Control Search and Fix">Search and Fix</option>
            <option value="Patient Control Search and Save">Search and Save</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#control">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="control" name="Control Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="control" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to use the Claim Status Control and Patient AR Control features to update claim status
          and manage patient AR in batch. When set to Search and Control, users will be able to use the control actions
          to make updates to one or more records within the search results. Note: In order to delete claims with Status
          Control, users must also have Access, Modify, and Delete permission for the claim type that they are
          attempting to delete.
        </p>
      )}
      {/*6th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Debit/Credit</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.patientDebitCredit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientDebit/Credit"
            id="PatientDebit/Credit"
          >
            <option value="Patient Debit/Credit Deny">Deny</option>
            <option value="Patient Debit/Credit Allow">Allow</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#debCredit">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="debCredit" name="Debit/Credit Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="debCredit" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to apply debits and credits towards a patient account within Manage Account or AR
          Control.
        </p>
      )}
      {/*7th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Edit Notes</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.patienteditNots(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientEditNotes"
            id="PatientEditNotes"
          >
            <option value="Patient Edit Notes Deny">Deny</option>
            <option value="Patient Edit Notes Allow">Allow</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#edNotes">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="edNotes" name="Edit Notes Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="edNotes" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to create, modify, and delete Notes on a patient. Unless the user is an Admin or Auth
          Rep, they can only modify and delete notes that they created.
        </p>
      )}
      {/*8th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Eligibility</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.patientEligb(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientEligibility"
            id="PatientEligibility"
          >
            <option value="Patient Eligibility Deny">Deny</option>
            <option value="Patient Eligibility Access History">Access History</option>
            <option value="Patient Eligibility Access and Check">Access and Check</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#eligibility">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="eligibility" name="Eligibility Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="eligibility" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to view a patient's eligibility records. When set to Access and Check, users will be able
          to perform new eligibility checks and access the results of past checks.
        </p>
      )}
      {/*9th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Enhanced Statement Printing</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.patientEnhancedStatement(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientEnhancedStatementPrinting"
            id="PatientEnhancedStatementPrinting"
          >
            <option value="Patient Enhanced Statement Printing Deny">Deny</option>
            <option value="Patient Enhanced Statement Printing Allow">Allow</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#enhStPrinting">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission
            modelTarget="enhStPrinting"
            name="Enhanced Statement Printing Permission History"
          ></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="enhStPrinting" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to print a patient statement using the Enhanced User Print format in either the Patient
          screen or Batch Statement Printing. Note that the option is only available within customers with this feature
          enable.
        </p>
      )}
      {/*10th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Patient Account Management</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.patientAccMgmnt(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientPatientAccountManagementAccess"
            id="PatientPatientAccountManagementAccess"
          >
            <option value="Patient Patient Account Management Deny">Deny</option>
            <option value="Patient Patient Account Management Access Only">Access Only</option>
            <option value="Patient Patient Account Management Access and Modify">Access and Modify</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#ptAccMngmPermHis">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission
            modelTarget="ptAccMngmPermHis"
            name="Patient Account Management Permission History"
          ></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="ptAccMngmPermHis" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to access and modify transactions within Manage Account. When set to Access and Modify,
          users will be able to modify and delete charges, credits, and payments.
        </p>
      )}
      {/*11th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Patient Activity</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.patientActivity(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientPatientActivity"
            id="PatientPatientActivity"
          >
            <option value="Patient Patient Activity Deny">Deny</option>
            <option value="Patient Patient Activity Allow">Allow</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#patActiv">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="patActiv" name="Patient Activity Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="patActiv" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p>
          Allows users to view a listing of the patient's claim, miscellaneous debit, credit, statement, payment,
          summary activity and dependents. This includes detailed data and the ability to open claims, checks, and other
          sections directly from the activity listing. The patient's claims activity is defaulted to list all of the
          claims, dates, totals, balances and current status of the claims.
        </p>
      )}
      {/*12th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Patient Merge</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.patientMerg(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientPatientMerge"
            id="PatientPatientMerge"
          >
            <option value="Patient Patient Merge Deny">Deny</option>
            <option value="Patient Patient Merge Allow">Allow</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#patMergePerm">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="patMergePerm" name="Patient Merge Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="patMergePerm" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p>Controls the ability to merge two patients and undo a previously completed merge.</p>
      )}
      {/*13th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Patient Notes</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.patientNots(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientPatientNotes"
            id="PatientPatientNotes"
          >
            <option value="Patient Patient Notes Deny">Deny</option>
            <option value="Patient Patient Notes Allow">Allow</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#patNotes">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="patNotes" name="Patient Notes Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="patNotes" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to create, modify, and delete Notes on a patient even when the Patient permission is set
          to Access Only. Note: Requires that the user have Edit Note permission.
        </p>
      )}
      {/*14th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Patient Payments</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.patientPaymnt(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientPatientPayments"
            id="PatientPatientPayments"
          >
            <option value="Patient Patient Payments Deny">Deny</option>
            <option value="Patient Patient Payments Allow">Allow</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#patPayment">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="patPayment" name="Patient Payments Permission Historys"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="patPayment" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to post new patient payments via the Payment Posting, Claim, and Appointment screens in
          addition to applying discounts, credit/debit adjustments, and account credits towards a patient's charges
          within Manage Account.
        </p>
      )}
      {/*15th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Payment Portal Invite</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.patientpaymPortal(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientPaymentPortalInvite"
            id="PatientPaymentPortalInvite"
          >
            <option value="Patient Payment Portal Invite Deny">Deny</option>
            <option value="Patient Payment Portal Invite Allow">Allow</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#payPortInv">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="payPortInv" name="Payment Portal Invite Permission Historys"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="payPortInv" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to send an invitation to a patient to register with the Payment Portal. Note that the
          option is only available within customers with this feature enable.
        </p>
      )}
      {/*17th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Personally Identifiable Information - SSN</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.patientIdInfoSSn(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientPersonallyIdentifiableInformationSSN"
            id="PatientPersonallyIdentifiableInformationSSN"
          >
            <option value="Patient Personally Identifiable Information-SSN Deny">Deny</option>
            <option value="Patient Personally Identifiable Information - SSN Allow">Allow</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#piissnPH">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission
            modelTarget="piissnPH"
            name="Personally Identifiable Information - SSN Permission History"
          ></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="piissnPH" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to view the complete Social Security Number shown in places on the Patient and Provider
          screens.
        </p>
      )}
      {/*18th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Tracking</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.patientTrackng(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientTracking"
            id="PatientTracking"
          >
            <option value="Patient Tracking Deny">Deny</option>
            <option value="Patient Tracking Search">Search</option>
            <option value="Patient Tracking Search, Fix and Save">Search, Fix and Save</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#track">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="track" name="Tracking Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="track" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to use the Claim Tracker, Statement Tracker, and Payment Tracker features to view past
          claim, statement, and payment transactions. When set to Search and Fix, users will be able to mark records
          within the search results as fixed. In addition, users will be able to update patient addresses within
          Statement Tracker based on USPS recommendations.
        </p>
      )}
    </div>
  );
}
