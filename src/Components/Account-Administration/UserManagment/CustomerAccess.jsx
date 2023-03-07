import React from 'react';

import CustomerAccessTable from '../../Tables/CustomerAccessTable';

export default function CustomerAccess() {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id="headingTwo">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseTwo"
          aria-expanded="false"
          aria-controls="collapseTwo"
        >
          Customer Access
        </button>
      </h2>
      <div
        id="collapseTwo"
        className="accordion-collapse collapse"
        aria-labelledby="headingTwo"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body" style={{height:"45vh", overflowY:'auto'}}>
          <p className="fst-italic">
            {' '}
            <i className="fa-solid fa-circle-info fa-lg"></i>&nbsp;Granting access to a customer will allow the user
            access using the "Switch Customer" option. User permissions are customizable per customer within the
            Permissions Tab.
          </p>
          <CustomerAccessTable />
        </div>
      </div>
    </div>
  );
}
