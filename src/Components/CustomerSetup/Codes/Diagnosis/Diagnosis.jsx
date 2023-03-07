import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import API from "../../../../Api/ClientApi";

const Diagnosis = () => {
  const navigate = useNavigate();
  const [diagnoseCodes, setdiagnoseCodes] = useState([]);
  console.log("diagnoseCodes", diagnoseCodes);
  // diagnoses codes data from api
  useEffect(() => {
    const fetchdiagnoseCodes = async () => {
      const response = await API.get("customersetup/code/diagnosis");
      const newData = response.data.data;
      setdiagnoseCodes(newData);
    };

    fetchdiagnoseCodes();
  }, []);
  const handleEdit = (id) => {
    navigate(`/setup/code/diagnosis/${id}`, { replace: true });
  };
  return (
    <div className="row mt-3">
      <h2>Diagnosis Codes</h2>
      <div className="col-md-8 d-flex mt-3">
        {/* ------------------------------ side butttons -------------------------------- */}
        <div className="col-md-3 d-column">
          <button
            type="button"
            className="btn btn-labeled btn-outline-primary btn-sm mb-2"
            // data-bs-toggle="modal"
            // data-bs-target="#staticBackdrop"
            onClick={() => navigate("/new-diagnosis", { replace: true })}
          >
            <span className="btn-label">
              <i className="fa fa-plus"></i>
            </span>{" "}
            New Diagnosis
          </button>
          <button
            type="button"
            className="btn btn-labeled btn-outline-primary btn-sm mb-2"
            data-bs-toggle="modal"
            data-bs-target="#NPIRegistryModaltriggerinRefProvider"
          >
            <span className="btn-label">
              <i className="fa fa-cloud-arrow-down"></i>
            </span>{" "}
            Add From Master List
          </button>
          <button
            data-bs-toggle="modal"
            data-bs-target="#showDiagnosisModal"
            className="btn btn-outline-primary btn-sm"
          >
            <i className="fas fa-list-ul"></i>&nbsp;Show All
          </button>
          {/* |-----------show all modal--------------------| */}
          <div
            className="modal fade"
            id="showDiagnosisModal"
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
                    All Diagnosis Codes
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
                        <tr className="text-center">
                          <th scope="col">Code</th>
                          <th scope="col">Description</th>
                          <th scope="col">Inactice</th>
                        </tr>
                      </thead>

                      <tbody>
                        {diagnoseCodes?.length == 0
                          ? "Please Wait..."
                          : diagnoseCodes?.map((codes, i) => {
                              return (
                                <tr
                                  className="table-active practice-font text-center"
                                  key={i}
                                  onClick={() => alert("code Clicked")}
                                >
                                  <td>{codes?.diagnosis_code}</td>
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
        {/* ********************* 1st Modal Add from HCPCS List start ********************* */}

        <div
          className="modal fade text-dark"
          id="NPIRegistryModaltriggerinRefProvider"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-hidden="true"
          aria-labelledby="NPIRegistryModaltriggerinRefProvider"
          tabindex={-1}
        >
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5 fw-bold"
                  id="exampleModalToggleLabel"
                >
                  Select Range to display ICD
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/* ********* First Modal Input Fields ********* */}
                <div className="col-md-12 px-1">
                  <>
                    {/* <div className="col-md-6 mt-2">
                        <label className="fw-bold">All Codes</label>
                        <select
                          className="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                          // onChange={(e) => setReferringtype(e.target.value)}
                          id="allcodes"
                          name="allcodes"
                        >
                          <option value=""></option>
                          <option value="P"></option>
                        </select>
                      </div> */}
                    <label htmlFor="">Enter Code to Search For</label>
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      placeholder="Enter Code"
                      required
                      aria-label="entercode"
                      id="procedurecode"
                      name="procedurecode"
                      maxLength={60}
                      // disabled={individual_checked}
                      // onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
                      // onChange={handleChange}
                      // onBlur={handleBlur}
                      // value={values?.NPIorganizationname.toUpperCase()}
                    />

                    <input
                      className="form-control form-control-sm mb-3 mt-3"
                      type="text"
                      placeholder="Enter Keyword to Search For"
                      aria-label="searchkeyword"
                      id="searchkeyword"
                      name="searchkeyword"
                      // onChange={(e) => setSearchDescription(e.target.value)}
                      // onChange={handleChange}
                      // onBlur={handleBlur}
                      // value={values?.NPItaxonomyname.toUpperCase()}
                    />
                    {/* <div className="col-md-6 mt-2">
                        <label className="fw-bold">Order Results By</label>
                        <select
                          className="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                          // onChange={(e) => setReferringtype(e.target.value)}
                          id="allcodes"
                          name="allcodes"
                        >
                          <option value="">Description</option>
                          <option value="P"></option>
                        </select>
                      </div> */}
                  </>
                </div>

                {/* ********* End First Modal Input Fields ********* */}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-sm btn-outline-primary"
                  data-bs-target="#exampleModalToggle2"
                  data-bs-toggle="modal"
                  // onClick={SendSearchHCPCSQuery}
                >
                  Search
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* ********************* 1st Modal Add from HCPCS List end ********************* */}
        {/* ********************* 2nd Modal Add from HCPCS List start ********************* */}
        <div
          className="modal fade text-dark"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          id="exampleModalToggle2"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel2"
          tabindex={-1}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5 fw-bold"
                  id="exampleModalToggleLabel2"
                >
                  Add From HCPCS List
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="col-md-11 mx-2">
                <label htmlFor="">Search for HCPCS codes</label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  placeholder="Enter Code"
                  aria-label="entercode"
                  id="searchHcpcsCode"
                  name="searchHcpcsCode"
                  maxLength={60}
                  // disabled={individual_checked}
                  // onChange={(e) => setSearch(e.target.value)}
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  // value={values?.NPIorganizationname.toUpperCase()}
                />
              </div>
              <table className="table table-hover table-sm mt-3 table-bordered caption-top">
                <thead className="mx-2">
                  <tr className="bg-primary">
                    <th scope="col">Selected</th>
                    <th scope="col">Added</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {resultCode.length == 0 ? "No Record Found" : resultCode.map((code, i) => (
                      <tr
                       data-bs-toggle="modal"
                      // is logic ko main table me click krne pr use krenege
                      onClick={()=>SaveHCPCSCodeOnclick(code[0],code[1])}
                      >
                        <td htmlFor="excludeCode">
                          <input
                            // onClick={() => setExcludceCode(1)}
                            className="form-check-input mx-4"
                            type="checkbox"
                            value=""
                            id="excludeCode"
                          />
                        </td>
                        <td>{code[0]}</td>
                        <td>{code[1]}</td>
                      </tr>
                    ))} */}
                </tbody>
              </table>
              <div className="modal-footer">
                <button
                  className="btn btn-sm btn-outline-primary"
                  data-bs-target="#NPIRegistryModaltriggerinRefProvider"
                  data-bs-toggle="modal"
                  // onClick={resetState}
                >
                  Back to Search
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  data-bs-dismiss="modal"
                  // onClick={resetState}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* ********************* 2nd Modal Add from HCPCS List end ********************* */}

        {/* ---------------------- main screen ------------------------------ */}
        <div className="col-md-9">
          <div className="input-group input-group-sm">
            <input
              className="form-control form-control-sm"
              type="text"
              placeholder="Search for Diagnosis codes by code or description."
              aria-label="NPI"
              id="diagnosisCodesearch"
              name="diagnosisCodesearch"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              maxLength="10"
            />
            <button
              type="button"
              className="btn btn-outline-primary input-group-text btn-hov btn-sm"
              id="diagnosisCodesearchbtn"
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
              <div className={`card-header text-dark`}>
                <i className="fas fa-box-open me-1"></i>
                Recently Opened
              </div>
              <div className="card-body">
                <div className="col-md-12 col-sm-6 col-xs-3">
                  <table className="table table-light table-hover table-striped table table-bordered">
                    <thead>
                      <tr className="text-center">
                        <th scope="col">Code</th>
                        <th scope="col">Description</th>
                        <th scope="col">Inactice</th>
                      </tr>
                    </thead>

                    <tbody>
                      {diagnoseCodes.length == 0
                        ? "Please Wait..."
                        : diagnoseCodes?.map((codes, i) => {
                            return (
                              <tr
                                className="table-active practice-font text-center"
                                key={i}
                                onClick={() => handleEdit(codes.id)}
                              >
                                <td>{codes?.diagnosis_code}</td>
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

export default Diagnosis;
