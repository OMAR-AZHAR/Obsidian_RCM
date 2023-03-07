import { useFormik } from "formik";
import { lazy, useCallback, useState } from "react";
// React-Bootstrap
import { Button, Modal as Mod, OverlayTrigger, Popover } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../Hooks/useFetch";

import { FormVal } from "../Practices/FormValcustomerpractices";

const ShowAllRefModel = lazy(() => import("./ShowAllRefModal"));
// const ReferringPrintModal = lazy(() => import("./ReferringPrintModal"));
import { useDispatch } from "react-redux";
import { getRefProviderIdfromTable } from "../../../Redux/features/ReferringProviderRedux/EditableRefProviderSlice";
import { FaCheckCircle } from "react-icons/fa";

const ReferringProviders = () => {
  const dispatch = useDispatch();
  const { data: recentreferringproviders, loading } = useFetch(
    "customersetup/referringprovider"
  );
  const [RefSearch, setRefSearch] = useState("");

  const initialValues = {
    referringprintnum: "1",
    selectpractice: "",
  };
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: FormVal,
      validateOnChange: true,
      validateOnBlur: true,
      // By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: (values, action) => {
        // to get rid of all the values after submitting the form
        action.resetForm();
      },
    });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showNPIRegistryModal, setShowNPIRegistryModal] = useState(false);
  const handleCloseNPIRegistryModal = () => setShow(false);
  const handleShowNPIRegistryModal = () => setShow(true);
  const navigate = useNavigate();
  const [selectLabel, setPractice] = useState("Select");
  const handleselect = () => {
    if (selectLabel === "Referring") {
      console.log("changed");
      setPractice("");
    } else {
      setPractice("Referring");
    }
  };
  const newreferring = useCallback(
    () => navigate("/newreferring", { replace: true }),
    [navigate]
  );
  const ToEditable = useCallback(
    // Goto User Editable form
    (id) => {
      navigate(`/editable-Refprovider/${id}`, { replace: true });
    },
    [navigate]
  );
  const [ShowInactive, setShowInactive] = useState(false);
  const popover = (
    <Popover id="referringpopover">
      <Popover.Body>
        <Button variant="light btn-sm mb-2" onClick={newreferring}>
          Add Manually
        </Button>{" "}
        <br />
        <Button
          disabled
          onClick={handleShowNPIRegistryModal}
          variant="light btn-sm"
        >
          Add via NPI Registry
        </Button>
      </Popover.Body>
    </Popover>
  );
  return (
    <div className="my-5 mx-2">
      <div className="row">
        <div className="col-md-2">
          {/* <OverlayTrigger trigger="focus" placement="right" overlay={popover}> */}
          <Button variant="outline-primary btn-sm" onClick={newreferring}>
            <i className="fas fa-plus"></i>&nbsp;New Referring
          </Button>
          {/* </OverlayTrigger> */}
          <br />
          <button
            className="btn btn-outline-primary mt-2 mb-2 btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#showAllReferringModel"
            disabled
          >
            <i className="fas fa-list-ul"></i>&nbsp;Show All
          </button>
          <br />
          <button
            disabled
            onClick={handleShow}
            data-bs-toggle="modal"
            data-bs-target="#showAllReferringPrintModel"
            className="btn btn-outline-primary btn-sm"
          >
            <i className="fas fa-print"></i>&nbsp;Print Labels
          </button>
          {/* Show All Referring Provider's Modal */}
          <ShowAllRefModel />
          {/* Show Referring Provider's Print Modal */}
          {/* <ReferringPrintModal /> */}
        </div>
        <div className="col-md-10">
          <div className="col-md-7">
            <div className="input-group ">
              <button
                type="button"
                className="input-group-text"
                id="ReferringSearchicon"
              >
                <i className="fas fa-search" aria-hidden="true"></i>
              </button>
              <input
                className="form-control ml-3 w-50"
                type="search"
                maxLength={60}
                placeholder="Search Referring by name, address, NPI, phone, or sequence #"
                aria-label="Search"
                onChange={(e) => setRefSearch(e.target.value?.toString())}
              />
            </div>
          </div>

          <div className="form-check mt-2 mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="inactive-referringproviders"
              checked={ShowInactive}
              onClick={(e) => setShowInactive(e.target.checked)}
            />
            <label
              className="form-check-label"
              htmlFor="inactive-referringproviders"
            >
              show inactive referring providers
            </label>
          </div>

          <div className="col-xl-10">
            <div className="card mb-4">
              <div className={`card-header text-light`}>
                <i className="fas fa-box-open me-1"></i>
                All Referring Providers
              </div>
              <div className="card-body text-center px-2 py-2 mb-0">
                {/* Table */}
                {recentreferringproviders ? (
                  <table className="mb-0 table table-sm table-light table-hover table-striped table table-bordered caption-top table-responsive">
                    <thead className="">
                      <tr>
                        <th>Name</th>

                        <th>Credentials</th>
                        <th>Seq#</th>
                        <th>NPI</th>
                        <th>Inactive</th>
                      </tr>
                    </thead>
                    {loading ? (
                      <span className="fw-bold text-center">Loading...</span>
                    ) : (
                      <tbody>
                        <>
                          {recentreferringproviders
                            ?.filter((item) => {
                              return RefSearch === ""
                                ? item
                                : item?.last_name
                                    ?.toString()
                                    ?.toLowerCase()
                                    ?.includes(RefSearch?.toLowerCase()) ||
                                    item?.first_name
                                      ?.toString()
                                      ?.toLowerCase()
                                      ?.includes(RefSearch?.toLowerCase()) ||
                                    item?.credentials
                                      ?.toString()
                                      ?.toLowerCase()
                                      ?.includes(RefSearch?.toLowerCase()) ||
                                    item?.sequence?.id
                                      ?.toString()
                                      ?.toLowerCase()
                                      ?.includes(RefSearch?.toLowerCase()) ||
                                    item?.npi_code
                                      ?.toString()
                                      ?.toLowerCase()
                                      ?.includes(RefSearch?.toLowerCase());
                            })
                            ?.map((ref, i) => {
                              return !ref?.rprovider_status ? (
                                <tr
                                  onClick={() => {
                                    ToEditable(ref?.id);
                                    dispatch(
                                      getRefProviderIdfromTable(ref?.id)
                                    );
                                    // window.location.reload();
                                  }}
                                  key={i}
                                  {...ref}
                                >
                                  <td>
                                    {ref?.last_name != null
                                      ? ref?.last_name + `, ` + ref?.first_name
                                      : ref?.organization_name}
                                  </td>

                                  <td>{ref?.credentials}</td>
                                  <td>{ref?.sequence?.id}</td>
                                  <td>{ref?.npi_code}</td>

                                  {/* {ShowInactive ? ( */}
                                  <td className="text-center">
                                    {ref?.rprovider_status === 1 ? (
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
                                  {/* ) : (
                                    ""
                                  )} */}
                                </tr>
                              ) : ref?.rprovider_status ===
                                Number(ShowInactive) ? (
                                <tr
                                  onClick={() => {
                                    ToEditable(ref?.id);
                                    dispatch(
                                      getRefProviderIdfromTable(ref?.id)
                                    );
                                    // window.location.reload();
                                  }}
                                  key={i}
                                  {...ref}
                                >
                                  <td>
                                    {ref?.last_name != null
                                      ? ref?.last_name + `, ` + ref?.first_name
                                      : ref?.organization_name}
                                  </td>

                                  <td>{ref?.credentials}</td>
                                  <td>{ref?.sequence?.id}</td>
                                  <td>{ref?.npi_code}</td>

                                  {/* {ShowInactive ? ( */}
                                  <td className="text-center">
                                    {ref?.rprovider_status === 1 ? (
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
                                  {/* ) : (
                                    ""
                                  )} */}
                                </tr>
                              ) : (
                                ""
                              );
                            })}
                        </>
                      </tbody>
                    )}
                  </table>
                ) : (
                  <span className="text-dark fw-bold text-center">
                    No Recent Referring Providers
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

export default ReferringProviders;
