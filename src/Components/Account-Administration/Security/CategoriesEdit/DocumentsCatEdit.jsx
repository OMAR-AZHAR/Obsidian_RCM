import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function DocumentsCatEdit(props) {
  const dispatch = useDispatch();
  const documentmanagement = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.documentmanagement);
  const [documentmanagementState, setdocumentmanagementState] = useState('');
 

  useEffect(() => {
    setdocumentmanagementState(documentmanagement)
  }, [
    documentmanagement
  ]);
  return (
    <div className="">
      <div className="col-md-12 d-flex">
        <div className="col-md-5 mt-3">
          <label>Document Management</label>
        </div>
        <div className="col-md-5 mt-1">
         {documentmanagementState? <select
            onChange={(e) => props.documentDocMangmntEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="DocumentsDocumentManagement"
            id="DocumentsDocumentManagement"
          >
            <option value="Documents Document Management Deny"
            selected={documentmanagementState =="Documents Document Management Deny"}
            >Deny </option>
            <option value="Documents Document Management Access Only"
            selected={documentmanagementState =="Documents Document Management Access Only"}
            >Access Only</option>
            <option value="Documents Document Management Access and Modify"
            selected={documentmanagementState =="Documents Document Management Access and Modify"}
            >Access and Modify</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#docMangmnt">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="docMangmnt" name="Document Management Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="docMangmnt" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && <p>Controls the ability to access and upload documents. </p>}
    </div>
  );
}
