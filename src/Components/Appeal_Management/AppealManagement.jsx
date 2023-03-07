import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { set } from "react-hook-form";
import { useNavigate } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import API from "../../Api/ClientApi";
import Swal from "../../GLOBAL/SwalAlert";

const AppealManagement = () => {
  {
    /* ------------------   Hooks ----------------------- */
  }

  const [patientData, setPatientData] = useState([]);
  const [patientClaimId, setpatientClaimId] = useState("");
  const [patientDataName, setPatientDataName] = useState("");
  const [patientDataID, setPatientDataID] = useState("");
  // const [cliamIdAndPatirnt, setcliamIdAndPatirnt] = useState("");

  const navigate = useNavigate();
  const ToEditable = useCallback(
    (id) => {
      navigate(`/appealdetail/${id}`, { replace: true });
    },
    [navigate]
  );

  useEffect(() => {
    // API.get("claim/track")
    //   .then(function (response) {})
    //   .catch(function (error) {
    //     if (error.response.data.data == 403) {
    //       Swal.fire({
    //         icon: "error",
    //         imageHeight: 30,
    //         imageWidth: 30,
    //         title: "Sorry...",
    //         text: "Please contact your administrator to get Permissions!",
    //         confirmButtonColor: "#",
    //       });
    //       navigate(-1);
    //     }
    //   });

    const fetchPatient = async () => {
      const response = await API.get("appealmanagement/patientclaim");
      const newData = response.data.data;
      setPatientData(newData);
    };
    fetchPatient();
  }, []);

  const getProviderIdName = (name, id) => {
    setPatientDataName(name);
    setPatientDataID(id);
  };

  // console.log("patientClaimId", patientClaimId);

  // const {
  //   values,
  //   handleBlur,
  //   handleChange,
  //   handleSubmit,
  //   setFieldValue,
  //   setFieldTouched,
  //   errors,
  //   touched,
  // } = useFormik({
  //   initialValues: {},
  //   // validationSchema: FormValNewProcedure,
  //   validateOnChange: true,
  //   validateOnBlur: true,
  //   // By disabling validation onChange and onBlur formik will validate on submit.
  //   onSubmit: (values, action) => {
  //     // values from hooks
  //     -API.post("", {
  //       a: 1,
  //       b: 2,
  //     })
  //       .then(function (response) {
  //         if (response.data.status === 201) {
  //           Swal.fire({
  //             position: "center",
  //             icon: "success",
  //             title: "Adjustment Code Added",
  //             showConfirmButton: false,
  //             timer: 1500,
  //           });
  //           navigate("/adjustment", { replace: true });
  //           //  FormReset();
  //         } else if (response.data.status === 500) {
  //           alert("some error occured");
  //         }
  //       })
  //       //   reset form
  //       .catch((error) => {
  //         // if(error){
  //         //   console.log(error);
  //         //   (error)
  //         // }
  //       });
  //   },
  // });
  return (
    <div className="row my-3 col-md-12 d-flex">
      <form>
        <div
          className="col-md-6 d-flex mt-5"
          // style={{ overflowY: "scroll", height: "calc(100vh - 127px)" }}
        >
          <div className="col-md-12">
            <div className="card mb-2 mt-5 d-flex justify-content-center ">
              <div className="card-header">Appeal Management</div>
              <div className="card-body mb-4">
                <div>
                  <div className="input-group mt-3">
                    <input
                      className="form-control  placeTextTax"
                      type="text"
                      placeholder="Patient"
                      aria-label="ref_pro"
                      id="patientDataName"
                      name="patientDataName"
                      value={patientDataName}
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      data-bs-toggle="modal"
                      data-bs-target="#PatientModal"
                    />{" "}
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#PatientModal"
                      title="Select Patient Patient"
                      type="button"
                      className="input-group-text btn-hov"
                      id="Patient"
                    >
                      <i className="fas fa-search" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="col-md-12 mt-3">
                    <div className="col-md-12">
                      <select
                        id="defaultChargeStatus"
                        className="form-select form-select-sm"
                        defaultValue={"claim#"}
                        onChange={(e) => setpatientClaimId(e.target.value)}
                        aria-label=".form-select-sm example"
                        disabled={
                          patientDataID === "" || patientDataID === undefined
                            ? "disabled"
                            : ""
                        }
                      >
                        <option hidden defaultValue={"claim#"}>
                          Claims#
                        </option>

                        {patientData.map((patientData) =>
                          patientData.claims
                            .filter((claimData) => {
                              return claimData.patient_id === patientDataID;
                            })

                            .map((provi, i) => (
                              <>
                                <option value={provi.id}>{provi.id}</option>
                              </>
                            ))
                        )}
                      </select>
                    </div>
                  </div>
                  {/* ------------------   Patient Modal ----------------------- */}
                  <div
                    className="modal fade"
                    id="PatientModal"
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
                                    {patientData.map((provi, i) => (
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
                                          {provi.first_name +
                                            " " +
                                            provi.last_name}
                                        </td>

                                        <td>{provi.dob}</td>
                                        <td>{"provi.insurance"}</td>
                                        <td>{provi.patient_types}</td>
                                        <td>
                                          {provi.payements
                                            ? "Active"
                                            : "Inactive"}{" "}
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
                </div>
              </div>
            </div>

            <div className="col-md-12 mt-3">
              <div className="col-md-12 d-flex justify-content-end">
                <div className="col-md-2">
                  <div className="col-md-12">
                    <button
                      type="button"
                      disabled={!patientDataID}
                      onClick={() => ToEditable(patientClaimId)}
                      className="btn col-md-12 btn-sm btn-primary"
                    >
                      Load
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right-side End   */}
        </div>
      </form>
    </div>
  );
};
export default AppealManagement;
