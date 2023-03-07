import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchManageAccessCustomers } from "../../../Redux/features/CustomerManagment/ManageAccessCustomerSlice";

const ManageAccess = (props) => {
  // hooks
  const dispatch = useDispatch();
  const { data: ManageAccessCustomers, status } = useSelector(
    (state) => state.ManageAccessCustomerSlice
  );
  const customerId = useSelector(
    (state) => state.ManageAccessCustomerSlice.manageAccessCustomerId
  );
  const [userExitIds, setExitsIds] = useState([]);
  console.log(ManageAccessCustomers);
  // Set Permissions Values are from the Backend
  useEffect(() => {
    if (customerId) dispatch(fetchManageAccessCustomers(customerId));
  }, []);
  // console.log("mange access customers:", ManageAccessCustomers);
  const setpermissions = [
    {
      value: "Test value from backend",
    },
    {
      value: "Test value from backend2",
    },
  ];

  // Value of Access

  const handleSelectChange = (e) => {
    console.log(e.target.value);
  };

  const AccessValue = (e) => {
    setExitsIds([customerId, ManageAccessCustomers.id]);
  };
  console.log("user id", ManageAccessCustomers);
  // const data ={customerId};
  // console.log("id stored in array",data.customerId,"id:",);

  //onSubmit
  const SubmitCustomer = () => {
    // API.post('',{
    //   customerId:'33',
    //   userId:'55',
    // })
    // .then((res) => {
    //   console.log(res);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  };

  const navigate = useNavigate();
  const NavBack = useCallback(
    // GoBack
    () => navigate("/customer-managment", { replace: true }),
    [navigate]
  );
  return (
    <div className="pt-3">
      <div className="col-md-12">
        <form onSubmit={() => SubmitCustomer()}>
          <div className="col-md-10 col-xs-8">
            <span>Managing Access for Customer {`Customer_Name`}</span>
          </div>
          <div className="row pt-2">
            <div className="col-md-4">
              <button
                type="submit"
                className="btn btn-sm btn-outline-primary p-auto mx-auto ms-auto"
              >
                Save
              </button>{" "}
              &nbsp;
              <button
                onClick={NavBack}
                className="btn btn-sm btn-outline-danger me-2"
              >
                Cancel
              </button>
            </div>
          </div>

          <div className="row px-0 p-0 mt-3 ">
            <div className="col-md-5">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="NotShowUsers"
                />
                <label
                  className="form-check-label px-0 "
                  htmlFor="NotShowUsers"
                >
                  Do not show users assigned to this customer as their default
                </label>
              </div>
            </div>
            <div className="col-md-3 me-0 px-auto mt-0">
              <select
                onChange={handleSelectChange}
                className="form-select"
                aria-label="Select for Setting Permissions"
                defaultValue={"Set All Permissions"}
              >
                <option
                  value="Set All Permissions"
                  selected={true}
                  disabled={true}
                  hidden={true}
                >
                  Set All Permissions
                </option>
                {setpermissions.map((setperm, i) => {
                  return (
                    <option key={i} {...setperm} value={setperm.value}>
                      {setperm.value}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-md-8">
              <table className="table table-light table-hover table-striped table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Title</th>
                    <th scope="col">User Type</th>
                    <th scope="col">Access</th>
                    <th scope="col">Permissions</th>
                    {/* <th scope="col">Handle</th> */}
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {ManageAccessCustomers.data?.map((items, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">{items.username}</th>
                        <td>{items.fullname}</td>
                        <th>{items.title}</th>
                        <td>{items.type}</td>
                        <td className="d-flex justify-content-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            onChange={(e) => AccessValue(items.username)}
                            id="setaccess"
                            checked={items.access}
                            value={"access-" + items.access_to}
                          />
                        </td>
                        <td>{items.permissions}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageAccess;
