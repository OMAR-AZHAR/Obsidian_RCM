import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
const UserProfilePreview = (props) => {
  const navigate = useNavigate();
  const handleOnClick = useCallback(
    // Goto User Editable form
    (id) => {
      navigate(`/userProfileEdit/${id}`, { replace: true });
    },
    [navigate]
  );
  console.log("dATA", props.userIdFromTable);
  return (
    <div className="row" style={{ marginTop: "-70px" }}>
      <h2>{props.userfullnamefromtable}</h2>
      <span
        className="fa-stack fa-2x mt-0 mb-2 text-nowrap"
        style={{ cursor: "pointer" }}
      >
        <i className="fa-sharp fa-solid fa-circle-user fa-2x"></i> &nbsp;
        <span style={{ fontSize: "16px" }}>
          Username: {props.usernamefromtable}
        </span>
      </span>

      <span>Status: {props.userstatusfromtable}</span>
      <span>Type: {props.usertypefromtable}</span>
      <span>Date Created:</span>
      <span>Last Successful Login:</span>
      <div className="col-md-5 d-flex flex-column mt-5">
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => handleOnClick(props.userIdFromTable)}
        >
          Edit User
        </button>
        <Link className="pt-2 pb-2">Resend Invite</Link>
        <Link>Move User to another Customer</Link>
      </div>
    </div>
  );
};

export default UserProfilePreview;
