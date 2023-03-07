import { useEffect, useState } from 'react';
// import CustomerAccess from "./CustomerAccess";
// import AccessHours from "./AccessHours";
// import DepartHours from "./DepartHours";
// import AccountAdminCat from "./Categories/AccountAdminCat";
// import AppointmentCat from "./Categories/AppointmentCat";
// import ClaimCat from "./Categories/ClaimCat";
// import CustomerCat from "./Categories/CustomerCat";
// import DocumentsCat from "./Categories/DocumentsCat";
// import HomeCat from "./Categories/HomeCat";
// import InterfaceCat from "./Categories/InterfaceCat";
// import OtherCat from "./Categories/OtherCat";
// import PatientCat from "./Categories/PatientCat";
// import PaymentCat from "./Categories/PaymentCat";
// import ReportsCat from "./Categories/ReportsCat";

export default function Permissions(props) {
  const [showhide, setShowhide] = useState('');
  const handleCategory = (e) => {
    const getCategory = e.target.value;
    setShowhide(getCategory);
  };
  const category = [
    {
      id: 1,
      cat: 'Account Administration',
      val: 'Account Administration',
    },
    {
      id: 2,
      cat: 'Appointments',
      val: 'Appointments',
    },
    {
      id: 3,
      cat: 'Claim',
      val: 'Claim',
    },
    {
      id: 4,
      cat: 'Customer Setup',
      val: 'Customer Setup',
    },
    {
      id: 5,
      cat: 'Documents',
      val: 'Documents',
    },
    {
      id: 6,
      cat: 'Home',
      val: 'Home',
    },
    {
      id: 7,
      cat: 'Interface',
      val: 'Interface',
    },
    {
      id: 8,
      cat: 'Other',
      val: 'Other',
    },
    {
      id: 9,
      cat: 'Patient',
      val: 'Patient',
    },
    {
      id: 10,
      cat: 'Payment',
      val: 'Payment',
    },
    {
      id: 11,
      cat: 'Reports',
      val: 'Reports',
    },
  ];

  const [roleStatus, setRoleStatus] = useState(true);
  const [permissionStatus, setPermissionStatus] = useState(false);
  const togglebtn = () => {
    setRoleStatus(!roleStatus);
    setPermissionStatus(!permissionStatus);
  };

  return (
    <div>
      <div className="accordion" id="accordionExample">
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
                <select className="form-select form-select-sm" name="customers" id="customers">
                  <option value="userManagement_userprofile_ManageCustomer-1">
                    BlLUEGRASS FAMILY MEDICINE AND PEDIATRICS, PLLC - 534747
                  </option>
                  <option value="userManagement_userprofile_ManageCustomer-2">All Customers</option>

                  <option value="userManagement_userprofile_ManageCustomer-3">TEST</option>
                  {/* <option value="ManageCustomer-4">Audi</option> */}
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
                        value="option1"
                        onChange={togglebtn}
                        defaultChecked={roleStatus}
                      />

                      <label className="form-check-label" htmlFor="radio1">
                        {' '}
                        Assign to an existing permission role
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="radio2"
                        name="optradio1"
                        value="option2"
                        onChange={togglebtn}
                        defaultChecked={permissionStatus}
                      />
                      <label className="form-check-label" htmlFor="radio2">
                        {' '}
                        Set custom permissions
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3 mt-1 flex-fill">
                    <select disabled={!roleStatus} className="form-select form-select-sm" name="role" id="role">
                      <option value="auth-rep">Auth. rep</option>

                      <option value="admin">Admin</option>
                      <option value="ManageCustomer-3">User</option>
                      {/* <option value="ManageCustomer-4">Audi</option> */}
                    </select>
                  </div>

                  {/* <form className="col-md-12 mt-2"> */}

                  <input
                    className="form-control form-control-sm col-md-5 me-2 mb-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  {/* <button className="btn btn-outline-success" type="submit">Search</button> */}

                  <label>Select Category to View Permissions</label>
                  <div className="col-md-5">
                    <select
                      onChange={(e) => handleCategory(e)}
                      className="form-select form-select-sm"
                      name="category"
                      id="category"
                      defaultValue={'Select Custom Permissions'}
                    >
                      <option value={'Define Custom Permissions'} hidden>
                        Select Custom Permissions
                      </option>
                      {category.map((items) => {
                        return (
                          <option className="dropdown-item" value={items.val} key={items.id} {...items}>
                            {items.cat}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-md-7 mt-2">
                    {' '}
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="permdesc" name="permdesc" />

                      <label htmlFor="permdesc">Show Permission Descriptions</label>
                    </div>
                  </div>

                  {showhide === 'Account Administration' && <AccountAdminCat permissionStatus={!permissionStatus} />}

                  {showhide === 'Appointments' && <AppointmentCat permissionStatus={!permissionStatus} />}
                  {showhide === 'Claim' && <ClaimCat permissionStatus={!permissionStatus} />}

                  {showhide === 'Customer Setup' && <CustomerCat permissionStatus={!permissionStatus} />}

                  {showhide === 'Documents' && <DocumentsCat permissionStatus={!permissionStatus} />}
                  {showhide === 'Home' && <HomeCat permissionStatus={!permissionStatus} />}
                  {showhide === 'Interface' && <InterfaceCat permissionStatus={!permissionStatus} />}
                  {showhide === 'Other' && <OtherCat permissionStatus={!permissionStatus} />}

                  {showhide === 'Patient' && <PatientCat permissionStatus={!permissionStatus} />}

                  {showhide === 'Payment' && <PaymentCat permissionStatus={!permissionStatus} />}

                  {showhide === 'Reports' && <ReportsCat permissionStatus={!permissionStatus} />}
                </div>
              </div>
            </div>
          </div>
        </div>
        <CustomerAccess />
        <AccessHours />
        <DepartHours />
      </div>
    </div>
  );
}
