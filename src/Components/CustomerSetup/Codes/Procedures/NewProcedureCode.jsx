import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { InputDecimal } from "react-input-decimal";
import { useNavigate } from "react-router";
import API from "../../../../Api/ClientApi";
import Swal from "../../../../GLOBAL/SwalAlert";
import { FormValNewProcedure } from "./FormValNewProcedure";
const NewProcedureCode = () => {
  const navigate = useNavigate();
  const closeNewForm = () => {
    navigate("/procedure", { replace: true });
  };
  const procedure = useSelector((state) => state.Codes.procedureCode);
  const description = useSelector((state) => state.Codes.description);
  const [procedureCode, setProcedureCode] = useState("");
  const [codeDescription, setCodeDescription] = useState("");
  const [sendRevCode, setSendRevCOde] = useState("");
  const [revenueCodes, setRevenueCodes] = useState([]);
  const [posCode, setPOSCodes] = useState([]);
  const [sendPOSCode, setSendPOSCodes] = useState("");
  const [tosCodes, setTOSCodes] = useState([]);
  const [sendTOSCode, setSendTOSCodes] = useState("");
  const [modifierOCde, setModifierCodes] = useState([]);
  const [sendModifer1Code, setSendModifer1Code] = useState("");
  const [sendModifier2Code, setSendModifer2Code] = useState("");
  const [sendModifer3Code, setSendModifer3Code] = useState("");
  const [sendModifier4Code, setSendModifer4Code] = useState("");
  const [displayModifer1Code, setDisplayModifer1Code] = useState("");
  const [displayModifier2Code, setDisplayModifer2Code] = useState("");
  const [displayModifer3Code, setDisplayModifer3Code] = useState("");
  const [displayModifier4Code, setDisplayModifer4Code] = useState("");

  useEffect(() => {
    setProcedureCode(procedure);
    setCodeDescription(description);
    // fetch revenue Code
    const fetchRevCode = async () => {
      const response = await API.get("common/function/revenue/code");
      const newData = response.data.data;
      setRevenueCodes(newData);
    };
    // fetch POS Code
    const fetchPOSCode = async () => {
      const response = await API.get("common/function/pos");
      const newData = response.data.data;
      setPOSCodes(newData);
    };
    // fetch TOS code
    const fetchTOSCode = async () => {
      const response = await API.get("common/function/tos");
      const newData = response.data.data;
      setTOSCodes(newData);
    };
    // fetch Modifier COdes
    const fetchModifier = async () => {
      const response = await API.get("common/function/modifiers");
      const newData = response.data.data;
      setModifierCodes(newData);
    };
    fetchRevCode();
    fetchPOSCode();
    fetchTOSCode();
    fetchModifier();
  }, [procedure, description]);
  // set rev code from model
  const getModelCode = (revCOde) => {
    setSendRevCOde(revCOde);
  };
  // set POS code from model
  const getPOSCode = (posCode) => {
    setSendPOSCodes(posCode);
  };
  // set TOS code from model
  const getTOSCode = (tosCode) => {
    setSendTOSCodes(tosCode);
  };
  // set modifier1 code from model
  const getGlobal1Code = (modifierId, modiferCode) => {
    setSendModifer1Code(modifierId);
    setDisplayModifer1Code(modiferCode);
  };
  // set modifier2 code from model
  const getGlobal2Code = (modifierId, modiferCode) => {
    setSendModifer2Code(modifierId);
    setDisplayModifer2Code(modiferCode);
  };
  // set modifier3 code from model
  const getGlobal3Code = (modifierId, modiferCode) => {
    setSendModifer3Code(modifierId);
    setDisplayModifer3Code(modiferCode);
  };
  // set modifier4 code from model
  const getGlobal4Code = (modifierId, modiferCode) => {
    setSendModifer4Code(modifierId);
    setDisplayModifer4Code(modiferCode);
  };
  // values from FORM states
  const [code, setCode] = useState("");
  const [type, settype] = useState("CPT/HCPCS");
  const [dept, setDept] = useState("");
  const [codeInactive, setCodeInactive] = useState(0);
  // toggleInactive Code
  const toggleMakeThisCodeInactive = () => {
    codeInactive === 0 ? setCodeInactive(1) : setCodeInactive(0);
  };
  const [procedureDescription, setProcedureDescription] = useState("");
  const [excludeCode, setExcludceCode] = useState(0);
  const [includeCode, setInccludceCode] = useState(0);
  const [codePercentage, setCodePercentage] = useState(0);
  const [defaultPrice, setDefaultPrice] = useState(0.0);
  const [defaultUnits, setDefaultUnits] = useState(0.0);
  const [defaultChargeStatus, setDefaultChargeStatus] = useState("");
  const [revenueCode, setRevenueCode] = useState("");
  const [posId, setPosId] = useState("");
  const [cliaNum, setCLiaNum] = useState("");
  const [tosId, setTosId] = useState("");
  const [narrativeNotes, setNarrativeNotes] = useState("");
  const [gloabl1, setGlobal1] = useState("");
  const [gloabl2, setGlobal2] = useState("");
  const [gloabl3, setGlobal3] = useState("");
  const [gloabl4, setGlobal4] = useState("");
  const [drugPrice, setDrugPrice] = useState(0.0);
  const [drugUnit, setDrugUnit] = useState(0.0);
  const [drugUnitMeasure, sedDrugUnitMeasure] = useState("");
  const [drugCode, setDrugCode] = useState("");
  const [drugCodeFormat, setDrugCodeFormat] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [globalPeriod, setGlobalPeriod] = useState("None");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [terminationDate, setTerminationDate] = useState("");
  const [printSuperbillCode, setPrintSuperbillCode] = useState(1);
  const [superBillDescription, setSuperBillDescription] = useState("");
  const [statementDescription, setStatementDescription] = useState("");

  // ===========================form data initial values and submit logiv===============================
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      excludeCode: "",
      includeCode: "",
      codePercentage: "",
      defaultPercentage: "",
      defaultPrice: "",
      defaultUnits: "",
      printSuperbillCode: "",
      code: "",
      type: "",
      dept: "",
      procedureDescription: "",
      defaultChargeStatus: "",
      revenueCode: "",
      posId: "",
      cliaNum: "",
      tosId: "",
      narrativeNotes: "",
      drugPrice: "",
      drugUnit: "",
      drugUnitMeasure: "",
      drugCode: "",
      drugCodeFormat: "",
      addDescription: "",
      globalPeriod: "",
      effectiveDate: "",
      terminationDate: "",
      // category:"",
      superBillDescription: "",
      statementDescription: "",
    },
    validationSchema: FormValNewProcedure,
    validateOnChange: true,
    validateOnBlur: true,
    // By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: (values, action) => {
      // values from hooks
      -API.post("customersetup/code/procedure/store", {
        code: code,
        type: type,
        dept: dept,
        codeInactive: codeInactive,
        procedureDescription: procedureDescription,
        excludeCode: excludeCode,
        includeCode: includeCode,
        codePercentage: codePercentage,
        defaultPrice: Number.parseFloat(defaultPrice),
        defaultUnits: Number.parseFloat(defaultUnits),
        defaultChargeStatus: defaultChargeStatus,
        revenueCode: sendRevCode,
        posId: sendPOSCode ? Number(sendPOSCode) : "",
        cliaNum: Number(cliaNum),
        tosId: sendTOSCode ? Number(sendTOSCode) : "",
        narrativeNotes: narrativeNotes,
        global1_ID: sendModifer1Code ? Number(sendModifer1Code) : "",
        global2_ID: sendModifier2Code ? Number(sendModifier2Code) : "",
        global3_ID: sendModifer3Code ? Number(sendModifer3Code) : "",
        global4_ID: sendModifier4Code ? Number(sendModifier4Code) : "",
        drugPrice: Number.parseFloat(drugPrice),
        drugUnit: Number.parseFloat(drugUnit),
        drugUnitMeasure: drugUnitMeasure,
        drugCode: drugCode,
        drugCodeFormat: drugCodeFormat,
        addDescription: addDescription,
        globalPeriod: globalPeriod,
        effectiveDate: effectiveDate,
        terminationDate: terminationDate,
        printSuperbillCode: printSuperbillCode,
        superBillDescription: superBillDescription,
        statementDescription: statementDescription,
      })
        .then(function (response) {
          if (response.data.status === 201) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/procedure", { replace: true });
            //  FormReset();
          } else if (response.data.status === 500) {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Some Error Occured",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })

        //reset form
        .catch((error) => {
          // if(error){
          //   (error)
          // }
        });
    },
  });
  const FormReset = () => {
    setCode("");
    settype("");
    setDept("");
    setCodeInactive(0);
    setProcedureDescription("");
    setExcludceCode(0);
    setInccludceCode(0);
    setCodePercentage(0);
    setDefaultPrice("");
    setDefaultUnits("");
    setDefaultChargeStatus("");
    setRevenueCode("");
    setPosId("");
    setCLiaNum("");
    setTosId("");
    setNarrativeNotes("");
    setGlobal1("");
    setGlobal2("");
    setGlobal3("");
    setGlobal4("");
    setDrugPrice("");
    setDrugUnit("");
    sedDrugUnitMeasure("");
    setDrugCode("");
    setDrugCodeFormat("");
    setAddDescription("");
    setGlobalPeriod("");
    setPrintSuperbillCode(0);
    setSuperBillDescription("");
    setStatementDescription("");
  };
  return (
    <div>
      <div className="row mt-4">
        <form onSubmit={handleSubmit} action="post">
          <div className="d-flex">
            {/* =====================main form============================= */}
            <div
              className="col-md-8"
              style={{
                overflowY: "scroll",
                height: "calc(100vh - 100px)",
                overflowX: "hidden",
              }}
            >
              <div className="">
                <h3 className="fw-bold mx-2">Procedure Codes</h3>
                <div className="d-flex">
                  <button
                    type="button"
                    onClick={closeNewForm}
                    className="btn btn-labeled btn-outline-danger btn-sm mb-4"
                  >
                    <span className="btn-label">
                      <i className="fa fa-times"></i>
                    </span>{" "}
                    close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-labeled btn-outline-primary btn-sm mb-4 mx-2"
                  >
                    <span className="btn-label">
                      <i className="fa fa-check"></i>
                    </span>{" "}
                    Save
                  </button>
                </div>
              </div>

              <div className="row g-2 d-flex align-items-center">
                <div className="col-md-3">
                  <label htmlFor="">Code</label>
                  <input
                    type="text"
                    className="form-control"
                    id="code"
                    autoComplete="off"
                    name="code"
                    required
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    onChange={(e) =>
                      setCode(e.target.value?.toString()?.trimStart())
                    }
                    maxLength={60}
                  />
                  {/* <div className="col-md-12">
                  {touched.practiceName && errors.practiceName ? (
                    <p className="form-error">*{errors.practiceName}</p>
                  ) : null}
                </div> */}
                </div>
                <div className="col-md-3">
                  <label htmlFor="">Type</label>
                  <select
                    id="type"
                    name="type"
                    onChange={(e) => settype(e.target.value)}
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected value="CPT/HCPCS">
                      CPT<span>&#174;</span> /HCPCS
                    </option>
                    <option value="Other Medical">Other Medical</option>
                    <option value="Retail">Retail</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label htmlFor="">Dept</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="dept"
                    autoComplete="off"
                    name="dept"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    onChange={(e) => setDept(e.target.value)}
                    maxLength={60}
                  />
                </div>
                <div className="col-md-3 d-flex mt-4">
                  <input
                    className="form-check-input fs-5"
                    type="checkbox"
                    value=""
                    onClick={toggleMakeThisCodeInactive}
                    id="makethisCodeInactive"
                  />
                  <label
                    className="form-check-label mx-1 mt-1"
                    htmlFor="makethisCodeInactive"
                  >
                    Make this code inactive
                  </label>
                </div>
              </div>
              <div className="row mt-2">
                <label htmlFor="descTextarea">Description</label>
                <div className="form-floating col-md-11">
                  <textarea
                    onChange={(e) => setProcedureDescription(e.target.value)}
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="description"
                  ></textarea>
                </div>
              </div>
              {/*======================== claim default details======================== */}
              <div className="col-xl-11 mt-2">
                <div className="card">
                  <div className="card-header">Claim Defaults</div>
                  <div className="card-body">
                    <div className="col-md-12 d-flex">
                      <input
                        onClick={() => setExcludceCode(1)}
                        className="form-check-input fs-5"
                        type="checkbox"
                        value=""
                        id="excludeCode"
                      />
                      <label
                        className="form-check-label mx-2 mt-1"
                        htmlFor="excludeCode"
                      >
                        Exclude this code from duplicate service checks
                      </label>
                    </div>
                    <div className="col-md-12 d-flex mt-2">
                      <input
                        onClick={() => setInccludceCode(1)}
                        className="form-check-input fs-5"
                        type="checkbox"
                        value=""
                        id="includeCode"
                      />
                      <label
                        className="form-check-label mx-2 mt-1"
                        htmlFor="includeCode"
                      >
                        This is an all inclusive code
                      </label>
                    </div>
                    <div className="col-md-12 d-flex mt-2">
                      <input
                        onClick={() => setCodePercentage(1)}
                        className="form-check-input fs-5"
                        type="checkbox"
                        value=""
                        id="codePercentage"
                      />
                      <label
                        className="form-check-label mx-2 mt-1"
                        htmlFor="codePercentage"
                      >
                        This code is a percentage of the claim total
                      </label>
                    </div>
                    <div className="d-flex align-items-center mt-3">
                      <div className="col-md-2">
                        <label htmlFor="">Default Price</label>
                        <InputDecimal
                          precision={2}
                          value={defaultPrice}
                          className="form-control form-control-sm"
                          id="defaultPrice"
                          autoComplete="off"
                          name="defaultPrice"
                          onChangeValue={(value) => {
                            setDefaultPrice(parseFloat(value)?.toFixed(2));
                          }}
                          style={{ textAlign: "right" }}
                        />
                      </div>
                      <div className="col-md-2 mx-2">
                        <label htmlFor="">Default Units</label>
                        <InputDecimal
                          precision={2}
                          value={defaultUnits}
                          className="form-control form-control-sm"
                          id="defaultUnit"
                          autoComplete="off"
                          name="defaultUnit"
                          onChangeValue={(value) => {
                            setDefaultUnits(parseFloat(value)?.toFixed(2));
                          }}
                          style={{ textAlign: "right" }}
                        />
                      </div>
                      <div className="col-md-7">
                        <label htmlFor="">Type</label>
                        <select
                          onChange={(e) =>
                            setDefaultChargeStatus(e.target.value)
                          }
                          id="defaultChargeStatus"
                          defaultValue={""}
                          className="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                        >
                          <option disabled value="">
                            Default Charge Status
                          </option>
                          <option value="Balance Due Patient">
                            Balance Due Patient
                          </option>
                          <option value="On Hold">On Hold</option>
                          <option value="Pending Patient">
                            Pending Patient
                          </option>
                          <option value="Pending Physician">
                            Pending Physician
                          </option>
                          <option value="Collection">Collection</option>
                          <option value="Paid">Paid</option>
                          <option value="Paid">Waiting For Review</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12 d-flex mt-3">
                      {/* ========================rev code model============================ */}
                      <div className="col-md-4">
                        <label htmlFor="">Revenue Code</label>
                        <div className="input-group">
                          <input
                            className={`form-control form-control-sm`}
                            type="number"
                            placeholder="Rev Code"
                            aria-label="rev_code"
                            value={sendRevCode.toString()}
                            onChange={(e) => setSendRevCOde(e.target.value)}
                            id="revenueCode"
                            name="revenueCode"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                            // value={
                            //   NPIvalue
                            //   // ?.replace(/[^0-9]/gi, "").trim()
                            // }
                            // onKeyUp={handleChange}
                            // onChange={(e) =>
                            //   SetNPIvalue(
                            //     e.target.value?.replace(/[^0-9]/gi, "").trim()
                            //   )
                            // }
                            // onBlur={handleBlur}
                          />
                          <button
                            type="button"
                            className="input-group-text btn-hov"
                            id="NPIbtn"
                            data-bs-toggle="modal"
                            data-bs-target="#revCodeModel"
                          >
                            <i className="fas fa-search" aria-hidden="true"></i>
                          </button>
                        </div>
                        {/* <div className="col-md-12">
                      {touched.npi_code && errors.npi_code ? (
                        <p className="form-error">*{errors.npi_code}</p>
                      ) : null}
                    </div> */}
                      </div>
                      {/* rev code model */}
                      <div
                        className="modal fade text-dark"
                        id="revCodeModel"
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                        aria-hidden="true"
                        aria-labelledby="revCodeModel"
                        // tabindex={-1}
                      >
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header"></div>
                            <div className="modal-body">
                              <div className="d-flex align-items-center">
                                <div className="col-md-9">
                                  <input
                                    type="text"
                                    id="search"
                                    name="search"
                                    // value={query}
                                    // onChange={(e) => handleSearch(e)}
                                    className="form-control"
                                    aria-label="Small"
                                    placeholder="Search for revenue code or description"
                                    aria-describedby="inputGroup-sizing-sm"
                                  />
                                </div>
                                <button
                                  type="button"
                                  data-bs-toggle="modal"
                                  data-bs-target="#staticBackdrop"
                                  className="btn btn-labeled btn-outline-primary btn-sm d-flex mx-2"
                                >
                                  <span className="btn-label">
                                    <i className="fas fa-bars mx-3"></i>
                                  </span>{" "}
                                  <span className="">Show All</span>
                                </button>
                              </div>
                              <div className="col-xl-12 mt-2">
                                <div className="card">
                                  <div className="card-header">
                                    <i className="fas fa-chair me-1"></i>
                                    Recently Opened
                                  </div>
                                  <div className="card-body">
                                    <table className="table table-hover table-sm mt-3 table-bordered caption-top">
                                      <thead>
                                        <tr className="bg-primary">
                                          <th scope="col">Code</th>
                                          <th scope="col">Descripton</th>
                                          <th>Price</th>
                                          <th>Inactive</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {revenueCodes?.map((role, i) => (
                                          <tr
                                            data-bs-toggle="modal"
                                            onClick={() =>
                                              getModelCode(role?.id)
                                            }
                                            key={i}
                                          >
                                            <td>{role?.id}</td>
                                            <td>{role?.description}</td>
                                            <td>{role?.price}</td>
                                            <td>
                                              {role?.deleted_at == null ? (
                                                <span
                                                  style={{ color: "#26859C" }}
                                                >
                                                  Active
                                                </span>
                                              ) : (
                                                <span
                                                  style={{ color: "black" }}
                                                >
                                                  Inactive
                                                </span>
                                              )}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-outline-primary"
                                      data-bs-target="#exampleModalToggle2"
                                      data-bs-toggle="modal"
                                    >
                                      Search
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mx-2">
                        <label htmlFor="">Place of Service</label>
                        <div className="input-group">
                          <input
                            className={`form-control form-control-sm`}
                            type="number"
                            onChange={(e) => setSendPOSCodes(e.target.value)}
                            value={sendPOSCode.toString()}
                            placeholder="Place of Service"
                            aria-label="placeofService"
                            id="posId"
                            name="posId"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                            // value={
                            //   NPIvalue
                            //   // ?.replace(/[^0-9]/gi, "").trim()
                            // }
                            // onKeyUp={handleChange}
                            // onChange={(e) =>
                            //   SetNPIvalue(
                            //     e.target.value?.replace(/[^0-9]/gi, "").trim()
                            //   )
                            // }
                            // onBlur={handleBlur}
                          />
                          <button
                            type="button"
                            className="input-group-text btn-hov"
                            id="NPIbtn"
                            data-bs-toggle="modal"
                            data-bs-target="#placeofServiceModel"
                          >
                            <i className="fas fa-search" aria-hidden="true"></i>
                          </button>
                        </div>
                        {/* <div className="col-md-12">
                      {touched.npi_code && errors.npi_code ? (
                        <p className="form-error">*{errors.npi_code}</p>
                      ) : null}
                    </div> */}
                      </div>
                      {/*==================== Place of service model ===============================*/}
                      {/* place of service model */}
                      <div
                        className="modal fade text-dark"
                        id="placeofServiceModel"
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                        aria-hidden="true"
                        aria-labelledby="placeofServiceModel"
                        // tabindex={-1}
                      >
                        <div className="modal-dialog modal-md modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5>All POS Code</h5>
                            </div>
                            <div className="modal-body">
                              <div className="input-group input-group-sm">
                                <input
                                  type="text"
                                  id="search"
                                  name="search"
                                  // value={query}
                                  // onChange={(e) => handleSearch(e)}
                                  className="form-control w-25"
                                  aria-label="Small"
                                  placeholder="Search for roles"
                                  aria-describedby="inputGroup-sizing-sm"
                                />
                              </div>

                              <table className="table table-hover table-sm mt-3 table-bordered caption-top">
                                <thead>
                                  <tr className="bg-primary">
                                    <th scope="col">Code</th>
                                    <th scope="col">Description</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {posCode?.map((role, i) => (
                                    <tr
                                      data-bs-toggle="modal"
                                      onClick={() => getPOSCode(role?.id)}
                                      key={i}
                                    >
                                      <td>{role?.id}</td>
                                      <td>{role?.description}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <div className="modal-footer">
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
                    <div className="col-md-12 d-flex mt-3 align-items-center">
                      <div className="col-md-4">
                        <label htmlFor="">CLIA Number</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          id="cliaNum"
                          onChange={(e) => setCLiaNum(e.target.value)}
                          autoComplete="off"
                          name="cliaNum"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          //   value={values.practiceName
                          //     .replace(/[^A-Za-z ]/gi, "")
                          //     .trimStart()
                          //     .toUpperCase()}
                          //   onChange={handleChange}
                          //   onBlur={handleBlur}
                          maxLength={60}
                        />
                      </div>
                      {/* Type of service model */}
                      <div className="col-md-4 mt-4 mx-2">
                        <div className="input-group">
                          <input
                            className={`form-control form-control-sm`}
                            type="number"
                            value={sendTOSCode.toString()}
                            onChange={(e) => setSendTOSCodes(e.target.value)}
                            placeholder="Type of Service"
                            aria-label="typeOfService"
                            id="tosId"
                            name="tosId"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                            // value={
                            //   NPIvalue
                            //   // ?.replace(/[^0-9]/gi, "").trim()
                            // }
                            // onKeyUp={handleChange}
                            // onChange={(e) =>
                            //   SetNPIvalue(
                            //     e.target.value?.replace(/[^0-9]/gi, "").trim()
                            //   )
                            // }
                            // onBlur={handleBlur}
                          />
                          <button
                            type="button"
                            className="input-group-text btn-hov"
                            id="NPIbtn"
                            data-bs-toggle="modal"
                            data-bs-target="#typeOfServicemodel"
                          >
                            <i className="fas fa-search" aria-hidden="true"></i>
                          </button>
                        </div>
                        {/* <div className="col-md-12">
                      {touched.npi_code && errors.npi_code ? (
                        <p className="form-error">*{errors.npi_code}</p>
                      ) : null}
                    </div> */}
                      </div>
                      {/* Type of service model */}
                      <div
                        className="modal fade text-dark"
                        id="typeOfServicemodel"
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                        aria-hidden="true"
                        aria-labelledby="typeOfServicemodel"
                        // tabindex={-1}
                      >
                        <div className="modal-dialog modal-md modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5>All TOS Code</h5>
                            </div>
                            <div className="modal-body">
                              <div className="input-group input-group-sm">
                                <input
                                  type="text"
                                  id="search"
                                  name="search"
                                  // value={query}
                                  // onChange={(e) => handleSearch(e)}
                                  className="form-control w-25"
                                  aria-label="Small"
                                  placeholder="Search for TOS codes"
                                  aria-describedby="inputGroup-sizing-sm"
                                />
                              </div>

                              <table className="table table-hover table-sm mt-3 table-bordered caption-top">
                                <thead>
                                  <tr className="bg-primary">
                                    <th scope="col">Code</th>
                                    <th scope="col">Description</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {tosCodes.map((role, i) => (
                                    <tr
                                      data-bs-toggle="modal"
                                      onClick={() => getTOSCode(role?.tos_code)}
                                      key={i}
                                    >
                                      <td>{role?.tos_code}</td>
                                      <td>{role?.tos_description}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <div className="modal-footer">
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
                    <div className="col-md-12 d-flex mt-3 align-items-center">
                      <div className="col-md-12">
                        <label htmlFor="">Narratie Notes</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="narrativeNotes"
                          onChange={(e) => setNarrativeNotes(e.target.value)}
                          placeholder="Narratie Notes"
                          autoComplete="off"
                          name="narrativeNotes"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          //   value={values.practiceName
                          //     .replace(/[^A-Za-z ]/gi, "")
                          //     .trimStart()
                          //     .toUpperCase()}
                          //   onChange={handleChange}
                          //   onBlur={handleBlur}
                          maxLength={60}
                        />
                      </div>
                    </div>
                    {/*================== modifiers(Global & Stiuational)===================== */}
                    <div className="col-xl-12 mt-3">
                      <div className="card mb-2">
                        <div className="card-header">
                          Modifiers (Global & Situational)
                        </div>
                        <div className="card-body ">
                          <div className="col-md-12 d-flex">
                            {/*===================== global 1 model=================== */}
                            <div className="">
                              <div className="input-group">
                                <input
                                  className={`form-control form-control-sm`}
                                  type="text"
                                  placeholder="Global 1"
                                  aria-label="Global1"
                                  id="Global1e"
                                  value={displayModifer1Code.toString()}
                                  // onChange={(e) => setSendModifer1Code(e.target.value)}
                                  name="Global1"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  maxLength={10}
                                  minLength={10}
                                  // value={
                                  //   NPIvalue
                                  //   // ?.replace(/[^0-9]/gi, "").trim()
                                  // }
                                  // onKeyUp={handleChange}
                                  // onChange={(e) =>
                                  //   SetNPIvalue(
                                  //     e.target.value?.replace(/[^0-9]/gi, "").trim()
                                  //   )
                                  // }
                                  // onBlur={handleBlur}
                                />
                                <button
                                  type="button"
                                  className="input-group-text btn-hov"
                                  id="NPIbtn"
                                  data-bs-toggle="modal"
                                  data-bs-target="#global1Model"
                                >
                                  <i
                                    className="fas fa-search"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                              </div>
                              {/* <div className="col-md-12">
                      {touched.npi_code && errors.npi_code ? (
                        <p className="form-error">*{errors.npi_code}</p>
                      ) : null}
                    </div> */}
                            </div>
                            {/* global 1 model */}
                            <div
                              className="modal fade text-dark"
                              id="global1Model"
                              data-bs-backdrop="static"
                              data-bs-keyboard="false"
                              aria-hidden="true"
                              aria-labelledby="global1Model"
                              // tabindex={-1}
                            >
                              <div className="modal-dialog modal-md modal-dialog-centered">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5>All Modifiers</h5>
                                  </div>
                                  <div className="modal-body">
                                    <div className="input-group input-group-sm">
                                      <input
                                        type="text"
                                        id="search"
                                        name="search"
                                        // value={query}
                                        // onChange={(e) => handleSearch(e)}
                                        className="form-control w-25"
                                        aria-label="Small"
                                        placeholder="Search for modifiers"
                                        aria-describedby="inputGroup-sizing-sm"
                                      />
                                    </div>

                                    <table className="table table-hover table-sm mt-3 table-bordered caption-top">
                                      <thead>
                                        <tr className="bg-primary">
                                          <th scope="col">Code</th>
                                          <th scope="col">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {modifierOCde.map((global, i) => (
                                          <tr
                                            data-bs-toggle="modal"
                                            onClick={() =>
                                              getGlobal1Code(
                                                global?.id,
                                                global.modifier_code
                                              )
                                            }
                                            key={i}
                                          >
                                            <td>{global?.modifier_code}</td>
                                            <td>
                                              {global?.modifier_description}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="modal-footer">
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
                            {/*===================== global 2 model=================== */}
                            <div className=" mx-2">
                              <div className="input-group">
                                <input
                                  className={`form-control form-control-sm`}
                                  type="text"
                                  placeholder="Global 2"
                                  onChange={(e) => setGlobal2(e.target.value)}
                                  aria-label="Global2"
                                  id="Global2"
                                  name="Global2"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  value={displayModifier2Code.toString()}
                                  maxLength={10}
                                  minLength={10}
                                  // value={
                                  //   NPIvalue
                                  //   // ?.replace(/[^0-9]/gi, "").trim()
                                  // }
                                  // onKeyUp={handleChange}
                                  // onChange={(e) =>
                                  //   SetNPIvalue(
                                  //     e.target.value?.replace(/[^0-9]/gi, "").trim()
                                  //   )
                                  // }
                                  // onBlur={handleBlur}
                                />
                                <button
                                  type="button"
                                  className="input-group-text btn-hov"
                                  id="NPIbtn"
                                  data-bs-toggle="modal"
                                  data-bs-target="#global2Model"
                                >
                                  <i
                                    className="fas fa-search"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                              </div>
                              {/* <div className="col-md-12">
                      {touched.npi_code && errors.npi_code ? (
                        <p className="form-error">*{errors.npi_code}</p>
                      ) : null}
                    </div> */}
                            </div>
                            <div
                              className="modal fade text-dark"
                              id="global2Model"
                              data-bs-backdrop="static"
                              data-bs-keyboard="false"
                              aria-hidden="true"
                              aria-labelledby="global1Model"
                              // tabindex={-1}
                            >
                              <div className="modal-dialog modal-md modal-dialog-centered">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5>All Modifiers</h5>
                                  </div>
                                  <div className="modal-body">
                                    <div className="input-group input-group-sm">
                                      <input
                                        type="text"
                                        id="search"
                                        name="search"
                                        // value={query}
                                        // onChange={(e) => handleSearch(e)}
                                        className="form-control w-25"
                                        aria-label="Small"
                                        placeholder="Search for modifiers"
                                        aria-describedby="inputGroup-sizing-sm"
                                      />
                                    </div>

                                    <table className="table table-hover table-sm mt-3 table-bordered caption-top">
                                      <thead>
                                        <tr className="bg-primary">
                                          <th scope="col">Code</th>
                                          <th scope="col">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {modifierOCde.map((global, i) => (
                                          <tr
                                            data-bs-toggle="modal"
                                            onClick={() =>
                                              getGlobal2Code(
                                                global?.id,
                                                global.modifier_code
                                              )
                                            }
                                            key={i}
                                          >
                                            <td>{global?.modifier_code}</td>
                                            <td>
                                              {global?.modifier_description}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="modal-footer">
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
                            {/*===================== global 3 model=================== */}
                            <div className=" mx-2">
                              <div className="input-group">
                                <input
                                  className={`form-control form-control-sm`}
                                  type="text"
                                  // onChange={(e) => setGlobal3(e.target.value)}
                                  placeholder="Global 3"
                                  aria-label="Global3"
                                  id="Global3"
                                  name="Global3"
                                  value={displayModifer3Code?.toString()}
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  maxLength={10}
                                  minLength={10}
                                  // value={
                                  //   NPIvalue
                                  //   // ?.replace(/[^0-9]/gi, "").trim()
                                  // }
                                  // onKeyUp={handleChange}
                                  // onChange={(e) =>
                                  //   SetNPIvalue(
                                  //     e.target.value?.replace(/[^0-9]/gi, "").trim()
                                  //   )
                                  // }
                                  // onBlur={handleBlur}
                                />
                                <button
                                  type="button"
                                  className="input-group-text btn-hov"
                                  id="NPIbtn"
                                  data-bs-toggle="modal"
                                  data-bs-target="#global3Model"
                                >
                                  <i
                                    className="fas fa-search"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                              </div>
                              {/* <div className="col-md-12">
                      {touched.npi_code && errors.npi_code ? (
                        <p className="form-error">*{errors.npi_code}</p>
                      ) : null}
                    </div> */}
                            </div>
                            <div
                              className="modal fade text-dark"
                              id="global3Model"
                              data-bs-backdrop="static"
                              data-bs-keyboard="false"
                              aria-hidden="true"
                              aria-labelledby="global3Model"
                              // tabindex={-1}
                            >
                              <div className="modal-dialog modal-md modal-dialog-centered">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5>All Modifiers</h5>
                                  </div>
                                  <div className="modal-body">
                                    <div className="input-group input-group-sm">
                                      <input
                                        type="text"
                                        id="search"
                                        name="search"
                                        // value={query}
                                        // onChange={(e) => handleSearch(e)}
                                        className="form-control w-25"
                                        aria-label="Small"
                                        placeholder="Search for modifiers"
                                        aria-describedby="inputGroup-sizing-sm"
                                      />
                                    </div>

                                    <table className="table table-hover table-sm mt-3 table-bordered caption-top">
                                      <thead>
                                        <tr className="bg-primary">
                                          <th scope="col">Code</th>
                                          <th scope="col">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {modifierOCde.map((global, i) => (
                                          <tr
                                            data-bs-toggle="modal"
                                            onClick={() =>
                                              getGlobal3Code(
                                                global?.id,
                                                global?.modifier_code
                                              )
                                            }
                                            key={i}
                                          >
                                            <td>{global?.modifier_code}</td>
                                            <td>
                                              {global?.modifier_description}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="modal-footer">
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
                            {/*===================== global 4 model=================== */}
                            <div className="mx-2">
                              <div className="input-group">
                                <input
                                  className={`form-control form-control-sm`}
                                  type="text"
                                  // onChange={(e) => setGlobal4(e.target.value)}
                                  placeholder="Global 3"
                                  aria-label="Global3"
                                  id="Global3"
                                  name="Global3"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  maxLength={10}
                                  minLength={10}
                                  value={displayModifier4Code.toString()}
                                  //   NPIvalue
                                  //   // ?.replace(/[^0-9]/gi, "").trim()
                                  // }
                                  // onKeyUp={handleChange}
                                  // onChange={(e) =>
                                  //   SetNPIvalue(
                                  //     e.target.value?.replace(/[^0-9]/gi, "").trim()
                                  //   )
                                  // }
                                  // onBlur={handleBlur}
                                />
                                <button
                                  type="button"
                                  className="input-group-text btn-hov"
                                  id="NPIbtn"
                                  data-bs-toggle="modal"
                                  data-bs-target="#global4Model"
                                >
                                  <i
                                    className="fas fa-search"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                              </div>
                              {/* <div className="col-md-12">
                      {touched.npi_code && errors.npi_code ? (
                        <p className="form-error">*{errors.npi_code}</p>
                      ) : null}
                    </div> */}
                            </div>
                            <div
                              className="modal fade text-dark"
                              id="global4Model"
                              data-bs-backdrop="static"
                              data-bs-keyboard="false"
                              aria-hidden="true"
                              aria-labelledby="global4Model"
                              // tabindex={-1}
                            >
                              <div className="modal-dialog modal-md modal-dialog-centered">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5>All Modifiers</h5>
                                  </div>
                                  <div className="modal-body">
                                    <div className="input-group input-group-sm">
                                      <input
                                        type="text"
                                        id="search"
                                        name="search"
                                        // value={query}
                                        // onChange={(e) => handleSearch(e)}
                                        className="form-control w-25"
                                        aria-label="Small"
                                        placeholder="Search for modifiers"
                                        aria-describedby="inputGroup-sizing-sm"
                                      />
                                    </div>

                                    <table className="table table-hover table-sm mt-3 table-bordered caption-top">
                                      <thead>
                                        <tr className="bg-primary">
                                          <th scope="col">Code</th>
                                          <th scope="col">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {modifierOCde.map((global, i) => (
                                          <tr
                                            data-bs-toggle="modal"
                                            onClick={() =>
                                              getGlobal4Code(
                                                global?.id,
                                                global?.modifier_code
                                              )
                                            }
                                            key={i}
                                          >
                                            <td>{global?.modifier_code}</td>
                                            <td>
                                              {global?.modifier_description}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="modal-footer">
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
                        </div>
                      </div>
                    </div>
                    {/*================== Drug Information===================== */}
                    <div className="col-xl-12 mt-3">
                      <div className="card mb-2">
                        <div className="card-header">Drug Information</div>
                        <div className="card-body ">
                          <div className="col-md-12 d-flex">
                            <div className="d-flex align-items-center mt-3">
                              <div className="col-md-3">
                                <label htmlFor="">Drug Price</label>
                                <InputDecimal
                                  precision={2}
                                  value={drugPrice}
                                  className="form-control form-control-sm"
                                  id="drugPrice"
                                  autoComplete="off"
                                  name="drugPrice"
                                  onChangeValue={(value) => {
                                    setDrugPrice(parseFloat(value)?.toFixed(2));
                                  }}
                                  style={{ textAlign: "right" }}
                                />
                              </div>
                              <div className="col-md-3 mx-2">
                                <label htmlFor="">Drug Units</label>
                                <InputDecimal
                                  precision={2}
                                  value={drugUnit}
                                  className="form-control form-control-sm"
                                  id="drugUnit"
                                  autoComplete="off"
                                  name="drugUnit"
                                  onChangeValue={(value) => {
                                    setDrugUnit(parseFloat(value)?.toFixed(2));
                                  }}
                                  style={{ textAlign: "right" }}
                                />
                              </div>
                              <div className="col-md-6 mt-3">
                                <select
                                  onChange={(e) =>
                                    sedDrugUnitMeasure(e.target.value)
                                  }
                                  defaultValue={""}
                                  id="drugUnitMeasure"
                                  className="form-select form-select-sm mt-1"
                                  aria-label=".form-select-sm example"
                                >
                                  <option disabled value="">
                                    Drugs Units Measure
                                  </option>
                                  <option value="Units(UN)">Units(UN)</option>
                                  <option value="Gram(GR)">Gram(GR)</option>
                                  <option value="Milliliter(ML)">
                                    Milliliter(ML)
                                  </option>
                                  <option value="International(F2)">
                                    International(F2)
                                  </option>
                                  <option value="Milligram(ME)">
                                    Milligram(ME)
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 d-flex">
                            <div className="d-flex align-items-center mt-3">
                              <div className="col-md-3">
                                <input
                                  type="number"
                                  className="form-control form-control-sm"
                                  id="drugCode"
                                  onChange={(e) => setDrugCode(e.target.value)}
                                  autoComplete="off"
                                  placeholder="Drug Code"
                                  name="drugCode"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  //   value={values.practiceName
                                  //     .replace(/[^A-Za-z ]/gi, "")
                                  //     .trimStart()
                                  //     .toUpperCase()}
                                  //   onChange={handleChange}
                                  //   onBlur={handleBlur}
                                  maxLength={60}
                                />
                                {/* <div className="col-md-12">
                  {touched.practiceName && errors.practiceName ? (
                    <p className="form-error">*{errors.practiceName}</p>
                  ) : null}
                </div> */}
                              </div>
                              <div className="col-md-8 mx-2">
                                <select
                                  onChange={(e) =>
                                    setDrugCodeFormat(e.target.value)
                                  }
                                  defaultValue={""}
                                  id="drugCodeFormat"
                                  className="form-select form-select-sm"
                                  aria-label=".form-select-sm example"
                                >
                                  <option disabled value="">
                                    Drugs Code Formate
                                  </option>
                                  <option value="4-4-2">4-4-2</option>
                                  <option value="5-3-2">5-3-2</option>
                                  <option value="5-4-1">5-4-1</option>
                                  <option value="5-4-2">5-4-2</option>
                                  <option value="EAN/UCC-13">EAN/UCC-13</option>
                                  <option value="EAN/UCC-8">EAN/UCC-8</option>
                                  <option value="HIBC Supplier Labeling Standard Primary Data Message">
                                    HIBC Supplier Labeling Standard Primary Data
                                    Message
                                  </option>
                                  <option value="Custome Order Number">
                                    Custome Order Number
                                  </option>
                                  <option value="GTIN 14-digit Data Structure">
                                    GTIN 14-digit Data Structure
                                  </option>
                                  <option value="UCC-12">UCC-12</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 mt-3">
                      <label htmlFor="">Additional Decription</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="addDescription"
                        onChange={(e) => setAddDescription(e.target.value)}
                        autoComplete="off"
                        placeholder="Additional Decription (for non-specific codes)"
                        name="addDescription"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        //   value={values.practiceName
                        //     .replace(/[^A-Za-z ]/gi, "")
                        //     .trimStart()
                        //     .toUpperCase()}
                        //   onChange={handleChange}
                        //   onBlur={handleBlur}
                        maxLength={60}
                      />
                      {/* <div className="col-md-12">
                  {touched.practiceName && errors.practiceName ? (
                    <p className="form-error">*{errors.practiceName}</p>
                  ) : null}
                </div> */}
                    </div>
                    <div className="col-md-6 mt-3">
                      <label htmlFor="GlobalPeriod">Global Period</label>
                      <select
                        onChange={(e) => setGlobalPeriod(e.target.value)}
                        id="globalPeriod"
                        className="form-select form-select-sm mt-1"
                        aria-label=".form-select-sm example"
                      >
                        <option selected>Default(None)</option>
                        <option value="None">None</option>
                        <option value="0 Days">0 Days</option>
                        <option value="10 Days">10 Days</option>
                        <option value="90 Days">90 Days</option>
                      </select>
                    </div>
                    {/*==================Effective/Termination Dates===================== */}
                    <div className="col-xl-12 mt-3">
                      <div className="card mb-2">
                        <div className="card-header">
                          Effective/Termination Dates
                        </div>
                        <div className="card-body ">
                          <div className="col-md-12 d-flex">
                            <div className="col-md-5 mx-2">
                              <label htmlFor="">Effective Date</label>
                              <input
                                onChange={(e) =>
                                  setEffectiveDate(e.target.value)
                                }
                                type="date"
                                id="effectiveDate"
                                name="effectiveDate"
                                className="form-control form-control-sm"
                              />
                            </div>
                            <div className="col-md-5">
                              <label htmlFor="">Termination Date</label>
                              <input
                                type="date"
                                onChange={(e) =>
                                  setTerminationDate(e.target.value)
                                }
                                placeholder="hre"
                                id="terminationDate"
                                name="terminationDate"
                                className="form-control form-control-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*==================Superbill Options===================== */}
                    <div className="col-xl-12 mt-3">
                      <div className="card mb-2">
                        <div className="card-header">Superbill Options</div>
                        <div className="card-body ">
                          <div className="col-md-12">
                            <div className="col-md-12 d-flex mt-2">
                              <input
                                onChange={(e) => setPrintSuperbillCode(1)}
                                className="form-check-input fs-5"
                                type="checkbox"
                                value=""
                                id="printSuperbillCode"
                              />
                              <label
                                className="form-check-label mx-2 mt-1"
                                htmlFor="printSuperbillCode"
                              >
                                Print this code on superbills
                              </label>
                            </div>
                            <div className="col-md-12 mt-3">
                              <input
                                type="text"
                                className="form-control"
                                id="category"
                                autoComplete="off"
                                disabled
                                placeholder="Category"
                                name="category"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                //   value={values.practiceName
                                //     .replace(/[^A-Za-z ]/gi, "")
                                //     .trimStart()
                                //     .toUpperCase()}
                                //   onChange={handleChange}
                                //   onBlur={handleBlur}
                                maxLength={60}
                              />
                              {/* <div className="col-md-12">
                  {touched.practiceName && errors.practiceName ? (
                    <p className="form-error">*{errors.practiceName}</p>
                  ) : null}
                </div> */}
                            </div>
                            <div className="col-md-12 mt-2">
                              <label htmlFor="">Description</label>
                              <input
                                type="text"
                                className="form-control"
                                onChange={(e) =>
                                  setSuperBillDescription(e.target.value)
                                }
                                id="categoryDescription"
                                autoComplete="off"
                                placeholder="Description"
                                name="categoryDescription"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                //   value={values.practiceName
                                //     .replace(/[^A-Za-z ]/gi, "")
                                //     .trimStart()
                                //     .toUpperCase()}
                                //   onChange={handleChange}
                                //   onBlur={handleBlur}
                                maxLength={60}
                              />
                              {/* <div className="col-md-12">
                  {touched.practiceName && errors.practiceName ? (
                    <p className="form-error">*{errors.practiceName}</p>
                  ) : null}
                </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*==================Statement Optionss===================== */}
                    <div className="col-xl-12 mt-3">
                      <div className="card mb-2">
                        <div className="card-header">Statement Options</div>
                        <div className="card-body ">
                          <div className="col-md-12">
                            <div className="col-md-12 mt-2">
                              <input
                                type="text"
                                className="form-control"
                                id="statementDescription"
                                onChange={(e) =>
                                  setStatementDescription(e.target.value)
                                }
                                autoComplete="off"
                                placeholder="Statement Description"
                                name="statementDescription"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                //   value={values.practiceName
                                //     .replace(/[^A-Za-z ]/gi, "")
                                //     .trimStart()
                                //     .toUpperCase()}
                                //   onChange={handleChange}
                                //   onBlur={handleBlur}
                                maxLength={60}
                              />
                              {/* <div className="col-md-12">
                  {touched.practiceName && errors.practiceName ? (
                    <p className="form-error">*{errors.practiceName}</p>
                  ) : null}
                </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* =====================notes alerts START====================== */}
            <div className="col-md-4 mx-2">
              <div className="col-md-12">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseNotes"
                        aria-expanded="false"
                        aria-controls="collapseNotes"
                      >
                        Notes
                      </button>
                    </h2>
                    <div
                      id="collapseNotes"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body px-2 py-2">
                        <div className="px-0 mx-0">
                          <textarea
                            // onChange={(e) => setNotetextChange(e.target.value)}
                            className="form-control"
                            id="ReferringNotes"
                            // rows="8"
                            maxLength={255}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseALerts"
                        aria-expanded="false"
                        aria-controls="collapseALerts"
                      >
                        Alerts
                      </button>
                    </h2>
                    <div
                      id="collapseALerts"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body px-2 py-2">
                        <div className="px-0 mx-0">
                          <button
                            type="button"
                            className="btn btn-labeled btn-outline-primary btn-sm mt-1"
                          >
                            <span className="btn-label">
                              <i className="fa fa-plus"></i>
                            </span>{" "}
                            Add Alerts
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFeeSchedule"
                        aria-expanded="false"
                        aria-controls="collapseFeeSchedule"
                      >
                        Fee Schedule
                      </button>
                    </h2>
                    <div
                      id="collapseFeeSchedule"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body px-2 py-2">
                        <div className="px-0 mx-0">
                          <textarea
                            // onChange={(e) => setNotetextChange(e.target.value)}
                            className="form-control"
                            id="ReferringNotes"
                            // rows="8"
                            maxLength={255}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseContracts"
                        aria-expanded="false"
                        aria-controls="collapseContracts"
                      >
                        Contracts
                      </button>
                    </h2>
                    <div
                      id="collapseContracts"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body px-2 py-2">
                        <div className="px-0 mx-0">
                          <textarea
                            // onChange={(e) => setNotetextChange(e.target.value)}
                            className="form-control"
                            id="ReferringNotes"
                            // rows="8"
                            maxLength={255}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* =====================notes alerts END====================== */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProcedureCode;
