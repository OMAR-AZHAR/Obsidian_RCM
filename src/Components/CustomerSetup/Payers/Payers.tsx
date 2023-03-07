import { useFormik } from "formik";
import { lazy, useCallback, useState } from "react";
import { Table, Button, Modal as Mod } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FormVal } from "../Practices/FormValcustomerpractices";
const All_PayersModal = lazy(() => import("./All_PayersModal"));
import { useEffect } from "react";
import API from "../../../Api/ClientApi";
import Swal from "../../../GLOBAL/SwalAlert";
import useFetch from "../../../Hooks/useFetch";
import { FaCheckCircle } from "react-icons/fa";
const Payers = () => {
  const { data: payermodaldata } = useFetch("customersetup/payer");
  const [PayerSearch, setPayerSearch] = useState("");
  const navigate = useNavigate();
  // useEffect(() => {
  //   API.get("customersetup/payer")
  //     .then(function (response) {})
  //     .catch(function (error) {
  //       if (error.response.data.data == 403) {
  //         Swal.fire({
  //           icon: "error",
  //           imageHeight: 30,
  //           imageWidth: 30,
  //           title: "Sorry...",
  //           text: "Please contact your administrator to get Permissions!",
  //           confirmButtonColor: "#08619b",
  //         });
  //         navigate(-1);
  //       }
  //     });
  // }, []);
  const [ShowInactive, setShowInactive] = useState(false);
  const ToEditable = useCallback(
    // Goto User Editable form
    (id: any) => {
      navigate(`/editable-payers/${id}`, { replace: true });
    },
    [navigate]
  );
  // For All Payers Modal
  const [showAll_PayersModal, setShowAll_PayersModal] = useState(false);
  const closeAll_PayersModal = () => setShowAll_PayersModal(false);
  const initialValues = {
    practiceprintnum: "1",
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
  const [selectLabel, setPractice] = useState("Select");
  const newpractice = useCallback(
    () => navigate("/newpayers", { replace: true }),
    [navigate]
  );
  return (
    <div className="mt-4 mb-2 px-0">
      <div className="row">
        <div className="col-md-2">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={newpractice}
          >
            <i className="fas fa-plus" />
            &nbsp;New Payer
          </button>
          <br />
          {showAll_PayersModal && (
            <All_PayersModal
              closeAll_PayersModal={closeAll_PayersModal}
              showAll_PayersModal={showAll_PayersModal}
            />
          )}
          <button
            disabled
            onClick={(e) => setShowAll_PayersModal(true)}
            className="btn btn-outline-primary mt-2 mb-2 btn-sm"
          >
            <i className="fas fa-list-ul" />
            &nbsp;Show All
          </button>
          <br />
          <button
            disabled
            onClick={handleShow}
            className="btn btn-outline-primary btn-sm"
          >
            <i className="fas fa-print" />
            &nbsp;Print Labels
          </button>
          <Mod
            centered
            backdrop="static"
            keyboard={false}
            show={show}
            onHide={handleClose}
          >
            <Mod.Header closeButton>
              <span className="fs-16">Practice Label Search</span>
            </Mod.Header>
            <Mod.Body>
              <div className="container px-0">
                <div className="row">
                  <div className="col-md-12">
                    <label>{selectLabel}</label>
                    <select
                      // onClickCapture={handleselect}
                      defaultValue={"Practice"}
                      className="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                    >
                      <option value={" "} hidden>
                        Practice
                      </option>
                      <option value={""}>Select All</option>
                      <option value="2">
                        BLUEGRASS FAMILY MEDICINE {`&`} PEDIATRICS. (#10028750)
                      </option>
                    </select>
                  </div>
                  <div className=" d-flex align-items-center col-md-12 mt-2">
                    <label className="px-1">Print</label>{" "}
                    <div className="col-2">
                      <input
                        autoCapitalize="off"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                        type="number"
                        className="form-control"
                        // min="1"
                        id="practiceprintnum"
                        name="practiceprintnum"
                        value={values.practiceprintnum}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        min="1"
                      />
                    </div>
                    <label className="px-1">label per practice.</label>
                  </div>
                  <div className="col-md-12 d-flex">
                    {touched.practiceprintnum && errors.practiceprintnum ? (
                      <p className="form-error">{errors.practiceprintnum}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            </Mod.Body>
            <Mod.Footer>
              <Button variant="outline-primary btn-sm">Print</Button>
              <Button variant="outline-danger btn-sm" onClick={handleClose}>
                Cancel
              </Button>
            </Mod.Footer>
          </Mod>
        </div>
        <div className="col-md-10">
          <div className="col-md-7 col-sm-6 col-5">
            <div className="input-group">
              <button
                // onClick={(e) => setShowNPI_Registry(true)}
                type="button"
                className="input-group-text btn-hov"
                id="searchpayersbtn"
              >
                <i className="fas fa-search" aria-hidden="true" />
              </button>
              <input
                className="form-control form-control-sm"
                autoFocus
                maxLength={60}
                type="search"
                placeholder="Search by name,state, Payer ID, group name, or sequence #"
                aria-label="Search"
                id="searchpayers"
                onChange={(e) => setPayerSearch(e.target.value?.toString())}
              />
            </div>
          </div>
          <div className="form-check mt-2 mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="inactive-practices"
              checked={ShowInactive}
              onClick={(e) =>
                setShowInactive((e.target as HTMLInputElement).checked)
              }
            />
            <label className="form-check-label" htmlFor="inactive-practices">
              Show inactive practices
            </label>
          </div>

          <div className="col-xl-10">
            <div className="card mb-4">
              <div className="card-header text-light">
                <i className="fas fa-box-open me-1" />
                Payers
              </div>
              <div className="card-body">
                {payermodaldata ? (
                  <table className="mb-0 mt-0 my-0 table table-sm table-light table-hover table-striped table table-bordered mt-2">
                    <thead>
                      <tr>
                        <th>Payer Name</th>
                        <th>Payer Type</th>
                        <th>State</th>
                        <th>Seq#</th>
                        <th>Payer ID</th>
                        <th>Clearinghouse ID</th>
                        <th>Inactive</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payermodaldata
                        ?.filter((item) => {
                          return PayerSearch === ""
                            ? item
                            : item?.payer_name
                                ?.toString()
                                ?.toLowerCase()
                                ?.includes(PayerSearch?.toLowerCase()) ||
                                item?.payer_type?.payer_type
                                  ?.toString()
                                  ?.toLowerCase()
                                  ?.includes(PayerSearch?.toLowerCase()) ||
                                item?.state
                                  ?.toString()
                                  ?.toLowerCase()
                                  ?.includes(PayerSearch?.toLowerCase()) ||
                                item?.sequence?.id
                                  ?.toString()
                                  ?.toLowerCase()
                                  ?.includes(PayerSearch?.toLowerCase()) ||
                                item?.payer_id
                                  ?.toString()
                                  ?.toLowerCase()
                                  ?.includes(PayerSearch?.toLowerCase()) ||
                                item?.clearinghouseid
                                  ?.toString()
                                  ?.toLowerCase()
                                  ?.includes(PayerSearch?.toLowerCase());
                        })
                        ?.map((payer, i) => {
                          return !payer?.payer_status ? (
                            <tr
                              onClick={() => {
                                ToEditable(payer?.id);
                                // window.location.reload();
                              }}
                              key={i}
                              {...payer}
                              style={{ cursor: "pointer" }}
                            >
                              <td>{payer?.payer_name}</td>
                              <td>{payer?.payer_type?.payer_type}</td>
                              <td>{payer?.state}</td>
                              <td>{payer?.sequence?.id}</td>
                              <td>{payer?.payer_id}</td>
                              <td>{payer?.clearinghouseid}</td>
                              {/* {ShowInactive ? ( */}
                              <td className="text-center">
                                {payer?.payer_status === 1 ? (
                                  <FaCheckCircle
                                    style={{
                                      color: "black",
                                      // textShadow: "1px 1px 1px #ccc",
                                      fontSize: "1.2em",
                                      // marginLeft: "-3px",
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
                          ) : payer?.payer_status === Number(ShowInactive) ? (
                            <tr
                              onClick={() => {
                                ToEditable(payer?.id);
                                // window.location.reload();
                              }}
                              key={i}
                              {...payer}
                              style={{ cursor: "pointer" }}
                            >
                              <td>{payer?.payer_name}</td>
                              <td>{payer?.payer_type?.payer_type}</td>
                              <td>{payer?.state}</td>
                              <td>{payer?.sequence?.id}</td>
                              <td>{payer?.payer_id}</td>
                              <td>{payer?.clearinghouseid}</td>
                              {ShowInactive ? (
                                <td className="text-center">
                                  {payer?.payer_status === 1 ? (
                                    <FaCheckCircle
                                      style={{
                                        color: "black",
                                        // textShadow: "1px 1px 1px #ccc",
                                        fontSize: "1.2em",
                                        // marginLeft: "-3px",
                                      }}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </td>
                              ) : (
                                ""
                              )}
                            </tr>
                          ) : (
                            ""
                          );
                        })}
                    </tbody>
                  </table>
                ) : (
                  <span className="text-dark text-center fw-bold">
                    No Recent Payers
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
export default Payers;
