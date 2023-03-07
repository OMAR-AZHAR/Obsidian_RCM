import { lazy, useCallback, useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Form,
  OverlayTrigger,
  Popover,
  Modal,
  Tab,
  Tabs,
  Tooltip,
} from "react-bootstrap";
const PLACE_OF_SERVICE_MODAL = lazy(() =>
  import("../../../GLOBAL/NPI_TAX_PLACE/PLACE_OF_SERVICE")
);
import {
  getEditPayersZipCode,
  getEditPayersZipCode2,
  PayersEditCityZipSliceFetch,
  PayersEditCityZipSliceFetch2,
} from "../../../Redux/features/Payer_Redux/PayersCityZipSlice";
import useGet from "../../../Hooks/useGet";
import useFetch from "../../../Hooks/useFetch";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { EditPayerFetch } from "../../../Redux/features/Payer_Redux/EditablePayerSlice";
import { Link } from "react-router-dom";
import { PatternFormat } from "react-number-format";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import API from "../../../Api/ClientApi";

import { NewPayersFormValidation } from "./NewPayersFormValidation";

import { Alert } from "./../../../GLOBAL/SwalAlert";
import { useSelector, useDispatch } from "react-redux";

export default function EditablePayers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  // Set Payer Type Select Data from APIs

  const { data: payertypedata } = useFetch("customersetup/payer/payertype");
  const { data: TaxData, loading: loadingtax } = useFetch(
    "customersetup/practice/taxonomyapi"
  );
  const { data: payerlist, loading: loadpayerlist } = useFetch(
    "customersetup/payer/payerlist"
  );
  const [electronicaddresscheck, setelectronicaddresscheck] = useState(
    "Pay-To Address (Loop 2010AB)"
  );

  // Clearinghouse Processing Mode Select Field
  const { data: CPM } = useFetch("customersetup/payer/processingmode");
  const [searchTax, setSearchTax] = useState("");

  const [individual_checked, setIndividualChecked] = useState(false);
  const [organization_checked, setOrgChecked] = useState(true);
  const [any_checked, setAnyChecked] = useState(false);
  const [search, setSearch] = useState("");
  const [citydata, setcitydata] = useState("");
  const [zipdata, setzipdata] = useState("");

  const [payerID_clearinghouse, setpayerID_clearinghouse] = useState("");
  const [searchmasterpayer, setMasterPayerSearch] = useState("");

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
  //   // *** ------------ Start of Notes, Alerts, Misc *** ------------ //
  const [showPlace_of_Service, setShowPlace_of_Service] = useState(false);
  const closePlace_of_Service_Modal = () => setShowPlace_of_Service(false);
  const checkbox_second = [
    {
      checked: null,
      value: "",
      label: "Do NOT print the payer address on the top of the form",
    },
    {
      checked: null,
      value: "",
      label: "Exclude patient payments from Box 29",
    },
    {
      checked: null,
      value: "",
      label: "Print the license number in Box 31",
    },
  ];
  const checkboxes = [
    {
      checked: null,
      value: "",
      label: "Automatically set Follow Up Date when billing to this payer",
    },
    {
      checked: null,
      value: "",
      label: "Use the provider name as the pay-to name",
    },
    {
      checked: null,
      value: "",
      label: "Only send the pay-to address",
    },
    {
      checked: null,
      value: "",
      label: "Use the office address as the pay-to address",
    },
    {
      checked: null,
      value: "",
      label: "Print CMS-1500 as NY Workers Compensation Form",
    },
    {
      checked: null,
      value: "",
      label: "Override billing provider with rendering provider",
    },
  ];
  const box21select = [
    { value: "Provider Name" },
    { value: "Signature on File" },
    { value: "Practice Name" },
    { value: "Leave Blank" },
  ];
  const checkboxes_third = [
    {
      checked: null,
      value: "",
      label: "Print ICD code for first diagnosis pointer in Box 24E",
    },
    {
      checked: null,
      value: "",
      label: "Send minutes instead of units on anesthesia claims",
    },
    {
      checked: null,
      value: "",
      label: "Send anesthesia start/stop times in a line note",
    },
  ];

  const checkboxes_fourth = [
    {
      checked: null,
      value: "",
      label: "Print referring physician in Box 76",
    },
    {
      checked: null,
      value: "",
      label: "Print Taxonomy Code in Box 76",
    },
    {
      checked: true,
      value: "",
      label: "Print Taxonomy Code in Box 81CC a",
    },
  ];
  const box38select = [
    { value: "Print insured's address" },
    { value: "Print payer's address" },
    { value: "Leave Blank" },
  ];
  const box80select = [
    { value: "Print insured's address" },
    { value: "Print payer's address" },
    { value: "Print remarks" },
  ];
  const prov_popover = (
    <Popover className="popover" id="popover-customize-providers">
      <Popover.Body>
        <label>Provider(s)</label>
        <Form.Select size="sm" aria-label="Providers" required>
          <option value="">Providers</option>
        </Form.Select>
        <div className="row">
          <div className="col-md-6">
            <label>Status</label>
            <Form.Select size="sm" aria-label="Status">
              <option value="">Active</option>
              <option value="">Inactive</option>
            </Form.Select>
          </div>

          <div className="col-md-6">
            <label htmlFor="" />
            <input
              className="form-control form-control-sm mt-0"
              type="text"
              placeholder="Individual ID"
              maxLength={20}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label>Bill Mode</label>
            <Form.Select size="sm" aria-label="Default select example">
              <option value="">Default</option>
              <option value="">Individual</option>
              <option value="">Group</option>
            </Form.Select>
          </div>

          <div className="col-md-6">
            <label htmlFor="" />
            <input
              className="form-control form-control-sm mt-0"
              type="text"
              placeholder="Group ID"
              maxLength={20}
            />
          </div>
        </div>

        <div className="form-check mt-2">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="acceptInsurance"
            defaultChecked={true}
          />
          <label className="form-check-label" htmlFor="acceptInsurance">
            Accept this Insurance
          </label>
        </div>
      </Popover.Body>
      <span className="d-flex justify-content-end mb-2 mx-2">
        <Button variant="outline-primary btn-sm" type="submit">
          Add
        </Button>
        &nbsp;&nbsp;
        <Button
          variant="outline-danger btn-sm"
          onClick={() => document.body.click()}
        >
          Cancel
        </Button>
      </span>
    </Popover>
  );
  // *** ------------ End of Notes, Alerts, Misc *** ------------ //
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

  // Master Payer Search Model ERA Support Select field options
  const ERAsuppdata = [{ text: "Yes" }, { text: "No" }, { text: "Any" }];

  // For Clearing House Modal (disable on Default in Edit Form)
  const [showClearingHouseModal, setShowClearingHouseModal] = useState(false);
  const closeClearingHouseModal = () => setShowClearingHouseModal(false);

  const [modalShow, setModalShow] = useState(false);
  const toggleModal = () => {
    setModalShow(true);
    setShowClearingHouseModal(false);
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
    (state) => state.PayersCityStateZip?.edit_zipcode1?.ZipCode?.Zip5
  );
  const zipapiCity = useSelector(
    (state) => state.PayersCityStateZip?.edit_zipcode1?.ZipCode?.City
  );
  const zipapiState = useSelector(
    (state) => state.PayersCityStateZip?.edit_zipcode1?.ZipCode?.State
  );
  // for p2 address
  const zipapi2 = useSelector(
    (state) => state.PayersCityStateZip?.edit_zipcode2?.ZipCode?.Zip5
  );
  const zipapiCity2 = useSelector(
    (state) => state.PayersCityStateZip?.edit_zipcode2?.ZipCode?.City
  );
  const zipapiState2 = useSelector(
    (state) => state.PayersCityStateZip?.edit_zipcode2?.ZipCode?.State
  );
  // ------------------* Data From Redux Thunk Start *------------------
  const id = useSelector((state) => state.EditablePayer?.data?.[0]?.id);
  const payer_type_id = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.payer_type_id
  );
  const payer_name = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.payer_name
  );
  const plan_name = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.plan_name
  );
  const network_status = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.network_status
  );
  const charging_status = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.charging_status
  );
  const clearing_processing_mode_id = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.clearing_processing_mode_id
  );
  const reference = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.reference
  );
  const address1 = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.address1
  );
  const address2 = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.address2
  );
  const city = useSelector((state) => state.EditablePayer?.data?.[0]?.city);
  const state = useSelector((state) => state.EditablePayer?.data?.[0]?.state);

  const zip = useSelector((state) => state.EditablePayer?.data?.[0]?.zip);
  const phone = useSelector((state) => state.EditablePayer?.data?.[0]?.phone);
  const email = useSelector((state) => state.EditablePayer?.data?.[0]?.email);
  const fax = useSelector((state) => state.EditablePayer?.data?.[0]?.fax);

  const website = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.website
  );
  const group_no = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.group_no
  );
  const claim_ofc_no = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.claim_ofc_no
  );
  const payer_id = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.payer_id
  );

  const ocna = useSelector((state) => state.EditablePayer?.data?.[0]?.ocna);
  const alternate_practice_information = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.alternate_practice_information
  );
  const electronic_claim_address = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.electronic_claim_address
  );
  const pay_name = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.pay_name
  );

  const pay_address1 = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.pay_address1
  );
  const pay_address2 = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.pay_address2
  );
  const pay_city = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.pay_city
  );
  const pay_state = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.pay_state
  );

  const pay_zip = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.pay_zip
  );
  const pay_tax_id = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.pay_tax_id
  );
  const pay_npi_code = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.pay_npi_code
  );
  //   Inactive Payer Status
  const payer_status = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.payer_status
  );
  const seq = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.payer_status
  );
  const pay_notes = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.notes?.note
  );
  const tax_code = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.taxonomy_code?.taxo_code
  );
  const tax_desc = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.taxonomy_code?.Description
  );
  const tax_ID = useSelector(
    (state) => state.EditablePayer?.data?.[0]?.taxonomy_code?.id
  );
  // ------------------* Data From Redux Thunk End *------------------

  // for toggling alternate practice info tabs
  const [showUseraltpractinfo, setShowUseraltpractinfo] = useState(false);
  const [checked, setchecked] = useState(false);
  const Usealtpractinfo = () => {
    showUseraltpractinfo === true
      ? setShowUseraltpractinfo(false)
      : setShowUseraltpractinfo(true);

    checked === true ? setchecked(false) : setchecked(true);
  };
  // ------------------* Start of Setting States *------------------
  const [newpayername, setpayername] = useState("");
  const [payerplan, setPayerPlan] = useState("");
  const [PayerID, setPayerID] = useState(1);
  const [Payerstaxo_facility, setPayerstaxo_facility] = useState("");
  const [Payerstaxo_fac_desc, setPayerstaxo_fac_desc] = useState("");
  const [Payerstaxo_fac_id, setPayerstaxo_fac_id] = useState("");
  const [NetworkStatus, setNetworkStatus] = useState(null);
  const [CPMmode, setCPMMode] = useState(1);
  const [DefaultStatus, setDefaultStatus] = useState("");
  const [NPI_Payer_Value, setNPI_Payer_Value] = useState("");
  const [payerNotes, setPayerNotes] = useState("");

  const [newpayerreference, setnewpayerreference] = useState("");
  const [newpayeraddress, setnewpayeraddress] = useState("");
  const [newpayeraddress2, setnewpayeraddress2] = useState("");
  const [newpayerphone, setnewpayerphone] = useState("");
  const [newpayerfax, setnewpayerfax] = useState("");
  const [newpayeremail, setnewpayeremail] = useState("");
  const [newpayerwebsite, setnewpayerwebsite] = useState("");
  const [newpayergroupnumber, setnewpayergroupnumber] = useState("");
  const [newpayerclaimoffice, setnewpayerclaimoffice] = useState("");
  const [newpayerID_medigap, setnewpayerID_medigap] = useState("");
  const [newpayerocna, setnewpayerocna] = useState("");
  const [newpayeraltpractname, setnewpayeraltpractname] = useState("");
  const [newpayeraltpractaddress, setnewpayeraltpractaddress] = useState("");
  const [newpayeraltpractaddress2, setnewpayeraltpractaddress2] = useState("");
  const [newpayeraltpracttaxid, setnewpayeraltpracttaxid] = useState("");

  const [newpayersequence, setnewpayersequence] = useState("");
  const [PayerInactive, SetPayerInactive] = useState(false);
  // ------------------* End of Setting States *------------------
  // Set Zip API for Primary Office

  const [zipapicode, setzipapicode] = useState("");
  const [zipapi_city, setzipapi_city] = useState("");
  const [zipapi_state, setzipapi_state] = useState("");

  // Set Api for pay to address
  const [zipapicode2, setzipapicode2] = useState("");
  const [zipapi_city2, setzipapi_city2] = useState("");
  const [zipapi_state2, setzipapi_state2] = useState("");

  useEffect(() => {
    if (params.id) {
      dispatch(EditPayerFetch(params.id));
    }
    setpayername(payer_name ? payer_name : "");
    setPayerPlan(plan_name ? plan_name : "");
    setPayerID(payer_type_id ? payer_type_id : "");
    setNetworkStatus(network_status === 0 ? 0 : 1);
    setDefaultStatus(charging_status ? charging_status : "");
    setCPMMode(clearing_processing_mode_id ? clearing_processing_mode_id : "");
    setnewpayersequence(seq ? seq : "");
    setnewpayerreference(reference ? reference : "");
    setnewpayeraddress(address1 ? address1 : "");
    setnewpayeraddress2(address2 ? address2 : "");
    setnewpayerphone(phone ? phone : "");
    setnewpayerfax(fax ? fax : "");
    setnewpayeremail(email ? email : "");
    setnewpayerwebsite(website ? website : "");
    // ID Numbers (Section)
    setnewpayergroupnumber(group_no ? group_no : "");
    setnewpayerclaimoffice(claim_ofc_no ? claim_ofc_no : "");
    setnewpayerID_medigap(payer_id ? payer_id : "");
    setnewpayerocna(ocna ? ocna : "");
    // Alternate Pract Info
    setShowUseraltpractinfo(alternate_practice_information ? true : false);
    setchecked(Boolean(alternate_practice_information));

    setelectronicaddresscheck(
      electronic_claim_address
        ? electronic_claim_address
        : electronicaddresscheck
    );
    setPayerNotes(pay_notes ? pay_notes : "");
    setnewpayeraltpractname(pay_name ? pay_name : "");
    setnewpayeraltpractaddress(pay_address1 ? pay_address1 : "");
    setnewpayeraltpractaddress2(pay_address2 ? pay_address2 : "");
    setnewpayeraltpracttaxid(pay_tax_id ? pay_tax_id : "");
    setNPI_Payer_Value(pay_npi_code ? pay_npi_code : "");
    setPayerstaxo_facility(tax_code ? tax_code : Payerstaxo_facility);
    setPayerstaxo_fac_desc(tax_desc ? tax_desc : Payerstaxo_fac_desc);
    setPayerstaxo_fac_id(tax_ID ? tax_ID : Payerstaxo_fac_id);
    SetPayerInactive(payer_status === 1 ? true : false);
    // City State Data
    // setzipapicode(zipapi ? zipapi : zip);
    // setzipapi_city(zipapiCity ? zipapiCity : city);
    // setzipapi_state(zipapiState ? zipapiState : state);

    // setzipapicode2(zipapi2 ? zipapi2 : pay_zip);
    // setzipapi_city2(zipapiCity2 ? zipapiCity2 : pay_city);
    // setzipapi_state2(zipapiState2 ? zipapiState2 : pay_state);
  }, [
    params,
    zip,
    city,
    state,
    pay_zip,
    pay_city,
    pay_state,
    payer_type_id,
    payer_name,
    plan_name,
    network_status,
    charging_status,
    clearing_processing_mode_id,
    reference,
    address1,
    address2,
    // zipapi,
    // zipapiCity,
    // zipapiState,
    // zipapi2,
    // zipapiCity2,
    // zipapiState2,
    email,
    fax,
    website,
    group_no,
    claim_ofc_no,
    payer_id,
    ocna,
    alternate_practice_information,

    electronic_claim_address,
    pay_name,
    pay_address1,
    pay_address2,
    pay_notes,
    pay_tax_id,
    pay_npi_code,
    payer_status,
    tax_code,
    tax_desc,
    tax_ID,
    // notes ? notes : "",
  ]);

  useEffect(() => {
    let b = true;
    setzipapicode(zipapi ? zipapi : zip);
    setzipapi_city(zipapiCity ? zipapiCity : city);
    setzipapi_state(zipapiState ? zipapiState : state);
    return () => {
      b = false;
    };
  }, [zipapi, id]);
  useEffect(() => {
    let c = true;

    setzipapicode2(zipapi2 ? zipapi2 : pay_zip);
    setzipapi_city2(zipapiCity2 ? zipapiCity2 : pay_city);
    setzipapi_state2(zipapiState2 ? zipapiState2 : pay_state);
    return () => {
      c = false;
    };
  }, [zipapi2, id]);
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
      API.put(
        `customersetup/payer/update/${id}`,
        {
          newpayername: newpayername?.toString()?.toUpperCase(),
          newpayerplanname: payerplan?.toString()?.toUpperCase()?.trimStart(),
          //   newpayersequence: "NEW",
          newpayerreference: newpayerreference,
          // Contact Info
          newpayeraddress: newpayeraddress?.toString()?.toUpperCase(),
          newpayeraddress2: newpayeraddress2?.toString()?.toUpperCase(),
          newpayercity: zipapi_city?.toString()?.toUpperCase(),
          newpayerstate: zipapi_state?.toString()?.toUpperCase(),
          newpayerzipcode: zipapicode?.toString(),
          newpayerphone: newpayerphone,
          newpayerfax: newpayerfax,
          newpayeremail: newpayeremail,
          newpayerwebsite: newpayerwebsite,
          // ID Numbers
          newpayergroupnumber: newpayergroupnumber,
          newpayerclaimoffice: newpayerclaimoffice,
          newpayerID_medigap: newpayerID_medigap,
          newpayerocna: newpayerocna,
          // Alternate Practice Info
          newpayeraltpractname: newpayeraltpractname?.toString()?.toUpperCase(),
          newpayeraltpractaddress: newpayeraltpractaddress
            ?.toString()
            ?.toUpperCase(),
          newpayeraltpractaddress2: newpayeraltpractaddress2
            ?.toString()
            ?.toUpperCase(),
          newpayeraltpractcity: zipapi_city2?.toString()?.toUpperCase(),
          newpayeraltpractstate: zipapi_state2?.toString()?.toUpperCase(),

          newpayeraltpracttaxid: newpayeraltpracttaxid,
          newpayeraltpractnpi: Number(NPI_Payer_Value),
          newpayeraltpracttaxonomySpeciality: Payerstaxo_fac_id,
          payertypeid: Number(PayerID),
          // Master Payer Search (Clearinghouse)
          //   masterpayersearch: masterpayersearch,
          //   masterpayersearchpayerid: masterpayersearchpayerid,
          altpracticecheck: Number(checked),
          network_status: NetworkStatus,
          CPMmode,
          DefaultStatus,
          electronicaddresscheck,
          Payer_Status: Number(PayerInactive),
          payerNotes,
          newpayeraltpractzipcode: zipapicode2,
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
            Alert(
              "center",
              "success",
              "Payer Updated Successfully",
              false,
              1500
            );
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
    dispatch(getEditPayersZipCode(""));
    dispatch(getEditPayersZipCode2(""));
  }
  return (
    <form className="row d-flex mt-4" onSubmit={handleSubmit} action="post">
      <div
        className="col-md-6 overflow-custom-height"
        // style={{ overflowY: "scroll", height: "calc(100vh - 127px)" }}
      >
        <div className="col-md-12 mb-4">
          <button
            disabled={false}
            type="submit"
            className="btn btn-outline-primary me-2 btn-sm"
          >
            <i className="fas fa-check"></i>&nbsp;Update
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
          <div className="row">
            <div className="col-md-8">
              <label>Name</label>
              <input
                type="text"
                className={`form-control ${newpayername ? "" : "is-invalid"}`}
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
                value={newpayername}
                autoFocus={true}
                maxLength={60}
              />
            </div>
            <div className="col-md-4">
              <div className="form-check mt-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="makefacilityinactive"
                  name="makefacilityinactive"
                  checked={PayerInactive}
                  onChange={(e) => SetPayerInactive(e.target.checked)}
                />
                <label
                  className="form-check-label"
                  htmlFor="makefacilityinactive"
                >
                  Make this payer inactive
                </label>
              </div>
            </div>
          </div>

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
            maxLength={60}
          />
        </div>
        <div className="row">
          <div className="col-md-8 pt-1">
            <label>Payer Type</label>
            <select
              value={PayerID}
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
              value={NetworkStatus}
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
            value={DefaultStatus}
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
              value={newpayersequence}
              //   onChange={(e)=>setnewpayersequence(e.target.value)}
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
              onChange={(e) =>
                setnewpayerreference(
                  e.target.value?.toString()?.trimStart().toUpperCase()
                )
              }
              value={newpayerreference}
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
                    onChange={(e) =>
                      setnewpayeraddress(
                        e.target.value?.toString()?.trimStart().toUpperCase()
                      )
                    }
                    required={true}
                    value={newpayeraddress}
                    maxLength={40}
                  />

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
                    onChange={(e) =>
                      setnewpayeraddress2(
                        e.target.value?.toString()?.trimStart().toUpperCase()
                      )
                    }
                    value={newpayeraddress2
                      ?.toString()
                      .trimStart()
                      .toUpperCase()}
                    maxLength={40}
                  />
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
                            ?.replace(/[^A-Za-z ]/gi, "")
                            .toUpperCase()
                            .trimStart()
                        )
                      }
                      value={zipapi_city
                        ?.replace(/[^A-Za-z ]/gi, "")
                        .toUpperCase()
                        .trimStart()}
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
                        // setFieldValue(
                        //   "newfacilitystate",
                        //   e.target.value,
                        //   true
                        // );
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
                      onBlur={handleBlur}
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
                      mask=""
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
                      value={zipapicode}
                      onChange={(e) => {
                        setzipapicode(
                          e.target.value?.replace(/[^0-9]/gi, "").trim()
                        );
                        (zipapicode.match(/(?<!\d)\d{4}(?!\d)/gm) ||
                          zipapicode.match(/(?<!\d)\d{8}(?!\d)/gm)) &&
                          dispatch(
                            PayersEditCityZipSliceFetch(
                              e.target.value?.replace(/[^0-9]/gi, "").trim()
                            )
                          );
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-12 d-flex mt-3">
                  <div className="col-md-4">
                    <label className="mt-0 text-dark">Phone</label>
                    <PatternFormat
                      format="(###) ###-####"
                      pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                      title="Please Enter a Valid Phone #"
                      mask=""
                      type="text"
                      className="form-control form-control-sm placeText"
                      id="newpayerphone"
                      placeholder="Phone"
                      name="newpayerphone"
                      autoComplete="off"
                      autoCapitalize="characters"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={(e) =>
                        setnewpayerphone(e.target.value?.toString())
                      }
                      value={
                        newpayerphone
                        // .replace(/[^0-9]/gi, "")
                      }
                    />
                  </div>
                  <div className="col-md-4 mx-2">
                    <label className="mt-0 text-dark">Fax</label>
                    <PatternFormat
                      format="(###) ###-####"
                      pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                      title="Please Enter a Valid Fax #"
                      mask=""
                      type="text"
                      className="form-control form-control-sm placeText"
                      id="newpayerfax"
                      placeholder="Fax"
                      name="newpayerfax"
                      autoComplete="off"
                      autoCapitalize="characters"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={(e) =>
                        setnewpayerfax(e.target.value?.toString())
                      }
                      value={newpayerfax}
                    />
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
                      onChange={(e) =>
                        setnewpayeremail(e.target.value?.toString()?.trim())
                      }
                      value={newpayeremail}
                      maxLength={60}
                    />
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
                      onChange={(e) =>
                        setnewpayerwebsite(e.target.value?.toString()?.trim())
                      }
                      value={newpayerwebsite}
                      maxLength={60}
                    />
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
                    onChange={(e) =>
                      setnewpayergroupnumber(
                        e.target.value?.toString()?.trimStart()
                      )
                    }
                    value={newpayergroupnumber}
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
                    onChange={(e) =>
                      setnewpayerclaimoffice(
                        e.target.value?.toString()?.trimStart()
                      )
                    }
                    value={newpayerclaimoffice}
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
                    onChange={(e) =>
                      setnewpayerID_medigap(
                        e.target.value?.toString()?.trimStart()
                      )
                    }
                    value={newpayerID_medigap}
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
                    onChange={(e) =>
                      setnewpayerocna(e.target.value?.toString().trimStart())
                    }
                    value={newpayerocna}
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
                          checked={
                            electronicaddresscheck ===
                            "Pay-To Address (Loop 2010AB)"
                              ? true
                              : false
                          }
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
                          checked={
                            electronicaddresscheck ===
                            "Main Address (Loop 2010AA)"
                              ? true
                              : false
                          }
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
                      onChange={(e) =>
                        setnewpayeraltpractname(
                          e.target.value?.toString().trimStart().toUpperCase()
                        )
                      }
                      value={newpayeraltpractname}
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
                      onChange={(e) =>
                        setnewpayeraltpractaddress(
                          e.target.value?.toString().trimStart().toUpperCase()
                        )
                      }
                      value={newpayeraltpractaddress}
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
                      onChange={(e) =>
                        setnewpayeraltpractaddress2(
                          e.target.value?.toString()?.trimStart()?.toUpperCase()
                        )
                      }
                      value={newpayeraltpractaddress2?.toString()}
                      maxLength={40}
                      // required={showUseraltpractinfo}
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
                        value={zipapicode2}
                        onChange={(e) => {
                          setzipapicode2(
                            e.target.value?.replace(/[^0-9]/gi, "").trim()
                          );
                          (zipapicode2.match(/(?<!\d)\d{4}(?!\d)/gm) ||
                            zipapicode2.match(/(?<!\d)\d{8}(?!\d)/gm)) &&
                            dispatch(
                              PayersEditCityZipSliceFetch2(
                                e.target.value?.replace(/[^0-9]/gi, "").trim()
                              )
                            );
                        }}
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
                        mask=""
                        type="tel"
                        className="form-control form-control-sm placeText"
                        id="newpayeraltpracttaxid"
                        placeholder="Tax ID"
                        name="newpayeraltpracttaxid"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setnewpayeraltpracttaxid(e.target.value?.toString())
                        }
                        value={newpayeraltpracttaxid}
                        // required={showUseraltpractinfo}
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
                          // required={showUseraltpractinfo}
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
                              onClick={null}
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
                                    // value={NPIfirstname.replace(
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
                                    // value={NPIlastname.replace(
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
                                  // value={NPIorganizationname.toUpperCase()}
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
                                  // value={NPItaxonomyname.toUpperCase()}
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
                                      // value={NPIcity.toUpperCase()}
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
                                      // value={NPIstate.toUpperCase()}
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
                                      // value={NPIzipcode.toUpperCase()}
                                    />
                                  </div>
                                </div>
                              </>
                            </div>

                            {/* ********* End First Modal Input Fields ********* */}
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              onClick={null}
                              className="btn btn-sm btn-outline-primary"
                              data-bs-target="#exampleModalToggle2"
                              data-bs-toggle="modal"
                            >
                              Search
                            </button>
                            <button
                              type="button"
                              onClick={null}
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
                              onClick={null}
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
                              type="button"
                              onClick={null}
                              className="btn btn-sm btn-outline-primary"
                              data-bs-target="#NPIRegistryModaltriggerinPayer"
                              data-bs-toggle="modal"
                            >
                              Back to Search
                            </button>
                            <button
                              type="button"
                              onClick={null}
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
                              type="button"
                              onClick={null}
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
                          <label className="mt-0 text-dark mt-2">
                            Taxonomy
                          </label>
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
                              // required={showUseraltpractinfo}
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

                        <div className="col-md-7 mt-4">
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
        tabIndex={-1}
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
            type="button"
            data-bs-dismiss="model"
            variant="outline-primary btn-sm"
            onClick={() => toggleModal()}
          >
            Yes
          </Button>
          <Button
            type="button"
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
            value={masterpayersearch.trimStart().toUpperCase()}
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
              value={masterpayersearchpayerid.trimStart()}
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
          <Button type="button" variant="outline-primary btn-sm">
            Search
          </Button>
          <Button
            type="button"
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
        <Accordion defaultActiveKey={pay_notes ? "1" : "0"}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Clearinghouse Connection</Accordion.Header>
            <Accordion.Body>
              <div className="col-md-12 input-group">
                <input
                  className="form-control form-control-sm"
                  type="search"
                  placeholder="Clearinghouse Connection"
                  aria-label="Search"
                  style={{ cursor: "pointer" }}
                  onMouseDown={() => toggleModal()}
                />
                <Button
                  type="button"
                  variant="outline-info btn-sm"
                  onClick={() => toggleModal()}
                >
                  <i className="fa fa-search"></i>
                </Button>
              </div>
              <div className="mb-5">
                <div className="col-md-12 mt-3 ">
                  {payerID_clearinghouse || payer_name ? (
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

          {/* ******************* Start of Notes, Alerts, Tasks and Billing Opt Fields ******************* */}

          <>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Notes</Accordion.Header>
              <Accordion.Body className="px-2 py-2">
                <div className="px-0 mx-0">
                  <textarea
                    value={payerNotes}
                    onChange={(e) => setPayerNotes(e.target.value)}
                    className="form-control"
                    id="payernotestextarea"
                    rows={10}
                  />
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Alerts</Accordion.Header>
              <Accordion.Body>
                <Button disabled variant="outline-primary btn-sm">
                  <i className="fa fa-plus" />
                  &nbsp; Add Alert
                </Button>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Tasks</Accordion.Header>
              <Accordion.Body>
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip
                      style={{ fontSize: "11.5px" }}
                      id="tooltip-disabled"
                    >
                      Please Save the Payer first before creating a Task!
                    </Tooltip>
                  }
                >
                  <span className="d-inline-block">
                    <Button
                      disabled
                      style={{ pointerEvents: "none" }}
                      variant="outline-primary btn-sm"
                    >
                      <i className="fa fa-plus" /> Create Tasks
                    </Button>
                  </span>
                </OverlayTrigger>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Billing Options</Accordion.Header>
              <Accordion.Body>
                <Tabs
                  defaultActiveKey="General"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="General" title="General">
                    {checkboxes.map((check, i) => {
                      return (
                        <div className="form-check pt-2" key={i} {...check}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={check.value}
                            id={check.label}
                            checked={check.checked}
                            onChange={() => console.log(check.label)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={check.label}
                          >
                            {check.label}
                          </label>
                        </div>
                      );
                    })}

                    <div className="card mb-2 mt-2">
                      <div className="card-header">Professional</div>
                      <div className="card-body ">
                        <div className="input-group">
                          <input
                            className="form-control form-control-sm"
                            type="text"
                            placeholder="Default POS"
                            aria-label="PlaceofService"
                            id="PlaceofService"
                            name="PlaceofService"
                            // value={POSvalue}
                            maxLength="2"
                          />
                          {showPlace_of_Service && (
                            <PLACE_OF_SERVICE_MODAL
                              // POSselect={POSselect}
                              showPlace_of_Service={showPlace_of_Service}
                              closePlace_of_Service_Modal={
                                closePlace_of_Service_Modal
                              }
                            />
                          )}
                          <button
                            type="button"
                            className="input-group-text btn-hov"
                            id="PlaceofServicebtn"
                            onClick={(e) => setShowPlace_of_Service(true)}
                          >
                            <i className="fas fa-search" aria-hidden="true" />
                          </button>
                        </div>
                        <div className="input-group mt-2 mb-2">
                          <input
                            style={{ height: "10px" }}
                            className="form-control form-control-sm"
                            type="text"
                            placeholder="Default Claim Note"
                            aria-label="DefaultClaimNote"
                            id="DefaultClaimNote"
                            name="DefaultClaimNote"
                            // value={DCNvalue}
                            maxLength="45"
                          />
                        </div>

                        {checkbox_second.map((ck, i) => {
                          return (
                            <div className="form-check pt-2" key={i} {...ck}>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value={ck.value}
                                id={ck.label}
                                checked={ck.checked}
                                onClick={() => console.log(ck.label)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={ck.label}
                              >
                                {ck.label}
                              </label>
                            </div>
                          );
                        })}
                        <div className="mt-2">
                          <label>Print the following in Box 31</label>
                          <select
                            className="form-select form-select-sm"
                            aria-label="Box 31 selection"
                            defaultValue={Object.values(
                              box21select[0].toString()
                            )}
                          >
                            {box21select.map((bx, i) => {
                              return (
                                <option key={i} {...bx} value={bx.value}>
                                  {bx.value}
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        <div className="form-check pt-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            // value={check.value}
                            id="removeinsuredID#"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="removeinsuredID#"
                          >
                            Remove the insured's ID# from Box 1A
                          </label>
                        </div>

                        <div className="mt-2">
                          <label>
                            Print the following supplemental info in Box 24
                          </label>
                          <select
                            className="form-select form-select-sm"
                            aria-label="Box 31 selection"
                            defaultValue={"Narrative Name"}
                          >
                            <option value="Narrative Notes">
                              Narrative Notes
                            </option>{" "}
                            <option value="Anesthesia Start/Stop Times">
                              Anesthesia Start/Stop Times
                            </option>
                          </select>
                        </div>
                        {checkboxes_third.map((check, i) => {
                          return (
                            <div className="form-check pt-2" key={i} {...check}>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value={check.value}
                                id={check.label}
                                checked={check.checked}
                                onChange={() => console.log(check.label)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={check.label}
                              >
                                {check.label}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="card mb-2 mt-2">
                      <div className="card-header">Institutional</div>
                      <div className="card-body ">
                        <div className="mt-0">
                          <label>Print the following in Box 38</label>
                          <select
                            className="form-select form-select-sm"
                            aria-label="Box 38 selection"
                            defaultValue={Object.values(
                              box38select[1]
                            ).toString()}
                          >
                            {box38select.map((bx, i) => {
                              return (
                                <option key={i} {...bx} value={bx.value}>
                                  {bx.value}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="mt-2">
                          <label>Print the following in Box 80</label>
                          <select
                            className="form-select form-select-sm"
                            aria-label="Box 80 selection"
                            defaultValue={Object.values(
                              box80select[2]
                            ).toString()}
                          >
                            {box80select.map((bx, i) => {
                              return (
                                <option key={i} {...bx} value={bx.value}>
                                  {bx.value}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        {checkboxes_fourth.map((check, i) => {
                          return (
                            <div className="form-check pt-2" key={i} {...check}>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value={check.value}
                                id={check.label}
                                defaultChecked={check.checked}
                                onChange={() => console.log(check.label)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={check.label}
                              >
                                {check.label}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="Provider" title="Provider">
                    <div>
                      <i className="fas fa-circle-info text-primary" />
                      &nbsp; The provider billing options allow you to customize
                      certain configuration settings for one or more providers
                      specific to this payer. Providers not listed below will
                      bill claims based on their general settings/configuration
                      in the provider screen.
                      <br />
                      <OverlayTrigger
                        trigger="click"
                        placement="top"
                        overlay={prov_popover}
                      >
                        <Link to="#">Customize for Providers</Link>
                      </OverlayTrigger>
                    </div>

                    <div className="form-check mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="seperateConfig"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="seperateConfig"
                      >
                        Show seperate configurations for each office location
                      </label>
                    </div>
                  </Tab>
                </Tabs>
              </Accordion.Body>
            </Accordion.Item>
          </>
          {/* ******************* End of Notes, Alerts, Tasks and Billing Opt Fields ******************* */}
        </Accordion>
      </div>
    </form>
  );
}
