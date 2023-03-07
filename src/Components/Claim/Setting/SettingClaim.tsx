import { useEffect } from "react";
import { useNavigate } from "react-router";
import API from "../../../Api/ClientApi";
import Swal from "../../../GLOBAL/SwalAlert";
const SettingClaim = () => {
  const navigate = useNavigate();
  useEffect(() => {
    API.get("claim/setting")
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
    <div className="col-md-12 d-flex mt-2">
      <div className="col-md-6 flex-column ">
        <div className="col-md-12 mt-2">
          <div className="p-1">
            <button className="btn btn-primary bg-gradient btn-md col-md-2 ">
              <i className="fas fa-edit"></i> Edit
            </button>
          </div>
        </div>
        {/* -----------    Card   ------------*/}
        <div
          className="card mb-2 mt-2 col-md-12"
          data-bs-spy="scroll"
          data-bs-target="#navbar-example2"
        >
          <div className="card-header">
            Claims Setting for Customer: Demo (#10000003)
          </div>
          <div
            className="card-body"
            style={{ overflowY: "scroll", height: "calc(50vh - 127px)" }}
          >
            <div className="col-md-12">
              <p className="card-text text-black-75">
                The <strong>Real-Time Claim Submission (RTCS) service</strong>{" "}
                allows claims to be sent to the clearinghouse as they are saved
                in CollaborateMD with result available immediately.
              </p>

              <p className="">
                When a claim's status is set to send to insurance via
                clearinghouse:
                <div className="col-md-12 my-1" style={{ height: "40px" }}>
                  <select
                    className="form-select "
                    id="floatingSelectGrid"
                    aria-label="Floating label select example"
                    disabled
                    style={{
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                  >
                    <option selected className="text-muted">
                      Automatically validate and submit the claim (Recommended)
                    </option>
                  </select>
                </div>
                Claims that are not sent via the automatic claim submission
                service will be processed at 11:00PM Eastern with results
                available the next day.
              </p>
            </div>
            <hr />
            <div className="col-md-12">
              <p className="">
                Apply Fee Schedule pricing for Institutional claims based on
                the:
                <div className="col-md-12 my-1" style={{ height: "40px" }}>
                  <select
                    className="form-select "
                    id="floatingSelectGrid"
                    aria-label="Floating label select example"
                    disabled
                    style={{
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                  >
                    <option selected>Revenue Code</option>
                  </select>
                </div>
              </p>
            </div>
            <hr />

            <div className="col-md-12 d-flex flex-column mt-2">
              <div className="col-md-12">
                <label className=" " htmlFor="">
                  Allow users to override the charge total amount?
                </label>
              </div>
              <div className="col-md-12 d-flex ">
                <input
                  className="form-check-input mx-2"
                  type="radio"
                  name="OtherAccd"
                  id="otheraccno"
                />
                <label className="form-check-label mt-1" htmlFor="otheraccno">
                  No
                </label>
                <input
                  className="form-check-input mx-2"
                  type="radio"
                  name="OtherAccd"
                  id="otheraccyes"
                />
                <label className="form-check-label mt-1" htmlFor="otheraccyes">
                  Yes
                </label>
              </div>
            </div>

            <hr />
            <div className=" col-md-12">
              <p>
                When multiple fee schedules apply to a claim based on their
                associations, the fee schedule used will be determined by the
                following order of precedence:
              </p>
              <div className="col-md-12 d-flex">
                <div
                  className=" col-md-6 col-sm-6  alert alert-dark"
                  role="alert"
                >
                  <span>Payer Type</span>
                  <br />
                  <span>Payer</span>
                  <br />
                  <span>Patirnt Type</span>
                  <br />
                  <span>Facility & Provider</span>
                  <br />
                  <span>Provider</span>
                  <br />
                  <span>Facility</span> <br />
                  <span>Practice</span> <br />
                  <span>Place of Service</span>
                  <br />
                  <span>Type of Service</span>
                  <br />
                  <span>Modifier</span>
                </div>
                <div className="col-md-6 d-flex flex-column mx-2 justify-content-center">
                  <div>
                    <i className="fa-solid fa-chevron-up"></i>
                  </div>
                  <div>
                    <i className="fa-solid fa-chevron-down"></i>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="col-md-12">
              <div className="col-md-12 my-1" style={{ height: "40px" }}>
                <select
                  className="form-select "
                  id="floatingSelectGrid"
                  aria-label="Floating label select example"
                  disabled
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  <option selected className="ss">
                    Automitcally apply unapplied copays when claims are entered
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* -----------    Card 2  ------------*/}
        <div className="card mt-4 mb-2">
          <div className="card-header">Claims Setting for User: demo</div>
          <div
            className="card-body "
            style={{ overflowY: "scroll", height: "calc(49vh - 127px)" }}
          >
            <div className="col-md-12 d-flex flex-column">
              <div className="col-md-12 d-flex flex-column">
                <div className="col-md-12 d-flex ">
                  <span>
                    Set margins to use when printing claims on the CMS-1500
                    claim form:
                  </span>
                </div>
                <div className="col-md-12 d-flex mt-2">
                  <div className="col-md-3">
                    <span>Left Margin</span>
                    <br />
                    <input
                      className="col-md-5 mt-1 bg-light"
                      type="number"
                      placeholder="25"
                      disabled
                    />
                  </div>
                  <div className="col-md-4">
                    <span>Top Margin</span>
                    <br />
                    <input
                      className="col-md-5 mt-1 bg-light"
                      type="number"
                      placeholder="25"
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-12 mt-3 d-flex flex-column">
                <div className="col-md-12 d-flex ">
                  <span>
                    Set margins to use when printing claims on the CMS-1450
                    (UB-04) claim form:
                  </span>
                </div>
                <div className="col-md-12 d-flex mt-2">
                  <div className="col-md-3">
                    <span>Left Margin</span>
                    <br />
                    <input
                      className="col-md-5 mt-1 bg-light"
                      type="number"
                      placeholder="25"
                      disabled
                    />
                  </div>
                  <div className="col-md-4">
                    <span>Top Margin</span>
                    <br />
                    <input
                      className="col-md-5 mt-1 bg-light"
                      type="number"
                      placeholder="25"
                      disabled
                    />
                  </div>
                </div>
                <div className="mt-2">Print units are 1/72 of an inch.</div>
              </div>

              <hr />
              <div className="col-md-12 d-flex flex-column mt-2">
                <div className="col-md-12">
                  <label className="" htmlFor="">
                    Allow users to override the charge total amount?
                  </label>
                </div>
                <div className="col-md-12 d-flex ">
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccno"
                  />
                  <label className="form-check-label mt-1" htmlFor="otheraccno">
                    No
                  </label>
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccyes"
                  />
                  <label
                    className="form-check-label mt-1"
                    htmlFor="otheraccyes"
                  >
                    Yes
                  </label>
                </div>
              </div>
              <hr />

              <div className="col-md-12 d-flex flex-column mt-2">
                <div className="col-md-12">
                  <label className="" htmlFor="">
                    Show a warning when creating a new claim that is a duplicate
                    of an already entered claim based on the patient, procedure
                    codes, and date of service?
                  </label>
                </div>
                <div className="col-md-12 d-flex ">
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccno"
                  />
                  <label className="form-check-label mt-1" htmlFor="otheraccno">
                    No
                  </label>
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccyes"
                  />
                  <label
                    className="form-check-label mt-1"
                    htmlFor="otheraccyes"
                  >
                    Yes
                  </label>
                </div>
              </div>
              <hr />

              <div className="col-md-12 d-flex flex-column mt-2">
                <div className="col-md-12">
                  <label className="" htmlFor="">
                    Show a warning when creating a new claim that falls within
                    the global period of a previously rendered procedure?
                  </label>
                </div>
                <div className="col-md-12 d-flex ">
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccno"
                  />
                  <label className="form-check-label mt-1" htmlFor="otheraccno">
                    No
                  </label>
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccyes"
                  />
                  <label
                    className="form-check-label mt-1"
                    htmlFor="otheraccyes"
                  >
                    Yes
                  </label>
                </div>
              </div>
              <hr />

              <div className="col-md-12 d-flex flex-column mt-2">
                <div className="col-md-12">
                  <label className="" htmlFor="">
                    Notify me when a claim has been accepted after being
                    submitted via Real-Time Claim Submission (RTCS)?
                  </label>
                </div>
                <div className="col-md-12 d-flex ">
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccno"
                  />
                  <label className="form-check-label mt-1" htmlFor="otheraccno">
                    No
                  </label>
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccyes"
                  />
                  <label
                    className="form-check-label mt-1"
                    htmlFor="otheraccyes"
                  >
                    Yes
                  </label>
                </div>
              </div>
              <hr />

              <div className="col-md-12 d-flex flex-column mt-2">
                <div className="col-md-12">
                  <label className="" htmlFor="">
                    Automatically populate patient's default Provider on new
                    claims?
                  </label>
                </div>
                <div className="col-md-12 d-flex ">
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccno"
                  />
                  <label className="form-check-label mt-1" htmlFor="otheraccno">
                    No
                  </label>
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccyes"
                  />
                  <label
                    className="form-check-label mt-1"
                    htmlFor="otheraccyes"
                  >
                    Yes
                  </label>
                </div>
              </div>
              <hr />

              <div className="col-md-12 d-flex flex-column mt-2">
                <div className="col-md-12">
                  <label className="" htmlFor="">
                    Automatically populate patient's default procedure codes on
                    new claims?
                  </label>
                </div>
                <div className="col-md-12 d-flex ">
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccno"
                  />
                  <label className="form-check-label mt-1" htmlFor="otheraccno">
                    No
                  </label>
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccyes"
                  />
                  <label
                    className="form-check-label mt-1"
                    htmlFor="otheraccyes"
                  >
                    Yes
                  </label>
                </div>
              </div>
              <hr />

              <div className="col-md-12 d-flex flex-column mt-2">
                <div className="col-md-12">
                  <label className="" htmlFor="">
                    Automatically populate patient's default diagnosis codes on
                    new claims?
                  </label>
                </div>
                <div className="col-md-12 d-flex ">
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccno"
                  />
                  <label className="form-check-label mt-1" htmlFor="otheraccno">
                    No
                  </label>
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccyes"
                  />
                  <label
                    className="form-check-label mt-1"
                    htmlFor="otheraccyes"
                  >
                    Yes
                  </label>
                </div>
              </div>
              <hr />

              <div className="col-md-12 d-flex flex-column mt-2">
                <div className="col-md-12">
                  <label className="" htmlFor="">
                    When creating a new claim, update the patient's default
                    procedure and diagnosis codes with the information entered
                    on the current claim?
                  </label>
                </div>
                <div className="col-md-12 d-flex ">
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccno"
                  />
                  <label className="form-check-label mt-1" htmlFor="otheraccno">
                    No
                  </label>
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccyes"
                  />
                  <label
                    className="form-check-label mt-1"
                    htmlFor="otheraccyes"
                  >
                    Yes
                  </label>
                </div>
              </div>
              <hr />

              <div className="col-md-12 d-flex flex-column mt-2">
                <div className="col-md-12">
                  <label className="" htmlFor="">
                    Automatically populate patient's default authorization
                    information on new claims? If disabled, the authorization
                    can still be copied or entered manually on the claim.
                  </label>
                </div>
                <div className="col-md-12 d-flex ">
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccno"
                  />
                  <label className="form-check-label mt-1" htmlFor="otheraccno">
                    No
                  </label>
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccyes"
                  />
                  <label
                    className="form-check-label mt-1"
                    htmlFor="otheraccyes"
                  >
                    Yes
                  </label>
                </div>
              </div>
              <hr />

              <div className="col-md-12 d-flex flex-column mt-2">
                <div className="col-md-12">
                  <label className="" htmlFor="">
                    Show confirmation when manually copying a patient's
                    authorization onto a claim which already has an
                    authorization # populated for that insurance policy?
                  </label>
                </div>
                <div className="col-md-12 d-flex ">
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccno"
                  />
                  <label className="form-check-label mt-1" htmlFor="otheraccno">
                    No
                  </label>
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccyes"
                  />
                  <label
                    className="form-check-label mt-1"
                    htmlFor="otheraccyes"
                  >
                    Yes
                  </label>
                </div>
              </div>
              <hr />

              <div className="col-md-12 d-flex flex-column mt-2">
                <div className="col-md-12">
                  <label className="" htmlFor="">
                    Show prompt to set the Admission Code with the same value as
                    the Principle Diagnosis Code when creating institutional
                    claims?
                  </label>
                </div>
                <div className="col-md-12 d-flex ">
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccno"
                  />
                  <label className="form-check-label mt-1" htmlFor="otheraccno">
                    No
                  </label>
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccyes"
                  />
                  <label
                    className="form-check-label mt-1"
                    htmlFor="otheraccyes"
                  >
                    Yes
                  </label>
                </div>
              </div>
              <hr />

              <div className="col-md-12 d-flex flex-column mt-2">
                <div className="col-md-12">
                  <label className="" htmlFor="">
                    Show Durable Medical Equipment (DME) fields on the claim
                    screens? The DME fields include the Sales Rep and initial
                    deliver date and are not submitted on the claim.
                  </label>
                </div>
                <div className="col-md-12 d-flex ">
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccno"
                  />
                  <label className="form-check-label mt-1" htmlFor="otheraccno">
                    No
                  </label>
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccyes"
                  />
                  <label
                    className="form-check-label mt-1"
                    htmlFor="otheraccyes"
                  >
                    Yes
                  </label>
                </div>
              </div>
              <hr />

              <div className="col-md-12 d-flex flex-column mt-2">
                <div className="col-md-12">
                  <label className="" htmlFor="">
                    Show Chiropractor fields on the claim screens? The
                    Chiropractor fields can be accessed via the "Chiro" button
                    on a particular charge when enabled.
                  </label>
                </div>
                <div className="col-md-12 d-flex ">
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccno"
                  />
                  <label className="form-check-label mt-1" htmlFor="otheraccno">
                    No
                  </label>
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccyes"
                  />
                  <label
                    className="form-check-label mt-1"
                    htmlFor="otheraccyes"
                  >
                    Yes
                  </label>
                </div>
              </div>
              <hr />

              <div className="col-md-12 d-flex flex-column mt-2">
                <div className="col-md-12">
                  <label className="" htmlFor="">
                    Show Inventory fields on the claim screens? The inventory
                    code can be entered for a particular charge when enabled.
                  </label>
                </div>
                <div className="col-md-12 d-flex ">
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccno"
                  />
                  <label className="form-check-label mt-1" htmlFor="otheraccno">
                    No
                  </label>
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccyes"
                  />
                  <label
                    className="form-check-label mt-1"
                    htmlFor="otheraccyes"
                  >
                    Yes
                  </label>
                </div>
              </div>
              <hr />

              <div className="col-md-12 d-flex flex-column mt-2">
                <div className="col-md-12">
                  <label className="" htmlFor="">
                    When creating new Professional claims, default the Homebound
                    (patient that is unable to leave their residence without
                    assistance) option to "Yes"?
                  </label>
                </div>
                <div className="col-md-12 d-flex ">
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccno"
                  />
                  <label className="form-check-label mt-1" htmlFor="otheraccno">
                    No
                  </label>
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccyes"
                  />
                  <label
                    className="form-check-label mt-1"
                    htmlFor="otheraccyes"
                  >
                    Yes
                  </label>
                </div>
              </div>
              <hr />

              <div className="col-md-12 d-flex flex-column mt-2">
                <div className="col-md-12">
                  <label className="" htmlFor="">
                    Show the gestational age next to the populated Last
                    Menstrual Period field in the Claim section?
                  </label>
                </div>
                <div className="col-md-12 d-flex ">
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccno"
                  />
                  <label className="form-check-label mt-1" htmlFor="otheraccno">
                    No
                  </label>
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccyes"
                  />
                  <label
                    className="form-check-label mt-1"
                    htmlFor="otheraccyes"
                  >
                    Yes
                  </label>
                </div>
              </div>
              <hr />

              <div className="col-md-12 d-flex flex-column mt-2">
                <div className="col-md-12">
                  <label className="" htmlFor="">
                    Default the payment received date to the earliest DOS when
                    posting the payment from the claim screen?
                  </label>
                </div>
                <div className="col-md-12 d-flex ">
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccno"
                  />
                  <label className="form-check-label mt-1" htmlFor="otheraccno">
                    No
                  </label>
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccyes"
                  />
                  <label
                    className="form-check-label mt-1"
                    htmlFor="otheraccyes"
                  >
                    Yes
                  </label>
                </div>
              </div>
              <hr />

              <div className="col-md-12 d-flex flex-column mt-2">
                <div className="col-md-12">
                  <label className="" htmlFor="">
                    Change the shortcut for Alt+N to create institutional
                    claims?
                  </label>
                </div>

                <div className="col-md-12 d-flex ">
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccno"
                  />
                  <label className="form-check-label mt-1" htmlFor="otheraccno">
                    No
                  </label>
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="OtherAccd"
                    id="otheraccyes"
                  />
                  <label
                    className="form-check-label mt-1"
                    htmlFor="otheraccyes"
                  >
                    Yes
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 ">Left</div>
    </div>
  );
};
export default SettingClaim;