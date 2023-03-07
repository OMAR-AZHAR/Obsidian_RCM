import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalPermission from '../../../Security/ModalPermission';
import ModelUserManagment from '../../Categories/ModelUserManagment';
// import ModelUserManagment from "./ModelUserManagment";
export default function PaymentCatEdit(props) {
  const dispatch = useDispatch();
  const patient_payments = useSelector((state) => state.EditUser?.edituserpermission?.paymentsPatient);
  const insurancepayments = useSelector((state) => state.EditUser?.edituserpermission?.paymentsInsurance);
  const eraautoapply = useSelector((state) => state.EditUser?.edituserpermission?.PaymentEraAutoApply);
  const patientactivitypayment = useSelector((state) => state.EditUser?.edituserpermission?.paymentPatientactivity);
  const trackingpayments = useSelector((state) => state.EditUser?.edituserpermission?.paymentsTracking);

  const [patient_paymentsState, setpatient_paymentsState] = useState('');
  const [insurancepaymentsState, setinsurancepaymentsState] = useState('');
  const [eraautoapplyState, seteraautoapplyState] = useState('');
  const [patientactivitypaymentState, setpatientactivitypaymentState] = useState('');
  const [trackingpaymentsState, settrackingpaymentsState] = useState('');

  useEffect(() => {
    setpatient_paymentsState(patient_payments)
    setinsurancepaymentsState(insurancepayments)
    seteraautoapplyState(eraautoapply)
    setpatientactivitypaymentState(patientactivitypayment)
    settrackingpaymentsState(trackingpayments)
  }, [
    patient_payments, insurancepayments, eraautoapply, patientactivitypayment, trackingpayments

  ]);
  return (
    <div className="">
      <div className="col-md-12 d-flex">
        <div className="col-md-5 mt-3">
          <label>Patient Payments</label>
        </div>
        <div className="col-md-5 mt-1">
        {patient_paymentsState?<select
            onChange={(e) => props.paymentPatientPymntEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PaymentPatientPayments"
            id="PaymentPatientPayments"
          >
            <option value="Payment Patient Payments Deny"
            selected={patient_paymentsState =="Payment Patient Payments Deny"}
            >Deny </option>
            <option value="Payment Patient Payments Allow"
            selected={patient_paymentsState =="Payment Patient Payments Allow"}
            >Allow</option>
          </select>:''}
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
        {insurancepaymentsState?<select
            onChange={(e) => props.paymentInsuranceEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PaymentInsurancePayments"
            id="PaymentInsurancePayments"
          >
            <option value="Payment Insurance Payments Deny"
            selected={insurancepaymentsState =="Payment Insurance Payments Deny"}
            >Deny</option>
            <option value="Payment Insurance Payments Access Only"
            selected={insurancepaymentsState =="Payment Insurance Payments Access Only"}
            >Access Only</option>
            <option value="Payment Insurance Payments Access and Modify"
            selected={insurancepaymentsState =="Payment Insurance Payments Access and Modify"}
            >Access and Modify</option>
          </select>:''}
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
        {eraautoapplyState?<select
            onChange={(e) => props.paymentEraAutoApplyEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PaymentERAAuto"
            id="PaymentERAAuto"
          >
            <option value="Payment ERA Auto Deny"
            selected={eraautoapplyState =="Payment ERA Auto Deny"}
            >Deny</option>
            <option value="Payment ERA Auto Apply Reports Only"
            selected={eraautoapplyState =="Payment ERA Auto Apply Reports Only"}
            >Reports Only</option>
            <option value="Payment ERA Auto Apply Apply and Report"
            selected={eraautoapplyState =="Payment ERA Auto Apply Apply and Report"}
            >Apply and Report</option>
          </select>:''}
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
        {patientactivitypaymentState? <select
            onChange={(e) => props.paymentPatientActvtyEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PaymentPatientActivity"
            id="PaymentPatientActivity"
          >
            <option value="Payment Patient Activity Deny"
            selected={patientactivitypaymentState =="Payment Patient Activity Deny"}
            >Deny</option>
            <option value="Payment Patient Activity Allow"
            selected={patientactivitypaymentState =="Payment Patient Activity Allow"}
            >Allow</option>
          </select>:''}
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
        {trackingpaymentsState?<select
            onChange={(e) => props.paymentTrackngEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="PaymentTracking"
            id="PaymentTracking"
          >
            <option value="Payment Tracking Deny"
            selected={trackingpaymentsState =="Payment Tracking Deny"}
            >Deny</option>
            <option value="Payment Tracking Search"
            selected={trackingpaymentsState =="Payment Tracking Search"}
            >Search</option>
            <option value="Payment Tracking Search, Fix and Save"
            selected={trackingpaymentsState =="Payment Tracking Search, Fix and Save"}
            >Search, Fix and Save</option>
          </select>:''}
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
