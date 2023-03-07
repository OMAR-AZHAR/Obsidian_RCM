import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "../../../GLOBAL/SwalAlert";
import API from "../../../Api/ClientApi";

const SettingPatient = () => {
  const navigate = useNavigate();
  useEffect(() => {
    API.get("patient/setting")
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

  const [showEditBtn, setshowEditBtn] = useState(false);
  const [saveEditBtn, setSaveEditBtn] = useState(false);
  return (
    <div className="col-md-12 d-flex mt-2">
      <div className="col-md-6 flex-column ">
        <div className="col-md-12 mt-2 d-flex">
          <div>
            {!showEditBtn ? (
              <button
                className="btn btn-primary bg-gradient btn-sm col-md-12 "
                onClick={() => setshowEditBtn(!showEditBtn)}
              >
                <i className="fa-solid fa-pen-to-square"></i>&nbsp;Edit
              </button>
            ) : (
              <div className="d-flex col-md-12 gap-2">
                <button className="btn btn-primary  btn-sm ">
                  <i className="fa-solid fa-check"></i>&nbsp;Save
                </button>

                {showEditBtn && (
                  <button
                    className="btn btn-secondary  btn-sm"
                    onClick={() => setshowEditBtn(!showEditBtn)}
                  >
                    <i className="fas fa-xmark"></i> Cancel
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        {/* -----------    Card   ------------*/}

        <div
          className="card mb-2 mt-2 col-md-12"
          data-bs-spy="scroll"
          data-bs-target="#navbar-example2"
        >
          <div className="card-header">
            Patient Setting for Customer: Demo (#10000003)
          </div>

          <div className="card-body">
            <div className="col-md-12 d-flex flex-column mt-2">
              <div className="col-md-12">
                <label className=" " htmlFor="">
                  Require Meaningful Use fields to be filled out for a patient
                  record to be considered complete?
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
            <div className="col-md-12 d-flex flex-column mt-2">
              <div className="col-md-12">
                <label className=" " htmlFor="">
                  Require Emergency Contact information to be filled out for a
                  patient record to be considered complete?
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
          </div>
        </div>
        {/* -----------    Card 2  ------------*/}
        <div className="card mt-4 mb-2">
          <div className="card-header">Patient Setting for User: demo</div>
          <div
            className="card-body "
            // style={{ overflowY: "scroll", height: "calc(49vh - 127px)" }}
          >
            <div className="col-md-12 d-flex flex-column">
              <div className="col-md-12 d-flex flex-column mt-2">
                <div className="col-md-12">
                  <label className="" htmlFor="">
                    Show warning when saving a new patient that is a duplicate
                    of an already entered patient based on the SSN or Last Name,
                    First Name, and Date of Birth?
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
                    checked
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
                    When creating a new patient, default the provider to:
                  </label>
                </div>
                <div className="col-md-12 d-flex flex-column">
                  <div>
                    <label htmlFor="">Provider Listing</label>
                  </div>
                  <div className="col-md-10 d-flex ">
                    <input
                      className={`form-control form-control-sm`}
                      type="text"
                      placeholder=""
                      aria-label=""
                      id=""
                      name=""
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      maxLength={10}
                      minLength={10}
                    />
                  </div>
                </div>
              </div>
              <hr />

              <div className="col-md-12 d-flex flex-column">
                <label htmlFor="">
                  When creating a new patient, default the state within the
                  patient's address to:
                </label>
                <div>
                  <label htmlFor="">State</label>
                </div>
                <div className="col-md-2 d-flex ">
                  <input
                    className={`form-control form-control-sm`}
                    type="text"
                    placeholder="NC"
                    aria-label=""
                    id=""
                    name=""
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength={2}
                    minLength={0}
                  />
                </div>
              </div>
              <hr />

              <div className="col-md-12 d-flex flex-column">
                <div>
                  <label htmlFor="">
                    When inactivating a patient record that currently has a
                    non-zero balance:
                  </label>
                </div>
                <div className="col-md-12 mt-2">
                  <select
                    id="defaultChargeStatus"
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected>
                      Save the patient as inactive without a confirmation/alert
                    </option>
                    <option value="Show a confirmatin before saving the patient as in active">
                      Show a confirmatin before saving the patient as in active
                    </option>
                    <option value="Show an alert and do not allow the patient to be saved as inactive">
                      Show an alert and do not allow the patient to be saved as
                      inactive
                    </option>
                  </select>
                </div>{" "}
              </div>
              <hr />

              <div className="col-md-12 d-flex flex-column mt-2">
                <div className="col-md-12">
                  <label className="" htmlFor="">
                    Show a prompt to update the patient account type to "Payment
                    Plan" (if not already set) whenever creating a new Payment
                    Plan?
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
                    checked
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
                    Show an alert when opening patient records for patients
                    older than 65?
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
                    checked
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
                    Display an option in the Patient screen to copy the
                    patient's default Facility as their primary address? (This
                    can be useful for practices that work directly with nursing
                    homes and other residential treatment facilities.)
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
                    checked
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

              <div className="col-md-12 d-flex mt-2 flex-column">
                <div className="col-md-12 d-flex ">
                  <span>
                    Set margins to use when printing the addresses on the
                    Enhanced Statement payment slip.
                  </span>
                </div>
                <div className="d-flex mt-2">
                  <div className="col-md-1 fs-5 d-flex justify-content-center">
                    <i class="fa-solid fa-circle-exclamation"></i>
                  </div>
                  <div className="col-md-8">
                    {" "}
                    <span>
                      Changes to these margins will only adjust that that
                      address. Each unit represents 1/72 of an inch.
                    </span>
                  </div>
                </div>
                <div className="col-md-12 d-flex flex-column mt-2">
                  <div>
                    <label htmlFor="">Return address label : </label>
                  </div>
                  <div className="d-flex">
                    {" "}
                    <div className="col-md-3">
                      <span>Left Margin</span>
                      <br />
                      <input
                        className="col-md-5 mt-1 bg-light"
                        type="number"
                        placeholder="0"
                      />
                    </div>
                    <div className="col-md-4">
                      <span>Top Margin</span>
                      <br />
                      <input
                        className="col-md-5 mt-1 bg-light"
                        type="number"
                        placeholder="25"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12 mt-3 d-flex flex-column">
                <div className="col-md-12 d-flex ">
                  <span>Patient Address label:</span>
                </div>
                <div className="col-md-12 d-flex mt-2">
                  <div className="col-md-3">
                    <span>Left Margin</span>
                    <br />
                    <input
                      className="col-md-5 mt-1 bg-light"
                      type="number"
                      placeholder="25"
                    />
                  </div>
                  <div className="col-md-4">
                    <span>Top Margin</span>
                    <br />
                    <input
                      className="col-md-5 mt-1 bg-light"
                      type="number"
                      placeholder="25"
                    />
                  </div>
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

export default SettingPatient;