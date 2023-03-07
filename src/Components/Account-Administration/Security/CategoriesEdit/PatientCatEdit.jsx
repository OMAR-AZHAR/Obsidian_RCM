import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function PatientCatEdit(props) {
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.patientPatient);
  const addressverification = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.PatientAddressVerification);
  const batcheligibility = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.patientBatchEligibility);
  const batchprinting = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.patientBatchPrinting);
  const controlpatient = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.patientControl);
  const debitpatient = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.patientDebitPatient);
  const editnotes = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.patientEditNotes);
  const eligibilitypatient = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.patientEligibilityDeny);
  const enhancedstatementprinting = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.patientEnhancedStatement);
  const patientaccountmanagement = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.patientPatientAccount);
  const patientactivitypatient = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.patientPatientActivity);
  const patientmerge = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.patientPatientMerge);
  const patientnotes = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.patientPatientNotes);
  const patientpaymentspatient = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.patientpaymentspatient);
  const patientportalinvite = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.patientPaymentPortalInvite);
  const piissnpatient = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.patientIdnSSN);
  const trackingpatient = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.patientTracking);

  const [patientState, setpatientState] = useState('');
  const [addressverificationState, setaddressverificationState] = useState('');
  const [batcheligibilityState, setbatcheligibilityState] = useState('');
  const [batchprintingState, setbatchprintingState] = useState('');
  const [controlpatientState, setcontrolpatientState] = useState('');
  const [debitpatientState, setdebitpatientState] = useState('');
  const [editnotesState, seteditnotesState] = useState('');
  const [eligibilitypatientState, seteligibilitypatientState] = useState('');
  const [enhancedstatementprintingState, setenhancedstatementprintingState] = useState('');
  const [patientaccountmanagementState, setpatientaccountmanagementState] = useState('');
  const [patientactivitypatientState, setpatientactivitypatientState] = useState('');
  const [patientmergeState, setpatientmergeState] = useState('');
  const [patientnotesState, setpatientnotesState] = useState('');
  const [patientpaymentspatientState, setpatientpaymentspatientState] = useState('');
  const [patientportalinviteState, setpatientportalinviteState] = useState('');
  const [piissnpatientState, setpiissnpatientState] = useState('');
  const [trackingpatientState, settrackingpatientState] = useState('');

  useEffect(() => {
    setpatientState(patient)
    setaddressverificationState(addressverification)
    setbatcheligibilityState(batcheligibility)
    setbatchprintingState(batchprinting)
    setcontrolpatientState(controlpatient)
    setdebitpatientState(debitpatient)
    seteditnotesState(editnotes)
    seteligibilitypatientState(eligibilitypatient)
    setenhancedstatementprintingState(enhancedstatementprinting)
    setpatientaccountmanagementState(patientaccountmanagement)
    setpatientactivitypatientState(patientactivitypatient)
    setpatientmergeState(patientmerge)
    setpatientnotesState(patientnotes)
    setpatientpaymentspatientState(patientpaymentspatient)
    setpatientportalinviteState(patientportalinvite)
    setpiissnpatientState(piissnpatient)
    settrackingpatientState(trackingpatient)

  }, [
    patient, addressverification, batcheligibility, batchprinting, controlpatient, debitpatient, editnotes, eligibilitypatient, enhancedstatementprinting, patientaccountmanagement, patientactivitypatient, patientmerge, patientnotes, patientpaymentspatient, patientportalinvite, piissnpatient, trackingpatient

  ]);
  return (
    <div className="">
      <div className="col-md-12 d-flex">
        <div className="col-md-5 mt-3">
          <label>Patient</label>
        </div>
        <div className="col-md-5 mt-1">
          {patientState ? <select
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientPatient"
            id="PatientPatient"
            onChange={(e) => props.patientPatientEdit(e.target.value)}
          >
            <option value="Patient Patient Deny"
              selected={patientState == "Patient Patient Deny"}
            >Deny </option>
            <option value="Patient Patient Access Only"
              selected={patientState == "Patient Patient Access Only"}
            >Access Only</option>
            <option value="Patient Patient Access and Modify"
              selected={patientState == "Patient Patient Access and Modify"}
            >Access and Modify</option>
          </select> : ''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#patient">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="patient" name="Patient Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="patient" name="Test Permission History" />
        ) : (
          ''
        )} */}
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
         {addressverificationState? <select
            onChange={(e) => props.patientAddVerifiesEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientAddressVerification"
            id="PatientAddressVerification"
          >
            <option value="Patient Address Verification Deny"
            selected={addressverificationState =="Patient Address Verification Deny"}
            >Deny</option>
            <option value="Patient Address Verification Allow"
            selected={addressverificationState =="Patient Address Verification Allow"}
            >Allow</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addVerif">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="addVerif" name="Address Verification Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="addVerif" name="Test Permission History" />
        ) : (
          ''
        )} */}
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
          {batcheligibilityState?<select
            onChange={(e) => props.patientBatchEligibEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientBatchEligibility"
            id="PatientBatchEligibility"
          >
            <option value="Patient Batch Eligibility Deny"
            selected={batcheligibilityState =="Patient Batch Eligibility Deny"}
            >Deny</option>
            <option value="Patient Batch Eligibility Search"
            selected={batcheligibilityState =="Patient Batch Eligibility Search"}
            >Search</option>
            <option value="Patient Batch Eligibility Search and Check Eligibility"
            selected={batcheligibilityState =="Patient Batch Eligibility Search and Check Eligibility"}
            >Search and Check Eligibility</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#batchEligibility">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="batchEligibility" name="Batch Eligibility Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="batchEligibility" name="Test Permission History" />
        ) : (
          ''
        )} */}
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
          {batchprintingState?<select
            onChange={(e) => props.patientBatchPrintingEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientBatchPrinting"
            id="PatientBatchPrinting"
          >
            <option value="Patient Batch Printing Deny"
            selected={batchprintingState =="Patient Batch Printing Deny"}
            >Deny</option>
            <option value="Patient Batch Printing Search"
            selected={batchprintingState =="Patient Batch Printing Search"}
            >Search</option>
            <option value="Patient Batch Printing Search and Print"
            selected={batchprintingState =="Patient Batch Printing Search and Print"}
            >Search and Print</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#batchPrinting">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="batchPrinting" name="Batch Printing Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="batchPrinting" name="Test Permission History" />
        ) : (
          ''
        )} */}
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
          {controlpatientState?<select
            onChange={(e) => props.patientContrlEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientControl"
            id="PatientControl"
          >
            <option value="Patient Control Deny"
            selected={controlpatientState =="Patient Control Deny"}
            >Deny</option>
            <option value="Patient Control Search and Fix"
            selected={controlpatientState =="Patient Control Search and Fix"}
            >Search and Fix</option>
            <option value="Patient Control Search and Save"
            selected={controlpatientState =="Patient Control Search and Save"}
            >Search and Save</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#control">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="control" name="Control Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="control" name="Test Permission History" />
        ) : (
          ''
        )} */}
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
          {debitpatientState?<select
            onChange={(e) => props.patientDebitCreditEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientDebit/Credit"
            id="PatientDebit/Credit"
          >
            <option value="Patient Debit/Credit Deny"
            selected={debitpatientState =="Patient Debit/Credit Deny"}
            >Deny</option>
            <option value="Patient Debit/Credit Allow"
            selected={debitpatientState =="Patient Debit/Credit Allow"}
            >Allow</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#debCredit">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="debCredit" name="Debit/Credit Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="debCredit" name="Test Permission History" />
        ) : (
          ''
        )} */}
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
          {editnotesState?<select
            onChange={(e) => props.patienteditNotsEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientEditNotes"
            id="PatientEditNotes"
          >
            <option value="Patient Edit Notes Deny"
            selected={editnotesState =="Patient Edit Notes Deny"}
            >Deny</option>
            <option value="Patient Edit Notes Allow"
            selected={editnotesState =="Patient Edit Notes Allow"}
            >Allow</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#edNotes">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="edNotes" name="Edit Notes Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="edNotes" name="Test Permission History" />
        ) : (
          ''
        )} */}
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
          {eligibilitypatientState?<select
            onChange={(e) => props.patientEligbEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientEligibility"
            id="PatientEligibility"
          >
            <option value="Patient Eligibility Deny"
            selected={eligibilitypatientState =="Patient Eligibility Deny"}
            >Deny</option>
            <option value="Patient Eligibility Access History"
            selected={eligibilitypatientState =="Patient Eligibility Access History"}
            >Access History</option>
            <option value="Patient Eligibility Access and Check"
            selected={eligibilitypatientState =="Patient Eligibility Access and Check"}
            >Access and Check</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#eligibility">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="eligibility" name="Eligibility Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="eligibility" name="Test Permission History" />
        ) : (
          ''
        )} */}
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
          {enhancedstatementprintingState?<select
            onChange={(e) => props.patientEnhancedStatementEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientEnhancedStatementPrinting"
            id="PatientEnhancedStatementPrinting"
          >
            <option value="Patient Enhanced Statement Printing Deny"
            selected={enhancedstatementprintingState =="Patient Enhanced Statement Printing Deny"}
            >Deny</option>
            <option value="Patient Enhanced Statement Printing Allow"
            selected={enhancedstatementprintingState =="Patient Enhanced Statement Printing Allow"}
            >Allow</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#enhStPrinting">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission
            modelTarget="enhStPrinting"
            name="Enhanced Statement Printing Permission History"
          ></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="enhStPrinting" name="Test Permission History" />
        ) : (
          ''
        )} */}
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
          {patientaccountmanagementState?<select
            onChange={(e) => props.patientAccMgmntEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientPatientAccountManagementAccess"
            id="PatientPatientAccountManagementAccess"
          >
            <option value="Patient Patient Account Management Access Only"
            selected={patientaccountmanagementState =="Patient Patient Account Management Access Only"}
            >Deny</option>
            <option value="Patient Patient Account Management Access Only"
            selected={patientaccountmanagementState =="Patient Patient Account Management Access Only"}
            >Access Only</option>
            <option value="Patient Patient Account Management Access and Modify"
            selected={patientaccountmanagementState =="Patient Patient Account Management Access and Modify"}
            >
              Access and Modify</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#ptAccMngmPermHis">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission
            modelTarget="ptAccMngmPermHis"
            name="Patient Account Management Permission History"
          ></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="ptAccMngmPermHis" name="Test Permission History" />
        ) : (
          ''
        )} */}
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
          {patientactivitypatientState?<select
            onChange={(e) => props.patientActivityEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientPatientActivity"
            id="PatientPatientActivity"
          >
            <option value="Patient Patient Activity Deny"
            selected={patientactivitypatientState =="Patient Patient Activity Deny"}
            >Deny</option>
            <option value="Patient Patient Activity Allow"
            selected={patientactivitypatientState =="Patient Patient Activity Allow"}
            >Allow</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#patActiv">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="patActiv" name="Patient Activity Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="patActiv" name="Test Permission History" />
        ) : (
          ''
        )} */}
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
          {patientmergeState?<select
            onChange={(e) => props.patientMergEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientPatientMerge"
            id="PatientPatientMerge"
          >
            <option value="Patient Patient Merge Deny"
            selected={patientmergeState =="Patient Patient Merge Deny"}
            >Deny</option>
            <option value="Patient Patient Merge Allow"
            selected={patientmergeState =="Patient Patient Merge Allow"}
            >Allow</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#patMergePerm">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="patMergePerm" name="Patient Merge Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="patMergePerm" name="Test Permission History" />
        ) : (
          ''
        )} */}
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
          {patientnotesState?<select
            onChange={(e) => props.patientNotsEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientPatientNotes"
            id="PatientPatientNotes"
          >
            <option value="Patient Patient Notes Deny"
            selected={patientnotesState =="Patient Patient Notes Deny"}
            >Deny</option>
            <option value="Patient Patient Notes Allow"
            selected={patientnotesState =="Patient Patient Notes Allow"}
            >Allow</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#patNotes">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="patNotes" name="Patient Notes Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="patNotes" name="Test Permission History" />
        ) : (
          ''
        )} */}
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
          {patientpaymentspatientState?<select
            onChange={(e) => props.patientPaymntEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientPatientPayments"
            id="PatientPatientPayments"
          >
            <option value="Patient Patient Payments Deny"
            selected={patientpaymentspatientState =="Patient Patient Payments Deny"}
            >Deny</option>
            <option value="Patient Patient Payments Allow"
            selected={patientpaymentspatientState =="Patient Patient Payments Allow"}
            >Allow</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#patPayment">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="patPayment" name="Patient Payments Permission Historys"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="patPayment" name="Test Permission History" />
        ) : (
          ''
        )} */}
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
          {patientportalinviteState?<select
            onChange={(e) => props.patientpaymPortalEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientPaymentPortalInvite"
            id="PatientPaymentPortalInvite"
          >
            <option value="Patient Payment Portal Invite Deny"
            selected={patientportalinviteState =="Patient Payment Portal Invite Deny"}
            >Deny</option>
            <option value="Patient Payment Portal Invite Allow"
            selected={patientportalinviteState =="Patient Payment Portal Invite Allow"}
            >Allow</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#payPortInv">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="payPortInv" name="Payment Portal Invite Permission Historys"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="payPortInv" name="Test Permission History" />
        ) : (
          ''
        )} */}
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
          {piissnpatientState?<select
            onChange={(e) => props.patientIdInfoSSnEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientPersonallyIdentifiableInformationSSN"
            id="PatientPersonallyIdentifiableInformationSSN"
          >
            <option value="Patient Personally Identifiable Information-SSN Deny"
            selected={piissnpatientState =="Patient Personally Identifiable Information-SSN Deny"}
            >Deny</option>
            <option value="Patient Personally Identifiable Information-SSN Allow"
            selected={piissnpatientState =="Patient Personally Identifiable Information-SSN Allow"}
            >Allow</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#piissnPH">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission
            modelTarget="piissnPH"
            name="Personally Identifiable Information - SSN Permission History"
          ></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="piissnPH" name="Test Permission History" />
        ) : (
          ''
        )} */}
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
         {trackingpatientState? <select
            onChange={(e) => props.patientTrackngEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PatientTracking"
            id="PatientTracking"
          >
            <option value="Patient Tracking Deny"
            selected={trackingpatientState =="Deny"}
            >Deny</option>
            <option value="Patient Tracking Search"
            selected={trackingpatientState =="Patient Tracking Search"}
            >Search</option>
            <option value="Patient Tracking Search, Fix and Save"
            selected={trackingpatientState =="Patient Tracking Search, Fix and Save"}
            >Search, Fix and Save</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#track">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="track" name="Tracking Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="track" name="Test Permission History" />
        ) : (
          ''
        )} */}
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
