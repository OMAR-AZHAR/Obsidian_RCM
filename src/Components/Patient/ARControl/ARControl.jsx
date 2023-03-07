import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "../../../GLOBAL/SwalAlert";
import API from "../../../Api/ClientApi";

const ARControl = () => {
  const navigate = useNavigate();
  useEffect(() => {
    API.get("patient/account/recieve")
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
    <div className="row mt-4 mb-2  d-flex">
      <div className="col-md-6" style={{ borderRight: "2px solid #d9dbdb" }}>
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
              onClick={() => alert("display Search")}
              type="button"
              className="btn btn-outline-primary btn-sm"
            >
              <span className="fas fa-search"></span> &nbsp;Search
            </button>
          </div>
        </div>
        <div
          style={{ overflowY: "scroll", height: "calc(100vh - 127px)" }}
          className="px-2"
        >
          <div className="col-md-4">
            <select
              id="defaultChargeStatus"
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
            >
              <option selected>Any</option>
              <option value="Equals">Equals</option>
              <option value="Greater than">Greater than</option>
              <option value="Batween">Batween</option>
              <option value="Less Than">Less Than</option>
            </select>
          </div>
          {/* ------------------  Card   --------------------- huz */}
          <div className="card mb-2 mt-2">
            <div className="card-header">Date Search Options</div>
            <div className="col-md-12 d-flex align-items-center mt-2">
              <label className="" htmlFor="">
                ilter search by
              </label>
              <input
                className="form-check-input mx-2"
                type="radio"
                name="filterBy"
                id="byofdays"
              />
              <label className="form-check-label mt-1" htmlFor="otheraccno">
                By date tange
              </label>
              <input
                className="form-check-input mx-2"
                type="radio"
                name="filterBy"
                id="bydaterange"
              />
              <label className="form-check-label mt-1" htmlFor="otheraccyes">
                By DOS
              </label>
            </div>
            <div className="card-body ">
              <div className="col-md-12 d-flex flex-column">
                <div className="col-md-5">
                  <label className="">Days Since Last Seen</label>
                  <select
                    id="defaultChargeStatus"
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected>Any</option>
                    <option value="Equals">Equals</option>
                    <option value="Greater than">Greater than</option>
                    <option value="Batween">Batween</option>
                    <option value="Less Than">Less Than</option>
                  </select>
                </div>

                <div className="col-md-5 mt-2">
                  <label className="">Days Since last Payment</label>
                  <select
                    id="defaultChargeStatus"
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected>Any</option>
                    <option value="Equals">Equals</option>
                    <option value="Greater than">Greater than</option>
                    <option value="Batween">Batween</option>
                    <option value="Less Than">Less Than</option>
                  </select>
                </div>

                <div className="col-md-5 mt-2">
                  <label className="">Days Since last Statment</label>
                  <select
                    id="defaultChargeStatus"
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected>Any</option>
                    <option value="Equals">Equals</option>
                    <option value="Greater than">Greater than</option>
                    <option value="Batween">Batween</option>
                    <option value="Less Than">Less Than</option>
                  </select>
                </div>

                <div className="col-md-5 mt-2">
                  <label className="">Days Since last FDN</label>
                  <select
                    id="defaultChargeStatus"
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected>Any</option>
                    <option value="Equals">Equals</option>
                    <option value="Greater than">Greater than</option>
                    <option value="Batween">Batween</option>
                    <option value="Less Than">Less Than</option>
                  </select>
                </div>

                <div className="col-md-5 mt-2">
                  <label className="">Days Since last Collection</label>
                  <select
                    id="defaultChargeStatus"
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected>Any</option>
                    <option value="Equals">Equals</option>
                    <option value="Greater than">Greater than</option>
                    <option value="Batween">Batween</option>
                    <option value="Less Than">Less Than</option>
                  </select>
                </div>

                <div className="col-md-5 mt-2">
                  <label className="">Days Since Date of Service</label>
                  <select
                    id="defaultChargeStatus"
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected>Any</option>
                    <option value="Equals">Equals</option>
                    <option value="Greater than">Greater than</option>
                    <option value="Batween">Batween</option>
                    <option value="Less Than">Less Than</option>
                  </select>
                </div>

                <div className="col-md-5 mt-2">
                  <label className="">Days Since First Billed</label>
                  <select
                    id="defaultChargeStatus"
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected>Any</option>
                    <option value="Equals">Equals</option>
                    <option value="Greater than">Greater than</option>
                    <option value="Batween">Batween</option>
                    <option value="Less Than">Less Than</option>
                  </select>
                </div>

                <div className="col-md-5 mt-2">
                  <label className="">Days Since Set To Due Patient</label>
                  <select
                    id="defaultChargeStatus"
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected>Any</option>
                    <option value="Equals">Equals</option>
                    <option value="Greater than">Greater than</option>
                    <option value="Batween">Batween</option>
                    <option value="Less Than">Less Than</option>
                  </select>
                </div>

                <div className="col-md-5 mt-2">
                  <label className="">
                    Days Since Last Statment sent for Claim
                  </label>
                  <select
                    id="defaultChargeStatus"
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected>Any</option>
                    <option value="Equals">Equals</option>
                    <option value="Greater than">Greater than</option>
                    <option value="Batween">Batween</option>
                    <option value="Less Than">Less Than</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="col-md-5 mt-2">
              <label className="">Paper Statements Sent</label>
              <select
                id="defaultChargeStatus"
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected>Any</option>
                <option value="Equals">Equals</option>
                <option value="Greater than">Greater than</option>
                <option value="Batween">Batween</option>
                <option value="Less Than">Less Than</option>
              </select>
            </div>

            <div className="col-md-5 mt-2">
              <label className="">Electronic Statemetns Sent</label>
              <select
                id="defaultChargeStatus"
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected>Any</option>
                <option value="Equals">Equals</option>
                <option value="Greater than">Greater than</option>
                <option value="Batween">Batween</option>
                <option value="Less Than">Less Than</option>
              </select>
            </div>

            <div className="col-md-5 mt-2">
              <label className="">Total Statements Sent</label>
              <select
                id="defaultChargeStatus"
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected>Any</option>
                <option value="Equals">Equals</option>
                <option value="Greater than">Greater than</option>
                <option value="Batween">Batween</option>
                <option value="Less Than">Less Than</option>
              </select>
            </div>

            <div className="input-group mt-3">
              <input
                className="form-control form-control-sm placeTextTax"
                type="text"
                placeholder="Patient"
                aria-label="ref_pro"
                id="Patient"
                name="Patient"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
                // onChange={handleChange}
                // value={claimRefferingProv}
                ////onBlur={handleBlur}
                data-bs-toggle="modal"
                data-bs-target="#patientModal"
              />
              <button
                data-bs-toggle="modal"
                data-bs-target="#patientModal"
                title="Select referring Provider"
                type="button"
                className="input-group-text btn-hov"
                id="claim_ref_Providerbtn"
              >
                <i className="fas fa-search" aria-hidden="true" />
              </button>
              {/* -----------------   Patient Modal  -------------------- */}
              <div
                className="modal fade"
                id="patientModal"
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
                        Save
                      </button>
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
              {/* -----------------   End  -------------------- */}
            </div>

            <div className="col-md-12 mt-2">
              <label className="">Accont Type</label>
              <select
                id="defaultChargeStatus"
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected>Any</option>
                <option value="Equals">Equals</option>
                <option value="Greater than">Greater than</option>
                <option value="Batween">Batween</option>
                <option value="Less Than">Less Than</option>
              </select>
            </div>

            <div className="col-md-5 mt-2">
              <label className="">Set to Send Statement</label>
              <select
                id="Set to Send Statement"
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected>Any</option>
                <option value="Equals">Equals</option>
                <option value="Greater than">Greater than</option>
                <option value="Batween">Batween</option>
                <option value="Less Than">Less Than</option>
              </select>
            </div>

            <div className="col-md-5 mt-2">
              <label className="">Set to Send FDN</label>
              <select
                id="Set to Send Statement"
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected>Any</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="input-group mt-3">
              <input
                className="form-control form-control-sm placeTextTax"
                type="text"
                placeholder="Patient"
                aria-label="ref_pro"
                id="Patient"
                name="Patient"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
                // onChange={handleChange}
                // value={claimRefferingProv}
                ////onBlur={handleBlur}
                data-bs-toggle="modal"
                data-bs-target="#patientModal"
              />
              <button
                data-bs-toggle="modal"
                data-bs-target="#payerModal"
                title="Select referring Provider"
                type="button"
                className="input-group-text btn-hov"
                id="claim_ref_Providerbtn"
              >
                <i className="fas fa-search" aria-hidden="true" />
              </button>
              {/* -----------------   Payer Modal  -------------------- */}
              <div
                className="modal fade"
                id="payerModal"
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
                        <div className="d-flex mx-2">
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
                              Select All
                            </label>
                          </div>
                          <div className="form-check  mx-3">
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
                            className="btn btn-primary btn-sm mx-2"
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
              {/* -----------------   End  -------------------- */}
            </div>
            <div className="col-md-12 mt-2">
              <label className="">Charges Balance</label>
              <select
                id="defaultChargeStatus"
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected>
                  Balance Due Patient,Pendinf Patinet,Collectin,Claim At
                  Insurance
                </option>
                <option value="Equals">Radio</option>
                <option value="Greater than">Radio</option>
                <option value="Batween">Radio</option>
                <option value="Less Than">Radio</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        Please select filter criteria and run search to view results
      </div>
    </div>
  );
};

export default ARControl;
