import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import API from "../../../Api/ClientApi";

const Claim = () => {
  const navigate = useNavigate();
  const [allclaims, setAllclaims] = useState([]);
  const [claimData, setclaimData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState("");
  const handleSearch = (event) => {
    const getSearch = event.target.value;
    if (getSearch.length > 0) {
      const searchData = allclaims.filter((items) =>
        items?.patient?.last_name.toLowerCase().includes(getSearch)
      );
      console.log("searched data", searchData);
      setAllclaims(searchData);
    } else {
      setAllclaims(filterData);
    }
    setQuery(getSearch);
  };
  // claim data from api
  useEffect(() => {
    const fetchAllClaims = async () => {
      let user = JSON.parse(sessionStorage.getItem("access"));
      let customerID = JSON.parse(sessionStorage.getItem("customer_id"));
      const response = await API.get("/claim", {
        headers: {
          Authorization: `Bearer ${user}`,
          customer_id: customerID,
        },
      });
      const newData = await response.data.data;
      setAllclaims(newData);
    };

    fetchAllClaims();
  }, []);
  return (
    <>
      <div className="row mt-3 d-flex flex-column">
        <div className="col-md-12 d-flex flex-row">
          <div className="col-md-3 d-flex flex-column">
            <div className="dropdown">
              <button
                type="button"
                onClick={() =>
                  navigate("/professionalClaim", { replace: true })
                }
                className="btn btn-outline-primary btn-sm col-md-9 dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="fas fa-plus mx-2"></span>
                Add Professional Claim
              </button>
              <ul className="dropdown-menu">
                <li>
                  <p className="dropdown-item">b</p>
                </li>
                <li>
                  <p className="dropdown-item">a</p>
                </li>
                <li>
                  <p className="dropdown-item">c</p>
                </li>
              </ul>
            </div>
            <div className="dropdown mt-2">
              <button
                type="button"
                onClick={() =>
                  navigate("/institutionalClaim", { replace: true })
                }
                className="btn btn-outline-primary btn-sm col-md-9 dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="fas fa-plus mx-2"></span>
                Add Institional Claim
              </button>
              <ul className="dropdown-menu">
                <li>
                  <p className="dropdown-item">b</p>
                </li>
                <li>
                  <p className="dropdown-item">a</p>
                </li>
                <li>
                  <p className="dropdown-item">c</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-7">
            <div className="col-md-12 d flex-column">
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
                  value={query}
                  onChange={(e) => handleSearch(e)}
                  className="form-control form-control-sm"
                  aria-label="Small"
                  placeholder="Search for roles by name or id"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </div>
              <div className="d-flex mt-1 align-items-center">
                <div className="form-check mt-2 mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="exact_matches_only"
                    name="exact_matches"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="exact_matches_only"
                  >
                    Show Exact Matches Only
                  </label>
                </div>
                <div className="form-check mt-2 mb-3  mx-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="unpaid_claims_only"
                    name="exact_matches"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="unpaid_claims_only"
                  >
                    Show Unpaid Claims Only
                  </label>
                </div>
                <div className="dropdown">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm col-md-12 mx-2 dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="fas fa-search mx-2"></span>
                    Find for UserName
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <p className="dropdown-item">Carlos Keneth</p>
                    </li>
                    <li>
                      <p className="dropdown-item">Lewnord</p>
                    </li>
                    <li>
                      <p className="dropdown-item">Jin</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 mt-2">
          <div className="card mb-4">
            <div className={`card-header text-light`}>
              <i className="fas fa-box-open me-1"></i>
              Recently Opened
            </div>
            <div className="card-body">
              {/* <open recent table /> */}
              <table className="table table-hover table-sm mt-3 table-bordered caption-top">
                <thead>
                  <tr className="bg-primary">
                    <th scope="col">Claim ID</th>
                    <th scope="col">Type</th>
                    <th>Patient</th>
                    <th>DOS</th>
                    <th>Total Charges</th>
                    <th>Balance</th>
                    <th>Status</th>
                    <th>Rendering</th>
                  </tr>
                </thead>
                <tbody>
                  {allclaims?.length == 0
                    ? "Please Wait!"
                    : allclaims?.map((claim, i) => (
                        <tr
                          data-bs-toggle="modal"
                          onClick={() =>
                            navigate(`/edit-professionalClaim/${claim?.id}`, {
                              replace: true,
                            })
                          }
                          key={i}
                        >
                          <td>{claim?.id}</td>
                          <td>{claim?.claim_type}</td>
                          <td>
                            {claim?.patient?.last_name +
                              " " +
                              " " +
                              claim?.patient?.first_name}
                          </td>
                          <td>
                            {claim?.claim_type === "i"
                              ? claim?.claim_charge?.dos
                              : claim?.claim_charge?.claim?.claim_charge?.dos}
                          </td>
                          <td>
                            {claim?.claim_charge?.units *
                              claim?.claim_charge?.unit_price}
                          </td>
                          <td>{"paymentdata"}</td>
                          <td>{claim?.claim_charge?.status}</td>
                          <td>
                            {claim?.renderring_provider?.last_name +
                              " " +
                              " " +
                              claim?.renderring_provider?.first_name +
                              "(" +
                              "# " +
                              claim?.renderring_provider?.sequence?.id +
                              ")"}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Claim;
