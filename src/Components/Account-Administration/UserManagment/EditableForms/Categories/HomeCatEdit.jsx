import { useDispatch, useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import ModalPermission from '../../../Security/ModalPermission';
// import ModelUserManagment from "./ModelUserManagment";
import ModelUserManagment from '../../Categories/ModelUserManagment';
export default function HomeCatEdit(props) {
  const dashboard = useSelector((state) => state.EditUser?.edituserpermission?.homeDashboard);
  const messaging = useSelector((state) => state.EditUser?.edituserpermission?.homeMessaging);
  const contacts = useSelector((state) => state.EditUser?.edituserpermission?.homeContacts);
  const administertasks = useSelector((state) => state.EditUser?.edituserpermission?.homeAdministerTasks);
  const [dashboardState, setdashboardState] = useState('');
  const [messagingState, setmessagingState] = useState('');
  const [contactsState, setcontactsState] = useState('');
  const [administertasksState, setadministertasksState] = useState('');
  useEffect(() => {
    setdashboardState(dashboard)
    setmessagingState(messaging)
    setcontactsState(contacts)
    setadministertasksState(administertasks)
  
  }, [
    dashboard,
  messaging,
  contacts,
  administertasks,
  ]);
  return (
    <div>
      {/*1st Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Dashboard</label>
        </div>
        <div className="col-md-5 mt-1">
        {dashboardState? <select
            onChange={(e) => props.homeDashboardEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="HomeDashboardDeny"
            id="HomeDashboardDeny"
          >
            <option value="Home Dashboard Deny"
            selected={dashboardState =="Home Dashboard Deny"}
            >Deny</option>
            <option value="Home Dashboard Access Only"
            selected={dashboardState =="Home Dashboard Access Only"}
            >Access Only</option>
            <option value="Home Dashboard Access and Modify"
            selected={dashboardState =="Home Dashboard Access and Modify"}
            >Access and Modify</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#dashboard">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="dashboard" name="Dashboard Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="dashboard" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && <p>Controls the ability to view, modify, and create custom dashboards.</p>}
      {/* 2nd Group */}
      <div className="col-md-12 d-flex">
        <div className="col-md-5 mt-3">
          <label>Messaging</label>
        </div>
        <div className="col-md-5 mt-1">
        {messagingState?<select
            onChange={(e) => props.homeMessgingEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="HomeMessaging"
            id="HomeMessaging"
          >
            <option value="Home Messaging Deny"
            selected={messagingState =="Home Messaging Deny"}
            >Deny </option>
            <option value="Home Messaging Access Only"
            selected={messagingState =="Home Messaging Access Only"}
            >Access Only</option>
            <option value="Home Messaging Access and Modify"
            selected={messagingState =="Home Messaging Access and Modify"}
            >Access and Modify</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#messaging">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="messaging" name="Messaging Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="messaging" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && <p>Controls the ability to send and receive messages.</p>}

      {/*3rd Group*/}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Contacts</label>
        </div>
        <div className="col-md-5 mt-1">
        { contactsState?<select
            onChange={(e) => props.homeContactEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="HomeContacts"
            id="HomeContacts"
          >
            <option value="Home Contacts Deny"
            selected={contactsState =="Home Contacts Deny"}
            >Deny</option>
            <option value="Home Contacts Access Only"
            selected={contactsState =="Home Contacts Access Only"}
            >Access Only</option>
            <option value="Home Contacts Access and Modify"
            selected={contactsState =="Home Contacts Access and Modify"}
            >Access and Modify</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#contact">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="contact" name="Contacts Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="contact" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && <p>Controls the ability to view, modify, and create messaging contact groups.</p>}
      {/*4th Group*/}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label>Administer Tasks</label>
        </div>
        <div className="col-md-5 mt-1">
        {administertasksState?<select
            onChange={(e) => props.homeAdminstrTaskEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="HomeAdministerTasks"
            id="HomeAdministerTasks"
          >
            <option value="Home Administer Tasks Own Tasks Only"
            selected={administertasksState =="Home Administer Tasks Own Tasks Only"}
            >Own Tasks Only</option>
            <option value="Home Administer Tasks View All"
            selected={administertasksState =="Home Administer Tasks View All"}
            >View All</option>
            <option value="Home Administer Tasks Administer All"
            selected={administertasksState =="Home Administer Tasks Administer All"}
            >Administer All</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#admTask">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {props.permissionType == 2 ? (
          <ModalPermission modelTarget="admTask" name="Administer Tasks Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="admTask" name="Test Permission History" />
        ) : (
          ''
        )}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to view, create, and modify tasks assigned to other users. When set to Own Tasks Only,
          users will be able to create and modify their own tasks and create tasks for other users, but cannot view or
          modify tasks for other users.
        </p>
      )}
    </div>
  );
}
