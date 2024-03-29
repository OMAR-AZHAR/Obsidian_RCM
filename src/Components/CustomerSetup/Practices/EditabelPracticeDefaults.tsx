import { lazy } from "react";
const EditabelPracticeDefaultTabs = lazy(
  () => import("./EditabelPracticeDefaultTabs")
);
export default function EditabelPracticeDefaults() {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id="headingThree">
        <button
          disabled={true}
          className="accordion-button collapsed text-muted"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseThree"
          aria-expanded="false"
          aria-controls="collapseThree"
        >
          Defaults
        </button>
      </h2>
      <div
        id="collapseThree"
        className="accordion-collapse collapse"
        aria-labelledby="headingThree"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">
          <EditabelPracticeDefaultTabs />
        </div>
      </div>
    </div>
  );
}
