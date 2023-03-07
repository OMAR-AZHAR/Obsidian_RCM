import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import API from "../../../../Api/ClientApi";
// import Swal from "../../../../../GLOBAL/SwalAlert";
// import { FormValNewProcedure } from "./FormValNewProcedure";
const EditRemittanceCode = () => {
  const navigate = useNavigate();
  const closeNewForm = () => {
    navigate("/remittance", { replace: true });
  };
  // values from FORM states
  const { id } = useParams();
  const [code, setCode] = useState("");
  const [type, settype] = useState("AdjReason");
  const [informationLevel, setInformationLevel] = useState(
    "INFO-This code represents general information only"
  );
  const [includeCodeDenialReport, setincludeCodeDenialReport] = useState(0);
  const [
    includeCodeAdjustmentReasonReport,
    setincludeCodeAdjustmentReasonReport,
  ] = useState(0);
  const [reportDescription, setreportDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [memoLineActivityStament, setMemoLineActivityStament] = useState(0);

  useEffect(() => {
    API.get(`customersetup/code/remittance/edit/${id}`).then((res) => {
      const remittancecode = res.data.data;
      console.log(remittancecode);
      setCode(remittancecode.remittance_code);
      settype(remittancecode.remittance_type);
      setInformationLevel(remittancecode.information_level);
      setincludeCodeDenialReport(remittancecode.include_denial_code);
      setincludeCodeAdjustmentReasonReport(
        remittancecode.setincludeCodeAdjustmentReasonReport
      );
      setreportDescription(remittancecode.report_description);
      setLongDescription(remittancecode.long_description);
      setMemoLineActivityStament(remittancecode.memoline_activity);
    });
  }, []);

  // ===========================form data initial values and submit logiv===============================
  //   const {
  //     values,
  //     handleBlur,
  //     handleChange,
  //     handleSubmit,
  //     setFieldValue,
  //     setFieldTouched,
  //     errors,
  //     touched,
  //   } = useFormik({
  //     initialValues: {
  //       code: "",
  //       type: "",
  //       informationLevel: "",
  //       includeCodeDenialReport: "",
  //       includeCodeAdjustmentReasonReport: "",
  //       reportDescription: "",
  //       longDescription: "",
  //       memoLineActivityStament: "",
  //     },
  //     // validationSchema: FormValNewProcedure,
  //     validateOnChange: true,
  //     validateOnBlur: true,
  //     // By disabling validation onChange and onBlur formik will validate on submit.
  //     onSubmit: (values, action) => {
  //       // values from hooks
  //       -API.post("customersetup/code/remittance/store", {
  //         code: code,
  //         type: type,
  //         informationLevel: informationLevel,
  //         codeDenialReports: includeCodeDenialReport,
  //         codeAdjustmentReports: includeCodeAdjustmentReasonReport,
  //         reportDescription: reportDescription,
  //         longDescription: longDescription,
  //         memolineActivity: memoLineActivityStament,
  //       })
  //         .then(function (response) {
  //           if (response.data.status === 201) {
  //             Swal.fire({
  //               position: "center",
  //               icon: "success",
  //               title: "Remittance Code Added",
  //               showConfirmButton: false,
  //               timer: 1500,
  //             });
  //             navigate("/remittance", { replace: true });
  //             //  FormReset();
  //           } else if (response.data.status === 500) {
  //             alert("some error occured");
  //           }
  //         })
  //         //   reset form
  //         .catch((error) => {
  //           // if(error){
  //           //   console.log(error);
  //           //   (error)
  //           // }
  //         });
  //     },
  //   });
  //   const FormReset = () => {
  //     setCode("");
  //     settype("");
  //     setInformationLevel("");
  //     setincludeCodeDenialReport(0);
  //     setincludeCodeAdjustmentReasonReport(0);
  //     setreportDescription("");
  //     setLongDescription("");
  //     setMemoLineActivityStament(0);
  //   };

  return (
    <div>
      <div className="row mt-4">
        <form action="post">
          {/* =====================main form============================= */}
          <div className="d-flex">
            <div className="col-md-8">
              <div className="">
                <h3 className="fw-bold mx-2">Remittance Codes</h3>
                <div className="d-flex">
                  <button
                    type="button"
                    onClick={closeNewForm}
                    className="btn btn-labeled btn-outline-danger btn-sm mb-4"
                  >
                    <span className="btn-label">
                      <i className="fa fa-times"></i>
                    </span>{" "}
                    close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-labeled btn-outline-primary btn-sm mb-4 mx-2"
                  >
                    <span className="btn-label">
                      <i className="fa fa-check"></i>
                    </span>{" "}
                    Save
                  </button>
                </div>
              </div>

              <div className="row g-2 d-flex align-items-center">
                <div className="col-md-3">
                  <label htmlFor="">Code</label>
                  <input
                    type="text"
                    className="form-control"
                    id="code"
                    autoComplete="off"
                    name="code"
                    required
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    value={code ? code : ""}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={60}
                  />
                  {/* <div className="col-md-12">
                  {touched.practiceName && errors.practiceName ? (
                    <p className="form-error">*{errors.practiceName}</p>
                  ) : null}
                </div> */}
                </div>
                {/* <div className="col-md-6 d-flex mt-4">
                  <input
                    className="form-check-input fs-5"
                    type="checkbox"
                    value=""
                    onClick={() => setCodeInactive(1)}
                    id="makethisCodeInactive"
                  />
                  <label
                    className="form-check-label mx-1 mt-1"
                    htmlFor="makethisCodeInactive"
                  >
                    Make this code inactive
                  </label>
                </div> */}
                <div className="col-md-5">
                  <label htmlFor="">Type</label>
                  <select
                    id="type"
                    name="type"
                    defaultValue={type ? type : ""}
                    onChange={(e) => settype(e.target.value)}
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected value="AdjReason">
                      Adj Reason
                    </option>
                    <option value="Remark">Remark</option>
                  </select>
                </div>
              </div>
              <div className="col-md-7 mt-1">
                <label htmlFor="">Information Level</label>
                <select
                  id="type"
                  name="type"
                  defaultValue={informationLevel ? informationLevel : ""}
                  onChange={(e) => setInformationLevel(e.target.value)}
                  className="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                >
                  <option
                    selected
                    value="INFO-This code represents general information only"
                  >
                    INFO-This code represents general information only
                  </option>
                  <option value="WARNING-This code represents a warning, alert or some information requiring furhter review">
                    WARNING-This code represents a warning, alert or some
                    information requiring furhter review.
                  </option>
                  <option value="ERROR-This code represents a denial, rejection or other error interrupting the claim process">
                    ERROR-This code represents a denial, rejection or other
                    error interrupting the claim process.
                  </option>
                </select>
              </div>
              <div className="row d-flex flex-column">
                <div className="col-md-6 d-flex mt-2">
                  <input
                    className="form-check-input fs-5"
                    type="checkbox"
                    checked={includeCodeDenialReport == 0 ? false : true}
                    onChange={() =>
                      setincludeCodeDenialReport(
                        !includeCodeDenialReport == false ? 0 : 1
                      )
                    }
                    id="includeCodeDenialReport"
                  />
                  <label
                    className="form-check-label mx-1 mt-1"
                    htmlFor="includeCodeDenialReport"
                  >
                    Include this code on my denial reports.
                  </label>
                </div>
                <div className="col-md-7 d-flex mt-2">
                  <input
                    className="form-check-input fs-5"
                    type="checkbox"
                    checked={
                      includeCodeAdjustmentReasonReport == 0 ? false : true
                    }
                    onChange={() =>
                      setincludeCodeAdjustmentReasonReport(
                        !includeCodeAdjustmentReasonReport == false ? 0 : 1
                      )
                    }
                    id="includeCodeAdjustmentReasonReport"
                  />
                  <label
                    className="form-check-label mx-1 mt-1"
                    htmlFor="includeCodeAdjustmentReasonReport"
                  >
                    Include this code on my adjustment reason reports.
                  </label>
                </div>
              </div>
              <div className="row mt-2">
                <label htmlFor="descTextarea">Report Description</label>
                <div className="form-floating col-md-11">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="description"
                    value={reportDescription ? reportDescription : ""}
                    onChange={(e) => setreportDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="row mt-2">
                <label htmlFor="descTextarea">Long Description</label>
                <div className="form-floating col-md-11">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="description"
                    value={longDescription ? longDescription : ""}
                    onChange={(e) => setLongDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              {/*==================Memoline===================== */}
              <div className="col-xl-12 mt-3">
                <div className="card mb-2">
                  <div className="card-header">Memoline</div>
                  <div className="card-body ">
                    <div className="col-md-12">
                      <div className="col-md-12 mt-2">
                        <div className="col-md-7 d-flex mt-2">
                          <input
                            className="form-check-input fs-5"
                            type="checkbox"
                            Checked={
                              memoLineActivityStament == 0 ? false : true
                            }
                            onClick={() =>
                              setMemoLineActivityStament(
                                !memoLineActivityStament == false ? 0 : 1
                              )
                            }
                            id="memoLineActivityStament"
                          />
                          <label
                            className="form-check-label mx-1 mt-1"
                            htmlFor="memoLineActivityStament"
                          >
                            Use Memoline on Activity and Statements
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* =====================notes and alerts============================= */}
            <div className="col-md-4 mt-2">
              <div className="col-md-12">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseActions"
                        aria-expanded="false"
                        aria-controls="collapseActions"
                      >
                        Actions
                      </button>
                    </h2>
                    <div
                      id="collapseActions"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body px-2 py-2">
                        <div className="px-0 mx-0">
                          <textarea
                            // onChange={(e) => setNotetextChange(e.target.value)}
                            className="form-control"
                            id="ReferringNotes"
                            // rows="8"
                            maxLength={255}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRemittanceCode;
