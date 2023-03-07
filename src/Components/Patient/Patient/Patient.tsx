import { useCallback, useState } from "react";
import { useNavigate } from "react-router";

import useFetch from "../../../Hooks/useFetch";
import { getPatientIdfromTable } from "../../../Redux/features/Patient/Patient_EditableSlice";
import { useDispatch } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";

const Patient = () => {
  const [Insured, setInsured] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const newPatient = useCallback(
    () => navigate("/new-patient", { replace: true }),
    [navigate]
  );

  const ToEditable = useCallback(
    // Goto User Editable form
    (id: number) => {
      navigate(`/new-patient/${id}`, { replace: true });
    },
    [navigate]
  );
  const [Inactive, setInactive] = useState(false);
  const ToggleInactive = (e: boolean) => {
    if (e === true) {
      setInactive(true);
    } else {
      setInactive(false);
    }
  };
  const [searchPatients, setSearchPatients] = useState("");
  // useEffect(() => {
  //   API.get("patient/patient/get")
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

  const { data: patientData, loading: loadpatient } = useFetch("/patient");
  // const patientData = [
  //   {
  //     acc: "52017999",
  //     firstname: "Altas",
  //     lastname: "last",
  //     dob: "10/28/1954",
  //     Insured: "Altas last",
  //     balance: "15,000.00",
  //     acctye: "Insurance",
  //   },
  //   {
  //     acc: "52017999",
  //     firstname: "John",
  //     lastname: "Doe",
  //     dob: "10/28/1954",
  //     Insured: "Altas last",
  //     balance: "5,000.00",
  //     acctye: "Payment plan",
  //   },
  // ];
  return (
    <div className="row mt-4">
      <div className="col-md-12">
        <ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#search_add"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              <span className="fw-bold">Search/Add</span>
            </button>
          </li>
          {/* from redux */}
          {/* {createNewPatientTab && (
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-profile-tab"
                // data-bs-toggle="pill"
                // data-bs-target="#new_patient"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                <span className="fw-bold">New Patient</span>
              </button>
            </li>
          )} */}
        </ul>

        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="search_add"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div className="col-md-12">
              <div className="col-md-9 d-flex">
                <div className="col-md-2">
                  <button
                    // onClick={() => dispatch(createNewPatientTab())}
                    onClick={() => {
                      newPatient();
                      window.location.reload();
                    }}
                    className="btn btn-outline-primary btn-sm"
                  >
                    <i className="fas fa-plus"></i>&nbsp;New Patient
                  </button>
                </div>
                <div className="col-md-8">
                  <div className="input-group">
                    <button
                      type="button"
                      className="input-group-text btn-hov"
                      id="searchpatient"
                    >
                      <i className="fas fa-search" aria-hidden="true"></i>
                    </button>
                    <input
                      className="form-control form-control-sm placeTextTax"
                      type="text"
                      placeholder={
                        !Insured
                          ? "Search by name, DOB, account #, phone #"
                          : "Search by name, DOB, account #, member ID, phone #"
                      }
                      aria-label="npi"
                      id="searchpatient"
                      name="searchpatient"
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={(e) =>
                        setSearchPatients(e.target.value?.toString())
                      }
                      // onChange={handleChange}
                      // value={values.providernpi.replace(/[^0-9]/gi, "")}
                      // onBlur={handleBlur}
                    />
                    {/* <button className="btn btn-outline-primary btn-sm">
                      <i className="fas fa-search"></i>&nbsp;Search
                    </button> */}
                    {/* {touched.providernpi && errors.providernpi ? (
                    <p className="form-error mx-2">*{errors.providernpi}</p>
                  ) : null} */}
                  </div>

                  <div className="col-md-9 d-flex mt-2">
                    <label htmlFor="">Search by:</label>
                    <div className="form-check mx-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="searchby"
                        id="patient"
                        defaultChecked={true}
                        onClick={() => setInsured(false)}
                      />
                      <label className="form-check-label" htmlFor="patient">
                        Patient
                      </label>
                    </div>
                    <div className="form-check mx-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="searchby"
                        onClick={() => setInsured(true)}
                        id="insured"
                      />
                      <label className="form-check-label" htmlFor="insured">
                        Insured
                      </label>
                    </div>
                  </div>
                  <div className="d-flex mt-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="search_inactive"
                        onChange={(e) => ToggleInactive(e.target.checked)}
                        checked={Inactive}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="search_inactive"
                      >
                        Show Inactive Patients
                      </label>
                    </div>
                    {/* <div className="form-check">
                      <input
                        className="form-check-input mx-2"
                        type="checkbox"
                        value=""
                        id="show_exact"
                      />
                      <label className="form-check-label" htmlFor="show_exact">
                        Show exact matches only
                      </label>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* recently opened */}
              <div className="col-md-12 mt-3 pe-5">
                <div className="card mb-2">
                  <div className="card-header">
                    <i className="fas fa-hospital-user me-2"></i>
                    Patients
                  </div>
                  <div className="card-body">
                    {loadpatient ? (
                      <div className="text-center user-select-none text-dark">
                        Loading...
                      </div>
                    ) : patientData?.length ? (
                      <table
                        className="px-0 my-0 mb-0 mx- 0 table table-sm table-light table-hover table-striped table-bordered table-responsive"
                        // style={{ borderRadius: "20px" }}
                      >
                        <thead className="">
                          <tr>
                            <th>Account #</th>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Insured</th>
                            <th>Balance due Pat.</th>
                            <th>Account Type</th>
                            <th>Inactive</th>
                          </tr>
                        </thead>

                        <tbody>
                          {patientData
                            ?.filter((item) => {
                              return searchPatients === ""
                                ? item
                                : item?.acc
                                    ?.toLowerCase()
                                    ?.includes(searchPatients?.toLowerCase()) ||
                                    item?.last_name
                                      ?.toLowerCase()
                                      ?.includes(
                                        searchPatients?.toLowerCase()
                                      ) ||
                                    item?.first_name
                                      ?.toLowerCase()
                                      ?.includes(
                                        searchPatients?.toLowerCase()
                                      ) ||
                                    item?.dob
                                      ?.toLowerCase()
                                      ?.includes(
                                        searchPatients?.toLowerCase()
                                      ) ||
                                    item?.Insured?.toLowerCase()?.includes(
                                      searchPatients?.toLowerCase()
                                    ) ||
                                    item?.balance
                                      ?.toLowerCase()
                                      ?.includes(
                                        searchPatients?.toLowerCase()
                                      ) ||
                                    item?.patient_types
                                      ?.toLowerCase()
                                      ?.includes(searchPatients?.toLowerCase());
                            })
                            ?.map((pat, i) => {
                              return !pat?.patient_status ? (
                                <tr
                                  onClick={() => {
                                    dispatch(getPatientIdfromTable(pat?.id));
                                    ToEditable(pat?.id);
                                    window.location.reload();
                                  }}
                                  key={i}
                                  {...pat}
                                >
                                  <td>{pat?.sequence?.id}</td>
                                  <td>
                                    {pat?.last_name ? pat?.last_name : ""} ,{" "}
                                    {pat?.first_name ? pat?.first_name : ""}
                                  </td>

                                  <td>{pat?.dob}</td>
                                  <td>
                                    {pat?.insured_party?.insured_lname
                                      ? pat?.insured_party?.insured_lname +
                                        `, ` +
                                        pat?.insured_party?.insured_fname
                                      : ""}
                                  </td>

                                  <td>{`$0.00`}</td>
                                  <td>{pat?.patient_types}</td>
                                  {/* {Inactive ? ( */}
                                  <td className="text-center">
                                    {pat?.patient_status === 1 ? (
                                      <FaCheckCircle
                                        style={{
                                          color: "black",

                                          fontSize: "1.2em",
                                        }}
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </td>
                                  {/* ) : (
                                    ""
                                  )} */}
                                </tr>
                              ) : pat?.patient_status === Number(Inactive) ? (
                                <tr
                                  onClick={() => {
                                    dispatch(getPatientIdfromTable(pat?.id));
                                    ToEditable(pat?.id);
                                    window.location.reload();
                                  }}
                                  key={i}
                                  {...pat}
                                >
                                  <td>{pat?.sequence?.id}</td>
                                  <td>
                                    {pat?.last_name ? pat?.last_name : ""} ,{" "}
                                    {pat?.first_name ? pat?.first_name : ""}
                                  </td>

                                  <td>{pat?.dob}</td>
                                  <td>
                                    {pat?.insured_party?.insured_lname
                                      ? pat?.insured_party?.insured_lname +
                                        `, ` +
                                        pat?.insured_party?.insured_fname
                                      : ""}
                                  </td>

                                  <td>{`$0.00`}</td>
                                  <td>{pat?.patient_types}</td>
                                  {Inactive ? (
                                    <td className="text-center">
                                      {pat?.patient_status === 1 ? (
                                        <FaCheckCircle
                                          style={{
                                            color: "black",

                                            fontSize: "1.2em",
                                          }}
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </td>
                                  ) : (
                                    ""
                                  )}
                                </tr>
                              ) : (
                                ""
                              );
                            })}
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-center user-select-none text-dark">
                        No recent patients
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div
            className="tab-pane fade"
            id="new_patient"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <NewPatient />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Patient;
