import React, { useState , useEffect} from "react";
import API from "../../../Api/ClientApi";
import Swal from "../../../GLOBAL/SwalAlert";
import { Link, useNavigate } from "react-router-dom";
let customer =
  " BLUEGRASS FAMILY MEDICINE AND PEDIATRICS, PLLC - 534747 (#10020280).";
const TwoFactorAuthentication = () => {
  const [editSetting, setEditSetting] = useState(true);
 
  const toggleButtons = () => {
    if (editSetting) {
      setEditSetting(false);
    } else {
      setEditSetting(true);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    API.get("accountadmin/customermanagement")
    .then(function (response) {
    })
    .catch(function (error) {
      if (error.response.data.data == 403) {
        Swal.fire({
          icon: 'error',
          imageHeight:30,
          imageWidth:30,
          title: 'Sorry...',
          text: 'Please contact your administrator to get Permissions!',
          confirmButtonColor: '#08619b',
        })
        navigate(-1)
      }
      
    });
  }, []);
  return (
    <div className="container mt-4">
      <div className="d-flex">
        <button
          type="button"
          className="btn btn-labeled btn-outline-primary btn-sm d-flex mb-2 mx-2"
          onClick={toggleButtons}
        >
          <span className="btn-label">
            <i className="fas fa-edit mx-1"></i>
          </span>{" "}
          <span className="">Edit</span>
        </button>

        <div
          className="d-flex"
          style={{ visibility: editSetting ? "hidden" : "visible" }}
        >
          <button
            type="button"
            className="btn btn-labeled btn-outline-primary btn-sm d-flex mb-2 mx-1"
            onClick={toggleButtons}
          >
            <span className="btn-label">
              <i className="fas fa-x mx-1"></i>
            </span>{" "}
            <span className="">Cancel</span>
          </button>
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#copySetttings"
            className="btn btn-labeled btn-outline-info btn-sm d-flex mb-2"
          >
            <span className="btn-label">
              <i className="fas fa-file mx-1"></i>
            </span>{" "}
            <span className="">Copy Setting</span>
          </button>
          <div
            className="modal fade"
            id="copySetttings"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <p className="modal-title" id="staticBackdropLabel">
                    Please select which customers to copy the two-factor
                    authentication configuration settings to
                  </p>
                </div>
                <div className="modal-body">
                  <div className="input-group input-group-sm">
                    <div className="d-flex flex-column">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                          checked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Select All
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckChecked"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked"
                        >
                          ABC Customer
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckChecked"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked"
                        >
                          Test Customer
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Copy
                  </button>
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-outline-danger  btn-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <p>
          Set up Two-Factor Authentication to improve security and protect your
          account. These settings apply to users whose default customer is{" "}
          {customer}.
        </p>
        <p>
          If any user has lost or changed their two-factor authentication
          device, reset two-factor authentication from{" "}
          <Link to="/user-managment">User Management</Link> .
        </p>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            checked
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Disable Two Factor Authentication
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Require users to set up two-factor authentication(recommended)
          </label>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuthentication;
