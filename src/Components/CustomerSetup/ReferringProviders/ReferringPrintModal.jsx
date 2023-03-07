import { useFormik } from "formik";
import { useState } from "react";
// import { PatternFormat } from "react-number-format";
import { colourOptions } from "../../../GLOBAL/Custom/Dropdown_Checkbox/colourOptions";
import CustomSelect from "../../../GLOBAL/Custom/Dropdown_Checkbox/CustomSelect";
import {
  MultiValue,
  Option,
} from "../../../GLOBAL/Custom/Dropdown_Checkbox/Option";
import useFetch from "../../../Hooks/useFetch";
import { RefPrintValidation } from "./RefPrintValidation";
export default function ReferringPrintModal() {
  const { data: referringData, loading: loadingReferrers } = useFetch(
    "customersetup/referringprovider"
  );
  const [optionSelected, setoptionSelected] = useState();
  // console.log("Api get",referringData);
  const GetOptionValue = (e) => {
    setoptionSelected(e);
  };
  // console.log("Selected Options",optionSelected);
  const initialValues = {
    RefNamebtwfirst: "",
    RefNamebtwlast: "",
    newrefprintzipcode: "",
    check_all: "",
  };
  const [closeModal, setCloseModal] = useState(null);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      // enableReinitialize: true,
      validationSchema: RefPrintValidation,
      validateOnChange: true,
      validateOnBlur: true,
      // By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: (values, action) => {
        // console.log("Values inserted, Formik", values);
        // Send Data API
        // setPosredux(values.placeofservice)
        // API.post("customer/setup/refprint/store", {
        // });
        // Swal.fire({
        //   position: "center",
        //   icon: "success",
        //   title: "refprint Added Successfully",
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
        // to get rid of all the values after submitting the form
        setCloseModal("modal");
        action.resetForm();
      },
    });
  return (
    <div
      className="modal fade text-dark"
      id="showAllReferringPrintModel"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-md modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title fw-bold">Referring Label Search</h5>
            </div>
            <div className="modal-body">
              <div className="col-md-12 mb-2">
                <label>Referring Provider</label>
                {loadingReferrers ? (
                  <span className="text-dark">Loading...</span>
                ) : (
                  <CustomSelect
                    options={colourOptions}
                    isMulti
                    name="customselectopt"
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    placeholder={"Referring Provider"}
                    components={{
                      Option,
                      MultiValue,
                    }}
                    // onChange={GetOptionValue}
                    onChange={GetOptionValue}
                    allowSelectAll={true}
                    value={optionSelected}
                  />
                )}
              </div>

              <div className="row mb-2">
                <label>Referrer Last Name</label>
                <div className="col-md-4">
                  <select
                    className="form-select form-select-sm"
                    aria-label="Referrer Name Select"
                  >
                    <option value="Referrer_Name_Between">Between</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder=""
                    aria-label="RefNamebtwfirst"
                    maxLength={1}
                    id="RefNamebtwfirst"
                    name="RefNamebtwfirst"
                    onChange={handleChange}
                    value={values.RefNamebtwfirst.trim()
                      .toUpperCase()
                      .replace(/[^A-Za-z ]/gi, "")}
                    onBlur={handleBlur}
                  />
                </div>
                and
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder=""
                    aria-label="RefNamebtwlast"
                    maxLength={1}
                    id="RefNamebtwlast"
                    name="RefNamebtwlast"
                    onChange={handleChange}
                    value={values.RefNamebtwlast.trim()
                      .toUpperCase()
                      .replace(/[^A-Za-z ]/gi, "")}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <label>Zipcode</label>

                <input
                  // format="#####-####"
                  // mask=" "
                  type="text"
                  className={`form-control form-control-sm ${
                    touched.newrefprintzipcode &&
                    errors.newrefprintzipcode &&
                    "is-invalid"
                  }`}
                  id="newrefprintzipcode"
                  name="newrefprintzipcode"
                  placeholder="ZIP Code"
                  autoComplete="off"
                  autoCapitalize="characters"
                  autoCorrect="off"
                  spellCheck="false"
                  onChange={handleChange}
                  value={values.newrefprintzipcode
                    .trim()
                    .toUpperCase()
                    .replace(/[^a-z0-9]/gi, "")}
                  onBlur={handleBlur}
                  maxLength={10}
                  title={
                    touched.newrefprintzipcode &&
                    errors.newrefprintzipcode &&
                    "Enter Valid Zipcode"
                  }
                />
              </div>
              <div className="col-md-12 mt-2">
                <label>Referring Provider Type</label>
                <select
                  className="form-select form-select-sm"
                  aria-label="Referrer Provider Type Select"
                  defaultValue={" "}
                  placeholder="Referring"
                >
                  <option hidden={true} />
                  <option value="">(No Selection)</option>
                  <option value="Referring Provider">Referring Provider</option>
                  <option value="Primary Care Provider">
                    Primary Care Provider
                  </option>
                </select>
              </div>

              <div className="col-md-12 mt-3 d-flex mx-0">
                <label>Order By:</label>
                <div className="form-check mx-1">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="RefPrint"
                    id="RefNamePrint"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="RefNamePrint">
                    Referrer Name
                  </label>
                </div>
                <div className="form-check mx-1">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="RefPrint"
                    id="RefZipcodePrint"
                  />
                  <label className="form-check-label" htmlFor="RefZipcodePrint">
                    Zipcode
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer justify-content-end">
              {touched.check_all && errors.check_all ? (
                <p className="form-error">{errors.check_all}</p>
              ) : null}
              <button
                type="submit"
                className="btn btn-outline-primary btn-sm"
                data-bs-dismiss={closeModal}
              >
                Print
              </button>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
