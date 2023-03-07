import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import API from "../../../Api/ClientApi";
import { fetchCustomers } from "../../../Redux/features/CustomerManagment/CustomerManagmentSlice";
import UserManagementTable from "./UserManagementTable";
import UserProfilePreview from "./UserProfilePreview";

const UserManagment = () => {
  const dispatch = useDispatch();
  const { data: customers, status } = useSelector(
    (state) => state.CustomersManagment
  );

  useEffect(() => {
    API.get("accountadmin/customermanagement")
      .then(function (response) {})
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
    dispatch(fetchCustomers());
  }, [fetchCustomers]); // recalls after timetotime

  const navigate = useNavigate();
  const handleOnClick = useCallback(
    // Goto User Profile Page
    () => navigate("/userProfile", { replace: true }),
    [navigate]
  );
  // const [customerdata, setCustomerData] = useState([]);

  // useEffect(() => {
  //   showCustomer();
  // }, []);
  // function showCustomer() {
  //   API.get("customer-management")
  //   .then(data => setCustomerData(data.data.data))
  //   .catch(error => console.log(error))
  // }
  // console.log(customerdata);
  const [showUser, setShowUser] = useState(false);
  // const handleUserShow = () => {

  // }
  // For Displaying USer on Clicking Table
  const [usernamefromtable, setUsernamefromTable] = useState();
  const [userfullnamefromtable, setUserfullnamefromTable] = useState();
  const [userstatusfromtable, setUserStatusfromTable] = useState();
  const [usertypefromtable, setUserTypefromTable] = useState();
  const [userIdFromTable, setUserIdFromTable] = useState();
  const handleShowUser = (username, fullname, status, usertype, user_id) => {
    // 👇️ take parameter passed from Child component (UserManagementTable.jsx)
    setShowUser(true);

    setUsernamefromTable(username);
    setUserTypefromTable(usertype);
    setUserStatusfromTable(status);
    setUserfullnamefromTable(fullname);
    setUserIdFromTable(user_id);
  };

  return (
    <div className="mt-2 px-0">
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-3 pt-1">
            <form>
              <label htmlFor="customers">Manage Users for Customer</label>

              <select
                className="form-select form-select-sm"
                name="customers"
                id="customers"
              >
                <option value="All" disabled={true} selected>
                  All Customers
                </option>
                {Array.from(customers)?.map((data, i) => {
                  return (
                    <option value={data.customer_name} key={i} {...data}>
                      {data.customer_name}
                    </option>
                  );
                })}
              </select>
            </form>
          </div>
        </div>
        <div className="col-md-10 my-3 d-flex ">
          <div className="col-md-3 text-break">
            <button
              id="AddUser"
              className="btn btn-outline-primary btn-sm"
              onClick={handleOnClick}
            >
              <i className="fas fa-plus"></i>&nbsp;Add User
            </button>
            &nbsp;&nbsp;&nbsp;
          </div>
        </div>

        <div className="col-md-8 col-xs-3">
          {" "}
          <UserManagementTable handleShowUser={handleShowUser} />
        </div>

        <div className="col-md-3 my-0 px-0">
          {showUser && (
            <UserProfilePreview
              usernamefromtable={usernamefromtable}
              userfullnamefromtable={userfullnamefromtable}
              userstatusfromtable={userstatusfromtable}
              usertypefromtable={usertypefromtable}
              userIdFromTable={userIdFromTable}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagment;
