import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../../../Api/ClientApi";

import useFetch from "../../../Hooks/useFetch";
import { setManageAccessCustomerId } from "../../../Redux/features/CustomerManagment/ManageAccessCustomerSlice";
import Modal from "./CustomModal";

const CustomerManagment = () => {
  // const [mode, setMode] = useState()

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // For Entering Customer details
  const [displayCustomerModel, setDisplayCustomerModel] = useState(false);
  // Manage Access / Login
  const [displayCustomerName, setDisplayCustomerModelName] = useState("");
  const [Customers, setCustomers] = useState<any[]>();
  const {
    data: customers,
    loading,
    error,
  } = useFetch("accountadmin/customermanagement");
  // Toogle to show closed customer's status
  const [closedCustomerStatus, setClosedCustomerStatus] = useState(false);
  // Closed Customers
  const [ClosedCustomersData, setClosedCustomerData] = useState();
  const [Trigger, setTrigger] = useState<boolean>(true);

  useEffect(() => {
    API.get("accountadmin/customermanagement")
      .then(function (response) {
        console.log(response);
        setCustomers(response.data.data);
      })
      .catch(function (error) {
        if (error.response.data.data == 403) {
          Swal.fire({
            icon: "error",
            imageHeight: 30,
            imageWidth: 30,
            title: "Sorry...",
            text: "Please contact your administrator to get Permissions!",
            confirmButtonColor: "#08619b",
          });
          navigate(-1);
        }
      });
  }, [Trigger]);

  // function ApiCall() {
  //   if (closedCustomerStatus) showClosedCustomers();
  //   else dispatch(fetchCustomers());
  //   // console.log("fecth func renders...");
  // }

  // // API to fetch closed/inactive Customers
  // function showClosedCustomers() {
  //   API.get("customer-management/inactivecustomers")
  //     .then(function (response) {
  //       if (response.data.status == 200) {
  //         setClosedCustomerData(response.data.data);
  //       }
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     });
  // }

  const ModelHandler = (name, id) => {
    setDisplayCustomerModelName(name);
    dispatch(setManageAccessCustomerId(id));
    setDisplayCustomerModel(true);
  };

  function toggleClosedCustomers(value) {
    setClosedCustomerStatus(!value);
  }

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  // function showCustomer() {
  //   API.get("/customer-management")
  //     .then(function (response) {
  //       if (response.data.status == 200) {
  //         setCustomerData(response.data.data);
  //       }
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     });
  //}

  const CustomerReveived = (result) => {
    if (result.updated == true) {
      setTrigger(!Trigger);
    }
  };

  return (
    <div className="row">
      <div className="col-md-8 mt-4">
        <div className="d-flex flex-row">
          <Modal
            // refreshData={ApiCall()}
            onDataReceived={CustomerReveived}
            show={show}
            handleShow={handleShow}
            handleClose={handleClose}
          />
          &nbsp;&nbsp;
          <div className="col mt-1">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={() => {
                toggleClosedCustomers(closedCustomerStatus);
              }}
              id="ShowClosedCustomers"
            />
            <label className="form-check-label" htmlFor="ShowClosedCustomers">
              &nbsp; Show Closed Customers
            </label>
          </div>
        </div>
        <div className="col-xl-10 px-0 mt-3">
          <div className="card mb-0">
            <div className={`text-center card-header text-light`}>
              <i className="fa fa-users me-1"></i>
              Customers
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center text-dark fw-bold">
                  Loading Customers...
                </div>
              ) : Customers ? (
                <div className="">
                  <br />
                  <div className="table-responsive">
                    {loading ? "Loading..." : null}
                    <table
                      className="table table-sm table-light table-hover table-striped table table-bordered"
                      // style={{
                      //   overflowY: "scroll",
                      //   height: "calc(100vh - 127px",
                      // }}
                    >
                      <thead>
                        <tr>
                          <th scope="col">id</th>
                          <th scope="col">Customer</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {Customers?.map((items, i) => {
                          //customers
                          return (
                            <tr
                              onClick={() =>
                                ModelHandler(items.customer_name, items.id)
                              }
                              key={i}
                            >
                              <th>{items.id}</th>
                              <td title={items.customer_name}>
                                {items.customer_name?.substring(0, 20) + "..."}
                              </td>
                              <td>{items.status ? "Open" : "Closed"}</td>
                            </tr>
                          );
                        })}
                        {/* For Closed Customers  */}
                        {/* {ClosedCustomersData?.map((items, i) => {
                          return (
                            <tr
                              onClick={() =>
                                ModelHandler(items.customer_name, items.id)
                              }
                              key={i}
                            >
                              <th scope="row">{items.id}</th>
                              <td>{items.customer_name}</td>
                              <td>{items.status ? "Closed" : "Open"}</td>
                            </tr>
                          );
                        })} */}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center text-dark">No Recent Customers</div>
              )}
            </div>
          </div>
        </div>
      </div>
      {displayCustomerModel && (
        <div className="col-md-4 mt-3">
          <h2 style={{ cursor: "pointer" }} title={displayCustomerName}>
            {displayCustomerName?.substring(0, 20) + "..."}
          </h2>
          <br></br>
          <span>Customer # {``}</span>
          <br></br>
          <span className="mt-1 mb-1">Status: {``}</span>
          <br></br>
          <span>Date Opened {``}</span>
          <br></br>

          <Link className="link-primary mb-1" to="#!">
            Login to this Customer
          </Link>
          <br />
          <Link className="link-primary mt-1" to="/ManageAccesstoCustomers">
            Manage Access to this Customer
          </Link>
        </div>
      )}
    </div>
  );
};

export default CustomerManagment;
