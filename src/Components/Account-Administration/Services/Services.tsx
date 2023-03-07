import { useEffect } from "react";
import { useNavigate } from "react-router";
import API from "../../../Api/ClientApi";
import Swal from "../../../GLOBAL/SwalAlert";
const Services = () => {
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
    <div className="container mt-3 d-flex flex-column ">
      <p className="col-md-6">
        <span className="fas fa-warning mx-2 fs-5" />
        You are not able to make changes to the services below based on your
        user type. Please contact your Authorized Representative.
      </p>
      <div className="row mb-4">
        <div className="card col-md-6 text-dark">
          <div className="card-header fw-bold">Price Plan</div>
          <div className="card-body">
            <p className="card-text">
              Current Price Plan:{" "}
              <strong>Billing Service: Volume Based Pricing</strong>
            </p>
            <p className="card-text">
              <span className="fas fa-circle-exclamation mx-2 fs-5" />
              Your current price plan provides transaction-based pricing. Please
              click here to view complete pricing details.
            </p>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="card col-md-6 text-dark">
          <div className="card-header fw-bold">Featured</div>
          <div className="card-body">
            <p className="card-text">
              Manage the following services included within your price plan:
            </p>
            <div className="d-flex align-items-center justify-content-between">
              <span className="fas fa-x fw-bold" />
              <p className="mt-3 mx-4">In-app Credit Card Processing</p>
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#In-appCreditCardProcessing"
                className="btn btn-labeled btn-outline-primary btn-sm d-flex justify-content-between"
              >
                <span className="btn-label">
                  <i className="fas fa-cog" />
                </span>{" "}
                <span className="mx-2">View Setting</span>
              </button>

              <div
                className="modal fade"
                id="In-appCreditCardProcessing"
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
                        In-Application Credit Card Processing for Customer
                        #10020280 - BLUEGRASS FAMILY MEDICINE AND PEDIATRICS,
                        PLLC - 534747
                      </h5>
                    </div>
                    <div className="modal-body">
                      <div className="input-group input-group-sm">
                        <p className="card-text">
                          <span className="fas fa-circle-exclamation mx-2 fs-5" />
                          Your current price plan provides transaction-based
                          pricing. Please click here to view complete pricing
                          details.
                        </p>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            Enable In-Application Credit Card Processing
                          </label>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        disabled
                      >
                        <span className="fas fa-plus fw-bold mx-2" />
                        Add New
                      </button>
                    </div>
                    <div className="modal-footer d-flex justify-content-end">
                      <button
                        type="button"
                        data-bs-dismiss="modal"
                        className="btn btn-secondary text-white btn-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <span className="fas fa-x fw-bold" />
              <p className="mt-3 mx-4">Patient Payment Portal</p>
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#PatientPaymentPortal"
                className="btn btn-labeled btn-outline-primary btn-sm d-flex"
              >
                <span className="btn-label">
                  <i className="fas fa-cog" />
                </span>{" "}
                <span className="mx-2">View Setting</span>
              </button>

              <div
                className="modal fade"
                id="PatientPaymentPortal"
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
                        In-Application Credit Card Processing for Customer
                        #10020280 - BLUEGRASS FAMILY MEDICINE AND PEDIATRICS,
                        PLLC - 534747
                      </h5>
                    </div>
                    <div className="modal-body">
                      <div className="input-group input-group-sm">
                        <p className="card-text">
                          <span className="fas fa-circle-exclamation mx-2 fs-5" />
                          Your current price plan provides transaction-based
                          pricing. Please click here to view complete pricing
                          details.
                        </p>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            Enable In-Application Credit Card Processing
                          </label>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        disabled
                      >
                        <span className="fas fa-plus fw-bold mx-2" />
                        Add New
                      </button>
                    </div>
                    <div className="modal-footer d-flex justify-content-end">
                      <button
                        type="button"
                        data-bs-dismiss="modal"
                        className="btn btn-secondary text-white btn-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Services;
