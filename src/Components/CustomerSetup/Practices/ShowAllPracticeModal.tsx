import { lazy, useState } from "react";
const ShowAllPracticesTable = lazy(() => import("./ShowAllPracticesTable"));
const ShowAllPracticeModel = () => {
  const [searchshowallpractices, setsearchshowallpractices] = useState("");
  const [inactiveChecked, setInactiveChecked] = useState(false);
  return (
    <div
      className="modal fade text-dark"
      id="showAllPracticesModel"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">All Practices</h5>
          </div>
          <div className="modal-body">
            <div className="col-md-12 mb-2">
              <label>Search for Practices</label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="allpracticessearch"
                name="allpracticessearch"
                placeholder="Search for Practices"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
                onChange={(e) => setsearchshowallpractices(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <ShowAllPracticesTable
                searchshowallpractices={searchshowallpractices}
                inactiveChecked={inactiveChecked}
                search={""}
                ToEditable={function (arg0: any): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
          </div>
          <div className="modal-footer justify-content-between">
            <div className="form-check mt-2 mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="inactive_showallpractices"
                name="inactive_showallpractices"
                onChange={(e) => setInactiveChecked(e.target.checked)}
              />
              <label
                className="form-check-label"
                htmlFor="inactive_showallpractices"
              >
                Include inactive practices
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
export default ShowAllPracticeModel;
