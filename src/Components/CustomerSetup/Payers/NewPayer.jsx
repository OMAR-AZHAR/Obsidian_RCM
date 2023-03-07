import { lazy, useCallback, useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Modal,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { PatternFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import API from "../../../Api/ClientApi";
import NewPayerMisc from "./NewPayerMisc";
import { NewPayersFormValidation } from "./NewPayersFormValidation";

import { Alert } from "./../../../GLOBAL/SwalAlert";
import { useSelector, useDispatch } from "react-redux";
import {
  getPayersZipCode,
  getPayersZipCode2,
  PayersCityZipSliceFetch,
  PayersCityZipSliceFetch2,
} from "../../../Redux/features/Payer_Redux/PayersCityZipSlice";
import useGet from "../../../Hooks/useGet";
import useFetch from "../../../Hooks/useFetch";
import { FaCheckCircle, FaTimes } from "react-icons/fa";

export default function PayersForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Set Payer Type Select Data from API

  const { data: payertypedata } = useFetch("customersetup/payer/payertype");
  const { data: TaxData, loading: loadingtax } = useFetch(
    "customersetup/practice/taxonomyapi"
  );
  const { data: payerlist, loading: loadpayerlist } = useFetch(
    "customersetup/payer/payerlist"
  );
  const [PayerID, setPayerID] = useState(1);
  const [Payerstaxo_facility, setPayerstaxo_facility] = useState("");
  const [Payerstaxo_fac_desc, setPayerstaxo_fac_desc] = useState("");
  const [Payerstaxo_fac_id, setPayerstaxo_fac_id] = useState("");
  const [NetworkStatus, setNetworkStatus] = useState(null);
  const [searchTax, setSearchTax] = useState("");
  const [CPMmode, setCPMMode] = useState(1);
  const [DefaultStatus, setDefaultStatus] = useState("");
  const [NPI_Payer_Value, setNPI_Payer_Value] = useState("");
  const [individual_checked, setIndividualChecked] = useState(false);
  const [organization_checked, setOrgChecked] = useState(true);
  const [any_checked, setAnyChecked] = useState(false);
  const [search, setSearch] = useState("");
  const [citydata, setcitydata] = useState("");
  const [zipdata, setzipdata] = useState("");
  const [payerNotes, setPayerNotes] = useState("");
  const [searchmasterpayer, setMasterPayerSearch] = useState("");
  const PayerNotesTextChange = (notes) => {
    setPayerNotes(notes);
  };
  const [payerplan, setPayerPlan] = useState("");
  const [electronicaddresscheck, setelectronicaddresscheck] = useState(
    "Pay-To Address (Loop 2010AB)"
  );
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

  // Default Charge Status Select Field
  const defaultchargestatus = [
    {
      status: "Send to Payer via clearinghouse",
    },
    { status: "User Print via Clearinghouse" },
    { status: "Charges at Payer" },
    { status: "Charges on Hold" },
    { status: "Waiting for Review" },
    { status: "Due Patient" },
  ];
  // Clearinghouse Processing Mode Select Field
  const { data: CPM } = useFetch("customersetup/payer/processingmode");
  // console.log("...", ...CPM);
  // const CPM = [
  //   { status: "The clearinghouse will send the claims electronically" },
  //   { status: "The clearinghouse will print and mail the claims" },
  //   { status: "Do not send claims to the clearinghouse for processing" },
  // ];
  // Master Payer Search Model ERA Support Select field options
  const ERAsuppdata = [{ text: "Yes" }, { text: "No" }, { text: "Any" }];

  // For Clearing House Modal
  const [showClearingHouseModal, setShowClearingHouseModal] = useState(true);
  const closeClearingHouseModal = () => setShowClearingHouseModal(false);

  const [modalShow, setModalShow] = useState(false);
  const toggleModal = () => {
    setModalShow(true);
    setShowClearingHouseModal(false);
  };
  // for toggling alternate practice info tabs
  const [showUseraltpractinfo, setShowUseraltpractinfo] = useState(false);
  const [checked, setchecked] = useState(false);
  const Usealtpractinfo = () => {
    showUseraltpractinfo === true
      ? setShowUseraltpractinfo(false)
      : setShowUseraltpractinfo(true);

    checked === true ? setchecked(false) : setchecked(true);
  };
  const popover = (
    <Popover id="showcontactpop" className="mw-100">
      <Popover.Header style={{ fontSize: "14px" }}>
        Contracts currently associated to this payer
      </Popover.Header>
      <Popover.Body>
        <Button variant="outline-primary">
          <i className="fas fa-plus"></i>&nbsp;Add
        </Button>
        &nbsp; &nbsp;
        <Button variant="outline-info">
          {" "}
          <i className="fas fa-times"></i>&nbsp;Close
        </Button>
      </Popover.Body>
      <Popover.Header style={{ fontSize: "12px" }}>
        There are no contracts currently associated to this payer
      </Popover.Header>
    </Popover>
  );
  // Zip API
  const zipapi = useSelector(
    (state) => state.PayersCityStateZip?.zipcode?.ZipCode?.Zip5
  );
  const zipapiCity = useSelector(
    (state) => state.PayersCityStateZip?.zipcode?.ZipCode?.City
  );
  const zipapiState = useSelector(
    (state) => state.PayersCityStateZip?.zipcode?.ZipCode?.State
  );
  // for p2 address
  const zipapi2 = useSelector(
    (state) => state.PayersCityStateZip?.zipcode2?.ZipCode?.Zip5
  );
  const zipapiCity2 = useSelector(
    (state) => state.PayersCityStateZip?.zipcode2?.ZipCode?.City
  );
  const zipapiState2 = useSelector(
    (state) => state.PayersCityStateZip?.zipcode2?.ZipCode?.State
  );
  // Set Zip API for Primary Office
  const [zipapicode, setzipapicode] = useState("");
  const [zipapi_city, setzipapi_city] = useState("");
  const [zipapi_state, setzipapi_state] = useState("");

  // Set Api for pay to address
  const [zipapicode2, setzipapicode2] = useState("");
  const [zipapi_city2, setzipapi_city2] = useState("");
  const [zipapi_state2, setzipapi_state2] = useState("");

  useEffect(() => {
    setzipapicode(zipapi ? zipapi : "");
    setzipapi_city(zipapiCity ? zipapiCity : "");
    setzipapi_state(zipapiState ? zipapiState : "");

    setzipapicode2(zipapi2 ? zipapi2 : "");
    setzipapi_city2(zipapiCity2 ? zipapiCity2 : "");
    setzipapi_state2(zipapiState2 ? zipapiState2 : "");
  }, [zipapi, zipapiCity, zipapiState, zipapi2, zipapiCity2, zipapiState2]);
  let user = JSON.parse(sessionStorage.getItem("access"));
  let customerID = JSON.parse(sessionStorage.getItem("customer_id"));
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      newpayername: "",
      newpayerplanname: "",
      newpayersequence: "NEW",
      newpayerreference: "",
      // Contact Info
      newpayeraddress: "",
      newpayercity: "",
      newpayerstate: "",
      newpayerzipcode: zipapicode,
      newpayerphone: "",
      newpayerfax: "",
      newpayeremail: "",
      newpayerwebsite: "",
      newpayeraddress2: "",
      // ID Numbers
      newpayergroupnumber: "",
      newpayerclaimoffice: "",
      newpayerID_medigap: "",
      newpayerocna: "",
      // Alternate Practice Info
      newpayeraltpractname: "",
      newpayeraltpractaddress: "",
      newpayeraltpractcity: "",
      newpayeraltpractstate: "",
      newpayeraltpractzipcode: "",
      newpayeraltpracttaxid: "",
      newpayeraltpractnpi: "",
      newpayerzipcode2: "",
      newpayeraltpracttaxonomySpeciality: "",
      newpayeraltpractaddress2: "",
      // Master Payer Search (Clearinghouse)
      masterpayersearch: "",
      masterpayersearchpayerid: "",
    },
    // enableReinitialize: true,
    validationSchema: NewPayersFormValidation,
    validateOnChange: true,
    validateOnBlur: true,
    // By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: (values, action) => {
      // Send Data API
      API.post(
        "customersetup/payer/store",
        {
          newpayername: newpayername?.toString()?.toUpperCase(),
          newpayerplanname: payerplan?.toString()?.toUpperCase()?.trimStart(),
          newpayersequence: "NEW",
          newpayerreference: values?.newpayerreference,
          // Contact Info
          newpayeraddress: values?.newpayeraddress?.toString()?.toUpperCase(),
          newpayeraddress2: values?.newpayeraddress2?.toString()?.toUpperCase(),
          newpayercity: zipapi_city?.toString()?.toUpperCase(),
          newpayerstate: zipapi_state?.toString()?.toUpperCase(),
          newpayerzipcode: values?.newpayerzipcode,
          newpayerphone: values?.newpayerphone,
          newpayerfax: values?.newpayerfax,
          newpayeremail: values?.newpayeremail,
          newpayerwebsite: values?.newpayerwebsite,
          // ID Numbers
          newpayergroupnumber: values?.newpayergroupnumber,
          newpayerclaimoffice: values?.newpayerclaimoffice,
          newpayerID_medigap: values?.newpayerID_medigap,
          newpayerocna: values?.newpayerocna,
          // Alternate Practice Info
          newpayeraltpractname: values?.newpayeraltpractname
            ?.toString()
            ?.toUpperCase(),
          newpayeraltpractaddress: values?.newpayeraltpractaddress
            ?.toString()
            ?.toUpperCase(),
          newpayeraltpractaddress2: values?.newpayeraltpractaddress2
            ?.toString()
            ?.toUpperCase(),
          newpayeraltpractcity: zipapi_city2?.toString()?.toUpperCase(),
          newpayeraltpractstate: zipapi_state2?.toString()?.toUpperCase(),

          newpayeraltpracttaxid: values?.newpayeraltpracttaxid,
          newpayeraltpractnpi: Number(NPI_Payer_Value),
          newpayeraltpracttaxonomySpeciality: Payerstaxo_fac_id,
          payertypeid: Number(PayerID),
          // Master Payer Search (Clearinghouse)
          masterpayersearch: values?.masterpayersearch,
          masterpayersearchpayerid: values?.masterpayersearchpayerid,
          altpracticecheck: Number(checked),
          network_status: NetworkStatus,
          CPMmode,
          DefaultStatus,
          electronicaddresscheck,

          payerNotes,
          newpayeraltpractzipcode: values?.newpayeraltpractzipcode,
        },
        {
          headers: {
            Authorization: `Bearer ${user}`,
            customer_id: customerID,
          },
        }
      )
        .then(function (response) {
          if (response.data.status === 200 || response.data.status === 201) {
            Alert("center", "success", "Payer Added Successfully", false, 1500);
            Dump();
            action.resetForm();

            navigate("/customersetup/payers", {
              replace: true,
            });
          }
          if (response.data.status === 422) {
            Alert("center", "error", response.data.message, false, 2500);
          } else if (response.data.status === 500) {
            Alert("center", "error", response.data.error, false, 2500);
          }
        })
        //reset form

        .catch((error) => {
          Alert("center", "error", error, false, 2500);
        });
    },
  });
  function Dump() {
    setPayerID(1);
    setPayerstaxo_facility("");
    setPayerstaxo_fac_desc("");
    setPayerstaxo_fac_id("");
    setNetworkStatus("");
    setSearchTax("");
    setCPMMode("");
    setDefaultStatus("");
    setNPI_Payer_Value("");
    dispatch(getPayersZipCode(""));
    dispatch(getPayersZipCode2(""));
    setcitydata("");
    setzipdata("");
    setPayerNotes("");
    setzipapicode("");
    setzipapi_city("");
    setzipapi_state("");
    setzipapicode2("");
    setzipapi_city2("");
    setzipapi_state2("");
  }
  const [newpayername, setpayername] = useState("");
  const [payerID_clearinghouse, setpayerID_clearinghouse] = useState("");
  return (
    <form className="row d-flex mt-4" onSubmit={handleSubmit} action="post">
      <div
        className="col-md-6 overflow-custom-height"
        // style={{ overflowY: "scroll", height: "calc(100vh - 127px)" }}
      >
        <div className="col-md-12 mb-4">
          <button type="submit" className="btn btn-outline-primary me-2 btn-sm">
            <i className="fas fa-check"></i>&nbsp;Save
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm me-0"
            onClick={() => {
              navigate("/customersetup/payers");
              Dump();
            }}
          >
            <i className="fas fa-times"></i>&nbsp;Cancel
          </button>

          <OverlayTrigger trigger="focus" placement="bottom" overlay={popover}>
            <Button
              disabled
              variant="link btn-hov text-primary text-decoration-none"
            >
              Show Contracts
            </Button>
          </OverlayTrigger>
        </div>

        <div className="col-md-12">
          <label>Name</label>
          <input
            type="text"
            className={`form-control `}
            id="newpayername"
            name="newpayername"
            placeholder="Name"
            autoComplete="off"
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck="false"
            onChange={(e) =>
              setpayername(
                e.target.value?.toString()?.toUpperCase()?.trimStart()
              )
            }
            value={newpayername?.toString()?.toUpperCase()?.trimStart()}
            autoFocus={true}
            maxLength={60}
          />
          {touched.newpayername && errors.newpayername ? (
            <p className="form-error mx-1">*{errors.newpayername}</p>
          ) : null}
          <label className="mt-3">Plan Name</label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="newpayerplanname"
            name="newpayerplanname"
            placeholder="Plan Name"
            autoComplete="off"
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck="false"
            onChange={(e) =>
              setPayerPlan(
                e.target.value?.toString()?.trimStart().toUpperCase()
              )
            }
            value={payerplan}
            // onBlur={handleBlur}
            maxLength={60}
          />
          {touched.newpayerplanname && errors.newpayerplanname ? (
            <p className="form-error mx-1">*{errors.newpayerplanname}</p>
          ) : null}
        </div>
        <div className="row">
          <div className="col-md-8 pt-1">
            <label>Payer Type</label>
            <select
              className="form-select form-select-sm"
              defaultValue={"Other"}
              onChange={(e) => setPayerID(e.target.value)}
            >
              {payertypedata?.map((payer, i) => {
                return (
                  <option key={i} {...payer} value={payer?.id}>
                    {payer.payer_type}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="col-md-4 pt-1">
            <label>Network Status</label>
            <select
              className="form-select form-select-sm"
              defaultValue={"Network Status"}
              onChange={(e) => setNetworkStatus(e.target.value)}
            >
              <option hidden={true} value={null}></option>
              <option value={1}>In-network</option>
              <option value={0}>Out-of-network</option>
            </select>
          </div>
        </div>
        {/* Default Charge Status */}
        <div className="col-md-12 pt-1">
          <label>Default Charge Status</label>
          <select
            className="form-select form-select-sm"
            defaultValue={"Send to Payer via Clearinghouse"}
            onChange={(e) => setDefaultStatus(e.target.value)}
          >
            {defaultchargestatus?.map((st, i) => {
              return (
                <option key={i} {...st} value={st.status}>
                  {st.status}
                </option>
              );
            })}
          </select>
        </div>

        {/* Clearinghouse Processing Mode */}
        <div className="col-md-12 pt-1">
          <label>Clearinghouse Processing Mode</label>
          <select
            className="form-select form-select-sm"
            defualtValue={CPM?.[1]?.id}
            value={CPMmode}
            onChange={(e) => setCPMMode(e.target.value)}
          >
            {CPM?.map((cp, i) => {
              return (
                <option key={i} {...cp} value={cp?.id}>
                  {cp?.processing_mode}
                </option>
              );
            })}
          </select>
        </div>

        <div className="col-md-12 d-flex mt-2">
          <div className="col-md-3">
            <label className="mt-0 text-dark">Sequence #</label>
            <input
              type="text"
              className="form-control form-control-sm"
              disabled
              id="newpayersequence"
              name="newpayersequence"
              autoComplete="off"
              autoCapitalize="characters"
              autoCorrect="off"
              spellCheck="false"
              value={values?.newpayersequence?.trimStart()}
            />
          </div>
          <div className="col-md-3 mx-2">
            <label className="mt-0 text-dark">Reference #</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="newpayerreference"
              name="newpayerreference"
              placeholder="Reference"
              autoComplete="off"
              autoCapitalize="characters"
              autoCorrect="off"
              spellCheck="false"
              onChange={handleChange}
              value={values?.newpayerreference
                ?.toString()
                ?.trimStart()
                .toUpperCase()}
              maxLength={12}
            />
          </div>
        </div>

        {/* contact info */}
        <div className="col-xl-12 mt-3">
          <div className="card mb-2">
            <div className="card-header">Contact Information</div>
            <div className="card-body ">
              <div className="col-md-12">
                <div className="col-md-12">
                  <label className="mt-0 text-dark">Address</label>
                  <input
                    type="text"
                    className="form-control form-control-sm placeText"
                    id="newpayeraddress"
                    placeholder="Address"
                    name="newpayeraddress"
                    autoComplete="off"
                    autoCapitalize="characters"
                    autoCorrect="off"
                    spellCheck="false"
                    onChange={handleChange}
                    value={values?.newpayeraddress
                      ?.toString()
                      ?.trimStart()
                      .toUpperCase()}
                    onBlur={handleBlur}
                    maxLength={40}
                    required={true}
                  />
                  {touched.newpayeraddress && errors.newpayeraddress ? (
                    <p className="form-error mx-0 px-0">
                      *{errors.newpayeraddress}
                    </p>
                  ) : null}

                  <input
                    type="text"
                    className="form-control form-control-sm placeText mt-2"
                    id="newpayeraddress2"
                    placeholder="Address"
                    name="newpayeraddress2"
                    autoComplete="off"
                    autoCapitalize="characters"
                    autoCorrect="off"
                    spellCheck="false"
                    onChange={handleChange}
                    value={values?.newpayeraddress2
                      ?.toString()
                      .trimStart()
                      .toUpperCase()}
                    onBlur={handleBlur}
                    maxLength={40}
                  />
                  {touched.newpayeraddress2 && errors.newpayeraddress2 ? (
                    <p className="form-error mx-0 px-0">
                      *{errors.newpayeraddress2}
                    </p>
                  ) : null}
                </div>
                <div className="col-md-12 d-flex mt-2">
                  <div className="col-md-5">
                    <label className="mt-0 text-dark">City</label>
                    <input
                      type="text"
                      className="form-control form-control-sm placeText"
                      id="newpayercity"
                      placeholder="City"
                      name="newpayercity"
                      autoComplete="off"
                      autoCapitalize="characters"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={(e) =>
                        setzipapi_city(
                          e.target.value
                            ?.toString()
                            ?.replace(/[^A-Za-z ]/gi, "")
                            .toUpperCase()
                            .trimStart()
                        )
                      }
                      value={zipapi_city}
                      onBlur={handleBlur}
                      maxLength={28}
                      required={true}
                    />
                  </div>

                  <div className="col-md-2 mx-2">
                    <label className="mt-0 text-dark">State</label>
                    <input
                      type="text"
                      className="form-control form-control-sm placeText"
                      id="newpayerstate"
                      placeholder="State"
                      name="newpayerstate"
                      autoComplete="off"
                      autoCapitalize="characters"
                      autoCorrect="off"
                      spellCheck="false"
                      // onKeyUp={handleChange}
                      onChange={(e) => {
                        setzipapi_state(
                          e.target.value
                            ?.replace(/[^A-Za-z ]/gi, "")
                            .toUpperCase()
                            .trimStart()
                        );
                      }}
                      value={zipapi_state
                        ?.replace(/[^A-Za-z ]/gi, "")
                        .toUpperCase()
                        .trimStart()}
                      maxLength={2}
                      required={true}
                    />
                  </div>
                  {/* <AutoComplete data={autoCompleteData} />  */}
                  {/**********************************************************/}
                  <div className="col-md-4 mx-1">
                    <label className="mt-0 text-dark">Zip</label>
                    <PatternFormat
                      format="#####-####"
                      mask=" "
                      type="text"
                      className="form-control form-control-sm"
                      id="newpayerzipcode"
                      name="newpayerzipcode"
                      placeholder="ZIP Code"
                      autoComplete="off"
                      autoCapitalize="characters"
                      autoCorrect="off"
                      spellCheck="false"
                      // onChange={handleChange}
                      value={values?.newpayerzipcode.trim()}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        setFieldValue(
                          "newpayerzipcode",
                          e.target.value?.replace(/[^0-9]/gi, "").trim(),
                          true
                        );
                        (values?.newpayerzipcode.match(
                          /(?<!\d)\d{4}(?!\d)/gm
                        ) ||
                          values?.newpayerzipcode.match(
                            /(?<!\d)\d{8}(?!\d)/gm
                          )) &&
                          dispatch(
                            PayersCityZipSliceFetch(
                              e.target.value?.replace(/[^0-9]/gi, "").trim()
                            )
                          );
                      }}
                      onKeyUp={handleChange}
                    />

                    {touched.newpayerzipcode && errors.newpayerzipcode ? (
                      <p className="form-error mx-1">
                        *{errors.newpayerzipcode}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-12 d-flex mt-3">
                  <div className="col-md-4">
                    <label className="mt-0 text-dark">Phone</label>
                    <PatternFormat
                      format="(###) ###-####"
                      mask=" "
                      type="text"
                      className="form-control form-control-sm placeText"
                      id="newpayerphone"
                      placeholder="Phone"
                      name="newpayerphone"
                      autoComplete="off"
                      autoCapitalize="characters"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={handleChange}
                      value={
                        values?.newpayerphone
                        // .replace(/[^0-9]/gi, "")
                      }
                      onBlur={handleBlur}
                    />
                    {touched.newpayerphone && errors.newpayerphone ? (
                      <p className="form-error mx-2">*{errors.newpayerphone}</p>
                    ) : null}
                  </div>
                  <div className="col-md-4 mx-2">
                    <label className="mt-0 text-dark">Fax</label>
                    <PatternFormat
                      format="(###) ###-####"
                      mask=" "
                      type="text"
                      className="form-control form-control-sm placeText"
                      id="newpayerfax"
                      placeholder="Fax"
                      name="newpayerfax"
                      autoComplete="off"
                      autoCapitalize="characters"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={handleChange}
                      value={values?.newpayerfax}
                      onBlur={handleBlur}
                    />
                    {touched.newpayerfax && errors.newpayerfax ? (
                      <p className="form-error mx-2">*{errors.newpayerfax}</p>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-12 d-flex mt-2">
                  <div className="col-md-12 mt-2">
                    <label className="mt-0 text-dark">Email</label>
                    <input
                      type="text"
                      className="form-control form-control-sm placeText"
                      id="newpayeremail"
                      placeholder="Email"
                      name="newpayeremail"
                      autoComplete="off"
                      autoCapitalize="characters"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={handleChange}
                      value={values?.newpayeremail.trim()}
                      onBlur={handleBlur}
                      maxLength={60}
                    />
                    {touched.newpayeremail && errors.newpayeremail ? (
                      <p className="form-error mx-1">*{errors.newpayeremail}</p>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-12 d-flex mt-2">
                  <div className="col-md-12 mt-2">
                    <label className="mt-0 text-dark">Website</label>
                    <input
                      type="text"
                      className="form-control form-control-sm placeText"
                      id="newpayerwebsite"
                      placeholder="Website"
                      name="newpayerwebsite"
                      autoComplete="off"
                      autoCapitalize="characters"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={handleChange}
                      value={values?.newpayerwebsite.trim()}
                      onBlur={handleBlur}
                      maxLength={60}
                    />
                    {touched.newpayerwebsite && errors.newpayerwebsite ? (
                      <p className="form-error mx-1">
                        *{errors.newpayerwebsite}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End contact info */}

        {/* id number */}
        <div className="col-xl-12 mt-3 text-dark">
          <div className="card mb-2">
            <div className="card-header">ID Numbers</div>
            <div className="card-body ">
              <div className="col-md-12 d-flex">
                <div className="col-md-6">
                  <label>Group Number</label>
                  <input
                    type="text"
                    className="form-control form-control-sm placeText"
                    id="newpayergroupnumber"
                    placeholder=""
                    name="newpayergroupnumber"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength="15"
                    onChange={handleChange}
                    value={values?.newpayergroupnumber.trimStart()}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="col-md-6 mx-2">
                  <label>Claim Office #</label>
                  <input
                    type="text"
                    className="form-control form-control-sm placeText mb-2"
                    id="newpayerclaimoffice#"
                    placeholder="Claim Office #"
                    name="newpayerclaimoffice"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength="15"
                    onChange={handleChange}
                    value={values?.newpayerclaimoffice.trimStart()}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              <div className="col-md-12 d-flex mt-2">
                <div className="col-md-6">
                  <label>Payer ID/Medigap#</label>
                  <input
                    type="text"
                    className="form-control form-control-sm placeText"
                    id="newpayerID_medigap#"
                    placeholder="Payer ID/Medigap#"
                    name="newpayerID_medigap"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength="15"
                    onChange={handleChange}
                    value={values?.newpayerID_medigap.trimStart()}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="col-md-6 mx-2">
                  <label>OCNA</label>
                  <input
                    type="text"
                    className="form-control form-control-sm placeText mb-2"
                    id="newpayerocna"
                    placeholder="OCNA"
                    name="newpayerocna"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength={15}
                    onChange={handleChange}
                    value={values?.newpayerocna.trimStart()}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* End of ID Numbers */}
        {/* Alternate Practice info */}
        <div className="col-md-12 form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="altpracticeinfo"
            onChange={Usealtpractinfo}
            checked={checked}
          />
          <label className="form-check-label" htmlFor="altpracticeinfo">
            Use alternate practice information (override the practice info on
            claim)
          </label>
        </div>
        {/* Alternate Practice Info form */}
        {showUseraltpractinfo && (
          //  id number
          <div className="col-xl-12 mt-3">
            <div className="card mb-2">
              <div className="card-header">Alternate Practice Information</div>
              <div className="card-body text-dark">
                <div className="col-md-12">
                  <span>
                    On electronic claims, the below address will overide the
                  </span>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="newpayeraltaddress"
                          id="newpayerpaytoaddress"
                          value={"Pay-To Address (Loop 2010AB)"}
                          onClick={(e) =>
                            setelectronicaddresscheck(e.target.value)
                          }
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="newpayerpaytoaddress"
                        >
                          Pay-To Address (Loop 2010AB)
                        </label>
                      </div>
                    </div>
                    {/* Radio 2 */}
                    <div className="col-md-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="newpayeraltaddress"
                          id="newpayermainaddress"
                          value={"Main Address (Loop 2010AA)"}
                          onClick={(e) =>
                            setelectronicaddresscheck(e.target.value)
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="newpayermainaddress"
                        >
                          Main Address (Loop 2010AA)
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 mt-2">
                    <label className="mt-0 text-dark">Name</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="newpayeraltpractname"
                      name="newpayeraltpractname"
                      placeholder="Name"
                      autoComplete="off"
                      autoCapitalize="characters"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={handleChange}
                      value={values?.newpayeraltpractname
                        .trimStart()
                        .toUpperCase()}
                      onBlur={handleBlur}
                      autoFocus={false}
                      maxLength={60}
                      required={showUseraltpractinfo}
                    />
                    <label className="mt-2 text-dark">Address</label>
                    <input
                      type="text"
                      className="form-control form-control-sm placeText"
                      id="newpayeraltpractaddress"
                      placeholder="Address"
                      name="newpayeraltpractaddress"
                      autoComplete="off"
                      autoCapitalize="characters"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={handleChange}
                      value={values?.newpayeraltpractaddress
                        .trimStart()
                        .toUpperCase()}
                      onBlur={handleBlur}
                      maxLength={40}
                      required={showUseraltpractinfo}
                    />
                    {/* ********* Address 2 ********* */}

                    <input
                      type="text"
                      className="form-control form-control-sm placeText mt-2"
                      id="newpayeraltpractaddress2"
                      placeholder="Address"
                      name="newpayeraltpractaddress2"
                      autoComplete="off"
                      autoCapitalize="characters"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={handleChange}
                      value={values?.newpayeraltpractaddress2
                        ?.toString()
                        ?.trimStart()
                        ?.toUpperCase()}
                      onBlur={handleBlur}
                      maxLength={40}
                      required={showUseraltpractinfo}
                    />
                  </div>

                  <div className="col-md-12 d-flex mt-2">
                    <div className="col-md-5">
                      <label className="mt-0 text-dark">City</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="newpayeraltpractcity"
                        name="newpayeraltpractcity"
                        placeholder="City"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setzipapi_city2(
                            e.target.value
                              ?.toString()
                              .replace(/[^A-Za-z ]/gi, "")
                              .trimStart()
                              .toUpperCase()
                          )
                        }
                        value={zipapi_city2
                          ?.toString()
                          .replace(/[^A-Za-z ]/gi, "")
                          .trimStart()
                          .toUpperCase()}
                        maxLength={28}
                        required={showUseraltpractinfo}
                      />
                      {touched.newpayeraltpractcity &&
                      errors.newpayeraltpractcity ? (
                        <p className="form-error mx-0 px-0">
                          *{errors.newpayeraltpractcity}
                        </p>
                      ) : null}
                    </div>

                    <div className="col-md-2 mx-2">
                      <label className="mt-0 text-dark">State</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="newpayeraltpractstate"
                        name="newpayeraltpractstate"
                        placeholder="State"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setzipapi_state2(
                            e.target.value
                              ?.toString()
                              .replace(/[^A-Za-z ]/gi, "")
                              .trimStart()
                              .toUpperCase()
                          )
                        }
                        value={zipapi_state2
                          ?.toString()
                          .replace(/[^A-Za-z ]/gi, "")
                          .trimStart()
                          .toUpperCase()}
                        // data={autoCompleteData}
                        maxLength={2}
                        required={showUseraltpractinfo}
                      />
                      {touched.newpayeraltpractstate &&
                      errors.newpayeraltpractstate ? (
                        <p className="form-error mx-0 px-0">
                          *{errors.newpayeraltpractstate}
                        </p>
                      ) : null}
                    </div>
                    {/* <AutoComplete data={autoCompleteData} />  */}
                    {/**********************************************************/}
                    <div className="col-md-4 mx-1">
                      <label className="mt-0 text-dark">Zip</label>
                      <PatternFormat
                        format="#####-####"
                        mask=""
                        type="text"
                        className="form-control form-control-sm"
                        id="newpayeraltpractzipcode"
                        name="newpayeraltpractzipcode"
                        placeholder="ZIP Code"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        value={values?.newpayeraltpractzipcode}
                        onChange={(e) => {
                          setFieldValue(
                            "newpayeraltpractzipcode",
                            e.target.value?.replace(/[^0-9]/gi, "").trim(),
                            true
                          );
                          (values?.newpayeraltpractzipcode.match(
                            /(?<!\d)\d{4}(?!\d)/gm
                          ) ||
                            values?.newpayeraltpractzipcode.match(
                              /(?<!\d)\d{8}(?!\d)/gm
                            )) &&
                            dispatch(
                              PayersCityZipSliceFetch2(
                                e.target.value?.replace(/[^0-9]/gi, "").trim()
                              )
                            );
                        }}
                        onKeyUp={handleChange}
                        required={showUseraltpractinfo}
                        minLength={5}
                        // maxLength={10}
                      />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-4">
                      <label className="mt-0 text-dark">Tax ID</label>
                      <PatternFormat
                        format="##-#######"
                        mask=" "
                        type="tel"
                        className="form-control form-control-sm placeText"
                        id="newpayeraltpracttaxid"
                        placeholder="Tax ID"
                        name="newpayeraltpracttaxid"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={handleChange}
                        value={values?.newpayeraltpracttaxid.trim()}
                        onBlur={handleBlur}
                        required={showUseraltpractinfo}
                      />
                    </div>
                    {/* NPI and Taxonomy  */}
                    <div className="col-md-4">
                      <label className="mt-0 text-dark">NPI</label>
                      <div className="input-group">
                        <input
                          className="form-control form-control-sm placeTextTax"
                          type="text"
                          placeholder="NPI"
                          aria-label="npi"
                          id="newpayeraltpractnpi"
                          name="newpayeraltpractnpi"
                          autoComplete="off"
                          autoCapitalize="characters"
                          autoCorrect="off"
                          spellCheck="false"
                          onChange={(e) =>
                            setNPI_Payer_Value(
                              e.target.value
                                ?.replace(/[^0-9]/gi, "")
                                .trimStart()
                            )
                          }
                          value={NPI_Payer_Value?.replace(
                            /[^0-9]/gi,
                            ""
                          ).trimStart()}
                          maxLength={10}
                          required={showUseraltpractinfo}
                        />

                        <button
                          onClick={(e) => setShowNPI_Registry(true)}
                          type="button"
                          className="input-group-text btn-hov"
                          id="newpayeraltpractnpibtn"
                          data-bs-toggle="modal"
                          data-bs-target="#NPIRegistryModaltriggerinPayer"
                        >
                          <i className="fas fa-search" aria-hidden="true"></i>
                        </button>
                      </div>
                      {touched.newpayeraltpractnpi &&
                      errors.newpayeraltpractnpi ? (
                        <p className="form-error mx-2">
                          *{errors.newpayeraltpractnpi}
                        </p>
                      ) : null}
                    </div>

                    {/* <NPI_REGISTRY_MODAL
                   
                  /> */}
                    {/* ********************* 1st Modal Start (NPI Registry Input Fields) ********************* */}
                    <div
                      className="modal fade text-dark"
                      id="NPIRegistryModaltriggerinPayer"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      aria-hidden="true"
                      aria-labelledby="NPIRegistryModaltriggerinPayer"
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
                                      <label
                                        className="form-check-label"
                                        htmlFor="npi_any"
                                      >
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
                                      <label
                                        className="form-check-label"
                                        htmlFor="npi_org"
                                      >
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
                                    // value={values?.NPIfirstname.replace(
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
                                    // value={values?.NPIlastname.replace(
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
                                  // value={values?.NPIorganizationname.toUpperCase()}
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
                                  // value={values?.NPItaxonomyname.toUpperCase()}
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
                                      onChange={(e) =>
                                        setcitydata(e.target.value)
                                      }
                                      // onChange={handleChange}
                                      // onBlur={handleBlur}
                                      // value={values?.NPIcity.toUpperCase()}
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
                                      onChange={(e) =>
                                        setSearch(e.target.value)
                                      }
                                      // onChange={handleChange}
                                      // onBlur={handleBlur}
                                      // value={values?.NPIstate.toUpperCase()}
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
                                      onChange={(e) =>
                                        setzipdata(e.target.value?.trim())
                                      }

                                      // onChange={handleChange}
                                      // onBlur={handleBlur}
                                      // value={values?.NPIzipcode.toUpperCase()}
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
                            <div
                              className="table-responsive"
                              style={{ height: "300px" }}
                            >
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
                                                    .includes(
                                                      citydata?.toLowerCase()
                                                    ) ||
                                                    item?.[1]
                                                      ?.toString()
                                                      .toLowerCase()
                                                      .includes(
                                                        citydata?.toLowerCase()
                                                      ) ||
                                                    item?.[2]
                                                      ?.toString()
                                                      .toLowerCase()
                                                      .includes(
                                                        citydata?.toLowerCase()
                                                      ) ||
                                                    item?.[3]
                                                      ?.toString()
                                                      .toLowerCase()
                                                      .includes(
                                                        citydata?.toLowerCase()
                                                      );
                                            })
                                            ?.map((pract, i) => {
                                              return (
                                                <tr
                                                  {...pract}
                                                  className="table-active practice-font"
                                                  key={i}
                                                  data-bs-dismiss="modal"
                                                  onClick={() => {
                                                    setNPI_Payer_Value(
                                                      pract?.[1]
                                                    );
                                                    pract?.[1];
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
                                                      .includes(
                                                        zipdata?.toLowerCase()
                                                      ) ||
                                                      item?.[1]
                                                        ?.toString()
                                                        .toLowerCase()
                                                        .includes(
                                                          zipdata?.toLowerCase()
                                                        ) ||
                                                      item?.[2]
                                                        ?.toString()
                                                        .toLowerCase()
                                                        .includes(
                                                          zipdata?.toLowerCase()
                                                        ) ||
                                                      item?.[3]
                                                        ?.toString()
                                                        .toLowerCase()
                                                        .includes(
                                                          zipdata?.toLowerCase()
                                                        );
                                              })
                                              ?.map((pract, i) => {
                                                return (
                                                  <tr
                                                    {...pract}
                                                    data-bs-dismiss="modal"
                                                    className="table-active practice-font"
                                                    key={i}
                                                    onClick={() => {
                                                      setNPI_Payer_Value(
                                                        pract?.[1]
                                                      );
                                                      pract?.[1];
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
                                                    .includes(
                                                      citydata?.toLowerCase()
                                                    ) ||
                                                    item?.[1]
                                                      ?.toString()
                                                      .toLowerCase()
                                                      .includes(
                                                        citydata?.toLowerCase()
                                                      ) ||
                                                    item?.[2]
                                                      ?.toString()
                                                      .toLowerCase()
                                                      .includes(
                                                        citydata?.toLowerCase()
                                                      ) ||
                                                    item?.[3]
                                                      ?.toString()
                                                      .toLowerCase()
                                                      .includes(
                                                        citydata?.toLowerCase()
                                                      );
                                            })
                                            ?.map((pract, i) => {
                                              return (
                                                <tr
                                                  {...pract}
                                                  className="table-active practice-font"
                                                  key={i}
                                                  data-bs-dismiss="modal"
                                                  onClick={() => {
                                                    setNPI_Payer_Value(
                                                      pract?.[1]
                                                    );
                                                    pract?.[1];
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
                                                      .includes(
                                                        zipdata?.toLowerCase()
                                                      ) ||
                                                      item?.[1]
                                                        ?.toString()
                                                        .toLowerCase()
                                                        .includes(
                                                          zipdata?.toLowerCase()
                                                        ) ||
                                                      item?.[2]
                                                        ?.toString()
                                                        .toLowerCase()
                                                        .includes(
                                                          zipdata?.toLowerCase()
                                                        ) ||
                                                      item?.[3]
                                                        ?.toString()
                                                        .toLowerCase()
                                                        .includes(
                                                          zipdata?.toLowerCase()
                                                        );
                                              })
                                              ?.map((pract, i) => {
                                                return (
                                                  <tr
                                                    {...pract}
                                                    data-bs-dismiss="modal"
                                                    className="table-active practice-font"
                                                    key={i}
                                                    onClick={() => {
                                                      setNPI_Payer_Value(
                                                        pract?.[1]
                                                      );
                                                      pract?.[1];
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
                                                    .includes(
                                                      citydata?.toLowerCase()
                                                    ) ||
                                                    item?.[1]
                                                      ?.toString()
                                                      .toLowerCase()
                                                      .includes(
                                                        citydata?.toLowerCase()
                                                      ) ||
                                                    item?.[2]
                                                      ?.toString()
                                                      .toLowerCase()
                                                      .includes(
                                                        citydata?.toLowerCase()
                                                      ) ||
                                                    item?.[3]
                                                      ?.toString()
                                                      .toLowerCase()
                                                      .includes(
                                                        citydata?.toLowerCase()
                                                      );
                                            })
                                            ?.map((pract, i) => {
                                              return (
                                                <tr
                                                  {...pract}
                                                  className="table-active practice-font"
                                                  key={i}
                                                  data-bs-dismiss="modal"
                                                  onClick={() => {
                                                    setNPI_Payer_Value(
                                                      pract?.[1]
                                                    );
                                                    pract?.[1];
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
                                                      .includes(
                                                        zipdata?.toLowerCase()
                                                      ) ||
                                                      item?.[1]
                                                        ?.toString()
                                                        .toLowerCase()
                                                        .includes(
                                                          zipdata?.toLowerCase()
                                                        ) ||
                                                      item?.[2]
                                                        ?.toString()
                                                        .toLowerCase()
                                                        .includes(
                                                          zipdata?.toLowerCase()
                                                        ) ||
                                                      item?.[3]
                                                        ?.toString()
                                                        .toLowerCase()
                                                        .includes(
                                                          zipdata?.toLowerCase()
                                                        );
                                              })
                                              ?.map((pract, i) => {
                                                return (
                                                  <tr
                                                    {...pract}
                                                    data-bs-dismiss="modal"
                                                    className="table-active practice-font"
                                                    key={i}
                                                    onClick={() => {
                                                      setNPI_Payer_Value(
                                                        pract?.[1]
                                                      );
                                                      pract?.[1];
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
                                                    .includes(
                                                      citydata?.toLowerCase()
                                                    ) ||
                                                    item?.[1]
                                                      ?.toString()
                                                      .toLowerCase()
                                                      .includes(
                                                        citydata?.toLowerCase()
                                                      ) ||
                                                    item?.[2]
                                                      ?.toString()
                                                      .toLowerCase()
                                                      .includes(
                                                        citydata?.toLowerCase()
                                                      ) ||
                                                    item?.[3]
                                                      ?.toString()
                                                      .toLowerCase()
                                                      .includes(
                                                        citydata?.toLowerCase()
                                                      );
                                            })
                                            ?.map((pract, i) => {
                                              return (
                                                <tr
                                                  {...pract}
                                                  className="table-active practice-font"
                                                  key={i}
                                                  data-bs-dismiss="modal"
                                                  onClick={() => {
                                                    setNPI_Payer_Value(
                                                      pract?.[1]
                                                    );
                                                    pract?.[1];
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
                                                      .includes(
                                                        zipdata?.toLowerCase()
                                                      ) ||
                                                      item?.[1]
                                                        ?.toString()
                                                        .toLowerCase()
                                                        .includes(
                                                          zipdata?.toLowerCase()
                                                        ) ||
                                                      item?.[2]
                                                        ?.toString()
                                                        .toLowerCase()
                                                        .includes(
                                                          zipdata?.toLowerCase()
                                                        ) ||
                                                      item?.[3]
                                                        ?.toString()
                                                        .toLowerCase()
                                                        .includes(
                                                          zipdata?.toLowerCase()
                                                        );
                                              })
                                              ?.map((pract, i) => {
                                                return (
                                                  <tr
                                                    {...pract}
                                                    data-bs-dismiss="modal"
                                                    className="table-active practice-font"
                                                    key={i}
                                                    onClick={() => {
                                                      setNPI_Payer_Value(
                                                        pract?.[1]
                                                      );
                                                      pract?.[1];
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
                              data-bs-target="#NPIRegistryModaltriggerinPayer"
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
                    <div
                      className="modal fade text-dark"
                      id="taxonomyspecmodal"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      aria-hidden="true"
                      aria-labelledby="taxonomyspecmodal"
                      tabIndex={-1}
                    >
                      <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="col-md-12">
                              <label className="fw-bold">Search Taxonomy</label>
                              <input
                                className="form-control form-control-sm"
                                placeholder="filter Codes"
                                onChange={(e) => setSearchTax(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="modal-body">
                            {/* ********* First Modal Input Fields ********* */}
                            {loadingtax ? (
                              "loading..."
                            ) : (
                              <div
                                className="table-responsive"
                                style={{ height: "300px", overflowX: "hidden" }}
                              >
                                <table className="table table-hover table-striped table table-bordered">
                                  <thead>
                                    <tr>
                                      <th>Speciality Name</th>
                                      <th>Code</th>
                                      <th>Description</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {TaxData?.filter((items) => {
                                      return searchTax === ""
                                        ? items
                                        : items?.specialty_name
                                            ?.toLowerCase()
                                            ?.includes(
                                              searchTax?.toLowerCase()
                                            ) ||
                                            items?.taxo_code
                                              ?.toLowerCase()
                                              ?.includes(
                                                searchTax?.toLowerCase()
                                              ) ||
                                            items?.Description?.toLowerCase()?.includes(
                                              searchTax?.toLowerCase()
                                            );
                                      // ||
                                      // items?.id?.includes(search);
                                    })?.map((taxo, i) => {
                                      return (
                                        <tr
                                          data-bs-dismiss="modal"
                                          className="practice-font rowhover"
                                          key={i}
                                          {...taxo}
                                          onClick={() => {
                                            setPayerstaxo_facility(
                                              taxo?.taxo_code
                                            );
                                            setPayerstaxo_fac_desc(
                                              taxo?.Description
                                            );
                                            setPayerstaxo_fac_id(taxo?.id);
                                          }}
                                        >
                                          <td>{taxo?.specialty_name}</td>
                                          <td>{taxo?.taxo_code}</td>
                                          <td>{taxo?.Description}</td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            )}

                            {/* ********* End First Modal Input Fields ********* */}
                          </div>
                          <div className="modal-footer">
                            {/* <Button
              variant="outline-primary btn-sm"
              onClick={props.closeTaxonomy_Spec_Modal}
            >
              Select
            </Button> */}
                            <Button
                              variant="outline-danger btn-sm"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-5">
                          <label className="mt-0 text-dark">Taxonomy</label>
                          <div className="input-group">
                            <input
                              className="form-control form-control-sm placeTextTax"
                              type="text"
                              placeholder="Taxonomy Speciality"
                              aria-label="npi"
                              id="newpayeraltpracttaxonomySpeciality"
                              name="newpayeraltpracttaxonomySpeciality"
                              autoComplete="off"
                              autoCapitalize="characters"
                              autoCorrect="off"
                              spellCheck="false"
                              style={{ cursor: "pointer" }}
                              data-bs-toggle="modal"
                              data-bs-target="#taxonomyspecmodal"
                              value={Payerstaxo_facility}
                              maxLength={10}
                              required={showUseraltpractinfo}
                            />
                            <button
                              type="button"
                              className="input-group-text btn-hov"
                              id="newpayeraltpracttaxonomyspecbtn"
                              data-bs-toggle="modal"
                              data-bs-target="#taxonomyspecmodal"
                            >
                              <i
                                className="fas fa-search"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </div>
                        </div>

                        {touched.newpayeraltpracttaxonomySpeciality &&
                        errors.newpayeraltpracttaxonomySpeciality ? (
                          <p className="form-error mx-2">
                            *{errors.newpayeraltpracttaxonomySpeciality}
                          </p>
                        ) : null}
                        <div className="col-md-6 mt-3">
                          {Payerstaxo_fac_desc}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* End of Alt Pract Info  */}
      </div>
      {/* *********************************** */}
      <Modal
        scrollable={true}
        backdrop="static"
        keyboard={false}
        tabIndex="-1"
        centered
        show={showClearingHouseModal}
        onHide={closeClearingHouseModal}
      >
        <Modal.Body>
          Would you like to configure a Clearinghouse connections for this
          payer?
        </Modal.Body>
        <Modal.Footer>
          <Button
            data-bs-dismiss="model"
            variant="outline-primary btn-sm"
            onClick={() => toggleModal()}
          >
            Yes
          </Button>
          <Button
            variant="outline-danger btn-sm"
            onClick={closeClearingHouseModal}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
      {/* *********************************** */}

      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Master Payer Search
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mt-0 mb-2">
            {" "}
            <input
              className="form-control form-control-sm"
              autoFocus
              type="text"
              placeholder="Search by Payer ID or name"
              aria-label="Search"
              id="masterpayersearch"
              onChange={(e) => setMasterPayerSearch(e.target.value?.toString())}
            />
          </div>

          <div className="table-responsive" style={{ height: "300px" }}>
            {loadpayerlist ? (
              "loading..."
            ) : (
              <table className="table table-light table-hover table-striped table table-bordered">
                <thead>
                  <tr>
                    <th>Payer ID</th>
                    <th>Payer Name</th>
                  </tr>
                </thead>

                <tbody>
                  {payerlist
                    ?.filter((items) => {
                      return searchmasterpayer === ""
                        ? items
                        : items?.id
                            ?.toLowerCase()
                            ?.includes(searchmasterpayer?.toLowerCase()) ||
                            items?.name
                              ?.toLowerCase()
                              ?.includes(searchmasterpayer?.toLowerCase());
                    })
                    ?.map((pay, i) => {
                      return (
                        <tr
                          onClick={() => {
                            setModalShow(false);
                            setpayername(pay?.name);
                            setpayerID_clearinghouse(pay?.id);
                          }}
                          key={i}
                          {...pay}
                        >
                          <td>{pay?.id}</td>
                          <td>{pay?.name}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}
          </div>
          {/* <label>Name</label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="masterpayersearch"
            name="masterpayersearch"
            placeholder=""
            autoComplete="off"
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck="false"
            autoFocus
            onChange={handleChange}
            value={values?.masterpayersearch.trimStart().toUpperCase()}
            onBlur={handleBlur}
            maxLength={60}
          />

          <div className="form-check mt-1">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="serachfromstart"
            />
            <label className="form-check-label" htmlFor="serachfromstart">
              Search from the start of the name
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="serachfromany"
              defaultChecked
            />
            <label className="form-check-label" htmlFor="serachfromany">
              Search from anywhere in name
            </label>
          </div>

          <div className="col-md-6 mt-3">
            <label>Payer ID</label>
            <input
              type="text"
              className="form-control form-control-sm placeText"
              id="masterpayersearchpayerid"
              placeholder="Payer ID"
              name="masterpayersearchpayerid"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              maxLength="15"
              onChange={handleChange}
              value={values?.masterpayersearchpayerid.trimStart()}
              onBlur={handleBlur}
            />
          </div>

          <div className="mt-4">
            <label>Electronic Remittance Advice Support</label>
            <div className="col-md-4">
              <select
                defaultValue={Object.values(ERAsuppdata[2]).toString()}
                className="form-select form-select-sm"
              >
                {ERAsuppdata?.map((era, i) => {
                  return (
                    <option key={i} {...era} value={era.text}>
                      {era.text}
                    </option>
                  );
                })}
              </select>
            </div>
          </div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary btn-sm">Search</Button>
          <Button
            variant="outline-danger btn-sm"
            onClick={() => setModalShow(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {/* *********************************** */}

      {/* ** Clearinghouse conn, Notes, Alerts, Tasks and Billing Opt Fields Start ** */}
      <div
        className="col-md-6"
        style={{ overflowY: "scroll", height: "calc(100vh - 127px)" }}
      >
        {/* Start of Clearinghouse Connection Accord */}
        <Accordion defaultActiveKey={"0"}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Clearinghouse Connection</Accordion.Header>
            <Accordion.Body>
              <div className="col-md-12 input-group">
                <input
                  className="form-control form-control-sm"
                  type="search"
                  placeholder="Clearinghouse Connection"
                  aria-label="Search"
                  onMouseDown={() => toggleModal()}
                />
                <Button
                  variant="outline-info btn-sm"
                  onClick={() => toggleModal()}
                >
                  <i className="fa fa-search"></i>
                </Button>
              </div>
              <div className="mb-5">
                <div className="col-md-12 mt-3 ">
                  {payerID_clearinghouse ? (
                    <FaCheckCircle
                      style={{
                        color: "green",
                        // textShadow: "1px 1px 1px #ccc",
                        fontSize: "1.2em",
                        marginLeft: "-3px",
                      }}
                    />
                  ) : (
                    <FaTimes
                      style={{
                        color: "red",
                        // textShadow: "1px 1px 1px #ccc",
                        fontSize: "1.2em",
                        marginLeft: "-3px",
                      }}
                    />
                  )}
                  {/* <i
                    className="fa fa-times"
                    style={{
                      color: "red",
                      textShadow: "1px 1px 1px #ccc",
                      fontSize: "1.3em",
                    }}
                  ></i> */}
                  &nbsp; Payer ID <br />
                  <span className="mx-0"> {payerID_clearinghouse}</span>
                </div>

                <div className="col-md-12 mt-3 ">
                  <i
                    className="fa fa-times"
                    style={{
                      color: "red",
                      textShadow: "1px 1px 1px #ccc",
                      fontSize: "1.3em",
                    }}
                  ></i>
                  &nbsp;&nbsp;Clearinghouse ID
                </div>

                <div className="col-md-12 mt-3 ">
                  <i
                    className="fa fa-times"
                    style={{
                      color: "red",
                      textShadow: "1px 1px 1px #ccc",
                      fontSize: "1.3em",
                    }}
                  ></i>
                  &nbsp;&nbsp;Professional Claims
                </div>

                <div className="col-md-12 mt-3 ">
                  <i
                    className="fa fa-times"
                    style={{
                      color: "red",
                      textShadow: "1px 1px 1px #ccc",
                      fontSize: "1.3em",
                    }}
                  ></i>
                  &nbsp;&nbsp;Institutional Claims
                </div>

                <div className="col-md-12 mt-3 ">
                  <i
                    className="fa fa-times"
                    style={{
                      color: "red",
                      textShadow: "1px 1px 1px #ccc",
                      fontSize: "1.3em",
                    }}
                  ></i>
                  &nbsp;&nbsp;Eligibility
                </div>

                <div className="col-md-12 mt-3 ">
                  <i
                    className="fa fa-times"
                    style={{
                      color: "red",
                      textShadow: "1px 1px 1px #ccc",
                      fontSize: "1.3em",
                    }}
                  ></i>
                  &nbsp;&nbsp;Claim Status
                </div>

                <div className="col-md-12 mt-3 ">
                  <i
                    className="fa fa-times"
                    style={{
                      color: "red",
                      textShadow: "1px 1px 1px #ccc",
                      fontSize: "1.3em",
                    }}
                  ></i>
                  &nbsp;&nbsp;Electronic Remittance Advice (ERA)
                </div>
                <div className="col-md-12 mt-3 ">
                  <i
                    className="fa fa-times"
                    style={{
                      color: "red",
                      textShadow: "1px 1px 1px #ccc",
                      fontSize: "1.3em",
                    }}
                  ></i>
                  &nbsp;&nbsp;Accepts Secondary Electronic Claims
                </div>
                <div className="col-md-12 mt-3 ">
                  <i
                    className="fa fa-times"
                    style={{
                      color: "red",
                      textShadow: "1px 1px 1px #ccc",
                      fontSize: "1.3em",
                    }}
                  ></i>
                  &nbsp;&nbsp;Electronic Claim Attachments{" "}
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          {/* End of Clearinghouse Connection Accord */}

          {/* Start of Notes, Alerts, Tasks and Billing Opt Fields */}
          <NewPayerMisc PayerNotesTextChange={PayerNotesTextChange} />
          {/* End of Notes, Alerts, Tasks and Billing Opt Fields */}
        </Accordion>
      </div>
    </form>
  );
}
