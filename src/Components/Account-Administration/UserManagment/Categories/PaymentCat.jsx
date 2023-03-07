import { useDispatch, useSelector } from 'react-redux';

import {
  ERAautoApply,
  InsurancePayments,
  PatientActivityPayment,
  PatientPayments,
  TrackingPayment,
} from '../../../../Redux/features/UserManagement/UserProfile/PermissionSlice';
import ModalPermission from '../../Security/ModalPermission';
import ModelUserManagment from './ModelUserManagment';
export default function PaymentCat(props) {
  const dispatch = useDispatch();
  const patient_payments = useSelector((state) => state.PermissionCustomers.patient_payments);
  const insurancepayments = useSelector((state) => state.PermissionCustomers.insurancepayments);
  const eraautoapply = useSelector((state) => state.PermissionCustomers.eraautoapply);
  const patientactivitypayment = useSelector((state) => state.PermissionCustomers.patientactivitypayment);
  const trackingpayments = useSelector((state) => state.PermissionCustomers.trackingpayments);
  return (
    <div className="">
      <div className="col-md-12 d-flex">
        <div className="col-md-5 mt-3">
          <label>Patient Payments</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.paymentPatientPymnt(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PaymentPatientPayments"
            id="PaymentPatientPayments"
          >
            <option value="Payment Patient Payments Deny">Deny </option>
            <option value="Payment Patient Payments Allow">Allow</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#patPaymnt">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="patPaymnt" name="Patient Payments Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="patPaymnt" name="Test Permission History" />
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
      {/*Second Group*/}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Insurance Payments</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.paymentInsurance(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PaymentInsurancePayments"
            id="PaymentInsurancePayments"
          >
            <option value="Payment Insurance Payments Deny">Deny</option>
            <option value="Payment Insurance Payments Access Only">Access Only</option>
            <option value="Payment Insurance Payments Access and Modify">Access and Modify</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#insPaymnt">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="insPaymnt" name="Insurance Payments Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="insPaymnt" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p>Controls the ability to post new insurance payments and view existing insurance checks.</p>
      )}
      {/*3rd Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>ERA Auto Apply</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.paymentEraAutoApply(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PaymentERAAuto"
            id="PaymentERAAuto"
          >
            <option value="Payment ERA Auto Deny">Deny</option>
            <option value="Payment ERA Auto Apply Reports Only">Reports Only</option>
            <option value="Payment ERA Auto Apply Apply and Report">Apply and Report</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#eraAutoPerrm">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="eraAutoPerrm" name="ERA Auto Apply Permission Historys"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="eraAutoPerrm" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && <p>Controls the ability to use the Electronic Remittance Advice (ERA) feature.</p>}
      {/*4th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Patient Activity</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.paymentPatientActvty(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PaymentPatientActivity"
            id="PaymentPatientActivity"
          >
            <option value="Payment Patient Activity Deny">Deny</option>
            <option value="Payment Patient Activity Allow">Allow</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#patActivity">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="patActivity" name="Patient Activity Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="patActivity" name="Test Permission History" />
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
      {/*5th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Tracking</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.paymentTrackng(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PaymentTracking"
            id="PaymentTracking"
          >
            <option value="Payment Tracking Deny">Deny</option>
            <option value="Payment Tracking Search">Search</option>
            <option value="Payment Tracking Search, Fix and Save">Search, Fix and Save</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#trackingPern">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="trackingPern" name="Tracking Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="trackingPern" name="Test Permission History" />
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
