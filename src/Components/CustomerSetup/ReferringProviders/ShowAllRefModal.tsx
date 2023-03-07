import { lazy } from "react";
const ShowAllReferringTable = lazy(() => import("./ShowAllReferringTable"));
const ShowAllRefModel = () => {
  return (
    <div
      className="modal fade text-dark"
      id="showAllReferringModel"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">All Referring Providers</h5>
          </div>
          <div className="modal-body">
            <div className="col-md-12 mb-2">
              <label>Search for referring providers</label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="allreferringsearch"
                name="allreferringsearch"
                placeholder="Search for Referring Providers"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
            <div className="col-md-12">
              <ShowAllReferringTable />
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
                Include inactive referring
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
export default ShowAllRefModel;
