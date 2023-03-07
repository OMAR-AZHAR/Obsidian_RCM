import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import API from "../../../Api/ClientApi";
import Swal from "../../../GLOBAL/SwalAlert";

const FollowUpManagment = () => {
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
    <div className="row my-2">
      <div className="col-md-12 d-flex ">
        {" "}
        <div
          className="col-md-6 px-2  "
          style={{ overflowY: "scroll", height: "calc(100vh - 127px)" }}
        >
          <div className="col-md-12 d-flex justify-content-between">
            <div className="d-flex">
              <p>Filters</p>
              <Link
                to=""
                data-bs-toggle="modal"
                data-bs-target="#loadFilters"
                className="mx-2 text-decoration-none"
              >
                Load
              </Link>
              <Link to="" className="text-decoration-none">
                Save
              </Link>
            </div>
            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="loadFilters"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              // tabIndex="-1"
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

          <div className="card mb-2">
            <div className="card-header">Follow Up Option</div>
            <div className="card-body ">
              <div className="col-md-12 d-flex flex-column">
                <div className="col-md-12">
                  <label htmlFor="">Claim Status</label>
                  <select
                    id="defaultChargeStatus"
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected>Claim at Insurance</option>
                    <option value="Claim Type">Balance Due Patient</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Pending Patient">Pending Patient</option>
                  </select>
                </div>
                {/* ------------------    Time  -------------- */}
                <div className="col-md-12 d-flex mt-2 gap-1 flex-column">
                  <div>
                    <label htmlFor="">Follow Up Date</label>

                    <div className="col-md-12 d-flex gap-3">
                      <div className="d-flex flex-column col-md-3">
                        {/* <label htmlFor="">Date Submitted</label> */}
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
                        {/* <label htmlFor="">Date Submitted</label> */}
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
                        {/* <label htmlFor="">To</label> */}
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

                  <div>
                    <label htmlFor="">Date of Services</label>

                    <div className="col-md-12 d-flex gap-3">
                      <div className="d-flex flex-column col-md-3">
                        {/* <label htmlFor="">Date Submitted</label> */}
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
                        {/* <label htmlFor="">Date Submitted</label> */}
                        <input
                          // value={date}
                          // onChange={(e) => {
                          //   getdata(e);
                          // }}
                          type="date"
                          id="Recall Date"
                          name="Recall Date"
                          className="form-control form-control-sm  "
                        />
                      </div>
                      <div className="d-flex flex-column">
                        {/* <label htmlFor="">To</label> */}
                        <input
                          // value={enddate}
                          // onChange={(e) => {
                          //   getEnddata(e);
                          // }}
                          type="date"
                          id="Recall Date"
                          name="end_date"
                          className="form-control form-control-sm "
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="">Last Billed Ins Date</label>

                    <div className="col-md-12 d-flex gap-3">
                      <div className="d-flex flex-column col-md-3">
                        {/* <label htmlFor="">Date Submitted</label> */}
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
                        {/* <label htmlFor="">Date Submitted</label> */}
                        <input
                          // value={date}
                          // onChange={(e) => {
                          //   getdata(e);
                          // }}
                          type="date"
                          id="Follow Up Date"
                          name="Follow Up Date"
                          className="form-control form-control-sm  "
                        />
                      </div>
                      <div className="d-flex flex-column">
                        {/* <label htmlFor="">To</label> */}
                        <input
                          // value={enddate}
                          // onChange={(e) => {
                          //   getEnddata(e);
                          // }}
                          type="date"
                          id="Follow Up Date"
                          name="Follow Up Date"
                          className="form-control form-control-sm "
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mt-2">
                  <select
                    id="defaultChargeStatus"
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected>UNIT (UN)</option>
                    <option value="Balance Due Patient">
                      Balance Due Patient
                    </option>
                    <option value="On Hold">On Hold</option>
                    <option value="Pending Patient">Pending Patient</option>
                  </select>
                </div>

                <div className="col-md-4 mt-2">
                  <label htmlFor="">Days Since Last Billed Ins</label>
                  <select
                    id="defaultChargeStatus"
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected>Any</option>
                    <option value="Days Since Last Billed Ins">
                      Days Since Last Billed Ins
                    </option>
                    <option value="Days Since Last Billed Ins">
                      Days Since Last Billed Ins
                    </option>
                  </select>
                </div>

                <div className="col-md-12 d-flex flex-column">
                  <div className="col-md-12 mt-2">
                    <label htmlFor="">Claim Status</label>
                    <select
                      id="defaultChargeStatus"
                      className="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                    >
                      <option selected>Claim at Insurance</option>
                      <option value="Balance Due Patient">
                        Balance Due Patient
                      </option>
                      <option value="On Hold">On Hold</option>
                      <option value="Pending Patient">Pending Patient</option>
                    </select>
                  </div>

                  <div className="col-md-12 mt-3">
                    <div className="input-group">
                      <input
                        className="form-control placeTextTax"
                        type="text"
                        placeholder="Current Payer"
                        aria-label="Current Payer"
                        id="Current Payer"
                        name="Current Payer"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        // onChange={handleChange}
                        // value={claimRefferingProv}
                        ////onBlur={handleBlur}
                      />{" "}
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
                    </div>
                  </div>

                  <div className="col-md-12 mt-3">
                    <select
                      id="defaultChargeStatus"
                      className="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                    >
                      <option selected>Current Payer Type</option>
                      <option value="Claim Type">Claim Type</option>
                      <option value="Claim Type">Claim Type</option>
                      <option value="Claim Type">Claim Type</option>
                    </select>
                  </div>

                  <div className="col-md-12 mt-3">
                    <select
                      id="defaultChargeStatus"
                      className="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                    >
                      <option selected>Practice Provider</option>
                      <option value="Claim Type">Claim Type</option>
                      <option value="Claim Type">Claim Type</option>
                      <option value="Claim Type">Claim Type</option>
                    </select>
                  </div>

                  <div className="col-md-12 mt-3">
                    <select
                      id="defaultChargeStatus"
                      className="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                    >
                      <option selected>Provider</option>
                      <option value="Claim Type">Claim Type</option>
                      <option value="Claim Type">Claim Type</option>
                      <option value="Claim Type">Claim Type</option>
                    </select>
                  </div>

                  <div className="col-md-12 mt-3">
                    <select
                      id="defaultChargeStatus"
                      className="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                    >
                      <option selected>Facility</option>
                      <option value="Claim Type">Claim Type</option>
                      <option value="Claim Type">Claim Type</option>
                      <option value="Claim Type">Claim Type</option>
                    </select>
                  </div>

                  <div className="col-md-12 mt-3">
                    <select
                      id="defaultChargeStatus"
                      className="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                    >
                      <option selected>Create User</option>
                      <option value="Claim Type">Claim Type</option>
                      <option value="Claim Type">Claim Type</option>
                      <option value="Claim Type">Claim Type</option>
                    </select>
                  </div>

                  <div className="col-md-12 mt-3">
                    <div className="input-group">
                      <input
                        className="form-control placeTextTax"
                        type="text"
                        placeholder="Select Claim"
                        aria-label=" Select Claim"
                        id="Select Claim"
                        name="Select Claim"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        // onChange={handleChange}
                        // value={claimRefferingProv}
                        ////onBlur={handleBlur}
                      />{" "}
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
                    </div>
                  </div>

                  <div className="col-md-12 ">
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
                      />{" "}
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
                            <h1
                              className="modal-title fs-5"
                              id="staticBackdropLabel"
                            >
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
                                  <i
                                    className="fas fa-search"
                                    aria-hidden="true"
                                  />
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
                                      {/* {patientData.map((provi, i) => (
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
                              ))} */}
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
                  </div>
                </div>

                <div className="card mb-2 mt-3">
                  <div className="card-header">Task Options</div>
                  <div className="card-body ">
                    <div className="d-flex col-md-12 flex-column">
                      <div className="col-md-12">
                        <label htmlFor="">Task Assigned</label>
                        <select
                          id="defaultChargeStatus"
                          className="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                        >
                          <option selected>All</option>
                          <option value="Claim Type">Claim Type</option>
                          <option value="Claim Type">Claim Type</option>
                          <option value="Claim Type">Claim Type</option>
                        </select>
                      </div>{" "}
                      <div className="col-md-12 mt-3">
                        <select
                          id="defaultChargeStatus"
                          className="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                        >
                          <option selected>Status</option>
                          <option value="Claim Type">Claim Type</option>
                          <option value="Claim Type">Claim Type</option>
                          <option value="Claim Type">Claim Type</option>
                        </select>
                      </div>
                      <div className="mt-2">
                        <label htmlFor="">Date of Services</label>

                        <div className="col-md-12 d-flex gap-3">
                          <div className="d-flex flex-column col-md-3">
                            {/* <label htmlFor="">Date Submitted</label> */}
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
                              <option value="last-12-Months">
                                Last 12 Months
                              </option>
                            </select>
                          </div>
                          <div className="d-flex flex-column col-md-5">
                            {/* <label htmlFor="">Date Submitted</label> */}
                            <input
                              // value={date}
                              // onChange={(e) => {
                              //   getdata(e);
                              // }}
                              type="date"
                              id="Recall Date"
                              name="Recall Date"
                              className="form-control form-control-sm  "
                            />
                          </div>
                          <div className="d-flex flex-column">
                            {/* <label htmlFor="">To</label> */}
                            <input
                              // value={enddate}
                              // onChange={(e) => {
                              //   getEnddata(e);
                              // }}
                              type="date"
                              id="Recall Date"
                              name="end_date"
                              className="form-control form-control-sm "
                            />
                          </div>
                        </div>

                        <div className="col-md-12 mt-3 d-flex justify-content-between align-items-center">
                          <div className="col-md-8">
                            {" "}
                            <input
                              className="form-control form-control-sm placeTextTax"
                              type="text"
                              placeholder="Assigned To"
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
                          <div className="p-1 col-md-3 ">
                            <button className="btn btn-primary btn-sm col-md-12 ">
                              <i className="fas fa-user"></i> &nbsp;Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FollowUpManagment;
