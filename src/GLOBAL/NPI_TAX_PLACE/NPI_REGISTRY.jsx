import { useState } from "react";
// import { PatternFormat } from "react-number-format";
import useGet from "../../Hooks/useGet";
import { useDispatch } from "react-redux";
import { SetNPI } from "../../Redux/features/Global_Forms/NPISlice";
import { PatternFormat } from "react-number-format";
export default function NPI_REGISTRY_MODAL({ NPI_Facility_Value }) {
  const [individual_checked, setIndividualChecked] = useState(false);
  const [organization_checked, setOrgChecked] = useState(true);
  const [any_checked, setAnyChecked] = useState(false);
  const [search, setSearch] = useState("");
  const [citydata, setcitydata] = useState("");
  const [zipdata, setzipdata] = useState("");
  const dispatch = useDispatch();
  const { data: npicitydata, loading: loadnpicity } = useGet(
    `customersetup/practice/searchnpi?city=${citydata}`
  );

  const { data: npizipdata, loading: loadnpistate } = useGet(
    `customersetup/practice/searchnpi?city=${
      zipdata.match(/(?<!\d)\d{5}(?!\d)/gm) ||
      zipdata.match(/(?<!\d)\d{9}(?!\d)/gm)
        ? zipdata
        : ""
    }`
  );
  // const { data: npidata } = useGet(
  //   `customersetup/practice/searchnpi?city=FOSSTON`
  // );
  return (
    <>
      {/* ********************* 1st Modal Start (NPI Registry Input Fields) ********************* */}
      <div
        className="modal fade text-dark"
        id="NPIRegistryModaltrigger"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-hidden="true"
        aria-labelledby="NPIRegistryModaltrigger"
        tabindex={-1}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 fw-bold"
                id="exampleModalToggleLabel"
              >
                NPI Registry
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* ********* First Modal Input Fields ********* */}
              <div className="col-md-12 px-1">
                <>
                  <>
                    {/* ********* First Modal Radio Fields ********* */}
                    <div className="d-flex mb-2">
                      <div className="form-check me-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="selectnpitype"
                          id="npi_any"
                          onClick={() => {
                            setAnyChecked(true);
                            setOrgChecked(false);
                            setIndividualChecked(false);
                          }}
                        />
                        <label className="form-check-label" htmlFor="npi_any">
                          Any
                        </label>
                      </div>
                      <div className="form-check me-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="selectnpitype"
                          id="npi_individual"
                          // checked={individual_checked}
                          onClick={() => {
                            setAnyChecked(false);
                            setIndividualChecked(true);
                            setOrgChecked(false);
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="npi_individual"
                        >
                          Individual
                        </label>
                      </div>
                      <div className="form-check me-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="selectnpitype"
                          id="npi_org"
                          checked={organization_checked}
                          onClick={(e) => {
                            setAnyChecked(false);
                            setOrgChecked(true);
                            setIndividualChecked(false);
                          }}
                        />
                        <label className="form-check-label" htmlFor="npi_org">
                          Organization
                        </label>
                      </div>
                    </div>
                    {/* ********* First Modal Radio Fields End ********* */}
                    <input
                      className="form-control form-control-sm mb-3"
                      type="text"
                      placeholder="Individual First Name"
                      aria-label="First Name"
                      id="NPIfirstname"
                      name="NPIfirstname"
                      maxLength={40}
                      autoComplete="off"
                      autoCapitalize="characters"
                      autoCorrect="off"
                      spellCheck="false"
                      disabled={organization_checked}
                      onChange={(e) => setSearch(e.target.value)}
                      // value={values.NPIfirstname.replace(
                      //   /[^A-Za-z ]/gi,
                      //   ""
                      // ).toUpperCase()}
                      // onBlur={handleBlur}
                    />
                    <input
                      className="form-control form-control-sm mb-3"
                      type="text"
                      disabled={organization_checked}
                      placeholder="Individual Last Name"
                      aria-label="Last Name"
                      id="NPIlastname"
                      name="NPIlastname"
                      maxLength={40}
                      onChange={(e) => setSearch(e.target.value)}
                      // onChange={handleChange}
                      // onBlur={handleBlur}
                      // value={values.NPIlastname.replace(
                      //   /[^A-Za-z ]/gi,
                      //   ""
                      // ).toUpperCase()}
                    />
                  </>

                  <input
                    className="form-control form-control-sm"
                    type="text"
                    placeholder="Organization Name"
                    aria-label="Organization Name"
                    id="NPIorganizationname"
                    name="NPIorganizationname"
                    maxLength={60}
                    disabled={individual_checked}
                    onChange={(e) => setSearch(e.target.value)}
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={values.NPIorganizationname.toUpperCase()}
                  />

                  <input
                    className="form-control form-control-sm mb-3 mt-3"
                    type="text"
                    placeholder="Taxonomy Name"
                    aria-label="Taxonomy Name"
                    id="NPItaxonomyname"
                    name="NPItaxonomyname"
                    onChange={(e) => setSearch(e.target.value)}
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={values.NPItaxonomyname.toUpperCase()}
                    maxLength={10}
                  />
                  <div className="col-md-12 d-flex">
                    <div className="col-md-7">
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        placeholder="City"
                        aria-label="City"
                        id="NPIcity"
                        name="NPIcity"
                        maxLength={28}
                        onChange={(e) => setcitydata(e.target.value)}
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                        // value={values.NPIcity.toUpperCase()}
                        //   .replace(/[^A-Za-z ]/gi, "")
                      />
                    </div>
                    <div className="col-md-2 px-2">
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        placeholder="State"
                        aria-label="State"
                        id="NPIstate"
                        name="NPIstate"
                        onChange={(e) => setSearch(e.target.value)}
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                        // value={values.NPIstate.toUpperCase()}
                        maxLength={2}
                      />
                    </div>
                    <div className="col-md-3">
                      <PatternFormat
                        format="#########"
                        mask=""
                        className="form-control form-control-sm"
                        type="text"
                        placeholder="Zip Code"
                        aria-label="Zip Code"
                        id="NPIzipcode"
                        name="NPIzipcode"
                        onChange={(e) => setzipdata(e.target.value?.trim())}
                        maxLength={5}
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                        // value={values.NPIzipcode.toUpperCase()}
                      />
                    </div>
                  </div>
                </>
              </div>

              {/* ********* End First Modal Input Fields ********* */}
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-sm btn-outline-primary"
                data-bs-target="#exampleModalToggle2"
                data-bs-toggle="modal"
              >
                Search
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ********************* 1st Modal End (NPI Registry Input Fields) ********************* */}
      {/* ********************* 2nd Modal Start (NPI Registry Table) ********************* */}
      <div
        className="modal fade text-dark"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabindex={-1}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 fw-bold"
                id="exampleModalToggleLabel2"
              >
                NPI Registry
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body px-2 py-2">
              {/* ************************ NPI Data Table Start ************************ */}
              <div className="table-responsive" style={{ height: "300px" }}>
                {loadnpicity || loadnpistate ? (
                  "Loading..."
                ) : (
                  <table className="table table-light table-hover table-striped table table-bordered">
                    <thead>
                      <tr>
                        <th>NPI</th>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Primary Taxonomy</th>
                      </tr>
                    </thead>

                    <tbody>
                      <>
                        {any_checked ? (
                          <>
                            {npicitydata?.individual_data?.[3]
                              ?.filter((item) => {
                                return citydata === ""
                                  ? item
                                  : item?.[0]
                                      ?.toString()
                                      .toLowerCase()
                                      .includes(citydata?.toLowerCase()) ||
                                      item?.[1]
                                        ?.toString()
                                        .toLowerCase()
                                        .includes(citydata?.toLowerCase()) ||
                                      item?.[2]
                                        ?.toString()
                                        .toLowerCase()
                                        .includes(citydata?.toLowerCase()) ||
                                      item?.[3]
                                        ?.toString()
                                        .toLowerCase()
                                        .includes(citydata?.toLowerCase());
                              })
                              ?.map((pract, i) => {
                                return (
                                  <tr
                                    {...pract}
                                    className="table-active practice-font"
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      dispatch(SetNPI(pract?.[1]));
                                      NPI_Facility_Value(pract?.[1]);
                                    }}
                                  >
                                    <td>{pract?.[1]}</td>
                                    <td>Individual</td>
                                    <td>{pract?.[0]}</td>
                                    <td>{pract?.[3]}</td>
                                    <td>{pract?.[2]}</td>
                                  </tr>
                                );
                              }) ||
                              npizipdata?.individual_data?.[3]
                                ?.filter((item) => {
                                  return zipdata === ""
                                    ? item
                                    : item?.[0]
                                        ?.toString()
                                        .toLowerCase()
                                        .includes(zipdata?.toLowerCase()) ||
                                        item?.[1]
                                          ?.toString()
                                          .toLowerCase()
                                          .includes(zipdata?.toLowerCase()) ||
                                        item?.[2]
                                          ?.toString()
                                          .toLowerCase()
                                          .includes(zipdata?.toLowerCase()) ||
                                        item?.[3]
                                          ?.toString()
                                          .toLowerCase()
                                          .includes(zipdata?.toLowerCase());
                                })
                                ?.map((pract, i) => {
                                  return (
                                    <tr
                                      {...pract}
                                      data-bs-dismiss="modal"
                                      className="table-active practice-font"
                                      key={i}
                                      onClick={() => {
                                        dispatch(SetNPI(pract?.[1]));
                                        NPI_Facility_Value(pract?.[1]);
                                      }}
                                    >
                                      <td>{pract?.[1]}</td>
                                      <td>Individual</td>
                                      <td>{pract?.[0]}</td>
                                      <td>{pract?.[3]}</td>
                                      <td>{pract?.[2]}</td>
                                    </tr>
                                  );
                                })}
                            {/* // ORGANIZATION DATA */}
                            {npicitydata?.organization_data?.[3]
                              ?.filter((item) => {
                                return citydata === ""
                                  ? item
                                  : item?.[0]
                                      ?.toString()
                                      .toLowerCase()
                                      .includes(citydata?.toLowerCase()) ||
                                      item?.[1]
                                        ?.toString()
                                        .toLowerCase()
                                        .includes(citydata?.toLowerCase()) ||
                                      item?.[2]
                                        ?.toString()
                                        .toLowerCase()
                                        .includes(citydata?.toLowerCase()) ||
                                      item?.[3]
                                        ?.toString()
                                        .toLowerCase()
                                        .includes(citydata?.toLowerCase());
                              })
                              ?.map((pract, i) => {
                                return (
                                  <tr
                                    {...pract}
                                    className="table-active practice-font"
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      dispatch(SetNPI(pract?.[1]));
                                      NPI_Facility_Value(pract?.[1]);
                                    }}
                                  >
                                    <td>{pract?.[1]}</td>
                                    <td>Organization</td>
                                    <td>{pract?.[0]}</td>
                                    <td>{pract?.[3]}</td>
                                    <td>{pract?.[2]}</td>
                                  </tr>
                                );
                              }) ||
                              npizipdata?.organization_data?.[3]
                                ?.filter((item) => {
                                  return zipdata === ""
                                    ? item
                                    : item?.[0]
                                        ?.toString()
                                        .toLowerCase()
                                        .includes(zipdata?.toLowerCase()) ||
                                        item?.[1]
                                          ?.toString()
                                          .toLowerCase()
                                          .includes(zipdata?.toLowerCase()) ||
                                        item?.[2]
                                          ?.toString()
                                          .toLowerCase()
                                          .includes(zipdata?.toLowerCase()) ||
                                        item?.[3]
                                          ?.toString()
                                          .toLowerCase()
                                          .includes(zipdata?.toLowerCase());
                                })
                                ?.map((pract, i) => {
                                  return (
                                    <tr
                                      {...pract}
                                      data-bs-dismiss="modal"
                                      className="table-active practice-font"
                                      key={i}
                                      onClick={() => {
                                        dispatch(SetNPI(pract?.[1]));
                                        NPI_Facility_Value(pract?.[1]);
                                      }}
                                    >
                                      <td>{pract?.[1]}</td>
                                      <td>Organization</td>
                                      <td>{pract?.[0]}</td>
                                      <td>{pract?.[3]}</td>
                                      <td>{pract?.[2]}</td>
                                    </tr>
                                  );
                                })}
                          </>
                        ) : organization_checked ? (
                          <>
                            {/* // ORGANIZATION DATA */}
                            {npicitydata?.organization_data?.[3]
                              ?.filter((item) => {
                                return citydata === ""
                                  ? item
                                  : item?.[0]
                                      ?.toString()
                                      .toLowerCase()
                                      .includes(citydata?.toLowerCase()) ||
                                      item?.[1]
                                        ?.toString()
                                        .toLowerCase()
                                        .includes(citydata?.toLowerCase()) ||
                                      item?.[2]
                                        ?.toString()
                                        .toLowerCase()
                                        .includes(citydata?.toLowerCase()) ||
                                      item?.[3]
                                        ?.toString()
                                        .toLowerCase()
                                        .includes(citydata?.toLowerCase());
                              })
                              ?.map((pract, i) => {
                                return (
                                  <tr
                                    {...pract}
                                    className="table-active practice-font"
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      dispatch(SetNPI(pract?.[1]));
                                      NPI_Facility_Value(pract?.[1]);
                                    }}
                                  >
                                    <td>{pract?.[1]}</td>
                                    <td>Organization</td>
                                    <td>{pract?.[0]}</td>
                                    <td>{pract?.[3]}</td>
                                    <td>{pract?.[2]}</td>
                                  </tr>
                                );
                              }) ||
                              npizipdata?.organization_data?.[3]
                                ?.filter((item) => {
                                  return zipdata === ""
                                    ? item
                                    : item?.[0]
                                        ?.toString()
                                        .toLowerCase()
                                        .includes(zipdata?.toLowerCase()) ||
                                        item?.[1]
                                          ?.toString()
                                          .toLowerCase()
                                          .includes(zipdata?.toLowerCase()) ||
                                        item?.[2]
                                          ?.toString()
                                          .toLowerCase()
                                          .includes(zipdata?.toLowerCase()) ||
                                        item?.[3]
                                          ?.toString()
                                          .toLowerCase()
                                          .includes(zipdata?.toLowerCase());
                                })
                                ?.map((pract, i) => {
                                  return (
                                    <tr
                                      {...pract}
                                      data-bs-dismiss="modal"
                                      className="table-active practice-font"
                                      key={i}
                                      onClick={() => {
                                        dispatch(SetNPI(pract?.[1]));
                                        NPI_Facility_Value(pract?.[1]);
                                      }}
                                    >
                                      <td>{pract?.[1]}</td>
                                      <td>Organization</td>
                                      <td>{pract?.[0]}</td>
                                      <td>{pract?.[3]}</td>
                                      <td>{pract?.[2]}</td>
                                    </tr>
                                  );
                                })}
                          </>
                        ) : individual_checked ? (
                          <>
                            {npicitydata?.individual_data?.[3]
                              ?.filter((item) => {
                                return citydata === ""
                                  ? item
                                  : item?.[0]
                                      ?.toString()
                                      .toLowerCase()
                                      .includes(citydata?.toLowerCase()) ||
                                      item?.[1]
                                        ?.toString()
                                        .toLowerCase()
                                        .includes(citydata?.toLowerCase()) ||
                                      item?.[2]
                                        ?.toString()
                                        .toLowerCase()
                                        .includes(citydata?.toLowerCase()) ||
                                      item?.[3]
                                        ?.toString()
                                        .toLowerCase()
                                        .includes(citydata?.toLowerCase());
                              })
                              ?.map((pract, i) => {
                                return (
                                  <tr
                                    {...pract}
                                    className="table-active practice-font"
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      dispatch(SetNPI(pract?.[1]));
                                      NPI_Facility_Value(pract?.[1]);
                                    }}
                                  >
                                    <td>{pract?.[1]}</td>
                                    <td>Individual</td>
                                    <td>{pract?.[0]}</td>
                                    <td>{pract?.[3]}</td>
                                    <td>{pract?.[2]}</td>
                                  </tr>
                                );
                              }) ||
                              npizipdata?.individual_data?.[3]
                                ?.filter((item) => {
                                  return zipdata === ""
                                    ? item
                                    : item?.[0]
                                        ?.toString()
                                        .toLowerCase()
                                        .includes(zipdata?.toLowerCase()) ||
                                        item?.[1]
                                          ?.toString()
                                          .toLowerCase()
                                          .includes(zipdata?.toLowerCase()) ||
                                        item?.[2]
                                          ?.toString()
                                          .toLowerCase()
                                          .includes(zipdata?.toLowerCase()) ||
                                        item?.[3]
                                          ?.toString()
                                          .toLowerCase()
                                          .includes(zipdata?.toLowerCase());
                                })
                                ?.map((pract, i) => {
                                  return (
                                    <tr
                                      {...pract}
                                      data-bs-dismiss="modal"
                                      className="table-active practice-font"
                                      key={i}
                                      onClick={() => {
                                        dispatch(SetNPI(pract?.[1]));
                                        NPI_Facility_Value(pract?.[1]);
                                      }}
                                    >
                                      <td>{pract?.[1]}</td>
                                      <td>Individual</td>
                                      <td>{pract?.[0]}</td>
                                      <td>{pract?.[3]}</td>
                                      <td>{pract?.[2]}</td>
                                    </tr>
                                  );
                                })}
                          </>
                        ) : null}
                      </>
                    </tbody>
                  </table>
                )}
              </div>
              {/* ************************ NPI Data Table End ************************ */}
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-sm btn-outline-primary"
                data-bs-target="#NPIRegistryModaltrigger"
                data-bs-toggle="modal"
              >
                Back to Search
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ********************* 2nd Modal End (NPI Registry Table) ********************* */}
    </>
  );
}
