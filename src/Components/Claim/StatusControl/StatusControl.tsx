import { useEffect } from "react";
import { useNavigate } from "react-router";
import API from "../../../Api/ClientApi";
import Swal from "../../../GLOBAL/SwalAlert";
const StatusControl = () => {
  const navigate = useNavigate();
  useEffect(() => {
    API.get("claim/status/control")
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
        {/* ******************************** Filter Div */}
        <div className="d-flex flex-row col-md-12 justify-content-between">
          <div className="d-flex  gap-2 col-md-5">
            <label htmlFor="" className="fs-6 mt-1">
              Filter
            </label>
            <button className="btn btn-sm btn-outline-primary col-md-4">
              Load
            </button>
            <button className="btn btn-sm btn-outline-primary col-md-4">
              Save
            </button>
          </div>

          <div className=" col-md-2 justify-content-end">
            <button className="btn col-md-12 btn-outline-primary btn-sm">
              <span className="fas fa-search"></span> Search
            </button>
          </div>
        </div>
        {/* ****************************************************** */}
        <div className="col-md-12 mb-2 mt-4">
          <div className="col-md-12 d-flex flex-column mt-2">
            <div className="d-flex flex-column ">
              <div className="col-md-12 d-flex ">
                <div className="col-md-7">
                  <label htmlFor="">Claim Status</label>
                  <select
                    id="claimstatus"
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected>Waiting For Review</option>
                    <option value="Balance Due Patient">
                      Balance Due Patient
                    </option>
                    <option value="On Hold">On Hold</option>
                    <option value="Claim At Insurance">
                      Claim At Insurance
                    </option>
                    <option value="Pending  Insurance">
                      Pending Insurance
                    </option>{" "}
                    <option value="Pending Patient">Pending Patient</option>{" "}
                    <option value="Pending Physcian">Pending Physcian</option>{" "}
                    <option value="Collection">Collection</option>{" "}
                    <option value="Paid">Paid</option>
                  </select>
                </div>
                <div className="form-check  mx-4 col-md-4 mt-4">
                  <input
                    className="form-check-input fs-6"
                    type="checkbox"
                    value=""
                    id="Included deleted"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="manageAccsearch_inactive"
                  >
                    Included deleted
                  </label>
                </div>
              </div>

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
                  <label htmlFor="">From</label>
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
                  <label htmlFor="">From</label>
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

              <div className="col-md-12 d-flex mt-2 gap-2">
                <div className="d-flex  col-md-3  flex-column">
                  <label htmlFor=""> Last Submitted Date</label>
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
                  <label htmlFor="">From</label>
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
        {/* ***********************************Input Div */}
        <div className="col-md-12 mt-3 d-flex flex-column">
          <div className="col-md-12 mt-2">
            <div className="col-md-12">
              <label htmlFor="">Review Status</label>
              <select
                id="defaultChargeStatus"
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected>All</option>
                <option value="Unrewied">Unrewied</option>
                <option value="Rewied-All">Rewied-All</option>
                <option value="Rewied-Clean">Rewied-Clean</option>{" "}
                <option value="Rewied-Not Clean">Rewied-Not Clean</option>{" "}
                <option value="Rewied-Error">Rewied-Error</option>{" "}
                <option value="Rewied-warning">Rewied-warning</option>
              </select>
            </div>

            <div className="col-md-12 mt-2">
              <label htmlFor="">Claim Type</label>
              <select
                id="claimtype"
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected>All</option>
                <option value="Professional">Professional</option>
                <option value="Institutional">Institutional</option>
              </select>
            </div>
            {/* ****************************************** Cuttent Payer */}
            <div className="input-group col-md-12 mt-2">
              <input
                // autoFocus
                className="form-control  placeTextTax"
                type="text"
                placeholder="Current Payer"
                aria-label="npi"
                id="currentpayer"
                name="currentpayer"
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
                data-bs-target="#currentpayermodal"
              >
                <i className="fas fa-search" aria-hidden="true" />
              </button>
            </div>
            {/* ******************************************** Current Payer Modal */}
            <div
              className="modal fade"
              id="currentpayermodal"
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
                          placeholder="Search for payers "
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
                          className=" mx-2 btn btn-primary btn-sm"
                          data-bs-dismiss="modal"
                        >
                          Select
                        </button>
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
            {/* **************************************************  END  ***** */}
            <div className="input-group col-md-12 mt-2">
              <input
                // autoFocus
                className="form-control  placeTextTax"
                type="text"
                placeholder="Current Payer ID#"
                aria-label="currentpayer"
                id="currentpayerid"
                name="currentpayerid"
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

            {/* ************************************ Payer ID Modal */}
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
                          placeholder="Search for payers "
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
            {/* select */}
            <div className="col-md-12 mt-2">
              <select
                id="defaultChargeStatus"
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected>All</option>
                <option value="Prodessional">Prodessional</option>
                <option value="Professional">Professional </option>
                <option value="Institutional">Institutional</option>
              </select>
            </div>
            {/* ****************************************** Patient Input */}
            <div className="input-group col-md-12 mt-2">
              <input
                // autoFocus
                className="form-control  placeTextTax"
                type="text"
                placeholder="Patient "
                aria-label="npi"
                id="Patient"
                name="Patient"
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
                data-bs-target="#patientStatusControl"
              >
                <i className="fas fa-search" aria-hidden="true" />
              </button>
            </div>
            {/* ****************************************** Patient Modal */}
            <div
              className="modal fade"
              id="patientStatusControl"
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
            {/* ***************************************************  END */}
            {/* ****************************************** Rendering Provider Input */}
            <div className="input-group col-md-12 mt-2">
              <input
                // autoFocus
                className="form-control  placeTextTax"
                type="text"
                placeholder="Rendering Provider"
                aria-label="npi"
                id="renderingprovider"
                name="renderingprovider"
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
                data-bs-target="#renderingProvider"
              >
                <i className="fas fa-search" aria-hidden="true" />
              </button>
            </div>
            {/* ****************************************** Rendering Provider Modal */}
            <div
              className="modal fade"
              id="renderingProvider"
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
                      All Providers
                    </h1>
                  </div>
                  <div className="modal-body">
                    <div className="col-md-12 mb-2 d-flex gap-2">
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
                          placeholder="Search for Providers"
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
                    <div className="d-flex col-md-12 gap-2 flex-column "></div>

                    <div className="card mb-2">
                      <div className="card-header">Recently Opened</div>
                      <div className="card-body ">
                        <table className="table table-light mt-2 table-hover table-striped mt-2 table table-bordered">
                          <thead>
                            <tr>
                              <th>Reference#</th>
                              <th>NPI</th>
                              <th>Name</th>
                              <th>Submitter #</th>
                              <th>Tax ID</th>
                              <th>Prof.Mode</th>
                              <th>Practice</th>
                              <th>Inst.Mode</th>
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
            {/* ***************************************************  END */}
            {/* ****************************************** Facility  Input */}

            <div className="input-group col-md-12 mt-2">
              <input
                // autoFocus
                className="form-control  placeTextTax"
                type="text"
                placeholder="Facillty"
                aria-label="npi"
                id="Facillty"
                name="Facillty"
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
                data-bs-target="#facilityModal1"
              >
                <i className="fas fa-search" aria-hidden="true" />
              </button>
            </div>

            {/* ****************************************** Facility Modal */}
            <div
              className="modal fade"
              id="facilityModal1"
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
                      All Facilities
                    </h1>
                  </div>
                  <div className="modal-body">
                    <div className="col-md-12 mb-2 d-flex gap-2">
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
                          placeholder="Search for Providers"
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
                    <div className="d-flex col-md-12 gap-2 flex-column "></div>

                    <div className="card mb-2">
                      <div className="card-header">Recently Opened</div>
                      <div className="card-body ">
                        <table className="table table-light mt-2 table-hover table-striped mt-2 table table-bordered">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Address #</th>
                              <th></th>
                              <th>NPI</th>
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
            {/* ***************************************************  END */}
            {/* ******************************************  Procedure Code Input */}
            <div className="input-group col-md-12 mt-2">
              <input
                // autoFocus
                className="form-control  placeTextTax"
                type="text"
                placeholder="Procedure Code"
                aria-label="npi"
                id="Procedurecode "
                name="Procedurecode"
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
                data-bs-target="#procedurecodemodal"
              >
                <i className="fas fa-search" aria-hidden="true" />
              </button>
            </div>
            {/* ****************************************** Procedure Code Modal */}

            <div
              className="modal fade  col-md-12"
              id="procedurecodemodal"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog  modal-dialog-centered modal-md col-md-12">
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="col-md-12  mb-2 d-flex gap-2">
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
                      <div className=" col-md-3 justify-content-end">
                        <button
                          className="btn col-md-12 btn-outline-primary btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#procedurecodemodal2"
                        >
                          <span className="fas fa-bars mx-2"></span> Show All
                        </button>
                      </div>
                    </div>
                    <div className="d-flex col-md-7 gap-2  ">
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
                          Include inactive codes
                        </label>
                      </div>{" "}
                    </div>

                    <div className="card mb-2">
                      <div className="card-header">Recently Opened</div>
                      <div className="card-body ">
                        <table className="table table-light table-hover table-striped mt-2 table table-bordered">
                          <thead>
                            <tr>
                              <th>Code</th>
                              <th>Description</th>
                              <th>Price</th>
                              <th>Inactive</th>
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
            {/* ****************************************** Procedure Code Show All Inner  Modal */}
            <div
              className="modal fade"
              id="procedurecodemodal2"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered  modal-md    col-md-12">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">
                      All Procedure Codes
                    </h1>
                  </div>
                  <div className="modal-body">
                    <div className="col-md-12 mb-2 d-flex gap-2">
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
                          placeholder="Search for Codes"
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
                    <div className="d-flex col-md-12 gap-2 flex-column "></div>

                    <div className="card mb-2">
                      <div className="card-body ">
                        <table className="table table-light mt-2 table-hover table-striped mt-2 table table-bordered">
                          <thead>
                            <tr>
                              <th>code</th>
                              <th>Price</th>
                              <th>Description</th>
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
            {/* ***************************************************  END */}

            <div className="input-group col-md-12 mt-2">
              <input
                // autoFocus
                className="form-control  placeTextTax"
                type="text"
                placeholder="Tracking Status (Contains)"
                aria-label="npi"
                id="trackingstatus"
                name="trackingstatus"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
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
export default StatusControl;