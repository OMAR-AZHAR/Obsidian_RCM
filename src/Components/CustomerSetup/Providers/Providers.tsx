import { lazy, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
const ShowAllModel = lazy(() => import("./ShowAllModel"));
import useFetch from "../../../Hooks/useFetch";
import { useDispatch } from "react-redux";
import { getProviderIdfromTable } from "../../../Redux/features/Providers/EditableProviderSlice";
import { FaCheckCircle } from "react-icons/fa";
const Providers = () => {
  const navigate = useNavigate();
  const newprovider = useCallback(
    () => navigate("/newprovider", { replace: true }),
    [navigate]
  );

  const ToEditable = useCallback(
    // Goto User Editable form
    (id: any) => {
      navigate(`/newprovider/${id}`, { replace: true });
    },
    [navigate]
  );
  const [ShowInactive, setShowInactive] = useState(false);
  const { data: provide, loading } = useFetch("customersetup/provider");
  const [searchprovider, setSearchProvider] = useState("");
  const dispatch = useDispatch();
  return (
    <div className="my-4">
      <div className="row">
        <div className="col-md-2">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={newprovider}
          >
            <i className="fas fa-plus" />
            &nbsp;New Provider
          </button>
          <br />
          <button
            className="btn btn-outline-primary mt-2 mb-2 btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#showAllModel"
            disabled
          >
            <i className="fas fa-list-ul" />
            &nbsp;Show All
          </button>
          <br />
        </div>
        <ShowAllModel />
        <div className="col-md-10">
          <div className="col-md-8">
            <div className="input-group ">
              <input
                className="form-control form-control-sm w-50"
                type="search"
                maxLength={60}
                placeholder="Search for provider by name or ID"
                aria-label="NPI"
                id="search"
                name="search"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
                onChange={(e) => setSearchProvider(e.target.value?.toString())}
              />
              <button
                type="button"
                className="input-group-text btn-hov"
                id="searchbtn"
              >
                <i className="fas fa-search" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="form-check mt-2 mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="inactive_providers"
              name="inactive_providers"
              checked={ShowInactive}
              onChange={(e) => setShowInactive(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="inactive_providers">
              Include inactive providers
            </label>
          </div>

          <div className="col-xl-10">
            <div className="card mb-4">
              <div className={`card-header text-light`}>
                <i className="fas fa-box-open me-1" />
                Providers
              </div>
              <div className="card-body">
                {provide ? (
                  <table className="mb-0 table table-sm table-light table-hover table-striped table table-bordered caption-top">
                    <thead className="">
                      <tr>
                        <th>Provider Name</th>
                        <th>NPI</th>
                        <th>Seq#</th>

                        <th>Inactive</th>
                      </tr>
                    </thead>
                    <tbody>
                      {provide
                        ?.filter((item) => {
                          return searchprovider === ""
                            ? item
                            : item?.first_name
                                ?.toLowerCase()
                                .includes(searchprovider?.toLowerCase()) ||
                                item?.last_name
                                  ?.toLowerCase()
                                  .includes(searchprovider?.toLowerCase()) ||
                                item?.npi_code
                                  ?.toString()
                                  ?.toLowerCase()
                                  .includes(searchprovider?.toLowerCase()) ||
                                item?.sequence?.id
                                  ?.toString()
                                  ?.toLowerCase()
                                  .includes(searchprovider?.toLowerCase());
                        })
                        ?.map((prov, i) => {
                          return prov?.provider_status ? (
                            <tr
                              className="table-active facility-font"
                              key={i}
                              onClick={() => {
                                ToEditable(prov?.id);
                                dispatch(getProviderIdfromTable(prov?.id));
                                // window.location.reload();
                              }}
                            >
                              <td>
                                {prov?.last_name != null
                                  ? prov?.last_name + `, ` + prov?.first_name
                                  : prov?.organization_name}
                              </td>
                              <td>{prov?.npi_code}</td>
                              <td>{prov?.sequence?.id}</td>

                              <td className="text-center">
                                {prov?.provider_status === 0 ? (
                                  <FaCheckCircle
                                    style={{
                                      color: "black",

                                      fontSize: "1.2em",
                                    }}
                                  />
                                ) : (
                                  ""
                                )}
                              </td>
                            </tr>
                          ) : prov?.provider_status ===
                            Number(!ShowInactive) ? (
                            <tr
                              className="table-active facility-font"
                              key={i}
                              onClick={() => {
                                ToEditable(prov?.id);
                                dispatch(getProviderIdfromTable(prov?.id));
                                // window.location.reload();
                              }}
                            >
                              <td>
                                {prov?.last_name != null
                                  ? prov?.last_name + `, ` + prov?.first_name
                                  : prov?.organization_name}
                              </td>
                              <td>{prov?.npi_code}</td>
                              <td>{prov?.sequence?.id}</td>

                              <td className="text-center">
                                {prov?.provider_status === 0 ? (
                                  <FaCheckCircle
                                    style={{
                                      color: "black",

                                      fontSize: "1.2em",
                                    }}
                                  />
                                ) : (
                                  ""
                                )}
                              </td>
                            </tr>
                          ) : (
                            ""
                          );
                        })}
                    </tbody>
                  </table>
                ) : (
                  <span className="text-center fw-bold text-dark">
                    No Recent Providers
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Providers;
