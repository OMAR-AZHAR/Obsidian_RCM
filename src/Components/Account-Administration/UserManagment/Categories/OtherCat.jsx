import { useDispatch, useSelector } from 'react-redux';

import { PaymentPortal } from '../../../../Redux/features/UserManagement/UserProfile/PermissionSlice';
import ModalPermission from '../../Security/ModalPermission';
import ModelUserManagment from './ModelUserManagment';
export default function OtherCat(props) {
  const dispatch = useDispatch();
  const inter = useSelector((state) => state.PermissionCustomers.interfacetracking);
  return (
    <div className="">
      <div className="col-md-12 d-flex">
        <div className="col-md-5 mt-3">
          <label>Payment Portal</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.otherPaymentPortal(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="OtherPaymentPortal"
            id="OtherPaymentPortal"
          >
            <option value="Other Payment Portal Deny">Deny </option>
            <option value="Other Payment Portal Allow">Allow</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#paymentPortal">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="paymentPortal" name="Payment Portal Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="paymentPortal" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to login to the Payment Portal Admin site to update the banner configuration and
          settings.
        </p>
      )}
    </div>
  );
}
