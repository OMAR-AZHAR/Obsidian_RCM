import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "../../../GLOBAL/SwalAlert";
import API from "../../../Api/ClientApi";
import { Link } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
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

const option = [
  {
    label: "SEND TO INSURANCE VIA CLEARINGHOUSE",
    value: "SEND TO INSURANCE VIA CLEARINGHOUSE",
  },
  {
    label: "USER PRINT & MAIL TO INSURANCE",
    value: "USER PRINT & MAIL TO INSURANCE",
  },
  { label: "BALANCE DUE PATIENT ", value: "BALANCE DUE PATIENT " },
  { label: "ON HOLD", value: "ON HOLD" },
  { label: "CLAIM AT INSURANCE", value: "CLAIM AT INSURANCE" },
  { label: "PENDING INSURANCE", value: "PENDING INSURANCE" },
  { label: "PENDING PATIENT", value: "PENDING PATIENT" },
  { label: "PENDING PHYSICIAN", value: "PENDING PHYSICIAN" },
  { label: "COLLECTION", value: "COLLECTION" },
  { label: "PAID", value: "PAID" },
  { label: "DELETED", value: "DELETED" },
  { label: "WAITNG FOR REVIEW", value: "WAITNG FOR REVIEW" },
  { label: "APPEAL AT  INSURANCE", value: "APPEAL AT  INSURANCE" },
  { label: "DENIED AT INSURANCE", value: "DENIED AT INSURANCE" },
  { label: "REJECTED AT CLEARINGEHOUSE", value: "REJECTED AT CLEARINGEHOUSE" },
  { label: "REJECTED AT INSURANCE", value: "REJECTED AT INSURANCE" },
  { label: "INCOMPLETE", value: "INCOMPLETE" },
];

// const Option = [
//   { label: "Greater", value: "Greater" },
//   { label: "Greater Than Or Equal To", value: "Greater Than Or Equal To" },
//   { label: "Batween", value: "Batween" },
// ];
const StatementBatchPrint = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   API.get("patient/statement/batch/print")
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

  // ----------------------    Select Arrray  --------------------
  const [selected, setSelected] = useState([]);

  const [chargetoinclude, setchargetoinclude] = useState([]);
  const [statmentforoutstandingcharges, setStatmentforoutstandingcharges] =
    useState(true);
  const [chargestoinclude, setchargestoinclude] = useState(false);
  const [paymentplanstatement, setpaymentplanstatement] = useState(false);
  const [finaldemandnotice, setfinaldemandnotice] = useState(false);

  const [sepatateStatementCheck, setsepatateStatementCheck] = useState(false);

  const handleStatmentForOutstandingCharges = () => {
    setStatmentforoutstandingcharges(true);
    setpaymentplanstatement(false);
    setfinaldemandnotice(false);
  };

  const handlePaymentPlanStatement = () => {
    setfinaldemandnotice(false);
    setStatmentforoutstandingcharges(false);
    setpaymentplanstatement(true);
  };

  const handleFinalDemandNotice = () => {
    setpaymentplanstatement(false);
    setStatmentforoutstandingcharges(false);
    setfinaldemandnotice(true);
  };

  return (
    <div className="my-2 ">
      <div className="col-md-12 ">
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
          <div className="col-md-12 d-flex flex-column">
            <div className="col-md-5 mt-2 d-flex  mt-2 flex-column">
              <label htmlFor="">Type :</label>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="searchBy"
                  id="searchBy"
                  onClick={() => {
                    handleStatmentForOutstandingCharges();
                  }}
                />
                <label class="form-check-label" for="flexRadioDisabled">
                  Statment for outstanding charges
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="searchBy"
                  id="searchBy"
                  onClick={() => handlePaymentPlanStatement()}
                />
                <label class="form-check-label" for="searchBy">
                  Payment plans statement
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="searchBy"
                  id="searchBy"
                  onClick={() => handleFinalDemandNotice()}
                />
                <label class="form-check-label" for="flexRadioCheckedDisabled">
                  Final Demand Notice
                </label>
              </div>
            </div>
            <hr />
            {statmentforoutstandingcharges && (
              <>
                <div className="col-md-12 d-flex flex-column">
                  <div className="d-flex  align-items-center gap-5 col-md-12">
                    <div className="col-md-5">
                      <label htmlFor="">Statement Amount</label>
                      <select
                        id="defaultChargeStatus"
                        className="form-select mt-1"
                        aria-label=".form-select-sm example"
                      >
                        <option selected>Greate Than</option>
                        <option value="Greater Than or Less Than">
                          Greater Than or Less Than
                        </option>
                        <option value="Batween">Batween</option>
                      </select>
                    </div>
                    <div className="col-md-3 mt-3">
                      <input
                        // autoFocus
                        className="form-control"
                        type="number"
                        placeholder="0.00"
                        aria-label="npi"
                        id=""
                        name=""
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                      />
                    </div>
                  </div>

                  <div className="d-flex  align-items-center mt-2 gap-5 col-md-12">
                    <div className="col-md-5">
                      <label htmlFor=""> Electronic Statement Sent</label>
                      <select
                        id="defaultChargeStatus"
                        className="form-select mt-1"
                        aria-label=".form-select-sm example"
                      >
                        <option selected>Any</option>
                        <option value="Equals">Equals</option>
                        <option value="Does Not Equal">Does Not Equal</option>
                        <option value="Greater Than">Greater Than</option>
                        <option value="Greater Then or Equal To">
                          Greater Then or Equal To
                        </option>
                        <option value="Less Than">Less Than</option>
                        <option value="Less Than or Equal To">
                          Less Than or Equal To
                        </option>
                        <option value="Batween">Batween</option>
                      </select>
                    </div>
                  </div>

                  <div className="d-flex  align-items-center mt-2 gap-5 col-md-12">
                    <div className="col-md-5">
                      <label htmlFor=""> Paper Statement Sent</label>
                      <select
                        id="defaultChargeStatus"
                        className="form-select mt-1"
                        aria-label=".form-select-sm example"
                      >
                        <option selected>Any</option>
                        <option value="Equals">Equals</option>
                        <option value="Does Not Equal">Does Not Equal</option>
                        <option value="Greater Than">Greater Than</option>
                        <option value="Greater Then or Equal To">
                          Greater Then or Equal To
                        </option>
                        <option value="Less Than">Less Than</option>
                        <option value="Less Than or Equal To">
                          Less Than or Equal To
                        </option>
                        <option value="Batween">Batween</option>
                      </select>
                    </div>
                  </div>

                  <div className="d-flex  align-items-center gap-5 col-md-12">
                    <div className="col-md-5">
                      <label htmlFor="">Total Statement Amount</label>
                      <select
                        id="defaultChargeStatus"
                        className="form-select mt-1"
                        aria-label=".form-select-sm example"
                      >
                        <option selected>Greate Than</option>
                        <option value="Greater Than or Less Than">
                          Greater Than or Less Than
                        </option>
                        <option value="Batween">Batween</option>
                      </select>
                    </div>
                    <div className="col-md-3 mt-3">
                      <input
                        // autoFocus
                        className="form-control"
                        type="number"
                        placeholder="0.00"
                        aria-label="npi"
                        id=""
                        name=""
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                      />
                    </div>
                  </div>

                  <div className="d-flex  align-items-center gap-5 col-md-12">
                    <div className="col-md-5">
                      <label htmlFor="">Days Since Last Statement </label>
                      <select
                        id="defaultChargeStatus"
                        className="form-select mt-1"
                        aria-label=".form-select-sm example"
                      >
                        <option selected>Greate Than</option>
                        <option value="Greater Than or Less Than">
                          Greater Than or Less Than
                        </option>
                        <option value="Batween">Batween</option>
                      </select>
                    </div>
                    <div className="col-md-3 mt-3">
                      <input
                        // autoFocus
                        className="form-control"
                        type="number"
                        placeholder="0.00"
                        aria-label="npi"
                        id=""
                        name=""
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                      />
                    </div>
                  </div>

                  <div className="d-flex  align-items-center gap-12 col-md-12">
                    <div className="col-md-11">
                      <label htmlFor="">Account Type</label>

                      <MultiSelect
                        options={options}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Select"
                      />
                    </div>
                  </div>
                </div>
                <hr />
                <div className="col-md-12 d-flex flex-column">
                  <div className="col-md-12 flex-column d-flex  mt-2">
                    <div className=" flex-column col-md-12">
                      <label htmlFor="">Charges to include</label>
                    </div>

                    <div>
                      <input
                        className="form-check-input mx-2"
                        type="radio"
                        name="chargestoinclude"
                        id="chargestoinclude"
                      />
                      <label
                        className="form-check-label mt-1"
                        htmlFor="Balance Due Patient"
                      >
                        Balance Due Patient
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12 d-flex align-items-center mt-2">
                    <input
                      className="form-check-input mx-2"
                      type="radio"
                      name="chargestoinclude"
                      id="chargestoinclude"
                    />
                    <label
                      className="form-check-label mt-1"
                      htmlFor=" Balance Due Patient, Pending Patient , and at Collection  "
                    >
                      Balance Due Patient, Pending Patient , and at Collection
                    </label>
                  </div>
                  <div className="col-md-12 d-flex align-items-center mt-2">
                    <input
                      className="form-check-input mx-2"
                      type="radio"
                      name="chargestoinclude"
                      id="chargestoinclude"
                    />
                    <label
                      className="form-check-label mt-1"
                      htmlFor="All charges, including Paid"
                    >
                      All charges, including Paid
                    </label>
                  </div>
                  <div className="col-md-5 d-flex align-items-center mt-2">
                    <input
                      onClick={() => setchargestoinclude(!chargestoinclude)}
                      className="form-check-input mx-2"
                      type="radio"
                      name="chargestoinclude"
                      id="chargestoinclude"
                    />
                    <label className="form-check-label mt-1" htmlFor="Custom">
                      Custom
                    </label>
                  </div>
                  {chargestoinclude && (
                    <div className="d-flex  align-items-center gap-12 col-md-12 mt-2">
                      <div className="col-md-11">
                        <label htmlFor="">Charge Status</label>

                        <MultiSelect
                          className="mt-2"
                          options={option}
                          value={chargetoinclude}
                          onChange={setchargetoinclude}
                          labelledBy="Select"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="col-md-12">
                  <div className="col-md-12 d-flex flex-column">
                    <div className="col-md-12 flex-column d-flex  mt-2">
                      <div className=" flex-column col-md-12">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="Separate statement"
                            id="Separate statement"
                            onClick={() =>
                              setsepatateStatementCheck(!sepatateStatementCheck)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="manageAccsearch_inactive"
                          >
                            Separate statement
                          </label>
                        </div>
                      </div>

                      <div>
                        <input
                          className="form-check-input mx-2"
                          type="radio"
                          disabled={!sepatateStatementCheck && true}
                          name="chargestoinclude"
                          id="chargestoinclude"
                          onClick={() =>
                            setSepatateStatement(!sepatateStatement)
                          }
                        />
                        <label
                          className="form-check-label mt-1"
                          htmlFor="Balance Due Patient"
                        >
                          By Provider
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12 d-flex align-items-center mt-2">
                      <input
                        className="form-check-input mx-2"
                        type="radio"
                        name="chargestoinclude"
                        id="chargestoinclude"
                        disabled={!sepatateStatementCheck && true}
                      />
                      <label
                        className="form-check-label mt-1"
                        htmlFor=" Balance Due Patient, Pending Patient , and at Collection  "
                      >
                        By Practice
                      </label>
                    </div>
                    <div className="col-md-12 d-flex align-items-center mt-2">
                      <input
                        className="form-check-input mx-2"
                        type="radio"
                        name="chargestoinclude"
                        id="chargestoinclude"
                        disabled={!sepatateStatementCheck && true}
                      />
                      <label
                        className="form-check-label mt-1"
                        htmlFor="All charges, including Paid"
                      >
                        By Claim
                      </label>
                    </div>
                    <div className="col-md-5 d-flex align-items-center mt-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id=" Show the patient's last Payment"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="manageAccsearch_inactive"
                        >
                          Show the patient's last Payment
                        </label>
                      </div>
                    </div>
                    <div className="col-md-5 d-flex align-items-center mt-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="Donotincludeaccountcreditsonstatement"
                          id="Donotincludeaccountcreditsonstatement"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="manageAccsearch_inactive"
                        >
                          Do not include account credit's on statement
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ---------------------   Payment Plan Statement  ------------------- */}

            {paymentplanstatement && (
              <div className="col-md-12 d-flex flex-column">
                <div className="d-flex  align-items-center gap-5 col-md-12">
                  <div className="col-md-5">
                    <label htmlFor="">Payment Plan Balance</label>
                    <select
                      id="defaultChargeStatus"
                      className="form-select mt-1"
                      aria-label=".form-select-sm example"
                    >
                      <option value="Greater Than">Greater Than</option>
                      <option value="Greater Then or Equal To">
                        Greater Then or Equal To
                      </option>

                      <option value="Batween">Batween</option>
                    </select>
                  </div>
                  <div className="col-md-3 mt-3">
                    <input
                      // autoFocus
                      className="form-control"
                      type="number"
                      placeholder="0.00"
                      aria-label="npi"
                      id=""
                      name=""
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                    />
                  </div>
                </div>

                <div className="d-flex  align-items-center mt-2 gap-5 col-md-12">
                  <div className="col-md-5">
                    <label htmlFor=""> Electronic Statement Sent</label>
                    <select
                      id="defaultChargeStatus"
                      className="form-select mt-1"
                      aria-label=".form-select-sm example"
                    >
                      <option selected>Any</option>
                      <option value="Equals">Equals</option>
                      <option value="Does Not Equal">Does Not Equal</option>
                      <option value="Greater Than">Greater Than</option>
                      <option value="Greater Then or Equal To">
                        Greater Then or Equal To
                      </option>
                      <option value="Less Than">Less Than</option>
                      <option value="Less Than or Equal To">
                        Less Than or Equal To
                      </option>
                      <option value="Batween">Batween</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex  align-items-center mt-2 gap-5 col-md-12">
                  <div className="col-md-5">
                    <label htmlFor=""> Paper Statement Sent</label>
                    <select
                      id="defaultChargeStatus"
                      className="form-select mt-1"
                      aria-label=".form-select-sm example"
                    >
                      <option selected>Any</option>
                      <option value="Equals">Equals</option>
                      <option value="Does Not Equal">Does Not Equal</option>
                      <option value="Greater Than">Greater Than</option>
                      <option value="Greater Then or Equal To">
                        Greater Then or Equal To
                      </option>
                      <option value="Less Than">Less Than</option>
                      <option value="Less Than or Equal To">
                        Less Than or Equal To
                      </option>
                      <option value="Batween">Batween</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex  align-items-center gap-5 col-md-12">
                  <div className="col-md-5">
                    <label htmlFor="">Total Statement Amount</label>
                    <select
                      id="defaultChargeStatus"
                      className="form-select mt-1"
                      aria-label=".form-select-sm example"
                    >
                      <option selected>Greate Than</option>
                      <option value="Greater Than or Less Than">
                        Greater Than or Less Than
                      </option>
                      <option value="Batween">Batween</option>
                    </select>
                  </div>
                  <div className="col-md-3 mt-3">
                    <input
                      // autoFocus
                      className="form-control"
                      type="number"
                      placeholder="0.00"
                      aria-label="npi"
                      id=""
                      name=""
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                    />
                  </div>
                </div>

                <div className="d-flex  align-items-center gap-5 col-md-12">
                  <div className="col-md-5">
                    <label htmlFor="">Days Since Last Statement </label>
                    <select
                      id="defaultChargeStatus"
                      className="form-select mt-1"
                      aria-label=".form-select-sm example"
                    >
                      <option selected>Greate Than</option>
                      <option value="Greater Than or Less Than">
                        Greater Than or Less Than
                      </option>
                      <option value="Batween">Batween</option>
                    </select>
                  </div>
                  <div className="col-md-3 mt-3">
                    <input
                      // autoFocus
                      className="form-control"
                      type="number"
                      placeholder="0.00"
                      aria-label="npi"
                      id=""
                      name=""
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                    />
                  </div>
                </div>

                <div className="d-flex  align-items-center gap-5 col-md-12">
                  <div className="col-md-5">
                    <label htmlFor="">Days untill Last Statement </label>
                    <select
                      id="Days untill Last Statement"
                      className="form-select mt-1"
                      aria-label=".form-select-sm example"
                    >
                      <option selected>Any</option>
                      <option value="Equals">Equals</option>
                      <option value="Does Not Equal">Does Not Equal</option>
                      <option value="Greater Than">Greater Than</option>
                      <option value="Greater Then or Equal To">
                        Greater Then or Equal To
                      </option>
                      <option value="Less Than">Less Than</option>
                      <option value="Less Than or Equal To">
                        Less Than or Equal To
                      </option>
                      <option value="Batween">Batween</option>
                    </select>
                  </div>{" "}
                  <div className="col-md-3 gap-12 mt-3">
                    <input
                      // autoFocus
                      className="form-control"
                      type="number"
                      placeholder="0.00"
                      aria-label="npi"
                      id=""
                      name=""
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                    />
                  </div>
                </div>
                <div className="col-md-12 mt-2">
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
                      Include overdue payment plans
                    </label>
                  </div>
                </div>
              </div>
            )}
            {/* ----------------------------------------------------------------------
             */}

            {finaldemandnotice && (
              <div className="col-md-12 d-flex flex-column">
                <div className="col-md-12">
                  <label htmlFor="">Patient set to Send FDN</label>
                  <select
                    id="Patient set to Send FDN"
                    className="form-select mt-1"
                    aria-label=".form-select-sm example"
                  >
                    <option selected>Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="d-flex mt-2  align-items-center gap-5 col-md-12">
                  <div className="col-md-5">
                    <label htmlFor="">Patient Balance</label>
                    <select
                      id="Patient Balance"
                      className="form-select mt-1"
                      aria-label=".form-select-sm example"
                    >
                      <option selected>Greate Than</option>
                      <option value="Greater Than or Less Than">
                        Greater Than or Less Than
                      </option>
                      <option value="Batween">Batween</option>
                    </select>
                  </div>
                  <div className="col-md-3 mt-3">
                    <input
                      // autoFocus
                      className="form-control"
                      type="number"
                      placeholder="0.00"
                      aria-label="npi"
                      id=""
                      name=""
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                    />
                  </div>
                </div>

                <div className="d-flex  align-items-center mt-2 gap-5 col-md-12">
                  <div className="col-md-5">
                    <label htmlFor=""> Electronic Statement Sent</label>
                    <select
                      id="defaultChargeStatus"
                      className="form-select mt-1"
                      aria-label=".form-select-sm example"
                    >
                      <option selected>Any</option>
                      <option value="Equals">Equals</option>
                      <option value="Does Not Equal">Does Not Equal</option>
                      <option value="Greater Than">Greater Than</option>
                      <option value="Greater Then or Equal To">
                        Greater Then or Equal To
                      </option>
                      <option value="Less Than">Less Than</option>
                      <option value="Less Than or Equal To">
                        Less Than or Equal To
                      </option>
                      <option value="Batween">Batween</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex  align-items-center mt-2 gap-5 col-md-12">
                  <div className="col-md-5">
                    <label htmlFor=""> Paper Statement Sent</label>
                    <select
                      id="defaultChargeStatus"
                      className="form-select mt-1"
                      aria-label=".form-select-sm example"
                    >
                      <option selected>Any</option>
                      <option value="Equals">Equals</option>
                      <option value="Does Not Equal">Does Not Equal</option>
                      <option value="Greater Than">Greater Than</option>
                      <option value="Greater Then or Equal To">
                        Greater Then or Equal To
                      </option>
                      <option value="Less Than">Less Than</option>
                      <option value="Less Than or Equal To">
                        Less Than or Equal To
                      </option>
                      <option value="Batween">Batween</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex  align-items-center gap-5 col-md-12">
                  <div className="col-md-5">
                    <label htmlFor="">Total Statement Amount</label>
                    <select
                      id="defaultChargeStatus"
                      className="form-select mt-1"
                      aria-label=".form-select-sm example"
                    >
                      <option selected>Any</option>
                      <option value="Equals">Equals</option>
                      <option value="Does Not Equal">Does Not Equal</option>
                      <option value="Greater Than">Greater Than</option>
                      <option value="Greater Then or Equal To">
                        Greater Then or Equal To
                      </option>
                      <option value="Less Than">Less Than</option>
                      <option value="Less Than or Equal To">
                        Less Than or Equal To
                      </option>
                      <option value="Batween">Batween</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex  align-items-center gap-5 col-md-12">
                  <div className="col-md-5">
                    <label htmlFor="">Days Since Last Statement</label>
                    <select
                      id="Days Since Last Statement"
                      className="form-select mt-1"
                      aria-label=".form-select-sm example"
                    >
                      <option selected>Any</option>
                      <option value="Equals">Equals</option>
                      <option value="Does Not Equal">Does Not Equal</option>
                      <option value="Greater Than">Greater Than</option>
                      <option value="Greater Then or Equal To">
                        Greater Then or Equal To
                      </option>
                      <option value="Less Than">Less Than</option>
                      <option value="Less Than or Equal To">
                        Less Than or Equal To
                      </option>
                      <option value="Batween">Batween</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex  align-items-center gap-5 col-md-12">
                  <div className="col-md-5">
                    <label htmlFor="">Days Since Last FDN</label>
                    <select
                      id="Days Since Last FDN"
                      className="form-select mt-1"
                      aria-label=".form-select-sm example"
                    >
                      <option selected>Any</option>
                      <option value="Equals">Equals</option>
                      <option value="Does Not Equal">Does Not Equal</option>
                      <option value="Greater Than">Greater Than</option>
                      <option value="Greater Then or Equal To">
                        Greater Then or Equal To
                      </option>
                      <option value="Less Than">Less Than</option>
                      <option value="Less Than or Equal To">
                        Less Than or Equal To
                      </option>
                      <option value="Batween">Batween</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex  align-items-center gap-12 col-md-12">
                  <div className="col-md-11">
                    <label htmlFor="">Account Type</label>

                    <MultiSelect
                      options={options}
                      value={selected}
                      onChange={setSelected}
                      labelledBy="Select"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatementBatchPrint;