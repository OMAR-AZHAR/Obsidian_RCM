const ModelUserManagment = (props) => {
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
            <span className="fas fa-triangle-exclamation fs-5 mx-2"></span>
            <p className="modal-title" id="staticBackdropLabel">
              The requested item could not be found. Please ensure that you are logged in to the correct customer
              account
            </p>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline-primary btn-sm" data-bs-dismiss="modal">
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelUserManagment;
