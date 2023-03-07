import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { FormVal } from "../../CustomerSetup/Practices/FormValcustomerpractices";
const NewPaymentProfile = () => {
  const navigate = useNavigate();
  const initialValues = {
    payername: "",
  };
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: FormVal,
      validateOnChange: true,
      validateOnBlur: false,
      // By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: (values, action) => {
        console.log("🚀 ~ file: App.jsx ~ line 17 ~ App ~ values", values);
        // to get rid of all the values after submitting the form
        action.resetForm();
      },
    });
  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit} method="post">
        <div className="row">
          <div className="col-md-6">
            <button
              type="submit"
              className="btn btn-labeled btn-outline-primary btn-sm mx-2"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <span className="btn-label">
                <i className="fa fa-check" />
              </span>{" "}
              Enter Payment Details
            </button>
            <button
              type="button"
              onClick={() => navigate("/user/payment-profile")}
              className="btn btn-labeled btn-outline-danger btn-sm"
            >
              <span className="btn-label">
                <i className="fa fa-xmark" />
              </span>{" "}
              Cancel
            </button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <div className="form-row">
              <div className="col">
                <input
                  type="text"
                  name="payername"
                  id="payername"
                  //   required
                  className="form-control"
                  placeholder="Enter Name"
                  value={values.payername}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.payername && errors.payername ? (
                  //   <p className="form-error">{errors.payername}</p>
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            PLease Specify a name for the payment profile
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          />
                        </div>

                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div>
            <input type="checkbox" className="m-2" />
            Make this my account's default payment profile
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6 d-flex">
            <div className="mx-2">
              <input
                className="form-check-input mx-1"
                type="radio"
                name="radioNoLabel"
                id="radioNoLabel1"
                value=""
                aria-label=""
              />
              Credit Card
            </div>

            <div className="mx-2">
              <input
                className="form-check-input mx-1"
                type="radio"
                name="radioNoLabel"
                id="radioNoLabel2"
                value=""
                aria-label="..."
              />
              Debit Card
            </div>
            <div className="mx-2">
              <input
                className="form-check-input mx-1"
                type="radio"
                name="radioNoLabel"
                id="radioNoLabel2"
                value=""
                aria-label="..."
              />
              Bank Account
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default NewPaymentProfile;
