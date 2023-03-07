import { useEffect } from "react";
import { useNavigate } from "react-router";
import API from "../../../Api/ClientApi";
import Swal from "../../../GLOBAL/SwalAlert";
const Locks = () => {
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
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-4">
          <div className="d-flex align-items-center justify-content-between">
            <p className="mt-2 fw-bold">Filters</p>
            <button
              data-bs-toggle="modal"
              data-bs-target="#opensearch"
              className="btn btn-outline-primary btn-sm"
            >
              <span className="fas fa-search" /> Search
            </button>
            <div
              className="modal fade"
              id="opensearch"
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-body">
                    <span className="fas fa-warning mx-2" />
                    No locks were found matching your search criteria.
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      data-bs-dismiss="modal"
                    >
                      Ok
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column">
            <p className="mt-2">Lock Type</p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Patient Locks
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                checked
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Claim Locks
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                checked
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Provider Locks
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                checked
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Practice Locks
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                checked
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Report Locks
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                checked
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                ERA Locks
              </label>
            </div>
          </div>
        </div>
        <div className="col-md-6" style={{ borderLeft: "2px solid black" }}>
          <p>Please select a filter criteria to run search to view results</p>
        </div>
      </div>
    </div>
  );
};
export default Locks;
