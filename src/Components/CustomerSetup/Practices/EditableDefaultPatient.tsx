import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAcceptAssignment,
  getEmployedStatus,
  getGender,
  getlanguage,
  getMailStatement,
  getMaritalStatus,
  getResidenceType,
  getSentStatement,
  getStatementType,
  getStudentStatus,
} from "../../../Redux/features/Practice/DefaultClaimsSlice";

export default function EditableDefaultPatient() {
  const dispatch = useDispatch();
  // Default Patients Data
  const marital_status = useSelector(
    (state: any) => state.EditPractice?.data?.patient?.marital_status
  );

  const accept_ass = useSelector(
    (state: any) => state.EditPractice?.data?.patient?.accept_ass
  );

  const gender = useSelector(
    (state: any) => state.EditPractice?.data?.patient?.gender
  );

  const language = useSelector(
    (state: any) => state.EditPractice?.data?.patient?.language
  );

  const mail_statement_to = useSelector(
    (state: any) => state.EditPractice?.data?.patient?.mail_statement_to
  );
  const send_statement = useSelector(
    (state: any) => state.EditPractice?.data?.patient?.send_statement
  );
  const statement_type = useSelector(
    (state: any) => state.EditPractice?.data?.patient?.statement_type
  );
  const student_status = useSelector(
    (state: any) => state.EditPractice?.data?.patient?.student_status
  );

  const employed_status = useSelector(
    (state: any) => state.EditPractice?.data?.patient?.employed_status
  );
  const residence_type = useSelector(
    (state: any) => state.EditPractice?.data?.patient?.residence_type
  );
  // set state
  const [maritalStatus, setMaritalStatus] = useState("");
  const [Acceptass, setaccept_ass] = useState("");
  const [Gender, setgender] = useState("");

  const [Language, setLanguage] = useState("");
  const [Mail_to, setmail_statement_to] = useState("");
  const [sendStatement, setsend_statement] = useState(0);
  const [statementType, setstatement_type] = useState("");
  const [StudentStatus, setstudent_status] = useState("");
  const [Employed_status, setEmployed_status] = useState("");
  const [Residence_type, setResidence_type] = useState("");

  useEffect(() => {
    setMaritalStatus(marital_status);
    setaccept_ass(accept_ass);
    setgender(gender);
    setLanguage(language);
    setmail_statement_to(mail_statement_to);
    setsend_statement(send_statement);
    setstatement_type(statement_type);
    setstudent_status(student_status);

    setResidence_type(residence_type);
    setEmployed_status(employed_status);
  }, [
    marital_status,
    accept_ass,
    gender,
    language,
    mail_statement_to,
    send_statement,
    statement_type,
    student_status,
    residence_type,
    employed_status,
  ]);
  return (
    <div className="col-md-12 col-sm-10">
      <div className="col-md-6">
        <label className="mt-1">Marital Status</label>
        <select
          defaultValue={maritalStatus}
          value={maritalStatus}
          className="form-select form-select-sm "
          aria-label=".form-select-sm example"
          onChange={(e) => dispatch(getMaritalStatus(e.target.value))}
        >
          <option value="Married">Married</option>
          <option value="Single">Single</option>
          <option value="Divorced">Divorced</option>
          <option value="Widowed">Widowed</option>
          <option value="Legally Sperated">Legally Seperated</option>
          <option value="Unknown">Unknown</option>
        </select>

        {/* Employee Status */}
        <label className="mt-1">Employed Status</label>

        <select
          defaultValue={Employed_status}
          value={Employed_status}
          className="form-select form-select-sm "
          aria-label=".form-select-sm example"
          onChange={(e) => dispatch(getEmployedStatus(e.target.value))}
        >
          <option value="Employed full-time">Employed full-time</option>
          <option value="Employed part-time">Employed part-time</option>
          <option value="Not Employed">Not Employed</option>
          <option value="Self Employed">Self Employed</option>
          <option value="Retired">Retired</option>
          <option value="On active military duty">
            On active military duty
          </option>
          <option value="Disabled">Disabled</option>
          <option value="Unknown">Unknown</option>
        </select>
        <label className="mt-1">Student Status</label>
        {/* Student status */}
        <select
          defaultValue={StudentStatus}
          value={StudentStatus}
          className="form-select form-select-sm "
          aria-label=".form-select-sm example"
          onChange={(e) => dispatch(getStudentStatus(e.target.value))}
        >
          <option value={"Not a Student"}>Not a Student</option>
          <option value="Full-time Student">Full-time Student</option>
          <option value="Part-time Student">Part-time Student</option>
        </select>
        <label className="mt-1">Residence Type</label>
        <select
          defaultValue={Residence_type}
          value={Residence_type}
          className="form-select form-select-sm "
          aria-label=".form-select-sm example"
          onChange={(e) => dispatch(getResidenceType(e.target.value))}
        >
          <option value={"Private Home"}>Private Home</option>
          <option value="Nursing Home">Nursing Home</option>
          <option value="Residential Treatment Patient">
            Residential Treatment Patient
          </option>
          <option value="Skilled Nursing Home">Skilled Nursing Home</option>
          <option value="Homeless">Homeless</option>
          <option value="Prefer not to answer">Prefer not to answer</option>
          <option value="Unknown">Unknown</option>
        </select>

        <label className="mt-1">Statement Type</label>

        <select
          id="StatementType"
          defaultValue={statementType}
          value={statementType}
          className="form-select form-select-sm "
          aria-label=".form-select-sm example"
          onChange={(e) => dispatch(getStatementType(e.target.value))}
        >
          <option value={"Single"}>Single</option>
          <option value="Family">Family</option>
        </select>

        <label className="mt-1">Mail Statement To</label>

        <select
          id="MailStatement"
          defaultValue={Mail_to}
          value={Mail_to}
          className="form-select form-select-sm "
          aria-label=".form-select-sm example"
          onChange={(e) => dispatch(getMailStatement(e.target.value))}
        >
          <option value="Patient">Patient</option>
          <option value={"Primary Insured"}>Primary Insured</option>
          <option value="Secondary Insured">Secondary Insured</option>
          <option value="Tertiary Insured">Tertiary Insured</option>
          <option value="Primary Insurance">Primary Insurance</option>
          <option value="Secondary Insurance">Secondary Insurance</option>
          <option value="Guarantor">Guarantor</option>
        </select>

        <label className="mt-1">Send Statement</label>

        <select
          defaultValue={sendStatement}
          value={sendStatement}
          className="form-select form-select-sm "
          aria-label=".form-select-sm example"
          onChange={(e) => dispatch(getSentStatement(e.target.value))}
        >
          <option value={1}>Yes</option>
          <option value={0}>No</option>
        </select>

        <label className="mt-1">Language</label>

        <select
          defaultValue={Language}
          value={Language}
          className="form-select form-select-sm "
          aria-label=".form-select-sm example"
          onChange={(e) => dispatch(getlanguage(e.target.value))}
        >
          <option value={"English"}>English</option>
          <option value="Spanish">Spanish</option>
        </select>
      </div>
      <div className="col-md-12">
        <label className="mt-1">Accept Assignment</label>

        <select
          defaultValue={Acceptass}
          value={Acceptass}
          className="form-select form-select-sm "
          aria-label=".form-select-sm example"
          onChange={(e) => dispatch(getAcceptAssignment(e.target.value))}
        >
          <option
            value={"Yes, the provider accepts the assignments of benefits."}
          >
            Yes, the provider accepts the assignments of benefits.
          </option>
          <option value="No, the provider does not accept the asignment of benefits.">
            No, the provider does not accept the asignment of benefits.
          </option>
          <option value="Use the default accept assignment for the provider and payer.">
            Use the default accept assignment for the provider and payer.
          </option>
        </select>
        <label className="mt-1">Gender</label>
        <select
          defaultValue={Gender}
          value={Gender}
          className="form-select form-select-sm "
          aria-label=".form-select-sm example"
          onChange={(e) => dispatch(getGender(e.target.value))}
        >
          <option value={" "} />
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
}
