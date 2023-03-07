import React from 'react';

const AccessHourseEdit = () => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id="headingThree">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseThree"
          aria-expanded="false"
          aria-controls="collapseThree"
        >
          Access hours
        </button>
      </h2>
      <div
        id="collapseThree"
        className="accordion-collapse collapse"
        aria-labelledby="headingThree"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">
          <div className="col-md-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="Acchrs"
                // onChange={showTab}
              />
              <label className="form-check-label" htmlFor="Acchrs">
                Limit user's access to the application based on day/time.
              </label>
            </div>
            {/* {showTable ? <AccessHoursTable /> : null} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessHourseEdit;
