import { useDispatch, useSelector } from 'react-redux';

import {
  AccountSetup,
  BillPayment,
  MonthlyInvoice,
} from '../../../../Redux/features/UserManagement/UserProfile/PermissionSlice';
import ModalPermission from '../../Security/ModalPermission';
import ModelUserManagment from './ModelUserManagment';
export default function AccountAdminCat(props) {
  const dispatch = useDispatch();

  return (
    <div className="">
      <div className="col-md-12 d-flex">
        <div className="col-md-5 mt-3">
          <label className="fw-bold">Account Setup</label>
        </div>
        {/* dispatch(AccountSetup(e.target.value)) */}
        <div className="col-md-5 mt-1">
          <select
      
            onChange={(e) => props.fetchdata(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="AccountAdministrationAccountSetup"
            id="AccountAdministrationAccountSetup"
          >
            <option value="Account Administration Account Setup Deny">Deny </option>
            <option value="Account Administration Account Setup Allow">Allow</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button type='button' className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#AccSetupModel">
            <i className="fa fa-undo"></i>
          </button>
        </div>

        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="AccSetupModel" name="Account Setup Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="AccSetupModel" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p className="mt-1">
          Controls the ability to create new customers within the current account as well as providers within the
          current customer. Note: The user must also have Access and Modify set for the provider permission in order to
          create new providers and, in certain situations where a TaxID Add-On is needed, the Bill Payment permission.
        </p>
      )}
      {/*Second Group*/}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label className="fw-bold">Bill Payment</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.billpayment(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="AccountAdministrationBillPayment"
            id="AccountAdministrationBillPayment"
          >
            <option value="Account Administration Bill Payment Deny">Deny</option>
            <option value="Account Administration Bill Payment Allow">Allow</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button type='button' className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#billPaymentModal">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="billPaymentModal" name="Bill Payment Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="billPaymentModal" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p className="mt-1">
          Controls the ability to pay invoices, view payment history, and create/edit payment profiles. This includes
          paying Tax ID Add-On invoices for new providers (requires Access and Modify for Provider permission).
        </p>
      )}
      {/*3rd Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label className="fw-bold">Monthly Invoice</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.monthlyInvoice(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="AccountAdministrationMonthlyInvoice"
            id="AccountAdministrationMonthlyInvoice"
          >
            <option value="Account Administration Monthly Invoice Deny">Deny</option>
            <option value="Account Administration Monthly Invoice Allow">Allow</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button
          type='button'
            className="btn btn-outline-primary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#monthlyinvoiceModal"
          >
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission
            modelTarget="monthlyinvoiceModal"
            name="Monthly Invoice Permission History"
          ></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="monthlyinvoiceModal" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p className="mt-1">Controls the ability to view the invoice history for the current account..</p>
      )}
    </div>
  );
}
