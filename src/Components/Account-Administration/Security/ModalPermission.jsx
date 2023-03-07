import React from 'react';

import SetupHistory from '../../Tables/SetupHistory';

const ModalPermission = (props) => {
  return (
    <div
      className="modal fade"
      id={props.modelTarget}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {props.name}
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <SetupHistory />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-danger btn-sm" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPermission;
