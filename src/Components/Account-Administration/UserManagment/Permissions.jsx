import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetCustomerNames,
  getCustomerNamesSlice,
} from "../../../Redux/features/UserManagement/UserProfile/CustomerNamesSlice";
import {
  CustomerChange,
  SelectPermissionCategory,
  SelectRole,
  SelectRolePerm,
} from "../../../Redux/features/UserManagement/UserProfile/PermissionSlice";
import AccessHours from "./AccessHours";
import AccountAdminCat from "./Categories/AccountAdminCat";
import AppointmentCat from "./Categories/AppointmentCat";
import ClaimCat from "./Categories/ClaimCat";
import CustomerCat from "./Categories/CustomerCat";
import DocumentsCat from "./Categories/DocumentsCat";
import HomeCat from "./Categories/HomeCat";
import InterfaceCat from "./Categories/InterfaceCat";
import OtherCat from "./Categories/OtherCat";
import PatientCat from "./Categories/PatientCat";
import PaymentCat from "./Categories/PaymentCat";
import ReportsCat from "./Categories/ReportsCat";
import CustomerAccess from "./CustomerAccess";
import DepartHours from "./DepartHours";

export default function Permissions(props) {
  const [checked, setChecked] = useState(false);
  const [selectedCus, setSelectedCus] = useState("");
  const toggle = (value) => {
    return !value;
  };
  const [showhide, setShowhide] = useState("Account Administration");
  const handleCategory = (e) => {
    const getCategory = e.target.value;
    setShowhide(getCategory);
    dispatch(SelectPermissionCategory(e.target.value));
  };
  const { data: userProfileCustomerData, status } = useSelector(
    (state) => state.CustomerNamesSlice
  );
  console.log("customer array with duplicated ", userProfileCustomerData);

  // get customer names
  useEffect(() => {
    dispatch(fetCustomerNames());
  }, []);
  const permissioncustomer = useSelector(
    (state) => state.PermissionCustomers.customers
  );
  const assignpermissionrole = useSelector(
    (state) => state.PermissionCustomers.status
  );
  const customrole = useSelector(
    (state) => state.PermissionCustomers.custompermission
  );
  // const selectrole = useSelector((state) => state.PermissionCustomers.selectrole);
  const permcategory = useSelector(
    (state) => state.PermissionCustomers.selectpermcategory
  );

  const dispatch = useDispatch();

  // Array of User Profile Permissions Category Select Options
  const category = [
    {
      id: 1,
      cat: "Account Administration",
      val: "Account Administration",
    },
    {
      id: 2,
      cat: "Appointments",
      val: "Appointments",
    },
    {
      id: 3,
      cat: "Claim",
      val: "Claim",
    },
    {
      id: 4,
      cat: "Customer Setup",
      val: "Customer Setup",
    },
    {
      id: 5,
      cat: "Documents",
      val: "Documents",
    },
    {
      id: 6,
      cat: "Home",
      val: "Home",
    },
    {
      id: 7,
      cat: "Interface",
      val: "Interface",
    },
    {
      id: 8,
      cat: "Other",
      val: "Other",
    },
    {
      id: 9,
      cat: "Patient",
      val: "Patient",
    },
    {
      id: 10,
      cat: "Payment",
      val: "Payment",
    },
    {
      id: 11,
      cat: "Reports",
      val: "Reports",
    },
  ];

  const selectHandler = (customer) => {
    return customer.cus_id === 11;
  };
  const selectedCustomer = userProfileCustomerData.filter(selectHandler);
  console.log("first customer", selectedCustomer);

  // Array of User Profile Permissions Roles Select Options
  const PermissionsRole = [
    {
      role: "Auth Rep",
      value: "auth-rep",
    },
    {
      role: "Admin",
      value: "admin",
    },
    {
      role: "User",
      value: "user",
    },
  ];
  const userType = useSelector((state) => state.EditUser.userTypeChange);
  console.log(" userprofuser type change or not:", userType);
  const [roleStatus, setRoleStatus] = useState(true);
  const [permissionStatus, setPermissionStatus] = useState(false);
  const [customerValue, setCustomerValue] = useState(
    JSON.stringify(userprofilecustomer[0].id)
  );
  useEffect(() => {
    dispatch(fetCustomerNames(customerValue));
  }, [customerValue]);

  useEffect(() => {
    if (userType == true) {
      setRoleStatus(!roleStatus);
      setPermissionStatus(!roleStatus);
    }
  }, [userType]);
  const togglebtn = () => {
    setRoleStatus(!roleStatus);
    setPermissionStatus(!roleStatus);
  };

  return (
    <div className="accordion" id="accordionExample">
      {/* permission tab */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="false"
            aria-controls="collapseOne"
          >
            Permissions
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <div className="col-md-12">
              <select
                className="form-select form-select-sm"
                name="UserManagementUserProfilePermissionsCustomers"
                id="UserManagementUserProfilePermissionsCustomers"
                onChange={(e) => setCustomerValue(e.target.value)}
              >
                {Array.from(userProfileCustomerData)?.map((upc, i) => {
                  return (
                    <option value={upc.id} key={i} {...upc}>
                      {upc.customer_name}
                    </option>
                  );
                })}
              </select>
              {/* </form> */}

              <div className="row">
                <div className="col-md-8 mt-2">
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="radio1"
                      name="optradio1"
                      value="Role"
                      onChange={togglebtn}
                      defaultChecked={roleStatus}
                      onClick={(e) => dispatch(SelectRolePerm(e.target.value))}
                    />

                    <label className="form-check-label" htmlFor="radio1">
                      Assign to an existing permission role
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="radio2"
                      name="optradio1"
                      value="Permissions"
                      onChange={togglebtn}
                      onClick={(e) => dispatch(SelectRolePerm(e.target.value))}
                      defaultChecked={permissionStatus}
                    />
                    <label className="form-check-label" htmlFor="radio2">
                      {" "}
                      Set custom permissions
                    </label>
                  </div>
                </div>
                <div className="col-md-3 mt-1 flex-fill">
                  <select
                    disabled={!roleStatus}
                    className="form-select form-select-sm"
                    name="UserManagementUserProfilePermissionsRole"
                    id="UserManagementUserProfilePermissionsRole"
                    onChange={(e) => {
                      dispatch(SelectRole(e.target.value));
                    }}
                  >
                    {" "}
                    <option value={"Select a role"} disabled={true} selected>
                      Select a role
                    </option>
                    {PermissionsRole.map((pr, i) => {
                      return (
                        <option key={i} value={pr.value} {...pr}>
                          {pr.role}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-md-12">
                  <input
                    className="form-control form-control-sm me-2 mb-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </div>
                {/* <button className="btn btn-outline-success" type="submit">Search</button> */}

                <label>Select Category to View Permissions</label>
                <div className="col-md-5">
                  <select
                    onChange={(e) => {
                      handleCategory(e);
                    }}
                    className="form-select form-select-sm"
                    name="category"
                    id="category"
                    defaultValue={"Account Administration"}
                  >
                    {category.map((items) => {
                      return (
                        <option
                          className="dropdown-item"
                          value={items.val}
                          key={items.id}
                          {...items}
                        >
                          {items.cat}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-md-7 mt-2">
                  {" "}
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="permdesc"
                      name="permdesc"
                      onChange={() => setChecked(toggle)}
                    />

                    <label htmlFor="permdesc">
                      Show Permission Descriptions
                    </label>
                  </div>
                </div>
                {/* Show Specific Categories on Select */}
                {showhide === "Account Administration" && (
                  <AccountAdminCat
                    permissionStatus={!permissionStatus}
                    showDescription={checked}
                    permissionType="1"
                  />
                )}

                {showhide === "Appointments" && (
                  <AppointmentCat
                    permissionStatus={!permissionStatus}
                    showDescription={checked}
                    permissionType="1"
                  />
                )}
                {showhide === "Claim" && (
                  <ClaimCat
                    permissionStatus={!permissionStatus}
                    showDescription={checked}
                    permissionType="1"
                  />
                )}

                {showhide === "Customer Setup" && (
                  <CustomerCat
                    permissionStatus={!permissionStatus}
                    showDescription={checked}
                    permissionType="1"
                  />
                )}

                {showhide === "Documents" && (
                  <DocumentsCat
                    permissionStatus={!permissionStatus}
                    showDescription={checked}
                    permissionType="1"
                  />
                )}
                {showhide === "Home" && (
                  <HomeCat
                    permissionStatus={!permissionStatus}
                    showDescription={checked}
                    permissionType="1"
                  />
                )}
                {showhide === "Interface" && (
                  <InterfaceCat
                    permissionStatus={!permissionStatus}
                    showDescription={checked}
                    permissionType="1"
                  />
                )}
                {showhide === "Other" && (
                  <OtherCat
                    permissionStatus={!permissionStatus}
                    showDescription={checked}
                    permissionType="1"
                  />
                )}

                {showhide === "Patient" && (
                  <PatientCat
                    permissionStatus={!permissionStatus}
                    showDescription={checked}
                    permissionType="1"
                  />
                )}

                {showhide === "Payment" && (
                  <PaymentCat
                    permissionStatus={!permissionStatus}
                    showDescription={checked}
                    permissionType="1"
                  />
                )}

                {showhide === "Reports" && (
                  <ReportsCat
                    permissionStatus={!permissionStatus}
                    showDescription={checked}
                    permissionType="1"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomerAccess />
      <AccessHours />
      <DepartHours />
    </div>
  );
}
