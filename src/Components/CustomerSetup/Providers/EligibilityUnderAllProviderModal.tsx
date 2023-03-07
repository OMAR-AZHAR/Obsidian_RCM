import useFetch from "../../../Hooks/useFetch";

const EligibilityUnderAllProviderModal = ({ checkeligiID, checkeligiName }) => {
  const { data: provide, loading } = useFetch(
    "customersetup/provider/providerlist"
  );
  return (
    <div
      className="modal fade"
      id="eligibilityUnderproviderModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="eligibilityUnderproviderModal">
              All Provider
            </h1>
          </div>
          <div className="modal-body">
            <input
              type="text"
              id="enteramount"
              className="form-control form-control-sm w-100"
              placeholder="Search for providers"
            />
          </div>

          <div className="table-responsive px-2" style={{ height: "300px" }}>
            <table className="table table-light table-hover table-striped table table-bordered">
              <thead className="">
                <tr>
                  <th>Reference #</th>
                  <th>NPI</th>
                  <th>Name</th>

                  <th>Submitter #</th>
                  <th>Tax ID</th>
                  <th>Prof. Mode</th>

                  <th>Practice</th>
                  <th>Inst. Mode</th>
                </tr>
              </thead>
              <tbody>
                {provide?.length ? (
                  <>
                    {provide?.map((prov, i) => {
                      return (
                        <tr
                          className="table-active facility-font"
                          key={i}
                          data-bs-dismiss="modal"
                          onClick={() => {
                            checkeligiName(
                              prov?.last_name
                                ? prov?.last_name + `, ` + prov?.first_name
                                : prov?.organization_name
                            );
                            checkeligiID(prov?.id);
                          }}
                        >
                          <td>{prov?.reference}</td>
                          <td>{prov?.npi_code}</td>
                          <td>
                            {prov?.last_name
                              ? prov?.last_name + `, ` + prov?.first_name
                              : prov?.organization_name}
                          </td>
                          <td>{prov?.submitter}</td>
                          <td>{prov?.taxid}</td>
                          <td>{prov?.profmode}</td>

                          <td>{prov?.practicename}</td>
                          <td>{prov?.instmode}</td>

                          {/* <td>
                        {prov.Inactive == true ? (
                          <span className="fas fa-check"></span>
                        ) : (
                          ""
                        )}
                      </td> */}
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  "No Recent Providers"
                )}
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EligibilityUnderAllProviderModal;
