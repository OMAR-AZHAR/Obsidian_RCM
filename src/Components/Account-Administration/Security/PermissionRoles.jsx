
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FetchAllRoles } from "../../../Redux/features/Security/ShowAllRolesSlice";
import {
  setRoleId,
  setName,
} from "../../../Redux/features/Security/ShowAllRolesSlice";
import { useDispatch, useSelector } from "react-redux";

const PermissionRoles = () => {
  //define states
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inactiveIncluded, setInactiveIncluded] = useState(false);
  const [inactiveIncludedMain, setInactiveIncludedMain] = useState(false);
  const { data: allRoles, status } = useSelector(
    (state) => state.ShowAllRolesSlice
  );
  const [userData, setUserData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [userDataMain, setUserDataMain] = useState([]);
  const [filterDataMain, setFilterDataMain] = useState([]);
  const [query, setQuery] = useState("");
  const [queryMain, setQueryMain] = useState("");

  useEffect(() => {
    const checInactive = (allRoles) => {
      return allRoles.deleted_at != null;
    };
    const checActive = (allRoles) => {
      return allRoles.deleted_at == null;
    };
    const inactiveroles = allRoles.filter(checInactive);
    const activeroles = allRoles.filter(checActive);

    if (inactiveIncluded) {
      setUserData(allRoles);
      setFilterData(allRoles);
    } else {
      setUserData(activeroles);
      setFilterData(activeroles);
    }
    if (inactiveIncludedMain) {
      setUserDataMain(allRoles);
      setFilterDataMain(allRoles);
    } else {
      setUserDataMain(activeroles);
      setFilterDataMain(activeroles);
    }
  }, [inactiveIncluded, inactiveIncludedMain, allRoles]);
  // fetch roles from thunk
  useEffect(() => {
    dispatch(FetchAllRoles());
  }, []);


  // search on showAll table
  const handleSearch = (event) => {
    const getSearch = event.target.value;
    // console.log("searc",getSearch);
    if (getSearch.length > 0) {
      const searchData = userData.filter((items) =>
        items.name.toLowerCase().includes(getSearch)
      );
      console.log("searched data", searchData);
      setUserData(searchData);
    } else {
      setUserData(filterData);
    }
    setQuery(getSearch);
  };





  // search on main page table
  const handleSearchMain = (event) => {
    const getSearch = event.target.value;
    // console.log("searc",getSearch);
    if (getSearch.length > 0) {
      const searchData = userDataMain.filter((items) =>
        items.name.toLowerCase().includes(getSearch)
      );
      console.log("searched data", searchData);
      setUserDataMain(searchData);
    } else {
      setUserDataMain(filterDataMain);
    }
    setQueryMain(getSearch);
  };

  const handleOnClickNewpermission = () => {
    navigate("/new-permission-role", { replace: true });
    dispatch(setRoleId(""));
    dispatch(setName(""));
  };
  const showSpecificModel = (role_id, roleName) => {
    dispatch(setName(roleName));
    dispatch(setRoleId(role_id));
    navigate("/edit-specificRole", { replace: true });
  };
  // include inactive role status
  const includeInactiveHabdler = () => {
    inactiveIncluded == true
      ? setInactiveIncluded(false)
      : setInactiveIncluded(true);
  };
  const includeInactiveHabdlerMain = () => {
    inactiveIncludedMain == true
      ? setInactiveIncludedMain(false)
      : setInactiveIncludedMain(true);
  };

  return (
    <div className="row d-flex mt-4">
      <div className="col-md-6 d-flex">
        <div className="col-md-4 d-flex flex-column">
          <button
            type="button"
            onClick={handleOnClickNewpermission}
            className="btn btn-labeled btn-outline-primary btn-sm mb-3"
          >
            <span className="btn-label">
              <i className="fa fa-plus"></i>
            </span>{" "}
            New Permission Role
          </button>
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            className="btn btn-labeled btn-outline-primary btn-sm d-flex"
          >
            <span className="btn-label">
              <i className="fas fa-bars mx-3"></i>
            </span>{" "}
            <span className="">Show All</span>
          </button>
          {/* show all model */}
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    All Roles
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="input-group input-group-sm">
                    <input
                      type="text"
                      id="search"
                      name="search"
                      value={query}
                      onChange={(e) => handleSearch(e)}
                      className="form-control w-25"
                      aria-label="Small"
                      placeholder="Search for roles"
                      aria-describedby="inputGroup-sizing-sm"
                    />
                  </div>

                  <table className="table table-hover table-sm mt-3 table-bordered caption-top">
                    <thead>
                      <tr className="bg-primary">
                        <th scope="col">Role #</th>
                        <th scope="col">Name</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.map((role, i) => (
                        <tr
                          data-bs-toggle="modal"
                          onClick={() => showSpecificModel(role.id, role.name)}
                          key={i}
                        >
                          <td>{role.id}</td>
                          <td>{role.name}</td>
                          <td>
                            {role.deleted_at == null ? (
                              <span style={{ color: "#26859C" }}>Active</span>
                            ) : (
                              <span style={{ color: "black" }}>Inactive</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer d-flex justify-content-between">
                  <div>
                    <input
                      type="checkbox"
                      className="mx-2 mt-2"
                      id="includeinactiverolesmodel"
                      onChange={includeInactiveHabdler}
                      name="includeinactiverolesmodel"
                    />
                    <label htmlFor="includeinactiverolesmodel">
                      Include inactive roles
                    </label>
                  </div>
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-outline-danger btn-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* main page */}
        <div className="col-md-12 mx-3 d flex-column">
          <div className="input-group input-group-sm">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Search
              </span>
            </div>
            <input
              type="text"
              id="search"
              name="search"
              value={queryMain}
              onChange={(e) => handleSearchMain(e)}
              className="form-control form-control-sm"
              aria-label="Small"
              placeholder="Search for roles by name or id"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
          <div className="form-check mt-2 mb-3">
            <input onChange={includeInactiveHabdlerMain} className="form-check-input" type="checkbox" value="" id="inactive_codes" name="inactive_codes" />
            <label className="form-check-label" htmlFor="inactive_codes">
              Include inactive roles
            </label>
          </div>

          <div className="col-md-12 mt-3">
            <div className="card mb-4">
              <div className={`card-header text-dark`}>
                <i className="fas fa-box-open me-1"></i>
                Recently Opened
              </div>
              <div className="card-body">
                {/* <open recent table /> */}
                <table className="table table-hover table-sm mt-3 table-bordered caption-top">
                  <thead>
                    <tr className="bg-primary">
                      <th scope="col">Role #</th>
                      <th scope="col">Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userDataMain.map((role, i) => (
                      <tr
                        data-bs-toggle="modal"
                        onClick={() => showSpecificModel(role.id, role.name)}
                        key={i}
                      >
                        <td>{role.id}</td>
                        <td>{role.name}</td>
                        <td>
                          {role.deleted_at == null ? (
                            <span style={{ color: "#26859C" }}>Active</span>
                          ) : (
                            <span style={{ color: "black" }}>Inactive</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionRoles;
