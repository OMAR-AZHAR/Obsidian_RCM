import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// import API from "../../../../Api/ClientApi";
import API from "../../../../Api/ClientApi";

import IcdProcedureShowAllModal from "./IcdProcedureShowAllModal";

const ICDProcedure = () => {
  const navigate = useNavigate();
  const [icdProcedureCodes, seticdProcedureCodes] = useState([]);
  console.log("icdProcedureCodes", icdProcedureCodes);
  // diagnoses codes data from api
  useEffect(() => {
    const fetchicdProcedureCodes = async () => {
      const response = await API.get("customersetup/code/icd/procedure");
      const newData = response.data.data;
      seticdProcedureCodes(newData);
    };

    fetchicdProcedureCodes();
  }, []);

  const handleEdit = (id) => {
    navigate(`/setup/code/icd/${id}`, { replace: true });
  };

  return (
    <div className="row mt-3">
      <h2>ICD Procedure Codes</h2>
      <div className="col-md-8 d-flex mt-3">
        <div className="col-md-4">
          <button
            type="button"
            className="btn btn-labeled btn-outline-primary btn-sm mb-2"
            // data-bs-toggle="modal"
            // data-bs-target="#staticBackdrop"
            onClick={() => navigate("/new-icdProcedure", { replace: true })}
          >
            <span className="btn-label">
              <i className="fa fa-plus"></i>
            </span>{" "}
            New ICD Procedure Codes
          </button>
          <button
            data-bs-toggle="modal"
            data-bs-target="#showicdProcedureModal"
            className="btn btn-outline-primary btn-sm"
          >
            <i className="fas fa-list-ul"></i>&nbsp;Show All
          </button>
          <div
            className="modal fade"
            id="showicdProcedureModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="showDiagnosisModal">
                    All ICD Procedure Codes
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
                          <th scope="col">Inactice</th>
                        </tr>
                      </thead>

                      <tbody>
                        {icdProcedureCodes.length == 0
                          ? "Please Wait..."
                          : icdProcedureCodes?.map((codes, i) => {
                              return (
                                <tr
                                  className="table-active practice-font"
                                  key={i}
                                  onClick={() => alert("code Clicked")}
                                >
                                  <td>{codes?.procedure_code}</td>
                                  <td>{codes?.description}</td>
                                  <td>
                                    {codes?.isActive ? (
                                      <span className="fas fa-check">
                                        Active
                                      </span>
                                    ) : (
                                      "Inactive"
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
        {/* |-----------------------main screen| */}
        <div className="col-md-9">
          <div className="input-group input-group-sm">
            <input
              className="form-control form-control-sm"
              type="text"
              placeholder="Search for ICD-PCS codes by code or description."
              aria-label="NPI"
              id="icdProcedureCodesearch"
              name="icdProcedureCodesearch"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              maxLength="10"
            />
            <button
              type="button"
              className="btn btn-outline-primary input-group-text btn-hov btn-sm"
              id="icdProcedureCodesearchbtn"
            >
              <i className="fas fa-search" aria-hidden="true"></i>
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
              <div className={`card-header text-white`}>
                <i className="fas fa-box-open me-1"></i>
                Recently Opened
              </div>
              <div className="card-body">
                <div
                  className="col-md-12 col-sm-6 col-xs-3"
                  style={{
                    overflowY: "scroll",
                    height: "calc(100vh - 100px)",
                    overflowX: "hidden",
                  }}
                >
                  <table className="table table-light table-hover table-striped table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Code</th>
                        <th scope="col">Description</th>
                        <th scope="col">Inactice</th>
                      </tr>
                    </thead>

                    <tbody>
                      {icdProcedureCodes.length == 0
                        ? "Please Wait..."
                        : icdProcedureCodes?.map((codes, i) => {
                            return (
                              <tr
                                className="table-active practice-font"
                                key={i}
                                onClick={() => handleEdit(codes.id)}
                              >
                                <td>{codes?.procedure_code}</td>
                                <td>{codes?.description}</td>
                                <td>
                                  {codes?.isActive ? (
                                    <span className="fas fa-check">Active</span>
                                  ) : (
                                    "Inactive"
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
    </div>
  );
};

export default ICDProcedure;
