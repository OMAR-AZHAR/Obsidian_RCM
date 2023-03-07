const ShowAllModel = () => {
  return (
    <div
      className="modal fade"
      id="showAllModel"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered text-dark">
        <div className="modal-content">
          <div className="modal-body d-flex">
            <span className="fas fa-triangle-exclamation my-1 fs-4" />
            <p className="mx-2 mt-2">No providers were found.</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              data-bs-dismiss="modal"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShowAllModel;
