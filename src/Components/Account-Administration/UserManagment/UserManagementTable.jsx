import { getUserIdfromTabel } from "../../../Redux/features/UserManagement/EditUserSlice";
import { useDispatch } from "react-redux";

import useFetch from "../../../Hooks/useFetch";
import { useEffect, useState } from "react";
export default function UserManagementTable({ handleShowUser }) {
  const dispatch = useDispatch();
  const { data: users, loading } = useFetch("accountadmin/usermanagement");
  const [userData, setUserData] = useState([]);
  const [searchUsers, setsearchUsers] = useState("");
  //
  useEffect(() => {
    setUserData(users);
  }, [users]);
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState([]);

  // search on showAll table
  const handleSearch = (event) => {
    const getSearch = event.target.value;
    console.log("searc", getSearch);
    if (getSearch.length > 0) {
      const searchData = userData.filter((items) =>
        items.username.toLowerCase().includes(getSearch)
      );
      console.log("searched data", searchData);
      setUserData(searchData);
    } else {
      setUserData(filterData);
    }
    setQuery(getSearch);
  };
  return (
    <div className="col-md-12 col-sm-6 col-xs-3">
      <div className="col-md-8 col-sm-6 mb-2">
        <div className="d-flex ">
          <input
            className="form-control form-control-sm mx-1"
            type="search"
            name="search"
            onChange={(e) => {
              setsearchUsers(e.target.value?.toString());
              // handleSearch(e)
            }}
            placeholder="Search here"
            aria-label="Search"
            id="search"
          />
          <button className="btn btn-outline-primary btn-sm">
            <span className="fas fa-arrow-up"></span>
          </button>
          <button className="btn btn-outline-primary btn-sm">
            <span className="fas fa-arrow-down"></span>
          </button>
          <span className="text-nowrap align-content-center mx-1">
            <input
              className="form-check-input my-2 "
              type="checkbox"
              value=""
              id="includeDeleted"
            />

            <label
              htmlFor="includeDeleted"
              className="form-check-label mt-1 mx-1"
            >
              Deleted Users
            </label>
          </span>
        </div>
      </div>
      <div className="card mb-0 mt-2">
        <div className={`card-header text-light`}>User Management</div>
        {userData?.length ? (
          <div className="card-body">
            <table className="table table-sm table-hover table-striped table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Title</th>
                  <th scope="col">Type</th>
                  <th scope="col">Status</th>
                  {/* <th scope="col">Handle</th> */}
                </tr>
              </thead>

              <tbody className="table-group-divider">
                <>
                  {userData
                    ?.filter((item) => {
                      return searchUsers === ""
                        ? item
                        : item?.username
                            ?.toString()
                            .toLowerCase()
                            .includes(searchUsers?.toString()?.toLowerCase()) ||
                            item?.customer_name
                              ?.toString()
                              .toLowerCase()
                              .includes(
                                searchUsers?.toString().toLowerCase()
                              ) ||
                            item?.fullname
                              ?.toString()
                              .toLowerCase()
                              .includes(
                                searchUsers?.toString().toLowerCase()
                              ) ||
                            item?.title
                              ?.toString()
                              .toLowerCase()
                              .includes(searchUsers?.toString().toLowerCase());
                    })
                    ?.map((items, i) => {
                      return (
                        <tr
                          onClick={() => {
                            handleShowUser(
                              items?.username,
                              items?.customer_name,
                              items?.fullname,
                              items?.status,
                              // items.type,
                              items?.user_id
                            );
                            dispatch(getUserIdfromTabel(items?.user_id));
                          }}
                          key={i}
                          {...items}
                        >
                          <th scope="row">{items?.username}</th>

                          <td title={items?.customer_name}>
                            {items?.customer_name?.substring(0, 20) + "..."}
                          </td>
                          <td>{items?.fullname}</td>
                          <td>{items?.title}</td>
                          <td>{items?.type}</td>
                          <td>{items?.deleted_at ? "Suspended" : "Active"}</td>
                        </tr>
                      );
                    })}
                </>
              </tbody>
            </table>
          </div>
        ) : (
          <span className="text-dark text-center mt-4 mb-4">
            No Recent Users
          </span>
        )}
      </div>
    </div>
  );
}
