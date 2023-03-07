import React, { useEffect } from "react";
import { InputDecimal } from "react-input-decimal";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import API from "../../../../Api/ClientApi";
// import Swal from "../../../../../GLOBAL/SwalAlert";
// import { FormValNewProcedure } from "./FormValNewProcedure";
const EditInventoryCode = () => {
  const navigate = useNavigate();
  const [procedureCodes, setprocedureCodes] = useState([]);
  const [procedureCod, setProcedureCod] = useState("");
  const [procedureCodId, setProcedureCodId] = useState("");

  // values from FORM states
  const { id } = useParams();
  const [code, setCode] = useState("");
  const [procedureCOde, setProcedureCode] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [codeDescription, setcodeDescription] = useState("");
  const [billingDescription, setbillingDescription] = useState("");

  const getProcedureCodeId = (code, id) => {
    setProcedureCod(code);
    setProcedureCodId(id);
    console.log(code);
    console.log(id);
  };

  // procedure codes data from api
  useEffect(() => {
    const fetchProcedureCodes = async () => {
      const response = await API.get("customersetup/code/procedure");
      const newData = response.data.data;
      setprocedureCodes(newData);
    };

    fetchProcedureCodes();

    API.get(`customersetup/code/inventory/edit/${id}`).then((res) => {
      const response = res.data.data[0];
      setCode(response.inventory_codes);
      setQuantity(response.alert_quantity);
      setProcedureCodId(response.procedure_code_id);
      setProcedureCod(response.procedure_codes.procedure_code);
      setcodeDescription(response.code_description);
      setbillingDescription(response.billing_description);
    });
  }, []);
  const closeNewForm = () => {
    navigate("/inventoryCode", { replace: true });
  };

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
  //       procedureCodeId: "",
  //       quantity: "",
  //       codeDescription: "",
  //       billingDescription: "",
  //     },
  //     // validationSchema: FormValNewProcedure,
  //     validateOnChange: true,
  //     validateOnBlur: true,
  //     // By disabling validation onChange and onBlur formik will validate on submit.
  //     onSubmit: (values, action) => {
  //       // values from hooks
  //       -API.post("customersetup/code/inventory/store", {
  //         code: code,
  //         procedureCodeId: procedureCodId,
  //         quantity: Number.parseFloat(quantity),
  //         description: codeDescription,
  //         billingDescription: billingDescription,
  //       })
  //         .then(function (response) {
  //           if (response.data.status === 201) {
  //             Swal.fire({
  //               position: "center",
  //               icon: "success",
  //               title: "Inventory Code Added",
  //               showConfirmButton: false,
  //               timer: 1500,
  //             });
  //             navigate("/inventoryCode", { replace: true });
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
  //     setcodeDescription("");
  //     setbillingDescription("");
  //   };
  return (
    <div>
      <div className="row mt-4">
        <form action="post">
          {/* =====================main form============================= */}
          <div className="d-flex">
            <div className="col-md-7">
              <div className="">
                <h3 className="fw-bold mx-2">Inventory Codes</h3>
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
              </div>
              <div className="col-md-4 mt-2">
                <label htmlFor="">Procedure Code</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="code"
                    autoComplete="off"
                    name="code"
                    required
                    value={procedureCod}
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength={60}
                    onChange={(e) => setProcedureCode(e.target.value)}
                  />
                  <button
                    type="button"
                    className="input-group-text btn-hov"
                    id="NPIbtn"
                    data-bs-toggle="modal"
                    data-bs-target="#procedureModel"
                  >
                    <i className="fas fa-search" aria-hidden="true"></i>
                  </button>
                  {/* |---------- procedure code model ------------- */}
                  <div
                    className="modal fade text-dark"
                    id="procedureModel"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    aria-hidden="true"
                    aria-labelledby="procedureModel"
                    // tabindex={-1}
                  >
                    <div className="modal-dialog modal-md modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5>All Procedure Codes</h5>
                        </div>
                        <div className="modal-body">
                          <div className="input-group input-group-sm">
                            <input
                              type="text"
                              id="search"
                              name="search"
                              // value={query}
                              // onChange={(e) => handleSearch(e)}
                              className="form-control w-25"
                              aria-label="Small"
                              placeholder="Search for roles"
                              aria-describedby="inputGroup-sizing-sm"
                            />
                          </div>

                          <table className="table table-hover table-sm mt-3 table-bordered caption-top">
                            <thead>
                              <tr className="bg-primary">
                                <th scope="col">Code</th>
                                <th scope="col">Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {procedureCodes?.length == 0
                                ? "Please Wait..."
                                : procedureCodes?.map((role, i) => (
                                    <tr
                                      data-bs-toggle="modal"
                                      onClick={() =>
                                        getProcedureCodeId(
                                          role?.procedure_code,
                                          role?.id
                                        )
                                      }
                                      key={i}
                                    >
                                      <td>{role?.procedure_code}</td>
                                      <td>{role?.description}</td>
                                      <td>
                                        {"$" +
                                          Number.parseFloat(
                                            role?.default_price
                                          ) +
                                          ".00"}
                                      </td>

                                      <td>
                                        {role?.deleted_at == null ? (
                                          <span style={{ color: "#26859C" }}>
                                            Active
                                          </span>
                                        ) : (
                                          <span style={{ color: "black" }}>
                                            Inactive
                                          </span>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            data-bs-dismiss="modal"
                            className="btn btn-outline-danger btn-sm"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <label htmlFor="">Quantity</label>

                <input
                  type="number"
                  className="form-control form-control-sm"
                  id="quantity"
                  autoComplete="off"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  style={{ textAlign: "right" }}
                />
              </div>
              <div className="row mt-2">
                <label htmlFor="descTextarea">Code Description</label>
                <div className="form-floating col-md-11">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="description"
                    value={codeDescription ? codeDescription : ""}
                    onChange={(e) => setcodeDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="row mt-2">
                <label htmlFor="descTextarea">Billing Description</label>
                <div className="form-floating col-md-11">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="description"
                    value={billingDescription ? billingDescription : ""}
                    onChange={(e) => setbillingDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            {/* =====================notes and alerts============================= */}
            <div className="col-md-3 mt-2">notes and alerts</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInventoryCode;
