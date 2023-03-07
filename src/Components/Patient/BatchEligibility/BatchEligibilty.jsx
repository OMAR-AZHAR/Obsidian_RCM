import { useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "../../../GLOBAL/SwalAlert";
import API from "../../../Api/ClientApi";
import { Link } from "react-router-dom";

function BatchEligibilty() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   API.get("patient/batch/eligibility")
  //     .then(function (response) {})
  //     .catch(function (error) {
  //       if (error.response.data.data == 403) {
  //         Swal.fire({
  //           icon: "error",
  //           imageHeight: 30,
  //           imageWidth: 30,
  //           title: "Sorry...",
  //           text: "Please contact your administrator to get Permissions!",
  //           confirmButtonColor: "#08619b",
  //         });
  //         navigate(-1);
  //       }
  //     });
  // }, []);
  return (
    <div className="row mb-2 mt-3 d-flex">
      <div className="col-md-6 px-4">
        <div className="col-md-12 px-2 d-flex justify-content-between">
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

        <div
          className="col-md-12 d-flex flex-column px-2"
          style={{ overflowY: "scroll", height: "calc(100vh - 127px)" }}
        >
          {/* ----------- Main Dev ---------------*/}
          <div className="col-md-5 d-flex  mt-2 flex-column">
            <label htmlFor="">Search by :</label>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDisabled"
                id="flexRadioDisabled"
              />
              <label class="form-check-label" for="flexRadioDisabled">
                Appointments
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDisabled"
                id="flexRadioCheckedDisabled"
                checked
              />
              <label class="form-check-label" for="flexRadioCheckedDisabled">
                Claims
              </label>
            </div>
          </div>
          <div className="d-flex gap-2 mt-2 col-md-12">
            <div className="col-md-12 ">
              <div>
                <label htmlFor="">Claims Date of Service</label>
              </div>
              <div className="col-md-12 d-flex mt-2 gap-2">
                <div className="d-flex flex-column col-md-3">
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
                <div className="d-flex flex-column col-md-3">
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
            </div>
          </div>
          <div className="col-md-12 mt-3">
            <select
              id="defaultChargeStatus"
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
            >
              <option selected>UNIT (UN)</option>
              <option value="Balance Due Patient">Balance Due Patient</option>
              <option value="On Hold">On Hold</option>
              <option value="Pending Patient">Pending Patient</option>
            </select>
          </div>
          <div className="col-md-12 mt-3">
            <select
              id="defaultChargeStatus"
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
            >
              <option selected>UNIT (UN)</option>
              <option value="Balance Due Patient">Balance Due Patient</option>
              <option value="On Hold">On Hold</option>
              <option value="Pending Patient">Pending Patient</option>
            </select>
          </div>
          <div className="col-md-12 mt-3">
            <div className="input-group col-md-12">
              <input
                // autoFocus
                className="form-control form-control-sm placeTextTax"
                type="text"
                placeholder="Patient"
                aria-label="npi"
                id="patient"
                name="patient"
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
                data-bs-target="#claimtrackerpatient"
              >
                <i className="fas fa-search" aria-hidden="true" />
              </button>
            </div>
          </div>
          {/* ******************************  patient Modal */}
          <div
            className="modal fade"
            id="claimtrackerpatient"
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
                        id="claim_refPCP_Provider"
                        name="claim_refPCP_Provider"
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
                    <div className="card-body ">
                      <table className="table table-light mt-2 table-hover table-striped mt-2 table table-bordered">
                        <thead>
                          <tr>
                            <th>Account #</th>
                            <th>Name</th>
                            <th>Date of Birtht</th>
                            <th>Insured</th>
                            <th>Balalnce due pat</th>
                            <th>Account Type</th>
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
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* ******************************   Payers   Modal */}
          <div className="form-check mt-2">
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
              Search Inactive Patients
            </label>
          </div>
          {/* ---------------------------------------------- END ------------- */}
          <div className="col-md-12 mt-2">
            <div className="input-group col-md-12">
              <input
                // autoFocus
                className="form-control form-control-sm placeTextTax"
                type="text"
                placeholder="Payers"
                aria-label="npi"
                id="payers"
                name="payers"
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
                data-bs-target="#claimtrackerpayer"
              >
                <i className="fas fa-search" aria-hidden="true" />
              </button>
            </div>
          </div>
          {/* ****************************** payer  Modal */}
          <div
            className="modal fade"
            id="claimtrackerpayer"
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
                    All Payers
                  </h1>
                </div>
                <div className="modal-body">
                  <div className="col-md-12 mb-2">
                    <div className="input-group">
                      <input
                        className="form-control form-control-sm placeTextTax"
                        type="text"
                        placeholder="Search for providers "
                        aria-label="npi"
                        id="renderProvsearch"
                        name="renderProvsearch"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                      />
                    </div>
                  </div>
                  <table className="table table-light table-hover table-striped table table-bordered">
                    <thead>
                      <tr>
                        <th>Selected</th>
                        <th>Plan Name</th>
                        <th>Address</th>
                        <th>Payer Name</th>
                        <th>Reference #</th>
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
                <div className="modal-footer">
                  <div className="col-md-12 d-flex justify-content-between">
                    <div className="d-flex gap-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="Payersselectall"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="manageAccsearch_inactive"
                        >
                          Select All
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="includeInactivePayers"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="manageAccsearch_inactive"
                        >
                          Include Inactive Payers
                        </label>
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn mx-2 btn-outline-primary btn-sm"
                      >
                        Select
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ---------------------------------------------- END ------------- */}
          {/* ****************************** payer ID  */}
          <div className="col-md-12 mt-3">
            <div className="input-group col-md-12">
              <input
                // autoFocus
                className="form-control form-control-sm placeTextTax"
                type="text"
                placeholder="Payer ID"
                aria-label="npi"
                id="payersid"
                name="payersid"
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
                data-bs-target="#payerid"
              >
                <i className="fas fa-search" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div
            className="modal fade"
            id="payerid"
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
                    All Payers
                  </h1>
                </div>
                <div className="modal-body">
                  <div className="col-md-12 mb-2">
                    <div className="input-group">
                      <input
                        className="form-control form-control-sm placeTextTax"
                        type="text"
                        placeholder="Search for providers "
                        aria-label="npi"
                        id="renderProvsearch"
                        name="renderProvsearch"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                      />
                    </div>
                  </div>
                  <table className="table table-light table-hover table-striped table table-bordered">
                    <thead>
                      <tr>
                        <th>Plane Name</th>
                        <th>Address</th>
                        <th>Payer Name</th>
                        <th>Reference</th>
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
                <div className="modal-footer">
                  <div className="col-md-12 d-flex justify-content-between">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="includeInactivePayers"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="manageAccsearch_inactive"
                      >
                        Include Inactive Payers
                      </label>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ---------------------------------------------- END ------------- */}
          <div className="col-md-12 mt-3">
            <select
              id="defaultChargeStatus"
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
            >
              <option selected>UNIT (UN)</option>
              <option value="Balance Due Patient">Balance Due Patient</option>
              <option value="On Hold">On Hold</option>
              <option value="Pending Patient">Pending Patient</option>
            </select>
          </div>
          <div className="col-md-5 mt-3">
            <select
              id="defaultChargeStatus"
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
            >
              <option selected>Any</option>
              <option value="Equals">Equals</option>
              <option value="Greate Than">Greate Than</option>
              <option value="Less Than">Less Than</option>
              <option value="Batween">Batween</option>
            </select>
          </div>
          <div className="form-check col-md-12 mt-3">
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
              Only show patients and payers configuared dot electronic
              eligibility
            </label>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        Please select filter criteria and run search to view results
      </div>
    </div>
  );
}

export default BatchEligibilty;