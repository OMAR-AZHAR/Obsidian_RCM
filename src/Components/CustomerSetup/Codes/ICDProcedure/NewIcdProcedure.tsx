import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import API from "../../../../Api/ClientApi";
import Swal from "../../../../GLOBAL/SwalAlert";
// import { FormValNewProcedure } from "./FormValNewProcedure";
const NewIcdProcedure = () => {
  const navigate = useNavigate();
  const closeNewForm = () => {
    navigate("/icdProcedure", { replace: true });
  };
  // values from FORM states
  const [code, setCode] = useState("");
  const [type, settype] = useState("ICD-10");
  const [ICDDescription, setICDDescription] = useState("");

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
      //procedure codes
      code: "",
      type: "",
      diagnosisDescription: "",
      // effectiveDate:"",
      // terminationDate:"",
      printSuperbillCode: "",
      superBillDescription: "",
    },
    // validationSchema: FormValNewProcedure,
    validateOnChange: true,
    validateOnBlur: true,
    // By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: (values, action) => {
      // values from hooks
      -API.post("customersetup/code/icd/procedure/store", {
        code:code,
        type: type,
        description: ICDDescription,
        
      })
        .then(function (response) {
          if (response.data.status === 201) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "ICD Procedure Code Added",
                showConfirmButton: false,
                timer: 1500,
              });
            navigate("/icdProcedure", { replace: true });
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
    settype("");
    setICDDescription("");
  };
  return (
    <div>
      <div className="row mt-4">
        <form onSubmit={handleSubmit} action="post">
          {/* =====================main form============================= */}
        <div className='d-flex'>
        <div className="col-md-8">
            <div className="">
              <h3 className="fw-bold mx-2">ICD Procedure Codes</h3>
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
              <div className="col-md-3">
                <label htmlFor="">Type</label>
                <select
                  id="type"
                  name="type"
                  onChange={(e) => settype(e.target.value)}
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
                  onChange={(e) => setICDDescription(e.target.value)}
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="description"
                ></textarea>
              </div>
            </div>
            
           
          </div>
          {/* =====================notes and alerts============================= */}
         
        </div>
        </form>
      </div>
    </div>
  );
};

export default NewIcdProcedure;
