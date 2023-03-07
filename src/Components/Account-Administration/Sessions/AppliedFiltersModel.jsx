import { useSelector } from 'react-redux';

const AppliedFiltersModel = () => {
  const count = useSelector((state) => state.SessionsFilters.filterlabel);

  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Applied Filters
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">{count}</div>
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

export default AppliedFiltersModel;
