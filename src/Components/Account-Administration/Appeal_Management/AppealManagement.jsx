import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import API from "../../Api/ClientApi";
import Swal from "../../GLOBAL/SwalAlert";

const AppealManagement = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   API.get("claim/track")
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
    <div className="row my-3 -md-12 d-flex ">
      <div
        className="col-md-7"
        style={{ overflowY: "scroll", height: "calc(100vh - 127px)" }}
      >
        <div className="d-flex  col-md-11 justify-content-between">
          <div className="d-flex gap-2 col-md-4">
            <div className="col-md-6">
              <Link to="appealManagementdeal">
                <button className="btn col-md-10 btn-sm btn-outline-primary">
                  Load
                </button>
              </Link>
            </div>{" "}
          </div>
        </div>
        <div className="card mb-2 mt-4">
          <div className="card-header">Appeal Management</div>
          <div className="card-body ">
            <div>
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
                  data-bs-toggle="modal"
                  data-bs-target="#StatmentTracker_Provider"
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
                                {/* {patientData.map((provi, i) => (
                                  <tr
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() =>
                                      getProviderIdName(
                                        provi.first_name +
                                          " " +
                                          provi.last_name,
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
                        <h1
                          className="modal-title fs-5"
                          id="staticBackdropLabel"
                        >
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
                              <option value="WILLIAMS,JOHN">
                                WILLIAMS,JOHN
                              </option>
                              <option value="CARLOS,BRENDA">
                                CARLOS,BRENDA
                              </option>
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
export default AppealManagement;
