import { useEffect } from "react";
import { useFormik } from "formik";
import { useState } from "react";
import { PatternFormat } from "react-number-format";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

import API from "../../../Api/ClientApi";
import { Alert } from "../../../GLOBAL/SwalAlert";
import { useDispatch, useSelector } from "react-redux";
import { EditFacilityFetch } from "../../../Redux/features/FacilityStates/EditableFacility";
import useFetch from "../../../Hooks/useFetch";
import useGet from "../../../Hooks/useGet";
import {
  Facility_City_stateFetch3,
  getEditableFacilityZipCode1,
  getFacilityZipCode,
} from "../../../Redux/features/FacilityStates/Facility_City_State";
import { FormValNewFacility } from "./FormValNewFacility";

const NewFacility = () => {
  const [SearchNPIReg, setSearchNPIReg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [individual_checked, setIndividualChecked] = useState(false);
  const [organization_checked, setOrgChecked] = useState(true);
  const [any_checked, setAnyChecked] = useState(false);
  const [searchNPI, setSearchNPI] = useState("");
  const [citydata, setcitydata] = useState("");
  const [zipdata, setzipdata] = useState("");
  const { data: TaxData, loading: loadingtax } = useFetch(
    "customersetup/practice/taxonomyapi"
  );
  // POS Data Fetching API
  const { data: POSdata, loading } = useFetch(
    "customersetup/practice/placeofservice"
  );
  // const [searchPOS, setSearchPOS] = useState("");
  const [search, setSearch] = useState("");
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
  const [Notes, setNotes] = useState("");
  // const [textChange, settextChange] = useState("");
  const [Npi, setNpi] = useState("");

  // Zip API
  const zipapi = useSelector(
    (state) => state.Facility_City_State?.edit_zipcode?.ZipCode?.Zip5
  );
  const zipapiCity = useSelector(
    (state) => state.Facility_City_State?.edit_zipcode?.ZipCode?.City
  );
  const zipapiState = useSelector(
    (state) => state.Facility_City_State?.edit_zipcode?.ZipCode?.State
  );

  // Set Zip API
  const [zipapicode, setzipapicode] = useState("");
  const [zipapi_city, setzipapi_city] = useState("");
  const [zipapi_state, setzipapi_state] = useState("");

  const params = useParams();

  const facility_id = useSelector(
    (state) => state?.EditFacilitySlice?.data?.id
  );
  const facility_name_stored = useSelector(
    (state) => state?.EditFacilitySlice?.data?.facility_name
  );
  const npi_code_stored = useSelector(
    (state) => state?.EditFacilitySlice?.data?.npi_code
  );
  const taxonomy_spec_id_stored = useSelector(
    (state) => state?.EditFacilitySlice?.data?.taxonomy_spec_id
  );
  const reference_num_stored = useSelector(
    (state) => state?.EditFacilitySlice?.data?.reference_num
  );
  const tax_id_stored = useSelector(
    (state) => state?.EditFacilitySlice?.data?.tax_id
  );
  const clia_id_stored = useSelector(
    (state) => state?.EditFacilitySlice?.data?.clia_id
  );
  const location_provider_id_stored = useSelector(
    (state) => state?.EditFacilitySlice?.data?.location_provider_id
  );
  const site_id_stored = useSelector(
    (state) => state?.EditFacilitySlice?.data?.site_id
  );
  const bluecross_id_stored = useSelector(
    (state) => state?.EditFacilitySlice?.data?.bluecross_id
  );
  const blueshield_id_stored = useSelector(
    (state) => state?.EditFacilitySlice?.data?.blueshield_id
  );
  const medicare_id_stored = useSelector(
    (state) => state?.EditFacilitySlice?.data?.medicare_id
  );
  const medicaid_id_stored = useSelector(
    (state) => state?.EditFacilitySlice?.data?.medicaid_id
  );
  const locator_code_stored = useSelector(
    (state) => state?.EditFacilitySlice?.data?.locator_code
  );
  const pos_id_stored = useSelector(
    (state) => state?.EditFacilitySlice?.data?.pos_id
  );
  const address1_stored = useSelector(
    (state) => state?.EditFacilitySlice?.data?.address1
  );
  const address2_stored = useSelector(
    (state) => state?.EditFacilitySlice?.data?.address2
  );
  // Data From API
  const city_stored = useSelector(
    (state) => state?.EditFacilitySlice?.data?.city
  );
  const state_stored = useSelector(
    (state) => state?.EditFacilitySlice?.data?.state
  );
  const zip_stored = useSelector(
    (state) => state?.EditFacilitySlice?.data?.zip
  );
  const phone_stored = useSelector(
    (state) => state?.EditFacilitySlice?.data?.phone
  );
  const fax_stored = useSelector(
    (state) => state?.EditFacilitySlice?.data?.fax
  );
  const email_stored = useSelector(
    (state) => state?.EditFacilitySlice?.data?.email
  );

  const taxonomycode_ID = useSelector(
    (state) => state?.EditFacilitySlice?.data?.taxonomy_specialist?.id
  );
  const taxonomycode_stored = useSelector(
    (state) => state?.EditFacilitySlice?.data?.taxonomy_specialist?.taxo_code
  );
  const taxonomydesc_stored = useSelector(
    (state) => state?.EditFacilitySlice?.data?.taxonomy_specialist?.Description
  );
  const note_stored = useSelector(
    (state) => state?.EditFacilitySlice?.data?.note?.note
  );
  const sequence_stored = useSelector(
    (state) => state?.EditFacilitySlice?.data?.sequence?.id
  );
  const facility_status = useSelector(
    (state) => state?.EditFacilitySlice?.data?.facility_status
  );
  // ****************** Setting States ******************
  const [id, setID] = useState("");

  const [facility_name, setfacility_name] = useState("");
  const [npi_code, setnpi_code] = useState("");
  const [taxonomy_spec_id, settaxonomy_spec_id] = useState("");
  const [taxonomy_spec_code, settaxonomy_spec_code] = useState("");
  const [taxonomy_spec_desc, settaxonomy_spec_desc] = useState("");
  const [reference_num, setreference_num] = useState("");
  const [tax_id, settax_id] = useState("");
  const [clia_id, setclia_id] = useState("");
  const [site_id, setsite_id] = useState("");
  const [location_provider_id, setlocation_provider_id] = useState("");
  const [bluecross_id, setbluecross_id] = useState("");
  const [blueshield_id, setblueshield_id] = useState("");
  const [medicare_id, setmedicare_id] = useState("");
  const [medicaid_id, setmedicaid_id] = useState("");
  const [locator_code, setlocator_code] = useState("");
  const [pos_id, setpos_id] = useState("");
  const [address1, setaddress1] = useState("");
  const [address2, setaddress2] = useState("");
  // const [city, setcity] = useState("");
  // const [state, setstate] = useState("");
  // const [zip, setzip] = useState("");
  const [phone, setphone] = useState("");
  const [fax, setfax] = useState("");
  const [email, setemail] = useState("");
  const [facility_note, setfacility_note] = useState("");
  const [seq, setseq] = useState("");

  const [pos_fac, setPOS] = useState("");
  const [FacilityInactive, SetFacilityInactive] = useState(false);
  let user = JSON.parse(sessionStorage.getItem("access"));
  let customerID = JSON.parse(sessionStorage.getItem("customer_id"));
  // get data from api
  useEffect(() => {
    if (params.id) {
      dispatch(EditFacilityFetch(params.id));

      setID(facility_id ? facility_id : "");
      SetFacilityInactive(
        facility_status ? !facility_status : !FacilityInactive
      );
      setfacility_name(facility_name_stored ? facility_name_stored : "");
      setnpi_code(npi_code_stored ? npi_code_stored : "");
      settaxonomy_spec_id(
        taxonomy_spec_id_stored ? taxonomy_spec_id_stored : ""
      );
      setreference_num(reference_num_stored ? reference_num_stored : "");
      settax_id(tax_id_stored ? tax_id_stored : "");
      setclia_id(clia_id_stored ? clia_id_stored : "");
      setsite_id(site_id_stored ? site_id_stored : "");
      setlocation_provider_id(
        location_provider_id_stored ? location_provider_id_stored : ""
      );
      setbluecross_id(bluecross_id_stored ? bluecross_id_stored : "");
      setblueshield_id(blueshield_id_stored ? blueshield_id_stored : "");
      setmedicare_id(medicare_id_stored ? medicare_id_stored : "");
      setmedicaid_id(medicaid_id_stored ? medicaid_id_stored : "");
      setlocator_code(locator_code_stored ? locator_code_stored : "");
      setpos_id(pos_id_stored ? pos_id_stored : "");
      setaddress1(address1_stored ? address1_stored : "");
      setaddress2(address2_stored ? address2_stored : "");

      setzipapi_city(zipapiCity ? zipapiCity : city_stored);
      setzipapi_state(zipapiState ? zipapiState : state_stored);
      setzipapicode(zipapi ? zipapi : zip_stored);

      setphone(phone_stored ? phone_stored : "");
      setfax(fax_stored ? fax_stored : "");
      setemail(email_stored ? email_stored : "");
      // settaxonomyspecialist(taxonomyspecialist_stored);
      settaxonomy_spec_id(
        taxonomy_spec_id ? taxonomy_spec_id : taxonomycode_ID
      );
      settaxonomy_spec_code(
        taxonomycode_stored ? taxonomycode_stored : taxonomy_spec_code
      );
      settaxonomy_spec_desc(
        taxonomydesc_stored ? taxonomydesc_stored : taxonomy_spec_desc
      );
      setseq(sequence_stored);
      setfacility_note(note_stored);
    } else {
      setID("");
      SetFacilityInactive("");
      setfacility_name("");
      setnpi_code("");
      settaxonomy_spec_id("");
      setreference_num("");
      settax_id("");
      setclia_id("");
      setsite_id("");
      setlocation_provider_id("");
      setbluecross_id("");
      setblueshield_id("");
      setmedicare_id("");
      setmedicaid_id("");
      setlocator_code("");
      setpos_id("");
      setaddress1("");
      setaddress2("");

      setzipapi_city("");
      setzipapi_state("");
      setzipapicode("");

      setphone("");
      setfax("");
      setemail("");
      // settaxonomyspecialist(taxonomyspecialist_stored);
      settaxonomy_spec_id("");
      settaxonomy_spec_code("");
      settaxonomy_spec_desc("");
      setseq("");
      setfacility_note("");
    }
  }, [
    params,
    facility_id,
    facility_name_stored,
    npi_code_stored,
    taxonomy_spec_id_stored,
    reference_num_stored,
    tax_id_stored,
    clia_id_stored,
    site_id_stored,
    location_provider_id_stored,
    bluecross_id_stored,
    blueshield_id_stored,
    medicare_id_stored,
    medicaid_id_stored,
    locator_code_stored,
    pos_id_stored,
    address1_stored,
    address2_stored,
    city_stored,
    state_stored,
    zip_stored,
    phone_stored,
    fax_stored,
    email_stored,
    // zipapiCity,
    // zipapiState,
    // zipapi,
    sequence_stored,
    note_stored,
    taxonomycode_stored,
    taxonomydesc_stored,
    facility_status,
    // FacilityInactive,
  ]);
  useEffect(() => {
    let zip = true;
    setzipapi_city(zipapiCity ? zipapiCity : city_stored);
    setzipapi_state(zipapiState ? zipapiState : state_stored);
    setzipapicode(zipapi ? zipapi : zip_stored);
    return () => {
      zip = false;
    };
  }, [zipapi]);
  function put() {
    API.put(
      `customersetup/facility/update/${facility_id}`,
      {
        newfacilityName: facility_name?.toUpperCase().trimStart(),
        newfacilitynpi: npi_code,
        // ?.replace(/[^0-9]/gi, "").trim(),
        newfacilitytaxonomySpeciality: Number(taxonomy_spec_id),
        newfacilitycity: zipapi_city
          ?.replace(/[^A-Za-z]/gi, "")
          .trimStart()
          .toUpperCase(),
        // ?.trimStart(),
        newfacilityzipcode: zipapicode?.replace(/[^0-9]/gi, "").trim(),
        newfacilityphone: phone,
        newfacilityfax: fax,
        newfacilityemail: email?.trim(),
        newfacilitymedicareid: medicare_id?.toUpperCase().trimStart(),
        newfacilitymedicaidid: medicaid_id?.toUpperCase().trimStart(),
        // facilitysequence: seq,
        facilityreference: reference_num?.toUpperCase().trimStart(),
        facilityaddress: address1?.toUpperCase().trimStart(),
        facilityaddress2: address2?.toUpperCase().trimStart(),
        newfacilitystate: zipapi_state?.toUpperCase().trimStart(),
        newfacilitytaxid: tax_id,
        newfacilitycliaid: clia_id?.toUpperCase().trimStart(),
        newfacilitylocationproviderid: location_provider_id
          ?.toUpperCase()
          .trimStart(),
        siteId: site_id?.toUpperCase().trimStart(),
        newfacilitybluecrossid: bluecross_id?.toUpperCase().trimStart(),
        blueshieldId: blueshield_id?.toUpperCase().trimStart(),
        locatorCode: locator_code?.toUpperCase().trimStart(),
        placeofservice: pos_id,
        Notes: facility_note,
        makefacilityinactive: Number(!FacilityInactive),
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
            "Facility Updated Successfully",
            false,
            1500
          );
          // action.resetForm();
          setNotes("");
          setnpi_code("");
          // setTax("");
          // setTaxDesc("");
          setPOS("");
          dispatch(getEditableFacilityZipCode1(""));
          setzipapicode("");
          setzipapi_city("");
          setzipapi_state("");
          navigate("/customersetup/facilities", { replace: true });
        }
      })
      .catch(function (error) {
        console.log("the is error", error);
        Alert("center", "error", error, false, 2500);
      });
    // to get rid of all the values after submitting the form
  }
  function push() {
    API.post(
      "customersetup/facility/store",
      {
        newfacilityName: facility_name?.toUpperCase().trimStart(),
        newfacilitynpi: npi_code,
        // ?.replace(/[^0-9]/gi, "").trim(),
        newfacilitytaxonomySpeciality: Number(taxonomy_spec_id),
        newfacilitycity: zipapi_city
          ?.replace(/[^A-Za-z]/gi, "")
          .trimStart()
          .toUpperCase(),
        // ?.trimStart(),
        newfacilityzipcode: zipapicode?.replace(/[^0-9]/gi, "").trim(),
        newfacilityphone: phone,
        newfacilityfax: fax,
        newfacilityemail: email?.trim(),
        newfacilitymedicareid: medicare_id?.toUpperCase().trimStart(),
        newfacilitymedicaidid: medicaid_id?.toUpperCase().trimStart(),
        // facilitysequence: seq,
        facilityreference: reference_num?.toUpperCase().trimStart(),
        facilityaddress: address1?.toUpperCase().trimStart(),
        facilityaddress2: address2?.toUpperCase().trimStart(),
        newfacilitystate: zipapi_state?.toUpperCase().trimStart(),
        newfacilitytaxid: tax_id,
        newfacilitycliaid: clia_id?.toUpperCase().trimStart(),
        newfacilitylocationproviderid: location_provider_id
          ?.toUpperCase()
          .trimStart(),
        siteId: site_id?.toUpperCase().trimStart(),
        newfacilitybluecrossid: bluecross_id?.toUpperCase().trimStart(),
        blueshieldId: blueshield_id?.toUpperCase().trimStart(),
        locatorCode: locator_code?.toUpperCase().trimStart(),
        placeofservice: pos_id,
        Notes: facility_note,
        makefacilityinactive: Number(!FacilityInactive),
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
            "Facility Updated Successfully",
            false,
            1500
          );
          // action.resetForm();
          setNotes("");
          setnpi_code("");
          // setTax("");
          // setTaxDesc("");
          setPOS("");
          dispatch(getEditableFacilityZipCode1(""));
          setzipapicode("");
          setzipapi_city("");
          setzipapi_state("");
          navigate("/customersetup/facilities", { replace: true });
        }
      })
      .catch(function (error) {
        console.log("the is error", error);
        Alert("center", "error", error, false, 2500);
      });
    // to get rid of all the values after submitting the form
  }
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      newfacilityName: facility_name,
      newfacilitynpi: npi_code,
      newfacilitytaxonomySpeciality: taxonomy_spec_id,
      newfacilitycity: zipapi_city,
      newfacilityzipcode: zipapicode,
      newfacilityphone: phone,
      newfacilityfax: fax,
      newfacilityemail: email,
      facilitysequence: seq,
      facilityreference: reference_num,
      facilityaddress: address1,
      newfacilitystate: zipapi_state,
      newfacilitytaxid: tax_id,
      newfacilitycliaid: clia_id,
      newfacilitylocationproviderid: location_provider_id,
      siteId: site_id,
      newfacilitybluecrossid: bluecross_id,
      blueshieldId: blueshield_id,
      locatorCode: locator_code,
      placeofservice: pos_id,
      Notes: facility_note,
      newfacilitymedicareid: medicare_id,
      newfacilitymedicaidid: medicaid_id,
      facilityaddress2: address2,
    },
    // enableReinitialize: true,
    validationSchema: FormValNewFacility,
    validateOnChange: true,
    validateOnBlur: true,
    // By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: (values, action) => {
      // Send Data API
      // setPosredux(values?.placeofservice)
      params.id ? put() : push();
      action.resetForm();
    },
  });

  return (
    <div className="row d-flex mt-4">
      <div
        className="col-md-6"
        style={{
          overflowY: "scroll",
          height: "calc(100vh - 127px)",
          overflowX: "hidden",
        }}
      >
        <form onSubmit={handleSubmit} action="post">
          <div className="row">
            <div className="col-md-5 mb-4 mt-3">
              {params.id ? (
                <button
                  type="submit"
                  className="btn btn-outline-primary me-2 btn-sm"
                >
                  Update
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-outline-primary me-2 btn-sm"
                >
                  Save
                </button>
              )}
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => {
                  setNotes("");
                  setnpi_code("");
                  // setTax("");
                  // setTaxDesc("");
                  setPOS("");
                  dispatch(getEditableFacilityZipCode1(""));

                  setzipapicode("");
                  setzipapi_city("");
                  setzipapi_state("");
                  navigate("/customersetup/facilities");
                }}
              >
                Cancel
              </button>
            </div>
            <div className="col-md-8">
              <label htmlFor="">Name</label>
              <input
                type="text"
                className="form-control"
                id="newfacilityName"
                name="newfacilityName"
                placeholder="Name"
                autoComplete="off"
                autoCapitalize="characters"
                autoCorrect="off"
                spellCheck="false"
                value={facility_name?.trimStart().toUpperCase()}
                onChange={(e) =>
                  setfacility_name(
                    e.target.value?.toString()?.trimStart().toUpperCase()
                  )
                }
                maxLength={60}
                required
              />
              {touched.newfacilityName && errors.newfacilityName ? (
                <p className="form-error mx-1">*{errors.newfacilityName}</p>
              ) : null}
            </div>
            <div className="col-md-4 mt-4 px-0">
              {params.id ? (
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="makefacilityinactive"
                    name="makefacilityinactive"
                    checked={FacilityInactive}
                    onChange={(e) => SetFacilityInactive(e.target.checked)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="makefacilityinactive"
                  >
                    Make this facility inactive
                  </label>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-md-12 d-flex mt-3">
            <div className="col-md-5">
              <label htmlFor="newfacilitynpi">NPI</label>
              <div className="input-group">
                <input
                  className="form-control form-control-sm placeTextTax"
                  type="text"
                  placeholder="NPI"
                  aria-label="npi"
                  id="newfacilitynpi"
                  name="newfacilitynpi"
                  autoComplete="off"
                  autoCapitalize="characters"
                  autoCorrect="off"
                  spellCheck="false"
                  onChange={(e) =>
                    setnpi_code(e.target.value?.replace(/[^0-9]/gi, "").trim())
                  }
                  value={npi_code}
                  maxLength={10}
                  required
                />

                <button
                  type="button"
                  className="input-group-text btn-hov"
                  id="newfacilitynpibtn"
                  data-bs-toggle="modal"
                  data-bs-target="#NPIRegistryModaltriggerinFacilities"
                >
                  <i className="fas fa-search" aria-hidden="true" />
                </button>
              </div>
              {touched.newfacilitynpi && errors.newfacilitynpi ? (
                <p className="form-error mx-2">*{errors.newfacilitynpi}</p>
              ) : null}
            </div>

            {/* <NPI_REGISTRY_MODAL /> */}
            {/* ******************** NPI REGISTRY ****************** */}
            {/* ********************* 1st Modal Start (NPI Registry Input Fields) ********************* */}
            <div
              className="modal fade text-dark"
              id="NPIRegistryModaltriggerinFacilities"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              aria-hidden="true"
              aria-labelledby="NPIRegistryModaltriggerinFacilities"
              tabIndex={-1}
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
                                value="AnyChecked"
                                onClick={(e) => {
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
                                value="IndividualChecked"
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
                                value="OrganizationChecked"
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
                            // value={values.NPIfirstname.replace(
                            //   /[^A-Za-z ]/gi,
                            //   ""
                            // ).toUpperCase()}
                            //
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
                            //
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
                          //
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
                          //
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
                              value={citydata}
                              onChange={(e) =>
                                setcitydata(
                                  e.target.value
                                    ?.toString()
                                    ?.toUpperCase()
                                    ?.replace(/[^A-Za-z ]/gi, "")
                                )
                              }
                              // onChange={handleChange}
                              //
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
                              //
                              // value={values.NPIstate.toUpperCase()}
                              maxLength={2}
                            />
                          </div>
                          <div className="col-md-3">
                            <input
                              // format="#####-####"
                              // mask=" "
                              className="form-control form-control-sm"
                              type="text"
                              placeholder="Zip Code"
                              aria-label="Zip Code"
                              id="NPIzipcode"
                              name="NPIzipcode"
                              onChange={(e) => setzipdata(e.target.value)}
                              maxLength={10}
                              // onChange={handleChange}
                              //
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
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      data-bs-target="#exampleModalToggle2"
                      data-bs-toggle="modal"
                    >
                      Search
                    </button>
                    <button
                      type="button"
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
              tabIndex={-1}
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
                  <div className="px-3  mb-2 mt-0">
                    {" "}
                    <label htmlFor="SearchNPI" className="fw-bold text-dark">
                      Search NPI
                    </label>
                    <input
                      onChange={(e) =>
                        setSearchNPIReg(e.target.value?.toString())
                      }
                      id="SearchNPI"
                      type="search"
                      className="form-control form-control-sm"
                      placeholder="Search NPI by NPI code, Type, Name, Address or Taxonomy"
                    />
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
                            {/* // INDIVIDUAL DATA */}
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
                                    ?.filter((search) => {
                                      return SearchNPIReg === ""
                                        ? search
                                        : search?.[0]
                                            ?.toString()
                                            .toLowerCase()
                                            .includes(
                                              SearchNPIReg?.toLowerCase()
                                            ) ||
                                            search?.[1]
                                              ?.toString()
                                              .toLowerCase()
                                              .includes(
                                                SearchNPIReg?.toLowerCase()
                                              ) ||
                                            search?.[2]
                                              ?.toString()
                                              .toLowerCase()
                                              .includes(
                                                SearchNPIReg?.toLowerCase()
                                              ) ||
                                            search?.[3]
                                              ?.toString()
                                              .toLowerCase()
                                              .includes(
                                                SearchNPIReg?.toLowerCase()
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
                                            setnpi_code(pract?.[1]);
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
                                      ?.filter((search) => {
                                        return SearchNPIReg === ""
                                          ? search
                                          : search?.[0]
                                              ?.toString()
                                              .toLowerCase()
                                              .includes(
                                                SearchNPIReg?.toLowerCase()
                                              ) ||
                                              search?.[1]
                                                ?.toString()
                                                .toLowerCase()
                                                .includes(
                                                  SearchNPIReg?.toLowerCase()
                                                ) ||
                                              search?.[2]
                                                ?.toString()
                                                .toLowerCase()
                                                .includes(
                                                  SearchNPIReg?.toLowerCase()
                                                ) ||
                                              search?.[3]
                                                ?.toString()
                                                .toLowerCase()
                                                .includes(
                                                  SearchNPIReg?.toLowerCase()
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
                                              setnpi_code(pract?.[1]);
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
                                    ?.filter((search) => {
                                      return SearchNPIReg === ""
                                        ? search
                                        : search?.[0]
                                            ?.toString()
                                            .toLowerCase()
                                            .includes(
                                              SearchNPIReg?.toLowerCase()
                                            ) ||
                                            search?.[1]
                                              ?.toString()
                                              .toLowerCase()
                                              .includes(
                                                SearchNPIReg?.toLowerCase()
                                              ) ||
                                            search?.[2]
                                              ?.toString()
                                              .toLowerCase()
                                              .includes(
                                                SearchNPIReg?.toLowerCase()
                                              ) ||
                                            search?.[3]
                                              ?.toString()
                                              .toLowerCase()
                                              .includes(
                                                SearchNPIReg?.toLowerCase()
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
                                            setnpi_code(pract?.[1]);
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
                                      ?.filter((search) => {
                                        return SearchNPIReg === ""
                                          ? search
                                          : search?.[0]
                                              ?.toString()
                                              .toLowerCase()
                                              .includes(
                                                SearchNPIReg?.toLowerCase()
                                              ) ||
                                              search?.[1]
                                                ?.toString()
                                                .toLowerCase()
                                                .includes(
                                                  SearchNPIReg?.toLowerCase()
                                                ) ||
                                              search?.[2]
                                                ?.toString()
                                                .toLowerCase()
                                                .includes(
                                                  SearchNPIReg?.toLowerCase()
                                                ) ||
                                              search?.[3]
                                                ?.toString()
                                                .toLowerCase()
                                                .includes(
                                                  SearchNPIReg?.toLowerCase()
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
                                              setnpi_code(pract?.[1]);
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
                                    ?.filter((search) => {
                                      return SearchNPIReg === ""
                                        ? search
                                        : search?.[0]
                                            ?.toString()
                                            .toLowerCase()
                                            .includes(
                                              SearchNPIReg?.toLowerCase()
                                            ) ||
                                            search?.[1]
                                              ?.toString()
                                              .toLowerCase()
                                              .includes(
                                                SearchNPIReg?.toLowerCase()
                                              ) ||
                                            search?.[2]
                                              ?.toString()
                                              .toLowerCase()
                                              .includes(
                                                SearchNPIReg?.toLowerCase()
                                              ) ||
                                            search?.[3]
                                              ?.toString()
                                              .toLowerCase()
                                              .includes(
                                                SearchNPIReg?.toLowerCase()
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
                                            setnpi_code(pract?.[1]);
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
                                      ?.filter((search) => {
                                        return SearchNPIReg === ""
                                          ? search
                                          : search?.[0]
                                              ?.toString()
                                              .toLowerCase()
                                              .includes(
                                                SearchNPIReg?.toLowerCase()
                                              ) ||
                                              search?.[1]
                                                ?.toString()
                                                .toLowerCase()
                                                .includes(
                                                  SearchNPIReg?.toLowerCase()
                                                ) ||
                                              search?.[2]
                                                ?.toString()
                                                .toLowerCase()
                                                .includes(
                                                  SearchNPIReg?.toLowerCase()
                                                ) ||
                                              search?.[3]
                                                ?.toString()
                                                .toLowerCase()
                                                .includes(
                                                  SearchNPIReg?.toLowerCase()
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
                                              setnpi_code(pract?.[1]);
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
                                    ?.filter((search) => {
                                      return SearchNPIReg === ""
                                        ? search
                                        : search?.[0]
                                            ?.toString()
                                            .toLowerCase()
                                            .includes(
                                              SearchNPIReg?.toLowerCase()
                                            ) ||
                                            search?.[1]
                                              ?.toString()
                                              .toLowerCase()
                                              .includes(
                                                SearchNPIReg?.toLowerCase()
                                              ) ||
                                            search?.[2]
                                              ?.toString()
                                              .toLowerCase()
                                              .includes(
                                                SearchNPIReg?.toLowerCase()
                                              ) ||
                                            search?.[3]
                                              ?.toString()
                                              .toLowerCase()
                                              .includes(
                                                SearchNPIReg?.toLowerCase()
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
                                            setnpi_code(pract?.[1]);
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
                                      ?.filter((search) => {
                                        return SearchNPIReg === ""
                                          ? search
                                          : search?.[0]
                                              ?.toString()
                                              .toLowerCase()
                                              .includes(
                                                SearchNPIReg?.toLowerCase()
                                              ) ||
                                              search?.[1]
                                                ?.toString()
                                                .toLowerCase()
                                                .includes(
                                                  SearchNPIReg?.toLowerCase()
                                                ) ||
                                              search?.[2]
                                                ?.toString()
                                                .toLowerCase()
                                                .includes(
                                                  SearchNPIReg?.toLowerCase()
                                                ) ||
                                              search?.[3]
                                                ?.toString()
                                                .toLowerCase()
                                                .includes(
                                                  SearchNPIReg?.toLowerCase()
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
                                              setnpi_code(pract?.[1]);
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
                      className="btn btn-sm btn-outline-primary"
                      data-bs-target="#NPIRegistryModaltriggerinFacilities"
                      data-bs-toggle="modal"
                    >
                      Back to Search
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* ******************** NPI REGISTRY End ****************** */}
            {/* ********************* 2nd Modal End (NPI Registry Table) ********************* */}

            <div className="col-md-5">
              <label htmlFor="newfacilitytaxonomySpeciality" className="px-2">
                Taxonomy
              </label>
              <div className="input-group mx-2">
                <input
                  className="form-control form-control-sm placeTextTax"
                  type="text"
                  placeholder="Taxonomy Speciality"
                  aria-label="Taxonomy"
                  id="newfacilitytaxonomySpeciality"
                  name="newfacilitytaxonomySpeciality"
                  autoComplete="off"
                  autoCapitalize="characters"
                  autoCorrect="off"
                  spellCheck="false"
                  style={{ cursor: "pointer" }}
                  data-bs-toggle="modal"
                  data-bs-target="#taxonomyspecmodal"
                  value={
                    taxonomy_spec_code
                      ? taxonomy_spec_code
                      : taxonomycode_stored
                    // values?.newfacilitytaxonomySpeciality.trimStart()
                  }
                  maxLength={10}
                  required={true}
                />
                <button
                  onClick={null}
                  type="button"
                  className="input-group-text btn-hov"
                  id="Taxonomy"
                  data-bs-toggle="modal"
                  data-bs-target="#taxonomyspecmodal"
                >
                  <i className="fas fa-search" aria-hidden="true" />
                </button>
              </div>
              {touched.newfacilitytaxonomySpeciality &&
              errors.newfacilitytaxonomySpeciality ? (
                <p className="form-error mx-2">
                  *{errors.newfacilitytaxonomySpeciality}
                </p>
              ) : null}
            </div>

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
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="modal-body">
                    {/* ********* First Modal Input Fields ********* */}
                    {loadingtax ? (
                      "Loading.."
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
                              return search === ""
                                ? items
                                : items?.specialty_name
                                    ?.toLowerCase()
                                    ?.includes(search?.toLowerCase()) ||
                                    items?.taxo_code
                                      ?.toLowerCase()
                                      ?.includes(search?.toLowerCase()) ||
                                    items?.Description?.toLowerCase()?.includes(
                                      search?.toLowerCase()
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
                                    settaxonomy_spec_code(taxo?.taxo_code);
                                    settaxonomy_spec_desc(taxo?.Description);
                                    settaxonomy_spec_id(taxo?.id);
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
                      onClick={null}
                      type="button"
                      variant="outline-danger btn-sm"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 d-flex mt-3">
            <div className="col-md-3">
              <label htmlFor="">Seq #</label>
              <input
                type="text"
                className="form-control form-control-sm"
                disabled
                id="facilitysequence"
                name="facilitysequence"
                placeholder="NEW"
                autoComplete="off"
                autoCapitalize="characters"
                autoCorrect="off"
                spellCheck="false"
                value={seq?.toString()?.trimStart()}
              />
            </div>
            <div className="col-md-3 mx-2">
              <label htmlFor="">Reference #</label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="facilityreference"
                name="facilityreference"
                placeholder="Reference"
                autoComplete="off"
                autoCapitalize="characters"
                autoCorrect="off"
                spellCheck="false"
                onChange={(e) =>
                  setreference_num(
                    e.target.value?.toString()?.toUpperCase().trimStart()
                  )
                }
                value={reference_num?.toUpperCase().trimStart()}
                maxLength={12}
              />
            </div>
            <div className="col-md-6 mt-3">{taxonomy_spec_desc}</div>
          </div>

          <div className="col-xl-12 mt-3">
            <div className="card mb-2">
              <div className="card-header">Contact Information</div>
              <div className="card-body ">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <label htmlFor="" className="text-dark">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm placeText"
                      id="facilityaddress"
                      placeholder="Address 1"
                      name="facilityaddress"
                      autoComplete="off"
                      autoCapitalize="characters"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={(e) =>
                        setaddress1(
                          e.target.value?.toString()?.toUpperCase().trimStart()
                        )
                      }
                      value={address1?.toUpperCase().trimStart()}
                      //
                      maxLength={40}
                      required
                    />
                    {touched.facilityaddress && errors.facilityaddress ? (
                      <p className="form-error mx-0 px-0">
                        *{errors.facilityaddress}
                      </p>
                    ) : null}
                  </div>
                  <div className="col-md-12 mt-2">
                    <input
                      type="text"
                      className="form-control form-control-sm placeText"
                      id="facilityaddress2"
                      placeholder="Address"
                      name="facilityaddress2"
                      autoComplete="off"
                      autoCapitalize="characters"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={(e) =>
                        setaddress2(
                          e.target.value?.toString()?.toUpperCase().trimStart()
                        )
                      }
                      value={address2?.toUpperCase().trimStart()}
                      //
                      maxLength={40}
                    />
                    {touched.facilityaddress2 && errors.facilityaddress2 ? (
                      <p className="form-error mx-0 px-0">
                        *{errors.facilityaddress2}
                      </p>
                    ) : null}
                  </div>

                  <div className="col-md-12 d-flex mt-2">
                    <div className="col-md-5">
                      <label htmlFor="" className="text-dark">
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newfacilitycity"
                        placeholder="City"
                        name="newfacilitycity"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onKeyUp={handleChange}
                        onChange={(e) => {
                          // setzipapi_city(
                          //   e.target.value
                          //     ?.replace(/[^A-Za-z ]/gi, "")
                          //     .toUpperCase()
                          //     .trimStart()
                          // );

                          setzipapi_city(
                            e.target.value
                              ?.replace(/[^A-Za-z ]/gi, "")
                              .toUpperCase()
                              .trimStart()
                          );
                        }}
                        value={zipapi_city
                          // city
                          ?.replace(/[^A-Za-z ]/gi, "")
                          .toUpperCase()
                          .trimStart()}
                        maxLength={28}
                      />

                      {touched.newfacilitycity && errors.newfacilitycity ? (
                        <p className="form-error mx-0 px-0">
                          *{errors.newfacilitycity}
                        </p>
                      ) : null}
                    </div>

                    <div className="col-md-2 mx-2">
                      <label htmlFor="" className="text-dark">
                        State
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newfacilitystate"
                        placeholder="State"
                        name="newfacilitystate"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onKeyUp={handleChange}
                        onChange={(e) => {
                          // setFieldValue(
                          //   "newfacilitystate",
                          //   e.target.value,
                          //   true
                          // );
                          // setstate(e.target.value);
                          setzipapi_state(
                            e.target.value
                              ?.replace(/[^A-Za-z ]/gi, "")
                              .toUpperCase()
                              .trimStart()
                          );
                        }}
                        value={zipapi_state
                          // state
                          ?.replace(/[^A-Za-z ]/gi, "")
                          .toUpperCase()
                          .trimStart()}
                        maxLength={2}
                        required
                      />
                      {/* 
                          value={values?.practiceState
                            .replace(/[^A-Za-z]/gi, "")
                            .trimStart()
                            .toUpperCase()}
                         
                        /> */}
                      <div className="col-md-12">
                        {touched.newfacilitystate && errors.newfacilitystate ? (
                          <p className="form-error">
                            *{errors.newfacilitystate}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="col-md-4 mx-1">
                      <label htmlFor="" className="text-dark">
                        Zip
                      </label>
                      <PatternFormat
                        format="#####-####"
                        mask=""
                        type="text"
                        className="form-control form-control-sm"
                        id="newfacilityzipcode"
                        name="newfacilityzipcode"
                        placeholder="ZIP Code"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        // onChange={handleChange}
                        value={zipapicode?.trim()}
                        onChange={(e) => {
                          setzipapicode(
                            e.target.value?.replace(/[^0-9]/gi, "").trim()
                          );
                          setFieldValue(
                            "newfacilityzipcode",
                            e.target.value?.replace(/[^0-9]/gi, "").trim(),
                            true
                          );
                          (zipapicode.match(/(?<!\d)\d{4}(?!\d)/gm) ||
                            zipapicode.match(/(?<!\d)\d{8}(?!\d)/gm)) &&
                            dispatch(
                              Facility_City_stateFetch3(
                                e.target.value?.replace(/[^0-9]/gi, "").trim()
                              )
                            );
                        }}
                        onKeyUp={handleChange}
                        minLength={5}
                      />

                      {touched.newfacilityzipcode &&
                      errors.newfacilityzipcode ? (
                        <p className="form-error mx-1">
                          *{errors.newfacilityzipcode}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-12 d-flex mt-2">
                    <div className="col-md-4">
                      <label htmlFor="" className="text-dark">
                        Phone
                      </label>
                      <PatternFormat
                        format="(###) ###-####"
                        pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                        title="Please Enter a Valid Phone #"
                        mask=""
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newfacilityphone"
                        placeholder="Phone"
                        name="newfacilityphone"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) => setphone(e.target.value)}
                        value={phone}
                      />
                    </div>
                    <div className="col-md-4 mx-2">
                      <label htmlFor="" className="text-dark">
                        Fax
                      </label>
                      <PatternFormat
                        format="(###) ###-####"
                        mask=""
                        pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                        title="Please Enter a Valid Fax #"
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newfacilityfax"
                        placeholder="Fax"
                        name="newfacilityfax"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) => setfax(e.target.value)}
                        value={fax}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 d-flex mt-2">
                    <div className="col-md-12 mt-2">
                      <label htmlFor="" className="text-dark">
                        Email
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newfacilityemail"
                        placeholder="Email"
                        name="newfacilityemail"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setemail(e.target.value?.toString().trim())
                        }
                        value={email?.trim()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-12 mt-3">
            <div className="card mb-2">
              <div className="card-header">ID Numbers</div>
              <div className="card-body ">
                <div className="col-md-12">
                  <div className="col-md-12 d-flex mt-2">
                    <div className="col-md-4">
                      <label htmlFor="" className="text-dark">
                        Tax ID
                      </label>
                      <PatternFormat
                        format="##-#######"
                        mask=""
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newfacilitytaxid"
                        placeholder="Tax ID"
                        name="newfacilitytaxid"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          settax_id(e.target.value?.toString()?.trim())
                        }
                        value={tax_id?.trim()}
                      />
                    </div>
                    <div className="col-md-4 mx-2">
                      <label htmlFor="" className="text-dark">
                        CLIA ID
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newfacilitycliaid"
                        placeholder="CLIA ID"
                        name="newfacilitycliaid"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setclia_id(
                            e.target.value
                              ?.toString()
                              ?.toUpperCase()
                              .trimStart()
                          )
                        }
                        value={clia_id?.toUpperCase().trimStart()}
                        maxLength={10}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 d-flex mt-3">
                    <div className="col-md-4">
                      <label htmlFor="" className="text-dark">
                        Location Provider ID
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newfacilitylocationproviderid"
                        placeholder="Location Provider ID"
                        name="newfacilitylocationproviderid"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setlocation_provider_id(
                            e.target.value
                              ?.toString()
                              ?.toUpperCase()
                              .trimStart()
                          )
                        }
                        value={location_provider_id?.toUpperCase().trimStart()}
                        maxLength={15}
                      />
                    </div>
                    <div className="col-md-4 mx-2 mt">
                      <label htmlFor="" className="text-dark">
                        Site ID
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="siteId"
                        placeholder="Site ID"
                        name="siteId"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setsite_id(
                            e.target.value
                              ?.toString()
                              ?.toUpperCase()
                              .trimStart()
                          )
                        }
                        value={site_id?.toUpperCase().trimStart()}
                        maxLength={15}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 d-flex mt-3">
                    <div className="col-md-4">
                      <label htmlFor="" className="text-dark">
                        BlueCross ID
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newfacilitybluecrossid"
                        placeholder="BlueCross ID"
                        name="newfacilitybluecrossid"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setbluecross_id(
                            e.target.value
                              ?.toString()
                              ?.toUpperCase()
                              .trimStart()
                          )
                        }
                        value={bluecross_id?.toUpperCase().trimStart()}
                        maxLength={15}
                      />
                    </div>
                    <div className="col-md-4 mx-2 mt">
                      <label htmlFor="" className="text-dark">
                        BlueSheild ID
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="blueshieldId"
                        placeholder="BlueShield ID"
                        name="blueshieldId"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setblueshield_id(
                            e.target.value
                              ?.toString()
                              ?.toUpperCase()
                              .trimStart()
                          )
                        }
                        value={blueshield_id?.toUpperCase().trimStart()}
                        maxLength={15}
                      />
                    </div>
                  </div>

                  <div className="col-md-12 d-flex mt-3">
                    <div className="col-md-4">
                      <label htmlFor="" className="text-dark">
                        Medicare ID
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newfacilitybluecrossid"
                        placeholder="Medicare ID"
                        name="newfacilitymedicareid"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setmedicare_id(
                            e.target.value
                              ?.toString()
                              ?.toUpperCase()
                              .trimStart()
                          )
                        }
                        value={medicare_id?.toUpperCase().trimStart()}
                        maxLength={15}
                      />
                    </div>
                    <div className="col-md-4 mx-2 mt">
                      <label htmlFor="" className="text-dark">
                        Medicaid ID
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newfacilitymedicaidid"
                        placeholder="Medicaid ID"
                        name="newfacilitymedicaidid"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setmedicaid_id(
                            e.target.value
                              ?.toString()
                              ?.toUpperCase()
                              .trimStart()
                          )
                        }
                        value={medicaid_id?.toUpperCase().trimStart()}
                        maxLength={15}
                      />
                    </div>
                  </div>

                  <div className="col-md-12 d-flex mt-3">
                    <div className="col-md-4">
                      <label htmlFor="" className="text-dark">
                        Locator Code
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="locatorCode"
                        placeholder="Locator Code"
                        name="locatorCode"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setlocator_code(
                            e.target.value
                              ?.toString()
                              ?.toUpperCase()
                              .trimStart()
                          )
                        }
                        value={locator_code?.toUpperCase().trimStart()}
                        maxLength={15}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade text-dark"
            id="showPOSModelinFacility"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="showPOSModelinFacility"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-md modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">All POS Codes</h5>
                  <button
                    onClick={null}
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="col-md-12">
                    <div className="mt-0">
                      {/* ======= POS ======= */}
                      <label htmlFor="tof">Place of Service</label>
                      <input
                        type="search"
                        className="form-control form-control-sm"
                        placeholder="Search for POS codes"
                        aria-label="Search"
                        maxLength={60}
                        onChange={(e) => setSearch(e.target.value)}
                        autoFocus
                      />

                      {loading ? (
                        "Loading..."
                      ) : (
                        <div
                          className="table-responsive"
                          style={{ height: "300px" }}
                        >
                          <table className="table table-light table-hover table-striped table table-bordered caption-top table-responsive">
                            <thead>
                              <th>Code</th>
                              <th>Description</th>
                            </thead>
                            <tbody>
                              {POSdata?.filter((items) => {
                                return search === ""
                                  ? items
                                  : items?.description
                                      ?.toLowerCase()
                                      ?.includes(search?.toLowerCase());
                                // ||
                                // items?.id?.includes(search);
                              })?.map((pos, i) => {
                                return (
                                  <tr
                                    className="practice-font"
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      setpos_id(pos?.pos_code);
                                    }}
                                  >
                                    <td>{pos?.pos_code}</td>
                                    <td>{pos?.description}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="modal-footer justify-content-end">
                  {/* <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            data-bs-dismiss="modal"
          >
            Apply
          </button> */}
                  <button
                    onClick={null}
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12 mt-3">
            <div className="card mb-2">
              <div className="card-header">Claim Defaults</div>
              <div className="card-body">
                <label htmlFor="placeofservice" className="text-dark">
                  Place of Service
                </label>
                <div className="col-md-6">
                  <div className="input-group">
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      placeholder="Place of Service"
                      aria-label="check"
                      id="placeofservice"
                      name="placeofservice"
                      autoComplete="off"
                      autoCapitalize="characters"
                      autoCorrect="off"
                      spellCheck="false"
                      maxLength={2}
                      onChange={(e) => setpos_id(e.target.value)}
                      value={pos_id}
                      required
                      readOnly
                    />
                    <button
                      onClick={null}
                      type="button"
                      className="input-group-text btn-hov"
                      id="placeofservicebtn"
                      data-bs-toggle="modal"
                      data-bs-target="#showPOSModelinFacility"
                    >
                      <i className="fas fa-search" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="col-md-6">
        <div
          className="accordion"
          id="accordionExample"
          style={{ overflowY: "scroll", height: "calc(100vh - 127px)" }}
        >
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button collapsed"
                onClick={null}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                Notes
              </button>
            </h2>
            <div
              id="collapseOne"
              className={`accordion-collapse collapse ${
                note_stored ? "show" : ""
              }`}
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body px-2 py-2">
                <div className="px-0 mx-0">
                  <textarea
                    onChange={(e) =>
                      setfacility_note(e.target.value?.toString())
                    }
                    value={facility_note}
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows={10}
                    maxLength={255}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewFacility;
