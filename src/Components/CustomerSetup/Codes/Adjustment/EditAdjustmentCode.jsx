import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import API from "../../../../Api/ClientApi";
// import Swal from "../../../../../GLOBAL/SwalAlert";
// import { FormValNewProcedure } from "./FormValNewProcedure";
const EditAdjustmentCode = () => {
  const navigate = useNavigate();
  const closeNewForm = () => {
    navigate("/adjustment", { replace: true });
  };
  // values from FORM states
  const { id } = useParams();
  const [code, setCode] = useState("");
  const [type, settype] = useState("Credit");
  const [adjustmentDescription, setadjustmentDescription] = useState("");
  const [specifyDiscountPercentage, setSpecifyDiscountPercentage] = useState(0);

  useEffect(() => {
    API.get(`customersetup/code/adjustment/edit/${id}`).then((res) => {
      const adjustmentCode = res.data.data;
      setCode(adjustmentCode.adjustment_code);
      settype(adjustmentCode.adjustment_type);
      setadjustmentDescription(adjustmentCode.description);
      setSpecifyDiscountPercentage(adjustmentCode.discount_percentage);
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
  //     code: "",
  //     type: "",
  //     adjustmentDescription: "",
  //     specifyDiscountPercentage: "",
  //   },
  //   // validationSchema: FormValNewProcedure,
  //   validateOnChange: true,
  //   validateOnBlur: true,
  //   // By disabling validation onChange and onBlur formik will validate on submit.
  //   onSubmit: (values, action) => {
  //     // values from hooks
  //     -API.post("customersetup/code/adjustment/store", {
  //       code: code,
  //       type: type,
  //       description: adjustmentDescription,
  //       // specifyDiscountPercentage: specifyDiscountPercentage,
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
  // const FormReset = () => {
  //   setCode("");
  //   settype("");
  //   setadjustmentDescription("");
  //   // setSpecifyDiscountPercentage(0);
  // };

  return (
    <div>
      <div className="row mt-4">
        <form action="post">
          {/* =====================main form============================= */}
          <div className="d-flex">
            <div className="col-md-7">
              <div className="">
                <h3 className="fw-bold mx-2">Edit Adjustment Codes</h3>
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
                <div className="col-md-3">
                  <label htmlFor="">Adjustment Type</label>
                  <select
                    id="type"
                    name="type"
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    defaultValue={type ? type : ""}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option selected value="Credit">
                      Credit{" "}
                    </option>
                    <option value="Debit">Debit</option>
                  </select>
                </div>
              </div>
              <div className="row mt-2">
                <label htmlFor="descTextarea">Description</label>
                <div className="form-floating col-md-11">
                  <textarea
                    onChange={(e) => setadjustmentDescription(e.target.value)}
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="description"
                    value={adjustmentDescription ? adjustmentDescription : ""}
                  ></textarea>
                </div>
              </div>
              <div className="col-md-7 d-flex mt-2">
                <input
                  // onChange={(e) => setSpecifyDiscountPercentage(1)}
                  className="form-check-input fs-5"
                  type="checkbox"
                  value={specifyDiscountPercentage == 1 ? true : false}
                  onChange={(e) =>
                    setSpecifyDiscountPercentage(
                      !specifyDiscountPercentage == 1 ? false : true
                    )
                  }
                  id="specifyDiscountPercentage"
                />
                <label
                  className="form-check-label mx-2 mt-1"
                  htmlFor="specifyDiscountPercentage"
                >
                  Specify discount percentage for this Credit
                </label>
              </div>
              {/* xxxxxxxxxxxxxxxxxxxxxxx  discount work remains xxxxxxxxxxxxxxxxxxxxxxx */}
            </div>

            {/* =====================notes and alerts============================= */}
            {/* <div className="col-md-3 mt-2">notes and alerts</div> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAdjustmentCode;
