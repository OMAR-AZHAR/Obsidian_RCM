import { lazy } from 'react';

const ContactShowAllModal = lazy(() => import('./ContactShowAllModal'));
const ContactsCode = () => {
  return (
    <div className="row mt-3">
      <h2>Contact Codes</h2>
      <div className="col-md-8 d-flex mt-3">
        <div className="col-md-2">
          <button data-bs-toggle="modal" data-bs-target="#showcontactModal" className="btn btn-outline-primary btn-sm">
            <i className="fas fa-list-ul"></i>&nbsp;Show All
          </button>
          <ContactShowAllModal />
        </div>
        <div className="col-md-9">
          <div className="input-group input-group-sm">
            <input
              className="form-control form-control-sm"
              type="text"
              placeholder="Search for contact codes by code or description."
              aria-label="NPI"
              id="contactCodesearch"
              name="contactCodesearch"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              maxLength="10"
            />
            <button
              type="button"
              className="btn btn-outline-primary input-group-text btn-hov btn-sm"
              id="contactCodesearchbtn"
            >
              <i className="fas fa-search" aria-hidden="true"></i>
            </button>
          </div>
          <div className="form-check mt-2 mb-3">
            <input className="form-check-input" type="checkbox" value="" id="inactive_codes" name="inactive_codes" />
            <label className="form-check-label" htmlFor="inactive_codes">
              Include inactive Codes
            </label>
          </div>
          <div className="col-xl-12">
            <div className="card mb-4">
              <div className={`card-header text-dark`}>
                <i className="fas fa-box-open me-1"></i>
                Recently Opened
              </div>
              <div className="card-body">{/* <contactTable /> */}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsCode;
