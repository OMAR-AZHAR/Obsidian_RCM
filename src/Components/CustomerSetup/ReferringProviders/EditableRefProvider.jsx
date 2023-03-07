import { useFormik } from "formik";
import { useState, useEffect, useCallback } from "react";
import { PatternFormat } from "react-number-format";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../Api/ClientApi";
import { FormValNewReferring } from "./FormValNewReferring";
import useFetch from "../../../Hooks/useFetch";
import { Alert } from "./../../../GLOBAL/SwalAlert";
import { useSelector, useDispatch } from "react-redux";
import {
  getEditRefZipCode,
  RefEditCity_stateFetch,
} from "../../../Redux/features/ReferringProviderRedux/Referring_City_stateSlice";
import useGet from "./../../../Hooks/useGet";
import { EditRefProviderFetch } from "../../../Redux/features/ReferringProviderRedux/EditableRefProviderSlice";
const EditableRefProvider = () => {
  const dispatch = useDispatch();
  const [individual_checked, setIndividualChecked] = useState(false);
  const [organization_checked, setOrgChecked] = useState(true);
  const [any_checked, setAnyChecked] = useState(false);
  const [search, setSearch] = useState("");
  const [citydata, setcitydata] = useState("");
  const [zipdata, setzipdata] = useState("");
  const [taxo_facility, settaxo_facility] = useState("");
  const [refererNameChecked, setrefererNameChecked] = useState(0);
  const [taxo_fac_desc, settaxo_fac_desc] = useState("");
  const [taxo_fac_id, settaxo_fac_id] = useState("");
  const { data: npicitydata, loading: loadnpicity } = useGet(
    `customersetup/practice/searchnpi?city=${citydata}`
  );
  const [refererclaim, setRefererClaim] = useState(false);
  const { data: npizipdata, loading: loadnpistate } = useGet(
    `customersetup/practice/searchnpi?city=${
      zipdata.match(/(?<!\d)\d{5}(?!\d)/gm) ||
      zipdata.match(/(?<!\d)\d{9}(?!\d)/gm)
        ? zipdata
        : ""
    }`
  );
  const { data: TaxData, loading: loadingtax } = useFetch(
    "customersetup/practice/taxonomyapi"
  );
  const [searchTax, setSearchTax] = useState("");
  const [NPI_Facility_Value, setNPI_Facility_Value] = useState("");
  // Data from API
  const refProviderID = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.id
  );
  const refProviderLName = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.last_name
  );
  const refProviderFName = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.first_name
  );
  const mi = useSelector((state) => state.EditableRefProvider.data?.[0]?.mi);
  const credentials = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.credentials
  );
  const organization_name = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.organization_name
  );
  const referring_type = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.referring_type
  );
  const send_ref_claim = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.send_ref_claim
  );
  const npi_code = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.npi_code
  );
  const address1 = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.address1
  );
  const address2 = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.address2
  );
  const city = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.city
  );
  const state = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.state
  );
  const zip = useSelector((state) => state.EditableRefProvider.data?.[0]?.zip);
  const refProviderzip = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.zip
  );
  const refProvidercity = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.city
  );
  const refProviderstate = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.state
  );
  const fax = useSelector((state) => state.EditableRefProvider.data?.[0]?.fax);
  const referrer_as = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.referrer_as
  );
  const phone = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.phone
  );
  const home_phone = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.home_phone
  );
  const cell_phone = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.cell_phone
  );
  const pager_no = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.pager_no
  );
  const tax_id = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.tax_id
  );
  const tax_id_type = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.tax_id_type
  );
  const bsbs_id = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.bsbs_id
  );

  const upin = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.upin
  );
  const medicare_id = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.medicare_id
  );
  const medicaid_id = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.medicaid_id
  );
  const champus_id = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.champus_id
  );
  const speciality_liscence = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.speciality_liscence
  );
  const state_license = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.state_license
  );
  const anesthesia_license = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.anesthesia_license
  );
  const marketer = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.marketer
  );
  const email = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.email
  );
  const rprovider_status = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.rprovider_status
  );
  const reference = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.reference
  );
  const sequence = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.sequence?.id
  );
  const notes = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.notes?.note
  );
  // Zip API
  const zipapi = useSelector(
    (state) => state.RefCityStateZip?.edit_zipcode?.ZipCode?.Zip5
  );
  const zipapiCity = useSelector(
    (state) => state.RefCityStateZip?.edit_zipcode?.ZipCode?.City
  );
  const zipapiState = useSelector(
    (state) => state.RefCityStateZip?.edit_zipcode?.ZipCode?.State
  );
  const taxonomy_ID = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.taxonomy_code?.id
  );
  const taxonomy_code = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.taxonomy_code?.taxo_code
  );
  const taxonomy_desc = useSelector(
    (state) => state.EditableRefProvider.data?.[0]?.taxonomy_code?.Description
  );
  const [RefInactive, setRefInactive] = useState(false);
  const [referring_lastname, setreferring_lastname] = useState("");
  const [referring_firstname, setreferring_firstname] = useState("");
  const [referring_mi, setreferring_mi] = useState("");
  const [referring_credentials, setreferring_credentials] = useState("");
  const [newreforganizationName, setnewreforganizationName] = useState("");
  const [referringsequence, setreferringsequence] = useState("");

  const [referringreference, setreferringreference] = useState("");
  const [referringaddress, setreferringaddress] = useState("");
  const [referringaddress2, setreferringaddress2] = useState("");
  const [newreferringhomephone, setnewreferringhomephone] = useState("");
  const [newreferringcellphone, setnewreferringcellphone] = useState("");
  const [newreferringphone, setnewreferringphone] = useState("");
  const [newreferringfax, setnewreferringfax] = useState("");
  const [newreferringpager, setnewreferringpager] = useState("");
  const [newreferringemail, setnewreferringemail] = useState("");
  const [newreferringtaxid, setnewreferringtaxid] = useState("");
  const [newreferringlocationupin, setnewreferringlocationupin] = useState("");
  const [newrefbcbsid, setnewrefbcbsid] = useState("");
  const [newreferringmedicareid, setnewreferringmedicareid] = useState("");
  const [newreferringmedicaidid, setnewreferringmedicaidid] = useState("");
  const [newreferringchampusid, setnewreferringchampusid] = useState("");
  const [newreferringspeclicense, setnewreferringspeclicense] = useState("");
  const [newrefstatelic, setnewrefstatelic] = useState("");
  const [newrefanesthesialic, setnewrefanesthesialic] = useState("");
  const [newrefmarketer, setnewrefmarketer] = useState("");
  const [NotetextChange, setNotetextChange] = useState("");
  const [referingtype, setReferringtype] = useState("Referring Provider");
  const [taxidtype, settaxidtype] = useState("NONE");
  // Set Zip API for Primary Office
  const [zipapicode, setzipapicode] = useState("");
  const [zipapi_city, setzipapi_city] = useState("");
  const [zipapi_state, setzipapi_state] = useState("");
  const params = useParams();
  useEffect(() => {
    if (params.id) {
      dispatch(EditRefProviderFetch(params.id));
    }
    // first is from useSelector, else is from input onChannge
    setRefInactive(rprovider_status ? rprovider_status : "");
    setreferring_lastname(refProviderLName ? refProviderLName : "");
    setreferring_firstname(refProviderFName ? refProviderFName : "");
    setreferring_mi(mi ? mi : "");
    setreferring_credentials(credentials ? credentials : "");
    setnewreforganizationName(organization_name ? organization_name : "");
    setreferringsequence(sequence ? sequence : "");
    setreferringreference(reference ? reference : "");
    setReferringtype(referring_type ? referring_type : "");
    setreferringaddress(address1 ? address1 : "");
    setreferringaddress2(address2 ? address2 : "");
    settaxo_facility(taxonomy_code ? taxonomy_code : taxo_facility);
    settaxo_fac_desc(taxonomy_desc ? taxonomy_desc : taxo_fac_desc);
    settaxo_fac_id(taxonomy_ID ? taxonomy_ID : taxo_fac_id);
    setnewreferringhomephone(home_phone ? home_phone : "");
    setnewreferringcellphone(cell_phone ? cell_phone : "");
    setnewreferringphone(phone ? phone : "");
    setnewreferringfax(fax ? fax : "");
    setnewreferringpager(pager_no ? pager_no : "");
    setnewreferringemail(email ? email : "");
    setnewreferringtaxid(tax_id ? tax_id : "");
    settaxidtype(tax_id_type ? tax_id_type : "");
    setnewreferringlocationupin(upin ? upin : "");
    setnewrefbcbsid(bsbs_id ? bsbs_id : "");
    setnewreferringmedicareid(medicare_id ? medicare_id : "");
    setnewreferringmedicaidid(medicaid_id ? medicaid_id : "");
    setnewreferringchampusid(champus_id ? champus_id : "");
    setnewreferringspeclicense(speciality_liscence ? speciality_liscence : "");
    setnewrefstatelic(state_license ? state_license : "");
    setnewrefanesthesialic(anesthesia_license ? anesthesia_license : "");
    setnewrefmarketer(marketer ? marketer : "");
    setNotetextChange(notes ? notes : "");
    // setzipapicode(zipapi ? zipapi : zip);
    // setzipapi_city(zipapiCity ? zipapiCity : city);
    // setzipapi_state(zipapiState ? zipapiState : state);
    setNPI_Facility_Value(npi_code ? npi_code : NPI_Facility_Value);
    setRefererClaim(send_ref_claim === 0 ? false : true);
  }, [
    notes,
    // zipapi,
    // zipapiCity,
    // zipapiState,
    zip,
    city,
    state,
    refProviderID,
    refProviderLName,
    mi,
    credentials,
    organization_name,
    referring_type,
    send_ref_claim,
    npi_code,
    address1,
    address2,
    refProviderzip,
    refProvidercity,
    refProviderstate,
    fax,
    phone,
    pager_no,
    tax_id,
    tax_id_type,
    bsbs_id,
    upin,
    medicare_id,
    medicaid_id,
    champus_id,
    speciality_liscence,
    state_license,
    anesthesia_license,
    marketer,
    rprovider_status,
    reference,
  ]);

  useEffect(() => {
    let a = true;
    setzipapicode(zipapi ? zipapi : zip);
    setzipapi_city(zipapiCity ? zipapiCity : city);
    setzipapi_state(zipapiState ? zipapiState : state);

    return () => {
      a = false;
    };
  }, [zipapi, refProviderID]);

  const navigate = useNavigate();

  let user = JSON.parse(sessionStorage.getItem("access"));
  let customerID = JSON.parse(sessionStorage.getItem("customer_id"));
  const initialValues = {
    // Names
    newreforganizationName: "",
    referring_lastname: "",
    referring_firstname: "",
    referring_mi: "",
    referring_credentials: "",
    // NPI, TaxSpec
    newreferringnpi: "",
    newreferringtaxonomySpeciality: "",
    // Contact Details
    newreferringcity: "",
    newreferringzipcode: "",
    newreferringphone: "",
    newreferringcellphone: "",
    newreferringhomephone: "",
    newreferringpager: "",
    newreferringfax: "",
    newreferringemail: "",
    referringsequence: "",
    referringreference: "",
    referringaddress: "",
    referringaddress2: "",
    newreferringstate: "",
    // IDs
    newreferringtaxid: "",
    newrefbcbsid: "",
    newreferringlocationupin: "",
    newreferringchampusid: "",
    newreferringspeclicense: "",
    newrefstatelic: "",
    newrefanesthesialic: "",
    newrefmarketer: "",
    newreferringmedicareid: "",
    newreferringmedicaidid: "",
    // Notes
    NotetextChange: "",
  };
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
    initialValues,
    // enableReinitialize: true,
    validationSchema: FormValNewReferring,
    validateOnChange: true,
    validateOnBlur: true,
    // By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: (values, action) => {
      // Send Data API
      API.put(
        `customersetup/referringprovider/update/${refProviderID}`,
        {
          newreforganizationName: newreforganizationName
            ?.toString()
            ?.toUpperCase()
            .trimStart(),
          // ********************
          referring_lastname: referring_lastname
            ?.toString()
            ?.toUpperCase()
            .trimStart(),
          referring_firstname: referring_firstname
            ?.toString()
            ?.toUpperCase()
            .trimStart(),
          referring_mi: referring_mi?.toString()?.toUpperCase().trimStart(),
          referring_credentials: referring_credentials
            ?.toString()
            ?.toUpperCase()
            .trimStart(),
          // *******************
          newreferringnpi: NPI_Facility_Value?.toString(),
          newreferringtaxonomySpeciality: taxo_fac_id,
          // *********************
          newreferringcity: zipapi_city
            ?.toString()
            ?.replace(/[^A-Za-z]/gi, "")
            .trimStart()
            .toUpperCase(),
          newreferringzipcode: zipapicode?.toString(),
          newreferringphone: newreferringphone?.toString(),
          newreferringfax: newreferringfax?.toString(),
          newreferringcellphone: newreferringcellphone?.toString(),
          newreferringhomephone: newreferringhomephone?.toString(),
          newreferringpager: newreferringpager?.toString(),
          newreferringemail: newreferringemail?.toString()?.trim(),
          // IDs *****************
          newreferringmedicareid: newreferringmedicareid
            ?.toString()
            ?.toUpperCase()
            .trimStart(),
          newreferringmedicaidid: newreferringmedicaidid
            ?.toString()
            ?.toUpperCase()
            .trimStart(),
          //   referringsequence: referringsequence?.toUpperCase().trimStart(),
          referringreference: referringreference
            ?.toString()
            ?.toUpperCase()
            .trimStart(),
          referringaddress: referringaddress
            ?.toString()
            ?.toUpperCase()
            .trimStart(),
          referringaddress2: referringaddress2
            ?.toString()
            ?.toUpperCase()
            .trimStart(),
          newreferringstate: zipapi_state
            ?.toString()
            ?.toUpperCase()
            .trimStart(),
          newreferringtaxid: newreferringtaxid?.toString()?.trim(),
          newrefbcbsid: newrefbcbsid?.toString()?.toUpperCase().trimStart(),
          newreferringlocationupin: newreferringlocationupin
            ?.toString()
            ?.toUpperCase()
            .trimStart(),
          newreferringchampusid: newreferringchampusid
            ?.toString()
            ?.toUpperCase()
            .trimStart(),
          newreferringspeclicense: newreferringspeclicense
            ?.toString()
            ?.toUpperCase()
            .trimStart(),
          newrefstatelic: newrefstatelic?.toString()?.toUpperCase().trimStart(),
          newrefanesthesialic: newrefanesthesialic
            ?.toString()
            ?.toUpperCase()
            .trimStart(),
          newrefmarketer: newrefmarketer?.toString()?.toUpperCase().trimStart(),
          // ****************
          NotetextChange: NotetextChange?.toString(),
          referingtype,
          taxidtype,
          refer_as: refererNameChecked,
          refererclaim: Number(refererclaim),
          RefInactive: Number(RefInactive),
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
              "Referring Provider Updated Successfully",
              false,
              1500
            );
            dispatch(getEditRefZipCode(""));
            settaxo_facility("");
            settaxo_fac_desc("");
            settaxo_fac_id("");
            setNPI_Facility_Value("");
            setNotetextChange("");
            settaxidtype("NONE");
            action.resetForm();
            navigate("/customersetup/referring-providers", {
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
  //   const [showNames, setShowNames] = useState(true);
  const fieldsChange = (e) => {
    setrefererNameChecked(e.target.value);
    // setShowNames(Boolean(referrer_as));
  };
  return (
    <div className="row d-flex mt-2">
      <div
        className="col-md-7"
        style={{ overflowY: "scroll", height: "calc(100vh - 127px)" }}
      >
        <form onSubmit={handleSubmit} action="post">
          <div className="col-md-5 mb-4 mt-3">
            <button
              type="submit"
              className="btn btn-outline-primary me-2 btn-sm"
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => {
                settaxo_facility("");
                settaxo_fac_desc("");
                settaxo_fac_id("");
                setNPI_Facility_Value("");
                setNotetextChange("");
                dispatch(getEditRefZipCode(""));
                navigate("/customersetup/referring-providers");
              }}
            >
              Cancel
            </button>
          </div>
          <div className="col-md-12">
            {referrer_as === 0 ? (
              <div className="col-md-6 d-flex">
                <div className="col-md-8">
                  <label className="fw-bold">Last Name</label>
                  <input
                    required
                    type="text"
                    className={`form-control form-control-sm `}
                    id="referring_lastname"
                    placeholder="Last Name"
                    autoComplete="off"
                    name="referring_lastname"
                    value={referring_lastname?.toString()}
                    onChange={(e) =>
                      setreferring_lastname(
                        e.target.value
                          ?.toString()
                          ?.toUpperCase()
                          .trimStart()
                          .replace(/[^A-Za-z ]/gi, "")
                      )
                    }
                    title={referring_lastname ? "" : "This field is required"}
                    maxLength={35}
                  />
                </div>

                <div className="col-md-7 mx-2">
                  <label className="fw-bold">First Name</label>
                  <input
                    required
                    type="text"
                    className={`form-control form-control-sm`}
                    id="referring_firstname"
                    placeholder="First Name"
                    autoComplete="off"
                    name="referring_firstname"
                    value={referring_firstname}
                    onChange={(e) =>
                      setreferring_firstname(
                        e.target.value
                          ?.toString()
                          ?.toUpperCase()
                          .trimStart()
                          .replace(/[^A-Za-z ]/gi, "")
                      )
                    }
                    title={referring_firstname ? "" : "This field is required"}
                    maxLength={20}
                  />
                </div>

                <div className="col-md-2">
                  <label className="fw-bold">MI</label>
                  <input
                    required={false}
                    maxLength={1}
                    type="text"
                    className={`form-control form-control-sm `}
                    id="referring_mi"
                    placeholder="MI"
                    autoComplete="off"
                    name="referring_mi"
                    value={referring_mi}
                    onChange={(e) =>
                      setreferring_mi(
                        e.target.value
                          ?.toString()
                          ?.toUpperCase()
                          ?.trim()
                          ?.replace(/[^A-Za-z]/gi, "")
                      )
                    }
                  />
                </div>

                <div className="col-md-6 mx-2">
                  <label className="fw-bold">Credentials</label>
                  <input
                    required={false}
                    type="text"
                    className={`form-control form-control-sm `}
                    id="referring_credentials"
                    placeholder="Credentials"
                    autoComplete="off"
                    name="referring_credentials"
                    value={referring_credentials
                      ?.toString()
                      ?.toUpperCase()
                      ?.trimStart()}
                    onChange={(e) =>
                      setreferring_credentials(
                        e.target.value?.toString()?.toUpperCase()?.trimStart()
                      )
                    }
                  />
                </div>
              </div>
            ) : (
              // ************* Organization Name *************
              <>
                <label className="fw-bold">Organization Name</label>
                <input
                  //   disabled={showNames}
                  type="text"
                  className="form-control"
                  id="newreforganizationName"
                  name="newreforganizationName"
                  placeholder="Organization Name"
                  autoComplete="off"
                  autoCapitalize="characters"
                  autoCorrect="off"
                  spellCheck="false"
                  value={newreforganizationName}
                  onChange={(e) =>
                    setnewreforganizationName(
                      e.target.value?.toString()?.trimStart()?.toUpperCase()
                    )
                  }
                  maxLength={60}
                  required
                />
              </>
            )}
          </div>

          <div className="col-md-12 mt-2 text-muted">
            This referer is an:{" "}
            <input
              className="form-check-input mx-1"
              type="radio"
              name="defaultrefererradio"
              id="Individual"
              checked={referrer_as === 0 && true}
              disabled
              // checked={refererNameChecked}
              value={0}
              onChange={(e) => fieldsChange(e)}
            />
            <label className="form-check-label me-2" htmlFor="Individual">
              Individual
            </label>
            <input
              className="form-check-input mx-1"
              type="radio"
              name="defaultrefererradio"
              id="Organization"
              checked={referrer_as === 1 && true}
              disabled
              //   checked={refererNameChecked}

              value={1}
              onChange={(e) => fieldsChange(e)}
            />
            <label className="form-check-label" htmlFor="Organization">
              Organization
            </label>
          </div>
          <div className="row">
            <div className="col-md-4 mt-2">
              <label className="fw-bold">Referring Type</label>
              <select
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
                // defaultValue={"Referring Provider"}
                value={referingtype}
                onChange={(e) => setReferringtype(e.target.value)}
                id="referring_type"
                name="referring_type"
              >
                <option value="Referring Provider">Referring Provider</option>
                <option value="Primary Care Provider">
                  Primary Care Provider
                </option>
              </select>
            </div>
            <div className="col-md-7 d-flex justify-content-end mt-4 user-select-none">
              <div className="form-check me-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  checked={RefInactive}
                  onChange={(e) => setRefInactive(e.target.checked)}
                  id="Inactive"
                />
                <label className="form-check-label" htmlFor="Inactive">
                  Make this referring provider inactive
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  checked={refererclaim}
                  onChange={(e) => setRefererClaim(e.target.checked)}
                  id="refereronclaim"
                />
                <label className="form-check-label" htmlFor="refereronclaim">
                  Do not send referer on claim
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-12 d-flex mt-2">
            <div className="col-md-4">
              <label className="fw-bold">NPI</label>
              <div className="input-group">
                <input
                  className="form-control form-control-sm placeTextTax"
                  type="text"
                  placeholder="NPI"
                  aria-label="npi"
                  id="newreferringnpi"
                  name="newreferringnpi"
                  autoComplete="off"
                  autoCapitalize="characters"
                  autoCorrect="off"
                  spellCheck="false"
                  onChange={(e) =>
                    setNPI_Facility_Value(
                      e.target.value?.replace(/[^0-9]/gi, "").trimStart()
                    )
                  }
                  value={NPI_Facility_Value?.replace(
                    /[^0-9]/gi,
                    ""
                  ).trimStart()}
                  maxLength={10}
                  required
                />

                <button
                  type="button"
                  className="input-group-text btn-hov"
                  id="newreferringnpibtn"
                  data-bs-toggle="modal"
                  data-bs-target="#NPIRegistryModaltriggerinRefProvider"
                >
                  <i className="fas fa-search" aria-hidden="true" />
                </button>

                {/* <NPI_REGISTRY_MODAL
                   
                  /> */}
                {/* ********************* 1st Modal Start (NPI Registry Input Fields) ********************* */}
                <div
                  className="modal fade text-dark"
                  id="NPIRegistryModaltriggerinRefProvider"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  aria-hidden="true"
                  aria-labelledby="NPIRegistryModaltriggerinRefProvider"
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
                          onClick={null}
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
                                // value={NPIfirstname.replace(
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
                                //
                                //
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
                              //
                              //
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
                              //
                              //
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
                                  onChange={(e) => setcitydata(e.target.value)}
                                  //
                                  //
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
                                  onChange={(e) => setSearch(e.target.value)}
                                  //
                                  //
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
                                  maxLength={5}
                                  //
                                  //
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
                          className="btn btn-sm btn-outline-primary"
                          data-bs-target="#exampleModalToggle2"
                          data-bs-toggle="modal"
                        >
                          Search
                        </button>
                        <button
                          onClick={null}
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
                          onClick={null}
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
                                                setNPI_Facility_Value(
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
                                                  setNPI_Facility_Value(
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
                                                setNPI_Facility_Value(
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
                                                  setNPI_Facility_Value(
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
                                                setNPI_Facility_Value(
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
                                                  setNPI_Facility_Value(
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
                                                setNPI_Facility_Value(
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
                                                  setNPI_Facility_Value(
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
                          data-bs-target="#NPIRegistryModaltriggerinRefProvider"
                          data-bs-toggle="modal"
                        >
                          Back to Search
                        </button>
                        <button
                          onClick={null}
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
                {/* ********************* 2nd Modal End (NPI Registry Table) ********************* */}
              </div>
            </div>
            <div className="col-md-3">
              <label className="fw-bold mx-2">Taxonomy</label>
              <div className="input-group mx-2">
                <input
                  className="form-control form-control-sm placeTextTax"
                  type="text"
                  placeholder="Taxonomy Speciality"
                  aria-label="npi"
                  id="newreferringtaxonomySpeciality"
                  name="newreferringtaxonomySpeciality"
                  autoComplete="off"
                  autoCapitalize="characters"
                  autoCorrect="off"
                  spellCheck="false"
                  style={{ cursor: "pointer" }}
                  data-bs-toggle="modal"
                  data-bs-target="#taxonomyspecmodal"
                  value={taxo_facility?.trimStart()}
                  //
                  maxLength={10}
                  required
                />
                <button
                  type="button"
                  className="input-group-text btn-hov"
                  id="Taxonomy"
                  data-bs-toggle="modal"
                  data-bs-target="#taxonomyspecmodal"
                >
                  <i className="fas fa-search" aria-hidden="true" />
                </button>

                {/* <TAXONOMY_SPEC_MODAL
                   
                  /> */}
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
                          "Loading..."
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
                                        ?.includes(searchTax?.toLowerCase()) ||
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
                                        settaxo_facility(taxo?.taxo_code);
                                        settaxo_fac_desc(taxo?.Description);
                                        settaxo_fac_id(taxo?.id);
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
              </div>
            </div>
            <div className="col-md-3 ms-3">{taxo_fac_desc}</div>
          </div>

          <div className="col-md-12 d-flex mt-2">
            <div className="col-md-3">
              <label className="fw-bold">Sequence #</label>
              <input
                type="text"
                className="form-control form-control-sm"
                disabled
                id="referringsequence"
                name="referringsequence"
                placeholder="NEW"
                autoComplete="off"
                autoCapitalize="characters"
                autoCorrect="off"
                spellCheck="false"
                // onChange={}
                value={referringsequence}
              />
            </div>
            <div className="col-md-3 mx-2">
              <label className="fw-bold">Reference #</label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="referringreference"
                name="referringreference"
                placeholder="Reference"
                autoComplete="off"
                autoCapitalize="characters"
                autoCorrect="off"
                spellCheck="false"
                onChange={(e) =>
                  setreferringreference(
                    e.target.value?.toString().toUpperCase().trimStart()
                  )
                }
                value={referringreference}
                maxLength={12}
              />
            </div>
          </div>

          <div className="col-xl-12 mt-3">
            <div className="card mb-2">
              <div className="card-header">Contact Information</div>
              <div className="card-body ">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <label className="text-dark fw-bold">Address</label>
                    <input
                      type="text"
                      className="form-control form-control-sm placeText"
                      id="referringaddress"
                      placeholder="Address"
                      name="referringaddress"
                      autoComplete="off"
                      autoCapitalize="characters"
                      autoCorrect="off"
                      spellCheck="false"
                      value={referringaddress?.toString()}
                      onChange={(e) =>
                        setreferringaddress(
                          e.target.value?.toString().toUpperCase().trimStart()
                        )
                      }
                      maxLength={40}
                      required
                    />
                  </div>
                  <div className="col-md-12 mt-2">
                    {/* <label className="text-dark fw-bold">Address 2</label> */}
                    <input
                      type="text"
                      className="form-control form-control-sm placeText"
                      id="referringaddress2"
                      placeholder=""
                      name="referringaddress2"
                      autoComplete="off"
                      autoCapitalize="characters"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={(e) =>
                        setreferringaddress2(
                          e.target.value?.toString().toUpperCase().trimStart()
                        )
                      }
                      value={referringaddress2}
                      //
                      maxLength={40}
                    />
                  </div>
                  <div className="col-md-12 d-flex mt-2">
                    <div className="col-md-5">
                      <label className="text-dark fw-bold">City</label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newreferringcity"
                        placeholder="City"
                        name="newreferringcity"
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
                        value={zipapi_city
                          ?.replace(/[^A-Za-z ]/gi, "")
                          .toUpperCase()
                          .trimStart()}
                        maxLength={28}
                        required={true}
                      />
                    </div>

                    <div className="col-md-2 mx-2">
                      <label className="text-dark mx-1 fw-bold">State</label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newreferringstate"
                        placeholder="State"
                        name="newreferringstate"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) => {
                          // setFieldValue(
                          //   "newfacilitystate",
                          //   e.target.value,
                          //   true
                          // );
                          setzipapi_state(
                            e.target.value
                              ?.toString()
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

                    <div className="col-md-4 mx-1">
                      <label className="text-dark fw-bold">Zip</label>
                      <PatternFormat
                        format="#####-####"
                        mask=""
                        type="text"
                        className="form-control form-control-sm"
                        id="newreferringzipcode"
                        name="newreferringzipcode"
                        placeholder="ZIP Code"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) => {
                          setzipapicode(
                            e.target.value?.replace(/[^0-9]/gi, "").trim()
                          );
                          (zipapicode.match(/(?<!\d)\d{4}(?!\d)/gm) ||
                            zipapicode.match(/(?<!\d)\d{8}(?!\d)/gm)) &&
                            dispatch(
                              RefEditCity_stateFetch(
                                e.target.value?.replace(/[^0-9]/gi, "").trim()
                              )
                            );
                        }}
                        value={zipapicode?.trim()}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mt-2">
                      <label className="text-dark fw-bold">Home Phone</label>
                      <PatternFormat
                        format="(###) ###-####"
                        pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                        title="Please Enter a Valid Phone #"
                        mask=""
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newreferringhomephone"
                        placeholder="Home Phone"
                        name="newreferringhomephone"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setnewreferringhomephone(e.target.value)
                        }
                        value={newreferringhomephone}
                      />
                    </div>

                    <div className="col-md-4 mt-2">
                      <label className="text-dark fw-bold">Cell Phone</label>
                      <PatternFormat
                        format="(###) ###-####"
                        pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                        title="Please Enter a Valid Phone #"
                        mask=""
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newreferringcellphone"
                        placeholder="Cell Phone"
                        name="newreferringcellphone"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setnewreferringcellphone(e.target.value)
                        }
                        value={newreferringcellphone}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 d-flex mt-2">
                    <div className="col-md-4">
                      <label className="text-dark fw-bold">Phone</label>
                      <PatternFormat
                        format="(###) ###-####"
                        pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                        title="Please Enter a Valid Phone #"
                        mask=""
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newreferringphone"
                        placeholder="Phone"
                        name="newreferringphone"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) => setnewreferringphone(e.target.value)}
                        value={newreferringphone}
                      />
                    </div>
                    <div className="col-md-4 mx-2">
                      <label className="text-dark fw-bold">Fax</label>
                      <PatternFormat
                        format="(###) ###-####"
                        pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                        title="Please Enter a Valid Phone #"
                        mask=""
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newreferringfax"
                        placeholder="Fax"
                        name="newreferringfax"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) => setnewreferringfax(e.target.value)}
                        value={newreferringfax}
                      />
                    </div>
                    <div className="col-md-3 mx-0">
                      <label className="text-dark fw-bold">Pager</label>
                      <PatternFormat
                        format="(###) ###-####"
                        pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                        title="Please Enter a Valid Phone #"
                        mask=""
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newreferringpager"
                        placeholder="Pager"
                        name="newreferringpager"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) => setnewreferringpager(e.target.value)}
                        value={newreferringpager}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 d-flex mt-2">
                    <div className="col-md-12 mt-1">
                      <label className="text-dark fw-bold">Email</label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newreferringemail"
                        placeholder="Email"
                        name="newreferringemail"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setnewreferringemail(
                            e.target.value?.toString().trim()
                          )
                        }
                        value={newreferringemail}
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
              <div className="card-body text-dark">
                <div className="col-md-12">
                  <div className="col-md-12 d-flex mt-2">
                    <div className="col-md-4">
                      <label className="text-dark fw-bold">Tax ID</label>
                      <PatternFormat
                        format="##-#######"
                        mask=""
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newreferringtaxid"
                        placeholder="Tax ID"
                        name="newreferringtaxid"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setnewreferringtaxid(
                            e.target.value
                              ?.toString()
                              ?.replace(/[^0-9]/gi, "")
                              ?.trim()
                          )
                        }
                        value={newreferringtaxid}
                      />
                    </div>
                    <div className="col-md-4 mx-2">
                      <label className="text-dark fw-bold">Tax ID Type</label>
                      <select
                        className="form-select form-select-sm"
                        aria-label=".form-select-sm example"
                        defaultValue={"NONE"}
                        value={taxidtype}
                        onChange={(e) => settaxidtype(e.target.value)}
                        id="referringtaxidtype"
                        name="referringtaxidtype"
                      >
                        <option value="NONE">NONE</option>
                        <option value="TIN">TIN</option>
                        <option value="SSN">SSN</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12 d-flex mt-3">
                    <div className="col-md-4">
                      <label className="text-dark fw-bold">UPIN</label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newreferringlocationupin"
                        placeholder="UPIN"
                        name="newreferringlocationupin"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setnewreferringlocationupin(e.target.value)
                            ?.toString()
                            ?.toUpperCase()
                            .trimStart()
                        }
                        value={newreferringlocationupin?.toString()}
                        maxLength="6"
                      />
                    </div>
                    <div className="col-md-4 mx-2 mt">
                      <label className="text-dark fw-bold">BCBS ID</label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newrefbcbsid"
                        placeholder="BCBS ID"
                        name="newrefbcbsid"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setnewrefbcbsid(e.target.value)
                            ?.toString()
                            ?.toUpperCase()
                            .trimStart()
                        }
                        value={newrefbcbsid.toUpperCase().trimStart()}
                        maxLength={15}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 d-flex mt-3">
                    <div className="col-md-4">
                      <label className="text-dark fw-bold">Medicare ID</label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newreferringmedicareid"
                        placeholder="Medicare ID"
                        name="newreferringmedicareid"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setnewreferringmedicareid(e.target.value)
                            ?.toString()
                            ?.toUpperCase()
                            .trimStart()
                        }
                        value={newreferringmedicareid}
                        maxLength="15"
                      />
                    </div>
                    <div className="col-md-4 mx-2 mt">
                      <label className="text-dark fw-bold">Medicaid ID</label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newreferringmedicaidid"
                        placeholder="Medicaid ID"
                        name="newreferringmedicaidid"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setnewreferringmedicaidid(e.target.value)
                            ?.toString()
                            ?.toUpperCase()
                            .trimStart()
                        }
                        value={newreferringmedicaidid}
                        maxLength="15"
                      />
                    </div>
                  </div>

                  <div className="col-md-12 d-flex mt-3">
                    <div className="col-md-4">
                      <label className="text-dark fw-bold">Champus ID</label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newreferringchampusid"
                        placeholder="Champus ID"
                        name="newreferringchampusid"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setnewreferringchampusid(e.target.value)
                            ?.toString()
                            ?.toUpperCase()
                            .trimStart()
                        }
                        value={newreferringchampusid}
                        maxLength="15"
                      />
                    </div>
                    <div className="col-md-4 mx-2 mt">
                      <label className="text-dark fw-bold">
                        Speciality License #
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newreferringspeclicense"
                        placeholder="Speciality License #"
                        name="newreferringspeclicense"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setnewreferringspeclicense(e.target.value)
                            ?.toString()
                            ?.toUpperCase()
                            .trimStart()
                        }
                        value={newreferringspeclicense}
                        maxLength="15"
                      />
                    </div>
                  </div>

                  <div className="col-md-12 d-flex mt-3">
                    <div className="col-md-4">
                      <label className="text-dark fw-bold">
                        State License #
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newrefstatelic"
                        placeholder="State License #"
                        name="newrefstatelic"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setnewrefstatelic(e.target.value)
                            ?.toString()
                            ?.toUpperCase()
                            .trimStart()
                        }
                        value={newrefstatelic}
                        maxLength="15"
                      />
                    </div>
                    <div className="col-md-4 mx-2">
                      <label className="text-dark fw-bold">
                        Anesthesia License #
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="newrefanesthesialic"
                        placeholder="Anesthesia License #"
                        name="newrefanesthesialic"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setnewrefanesthesialic(e.target.value)
                            ?.toString()
                            ?.toUpperCase()
                            .trimStart()
                        }
                        value={newrefanesthesialic}
                        maxLength="15"
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mt-2">
                    <label className="text-dark fw-bold">Marketer</label>
                    <input
                      type="text"
                      className="form-control form-control-sm placeText"
                      id="newrefmarketer"
                      placeholder="Marketer"
                      name="newrefmarketer"
                      autoComplete="off"
                      autoCapitalize="characters"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={(e) =>
                        setnewrefmarketer(e.target.value)
                          ?.toString()
                          ?.toUpperCase()
                          .trimStart()
                      }
                      value={newrefmarketer}
                      maxLength={10}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="col-md-5">
        <div className="accordion overflow-custom-height" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button collapsed"
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
              className={`accordion-collapse collapse ${notes ? "show" : ""}`}
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body px-2 py-2">
                <div className="px-0 mx-0">
                  <textarea
                    value={NotetextChange}
                    onChange={(e) => setNotetextChange(e.target.value)}
                    className="form-control"
                    id="ReferringNotes"
                    rows="8"
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
export default EditableRefProvider;
