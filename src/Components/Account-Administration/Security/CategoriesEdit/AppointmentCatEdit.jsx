
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AppointmentCatEdit = (props) => {
  const dispatch = useDispatch();
  // permissions data from redux
  const permissionEdit = useSelector((state) => state.ShowAllRolesSlice.editPermissionData);
  // states for individual permissions
  // getting local storage values for persistensy
  console.log("our perms",permissionEdit);
  const scheduler = permissionEdit.appointmentsScheduler;
  const schedulerconfiguration = permissionEdit.AppointmentsSchedulerConfiguration;
  const appointmentcontrol = permissionEdit.appointmentControl;
  const batchprinting = permissionEdit.appointmentBatchPrinting;
  const department = permissionEdit.appointmentsDepartment;
  const patient_payments = permissionEdit.appointmentsPatientPayments;
  const patientactivityappointments = permissionEdit.appointmentsPatientActivity

  // set values using useffect
  const [schedulerState, setschedulerState] = useState('');
  const [schedulerconfigurationState, setschedulerconfigurationState] = useState('');
  const [appointmentcontrolState, setappointmentcontrolState] = useState('');
  const [batchprintingState, setbatchprintingState] = useState('');
  const [departmentState, setdepartmentState] = useState('');
  const [patientactivityappointmentState, setpatientactivityappointmentsState] = useState('');
  const [patient_paymentsState, setpatient_paymentsState] = useState('');

  useEffect(() => {
    setschedulerState(scheduler);
    setschedulerconfigurationState(schedulerconfiguration);
    setappointmentcontrolState(appointmentcontrol);
    setbatchprintingState(batchprinting);
    setdepartmentState(department);
    setpatient_paymentsState(patient_payments)
    setpatientactivityappointmentsState(patientactivityappointments)
  }, [
    scheduler,
    schedulerconfiguration,
    appointmentcontrol,
    department,
    batchprinting,
    patientactivityappointments,
    patient_payments
  ]);
  console.log("our permsons", permissionEdit);
  return (
    <div className="">
      <div className="col-md-12 d-flex">
        <div className="col-md-5 mt-3">
          <label className="fw-bold">Scheduler</label>
        </div>
        <div className="col-md-5 mt-1">
          
          <select
            onChange={(e) => props.appointmentScheduleEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="AppointmentsScheduler"
            id="AppointmentsScheduler"
          >
            <option value="Appointments Scheduler Deny"
            selected={schedulerState == "Deny"}
            >Deny </option>
            <option value="Appointments Scheduler Access and Request"
            selected={schedulerState == "Appointments Scheduler Access and Request"}
            >Access and Request</option>
            <option value="Appointments Scheduler Access and Schedule"
            selected={schedulerState == "Appointments Scheduler Access and Schedule"}
            >Access and Schedule</option>
          </select>
        
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#schedular">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="schedular" name="Scheduler Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="schedular" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to view, modify, and create appointments and appointment waiting list requests. Note:
          User scheduler permissions can optionally be managed separately for each Department. Access controls can be
          enabled and updated within the Departments configuration screen.
        </p>
      )}
      {/*Second Group*/}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label className="fw-bold">Scheduler Configuration</label>
        </div>
        <div className="col-md-5 mt-1">
          {schedulerconfigurationState?
          <select
          onChange={(e) => props.appointmentScheduleConfigurationEdit(e.target.value)}
          disabled={props.permissionStatus}
          className="form-select form-select-sm"
          name="AppointmentsSchedulerConfiguration"
          id="AppointmentsSchedulerConfiguration"
        >
          <option value="Appointments Scheduler Configuration Deny"
          selected={schedulerconfigurationState=="Appointments Scheduler Configuration Deny"}
          >Deny</option>
          <option value="Appointments Scheduler Configuration Access Only"
          selected={schedulerconfigurationState=="Appointments Scheduler Configuration Access Only"}
          >Access Only</option>
          <option value="Appointments Scheduler Configuration Access and Modify"
          selected={schedulerconfigurationState=="Appointments Scheduler Configuration Access and Modify"}
          >Access and Modify</option>
        </select>
        :''}
          
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#schedularConfig">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission
            modelTarget="schedularConfig"
            name="Scheduler Configuration Permission History"
          ></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="schedularConfig" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to view, modify, and create Resources, Appt Statuses, and Appt Types used within the
          Scheduler in addition to modifying the customer configuration settings for Appointments.
        </p>
      )}
      {/*3rd Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label className="fw-bold">Appointment Control</label>
        </div>
        <div className="col-md-5 mt-1">
        { appointmentcontrolState? <select
            onChange={(e) => props.appointmentControlEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="AppointmentsAppointmentControl"
            id="AppointmentsAppointmentControl"
          >
            <option value="Appointments Appointment Control Deny"
            selected={appointmentcontrolState =="Appointments Appointment Control Deny"}
            >Deny</option>
            <option value="Appointments Appointment Control Search Only"
            selected={appointmentcontrolState =="Appointments Appointment Control Search Only"}
            >Search only</option>
            <option value="Appointments Appointment Control Search and Update"
            selected={appointmentcontrolState =="Appointments Appointment Control Search and Update"}
            >Search and Update</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button
            className="btn btn-outline-primary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#appointmentControl"
          >
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission
            modelTarget="appointmentControl"
            name="Appointment Control Permission History"
          ></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="appointmentControl" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && (
        <p>Controls the ability to use the Appointment Control feature to view and update appointments in a batch.</p>
      )}
      {/*4th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label className="fw-bold">Batch Printing</label>
        </div>
        <div className="col-md-5 mt-1">
          <select
            onChange={(e) => props.appointmentBatchPrintingEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="AppointmentsBatchPrinting"
            id="AppointmentsBatchPrinting"
          >
            <option value="Appointments Batch Printing Deny"
            selected={batchprintingState== "Appointments Batch Printing Deny"}
            >Deny</option>
            <option value="Appointments Batch Printing Search"
            selected={batchprintingState== "Appointments Batch Printing Search"}
            >Search</option>
            <option value="Appointments Batch Printing Search and Print"
            selected={batchprintingState== "Appointments Batch Printing Search and Print"}
            >Search and Print</option>
          </select>
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#batchPrinting">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="batchPrinting" name="Batch Printing Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="batchPrinting" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to use the Claim, Statement, Label, and Superbill Batch Printing features. Note: In order
          to print claims, users must have Access Only permission for the claim type that they are attempting to
          search/print. When set to Search and Print, users can perform searches and print from the results in a batch.
        </p>
      )}
      {/*5th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label className="fw-bold">Department</label>
        </div>
        <div className="col-md-5 mt-1">
         {departmentState?
          <select
            onChange={(e) => props.appointmentDepartmentEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="AppointmentsDepartmentAccess"
            id="AppointmentsDepartmentAccess"
          >
            <option value="Appointments Department Deny"
            selected={departmentState=="Appointments Department Deny"}
            >Deny</option>
            <option value="Appointments Department Access Only"
            selected={departmentState=="Appointments Department Access Only"}
            >Access Only</option>
            <option value="Appointments Department Access and Modify"
            selected={departmentState=="Appointments Department Access and Modify"}
            >Access and Modify</option>
            <option value="Appointments Department Access, Modify, and Create"
            selected={departmentState=="Appointments Department Access, Modify, and Create"}
            >Access, Modify, and Create</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#department">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="department" name="Department Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="department" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && (
        <p>Controls the ability to view, modify, and create Departments used within the Scheduler.</p>
      )}
      {/*6th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label className="fw-bold">Patient Activity</label>
        </div>
        <div className="col-md-5 mt-1">
          {patientactivityappointmentState?
            <select
            onChange={(e) => props.appointmentPatientActivityEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="AppointmentsPatientActivity"
            id="AppointmentsPatientActivity"
          >
            <option value="Appointments Patient Activity Deny"
            selected={patientactivityappointmentState=="Appointments Patient Activity Deny"}
            >Deny</option>
            <option value="Appointments Patient Activity Allow"
            selected={patientactivityappointmentState=="Appointments Patient Activity Allow"}
            >Allow</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#patientActivity">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="patientActivity" name="Patient Activity Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="patientActivity" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && (
        <p>
          Allows users to view a listing of the patient's claim, miscellaneous debit, credit, statement, payment,
          summary activity and dependents. This includes detailed data and the ability to open claims, checks, and other
          sections directly from the activity listing. The patient's claims activity is defaulted to list all of the
          claims, dates, totals, balances and current status of the claims.
        </p>
      )}
      {/*7th Group */}
      <div className="col-md-12 d-flex">
        {' '}
        <div className="col-md-5 mt-3">
          <label className="fw-bold">Patient Payments</label>
        </div>
        <div className="col-md-5 mt-1">
          {patient_paymentsState?
            <select
            onChange={(e) => props.appointmentPatientPaymentEdit(e.target.value)}
            disabled={props.permissionStatus}
            className="form-select form-select-sm"
            name="AppointmentsPatientPayments"
            id="AppointmentsPatientPayments"
          >
            <option value="Appointments Patient Payments Deny"
            selected={patient_paymentsState=="Appointments Patient Payments Deny"}
            >Deny</option>
            <option value="Appointments Patient Payments Allow"
            selected={patient_paymentsState=="Appointments Patient Payments Allow"}
            >Allow</option>
          </select>:''}
        </div>
        <div className="col-md-2 mt-1 px-2">
          <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#patientPayment">
            <i className="fa fa-undo"></i>
          </button>
        </div>
        {/* {props.permissionType == 2 ? (
          <ModalPermission modelTarget="patientPayment" name="Patient Payments Permission History"></ModalPermission>
        ) : props.permissionType == 1 ? (
          <ModelUserManagment modelTarget="patientPayment" name="Test Permission History" />
        ) : (
          ''
        )} */}
      </div>
      {props.showDescription && (
        <p>
          Controls the ability to post new patient payments via the Payment Posting, Claim, and Appointment screens in
          addition to applying discounts, credit/debit adjustments, and account credits towards a patient's charges
          within Manage Account.
        </p>
      )}
    </div>
  );
};

export default AppointmentCatEdit;
