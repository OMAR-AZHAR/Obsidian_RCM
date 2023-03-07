import { lazy,useEffect } from "react";
import { useNavigate } from "react-router";
import API from "../../../Api/ClientApi";
import Swal from "../../../GLOBAL/SwalAlert";
const InvoiceHistoryTable = lazy(
  () => import("../../Tables/InvoiceHistoryTable")
);
const PaymentTableInvoice = lazy(
  () => import("../../Tables/PaymentTableInvoice")
);
const current_balance = "$11546.04";
const credit_availible = "$0";
const debit_sheduled_for = "12/2/2022";
const last_payment = "$11434";
const last_payment_date = "Sep 23,2022";
const Invoices = () => {
  const navigate = useNavigate();
  useEffect(() => {
    API.get("accountadmin/customermanagement")
    .then(function (response) {
     
    })
    .catch(function (error) {
      if (error.response.data.data == 403) {
        Swal.fire({
          icon: 'error',
          imageHeight:30,
          imageWidth:30,
          title: 'Sorry...',
          text: 'Please contact your administrator to get Permissions!',
          confirmButtonColor: '#08619b',
        })
        navigate(-1)
      }
      
    });
  }, []);
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-5">
          <button
            type="submit"
            className="btn btn-labeled btn-outline-primary btn-sm mx-2"
            data-bs-toggle="modal"
            data-bs-target="#makeapayment"
          >
            <span className="btn-label">
              <i className="fa fa-credit-card" />
            </span>{" "}
            Make a Payment
          </button>

          <div
            className="modal fade"
            id="makeapayment"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    Make a Payment
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <select
                    className="form-select form-select-sm w-75 mb-3"
                    aria-label=".form-select-sm example"
                  >
                    <option value="1">
                      Create Credit Card Payment Profile
                    </option>
                    <option value="2">Create ACH Payment Profile</option>
                    <option value="3">One Time Credit Card</option>
                    <option value="3">One Time ACH</option>
                    <option selected>American Express Platinum</option>
                  </select>
                  <label htmlFor="enterAmount">Payment Amount</label>
                  <input
                    type="text"
                    id="enteramount"
                    className="form-control form-control-sm w-75"
                    placeholder="0.00"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Enter Payment
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-labeled btn-outline-info btn-sm mx-2"
          >
            <span className="btn-label">
              <i className="fa fa-print" />
            </span>{" "}
            Print Account Summary
          </button>

          <div className="mt-2">
            <p>
              <strong>Current Balance: </strong>
              {current_balance} (Credit Availible: {credit_availible} )
            </p>
            <p>
              {" "}
              <span className="fas fa-info-circle" />{" "}
              <i>Auto Debit scheduled for {debit_sheduled_for} </i>{" "}
            </p>
            <p>
              <strong>Last Payment: </strong>({last_payment}) on:{" "}
              {last_payment_date}{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                Invoice History
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                Payment History
              </button>
            </li>
          </ul>
          <hr />
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              {" "}
              <InvoiceHistoryTable />{" "}
            </div>
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <PaymentTableInvoice />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Invoices;
