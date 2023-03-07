import { useEffect } from "react";
import { useNavigate } from "react-router";
import API from "../../../Api/ClientApi";
import Swal from "../../../GLOBAL/SwalAlert";
const ClaimTracker = () => {
  const navigate = useNavigate();
  useEffect(() => {
    API.get("claim/track")
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
  }, []);
  return (
    <div className="row my-3 -md-12 d-flex ">
      <div
        className="col-md-7"
        style={{ overflowY: "scroll", height: "calc(100vh - 127px)" }}
      >
        <div className="d-flex  col-md-11 justify-content-between">
          <div className="d-flex  gap-2 col-md-4">
            <label htmlFor="" className="fs-6 mt-1">
              Filter
            </label>
            <button className="btn btn-sm btn-outline-primary">Load</button>
            <button className="btn btn-sm btn-outline-primary">Save</button>
          </div>

          <div className="d-flex gap-2 col-md-3">
            <div className="dropdown col-md-12 ">
              <button
                type="button"
                // onClick={() => navigate("/institutionalClaim", { replace: true })}

                className="btn btn-outline-primary btn-sm col-md-11 mx-2 dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Download Report
              </button>
              <ul className="dropdown-menu">
                <li>
                  <p className="dropdown-item">Clearinghouse Reports </p>
                </li>
              </ul>
            </div>
            <div className="col-md-2">
              <button className="btn btn-sm btn-outline-primary">Save</button>
            </div>
          </div>
        </div>
        <div className="card mb-2 mt-4">
          <div className="card-header">Claim Tracking Date Range</div>
          <div className="card-body ">
            <div className="col-md-12 d-flex align-items-center mt-2">
              <label className="" htmlFor="">
                Filter search by
              </label>
              <input
                className="form-check-input mx-2"
                type="radio"
                name="OtherAccd"
                id="otheraccno"
              />
              <label className="form-check-label mt-1" htmlFor="otheraccno">
                By date submitted
              </label>
              <input
                className="form-check-input mx-2"
                type="radio"
                name="OtherAccd"
                id="otheraccyes"
              />
              <label className="form-check-label mt-1" htmlFor="otheraccyes">
                By DOS
              </label>
            </div>

            <div className="col-md-12 d-flex flex-column mt-2">
              <div className="d-flex flex-column ">
                <div className="col-md-12 d-flex mt-2 gap-2">
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
                  <div className="d-flex flex-column col-md-3">
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

                <div className="col-md-12 d-flex mt-2 gap-2">
                  <div className="d-flex  col-md-3  flex-column">
                    <label htmlFor=""> Status Date</label>
                    <select
                      // onChange={(e) => {
                      //   changeDate(e);
                      // }}
                      className="form-select form-select-sm  col-md-12"
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
                  <div className="d-flex col-md-3 flex-column">
                    <label htmlFor="">Fromm</label>
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
                  <div className="d-flex flex-column col-md-3">
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
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-2">
          <div className="card-header">Claim Filter</div>
          <div className="card-body ">
            <div className="col-md-12">
              <select
                id="defaultChargeStatus"
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected>Submissin Type</option>
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
                <option selected>Processing Mode</option>
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
                <option selected>Tracking Status Type</option>
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
                <option selected>Tracking Status Source</option>
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
                <option selected>Claim Status</option>
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
                <option selected>Claim Type</option>
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
                <option selected>Tracking Status (Condition)</option>
                <option value="Balance Due Patient">Balance Due Patient</option>
                <option value="On Hold">On Hold</option>
                <option value="Pending Patient">Pending Patient</option>
              </select>
            </div>
          </div>
        </div>

        <div className="col-md-12 mt-3 d-flex flex-column">
          <div className="col-md-7">
            <div className="input-group col-md-12">
              <input
                // autoFocus
                className="form-control form-control-sm placeTextTax"
                type="text"
                placeholder="TCN"
                aria-label="npi"
                id="manageAccsearchpatient"
                name="manageAccsearchpatient"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
          </div>

          <div className="col-md-7 mt-2">
            <div className="input-group col-md-12">
              <input
                // autoFocus
                className="form-control form-control-sm placeTextTax"
                type="text"
                placeholder="Insurance check#"
                aria-label="npi"
                id="manageAccsearchpatient"
                name="manageAccsearchpatient"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
          </div>

          <div className="col-md-7 mt-2">
            <div className="input-group col-md-12">
              <input
                // autoFocus
                className="form-control form-control-sm placeTextTax"
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
                          <option value="GALBERT,JASMIN">GALBERT,JASMIN</option>
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
          {/* ---------------------------------------------- END ------------- */}

          <div className="col-md-7 mt-2">
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

          {/* ****************************** claim tracker patient Modal */}
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
          {/* ---------------------------------------------- END ------------- */}

          <div className="col-md-7 mt-2">
            <div className="input-group col-md-12">
              <input
                // autoFocus
                className="form-control form-control-sm placeTextTax"
                type="text"
                placeholder="Payer ID"
                aria-label="searchforPayer"
                id="searchforPayer"
                name="payerid"
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
                data-bs-target="#claimtrackerpayerid"
              >
                <i className="fas fa-search" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* ****************************** claim tracker payer ID Modal */}
          <div
            className="modal fade"
            id="claimtrackerpayerid"
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

          {/* ****************************** claim tracker payer  Modal */}
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

          <div className="col-md-12 mt-2">
            <div className="col-md-12">
              <select
                id="defaultChargeStatus"
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected>Payer Type</option>
                <option value="Balance Due Patient">Balance Due Patient</option>
                <option value="On Hold">On Hold</option>
                <option value="Pending Patient">Pending Patient</option>
              </select>
            </div>
          </div>

          <div className="col-md-12 mt-2">
            <div className="col-md-12">
              <select
                id="defaultChargeStatus"
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected>Billing Providers</option>
                <option value="Balance Due Patient">Balance Due Patient</option>
                <option value="On Hold">On Hold</option>
                <option value="Pending Patient">Pending Patient</option>
              </select>
            </div>
          </div>

          <div className="col-md-12 mt-2">
            <div className="col-md-12">
              <select
                id="defaultChargeStatus"
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected>Rendering Providers</option>
                <option value="Balance Due Patient">Balance Due Patient</option>
                <option value="On Hold">On Hold</option>
                <option value="Pending Patient">Pending Patient</option>
              </select>
            </div>
          </div>

          <div className="col-md-12 mt-2">
            <div className="col-md-12">
              <select
                id="defaultChargeStatus"
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected>Facilities</option>
                <option value="Balance Due Patient">Balance Due Patient</option>
                <option value="On Hold">On Hold</option>
                <option value="Pending Patient">Pending Patient</option>
              </select>
            </div>
          </div>
          <div className="col-md-12 gap-2 d-flex p-1 mt-2">
            <input
              // onClick={() => setExcludceCode(1)}
              className="form-check-input"
              type="checkbox"
              value=""
              id="excludeCode"
            />
            <label htmlFor="excludeCode mx-0">
              Pateint was admitted to a haspital{" "}
            </label>
          </div>
        </div>

        {/* Right-side End   */}
      </div>

      <div className="col-md-5">
        <p>Please select filter criteria and run search to view results</p>
      </div>
    </div>
  );
};
export default ClaimTracker;