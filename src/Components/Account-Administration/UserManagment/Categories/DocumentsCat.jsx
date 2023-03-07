import { useDispatch, useSelector } from 'react-redux';

import { DocumentManagementEdit } from '../../../../Redux/features/UserManagement/UserProfile/PermissionEditSlice';
import ModalPermission from '../../Security/ModalPermission';
import ModelUserManagment from './ModelUserManagment';
export default function DocumentsCat(props) {
  const dispatch = useDispatch();
  const al = useSelector((state) => state.PermissionCustomers.documentmanagement);
  return (
    <div className="">
      <div className="col-md-12 d-flex">
        <div className="col-md-5 mt-3">
          <label>Document Management</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.documentDocMangmnt(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="DocumentsDocumentManagement"
            id="DocumentsDocumentManagement"
          >
            <option value="Documents Document Management Deny">Deny </option>
            <option value="Documents Document Management Access Only">Access Only</option>
            <option value="Documents Document Management Access and Modify">Access and Modify</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#docMangmnt">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="docMangmnt" name="Document Management Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="docMangmnt" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && <p>Controls the ability to access and upload documents. </p>}
    </div>
  );
}
