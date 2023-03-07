import { useFormik } from "formik";
import { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormValNewClaim } from "../../../Schemas/FormValNewClaim";
import PatientModelClaim from "./PatientModelClaim";
const RenderingProviderModel = lazy(() => import("./RenderingProviderModel"));
const BillingProviderModel = lazy(() => import("./BillingProviderModel"));
const SuperVisingProviderModel = lazy(() =>
  import("./SuperVisingProviderModel")
);
const OrderingProviderModel = lazy(() => import("./OrderingProviderModel"));
const RefPCPProviderModel = lazy(() => import("./RefPCPProviderModel"));
const FacilityProviderModel = lazy(() => import("./FacilityProviderModel"));
const PrimaryInsModdel = lazy(() => import("./PrimaryInsModel"));
const SecondaryInsuranceModel = lazy(() => import("./SecondaryInsuranceModel"));
const TernaryInsuranceModel = lazy(() => import("./TernaryInsuranceModel"));
import { Link, useNavigate } from "react-router-dom";
import API from "../../../Api/ClientApi";
import Swal from "../../../GLOBAL/SwalAlert";
import {
  setTogglePrimaryDetails,
  setToggleSecondaryDetails,
  setToggleTernaryDetails,
} from "../../../Redux/features/Claim/ClaimAddNewSlice";
const AddInstitutionalClaim = () => {
  const navigate = useNavigate();
  useEffect(() => {
    API.get("claim")
      .then(function (response) {})
      .catch(function (error) {
        if (error.response.data.data == 403) {
          Swal.fire({
            icon: "error",
            imageHeight: 30,
            imageWidth: 30,
            title: "Sorry...",
            text: "Please contact your administrator to get Permissions!",
            confirmButtonColor: "#08619b",
          });
          navigate(-1);
        }
      });
  }, []);
  // data from redux & hooks
  const patient = useSelector((state) => state.Claim.patientName);
  const rendProvName = useSelector((state) => state.Claim.renderProviderName);
  const billProvName = useSelector((state) => state.Claim.billProviderName);
  const supervisProvName = useSelector(
    (state) => state.Claim.supervisingProviderName
  );
  const orderingProvName = useSelector(
    (state) => state.Claim.orderProviderName
  );
  const rePcpProvName = useSelector((state) => state.Claim.refPCPProviderName);
  const salesRepProvName = useSelector(
    (state) => state.Claim.salesRepProviderName
  );
  const facilityProvName = useSelector(
    (state) => state.Claim.facilityProviderName
  );
  const primInsuranceProvName = useSelector(
    (state) => state.Claim.primaryInsProviderName
  );
  const secInsuranceProvName = useSelector(
    (state) => state.Claim.secondaryInsProviderName
  );
  const ternInsuranceProvName = useSelector(
    (state) => state.Claim.ternaryInsProviderName
  );
  const showClearButton = useSelector(
    (state) => state.Claim.displayClearButton
  );
  const showhidePrimaryDetails = useSelector(
    (state) => state.Claim.showPrimaryInsurDetails
  );
  const showhideSecondaryDetails = useSelector(
    (state) => state.Claim.showSecondaryInsurDetails
  );
  const showhideTernaryDetails = useSelector(
    (state) => state.Claim.showTernaryInsurDetails
  );
  const [formComplete, setFormComplete] = useState(true);
  const dispatch = useDispatch();
  // form initial values
  const initialValues = {
    claimReference: "",
    claim_frequency: "",
    claim_patient: "",
    claim_renderingProvider: "",
    claim_billingProvider: "",
    claim_supervisorProvider: "",
    claim_orderingProvider: "",
    claim_refPCP_Provider: "",
    claim_ref_provider_select: "",
    claim_sales_rep: "",
    claim_facility: "",
    claim_location_select: "",
    claim_primary_ins: "",
    claim_secondary_ins: "",
    claim_ternary_ins: "",
    primInsMemberId: "",
    primInsPolicyTypeselect: "",
    primInsCopayDue: "",
    primInsGroupNo: "",
    primInsOrigClaim: "",
    primInsAuthorization: "",
    primInsRefferalTypeselect: "",
    secInsMemberId: "",
    secInsPolicyTypeselect: "",
    secInsCopayDue: "",
    secInsGroupNo: "",
    secInsOrigClaim: "",
    secInsAuthorization: "",
    secInsRefferalTypeselect: "",
    terInsMemberId: "",
    terInsPolicyTypeselect: "",
    terInsCopayDue: "",
    terInsGroupNo: "",
    terInsOrigClaim: "",
    terInsAuthorization: "",
    terInsRefferalTypeselect: "",
  };
  // post form data
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: FormValNewClaim,
      validateOnChange: true,
      validateOnBlur: false,
      // By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: (values, action) => {
        values.claim_patient = patient;
        values.claim_renderingProvider = rendProvName;
        values.claim_billingProvider = billProvName;
        values.claim_supervisorProvider = supervisProvName;
        values.claim_orderingProvider = orderingProvName;
        values.claim_refPCP_Provider = rePcpProvName;
        values.claim_sales_rep = salesRepProvName;
        values.claim_facility = facilityProvName;
        values.claim_primary_ins = primInsuranceProvName;
        values.claim_secondary_ins = secInsuranceProvName;
        values.claim_ternary_ins = ternInsuranceProvName;
        API.post("/claim", {
          claimReference: values.claimReference,
          claim_frequency: values.claim_frequency,
          claim_patient: patient,
          claim_renderingProvider: rendProvName,
          claim_billingProvider: billProvName,
          claim_supervisorProvider: supervisProvName,
          claim_orderingProvider: orderingProvName,
          claim_refPCP_Provider: rePcpProvName,
          claim_ref_provider_select: values.claim_ref_provider_select,
          claim_sales_rep: salesRepProvName,
          claim_facility: facilityProvName,
          claim_location_select: values.claim_location_select,
          claim_primary_ins: primInsuranceProvName,
          claim_secondary_ins: secInsuranceProvName,
          claim_ternary_ins: ternInsuranceProvName,
          primInsMemberId: values.primInsMemberId,
          primInsPolicyTypeselect: values.primInsPolicyTypeselect,
          primInsCopayDue: values.primInsCopayDue,
          primInsGroupNo: values.primInsGroupNo,
          primInsOrigClaim: values.primInsOrigClaim,
          primInsAuthorization: values.primInsAuthorization,
          primInsRefferalTypeselect: values.primInsRefferalTypeselect,
          secInsMemberId: values.secInsMemberId,
          secInsPolicyTypeselect: values.secInsPolicyTypeselect,
          secInsCopayDue: values.secInsCopayDue,
          secInsGroupNo: values.secInsGroupNo,
          secInsOrigClaim: values.secInsOrigClaim,
          secInsAuthorization: values.secInsAuthorization,
          secInsRefferalTypeselect: values.secInsRefferalTypeselect,
          terInsMemberId: values.terInsMemberId,
          terInsPolicyTypeselect: values.terInsPolicyTypeselect,
          terInsCopayDue: values.terInsCopayDue,
          terInsGroupNoL: values.terInsGroupNo,
          terInsOrigClaim: values.terInsOrigClaim,
          terInsAuthorization: values.terInsAuthorization,
          terInsRefferalTypeselect: values.terInsRefferalTypeselect,
        });
        console.log("Values inserted, Formik", values);
        setFormComplete(false);
        // to get rid of all the values after submitting the form
        action.resetForm();
      },
    });
  // clear text input
  const cleartext = () => {
    claim_patient.value = "";
  };
  // open patietn form
  const OpenPatientForm = (name) => {
    name ? alert(name) : alert("Please Select Patient");
  };
  // useEffect(() => {
  //   API.get("/claim")
  //     .then(function (response) {
  //       if ((response.data.status = true)) {
  //         localStorage.setItem("access", response.data.access_token);
  //         return navigate("/user");
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log("the is error", error);
  //       alert("No Permission Granted", error);
  //     });
  // });
  return (
    <div className="row mt-3 d-flex">
      <div
        className="col-md-8"
        style={{ overflowY: "scroll", height: "calc(100vh - 127px)" }}
      >
        <form action="" onSubmit={handleSubmit}>
          <div className="col-md-5 d-flex">
            {/* <div className=" d-flex col-md-9 mb-4 mt-3">
              <button
                type="submit"
                className="btn btn-outline-primary me-2 btn-sm"
              >
                {" "}
                Save{" "}
              </button>
              <button
                onClick={() => navigate("/claim", { replace: true })}
                type="button" className="btn btn-outline-danger btn-sm">
            
                Cancel
              </button>
              <div className="dropdown mt-2 col-md-6">
                <button type="button"
                  onClick={() => navigate("/institutionalClaim", { replace: true })}

                  className="btn btn-outline-primary btn-sm col-md-5 mx-2 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="fas fa-plus mx-2"></span>
                  Review</button>
                <ul className="dropdown-menu">
                  <li><p className="dropdown-item">b</p></li>
                  <li><p className="dropdown-item">a</p></li>
                  <li><p className="dropdown-item">c</p></li>
                </ul>
              </div>
              <div className="dropdown mt-2 col-md-6">
                <button type="button"
                  onClick={() => navigate("/institutionalClaim", { replace: true })}

                  className="btn btn-outline-primary btn-sm col-md-5 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="fas fa-plus "></span>
                  Review</button>
                <ul className="dropdown-menu">
                  <li><p className="dropdown-item">b</p></li>
                  <li><p className="dropdown-item">a</p></li>
                  <li><p className="dropdown-item">c</p></li>
                </ul>
              </div>
            </div> */}
            <div className="col-md-12 d-flex my-2">
              <button
                type="submit"
                className="btn btn-outline-primary me-2 btn-sm"
              >
                Save{" "}
              </button>
              <button
                onClick={() => navigate("/claim", { replace: true })}
                type="button"
                className="btn btn-outline-danger btn-sm"
              >
                Cancel
              </button>
              <div className="dropdown col-md-4 ">
                <button
                  type="button"
                  // onClick={() => navigate("/institutionalClaim", { replace: true })}

                  className="btn btn-outline-primary btn-sm col-md-11 mx-2 dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="fas fa-print mx-2"></span>
                  Print
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
              <div className="dropdown col-md-4">
                <button
                  type="button"
                  // onClick={() => navigate("/institutionalClaim", { replace: true })}

                  className="btn btn-outline-primary btn-sm col-md-12 mx-2 dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="fas fa-clipboard-check mx-2"></span>
                  Review
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
              <div className="dropdown col-md-4">
                <button
                  type="button"
                  // onClick={() => navigate("/institutionalClaim", { replace: true })}

                  className="btn btn-outline-primary btn-sm col-md-12 mx-3 dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="fas fa-ellipsis-vertical mx-2"></span>
                  More
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
          </div>
          {/* =========================== TABS   ======================= */}
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                className="nav-link active"
                id="nav-claim-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-claim"
                type="button"
                role="tab"
                aria-controls="nav-claim"
                aria-selected="true"
              >
                Claim
              </button>
              <button
                className="nav-link"
                id="nav-charges-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-charges"
                type="button"
                role="tab"
                aria-controls="nav-charges"
                aria-selected="false"
              >
                Charges
              </button>
              <button
                className="nav-link"
                id="nav-additional-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-additional"
                type="button"
                role="tab"
                aria-controls="nav-additional"
                aria-selected="false"
              >
                Additional Info
              </button>
              <button
                className="nav-link"
                id="nav-ambulance-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-ambulance"
                type="button"
                role="tab"
                aria-controls="nav-ambulance"
                aria-selected="false"
              >
                Ambulance Info
              </button>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            {/* ===================   CLAIM FORM  ======================= */}
            <div
              className="tab-pane fade show active"
              id="nav-claim"
              role="tabpanel"
              aria-labelledby="nav-claim-tab"
              tabIndex="0"
            >
              <div className="col-md-12 d-flex mt-2">
                <div className="col-md-2">
                  <label htmlFor="claimNew">Claim #</label>
                  <input
                    disabled
                    type="text"
                    className="form-control form-control-sm placeText"
                    id="claimNew"
                    placeholder="NEW"
                    name="claimNew"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                </div>
                <div className="col-md-3 mx-2">
                  <label htmlFor="claimReference">Reference #</label>
                  <input
                    type="text"
                    className="form-control form-control-sm placeText"
                    id="claimReference"
                    placeholder="Reference #"
                    name="claimReference"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    onChange={handleChange}
                    value={values.claimReference}
                    onBlur={handleBlur}
                  />
                </div>
                {formComplete && (
                  <div className="col-md-3 d-flex align-items-center mt-4 ">
                    <p>
                      <span className="fas fa-triangle-exclamation fs-4" />{" "}
                      Claim is incomplete
                    </p>
                  </div>
                )}
                <div className="col-md-3">
                  <label htmlFor="claim_frequency">Frequency</label>
                  <select
                    id="claim_frequency"
                    className="form-select form-select-sm"
                    onChange={handleChange}
                    value={values.claim_frequency}
                    onBlur={handleBlur}
                  >
                    <option value="1- Original Claim">1- Original Claim</option>
                    <option value="7- Replacement of Prior Claim">
                      7- Replacement of Prior Claim
                    </option>
                    <option value="8- Void/Cancel Prior Claim">
                      8- Void/Cancel Prior Claim
                    </option>
                  </select>
                </div>
              </div>
              <div className="col-md-12 d-flex mt-2">
                <div className="col-md-10">
                  <PatientModelClaim />
                  <div className="input-group">
                    <input
                      data-bs-toggle="modal"
                      data-bs-target="#patient_searchModal"
                      // onClick={() => alert("Open Model")}
                      className="form-control form-control-sm placeTextTax"
                      type="text"
                      required
                      placeholder="Patient"
                      aria-label="patient"
                      id="claim_patient"
                      name="claim_patient"
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={handleChange}
                      value={patient}
                      onBlur={handleBlur}
                    />
                    {showClearButton && (
                      <button
                        title="CLear"
                        onClick={cleartext}
                        type="button"
                        id="claim_primInsbtn"
                        className="btn btn-outline-secondary btn-sm"
                      >
                        <i className="fas fa-x" aria-hidden="true" />
                      </button>
                    )}
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#patient_searchModal"
                      title="Select Patient"
                      type="button"
                      className="input-group-text btn-hov"
                      id="claim_patientbtn"
                    >
                      <i className="fas fa-search" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => OpenPatientForm(patient)}
                  title="Open Patient"
                  className="btn btn-outline-primary btn-sm mx-2"
                >
                  <span className="fas fa-user" />
                </button>
              </div>
              {touched.claim_patient && errors.claim_patient ? (
                <p className="form-error mx-2">*{errors.claim_patient}</p>
              ) : null}

              <div className="col-md-12 d-flex mt-2">
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      data-bs-toggle="modal"
                      data-bs-target="#rendering_providerModal"
                      className="form-control form-control-sm placeTextTax"
                      type="text"
                      required
                      placeholder="Rendering Provider"
                      aria-label="render_prov"
                      id="claim_renderingProvider"
                      name="claim_renderingProvider"
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={handleChange}
                      value={rendProvName}
                      onBlur={handleBlur}
                    />

                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#rendering_providerModal"
                      type="button"
                      title="Select rendering Provider"
                      className="input-group-text btn-hov"
                      id="claim_renderingProviderbtn"
                    >
                      <i className="fas fa-search" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  title="Open rendering Provider"
                  className="btn btn-outline-primary btn-sm mx-2"
                >
                  <span className="fas fa-user-doctor" />
                </button>
              </div>
              {touched.claim_renderingProvider &&
              errors.claim_renderingProvider ? (
                <p className="form-error mx-2">
                  *{errors.claim_renderingProvider}
                </p>
              ) : null}
              <RenderingProviderModel />
              <div className="col-md-12 d-flex mt-2">
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      data-bs-toggle="modal"
                      data-bs-target="#billing_providerModal"
                      className="form-control form-control-sm placeTextTax"
                      type="text"
                      required
                      placeholder="Billing Provider"
                      aria-label="bill_prov"
                      id="claim_billingProvider"
                      name="claim_billingProvider"
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={handleChange}
                      value={billProvName}
                      onBlur={handleBlur}
                    />

                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#billing_providerModal"
                      title="Select billing Provider"
                      type="button"
                      className="input-group-text btn-hov"
                      id="claim_billingProviderbtn"
                    >
                      <i className="fas fa-search" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  title="Open Billing Provider"
                  className="btn btn-outline-primary btn-sm mx-2"
                >
                  <span className="fas fa-user-doctor" />
                </button>
              </div>

              {touched.claim_billingProvider && errors.claim_billingProvider ? (
                <p className="form-error mx-2">
                  *{errors.claim_billingProvider}
                </p>
              ) : null}
              <BillingProviderModel />
              <div className="col-md-12 d-flex mt-2">
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      data-bs-toggle="modal"
                      data-bs-target="#suppervis_providerModal"
                      className="form-control form-control-sm placeTextTax"
                      type="text"
                      placeholder="Supervising Provider"
                      aria-label="sup_prov"
                      id="claim_supervisorProvider"
                      name="claim_supervisorProvider"
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={handleChange}
                      value={supervisProvName}
                      onBlur={handleBlur}
                    />

                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#suppervis_providerModal"
                      title="Select supervising Provider"
                      type="button"
                      className="input-group-text btn-hov"
                      id="claim_supervisorProviderbtn"
                    >
                      <i className="fas fa-search" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  title="Open supervising Provider"
                  className="btn btn-outline-primary btn-sm mx-2"
                >
                  <span className="fas fa-user-doctor" />
                </button>
              </div>
              <SuperVisingProviderModel />
              <div className="col-md-12 d-flex mt-2">
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      data-bs-toggle="modal"
                      data-bs-target="#ordering_providerModal"
                      className="form-control form-control-sm placeTextTax"
                      type="text"
                      placeholder="Ordering Provider"
                      aria-label="order_prov"
                      id="claim_orderingProvider"
                      name="claim_orderingProvider"
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={handleChange}
                      value={orderingProvName}
                      onBlur={handleBlur}
                    />

                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#ordering_providerModal"
                      title="Select Ordering Provider"
                      type="button"
                      className="input-group-text btn-hov"
                      id="claim_supervisorProviderbtn"
                    >
                      <i className="fas fa-search" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  title="Open Ordering Provider"
                  className="btn btn-outline-primary btn-sm mx-2"
                >
                  <span className="fas fa-hospital-user" />
                </button>
              </div>
              <OrderingProviderModel />
              <div className="col-md-12 d-flex mt-2">
                <div className="col-md-7">
                  <div className="input-group">
                    <input
                      data-bs-toggle="modal"
                      data-bs-target="#refPcp_providerModal"
                      className="form-control form-control-sm placeTextTax"
                      type="search"
                      placeholder="Referring/PCP Provider"
                      aria-label="ref_pro"
                      id="claim_refPCP_Provider"
                      name="claim_refPCP_Provider"
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={handleChange}
                      value={rePcpProvName}
                      onBlur={handleBlur}
                    />

                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#refPcp_providerModal"
                      title="Select referring Provider"
                      type="button"
                      className="input-group-text btn-hov"
                      id="claim_ref_Providerbtn"
                    >
                      <i className="fas fa-search" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="col-md-2 mx-2">
                  <select
                    onChange={handleChange}
                    value={values.claim_ref_provider_select}
                    onBlur={handleBlur}
                    id="claim_ref_provider_select"
                    className="form-select form-select-sm"
                  >
                    <option value="Ref">Ref</option>
                    <option value="PCP">PCP</option>
                  </select>
                </div>
                <button
                  type="button"
                  title="Open Referring Provider"
                  className="btn btn-outline-primary btn-sm"
                >
                  <span className="fas fa-hospital-user" />
                </button>
              </div>
              <RefPCPProviderModel />
              <div className="col-md-12 d-flex mt-2">
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      data-bs-toggle="modal"
                      data-bs-target="#salesRep_providerModal"
                      className="form-control form-control-sm placeTextTax"
                      type="search"
                      placeholder="Sales Rep"
                      aria-label="sale_rep"
                      id="claim_sales_rep"
                      name="claim_sales_rep"
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={handleChange}
                      value={salesRepProvName}
                      onBlur={handleBlur}
                    />

                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#salesRep_providerModal"
                      title="Select Referring"
                      type="button"
                      className="input-group-text btn-hov"
                      id="claim_sales_repbtn"
                    >
                      <i className="fas fa-search" aria-hidden="true" />
                    </button>
                  </div>
                  {touched.claim_sales_rep && errors.claim_sales_rep ? (
                    <p className="form-error mx-2">*{errors.claim_sales_rep}</p>
                  ) : null}
                </div>
                <button
                  type="button"
                  title="Open Sale Rep"
                  className="btn btn-outline-primary btn-sm mx-2"
                >
                  <span className="fas fa-hospital-user" />
                </button>
              </div>

              <div className="col-md-12 d-flex mt-2">
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      data-bs-toggle="modal"
                      data-bs-target="#facility_providerModal"
                      className="form-control form-control-sm placeTextTax"
                      type="search"
                      placeholder="Facility"
                      aria-label="fac"
                      id="claim_facility"
                      name="claim_facility"
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={handleChange}
                      value={facilityProvName}
                      onBlur={handleBlur}
                    />

                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#facility_providerModal"
                      title="Select Facilility"
                      type="button"
                      className="input-group-text btn-hov"
                      id="claim_facilbtn"
                    >
                      <i className="fas fa-search" aria-hidden="true" />
                    </button>
                  </div>
                  {touched.claim_facility && errors.claim_facility ? (
                    <p className="form-error mx-2">*{errors.claim_facility}</p>
                  ) : null}
                </div>
                <button
                  type="button"
                  title="Open Facility"
                  className="btn btn-outline-primary btn-sm mx-2"
                >
                  <span className="far fa-hospital" />
                </button>
              </div>
              <FacilityProviderModel />
              <div className="col-md-10 mt-2">
                <label htmlFor="">Office Location</label>
                <select
                  onChange={handleChange}
                  value={values.claim_location_select}
                  onBlur={handleBlur}
                  id="claim_location_select"
                  className="form-select form-select-sm"
                >
                  <option value="Carolin Future, MD PC 1415">
                    Carolin Future, MD PC 1415
                  </option>
                  <option value="BLue 201 East Pine Street">
                    BLue 201 East Pine Street
                  </option>
                </select>
              </div>

              <div className="col-md-12 d-flex mt-2">
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      data-bs-toggle="modal"
                      data-bs-target="#primIns_providerModal"
                      className="form-control form-control-sm placeTextTax"
                      type="text"
                      placeholder="Primary Insurance"
                      aria-label="prm_ins"
                      id="claim_primary_ins"
                      name="claim_primary_ins"
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={handleChange}
                      value={primInsuranceProvName}
                      onBlur={handleBlur}
                    />

                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#primIns_providerModal"
                      title="Select Payer"
                      type="button"
                      className="input-group-text btn-hov"
                      id="claim_primInsbtn"
                    >
                      <i className="fas fa-search" aria-hidden="true" />
                    </button>
                  </div>
                  {touched.claim_primary_ins && errors.claim_primary_ins ? (
                    <p className="form-error mx-2">
                      *{errors.claim_primary_ins}
                    </p>
                  ) : null}
                </div>

                <button
                  type="button"
                  title="Open Primary Insurance"
                  className="btn btn-outline-primary btn-sm mx-2"
                >
                  <span className="fas fa-hand-holding-usd" />
                </button>
              </div>
              <PrimaryInsModdel />

              {showhidePrimaryDetails === true ? (
                <div className="col-md-12 mt-2">
                  <Link
                    to="#"
                    onClick={() => dispatch(setTogglePrimaryDetails(false))}
                    className="mt-2"
                  >
                    Hide Primary Details
                  </Link>
                  <div className="col-md-12 d-flex mt-2">
                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="primInsMemberId"
                        placeholder="Member ID"
                        name="primInsMemberId"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={handleChange}
                        value={values.primInsMemberId}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-md-4 mx-2">
                      <select
                        onChange={handleChange}
                        value={values.primInsPolicyTypeselect}
                        onBlur={handleBlur}
                        id="primInsPolicyTypeselect"
                        className="form-select form-select-sm"
                      >
                        <option value="Group Policy">Group Policy</option>
                        <option value="Individual Policy">
                          Individual Policy
                        </option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="primInsCopayDue"
                        placeholder="Copay Due"
                        name="primInsCopayDue"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={handleChange}
                        value={values.primInsCopayDue}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 d-flex mt-2">
                    <div className="col-md-5">
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="primInsGroupNo"
                        placeholder="Group Number"
                        name="primInsGroupNo"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={handleChange}
                        value={values.primInsGroupNo}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div className="col-md-5 mx-2">
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="primInsOrigClaim"
                        placeholder="Orig Claim"
                        name="primInsOrigClaim"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={handleChange}
                        value={values.primInsOrigClaim}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 d-flex mt-2">
                    <div className="col-md-8">
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="primInsAuthorization"
                        placeholder="Authorization #"
                        name="primInsAuthorization"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={handleChange}
                        value={values.primInsAuthorization}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-md-3 mx-2">
                      <select
                        onChange={handleChange}
                        value={values.primInsRefferalTypeselect}
                        onBlur={handleBlur}
                        id="primInsRefferalTypeselect"
                        className="form-select form-select-sm"
                      >
                        <option value="Prior Auth Number">
                          Prior Auth Number
                        </option>
                        <option value="Referral Number">Referral Number</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="col-md-12 d-flex mt-2">
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      data-bs-toggle="modal"
                      data-bs-target="#secIns_providerModal"
                      className="form-control form-control-sm placeTextTax"
                      type="text"
                      placeholder="Secondary Insurance"
                      aria-label="sec_ins"
                      id="claim_secondary_ins"
                      name="claim_secondary_ins"
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={handleChange}
                      value={secInsuranceProvName}
                      onBlur={handleBlur}
                    />

                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#secIns_providerModal"
                      title="Select Payer"
                      type="button"
                      className="input-group-text btn-hov"
                      id="claim_sec_insbtn"
                    >
                      <i className="fas fa-search" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  title="Open Secondary Insurance"
                  className="btn btn-outline-primary btn-sm mx-2"
                >
                  <span className="fas fa-hand-holding-usd" />
                </button>
              </div>
              <SecondaryInsuranceModel />

              {showhideSecondaryDetails === true ? (
                <div className="col-md-12 mt-2">
                  <Link
                    to="#"
                    onClick={() => dispatch(setToggleSecondaryDetails(false))}
                    className="mt-2"
                  >
                    Hide Secondary Details
                  </Link>
                  <div className="col-md-12 d-flex mt-2">
                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="secInsMemberId"
                        placeholder="Member ID"
                        name="secInsMemberId"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={handleChange}
                        value={values.secInsMemberId}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-md-4 mx-2">
                      <select
                        onChange={handleChange}
                        value={values.secInsPolicyTypeselect}
                        onBlur={handleBlur}
                        id="secInsPolicyTypeselect"
                        className="form-select form-select-sm"
                      >
                        <option value="Group Policy">Group Policy</option>
                        <option value="Individual Policy">
                          Individual Policy
                        </option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="secInsCopayDue"
                        placeholder="Copay Due"
                        name="secInsCopayDue"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={handleChange}
                        value={values.secInsCopayDue}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 d-flex mt-2">
                    <div className="col-md-5">
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="secInsGroupNo"
                        placeholder="Group Number"
                        name="secInsGroupNo"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={handleChange}
                        value={values.secInsGroupNo}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div className="col-md-5 mx-2">
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="secInsOrigClaim"
                        placeholder="Orig Claim"
                        name="secInsOrigClaim"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={handleChange}
                        value={values.secInsOrigClaim}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 d-flex mt-2">
                    <div className="col-md-8">
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="secInsAuthorization"
                        placeholder="Authorization #"
                        name="secInsAuthorization"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={handleChange}
                        value={values.secInsAuthorization}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-md-3 mx-2">
                      <select
                        onChange={handleChange}
                        value={values.secInsRefferalTypeselect}
                        onBlur={handleBlur}
                        id="secInsRefferalTypeselect"
                        className="form-select form-select-sm"
                      >
                        <option value="Prior Auth Number">
                          Prior Auth Number
                        </option>
                        <option value="Referral Number">Referral Number</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="col-md-12 d-flex mt-2">
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      data-bs-toggle="modal"
                      data-bs-target="#ternIns_providerModal"
                      className="form-control form-control-sm placeTextTax"
                      type="text"
                      placeholder="Ternary Insurance"
                      aria-label="ter_ins"
                      id="claim_ternary_ins"
                      name="claim_ternary_ins"
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={handleChange}
                      value={ternInsuranceProvName}
                      onBlur={handleBlur}
                    />

                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#ternIns_providerModal"
                      title="Select Payer"
                      type="button"
                      className="input-group-text btn-hov"
                      id="claim_ter_insbtn"
                    >
                      <i className="fas fa-search" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  title="Open Ternary Insurance"
                  className="btn btn-outline-primary btn-sm mx-2"
                >
                  <span className="fas fa-hand-holding-usd" />
                </button>
              </div>

              <TernaryInsuranceModel />

              {showhideTernaryDetails === true ? (
                <div className="col-md-12 mt-2">
                  <Link
                    to="#"
                    onClick={() => dispatch(setToggleTernaryDetails(false))}
                    className="mt-4"
                  >
                    Hide Ternary Details
                  </Link>
                  <div className="col-md-12 d-flex mt-2">
                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="terInsMemberId"
                        placeholder="Member ID"
                        name="terInsMemberId"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={handleChange}
                        value={values.terInsMemberId}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-md-4 mx-2">
                      <select
                        onChange={handleChange}
                        value={values.terInsPolicyTypeselect}
                        onBlur={handleBlur}
                        id="terInsPolicyTypeselect"
                        className="form-select form-select-sm"
                      >
                        <option value="Group Policy">Group Policy</option>
                        <option value="Individual Policy">
                          Individual Policy
                        </option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="terInsCopayDue"
                        placeholder="Copay Due"
                        name="terInsCopayDue"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={handleChange}
                        value={values.terInsCopayDue}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 d-flex mt-2">
                    <div className="col-md-5">
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="terInsGroupNo"
                        placeholder="Group Number"
                        name="terInsGroupNo"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={handleChange}
                        value={values.terInsGroupNo}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div className="col-md-5 mx-2">
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="terInsOrigClaim"
                        placeholder="Orig Claim"
                        name="terInsOrigClaim"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={handleChange}
                        value={values.terInsOrigClaim}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 d-flex mt-2">
                    <div className="col-md-8">
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="terInsAuthorization"
                        placeholder="Authorization #"
                        name="terInsAuthorization"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={handleChange}
                        value={values.terInsAuthorization}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-md-3 mx-2">
                      <select
                        onChange={handleChange}
                        value={values.terInsRefferalTypeselect}
                        onBlur={handleBlur}
                        id="terInsRefferalTypeselect"
                        className="form-select form-select-sm"
                      >
                        <option value="Prior Auth Number">
                          Prior Auth Number
                        </option>
                        <option value="Referral Number">Referral Number</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            {/* ===================   CHARGES FORM  ======================= */}
            <div
              className="tab-pane fade"
              id="nav-charges"
              role="tabpanel"
              aria-labelledby="nav-charges-tab"
              tabIndex="0"
            >
              {/* codes & card */}
              <div className="d-flex col-md-12 mt-3">
                <div className="col-md-7 gap-2">
                  {/* codes */}
                  <div className="col-md-12 d-flex gap-1 mt-3">
                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="number"
                          placeholder="ICD A"
                          aria-label="ICD A"
                          id="icda"
                          name="icda"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={10}
                          minLength={10}
                        />
                        <button
                          type="button"
                          className="input-group-text btn-hov"
                          id="NPIbtn"
                          data-bs-toggle="modal"
                          data-bs-target="#icdModel"
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
                    {/* ---------------ICD A Model---------------- */}
                    <div
                      className="modal fade text-dark"
                      id="icdModel"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      aria-hidden="true"
                      aria-labelledby="icdModel"
                      // tabindex={-1}
                    >
                      <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header"></div>
                          <div className="modal-body">
                            <div className="d-flex align-items-center">
                              <div className="col-md-9">
                                <label htmlFor="">
                                  Search for diagnosis codes by code or
                                  description
                                </label>
                                <input
                                  type="text"
                                  id="search"
                                  name="search"
                                  // value={query}
                                  // onChange={(e) => handleSearch(e)}
                                  className="form-control"
                                  aria-label="Small"
                                  placeholder="Search for diagnosis codes by code or description"
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
                                    {/* <tbody>
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
                                    </tbody> */}
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
                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="number"
                          placeholder="ICD B"
                          aria-label="ICD B"
                          id="icdb"
                          name="icdb"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={10}
                          minLength={10}
                        />
                        <button
                          type="button"
                          className="input-group-text btn-hov"
                          id="NPIbtn"
                          data-bs-toggle="modal"
                          data-bs-target="#icdModel"
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

                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="number"
                          placeholder="ICD C"
                          aria-label="ICD C"
                          id="icdc"
                          name="icdc"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={10}
                          minLength={10}
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

                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="number"
                          placeholder="ICD D"
                          aria-label="ICD D"
                          id="icdd"
                          name="icdd"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={10}
                          minLength={10}
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
                  </div>

                  {/* codes */}
                  <div className="col-md-12 d-flex gap-1 mt-3">
                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="number"
                          placeholder="ICD E"
                          aria-label="ICD E"
                          id="icde"
                          name="icde"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={10}
                          minLength={10}
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

                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="number"
                          placeholder="ICD F"
                          aria-label="ICD F"
                          id="icdf"
                          name="icdf"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={10}
                          minLength={10}
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

                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="number"
                          placeholder="ICD G"
                          aria-label="ICD G"
                          id="icdg"
                          name="icdg"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={10}
                          minLength={10}
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

                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="number"
                          placeholder="ICD H"
                          aria-label="ICD H"
                          id="icdh"
                          name="icd"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={10}
                          minLength={10}
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
                  </div>
                  {/* codes */}
                  <div className="col-md-12 d-flex gap-1 mt-3">
                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="number"
                          placeholder="ICD I"
                          aria-label="ICD I"
                          id="icdi"
                          name="icdi"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={10}
                          minLength={10}
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

                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="number"
                          placeholder="ICD J"
                          aria-label="ICD J"
                          id="icdj"
                          name="icdj"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={10}
                          minLength={10}
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

                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="number"
                          placeholder="ICD K"
                          aria-label="ICD K"
                          id="icdk"
                          name="icdk"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={10}
                          minLength={10}
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

                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="number"
                          placeholder="ICD L"
                          aria-label="ICD L"
                          id="icdl"
                          name="icdl"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={10}
                          minLength={10}
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
                  </div>
                  {/* codes */}
                  <div className="col-md-12 d-flex gap-1 mt-3">
                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="number"
                          placeholder="ICD M"
                          aria-label="ICD M"
                          id="icdm"
                          name="icdm"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={10}
                          minLength={10}
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

                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="number"
                          placeholder="ICD N"
                          aria-label="ICD N"
                          id="icdn"
                          name="icdn"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={10}
                          minLength={10}
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

                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="number"
                          placeholder="ICD O"
                          aria-label="ICD O"
                          id="icdgo"
                          name="icdo"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={10}
                          minLength={10}
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

                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="number"
                          placeholder="ICD P"
                          aria-label="ICD P"
                          id="icdp"
                          name="icp"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={10}
                          minLength={10}
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
                  </div>
                </div>
                {/* -------------assignment of benefits */}
                <div className="w-50 mx-3">
                  <div className="col-md-12 mt-2">
                    <div className="card mb-2">
                      <div className="card-header">Assignment of Benefits</div>
                      <div className="card-body ">
                        <div className="col-md-12">
                          <div className="col-md-10 d-flex"></div>
                          <div className="col-md-12 d-flex flex-column">
                            <input
                              // onClick={() => setExcludceCode(1)}
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="excludeCode"
                            />
                            <label htmlFor="excludeCode mx-0">
                              Update patient ICD & procedure Code defaults{" "}
                            </label>
                            <div className="col-md-12 mt-2">
                              <label htmlFor="">Set all changes to s</label>
                              <select
                                id="transportreasons"
                                className="form-select form-select-sm"
                                aria-label=".form-select-sm example"
                              >
                                <option selected>No change</option>
                                <option value="Collection">Collection</option>
                                <option value="Paid">Paid</option>
                                <option value="Paid">Waiting For Review</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* table */}
              <div className="col-md-12">
                <div className="overflow-scroll">
                  <table className="table table-light table-hover table-striped table table-bordered caption-top">
                    <thead className="text-nowrap">
                      <tr>
                        <th scope="text-center">To</th>
                        <th scope="col">From</th>
                        <th scope="col">Procedure</th>
                        <th scope="col">Mod 1</th>
                        <th scope="col">Units</th>
                        <th scope="col">Amount</th>
                        <th scope="col">DX Printer</th>
                        <th scope="col">Mod 2</th>
                        <th scope="col">POS</th>
                        <th scope="col">Mod 3</th>
                        <th scope="col">TOS</th>
                        <th scope="col">Mod 4</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Status</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Other</th>
                        <th scope="col">From</th>
                        <th scope="col">Inventory</th>
                      </tr>
                    </thead>

                    <tbody>
                      <td>
                        {" "}
                        <input
                          // onChange={(e) => setEffectiveDate(e.target.value)}
                          type="date"
                          id="AccidentIllnessDate"
                          name="AccidentIllnessDate"
                          className="form-control form-control-sm"
                        />{" "}
                      </td>
                      <td>
                        <input
                          // onChange={(e) => setEffectiveDate(e.target.value)}
                          type="date"
                          id="AccidentIllnessDate"
                          name="AccidentIllnessDate"
                          className="form-control form-control-sm"
                        />
                      </td>
                      <td>
                        <div className="input-group" style={{ width: "100px" }}>
                          <input
                            className={`form-control form-control-sm`}
                            type="text"
                            placeholder=""
                            aria-label="ICD N"
                            id="icdn"
                            name="icdn"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                          />
                          <button
                            type="button"
                            className="input-group-text bg-light btn-sm btn-hov"
                            id="NPIbtn"
                          >
                            <i className="fas fa-search" aria-hidden="true"></i>
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="input-group" style={{ width: "100px" }}>
                          <input
                            className={`form-control form-control-sm`}
                            type="text"
                            placeholder=""
                            aria-label="ICD N"
                            id="icdn"
                            name="icdn"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                          />
                          <button
                            type="button"
                            className="input-group-text bg-light btn-sm btn-hov"
                            id="NPIbtn"
                          >
                            <i className="fas fa-search" aria-hidden="true"></i>
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="input-group" style={{ width: "100px" }}>
                          <input
                            className={`form-control form-control-sm`}
                            type="text"
                            placeholder=""
                            aria-label="ICD N"
                            id="icdn"
                            name="icdn"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="input-group" style={{ width: "100px" }}>
                          <input
                            className={`form-control form-control-sm`}
                            type="text"
                            placeholder=""
                            aria-label="ICD N"
                            id="icdn"
                            name="icdn"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="input-group" style={{ width: "100px" }}>
                          <input
                            className={`form-control form-control-sm`}
                            type="text"
                            placeholder=""
                            aria-label="ICD N"
                            id="icdn"
                            name="icdn"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                          />
                          <button
                            type="button"
                            className="input-group-text bg-light btn-sm btn-hov"
                            id="NPIbtn"
                          >
                            <i className="fas fa-search" aria-hidden="true"></i>
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="input-group" style={{ width: "100px" }}>
                          <input
                            className={`form-control form-control-sm`}
                            type="text"
                            placeholder=""
                            aria-label="ICD N"
                            id="icdn"
                            name="icdn"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                          />
                          <button
                            type="button"
                            className="input-group-text bg-light btn-sm btn-hov"
                            id="NPIbtn"
                          >
                            <i className="fas fa-search" aria-hidden="true"></i>
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="input-group" style={{ width: "100px" }}>
                          <input
                            className={`form-control form-control-sm`}
                            type="text"
                            placeholder=""
                            aria-label="ICD N"
                            id="icdn"
                            name="icdn"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                          />
                          <button
                            type="button"
                            className="input-group-text bg-light btn-sm btn-hov"
                            id="NPIbtn"
                          >
                            <i className="fas fa-search" aria-hidden="true"></i>
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="input-group" style={{ width: "100px" }}>
                          <input
                            className={`form-control form-control-sm`}
                            type="text"
                            placeholder=""
                            aria-label="ICD N"
                            id="icdn"
                            name="icdn"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                          />
                          <button
                            type="button"
                            className="input-group-text bg-light btn-sm btn-hov"
                            id="NPIbtn"
                          >
                            <i className="fas fa-search" aria-hidden="true"></i>
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="input-group" style={{ width: "100px" }}>
                          <input
                            className={`form-control form-control-sm`}
                            type="text"
                            placeholder=""
                            aria-label="ICD N"
                            id="icdn"
                            name="icdn"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                          />
                          <button
                            type="button"
                            className="input-group-text bg-light btn-sm btn-hov"
                            id="NPIbtn"
                          >
                            <i className="fas fa-search" aria-hidden="true"></i>
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="input-group" style={{ width: "100px" }}>
                          <input
                            className={`form-control form-control-sm`}
                            type="text"
                            placeholder=""
                            aria-label="ICD N"
                            id="icdn"
                            name="icdn"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                          />
                          <button
                            type="button"
                            className="input-group-text bg-light btn-sm btn-hov"
                            id="NPIbtn"
                          >
                            <i className="fas fa-search" aria-hidden="true"></i>
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="input-group" style={{ width: "100px" }}>
                          <input
                            className={`form-control form-control-sm`}
                            type="text"
                            placeholder=""
                            aria-label="ICD N"
                            id="icdn"
                            name="icdn"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="col-md-10 d-flex">
                          <div className="col-md-5" style={{ width: "190px" }}>
                            <select
                              id="defaultChargeStatus"
                              className="form-select form-select-sm"
                              aria-label=".form-select-sm example"
                            >
                              <option selected>Balance Due Patient</option>
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
                      </td>
                      <td>
                        <div className="col-md-5" style={{ width: "60px" }}>
                          <input
                            // onClick={() => setExcludceCode(1)}
                            className="form-check-input fs-5"
                            type="checkbox"
                            value=""
                            id="excludeCode"
                          />
                        </div>
                      </td>
                      <td>
                        <div
                          className="col-md-5 mt-1"
                          style={{ width: "60px" }}
                        >
                          <Link to="">
                            <p
                            // data-bs-toggle="modal"
                            // data-bs-target="#icdModel"
                            >
                              Other
                            </p>
                          </Link>
                        </div>
                      </td>
                      <td>
                        <div
                          className="col-md-5 mt-1"
                          style={{ width: "60px" }}
                        >
                          <Link to="">
                            <p
                              data-bs-toggle="modal"
                              data-bs-target="#fromModel"
                            >
                              From
                            </p>
                          </Link>
                        </div>
                      </td>
                      <td>
                        <div className="input-group" style={{ width: "100px" }}>
                          <input
                            className={`form-control form-control-sm`}
                            type="text"
                            placeholder=""
                            aria-label="ICD N"
                            id="icdn"
                            name="icdn"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                          />
                          <button
                            type="button"
                            className="input-group-text bg-light btn-sm btn-hov"
                            id="NPIbtn"
                          >
                            <i className="fas fa-search" aria-hidden="true"></i>
                          </button>
                        </div>
                      </td>
                    </tbody>
                  </table>
                  <div className="col-md-4">
                    <p>0 charges</p>
                  </div>
                </div>
              </div>
            </div>
            {/* ************  Other & From Model  ***************** */}
            <div
              className="modal fade text-dark"
              id="fromModel"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              aria-hidden="true"
              aria-labelledby="fromModel"
              // tabindex={-1}
            >
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5>DME Form Selection</h5>
                  </div>
                  <div className="modal-body">
                    <div className="col-md-12">
                      <select
                        id="defaultChargeStatus"
                        className="form-select form-select-sm"
                        aria-label=".form-select-sm example"
                      >
                        <option selected>NONE</option>
                        <option value="Balance Due Patient">
                          Balance Due Patient
                        </option>
                        <option value="On Hold">On Hold</option>
                        <option value="Pending Patient">Pending Patient</option>
                        <option value="Pending Physician">
                          Pending Physician
                        </option>
                        <option value="Collection">Collection</option>
                        <option value="Paid">Paid</option>
                        <option value="Paid">Waiting For Review</option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      data-bs-target="#exampleModalToggle2"
                      data-bs-toggle="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* ===================   ADDITIONAL INFO FORM  ======================= */}
            <div
              className="tab-pane fade mt-2"
              id="nav-additional"
              role="tabpanel"
              aria-labelledby="nav-additional-tab"
              tabIndex="0"
            >
              <p>Show Additional Information about each field</p>
              <div className="col-md-11 d-flex align-items-center">
                <div className="form-check mx-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="none"
                  />
                  <label className="form-check-label" htmlFor="none">
                    None
                  </label>
                </div>
                <div className="form-check mx-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="ansiLoc"
                  />
                  <label className="form-check-label" htmlFor="ansiLoc">
                    ANSI Location (For Electronic Claims)
                  </label>
                </div>
                <div className="form-check mx-1">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="cms"
                  />
                  <label className="form-check-label" htmlFor="cms">
                    CMS 1500(02-12) Box Numbers (For Printed Claims)
                  </label>
                </div>
                <hr />
              </div>
              {/* ----------------Patient Condition -------------------- */}
              <div className="col-xl-11 mt-3">
                <div className="card mb-2">
                  <div className="card-header">Patient Condition</div>
                  <div className="card-body ">
                    <div className="col-md-12">
                      <p>Is Patient Condition Related to:</p>
                      <div className="col-md-5 d-flex align-items-center">
                        <label className="" htmlFor="">
                          Employment
                        </label>
                        <input
                          className="form-check-input mx-2"
                          type="radio"
                          name="employment"
                          id="empno"
                        />
                        <label
                          className="form-check-label mt-1"
                          htmlFor="empno"
                        >
                          No
                        </label>
                        <input
                          className="form-check-input mx-2"
                          type="radio"
                          name="employment"
                          id="empyes"
                        />
                        <label
                          className="form-check-label mt-1"
                          htmlFor="empyes"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="col-md-5 d-flex align-items-center mt-2">
                        <label className="" htmlFor="">
                          Auto Accident
                        </label>
                        <input
                          className="form-check-input mx-2"
                          type="radio"
                          name="autoAccd"
                          id="autoaccno"
                        />
                        <label
                          className="form-check-label mt-1"
                          htmlFor="autoaccno"
                        >
                          No
                        </label>
                        <input
                          className="form-check-input mx-2"
                          type="radio"
                          name="autoAccd"
                          id="autoaccyes"
                        />
                        <label
                          className="form-check-label mt-1"
                          htmlFor="autoaccyes"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="col-md-5 d-flex align-items-center mt-2">
                        <label className="" htmlFor="">
                          Other Accident
                        </label>
                        <input
                          className="form-check-input mx-2"
                          type="radio"
                          name="OtherAccd"
                          id="otheraccno"
                        />
                        <label
                          className="form-check-label mt-1"
                          htmlFor="otheraccno"
                        >
                          No
                        </label>
                        <input
                          className="form-check-input mx-2"
                          type="radio"
                          name="OtherAccd"
                          id="otheraccyes"
                        />
                        <label
                          className="form-check-label mt-1"
                          htmlFor="otheraccyes"
                        >
                          Yes
                        </label>
                      </div>{" "}
                      <hr />
                      {/* -------------------dates ----------------------- */}
                      <div className="col-md-12 d-flex mt-3">
                        <div className="col-md-5 mx-2">
                          <label htmlFor="">Accident/Illness Date</label>
                          <input
                            // onChange={(e) => setEffectiveDate(e.target.value)}
                            type="date"
                            id="AccidentIllnessDate"
                            name="AccidentIllnessDate"
                            className="form-control form-control-sm"
                          />
                        </div>
                        <div className="col-md-5">
                          <label htmlFor="">Last Mentrual Period Date</label>
                          <input
                            type="date"
                            // onChange={(e) => setTerminationDate(e.target.value)}
                            placeholder="hre"
                            id="LastMenstraulPeriod"
                            name="LastMenstraulPeriod"
                            className="form-control form-control-sm"
                          />
                        </div>
                      </div>
                      <div className="col-md-12 d-flex mt-3">
                        <div className="col-md-5 mx-2">
                          <label htmlFor="">Initial Treatment Date</label>
                          <input
                            // onChange={(e) => setEffectiveDate(e.target.value)}
                            type="date"
                            id="InitTreatmentDate"
                            name="InitTreatmentDate"
                            className="form-control form-control-sm"
                          />
                        </div>
                        <div className="col-md-5">
                          <label htmlFor="">Date Last Seen</label>
                          <input
                            type="date"
                            // onChange={(e) => setTerminationDate(e.target.value)}
                            placeholder="hre"
                            id="dateLastSeen"
                            name="dateLastSeen"
                            className="form-control form-control-sm"
                          />
                        </div>
                      </div>
                      <div className="col-md-12 d-flex mt-3">
                        <div className="col-md-5 mx-2">
                          <label htmlFor="">Unable to work from Date</label>
                          <input
                            // onChange={(e) => setEffectiveDate(e.target.value)}
                            type="date"
                            id="unablefromDate"
                            name="unablefromDate"
                            className="form-control form-control-sm"
                          />
                        </div>
                        <div className="col-md-5">
                          <label htmlFor="">Unable to work to Date</label>
                          <input
                            type="date"
                            // onChange={(e) => setTerminationDate(e.target.value)}
                            placeholder="hre"
                            id="unabletoDate"
                            name="unabletoDate"
                            className="form-control form-control-sm"
                          />
                        </div>
                      </div>
                      <div className="col-md-12 d-flex mt-3">
                        <div className="col-md-5 d-flex align-items-center">
                          <label className="mt-1" htmlFor="">
                            Patient is homebound?
                          </label>
                          <input
                            className="form-check-input mx-2"
                            type="radio"
                            name="patinetbound"
                            id="patno"
                          />
                          <label
                            className="form-check-label mt-1"
                            htmlFor="patno"
                          >
                            No
                          </label>
                          <input
                            className="form-check-input mx-2"
                            type="radio"
                            name="patinetbound"
                            id="patyes"
                          />
                          <label
                            className="form-check-label mt-1"
                            htmlFor="patyes"
                          >
                            Yes
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ----------------Claim Information------------------ */}
              <div className="col-xl-11 mt-2">
                <div className="card mb-2">
                  <div className="card-header">Claim Information</div>
                  <div className="card-body ">
                    <div className="col-md-12">
                      <div className="col-md-10 d-flex ">
                        <div className="col-md-4">
                          <label htmlFor="">Claim Codes</label>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            id="claimcodes"
                            autoComplete="off"
                            name="claimcodes"
                            required
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={60}
                          />
                          {/* <div className="col-md-12">
                  {touched.practiceName && errors.practiceName ? (
                    <p className="form-error">*{errors.practiceName}</p>
                  ) : null}
                </div> */}
                        </div>
                        <div className="col-md-4 mx-2">
                          <label htmlFor="">Other Claim ID</label>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            id="otherclaimid"
                            autoComplete="off"
                            name="otherclaimid"
                            required
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={60}
                          />
                          {/* <div className="col-md-12">
                  {touched.practiceName && errors.practiceName ? (
                    <p className="form-error">*{errors.practiceName}</p>
                  ) : null}
                </div> */}
                        </div>
                      </div>
                      <div className="col-md-10 mt-2">
                        <label htmlFor="">Additional Claim Information</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          id="addClaimInfo"
                          autoComplete="off"
                          name="addClaimInfo"
                          required
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={60}
                        />
                        {/* <div className="col-md-12">
                  {touched.practiceName && errors.practiceName ? (
                    <p className="form-error">*{errors.practiceName}</p>
                  ) : null}
                </div> */}
                      </div>
                      <div className="col-md-10 mt-2">
                        <label htmlFor="">Claim Notes</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          id="claimnotes"
                          autoComplete="off"
                          name="claimnotes"
                          required
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={60}
                        />
                        {/* <div className="col-md-12">
                  {touched.practiceName && errors.practiceName ? (
                    <p className="form-error">*{errors.practiceName}</p>
                  ) : null}
                </div> */}
                      </div>
                      <div className="col-md-4 mt-2">
                        <label htmlFor="">Resubmit Reason Codes</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          id="resubmitReasonCode"
                          autoComplete="off"
                          name="resubmitReasonCode"
                          required
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={60}
                        />
                        {/* <div className="col-md-12">
                  {touched.practiceName && errors.practiceName ? (
                    <p className="form-error">*{errors.practiceName}</p>
                  ) : null}
                </div> */}
                      </div>
                      <div className="col-md-10 mt-2">
                        <label htmlFor="">Delay Reason Code</label>
                        <select
                          id="transportreasons"
                          className="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                        >
                          <option selected>Default Charge Status</option>
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
                      <div className="col-md-12 d-flex mt-2">
                        <div className="col-md-5 mx-2">
                          <label htmlFor="">Hospitalized From Date</label>
                          <input
                            // onChange={(e) => setEffectiveDate(e.target.value)}
                            type="date"
                            id="hospitalizedFromDate"
                            name="hospitalizedFromDate"
                            className="form-control form-control-sm"
                          />
                        </div>
                        <div className="col-md-5">
                          <label htmlFor="">Hospitalized From Date</label>
                          <input
                            type="date"
                            // onChange={(e) => setTerminationDate(e.target.value)}
                            placeholder="hre"
                            id="hospitalizedtoDate"
                            name="hospitalizedtoDate"
                            className="form-control form-control-sm"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 mt-2">
                        <label htmlFor="">Lab Charges</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          id="claimcodes"
                          autoComplete="off"
                          name="claimcodes"
                          required
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={60}
                        />
                        {/* <div className="col-md-12">
                  {touched.practiceName && errors.practiceName ? (
                    <p className="form-error">*{errors.practiceName}</p>
                  ) : null}
                </div> */}
                      </div>
                      <div className="col-md-10 mt-2">
                        <label htmlFor="">Special Program Code</label>
                        <select
                          id="defaultChargeStatus"
                          className="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                        >
                          <option selected>Default Charge Status</option>
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
                  </div>
                </div>
              </div>
              {/* ---------------------- assignment of benefits -------------------------------- */}
              <div className="col-xl-11 mt-2">
                <div className="card mb-2">
                  <div className="card-header">Assignment of Benefits</div>
                  <div className="card-body ">
                    <div className="col-md-12">
                      <div className="col-md-10 d-flex">
                        <div className="col-md-5 mt-2">
                          <label htmlFor="">Patient's Signature on File</label>
                          <select
                            id="defaultChargeStatus"
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                          >
                            <option selected>Default Charge Status</option>
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
                        <div className="col-md-5 mt-2 mx-2">
                          <label htmlFor="">Insured's Signature on File</label>
                          <select
                            id="defaultChargeStatus"
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                          >
                            <option selected>Default Charge Status</option>
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
                      <div className="col-md-10 d-flex">
                        <div className="col-md-5 mt-2">
                          <label htmlFor="">Provider Accept Assignment</label>
                          <select
                            id="defaultChargeStatus"
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                          >
                            <option selected>Default Charge Status</option>
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
                    </div>
                  </div>
                </div>
              </div>
              {/* ---------------------- other refernce information -------------------------------- */}
              <div className="col-xl-11 mt-2">
                <div className="card mb-2">
                  <div className="card-header">Other refernce information</div>
                  <div className="card-body ">
                    <div className="col-md-12">
                      <div className="col-md-10 d-flex">
                        <div className="col-md-5 mt-2">
                          <label htmlFor="">Documentation Method</label>
                          <select
                            id="defaultChargeStatus"
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                          >
                            <option selected>Default Charge Status</option>
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
                        <div className="col-md-5 mt-2 mx-2">
                          <label htmlFor="">Documentation Type</label>
                          <select
                            id="defaultChargeStatus"
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                          >
                            <option selected>Default Charge Status</option>
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
                      <div className="col-md-10 d-flex">
                        <div className="col-md-5 mt-2">
                          <label htmlFor="">Patient Weight (in)</label>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            id="patientweightin"
                            autoComplete="off"
                            name="patientweightin"
                            required
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={60}
                          />
                        </div>
                        <div className="col-md-5 mt-2 mx-2">
                          <label htmlFor="">Patient Weight (lbs)</label>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            id="patientweightlbs"
                            autoComplete="off"
                            name="patientweightlbs"
                            required
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={60}
                          />
                        </div>
                      </div>
                      <div className="col-md-10 mt-2">
                        <label htmlFor="">
                          Service Authorization Exception
                        </label>
                        <select
                          id="defaultChargeStatus"
                          className="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                        >
                          <option selected>Default Charge Status</option>
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
                      <div className="col-md-10 mt-2">
                        <label htmlFor="">Demonstration Project</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="demonsProj"
                          autoComplete="off"
                          name="demonsProj"
                          required
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={60}
                        />
                      </div>
                      <div className="col-md-10 mt-2">
                        <label htmlFor="">Mammography Certification</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="mammogrCertif"
                          autoComplete="off"
                          name="mammogrCertif"
                          required
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={60}
                        />
                      </div>
                      <div className="col-md-10 mt-2">
                        <label htmlFor="">
                          Investigational Device Exemption
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="investDevExemp"
                          autoComplete="off"
                          name="investDevExemp"
                          required
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={60}
                        />
                      </div>
                      <div className="col-md-10 mt-2">
                        <label htmlFor="">Ambulatory Patient Group</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="AmbulPatGroup"
                          autoComplete="off"
                          name="AmbulPatGroup"
                          required
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={60}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ===================   AMBULANCE INFO FORM  ======================= */}
            <div
              className="tab-pane fade"
              id="nav-ambulance"
              role="tabpanel"
              aria-labelledby="nav-ambulanceclaim-tab"
              tabIndex="0"
            >
              <div className="col-md-12 d-flex flex-column">
                <div className="col-md-5 d-flex align-items-center mt-2">
                  <label className="" htmlFor="">
                    Ambulance claim
                  </label>
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="ambulanceclaim"
                    id="ambulanceclaim"
                  />
                  <label
                    className="form-check-label mt-1"
                    htmlFor="ambulanceclaim"
                  >
                    No
                  </label>
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="ambulanceclaim"
                    id="ambulanceclaim"
                  />
                  <label
                    className="form-check-label mt-1"
                    htmlFor="ambulanceclaim"
                  >
                    Yes
                  </label>
                </div>

                <div className="col-md-10 mt-2">
                  <label htmlFor="">Transport Reasons </label>
                  <select
                    id="transportreasons"
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected>Transport to the nearest facility</option>
                    <option value="Balance Due Patient">
                      Balance Due Patient
                    </option>
                    <option value="On Hold">On Hold</option>
                    <option value="Pending Patient">Pending Patient</option>
                    <option value="Pending Physician">Pending Physician</option>
                    <option value="Collection">Collection</option>
                    <option value="Paid">Paid</option>
                    <option value="Paid">Waiting For Review</option>
                  </select>
                </div>

                <div className="col-md-10 d-flex ">
                  <div className="col-md-4">
                    <label htmlFor="">Transport Miles</label>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      id="transportmiles"
                      autoComplete="off"
                      name="transportmiles"
                      required
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      maxLength={60}
                    />
                    {/* <div className="col-md-12">
                  {touched.practiceName && errors.practiceName ? (
                    <p className="form-error">*{errors.practiceName}</p>
                  ) : null}
                </div> */}
                  </div>
                  <div className="col-md-4 mx-2">
                    <label htmlFor="">Patient Weight</label>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      id="pateintweight"
                      autoComplete="off"
                      name="pateintweight"
                      required
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      maxLength={60}
                    />
                    {/* <div className="col-md-12">
                  {touched.practiceName && errors.practiceName ? (
                    <p className="form-error">*{errors.practiceName}</p>
                  ) : null}
                </div> */}
                  </div>
                </div>

                <div className="col-md-10 mt-2">
                  <label htmlFor="">Round Trip Reason</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="roundtripreason"
                    autoComplete="off"
                    name="roundtripreason"
                    required
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength={60}
                  />
                  {/* <div className="col-md-12">
                  {touched.practiceName && errors.practiceName ? (
                    <p className="form-error">*{errors.practiceName}</p>
                  ) : null}
                </div> */}
                </div>

                <div className="col-md-10 mt-2">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="roundtripreason"
                    autoComplete="off"
                    name="roundtripreason"
                    placeholder="Strecher Reason "
                    required
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
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

          <div className="col-xl-10 mt-2">
            <div className="card mb-2">
              <div className="card-header">Pickup Address</div>
              <div className="card-body ">
                <div className="col-md-12 mt-2">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="address"
                    autoComplete="off"
                    name="address"
                    placeholder="Address "
                    required
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength={60}
                  />
                  {/* <div className="col-md-12">
                  {touched.practiceName && errors.practiceName ? (
                    <p className="form-error">*{errors.practiceName}</p>
                  ) : null}
                </div> */}
                </div>
                <div className="col-md-12 mt-2">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="address"
                    autoComplete="off"
                    name="address"
                    placeholder=" "
                    required
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength={60}
                  />
                  {/* <div className="col-md-12">
                  {touched.practiceName && errors.practiceName ? (
                    <p className="form-error">*{errors.practiceName}</p>
                  ) : null}
                </div> */}
                </div>

                <div className="col-md-12 d-flex mt-4 gap-1">
                  <div className="col-md-5">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="city"
                      autoComplete="off"
                      name="city"
                      placeholder=" City"
                      required
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      maxLength={60}
                    />
                  </div>

                  <div className="col-md-2">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="state"
                      autoComplete="off"
                      name="state"
                      placeholder=" State"
                      required
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      maxLength={60}
                    />
                  </div>

                  <div className="col-md-5">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="state"
                      autoComplete="off"
                      name="state"
                      placeholder=" State"
                      required
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      maxLength={60}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-10 mt-2">
            <div className="card mb-2">
              <div className="card-header">Dropoff Address</div>
              <div className="card-body ">
                <div className="col-md-12 mt-2">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="name"
                    autoComplete="off"
                    name="name"
                    placeholder="Name "
                    required
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength={60}
                  />
                  {/* <div className="col-md-12">
                  {touched.practiceName && errors.practiceName ? (
                    <p className="form-error">*{errors.practiceName}</p>
                  ) : null}
                </div> */}
                </div>
                <div className="col-md-12 mt-2">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="address"
                    autoComplete="off"
                    name="address"
                    placeholder=" "
                    required
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength={60}
                  />
                  {/* <div className="col-md-12">
                  {touched.practiceName && errors.practiceName ? (
                    <p className="form-error">*{errors.practiceName}</p>
                  ) : null}
                </div> */}
                </div>

                <div className="col-md-12 d-flex mt-4 gap-1">
                  <div className="col-md-5">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="city"
                      autoComplete="off"
                      name="city"
                      placeholder=" City"
                      required
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      maxLength={60}
                    />
                  </div>

                  <div className="col-md-2">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="state"
                      autoComplete="off"
                      name="state"
                      placeholder=" State"
                      required
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      maxLength={60}
                    />
                  </div>

                  <div className="col-md-5">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="state"
                      autoComplete="off"
                      name="state"
                      placeholder=" State"
                      required
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      maxLength={60}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-12 mt-2">
            <div className="card mb-2">
              <div className="card-header">Certification Field</div>
              <div className="card-body ">
                <label htmlFor="" className="p-2">
                  {" "}
                  Select up to 5
                </label>
                <div className="col-md-12 d-flex">
                  <div className="col-md-6 d-flex flex-column">
                    <div className="col-md-12 gap-2 d-flex p-1 mt-2">
                      <input
                        // onClick={() => setExcludceCode(1)}
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="excludeCode"
                      />
                      <label htmlFor="excludeCode mx-0">
                        Pateint was admitted to a haspital{" "}
                      </label>
                    </div>

                    <div className="col-md-12 gap-2 d-flex p-1">
                      <input
                        // onClick={() => setExcludceCode(1)}
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="excludeCode"
                      />
                      <label htmlFor="excludeCode mx-0">
                        Patient was onconscious or in shock
                      </label>
                    </div>
                    <div className="col-md-12 gap-2 d-flex p-1">
                      <input
                        // onClick={() => setExcludceCode(1)}
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="excludeCode"
                      />
                      <label htmlFor="excludeCode mx-0">
                        Pateint had to be physially restrained
                      </label>
                    </div>
                    <div className="col-md-12 gap-2 d-flex p-1">
                      <input
                        // onClick={() => setExcludceCode(1)}
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="excludeCode"
                      />
                      <label htmlFor="excludeCode mx-0">
                        Ambulance services was medically necessory
                      </label>
                    </div>
                  </div>

                  <div className="col-md-6 d-flex flex-column">
                    <div className="col-md-12 gap-2 d-flex p-1 mt-2">
                      <input
                        // onClick={() => setExcludceCode(1)}
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="excludeCode"
                      />
                      <label htmlFor="excludeCode mx-0">
                        {" "}
                        Patient was moved by stretcher
                      </label>
                    </div>

                    <div className="col-md-12 gap-2 d-flex p-1">
                      <input
                        // onClick={() => setExcludceCode(1)}
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="excludeCode"
                      />
                      <label htmlFor="excludeCode mx-0">
                        {" "}
                        Pateint was transported in an emergency sitation
                      </label>
                    </div>
                    <div className="col-md-12 gap-2 d-flex p-1">
                      <input
                        // onClick={() => setExcludceCode(1)}
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="excludeCode"
                      />
                      <label htmlFor="excludeCode mx-0">
                        {" "}
                        Pateint had visible hemorhagging{" "}
                      </label>
                    </div>
                    <div className="col-md-12 gap-2 d-flex p-1">
                      <input
                        // onClick={() => setExcludceCode(1)}
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="excludeCode"
                      />
                      <label htmlFor="excludeCode mx-0">
                        Patinet was confined to a bed chair
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="col-md-4">Notes Here</div>
    </div>
  );
};
export default AddInstitutionalClaim;
