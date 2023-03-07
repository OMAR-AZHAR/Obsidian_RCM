import { lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import API from "../../../../Api/ClientApi";
const AdjustmentShowAllModal = lazy(() => import("./AdjustmentShowAllModal"));
const Adjustment = () => {
  const navigate = useNavigate();
  const [adjustmentCodes, setadjustmentCodes] = useState([]);
  // diagnoses codes data from api
  useEffect(() => {
    const fetchadjustmentCodes = async () => {
      const response = await API.get("customersetup/code/adjustment");
      const newData = response.data.data;
      setadjustmentCodes(newData);
    };

    fetchadjustmentCodes();
  }, []);
  const handleEdit = (id) => {
    navigate(`/setup/code/adjustment/${id}`, { replace: true });
  };
  return (
    <div className="row mt-3">
      <h2>Adjustment Codes</h2>
      <div className="col-md-8 d-flex mt-3">
        <div className="col-md-4">
          <button
            type="button"
            className="btn btn-labeled btn-outline-primary btn-sm mb-2"
            // data-bs-toggle="modal"
            // data-bs-target="#staticBackdrop"
            onClick={() => navigate("/new-adjustment", { replace: true })}
          >
            <span className="btn-label">
              <i className="fa fa-plus"></i>
            </span>{" "}
            New Adjustment Codes
          </button>
          <button
            data-bs-toggle="modal"
            data-bs-target="#showadjustmentModal"
            className="btn btn-outline-primary btn-sm"
          >
            <i className="fas fa-list-ul" />
            &nbsp;Show All
          </button>
          {/* |-----------show all modal--------------------| */}
          <div
            className="modal fade"
            id="showadjustmentModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="showDiagnosisModal">
                    All Adjustment Codes
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="col-md-12 col-sm-6 col-xs-3">
                    <table className="table table-light table-hover table-striped table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Code</th>
                          <th scope="col">Description</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {adjustmentCodes?.length == 0
                          ? "Please Wait..."
                          : adjustmentCodes?.map((codes: any, i) => {
                              return (
                                <tr
                                  className="table-active practice-font"
                                  key={i}
                                  onClick={() => alert("code Clicked")}
                                >
                                  <td>{codes?.adjustment_code}</td>
                                  <td>{codes?.description}</td>
                                  <td>
                                    {codes?.deleted_at == null ? (
                                      <span>Active</span>
                                    ) : (
                                      <span>Inactive</span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-between">
                  <div className="form-check mt-2 mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="inactive_codes"
                      name="inactive_codes"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inactive_codes"
                    >
                      Include inactive Codes
                    </label>
                  </div>
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-outline-danger btn-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="input-group input-group-sm">
            <input
              className="form-control form-control-sm"
              type="text"
              placeholder="Search for adjustment codes by code or description."
              aria-label="NPI"
              id="adjustmentCodesearch"
              name="adjustmentCodesearch"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              maxLength={10}
            />
            <button
              type="button"
              className="btn btn-outline-primary input-group-text btn-hov btn-sm"
              id="adjustmentCodesearchbtn"
            >
              <i className="fas fa-search" aria-hidden="true" />
            </button>
          </div>
          <div className="form-check mt-2 mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="inactive_codes"
              name="inactive_codes"
            />
            <label className="form-check-label" htmlFor="inactive_codes">
              Include inactive Codes
            </label>
          </div>
          <div className="col-xl-12">
            <div className="card mb-4">
              <div className={`card-header text-dark`}>
                <i className="fas fa-box-open me-1" />
                Recently Opened
              </div>
              <div className="card-body" />
              <div className="col-md-12 col-sm-6 col-xs-3">
                <table className="table table-light table-hover table-striped table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Code</th>
                      <th scope="col">Description</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {adjustmentCodes?.length == 0
                      ? "Please Wait..."
                      : adjustmentCodes?.map((codes: any, i) => {
                          return (
                            <tr
                              className="table-active practice-font"
                              key={i}
                              onClick={() => handleEdit(codes.id)}
                            >
                              <td>{codes?.adjustment_code}</td>
                              <td>{codes?.description}</td>
                              <td>
                                {codes?.deleted_at == null ? (
                                  <span>Active</span>
                                ) : (
                                  <span>Inactive</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Adjustment;
