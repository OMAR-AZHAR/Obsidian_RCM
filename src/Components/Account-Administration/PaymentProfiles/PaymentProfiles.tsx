import { lazy, useCallback,useEffect } from "react";
import { useNavigate } from "react-router-dom";
const PayerTable = lazy(() => import("../../Tables/PayerTable"));
import API from "../../../Api/ClientApi";
import "./PaymentProfile.css";
import Swal from "sweetalert2";
const PaymentProfiles = () => {
  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("/user/new-payment-profile", { replace: true }),
    [navigate]
  );
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
    <div className=" d-flex mt-5">
      <div className="col-md-2 d-flex flex-column">
        <button
          type="button"
          onClick={handleOnClick}
          className="btn btn-labeled btn-outline-primary btn-sm mb-3"
        >
          <span className="btn-label">
            <i className="fa fa-plus" />
          </span>{" "}
          New Payment Profiles
        </button>
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          className="btn btn-labeled btn-outline-primary btn-sm d-flex justify-content-between"
        >
          <span className="btn-label">
            <i className="fas fa-bars" />
          </span>{" "}
          <span className="mx-5">Show All</span>
        </button>

        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  All Payment Profiles
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="input-group input-group-sm">
                  <input
                    type="text"
                    className=" form-control form-control-sm w-25"
                    aria-label="Small"
                    placeholder="Search for payment profiles"
                    aria-describedby="inputGroup-sizing-sm"
                  />
                </div>
                <table className="table table-hover table-sm mt-4 table-bordered caption-top">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th scope="col">Name</th>
                      <th scope="col">Type</th>
                      <th scope="col">Default</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Umer Khan Amex</td>
                      <td>Credit Card</td>
                      <td className="d-flex align-items-center justify-content-center">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <div>
                  <input type="checkbox" className="mx-2" />
                  Include inactive payment profiles
                </div>
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary text-white btn-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-6 mx-3 d flex-column">
        <div className="input-group input-group-sm">
          <button
            className="input-group-text btn-hov"
            id="inputGroup-sizing-sm"
          >
            Search
          </button>

          <input
            type="text"
            id="search"
            name="search"
            className="form-control form-control-sm"
            aria-label="Small"
            placeholder="Search for payment profiles by name"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
        <div>
          <input type="checkbox" className="mx-2 mt-2" />
          Include inactive profiles
        </div>
        <PayerTable />
      </div>
    </div>
  );
};
export default PaymentProfiles;
