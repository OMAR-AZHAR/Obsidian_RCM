import React from 'react';

const DepartmentHoursEdit = () => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id="headingFour">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseFour"
          aria-expanded="false"
          aria-controls="collapseFour"
        >
          Departmental hours
        </button>
      </h2>
      <div
        id="collapseFour"
        className="accordion-collapse collapse"
        aria-labelledby="headingFour"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">
          <div className="col-md-12">
            <select
              defaultValue={''}
              className="form-select form-select-sm"
              aria-label="Departmental hour select example"
            >
              <option value="">BlUEGRASS FAMILY MEDICINE AND PEDIATRICS, PLLC - 534747</option>
              <option value="1" id="restrictHours"></option>
            </select>
            <p className="fst-italic mt-2">
              {' '}
              <i className="fa-solid fa-circle-info fa-lg"></i>&nbsp;Setting department level access controls which
              departments the user has access to within the Scheduler.
            </p>{' '}
          </div>
          {/* <DepartmentalAccessTable/> */}

          <p className="fst-italic">
            <i className="fas fa-asterisk"></i>&nbsp;Departments marked with an asterisk must have restricted access
            enabled for these changes to take effect.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DepartmentHoursEdit;
