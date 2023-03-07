import React from 'react';

const AccountAdmOptions = () => {
  return (
    <div className="row">
      <div className="col-md-9 d-flex justify-content-between align-items-center mt-4">
        <span className="fw-bold">Account Setup</span>
        <div className="w-50 d-flex align-items-center">
          <select className="form-select form-select-sm" aria-label=".form-select-sm example">
            <option value="1">Deny</option>
            <option selected>Allow</option>
          </select>
          <span className="fas fa-refresh rounded-1 text-white px-2 py-2 bg-primary mx-2"></span>
        </div>
      </div>
      <div className="col-md-9 d-flex justify-content-between align-items-center mt-4">
        <span className="fw-bold">Bill Payment</span>
        <div className="w-50 d-flex align-items-center">
          <select className="form-select form-select-sm" aria-label=".form-select-sm example">
            <option value="1">Deny</option>
            <option selected>Allow</option>
          </select>
          <span className="fas fa-refresh rounded-1 text-white px-2 py-2 bg-primary mx-2"></span>
        </div>
      </div>

      <div className="col-md-9 d-flex justify-content-between align-items-center mt-4">
        <span className="fw-bold">Monthly Invoice</span>
        <div className="w-50 d-flex align-items-center">
          <select className="form-select form-select-sm" aria-label=".form-select-sm example">
            <option value="1">Deny</option>
            <option selected>Allow</option>
          </select>
          <span className="fas fa-refresh rounded-1 text-white px-2 py-2 bg-primary mx-2"></span>
        </div>
      </div>
    </div>
  );
};

export default AccountAdmOptions;
