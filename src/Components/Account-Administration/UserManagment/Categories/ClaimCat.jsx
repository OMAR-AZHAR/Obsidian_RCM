import { useDispatch, useSelector } from 'react-redux';

import ModalPermission from '../../Security/ModalPermission';
import ModelUserManagment from './ModelUserManagment';

export default function ClaimCat(props) {
  const dispatch = useDispatch();

  return (
    <div className="">
      <div className="col-md-12 d-flex">
        <div className="col-md-5 mt-3">
          <label className="fw-bold">Professional Claim</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="ClaimProfessionalClaim"
            id="ClaimProfessionalClaim"
            onChange={(e) => props.claimProfessionalClaim(e.target.value)}
          >
            <option value="Claim Professional Claim Deny">Deny </option>
            <option value="Claim Professional Claim Access Only">Access Only</option>
            <option value="Claim Professional Claim Access and Modify">Access and Modify</option>
            <option value="Claim Professional Claim Access, Modify, and Delete">Access, Modify, and Delete</option>
          </select>
        </div>

        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#claimProfessional">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission
            modelTarget="claimProfessional"
            name="Professional Claim Permission History"
          ></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="claimProfessional" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to view, create, modify, and delete professional claims. When set to Access, Modify, and
          Delete, the user will be able to view, update, create, and delete professional claims.
        </p>
      )}

      {/*Second Group*/}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label className="fw-bold">Institutional Claim</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.claimInstitutionalClaim(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="ClaimInstitutionalClaim"
            id="ClaimInstitutionalClaim"
          >
            <option value="AccountAdministrationBillPaymentDeny">Deny</option>
            <option value="Claim Institutional Claim Access Only">Access Only</option>
            <option value="Claim Institutional Claim Access and Modify">Access and Modify</option>
            <option value="Claim Institutional Claim Access, Modify, and Delete">Access, Modify, and Delete</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#instClaim">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="instClaim" name="Institutional Claim Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="instClaim" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to view, create, modify, and delete institutional claims. When set to Access, Modify, and
          Delete, the user will be able to view, update, create, and delete institutional claims.
        </p>
      )}
      {/*3rd Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label className="fw-bold">Batch Printing</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.claimBacthPrinting(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="ClaimBatchPrinting"
            id="ClaimBatchPrinting"
          >
            <option value="Claim Batch Printing Deny">Deny</option>
            <option value="Claim Batch Printing Search">Search</option>
            <option value="Claim Batch Printing Search and Print">Search and Print</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#batchPrinting">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="batchPrinting" name="Batch Printing Permission Historys"></ModalPermission>
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
          search/print. When set to Search and Print, users can perform searches and print from the results in a batch.
        </p>
      )}
      {/*4th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label className="fw-bold">Claim Follow Up</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.claimFollowUp(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="ClaimFollowUp"
            id="ClaimFollowUp"
          >
            <option value="Claim Claim Follow Up Deny">Deny</option>
            <option value="Claim Claim Follow Up Access Only">Access Only</option>
            <option value="Claim Claim Follow Up Access and Modify">Access and Modify</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#claimFollowUp">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="claimFollowUp" name="Claim Follow Up Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="follclaimFollowUpowUpMg" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to use the Follow Up Management feature to view and update follow up related information
          for claims.
        </p>
      )}
      {/*5th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label className="fw-bold">Clearinghouse Reports</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.claimClearingHouseReports(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="ClaimClearinghouseReports"
            id="ClaimClearinghouse Reports"
          >
            <option value="Claim Clearinghouse Reports Deny">Deny</option>
            <option value="Claim Clearinghouse Reports Allow">Allow</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#clearingHouseRep">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission
            modelTarget="clearingHouseRep"
            name="Clearinghouse Reports Permission History"
          ></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="clearingHouseRep" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p>Controls the ability to view clearinghouse reports within the Claim Tracker screen.</p>
      )}
      {/*6th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label className="fw-bold">Control</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.claimControl(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="ClaimControl"
            id="ClaimControl"
          >
            <option value="Claim Control Deny">Deny</option>
            <option value="Claim Control Search and Fix">Search and Fix</option>
            <option value="Claim Control Search and Save">Search and Save</option>
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
      {/*7th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label className="fw-bold">NY Workers Comp Form</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.claimNyWorkersCompForm(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="ClaimNYWorkersCompForm"
            id="ClaimNYWorkersCompForm"
          >
            <option value="Claim NY Workers Comp Form Deny">Deny</option>
            <option value="Claim NY Workers Comp Form Allow">Allow</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#nyWorkerComForm">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission
            modelTarget="nyWorkerComForm"
            name="NY Workers Comp Form Permission History"
          ></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="nyWorkerComForm" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to print claims using the NY Workers Comp Forms from either the Claim or Batch Claim
          Printing screens.
        </p>
      )}
      {/*8th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label className="fw-bold">Patient Activity</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.claimPatientActivity(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="ClaimPatientActivity"
            id="ClaimPatientActivity"
          >
            <option value="Claim Patient Activity Deny">Deny</option>
            <option value="Claim Patient Activity Allow">Allow</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#patientActivity">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="patientActivity" name="Patient Activity Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="patientActivity" name="Test Permission History" />
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
      {/*9th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label className="fw-bold">Patient Payments</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.claimPatientPayment(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="ClaimPatientPayments"
            id="ClaimPatientPayments"
          >
            <option value="Claim Patient Payments Deny">Deny</option>
            <option value="Claim Patient Payments Allow">Allow</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#patientPayment">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="patientPayment" name="Patient Payments Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="patientPayment" name="Test Permission History" />
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
      {/*10th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label className="fw-bold">Tracking</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.claimTracking(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="ClaimTracking"
            id="ClaimTracking"
          >
            <option value="Claim Tracking Deny">Deny</option>
            <option value="Claim Tracking Search">Search</option>
            <option value="Claim Tracking Search, Fix, and Save">Search, Fix, and Save</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#tracking">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="tracking" name="Tracking Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="tracking" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to use the Claim Tracker, Statement Tracker, and Payment Tracker features to view past
          claim, statement, and payment transactions. When set to Search and Fix, users will be able to mark records
          within the search results as fixed. In addition, users will be able to update patient addresses within
          Statement Tracker based on USPS recommendations
        </p>
      )}
    </div>
  );
}
