const ChargePanelShowAllModal = () => {
  return (
    <div
      className="modal fade"
      id="showchargePanelModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="showchargePanelModal">
              All Charge Panels
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="input-group input-group-sm">
              <input
                type="text"
                className=" form-control form-control-sm w-25"
                aria-label="Small"
                placeholder="Search for codes"
                id="showallmodalchargePanelcode"
                name="showallmodalchargePanelcode"
                aria-describedby="inputGroup-sizing-sm"
              />
            </div>
            {/* <chargePanelTable /> */}
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <div>
              <input type="checkbox" className="mx-2" id="includeInactiveCode" />
              <label htmlFor="includeInactiveCode">Include inactive Codes</label>
            </div>
            <button type="button" data-bs-dismiss="modal" className="btn btn-secondary text-white btn-sm">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChargePanelShowAllModal;
