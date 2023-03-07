import { lazy } from "react";
const NewPracticeDefaults = lazy(() => import("./EditabelPracticeDefaults"));
const NewPracticeOffices = lazy(
  () => import("./OtherOffices/NewPracticeOffices")
);
export default function NewPracticeNotes({ notes }) {
  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="false"
            aria-controls="collapseOne"
          >
            Notes
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body px-2 py-2">
            <div className="px-0 mx-0">
              <textarea
                onChange={(e) => notes(e.target.value)}
                className="form-control"
                id="newParacticeTextarea1"
                rows={10}
              />
            </div>
          </div>
        </div>
      </div>
      <NewPracticeOffices />
      <NewPracticeDefaults />
    </div>
  );
}
