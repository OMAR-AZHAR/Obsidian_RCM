import React from "react";

import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import API from "../../../../Api/ClientApi";
import Swal from "../../../../GLOBAL/SwalAlert";
import { InputDecimal } from "react-input-decimal";
// import { FormValNewProcedure } from "./FormValNewProcedure";
const NewRevenueCode = () => {
  const navigate = useNavigate();

  const closeNewForm = () => {
    navigate("/revenue", { replace: true });
  };
  // values from FORM states
  const [code, setCode] = useState("");
  const [excludeduplicateService, setexcludeduplicateService] = useState(0);
  const [price, setPrice] = useState<any>(0.00);
  const [revenueDescription, setrevenueDescription] = useState("");
  const [statementDescription, setStatementDescription] = useState("");
  console.log("st desc", excludeduplicateService);

  // ===========================form data initial values and submit logiv===============================
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      code: "",
      excludeduplicateService: "",
      price: "",
      revenueDescription: "",
      statementDescription: "",
    },
    // validationSchema: FormValNewProcedure,
    validateOnChange: true,
    validateOnBlur: true,
    // By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: (values, action) => {
      // values from hooks
      -API.post("customersetup/code/revenue/store", {
        code: code,
        excludeduplicateService: excludeduplicateService,
        price:Number.parseFloat(price),
        description: revenueDescription,
        statementDescription: statementDescription,
      })
        .then(function (response) {
          if (response.data.status === 201) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Revenue Code Added",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/revenue", { replace: true });
            //  FormReset();
          } else if (response.data.status === 500) {
            alert("some error occured");
          }
        })
        //   reset form
        .catch((error) => {
          // if(error){
          //   console.log(error);
          //   (error)
          // }
        });
    },
  });
  const FormReset = () => {
    setCode("");
    setexcludeduplicateService(0);
    setPrice("");
    setrevenueDescription("");
    setStatementDescription("");
  };
  return (
    <div>
      <div className="row mt-4">
        <form onSubmit={handleSubmit} action="post">
          {/* =====================main form============================= */}
          <div className="d-flex">
            <div className="col-md-8">
              <div className="">
                <h3 className="fw-bold mx-2">Revenue Codes</h3>
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
                    type="number"
                    className="form-control"
                    id="code"
                    autoComplete="off"
                    name="code"
                    required
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={60}
                  />
                  {/* <div className="col-md-12">
                  {touched.practiceName && errors.practiceName ? (
                    <p className="form-error">*{errors.practiceName}</p>
                  ) : null}
                </div> */}
                </div>
                <div className="col-md-7 d-flex mt-4">
                  <input
                    className="form-check-input fs-5"
                    type="checkbox"
                    value=""
                    onClick={() => setexcludeduplicateService(1)}
                    id="makethisCodeInactive"
                  />
                  <label
                    className="form-check-label mx-1 mt-1"
                    htmlFor="makethisCodeInactive"
                  >
                    Exclude this code from duplicate service checks
                  </label>
                </div>
              </div>
              <div className="col-md-5">
                <label htmlFor="">Price</label>
                <InputDecimal
                  precision={2}
                  value={price}
                  className="form-control form-control-sm"
                  id="price"
                  autoComplete="off"
                  name="price"
                  onChangeValue={(value:any) => {
                    setPrice(
                      parseFloat(value)?.toFixed(2)
                    );
                  }}
                  style={{ textAlign: "right" }}
                />
              </div>
              <div className="row mt-2">
                <label htmlFor="descTextarea">Description</label>
                <div className="form-floating col-md-11">
                  <textarea
                    onChange={(e) => setrevenueDescription(e.target.value)}
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="description"
                  ></textarea>
                </div>
              </div>
              {/*==================Statement Optionss===================== */}
              <div className="col-xl-12 mt-3">
                <div className="card mb-2">
                  <div className="card-header">Statement Options</div>
                  <div className="card-body ">
                    <div className="col-md-12">
                      <div className="col-md-12 mt-2">
                        <input
                          type="text"
                          className="form-control"
                          id="statementDescription"
                          onChange={(e) =>
                            setStatementDescription(e.target.value)
                          }
                          autoComplete="off"
                          placeholder="Statement Description"
                          name="statementDescription"
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
                        data-bs-target="#collapseFeeSchedule"
                        aria-expanded="false"
                        aria-controls="collapseFeeSchedule"
                      >
                        Fee Schedule
                      </button>
                    </h2>
                    <div
                      id="collapseFeeSchedule"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body px-2 py-2">
                        <div className="px-0 mx-0">

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseContract"
                        aria-expanded="false"
                        aria-controls="collapseContract"
                      >
                        Contracts
                      </button>
                    </h2>
                    <div
                      id="collapseContract"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body px-2 py-2">
                        <div className="px-0 mx-0">

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

export default NewRevenueCode;
