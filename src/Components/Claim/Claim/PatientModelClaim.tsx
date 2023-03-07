import { lazy } from "react";
const PatientTable = lazy(() => import("../../Tables/PatientTable"));
const PatientModelClaim = (props) => {
  return (
    <div
      className="modal fade"
      id="patient_searchModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Patient Search
            </h1>
          </div>
          <div className="modal-body">
            <PatientTable />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-primary btn-sm">
              Search
            </button>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PatientModelClaim;
