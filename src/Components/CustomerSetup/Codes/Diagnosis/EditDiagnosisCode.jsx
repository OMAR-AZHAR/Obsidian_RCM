// import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import API from "../../../../Api/ClientApi";
// import Swal from "../../../../../GLOBAL/SwalAlert";
// import { FormValNewProcedure } from "./FormValNewProcedure";
const EditDiagnosisCode = () => {
  const navigate = useNavigate();
  const closeNewForm = () => {
    navigate("/diagnosis", { replace: true });
  };
  const { id } = useParams();
  // values from FORM states
  const [code, setCode] = useState("");
  const [type, settype] = useState("ICD-10");
  const [diagnosisDescription, setDiagnosisDescription] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [terminationDate, setTerminationDate] = useState("");
  const [printSuperbillCode, setPrintSuperbillCode] = useState(1);
  const [superBillDescription, setSuperBillDescription] = useState("");

  useEffect(() => {
    API.get(`customersetup/code/diagnosis/edit/${id}`).then((res) => {
      const diagnoseCode = res.data.data;
      setCode(diagnoseCode.diagnosis_code);
      setDiagnosisDescription(diagnoseCode.description);
      setEffectiveDate(diagnoseCode.effective_date);
      setTerminationDate(diagnoseCode.termination_date);
      setSuperBillDescription(diagnoseCode.superbill_description);
    });
  }, []);

  // ===========================form data initial values and submit logiv===============================
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
  //   initialValues: {
  //     //procedure codes
  //     code: "",
  //     type: "",
  //     diagnosisDescription: "",
  //     effectiveDate: "",
  //     terminationDate: "",
  //     printSuperbillCode: "",
  //     superBillDescription: "",
  //   },
  //   // validationSchema: FormValNewProcedure,
  //   validateOnChange: true,
  //   validateOnBlur: true,
  //   // By disabling validation onChange and onBlur formik will validate on submit.
  //   onSubmit: (values, action) => {
  //     // values from hooks
  //     -API.post("customersetup/code/diagnosis/store", {
  //       code: code,
  //       type: type,
  //       description: diagnosisDescription,
  //       effectiveDate: effectiveDate,
  //       terminationDate: terminationDate,
  //       printSuperbillCode: printSuperbillCode,
  //       superBillDescription: superBillDescription,
  //     })
  //       .then(function (response) {
  //         if (response.data.status === 201) {
  //           Swal.fire({
  //             position: "center",
  //             icon: "success",
  //             title: "Diagnosis Code Added Successfully",
  //             showConfirmButton: false,
  //             timer: 1500,
  //           });
  //           navigate("/diagnosis", { replace: true });
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
  // const FormReset = () => {
  //   setCode("");
  //   settype("");
  //   setDiagnosisDescription("");
  //   setPrintSuperbillCode(0);
  //   setSuperBillDescription("");
  // };
  return (
    <div>
      <div className="row mt-4">
        <form action="post">
          {/* =====================main form============================= */}
          <div className="d-flex">
            <div className="col-md-8">
              <div className="">
                <h3 className="fw-bold mx-2">Diagnosis Codes</h3>
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
                    value={code ? code : ""}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength={10}
                  />
                  {/* <div className="col-md-12">
                  {touched.practiceName && errors.practiceName ? (
                    <p className="form-error">*{errors.practiceName}</p>
                  ) : null}
                </div> */}
                </div>
                <div className="col-md-3">
                  <label htmlFor="">Type</label>
                  <select
                    id="type"
                    name="type"
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected value="ICD-10">
                      ICD-10
                    </option>
                    <option value="ICD-11">ICD-11</option>
                  </select>
                </div>
              </div>
              <div className="row mt-2">
                <label htmlFor="descTextarea">Description</label>
                <div className="form-floating col-md-11">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="description"
                    value={diagnosisDescription ? diagnosisDescription : ""}
                    onChange={(e) => setDiagnosisDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="col-md-12 d-flex mt-3">
                <div className="col-md-5 mx-2">
                  <label htmlFor="">Effective Date</label>
                  <input
                    type="date"
                    id="effectiveDate"
                    name="effectiveDate"
                    className="form-control form-control-sm"
                    value={effectiveDate ? effectiveDate : ""}
                    onChange={(e) => setEffectiveDate(e.target.value)}
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor="">Termination Date</label>
                  <input
                    type="date"
                    placeholder="hre"
                    id="terminationDate"
                    name="terminationDate"
                    className="form-control form-control-sm"
                    value={terminationDate ? terminationDate : ""}
                    onChange={(e) => setTerminationDate(e.target.value)}
                  />
                </div>
              </div>
              {/*==================Superbill Options===================== */}
              <div className="col-xl-11 mt-3">
                <div className="card mb-2">
                  <div className="card-header">Superbill Options</div>
                  <div className="card-body ">
                    <div className="col-md-12">
                      <div className="col-md-12 d-flex mt-2">
                        <input
                          className="form-check-input fs-5"
                          type="checkbox"
                          defaultChecked={
                            printSuperbillCode == 1 ? true : false
                          }
                          onChange={(e) =>
                            setPrintSuperbillCode(!printSuperbillCode)
                          }
                          id="printSuperbillCode"
                        />
                        <label
                          className="form-check-label mx-2 mt-1"
                          htmlFor="printSuperbillCode"
                        >
                          Print this code on superbills
                        </label>
                      </div>
                      <div className="col-md-12 mt-3">
                        <input
                          type="text"
                          className="form-control"
                          id="category"
                          autoComplete="off"
                          disabled
                          placeholder="Category"
                          name="category"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          //   value={values.practiceName
                          //     .replace(/[^A-Za-z ]/gi, "")
                          //     .trimStart()
                          //     .toUpperCase()}
                          //   onChange={handleChange}
                          //   onBlur={handleBlur}
                          maxLength={60}
                        />
                        {/* <div className="col-md-12">
                  {touched.practiceName && errors.practiceName ? (
                    <p className="form-error">*{errors.practiceName}</p>
                  ) : null}
                </div> */}
                      </div>
                      <div className="col-md-12 mt-2">
                        <label htmlFor="">Description</label>
                        <input
                          type="text"
                          className="form-control"
                          value={
                            superBillDescription ? superBillDescription : ""
                          }
                          onChange={(e) =>
                            setSuperBillDescription(e.target.value)
                          }
                          id="categoryDescription"
                          autoComplete="off"
                          placeholder="Description"
                          name="categoryDescription"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          //   value={values.practiceName
                          //     .replace(/[^A-Za-z ]/gi, "")
                          //     .trimStart()
                          //     .toUpperCase()}
                          //   onChange={handleChange}
                          //   onBlur={handleBlur}
                          maxLength={60}
                        />
                        {/* <div className="col-md-12">
                  {touched.practiceName && errors.practiceName ? (
                    <p className="form-error">*{errors.practiceName}</p>
                  ) : null}
                </div> */}
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
                        data-bs-target="#collapseALerts"
                        aria-expanded="false"
                        aria-controls="collapseALerts"
                      >
                        Alerts
                      </button>
                    </h2>
                    <div
                      id="collapseALerts"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body px-2 py-2">
                        <div className="px-0 mx-0">
                          <button
                            type="button"
                            className="btn btn-labeled btn-outline-primary btn-sm mt-1"
                          >
                            <span className="btn-label">
                              <i className="fa fa-plus"></i>
                            </span>{" "}
                            Add Alerts
                          </button>
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

export default EditDiagnosisCode;
