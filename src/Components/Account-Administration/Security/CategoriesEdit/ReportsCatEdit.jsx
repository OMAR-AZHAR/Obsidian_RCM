import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
export default function ReportsCatEdit(props) {
  const dispatch = useDispatch();
  const reports = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.reportsReports);
  const ARMReports = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.reportsARManagement);
  const managementreports = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.reportsmanagementreports);
  const reportbuilder = useSelector((state) => state.ShowAllRolesSlice.editPermissionData.reportbuilder);

  const [reportsState, setreportsState] = useState('');
  const [ARMReportsState, setARMReportsState] = useState('');
  const [managementreportsState, setmanagementreportsState] = useState(''); 
  const [reportbuilderState, setreportbuilderState] = useState('');

  useEffect(() => {
    setreportsState(reports)
    setARMReportsState(ARMReports)
    setmanagementreportsState(managementreports)
    setreportbuilderState(reportbuilder)
  }, [
    reports,ARMReports,managementreports,reportbuilder
  ]);

  return (
    <div className="">
      <div className="col-md-12 d-flex">
        <div className="col-md-5 mt-3">
          <label>Report</label>
        </div>
        <div className="col-md-5 mt-1">
          {reportsState?<select
            onChange={(e) => props.reportsReportsEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="ReportsReports"
            id="ReportsReports"
          >
            <option value="Reports Reports Deny"
            selected={reportsState =="Reports Reports Deny"}
            >Deny </option>
            <option value="Reports Reports Allowed Reports Only"
            selected={reportsState =="Reports Reports Allowed Reports Only"}
            >Allowed Reports Only</option>
            <option value="Reports Reports Standard Reports and Allowed Reports"
            selected={reportsState =="Reports Reports Standard Reports and Allowed Reports"}
            >
              Standard Reports and Allowed Reports
            </option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#report">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="report" name="Reports Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="report" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to run standard and custom reports within the Report Viewer. When set to Allowed Reports
          Only, users can only view standard and custom reports that they have been given permission to view.
        </p>
      )}

      {/*Second Group*/}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>A/R Management Reports</label>
        </div>
        <div className="col-md-5 mt-1">
          {ARMReportsState?<select
            onChange={(e) => props.reportsArMgmntReportsEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="ReportsA/R ManagementReports"
            id="ReportsA/R ManagementReports"
          >
            <option value="Reports A/R Management Reports Deny"
            selected={ARMReportsState =="Reports A/R Management Reports Deny"}
            >Deny </option>
            <option value="Reports A/R Management Reports Allowed Reports Only"
            selected={ARMReportsState =="Reports A/R Management Reports Allowed Reports Only"}
            >Allowed Reports Only</option>
            <option value="Reports A/R Management Reports Standard Reports and Allowed Reports"
            selected={ARMReportsState =="Reports A/R Management Reports Standard Reports and Allowed Reports"}
            >
              Standard Reports and Allowed Reports
            </option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#arMngmRep">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="arMngmRep" name="A/R Management Reports Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="arMngmRep" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to run standard and custom reports within the Report Viewer that are saved to the A/R
          Management Reports category. When set to Allowed Reports Only, users can only view standard and custom reports
          in the A/R Management category that they have been given permission to view.
        </p>
      )}
      {/*3rd Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Management Reports</label>
        </div>
        <div className="col-md-5 mt-1">
          {managementreportsState?<select
            onChange={(e) => props.reportMngmntReportsEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="ReportsManagementReports"
            id="ReportsManagementReports"
          >
            <option value="Reports Management Reports Deny"
            selected={managementreportsState =="Reports Management Reports Deny"}
            >Deny </option>
            <option value="Reports Management Reports Allowed Reports Only"
            selected={managementreportsState =="Reports Management Reports Allowed Reports Only"}
            >Allowed Reports Only</option>
            <option value="Reports Management Reports Standard Reports and Allowed Reports"
            selected={managementreportsState =="Reports Management Reports Standard Reports and Allowed Reports"}
            >
              Standard Reports and Allowed Reports
            </option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#mngmntRep">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="mngmntRep" name="Management Reports Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="mngmntRep" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to run standard and custom reports within the Report Viewer that are saved to the
          Management Reports category. When set to Allowed Reports Only, users can only view standard and custom reports
          in the Management Reports category that they have been given permission to view.
        </p>
      )}
      {/*4th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Report Builder</label>
        </div>
        <div className="col-md-5 mt-1">
          {reportbuilderState?<select
            onChange={(e) => props.reportReportsBuilderEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="ReportsReportBuilder"
            id="ReportsReportBuilder"
          >
            <option value="Reports Report Builder Deny"
            selected={reportbuilderState =="Reports Report Builder Deny"}
            >Deny </option>
            <option value="Reports Report Builder Build and Edit Reports"
            selected={reportbuilderState =="Reports Report Builder Build and Edit Reports"}
            >Build and Edit Reports</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#repBuilder">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="repBuilder" name="Report Builder Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="repBuilder" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && <p>Controls the ability to create and modify custom reports.</p>}
    </div>
  );
}
