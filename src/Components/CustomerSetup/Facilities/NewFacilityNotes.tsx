const NewFacilityNotes = ({ textChange }) => {
  return (
    <div
      className="accordion"
      id="accordionExample"
      style={{ overflowY: "scroll", height: "calc(100vh - 127px)" }}
    >
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="false"
            aria-controls="collapseOne"
          >
            Notes
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body px-2 py-2">
            <div className="px-0 mx-0">
              <textarea
                onChange={(e) => textChange(e.target.value)}
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={10}
                maxLength={255}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewFacilityNotes;
