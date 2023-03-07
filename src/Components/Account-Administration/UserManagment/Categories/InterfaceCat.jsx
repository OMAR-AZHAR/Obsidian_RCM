import { useDispatch, useSelector } from 'react-redux';

import { InterfaceTracking } from '../../../../Redux/features/UserManagement/UserProfile/PermissionSlice';
import ModalPermission from '../../Security/ModalPermission';
import ModelUserManagment from './ModelUserManagment';
export default function InterfaceCat(props) {
  const dispatch = useDispatch();
  const inter = useSelector((state) => state.PermissionCustomers.interfacetracking);
  return (
    <div className="">
      <div className="col-md-12 d-flex">
        <div className="col-md-5 mt-3">
          <label>Interface Tracking</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.interfaceInterfceTracking(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="InterfaceInterfaceTracking"
            id="InterfaceInterfaceTracking"
          >
            <option value="Interface Interface Tracking Deny">Deny </option>
            <option value="Interface Interface Tracking Search">Search</option>
            <option value="Interface Interface Tracking Search and Modify">Search and Modify</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#intefTracking">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="intefTracking" name="Interface Tracking Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="intefTracking" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to use the Interface Tracker feature to view information about messages received via an
          interface.
        </p>
      )}
    </div>
  );
}
