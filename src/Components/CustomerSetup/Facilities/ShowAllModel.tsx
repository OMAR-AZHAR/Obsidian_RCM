import { lazy } from "react";
const ShowAllFacilityTable = lazy(() => import("./ShowAllFacilityTable"));
const ShowAllModel = () => {
  return (
    <div
      className="modal fade"
      id="showAllModel"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl modal-dialog-centered text-dark">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">All Facilities</h5>
          </div>
          <div className="modal-body">
            <div className="col-md-12 mb-2">
              <input
                type="text"
                className="form-control form-control-sm"
                id="allfacilitysearch"
                name="allfacilitysearch"
                placeholder="Search for facilities"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
            <div className="col-md-12">
              <ShowAllFacilityTable />
            </div>
          </div>
          <div className="modal-footer justify-content-between">
            <div className="form-check mt-2 mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="inactive_facilities"
                name="inactive_facilities"
              />
              <label className="form-check-label" htmlFor="inactive_facilities">
                Include inactive facilities
              </label>
            </div>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
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
export default ShowAllModel;
