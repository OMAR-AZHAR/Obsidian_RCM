import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "../../../GLOBAL/SwalAlert";
import API from "../../../Api/ClientApi";
import { Link } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";

const StatementTracker = () => {
  const [selected, setSelected] = useState([]);
  const [fetchProviders, setFetchProviders] = useState([]);
  const [providersChecks, setProvidersChecks] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [patientName, setPatientName] = useState([]);
  const [patientId, setPatientId] = useState([]);

  //-------------  Get Name and ID ------------
  const getProviderIdName = (name, id) => {
    setPatientName(name);
    setPatientId(id);
  };

  // const [ProviderValue, setProviderValue] = useState([]);

  const options = [
    { label: "Other", value: "Other  " },
    { label: "Insurance ", value: "Insurance" },
    { label: "Corporate", value: "Corporate" },
    { label: "Self Pay ", value: "Self Pay" },
    { label: "Courtesy", value: "Courtesy" },
    { label: "Collection", value: "Collection" },
    { label: "Pre-Collection", value: "Pre-Collection" },
    { label: "Type  I", value: "Type  I" },
    { label: "Type  II", value: "Type  II" },
    { label: "Payment Plan", value: "Payment Plan" },
    { label: "Payment Plan Collection", value: "Payment Plan Collection" },
    { label: "Auto", value: "Auto" },
  ];

  const navigate = useNavigate();
  useEffect(() => {
    API.get("patient/statement/track")
      .then(function (response) {})
      .catch(function (error) {
        if (error.response.data.data == 403) {
          Swal.fire({
            icon: "error",
            imageHeight: 30,
            imageWidth: 30,
            title: "Sorry...",
            text: "Please contact your administrator to get Permissions!",
            confirmButtonColor: "#08619b",
          });
          navigate(-1);
        }
      });

    const fetchProvider = async () => {
      const response = await API.get("customersetup/provider");
      const newData = response.data.data;
      setFetchProviders(newData);
    };
    // ---------  Patient Fettch API ------------
    const fetchPatient = async () => {
      const response = await API.get("patient");
      const newData = response.data.data;
      console.log(newData);
      setPatientData(newData);
    };

    fetchProvider();
    fetchPatient();
  }, []);

  const optionGet = fetchProviders.map((prov) => {
    prov.first_name;
  });

  console.log("providersChecks" + patientData);
  return (
    <div className="row my-2">
      <div className="col-md-12 d-flex ">
        <div
          className="col-md-6 px-2"
          style={{ overflowY: "scroll", height: "calc(100vh - 127px)" }}
        >
          <div className="col-md-12 d-flex justify-content-between">
            <div className="d-flex">
              <p>Filters</p>
              <Link
                data-bs-toggle="modal"
                data-bs-target="#loadFilters"
                className="mx-2 text-decoration-none"
              >
                Load
              </Link>
              <Link className="text-decoration-none">Save</Link>
            </div>
            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="loadFilters"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">
                      All Filters
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">...</div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-primary">
                      Understood
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button
                // onClick={() => alert("display Search")}
                type="button"
                className="btn btn-outline-primary btn-sm"
              >
                <span className="fas fa-search"></span> &nbsp;Search
              </button>
            </div>
          </div>

          <div className="col-md-12 d-flex mt-2 gap-3">
            <div className="d-flex flex-column col-md-3">
              <label htmlFor="">Date Submitted</label>
              <select
                // onChange={(e) => {
                //   changeDate(e);
                // }}
                className="form-select form-select-sm "
                aria-label=".form-select-sm example"
              >
                <option value="today">Today</option>
                <option value="all">All</option>
                <option value="other">Other</option>
                <option value="yesterday">Yesterday</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
                <option value="this-year">This Year</option>
                <option value="last-week">Last Week</option>
                <option value="last-month">Last Month</option>
                <option value="last-year">Last Year</option>
                <option value="last-7-days">Last 7 days</option>
                <option value="last-30-days">Last 30 days</option>
                <option value="last-60-days">Last 60 days</option>
                <option value="last-90-days">Last 90 days</option>
                <option value="last-12-Months">Last 12 Months</option>
              </select>
            </div>
            <div className="d-flex flex-column col-md-4">
              <label htmlFor="">Date Submitted</label>
              <input
                // value={date}
                // onChange={(e) => {
                //   getdata(e);
                // }}
                type="date"
                id="start_date"
                name="start_date"
                className="form-control form-control-sm  "
              />
            </div>
            <div className="d-flex flex-column">
              <label htmlFor="">To</label>
              <input
                // value={enddate}
                // onChange={(e) => {
                //   getEnddata(e);
                // }}
                type="date"
                id="end_date"
                name="end_date"
                className="form-control form-control-sm "
              />
            </div>
          </div>

          <div className="col-md-12 d-flex flex-column">
            <div className="col-md-12 d-flex flex-column">
              <div className="col-md-12 mt-3">
                <div>
                  <label htmlFor="">Format :</label>
                </div>
                <div className="form-check mx-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="manageAccsearch_inactive"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="manageAccsearch_inactive"
                  >
                    Automated Statement
                  </label>
                </div>

                <div className="mx-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="manageAccsearch_inactive"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="manageAccsearch_inactive"
                    >
                      Paper Statement
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="manageAccsearch_inactive"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="manageAccsearch_inactive"
                    >
                      Electronic Statement
                    </label>
                  </div>
                </div>

                <div className="form-check mt-1 mx-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="manageAccsearch_inactive"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="manageAccsearch_inactive"
                  >
                    User Print
                  </label>
                </div>

                <div className="form-check mx-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="manageAccsearch_inactive"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="manageAccsearch_inactive"
                  >
                    Plain Text
                  </label>
                </div>

                <div className="form-check mx-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="manageAccsearch_inactive"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="manageAccsearch_inactive"
                  >
                    Enhanced
                  </label>
                </div>

                <div className="form-check mx-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="manageAccsearch_inactive"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="manageAccsearch_inactive"
                  >
                    Electronic
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-2">
              <label htmlFor="">Type : </label>
              <div className="mx-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="manageAccsearch_inactive"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="manageAccsearch_inactive"
                  >
                    Statement
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="manageAccsearch_inactive"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="manageAccsearch_inactive"
                  >
                    FDN
                  </label>
                </div>{" "}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="manageAccsearch_inactive"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="manageAccsearch_inactive"
                  >
                    Payment Plan
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex col-md-12 mt-2 flex-column">
            <div className="col-md-12">
              <label htmlFor="">Automated Statement Status</label>
              <select
                id="defaultChargeStatus"
                className="form-select mt-2"
                aria-label="sm example"
              >
                <option selected>All</option>
                <option value="Sent">Sent</option>
                <option value="Sent and Forwarded">Sent and Forwarded</option>
                <option value="Corrected and Sent">Corrected and Sent</option>
                <option value="Error">Error</option>
                <option value="Warning">Warning</option>
                <option value="Fixed">Fixed</option>
              </select>
            </div>

            <div className="col-md-12 mt-3 d-flex ">
              <input
                className={`form-control`}
                type="text"
                placeholder="Incoice #"
                aria-label="Incoice #"
                id="icdp"
                name="icp"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
                maxLength={10}
                minLength={10}
              />
            </div>

            {/* ------------------   Patient Input ----------------------- */}
            <div className="input-group mt-3">
              <input
                className="form-control  placeTextTax"
                type="text"
                placeholder="Patient"
                aria-label="ref_pro"
                id="Patient"
                name="Patient"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
                value={patientName}
              />
              <button
                data-bs-toggle="modal"
                data-bs-target="#StatmentTracker_Provider"
                title="Select Patient Patient"
                type="button"
                className="input-group-text btn-hov"
                id="Patient"
              >
                <i className="fas fa-search" aria-hidden="true" />
              </button>
            </div>
            {/* ------------------   Patient Modal ----------------------- */}
            <div
              className="modal fade"
              id="StatmentTracker_Provider"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">
                      Patient Search
                    </h1>
                  </div>
                  <div className="modal-body">
                    <div className="col-md-7 mb-2 d-flex gap-2">
                      <div className="input-group">
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#refPcp_providerModal"
                          title="Select referring Provider"
                          type="button"
                          className="input-group-text btn-hov"
                          id="claim_ref_Providerbtn"
                        >
                          <i className="fas fa-search" aria-hidden="true" />
                        </button>
                        <input
                          className="form-control form-control-sm placeTextTax"
                          type="text"
                          placeholder="Search by name,DOB,account,member ID,phone #"
                          aria-label="ref_pro"
                          id="StatmentTracker_Provider"
                          name="StatmentTracker_Provider"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          // onChange={handleChange}
                          // value={claimRefferingProv}
                          ////onBlur={handleBlur}
                        />
                      </div>
                    </div>
                    <div className="d-flex col-md-12 gap-2 flex-column ">
                      <div className="col-md-5 d-flex align-items-center">
                        <label className="" htmlFor="">
                          Search By :
                        </label>
                        <input
                          className="form-check-input mx-2"
                          type="radio"
                          name="searchby "
                          id="searchby"
                        />
                        <label
                          className="form-check-label mt-1"
                          htmlFor="otheraccno"
                        >
                          Patient
                        </label>
                        <input
                          className="form-check-input mx-2"
                          type="radio"
                          name="searchbyPatient"
                          id="searchbyPatient"
                        />
                        <label
                          className="form-check-label mt-1"
                          htmlFor="otheraccyes"
                        >
                          Insured
                        </label>
                      </div>

                      <div className="d-flex gap-2">
                        <div className="form-check  mt-1">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="searchbyPatientInsured"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="searchInactivePatients"
                          >
                            Search Inactive Patients
                          </label>
                        </div>{" "}
                        <div className="form-check mt-1">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="showexactmatchesonly"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="manageAccsearch_inactive"
                          >
                            Show exact matches only
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="card mb-2">
                      <div className="card-header">Recently Opened</div>
                      <div
                        className="col-md-12"
                        style={{
                          overflowY: "scroll",
                          height: "calc(50vh - 80px)",
                        }}
                      >
                        <div className="card-body ">
                          <table className="table table-light mt-2 table-hover table-striped mt-2 table table-bordered">
                            <thead>
                              <tr>
                                <th>Account #</th>
                                <th>Name</th>
                                <th>Date of Birtht</th>
                                <th>Insured</th>
                                <th>Balance due pat</th>
                                <th>Account Type</th>
                              </tr>
                            </thead>
                            <tbody>
                              {patientData.map((provi, i) => (
                                <tr
                                  key={i}
                                  data-bs-dismiss="modal"
                                  onClick={() =>
                                    getProviderIdName(
                                      provi.first_name + " " + provi.last_name,
                                      provi.id
                                    )
                                  }
                                >
                                  <td>{provi.id}</td>
                                  <td>
                                    {provi.first_name + " " + provi.last_name}
                                  </td>

                                  <td>{provi.dob}</td>
                                  <td>{"provi.insurance"}</td>
                                  <td>{provi.patient_types}</td>
                                  <td>
                                    {provi.payements ? "Active" : "Inactive"}{" "}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                    >
                      Search
                    </button>
                    <button
                      type="button"
                      className="btn btn-light btn-sm"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* ------------------   END ----------------------- */}

            <div className="mt-3 col-md-12">
              <label htmlFor="">Account Type</label>
              <MultiSelect
                value={providersChecks}
                onChange={setProvidersChecks}
                options={options}
              />
            </div>

            <div className="mt-3 col-md-12">
              <label htmlFor="">Providers</label>

              <MultiSelect
                value={selected}
                onChange={setSelected}
                options={[{ optionGet, ...optionGet }]}
              />
            </div>

            {/* ------------------   Claim Input ----------------------- */}
            <div className="col-md-12 mt-3">
              <div className="input-group col-md-12">
                <input
                  // autoFocus
                  className="form-control  placeTextTax"
                  type="text"
                  placeholder="Claim#"
                  aria-label="npi"
                  id="claim#"
                  name="claim#"
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
                <button
                  type="button"
                  className="input-group-text btn-hov"
                  id="searchpatient"
                  data-bs-toggle="modal"
                  data-bs-target="#claimtrackerclaim"
                >
                  <i className="fas fa-search" aria-hidden="true" />
                </button>
              </div>
              {/* ****************************** claim  Modal */}
              <div
                className="modal fade"
                id="claimtrackerclaim"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">
                        Claim Search
                      </h1>
                    </div>
                    <div className="modal-body">
                      <div className="col-md-7 mb-2 d-flex gap-2">
                        <div className="input-group">
                          <input
                            className="form-control form-control-sm placeTextTax"
                            type="text"
                            placeholder="search by name,DOB,account#,member ID,claim ID, or TCN Number "
                            aria-label="npi"
                            id="renderProvsearch"
                            name="renderProvsearch"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                          />
                        </div>{" "}
                        <div className=" col-md-2 justify-content-end">
                          <button className="btn col-md-12 btn-outline-primary btn-sm">
                            <span className="fas fa-search"></span> Search
                          </button>
                        </div>
                      </div>
                      <div className="d-flex col-md-12 gap-2  ">
                        <div className="form-check  mt-1">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="manageAccsearch_inactive"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="manageAccsearch_inactive"
                          >
                            show exact matches only
                          </label>
                        </div>{" "}
                        <div className="form-check mt-1">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="manageAccsearch_inactive"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="manageAccsearch_inactive"
                          >
                            Show unpaid claims only
                          </label>
                        </div>
                        <div className="col-md-3  ">
                          <select
                            id="defaultChargeStatus"
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                          >
                            <option selected>Find for HOSS,AlBERT</option>
                            <option value="TEST,ATLAS">TEST,ATLAS</option>
                            <option value="On Hold">On Hold</option>
                            <option value="GALBERT,JASMIN">
                              GALBERT,JASMIN
                            </option>
                            <option value="THOMAS,BLUE">THOMAS,BLUE</option>
                            <option value="GRBIC,V">GRBIC,V</option>
                            <option value="BECK,SUSAN">BECK,SUSAN</option>
                            <option value="FRANCONI,SHARON">
                              FRANCONI,SHARON
                            </option>
                            <option value="SMITH,HENRY">SMITH,HENRY</option>
                            <option value="DOE,JOHN">DOE,JOHN</option>
                            <option value="PAUL,MARTIN">PAUL,MARTIN</option>
                            <option value="A">A</option>
                            <option value="BERRY,ROBERT">BERRY,ROBERT</option>
                            <option value="WILLIAMS,JOHN">WILLIAMS,JOHN</option>
                            <option value="CARLOS,BRENDA">CARLOS,BRENDA</option>
                            <option value="ORTIZ,BREMDA">ORTIZ,BREMDA</option>
                            <option value="DIAZ,TRACY">DIAZ,TRACY</option>
                            <option value="TOMAS,NANO">TOMAS,NANO</option>
                            <option value="TOSTER,LEONA">TOSTER,LEONA</option>
                            <option value="TURPIN,LYNN">TURPIN,LYNN</option>
                          </select>
                        </div>
                      </div>

                      <div className="card mb-2">
                        <div className="card-header">Recently Opened</div>
                        <div className="card-body ">
                          <table className="table table-light table-hover table-striped mt-2 table table-bordered">
                            <thead>
                              <tr>
                                <th>Claim #</th>
                                <th>Type</th>
                                <th>Patient</th>
                                <th>DOS</th>
                                <th>Total Charges</th>
                                <th>BalanceStatus</th>
                                <th>Status</th>
                                <th>Rendering</th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* {claimRenderingProviderData.map((provi, i) => ( */}
                              <tr
                                // key={i}
                                data-bs-dismiss="modal"
                                // onClick={() =>
                                //   getProviderIdName(
                                //     provi.first_name + " " + provi.last_name,
                                //     provi.id
                                //   )
                                // }
                              >
                                {/* <td>{provi.ref}</td>
                            <td>{provi.npi}</td>
                            <td>{provi.first_name + " " + provi.last_name}</td>
                            <td>{"000000"}</td>
                            <td>{provi.taxId}</td>
                            <td>{provi.ProfMode}</td>
                            <td>{provi.practice}</td>
                            <td>{provi.instMode}</td>
                          ))} */}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-light btn-sm"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*
            {/* ------------------   END ----------------------- */}
          </div>
        </div>

        {/* -------------  Left Side ----------------- */}
        <div className="col-md-6 m-4">
          <h3>Left Side</h3>
        </div>
      </div>
    </div>
  );
};

export default StatementTracker;