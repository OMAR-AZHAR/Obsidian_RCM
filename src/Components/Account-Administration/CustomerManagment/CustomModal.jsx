import { useFormik as formValidate } from "formik";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../../../Api/ClientApi";
import { ModalValidation } from "./ModalValidation";

export default function ModalForm(props) {
  const [customerName, setCustomerName] = useState(null);

  const initialValues = {
    customer_name: "",
  };

  // useEffect(() => {
  //   setCust();
  // }, [props.onDataReceived]);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    formValidate({
      initialValues,
      validationSchema: ModalValidation,
      validateOnChange: true,
      validateOnBlur: true,
      // By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: (values, action) => {
        API.post("accountadmin/customermanagement/addcustomer", {
          customer_name: values.customer_name
            .toString()
            .trimStart()
            .toUpperCase(),
        })
          .then(function (response) {
            if (response.data.status == 200) {
              props.onDataReceived.call(undefined, {
                updated: true,
              });

              window.sessionStorage.setItem(
                "sequenceno",
                response.data.data.sequenceno,
                {
                  sameSite: "strict",
                  secure: true,
                }
              );
              window.sessionStorage.setItem(
                "customername",
                response.data.data.customer_name,
                {
                  sameSite: "strict",
                  secure: true,
                }
              );
              window.sessionStorage.setItem(
                "customer_id",
                response.data.data.customer_id,
                {
                  sameSite: "strict",
                  secure: true,
                }
              );
              window.dispatchEvent(new Event("storage"));
              // window.location.reload();
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Customer Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setCustomerName(props.handleClose);
        action.resetForm();
      },
    });
  return (
    <>
      <Button variant="outline-primary btn-sm" onClick={props.handleShow}>
        <i className="fa fa-plus"></i>&nbsp;Add Customer
      </Button>
      <Modal
        id="addCustomer_modal"
        tabIndex="-1"
        keyboard={false}
        backdrop="static"
        centered
        aria-labelledby="addCustomer_modalLabel"
        aria-hidden="true"
        show={props.show}
        onHide={props.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Customer</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <label>Customer Name</label>
            <input
              id="customer_name"
              name="customer_name"
              className={`form-control form-control-sm col-md-4 ${
                touched.customer_name && errors.customer_name && "is-invalid"
              }`}
              type="text"
              autoComplete="off"
              autoCapitalize="characters"
              autoCorrect="off"
              spellCheck="false"
              onChange={handleChange}
              value={values.customer_name.trimStart().toUpperCase()}
              onBlur={handleBlur}
              autoFocus={true}
              // required={true}
              maxLength={60}
            />
            {touched.customer_name && errors.customer_name ? (
              <p className="form-error mx-1">{errors.customer_name}</p>
            ) : null}
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              variant="outline-danger btn-sm"
              onClick={props.handleClose}
            >
              Close
            </Button>{" "}
            <Button
              variant="outline-primary btn-sm"
              type="submit"
              onClick={customerName}
            >
              Save
            </Button>
          </Modal.Footer>{" "}
        </form>
      </Modal>
    </>
  );
}
