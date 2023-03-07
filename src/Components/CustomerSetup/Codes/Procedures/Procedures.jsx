import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  getProcedureCode,
  getDescription,
} from "../../../../Redux/features/Codes/Codes";
import ProcedureShowAllModal from "./ProcedureShowAllModal";
import ProcedureTable from "./ProcedureTable";
import { useDispatch } from "react-redux";
import API from "../../../../Api/ClientApi";
import Swal from "../../../../GLOBAL/SwalAlert";
const userData = [
  {
    id: 1,
    name: "cpt1",
    deleted_at: null,
  },
  {
    id: 1,
    name: "cpt2",
    deleted_at: "active",
  },
];

const Procedures = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openNewProcedureCode = () => {
    navigate("/new-procedureCode", { replace: true });
  };

  // HCPCS states
  const [searchCode, setSearchCode] = useState("");
  const [searchDescription, setSearchDescription] = useState("");
  // CPT states
  const [searchCPTCode, setSearchCPTCode] = useState("");
  const [searchCPTResult, setSearchCPTResult] = useState([]);

  // search result data
  const [resultCode, setResultCode] = useState([]);
  const [resultDescription, setResultDescription] = useState("");
  const [procedureCodes, setprocedureCodes] = useState([]);
  // console.log("cpt results", procedureCodes);
  // procedure codes data from api
  const handleEdit = (id) => {
    navigate(`/setup/code/procedure/${id}`, { replace: true });
  };
  useEffect(() => {
    const fetchProcedureCodes = async () => {
      const response = await API.get("customersetup/code/procedure");
      const newData = response.data.data;
      setprocedureCodes(newData);
    };

    fetchProcedureCodes();
  }, []);
  // send code or description to search in HCPCS API
  const SendSearchHCPCSQuery = () => {
    -API.get(
      `https://clinicaltables.nlm.nih.gov/api/hcpcs/v3/search?terms=air&q=${searchCode}`,
      {}
    )
      .then(function (response) {
        console.log("response", response.data[3]);
        setResultCode(response.data[3]);
        // setResultDescription(response.data[3][0][1])
      })
      .catch((error) => {});
  };
  // send code or description to search in CPT Table
  const SendSearchCPTQuery = () => {
    -API.get(`customersetup/code/search/procedure?cptcode=${searchCPTCode}`, {})
      .then(function (response) {
        setSearchCPTResult(response.data.data);
      })
      .catch((error) => {});
  };
  // save procedure & description in procedureCode Table
  const SaveHCPCSCodeOnclick = (code, description) => {
    -API.post("customersetup/code/icd/procedure/store", {
      code: code,
      description: description,
    })
      .then(function (response) {
        if (response.data.status == 201) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "HCPCS Code Added",
            showConfirmButton: false,
            timer: 1500,
          });
          searchCode("");
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {});
  };
  // save procedure & description in CPT Table
  const saveCPTOnClick = (cptCode, cptDescription) => {
    -API.post("customersetup/code/icd/procedure/store", {
      code: cptCode,
      description: cptDescription,
    })
      .then(function (response) {
        if (response.data.status == 201) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "CPT Code Added",
            showConfirmButton: false,
            timer: 1500,
          });
          resetState();
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {});
  };
  // reset search states after closing model
  const resetState = () => {
    resultCode([]);
    searchCPTResult([]);
  };
  //update form
  const UpdateDetails = useCallback(
    (code) => {
      navigate(`/edit-procedureCode/${code}`), { replace: true };
    },
    [navigate]
  );
  // const UpdateDetails = (code) => {
  //   console.log("Procedure  Code", code);
  //   navigate(`/edit-procedureCode/${code}`, { replace: true });
  //   // dispatch(getProcedureCode(code));
  //   // dispatch(getDescription(description));
  // };
  // console.log("procedureCodes", procedureCodes);
  return (
    <div className="row d-flex mt-4">
      <div className="col-md-6 d-flex">
        <div className="col-md-4 d-flex flex-column">
          <button
            type="button"
            onClick={openNewProcedureCode}
            className="btn btn-labeled btn-outline-primary btn-sm mb-2"
          >
            <span className="btn-label">
              <i className="fa fa-plus"></i>
            </span>{" "}
            New CPT <span>&#174;</span> /HCPCS
          </button>
          {/* ********************* 1st Modal Add from HCPCS List start ********************* */}
          <button
            type="button"
            className="btn btn-labeled btn-outline-primary btn-sm mb-2"
            data-bs-toggle="modal"
            data-bs-target="#NPIRegistryModaltriggerinRefProvider"
          >
            <span className="btn-label">
              <i className="fa fa-cloud-arrow-down"></i>
            </span>{" "}
            Add From HCPCS List
          </button>
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
                    Select Range to display (HCPCS List)
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
                        onChange={(e) =>
                          setSearchCode(e.target.value.toUpperCase())
                        }
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
                        onChange={(e) => setSearchDescription(e.target.value)}
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
                    onClick={SendSearchHCPCSQuery}
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
                    {resultCode.length == 0 ? (
                      <span className="text-danger d-flex justify-content-center align-content-center align-items-centerm">
                        {"No Record Found"}
                      </span>
                    ) : (
                      resultCode.map((code, i) => (
                        <tr
                          data-bs-toggle="modal"
                          // is logic ko main table me click krne pr use krenege
                          onClick={() => SaveHCPCSCodeOnclick(code[0], code[1])}
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
                      ))
                    )}
                  </tbody>
                </table>
                <div className="modal-footer">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    data-bs-target="#NPIRegistryModaltriggerinRefProvider"
                    data-bs-toggle="modal"
                    onClick={resetState}
                  >
                    Back to Search
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    data-bs-dismiss="modal"
                    onClick={resetState}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* ********************* 2nd Modal Add from HCPCS List end ********************* */}

          {/* ********************* Add from CPT List start ********************* */}
          <button
            type="button"
            className="btn btn-labeled btn-outline-primary btn-sm mb-2"
            data-bs-toggle="modal"
            data-bs-target="#addfromCPTList"
          >
            <span className="btn-label">
              <i className="fa fa-cloud-arrow-down"></i>
            </span>{" "}
            Add From CPT <span>&#174;</span> List
          </button>
          {/* ================== Add from CPT List 1st model start ============ */}
          <div
            className="modal fade text-dark"
            id="addfromCPTList"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            aria-hidden="true"
            aria-labelledby="addfromCPTList"
            tabindex={-1}
          >
            <div className="modal-dialog modal-md modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5 fw-bold"
                    id="exampleModalToggleLabel"
                  >
                    Select Range to display (CPT List)
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
                        placeholder="Enter CPT Code"
                        required
                        aria-label="entercode"
                        id="procedurecode"
                        name="procedurecode"
                        maxLength={60}
                        // disabled={individual_checked}
                        onChange={(e) =>
                          setSearchCPTCode(e.target.value.toUpperCase())
                        }
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
                        onChange={(e) =>
                          setSearchCPTDescription(e.target.value)
                        }
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
                    data-bs-target="#cptlistsecond"
                    data-bs-toggle="modal"
                    onClick={SendSearchCPTQuery}
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
          {/* ================== Add from CPT List 1st model end============= */}
          {/* ================== Add from CPT List 2nd model start============= */}

          <div
            className="modal fade text-dark"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            id="cptlistsecond"
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
                    Add From CPT List
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="col-md-11 mx-2">
                  <label htmlFor="">Search for HCPT codes</label>
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
                      <th scope="col">Code</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchCPTResult.length == 0 ? (
                      <span className="text-danger d-flex justify-content-center mt-1">
                        No Record Found
                      </span>
                    ) : (
                      searchCPTResult.map((cpt, i) => (
                        <tr
                          data-bs-toggle="modal"
                          // is logic ko main table me click krne pr use krenege
                          onClick={() =>
                            saveCPTOnClick(cpt.CPT_CODE, cpt.DESCRIPTION)
                          }
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
                          <td></td>
                          <td>{cpt.CPT_CODE}</td>
                          <td>{cpt.DESCRIPTION}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <div className="modal-footer">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    data-bs-target="#addfromCPTList"
                    data-bs-toggle="modal"
                    onClick={resetState}
                  >
                    Back to Search
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    data-bs-dismiss="modal"
                    onClick={resetState}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* ================== Add from CPT List 2nd model end============= */}

          {/* ********************* Add from CPT List end********************* */}

          {/* ********************* show all model start ********************* */}
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            className="btn btn-labeled btn-outline-primary btn-sm d-flex"
          >
            <span className="btn-label">
              <i className="fas fa-bars mx-3"></i>
            </span>{" "}
            <span className="">Show All</span>
          </button>
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    All Procedure Codes
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="input-group input-group-sm">
                    <input
                      type="text"
                      id="search"
                      name="search"
                      // value={query}
                      // onChange={(e) => handleSearch(e)}
                      className="form-control w-25"
                      aria-label="Small"
                      placeholder="Search for roles"
                      aria-describedby="inputGroup-sizing-sm"
                    />
                  </div>

                  <table className="table table-hover table-sm mt-3 table-bordered caption-top">
                    <thead>
                      <tr className="bg-primary">
                        <th scope="col">Code</th>
                        <th scope="col">Price</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {procedureCodes?.length == 0
                        ? "Please Wait..."
                        : procedureCodes?.map((role, i) => (
                            <tr
                              data-bs-toggle="modal"
                              onClick={() => UpdateDetails(role[0], role[1])}
                              key={i}
                            >
                              <td>{role?.procedure_code}</td>
                              <td>{role?.description}</td>
                              <td>
                                {"$" +
                                  Number.parseFloat(role?.default_price) +
                                  ".00"}
                              </td>

                              <td>
                                {role?.deleted_at == null ? (
                                  <span style={{ color: "#26859C" }}>
                                    Active
                                  </span>
                                ) : (
                                  <span style={{ color: "black" }}>
                                    Inactive
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
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
          {/* ********************* show all model end ********************* */}
        </div>
        {/* main page */}
        <div className="col-md-12 mx-3 d flex-column">
          <div className="input-group input-group-sm">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Search
              </span>
            </div>
            <input
              type="text"
              id="search"
              name="search"
              // value={queryMain}
              // onChange={(e) => handleSearchMain(e)}
              className="form-control form-control-sm"
              aria-label="Small"
              placeholder="Search for roles by name or id"
              aria-describedby="inputGroup-sizing-sm"
            />
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
          <div className="col-md-12 mt-3">
            <div className="card mb-4">
              <div className={`card-header text-dark`}>
                <i className="fas fa-box-open me-1"></i>
                Recently Opened
              </div>
              <div className="card-body">
                {/* <open recent table /> */}
                <table className="table table-hover table-sm mt-3 table-bordered caption-top">
                  <thead>
                    <tr className="bg-primary">
                      <th scope="col">Code</th>
                      <th scope="col">Description</th>
                      <th>Price</th>
                      <th>Inactive</th>
                    </tr>
                  </thead>
                  <tbody>
                    {procedureCodes.length == 0
                      ? "Please Wait..."
                      : procedureCodes.map((role, i) => (
                          <tr
                            data-bs-toggle="modal"
                            // onClick={() => UpdateDetails(role[0], role[1])}
                            // onClick={() => UpdateDetails(role?.id)}
                            onClick={() => handleEdit(role.id)}
                            // key={i}
                          >
                            <td>{role?.procedure_code}</td>
                            <td>{role?.description}</td>
                            <td>
                              {"$" +
                                Number.parseFloat(role?.default_price) +
                                ".00"}
                            </td>

                            <td>
                              {role?.deleted_at == null ? (
                                <span style={{ color: "#26859C" }}>Active</span>
                              ) : (
                                <span style={{ color: "black" }}>Inactive</span>
                              )}
                            </td>
                          </tr>
                        ))}
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

export default Procedures;
