import { useFormik } from "formik";
import { lazy, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormValNewProvider } from "./FormValNewProvider";
const BillClaimsUnderAllProviderModal = lazy(() =>
  import("./BillClaimsUnderAllProviderModal")
);
const EligibilityUnderAllProviderModal = lazy(() =>
  import("./EligibilityUnderAllProviderModal")
);
import { useDispatch, useSelector } from "react-redux";
import {
  setBillClicked,
  setEligibilityUnderClicked,
} from "../../../Redux/features/Providers/AllPRoviderSlice";
import API from "../../../Api/ClientApi";

import { Alert } from "../../../GLOBAL/SwalAlert";
// import { useState, useCallback } from 'react';
import useGet from "../../../Hooks/useGet";
import useFetch from "../../../Hooks/useFetch";
import { PatternFormat } from "react-number-format";
import { EditProviderFetch } from "../../../Redux/features/Providers/EditableProviderSlice";

const EditableProvider = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const billClaimUnder = useSelector(
    (state) => state.AllProviderSlice.billClaimUnder
  );
  const eligibilitUnder = useSelector(
    (state) => state.AllProviderSlice.eligibilitUnder
  );

  // Data from API
  const providerID = useSelector(
    (state) => state.Editable_Provider.data?.[0]?.id
  );
  const first_name = useSelector(
    (state) => state.Editable_Provider.data?.[0]?.first_name
  );
  const last_name = useSelector(
    (state) => state.Editable_Provider.data?.[0]?.last_name
  );
  const organization_name = useSelector(
    (state) => state.Editable_Provider.data?.[0]?.organization_name
  );
  const provider_type = useSelector(
    (state) => state.Editable_Provider.data?.[0]?.provider_type
  );
  const credentials = useSelector(
    (state) => state.Editable_Provider.data?.[0]?.credentials
  );

  const mi = useSelector((state) => state.Editable_Provider.data?.[0]?.mi);
  const npi_code = useSelector(
    (state) => state.Editable_Provider.data?.[0]?.npi_code
  );
  const taxonomy_spec_id = useSelector(
    (state) => state.Editable_Provider.data?.[0]?.taxonomy_spec_id
  );
  const taxonomy_spec_code = useSelector(
    (state) => state.Editable_Provider.data?.[0]?.taxonomy_code?.taxo_code
  );
  const taxonomy_spec_desc = useSelector(
    (state) => state.Editable_Provider.data?.[0]?.taxonomy_code?.Description
  );
  const reference = useSelector(
    (state) => state.Editable_Provider.data?.[0]?.reference
  );
  const provider_code = useSelector(
    (state) => state.Editable_Provider.data?.[0]?.provider_code
  );

  const pager = useSelector(
    (state) => state.Editable_Provider.data?.[0]?.pager
  );
  const provider_status = useSelector(
    (state) => state.Editable_Provider.data?.[0]?.provider_status
  );
  const home_phone = useSelector(
    (state) => state.Editable_Provider.data?.[0]?.home_phone
  );

  const cell_phone = useSelector(
    (state) => state.Editable_Provider.data?.[0]?.cell_phone
  );
  const fax = useSelector((state) => state.Editable_Provider.data?.[0]?.fax);
  const email = useSelector(
    (state) => state.Editable_Provider.data?.[0]?.email
  );
  const sequence_num = useSelector(
    (state) => state.Editable_Provider.data?.[0]?.sequence?.id
  );

  // Provider billling data
  const claim_under_id = useSelector(
    (state) =>
      state.Editable_Provider.data?.[0]?.provider_billing
        ?.provider_bil_claim_under?.id
  );
  const claim_under_fname = useSelector(
    (state) =>
      state.Editable_Provider.data?.[0]?.provider_billing
        ?.provider_bill_claim_under?.first_name
  );
  const claim_under_lname = useSelector(
    (state) =>
      state.Editable_Provider.data?.[0]?.provider_billing
        ?.provider_bill_claim_under?.last_name
  );

  const check_elig_underID = useSelector(
    (state) =>
      state.Editable_Provider.data?.[0]?.provider_billing
        ?.provider_check_eligibility_under?.id
  );
  const check_elig_under_FName = useSelector(
    (state) =>
      state.Editable_Provider.data?.[0]?.provider_billing
        ?.provider_check_eligibility_under?.first_name
  );
  const check_elig_under_LName = useSelector(
    (state) =>
      state.Editable_Provider.data?.[0]?.provider_billing
        ?.provider_check_eligibility_under?.last_name
  );
  const claim_provider_id = useSelector(
    (state) =>
      state.Editable_Provider.data?.[0]?.provider_billing?.claim_provider_id
  );
  const bill_as = useSelector(
    (state) => state.Editable_Provider.data?.[0]?.provider_billing?.bill_as
  );
  const specialty_license = useSelector(
    (state) =>
      state.Editable_Provider.data?.[0]?.provider_billing?.specialty_license
  );

  const state_license = useSelector(
    (state) =>
      state.Editable_Provider.data?.[0]?.provider_billing?.state_license
  );
  const anesthesia_license = useSelector(
    (state) =>
      state.Editable_Provider.data?.[0]?.provider_billing?.anesthesia_license
  );
  const upin = useSelector(
    (state) => state.Editable_Provider.data?.[0]?.provider_billing?.upin
  );

  const blue_cross = useSelector(
    (state) => state.Editable_Provider.data?.[0]?.provider_billing?.blue_cross
  );
  const champus_num = useSelector(
    (state) => state.Editable_Provider.data?.[0]?.provider_billing?.champus_num
  );
  const revenue_codes_id = useSelector(
    (state) =>
      state.Editable_Provider.data?.[0]?.provider_billing?.revenue_code?.id
  );
  const revenue_codes_Code = useSelector(
    (state) =>
      state.Editable_Provider.data?.[0]?.provider_billing?.revenue_code
        ?.revenue_code
  );
  const prov_practice_id = useSelector(
    (state) =>
      state.Editable_Provider.data?.[0]?.provider_billing
        ?.provider_billing_practice?.id
  );
  const prov_practice_name = useSelector(
    (state) =>
      state.Editable_Provider.data?.[0]?.provider_billing
        ?.provider_billing_practice?.name
  );

  const SSN_EIN_value = useSelector(
    (state) => state.Editable_Provider.data?.[0]?.provider_billing?.id_num
  );
  const SSN_EIN_type = useSelector(
    (state) => state.Editable_Provider.data?.[0]?.provider_billing?.id_type
  );
  const notes = useSelector(
    (state) => state?.Editable_Provider?.data?.[0]?.notes?.note
  );
  const [searchRev, setSearchRev] = useState("");
  const [ProfMode, setProfMode] = useState("");
  const [InstMode, setInstMode] = useState("");

  const navigate = useNavigate();
  const { data: showallpractices, loading: loadpractices } = useFetch(
    "customersetup/practice"
  );
  const { data: Revdata, loading } = useFetch(
    "customersetup/provider/revenuedata"
  );
  const [BillClaim, setBillClaim] = useState(0);
  const [Bill_ClaimName, setBillClaimName] = useState("");
  const [CheckEligID, setCheckEligID] = useState(0);
  const [CheckEligName, setCheckEligName] = useState("");
  const checkeligiID = (checkeligiID) => {
    setCheckEligID(checkeligiID);
  };
  const checkeligiName = (checkeligiName) => {
    setCheckEligName(checkeligiName);
  };
  const billclaimsID = (billclaimsid) => {
    setBillClaim(billclaimsid);
  };
  const billClaimName = (billname) => {
    setBillClaimName(billname);
  };
  const [RevCode, setRevCode] = useState("");
  const [revID, setRevID] = useState(null);
  // ======= To Editable Form =======

  const ToEditable = useCallback(
    // Goto User Editable form
    (id) => {
      navigate(`/EditablePractice/${id}`, { replace: true });
    },
    [navigate]
  );
  const [searchshowallpractices, setsearchshowallpractices] = useState("");
  const [inactiveChecked, setInactiveChecked] = useState(false);
  // ======= Variables from te parent component =======
  const searchpractices = searchshowallpractices;
  const Checked = inactiveChecked;
  // showhide individual/Organization
  const [showHideUserDetails, setShowHideUserDetails] = useState(true); // Individual
  const [showHideOrgDetails, setShowHideOrgDetails] = useState(false); // Organization
  const [providertype, setProvidertype] = useState("individual");
  const [PracticeProv, setPractiveProv] = useState("");
  const [PractiveProvID, setPractiveProvID] = useState(0);
  //individual/org details handler
  const individualHandler = (e) => {
    setShowHideUserDetails(true);
    setShowHideOrgDetails(false);
    setProvidertype(e.target.value);
  };
  const organizationHandler = (e) => {
    setShowHideUserDetails(false);
    setShowHideOrgDetails(true);
    setProvidertype(e.target.value);
  };
  const configureEligib = useCallback(
    () => navigate("/configureEligibility", { replace: true }),
    [navigate]
  );
  const [NPIVal, SetNPIVal] = useState("");
  // ******* NPI Registry Modal Stuff *******
  const [individual_checked, setIndividualChecked] = useState(false);
  const [organization_checked, setOrgChecked] = useState(true);
  const [any_checked, setAnyChecked] = useState(false);
  const [search, setSearch] = useState("");
  const [citydata, setcitydata] = useState("");
  const [zipdata, setzipdata] = useState("");
  // ******* Taxonomy Modal Stuff *******
  const { data: TaxData, loading: loadingtax } = useFetch(
    "customersetup/practice/taxonomyapi"
  );
  const [searchTaxo, setSearchTaxo] = useState("");
  const { data: npicitydata, loading: loadnpicity } = useGet(
    `customersetup/practice/searchnpi?city=${citydata}`
  );
  const [EIN_SSN, setSSN] = useState(0);
  const { data: npizipdata, loading: loadnpistate } = useGet(
    `customersetup/practice/searchnpi?city=${
      zipdata.match(/(?<!\d)\d{5}(?!\d)/gm) ||
      zipdata.match(/(?<!\d)\d{9}(?!\d)/gm)
        ? zipdata
        : ""
    }`
  );
  const [Prov_Notes, setNotes] = useState("");

  const [gettaxoid, setTaxoid] = useState("");
  const [gettaxocode, setTaxocode] = useState("");
  const [gettaxodesc, setTaxodesc] = useState("");
  let user = JSON.parse(sessionStorage.getItem("access"));
  let customerID = JSON.parse(sessionStorage.getItem("customer_id"));

  const [providerfirstname, setproviderfirstname] = useState("");
  const [providerlastname, setproviderlastname] = useState("");
  const [providercredentials, setprovidercredentials] = useState("");
  const [providerOrgname, setproviderOrgname] = useState("");
  const [providermi, setprovidermi] = useState("");
  const [sequence, setsequence] = useState("");
  const [providerreference, setproviderreference] = useState("");
  const [providecode, setprovidecode] = useState("");
  const [providerinactive, SetProviderInactive] = useState(false);
  const [providerssn, setproviderssn] = useState("");
  const [Billas, setBillas] = useState(0);
  const [providerhomephone, setproviderhomephone] = useState("");
  const [providercellphone, setprovidercellphone] = useState("");
  const [providerfax, setproviderfax] = useState("");
  const [providerpager, setproviderpager] = useState("");
  const [provideremail, setprovideremail] = useState("");
  const [specialityLicense, setspecialityLicense] = useState("");
  const [stateLicense, setstateLicense] = useState("");
  const [anesthesiaLicense, setanesthesiaLicense] = useState("");
  const [upin_provider, setupin] = useState("");
  const [providerbluecross, setbluecross] = useState("");
  const [providertricareChamp, settricareChamp] = useState("");

  //   const [providerlastname, setproviderlastname] = useState("")

  useEffect(() => {
    if (params.id) {
      dispatch(EditProviderFetch(params.id));

      setproviderfirstname(first_name ? first_name : "");
      setproviderlastname(last_name ? last_name : "");
      setprovidermi(mi ? mi : "");
      setproviderOrgname(organization_name ? organization_name : "");
      setprovidercredentials(credentials ? credentials : "");
      setproviderreference(reference ? reference : "");
      setprovidecode(provider_code ? provider_code : "");
      setsequence(sequence_num ? sequence_num : "");
      SetNPIVal(npi_code ? npi_code : "");
      setTaxodesc(taxonomy_spec_desc ? taxonomy_spec_desc : gettaxodesc);
      // taxonomy_spec_desc
      setTaxocode(taxonomy_spec_code ? taxonomy_spec_code : gettaxocode);
      setTaxoid(taxonomy_spec_id ? taxonomy_spec_id : gettaxoid);

      setPractiveProv(prov_practice_name ? prov_practice_name : "");
      setPractiveProvID(prov_practice_id ? prov_practice_id : "");
      setBillClaim(claim_under_id ? claim_under_id : "");
      setBillClaimName(
        claim_under_lname ? claim_under_lname + claim_under_fname : ""
      );
      setCheckEligID(check_elig_underID ? check_elig_underID : "");
      setCheckEligName(
        check_elig_under_LName + check_elig_under_FName
          ? check_elig_under_LName + check_elig_under_FName
          : ""
      );
      setProvidertype(provider_type ? provider_type : "");

      setShowHideUserDetails(organization_name ? false : true); // if orgname then false
      setShowHideOrgDetails(organization_name ? true : false); // if orgname then true

      setproviderhomephone(home_phone ? home_phone : "");
      setprovidercellphone(cell_phone ? cell_phone : "");
      setproviderfax(fax ? fax : "");
      setproviderpager(pager ? pager : "");
      setprovideremail(email ? email : "");
      setBillas(bill_as ? bill_as : "");
      setspecialityLicense(specialty_license ? specialty_license : "");
      setstateLicense(state_license ? state_license : "");

      setanesthesiaLicense(anesthesia_license ? anesthesia_license : "");
      setupin(upin ? upin : "");
      setbluecross(blue_cross ? blue_cross : "");
      settricareChamp(champus_num ? champus_num : "");
      setRevCode(revenue_codes_Code ? revenue_codes_Code : "");
      setRevID(revenue_codes_id ? revenue_codes_id : "");
      setproviderssn(SSN_EIN_value ? SSN_EIN_value : "");
      setSSN(SSN_EIN_type ? SSN_EIN_type : "");
      SetProviderInactive(
        providerinactive ? !providerinactive : !provider_status
      );
      setNotes(notes ? notes : "");
    }
  }, [
    params,

    first_name,
    last_name,
    mi,
    notes,
    provider_type,
    credentials,
    npi_code,
    taxonomy_spec_id,
    reference,
    provider_code,
    pager,
    provider_status,
    home_phone,
    cell_phone,
    fax,
    email,
    claim_under_id,
    claim_under_fname,
    claim_under_lname,
    // bill_claim_under,
    claim_provider_id,
    bill_as,
    specialty_license,
    state_license,
    anesthesia_license,
    upin,
    blue_cross,
    champus_num,
    revenue_codes_id,
    revenue_codes_Code,

    check_elig_under_LName,
    check_elig_under_FName,
    SSN_EIN_value,
    SSN_EIN_type,
    taxonomy_spec_desc,
    taxonomy_spec_code,
    taxonomy_spec_id,
  ]);
  function put() {
    API.put(
      `customersetup/provider/update/${providerID}`,
      {
        providerindividuallastname: providerlastname
          ?.toString()
          ?.replace(/[^A-Za-z ]/gi, "")
          ?.toUpperCase(),
        providerindividualfirstname: providerfirstname
          ?.toString()
          ?.replace(/[^A-Za-z ]/gi, "")
          ?.toUpperCase(),
        providerindividualcredentials: providercredentials
          ?.toString()
          ?.toUpperCase(),
        providerindividualmi: providermi
          ?.toString()
          ?.replace(/[^A-Za-z ]/gi, "")
          ?.toUpperCase(),
        providerOrganizationname: providerOrgname
          ?.toString()
          ?.replace(/[^A-Za-z ]/gi, "")
          ?.toUpperCase(),
        providertype: providertype,
        providernpi: NPIVal,
        providertaxonomySpeciality: Number(gettaxoid),
        providerreference: providerreference,
        providecode: providecode,
        providerPractice: Number(PractiveProvID),
        providerssn_ein: providerssn,
        providerhomephone: providerhomephone,
        providercellphone: providercellphone,
        providerfax: providerfax,
        providerpager: providerpager,
        provideremail: provideremail,
        specialityLicense: specialityLicense?.toString()?.toUpperCase(),
        stateLicense: stateLicense?.toString()?.toUpperCase(),
        anesthesiaLicense: anesthesiaLicense?.toString()?.toUpperCase(),
        upin: upin_provider?.toString()?.toUpperCase(),
        bluecross: providerbluecross?.toString()?.toUpperCase(),
        tricareChamp: providertricareChamp?.toString()?.toUpperCase(),
        checkEligibility: Number(CheckEligID),
        BillClaimUnder: Number(BillClaim),
        Billas: Number(Billas),
        revID,
        EIN_SSN,
        ProfMode,
        InstMode,
        Prov_Notes,
        provider_status: Number(!providerinactive),
      },
      {
        headers: {
          Authorization: `Bearer ${user}`,
          customer_id: customerID,
        },
      }
    ).then(function (response) {
      if (response.data.status === 200 || response.data.status === 201) {
        Alert(
          "center",
          "success",
          "Provider Updated Successfully",
          false,
          1500
        );
        setPractiveProv("");
        setPractiveProvID("");
        SetNPIVal("");
        setTaxoid("");
        setTaxocode("");
        setTaxodesc("");
        setRevCode("");
        setBillClaimName("");
        setCheckEligName("");
        // action.resetForm();

        navigate("/customersetup/providers", { replace: true });
      }
      if (response.data.status === 422) {
        Alert("center", "error", response.data.message, false, 2500);
      } else if (response.data.status === 500) {
        Alert("center", "error", response.data.error, false, 2500);
      }
    });
  }
  function post() {
    API.post(
      "customersetup/provider/store",
      {
        providerindividuallastname: providerlastname
          ?.toString()
          ?.replace(/[^A-Za-z ]/gi, "")
          ?.toUpperCase(),
        providerindividualfirstname: providerfirstname
          ?.toString()
          ?.replace(/[^A-Za-z ]/gi, "")
          ?.toUpperCase(),
        providerindividualcredentials: providercredentials
          ?.toString()
          ?.toUpperCase(),
        providerindividualmi: providermi
          ?.toString()
          ?.replace(/[^A-Za-z ]/gi, "")
          ?.toUpperCase(),
        providerOrganizationname: providerOrgname
          ?.toString()
          ?.replace(/[^A-Za-z ]/gi, "")
          ?.toUpperCase(),
        providertype: providertype,
        providernpi: NPIVal,
        providertaxonomySpeciality: Number(gettaxoid),
        providerreference: providerreference,
        providecode: providecode,
        providerPractice: Number(PractiveProvID),
        providerssn_ein: providerssn,
        providerhomephone: providerhomephone,
        providercellphone: providercellphone,
        providerfax: providerfax,
        providerpager: providerpager,
        provideremail: provideremail,
        specialityLicense: specialityLicense?.toString()?.toUpperCase(),
        stateLicense: stateLicense?.toString()?.toUpperCase(),
        anesthesiaLicense: anesthesiaLicense?.toString()?.toUpperCase(),
        upin: upin_provider?.toString()?.toUpperCase(),
        bluecross: providerbluecross?.toString()?.toUpperCase(),
        tricareChamp: providertricareChamp?.toString()?.toUpperCase(),
        checkEligibility: Number(CheckEligID),
        BillClaimUnder: Number(BillClaim),
        Billas: Number(Billas),
        revID,
        EIN_SSN,
        ProfMode,
        InstMode,
        Notes: Prov_Notes,
        provider_status: Number(!providerinactive),
      },
      {
        headers: {
          Authorization: `Bearer ${user}`,
          customer_id: customerID,
        },
      }
    ).then(function (response) {
      if (response.data.status === 200 || response.data.status === 201) {
        Alert("center", "success", "Provider Added Successfully", false, 1500);
        setPractiveProv("");
        setPractiveProvID("");
        SetNPIVal("");
        setTaxoid("");
        setTaxocode("");
        setTaxodesc("");
        setRevCode("");
        setBillClaimName("");
        setCheckEligName("");
        // action.resetForm();

        navigate("/customersetup/providers", { replace: true });
      }
      if (response.data.status === 422) {
        Alert("center", "error", response.data.message, false, 2500);
      } else if (response.data.status === 500) {
        Alert("center", "error", response.data.error, false, 2500);
      }
    });
  }
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        providerlastname: "",
        providerfirstname: "",
        providermi: "",
        providercredentials: "",
        providerOrgname: "",
        providernpi: "",
        providertaxonomySpeciality: "",
        providerreference: "",
        providecode: "",
        providerPractice: "",
        providerssn: "",
        providerhomephone: "",
        providercellphone: "",
        providerfax: "",
        providerpager: "",
        provideremail: "",
        specialityLicense: "",
        stateLicense: "",
        anesthesiaLicense: "",
        upin: "",
        bluecross: "",
        tricareChamp: "",
      },
      validationSchema: FormValNewProvider,
      validateOnChange: true,
      validateOnBlur: false,
      // By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: (values, action) => {
        params.id ? put() : post();
        // to get rid of all the values after submitting the form
        action.resetForm();
      },
    });
  return (
    <div className="row px-md-0 py-md-0 pt-md-0 my-0">
      <div className="col-md-4 mt-3">
        <button
          type="button"
          disabled
          onClick={configureEligib}
          className="btn btn-outline-primary btn-sm mb-2"
        >
          <span className="fas fa-cogs" /> Configure Eligibility
        </button>
      </div>
      <div className="col-md-12 d-flex mt-2">
        <div
          className="col-md-6 pe-2"
          style={{
            overflowX: "hidden",
            overflowY: "scroll",
            height: "calc(100vh - 127px)",
          }}
        >
          <form onSubmit={handleSubmit} action="post">
            <div className="col-md-12 d-flex justify-content-end mb-4 mt-1">
              {params.id ? (
                <button
                  disabled={false}
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
                  setBillClaimName("");
                  setCheckEligName("");
                  setRevCode("");
                  navigate("/customersetup/providers");
                }}
              >
                Close
              </button>
            </div>

            {showHideUserDetails && (
              <div className="col-md-12 d-flex">
                <div className="col-md-3">
                  <label className="fw-bold">Last Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="providerlastname"
                    name="providerlastname"
                    placeholder="Last"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    onChange={(e) =>
                      setproviderlastname(
                        e.target.value
                          ?.toString()
                          ?.replace(/[^A-Za-z ]/gi, "")
                          .trimStart()
                          .toUpperCase()
                      )
                    }
                    value={providerlastname}
                    required
                    maxLength={60}
                  />
                </div>
                <div className="col-md-3">
                  <label className="fw-bold mx-2">First Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm mx-2"
                    id="providerfirstname"
                    name="providerfirstname"
                    placeholder="First"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    onChange={(e) =>
                      setproviderfirstname(
                        e.target.value
                          ?.toString()
                          ?.replace(/[^A-Za-z ]/gi, "")
                          .trimStart()
                          .toUpperCase()
                      )
                    }
                    value={providerfirstname}
                    required
                    maxLength={35}
                  />
                </div>
                <div className="col-md-1">
                  <label className="fw-bold mx-3">MI</label>
                  <input
                    type="text"
                    className="form-control form-control-sm mx-3"
                    id="mi"
                    name="providermi"
                    placeholder="MI"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    onChange={(e) =>
                      setprovidermi(
                        e.target.value
                          ?.toString()
                          ?.replace(/[^A-Za-z ]/gi, "")
                          .trim()
                          .toUpperCase()
                      )
                    }
                    value={providermi}
                    required={false}
                    maxLength={1}
                  />
                </div>
                <div className="col-md-3">
                  <label className="fw-bold mx-4">Credentials</label>
                  <input
                    type="text"
                    className="form-control form-control-sm mx-4"
                    id="providercredentials"
                    name="providercredentials"
                    placeholder="Credentials"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    onChange={(e) =>
                      setprovidercredentials(
                        e.target.value?.toString()?.toUpperCase()?.trimStart()
                      )
                    }
                    value={providercredentials?.toString()}
                    maxLength={10}
                  />
                </div>
              </div>
            )}
            {showHideOrgDetails && (
              <div className="col-md-11">
                <label className="fw-bold">Organization Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="providerOrgname"
                  name="providerOrgname"
                  placeholder="Organization Name"
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                  onChange={(e) =>
                    setproviderOrgname(
                      e.target.value
                        ?.toString()
                        // ?.replace(/[^A-Za-z ]/gi, "")
                        ?.trimStart()
                        ?.toUpperCase()
                    )
                  }
                  value={providerOrgname}
                  required
                  maxLength={60}
                />
              </div>
            )}
            <div className="col-md-9 d-flex mt-2">
              <label
                htmlFor=""
                // className="text-muted"
              >
                This provider is an:
              </label>
              <div className="form-check mx-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="providerType"
                  id="individual"
                  value="individual"
                  // onClick={() => setIndividualChecked(true)}
                  onChange={individualHandler}
                  checked={showHideUserDetails}
                />
                <label className="form-check-label" htmlFor="individual">
                  Individual
                </label>
              </div>
              <div className="form-check mx-2">
                <input
                  // disabled
                  className="form-check-input"
                  type="radio"
                  name="providerType"
                  id="organization"
                  value="organization"
                  // onClick={() => setOrgChecked(true)}
                  checked={showHideOrgDetails}
                  onChange={organizationHandler}
                />
                <label className="form-check-label" htmlFor="organization">
                  Organization
                </label>
              </div>
            </div>
            <div className="col md-12 d-flex justify-content-start mt-2">
              {" "}
              {params.id ? (
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="makeprovinactive"
                    checked={providerinactive}
                    onChange={(e) => SetProviderInactive(e.target.checked)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="makeprovinactive"
                  >
                    Make this Provider inactive
                  </label>
                </div>
              ) : (
                ""
              )}
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
                    id="providernpi"
                    name="providernpi"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    onChange={(e) =>
                      SetNPIVal(
                        e.target.value?.replace(/[^0-9]/gi, "")?.trimStart()
                      )
                    }
                    value={NPIVal?.replace(/[^0-9]/gi, "")?.trimStart()}
                    //
                    required
                    maxLength={10}
                    minLength={10}
                    title="NPI must be 10 digits"
                  />
                  <button
                    type="button"
                    className="input-group-text btn-hov"
                    id="NPIRegistryModaltriggerinProviderbtn"
                    data-bs-toggle="modal"
                    data-bs-target="#NPIRegistryModaltriggerinProvider"
                  >
                    <i className="fas fa-search" aria-hidden="true" />
                  </button>
                </div>
                {touched.providernpi && errors.providernpi ? (
                  <p className="form-error mx-2">*{errors.providernpi}</p>
                ) : null}
                {/* ********************* 1st Modal Start (NPI Registry Input Fields) ********************* */}
                <div
                  className="modal fade text-dark"
                  id="NPIRegistryModaltriggerinProvider"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  aria-hidden="true"
                  aria-labelledby="NPIRegistryModaltriggerinProvider"
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
                                // onChange={handleChange}
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
                              // onChange={handleChange}
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
                              // onChange={handleChange}
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
                                  // onChange={handleChange}
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
                                  // onChange={handleChange}
                                  //
                                  // value={NPIstate.toUpperCase()}
                                  maxLength={2}
                                />
                              </div>
                              <div className="col-md-3">
                                <input
                                  // format="#####-####"
                                  // mask=""
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
                            <table className="table table-sm table-light table-hover table-striped table table-bordered">
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
                                                SetNPIVal(pract?.[1]);
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
                                                  SetNPIVal(pract?.[1]);
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
                                                SetNPIVal(pract?.[1]);
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
                                                  SetNPIVal(pract?.[1]);
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
                                                SetNPIVal(pract?.[1]);
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
                                                  SetNPIVal(pract?.[1]);
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
                                                SetNPIVal(pract?.[1]);
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
                                                  SetNPIVal(pract?.[1]);
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
                          data-bs-target="#NPIRegistryModaltriggerinProvider"
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
                {/* ********************* 2nd Modal End (NPI Registry Table) ********************* */}
              </div>

              <div className="col-md-3">
                <label className="fw-bold mx-1">Taxonomy</label>
                <div className="input-group mx-2">
                  <input
                    className="form-control form-control-sm placeTextTax"
                    type="text"
                    placeholder="Taxonomy Speciality"
                    aria-label="npi"
                    id="providertaxonomySpeciality"
                    name="providertaxonomySpeciality"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    data-bs-toggle="modal"
                    style={{ cursor: "pointer" }}
                    data-bs-target="#taxonomyspecmodal"
                    value={gettaxocode}
                    required
                    //
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
                </div>
                {touched.providertaxonomySpeciality &&
                errors.providertaxonomySpeciality ? (
                  <p className="form-error mx-2">
                    *{errors.providertaxonomySpeciality}
                  </p>
                ) : null}
              </div>
              <div className="col-md-4 mx-4">
                <span>{gettaxodesc}</span>
              </div>
              {/* ************************* Taxonomy Modal ************************** */}
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
                          onChange={(e) => setSearchTaxo(e.target.value)}
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
                                return searchTaxo === ""
                                  ? items
                                  : items?.specialty_name
                                      ?.toLowerCase()
                                      ?.includes(searchTaxo?.toLowerCase()) ||
                                      items?.taxo_code
                                        ?.toLowerCase()
                                        ?.includes(searchTaxo?.toLowerCase()) ||
                                      items?.Description?.toLowerCase()?.includes(
                                        searchTaxo?.toLowerCase()
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
                                      setTaxocode(taxo?.taxo_code);
                                      setTaxoid(taxo?.id);
                                      setTaxodesc(taxo?.Description);
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
                        type="button"
                        className="btn-outline-danger btn btn-sm"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* ********************************************************************************** */}
            </div>
            <div className="col-md-12 d-flex">
              <div className="col-md-4 mt-3 px-1">
                <label className="fw-bold">Sequence #</label>
                <input
                  type="text"
                  className="form-control form-control-sm placeText"
                  id="providerSequence"
                  placeholder="NEW"
                  name="providerSequence"
                  disabled
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                  value={sequence}
                />
              </div>

              <div className="col-md-4 mt-3">
                <label className="fw-bold mx-2">Reference #</label>
                <input
                  type="text"
                  className="form-control form-control-sm placeText px-3 mx-1"
                  id="providerReference"
                  placeholder="Reference #"
                  name="providerreference"
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                  onChange={(e) =>
                    setproviderreference(
                      e.target.value?.toString()?.toUpperCase().trimStart()
                    )
                  }
                  value={providerreference}
                  maxLength={12}
                />
              </div>
              <div className="col-md-3 mt-3">
                <label className="fw-bold mx-3">Code</label>
                <input
                  type="text"
                  className="form-control form-control-sm placeText px-3 mx-3"
                  id="providerCode"
                  placeholder="Code"
                  name="providecode"
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                  onChange={(e) =>
                    setprovidecode(
                      e.target.value?.toString()?.toUpperCase().trimStart()
                    )
                  }
                  value={providecode}
                  maxLength={3}
                />
              </div>
            </div>
            {/* ********************* Show All Practices MOdal ****************************** */}
            <div
              className="modal fade text-dark"
              id="showAllPracticesModel"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">All Practices</h5>
                  </div>
                  <div className="modal-body">
                    <div className="col-md-12 mb-2">
                      <label className="text-dark fw-bold">
                        Search for Practices
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="allpracticessearch"
                        name="allpracticessearch"
                        placeholder="Search for Practices"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setsearchshowallpractices(e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-12">
                      {/* ********************** Table *************************** */}
                      <div
                        className="table-responsive"
                        style={{ height: "300px" }}
                      >
                        <table className="table table-light table-hover table-striped table table-bordered caption-top table-responsive">
                          <thead className="">
                            <tr>
                              <th>Name</th>
                              {Checked ? <th>Inactive</th> : ""}
                              <th>Address</th>
                              <th>Reference #</th>
                              <th>NPI</th>
                            </tr>
                          </thead>
                          <tbody>
                            {showallpractices
                              // Search Practices
                              ?.filter((items) => {
                                return searchpractices === ""
                                  ? items
                                  : items?.name
                                      ?.toLowerCase()
                                      .includes(
                                        searchpractices?.toLowerCase()
                                      ) ||
                                      items?.common_address?.address
                                        ?.toLowerCase()
                                        .includes(
                                          searchpractices?.toLowerCase()
                                        ) ||
                                      items?.sequence?.id
                                        ?.toString()
                                        .includes(searchpractices) ||
                                      items?.npi?.npi_code
                                        ?.toString()
                                        .includes(searchpractices);
                              })
                              // Display Practices
                              ?.map((showall, i) => {
                                return (
                                  <tr
                                    data-bs-dismiss="modal"
                                    {...showall}
                                    className="table-active facility-font"
                                    key={i}
                                    onClick={() => {
                                      // dispatch(getPracticeIdfromTable(showall?.id));
                                      setPractiveProv(showall?.name);
                                      setPractiveProvID(showall?.id);
                                    }}
                                  >
                                    <td>{showall?.name}</td>
                                    {Checked ? (
                                      <td>{showall?.Inactive}</td>
                                    ) : (
                                      ""
                                    )}
                                    <td>{showall?.address1}</td>
                                    <td>{showall?.sequence?.id}</td>
                                    <td>{showall?.npi_code}</td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                      {/* ************************************************************************* */}
                    </div>
                  </div>
                  <div className="modal-footer justify-content-between">
                    <div className="form-check mt-2 mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="inactive_showallpractices"
                        name="inactive_showallpractices"
                        onChange={(e) => setInactiveChecked(e.target.checked)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inactive_showallpractices"
                      >
                        Include inactive practices
                      </label>
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* ********************* Show All Practices MOdal ****************************** */}
            <div className="col-md-12 mt-3">
              <div className="card mb-2">
                <div className="card-header">
                  <i className="fas fa-chair me-1" />
                  Billing Info
                </div>
                <div className="card-body ">
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <label className="fw-bold text-dark">
                        Practice for this provider
                      </label>
                      <div className="input-group">
                        <input
                          style={{ cursor: "pointer" }}
                          className="form-control form-control-sm"
                          type="text"
                          placeholder="Practice for this provider"
                          aria-label="NPI"
                          id="providerPractice"
                          name="providerPractice"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={10}
                          value={PracticeProv}
                          required
                          data-bs-toggle="modal"
                          data-bs-target="#showAllPracticesModel"
                        />
                        <button
                          disabled={PracticeProv ? false : true}
                          onClick={() => setPractiveProv("")}
                          type="button"
                          className="btn btn-sm btn-outline-dark"
                          id="providerpracticebtnclose"
                        >
                          <i className="fas fa-times" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          className="input-group-text btn-hov"
                          id="providerpracticebtn"
                          data-bs-toggle="modal"
                          data-bs-target="#showAllPracticesModel"
                        >
                          <i className="fas fa-search" aria-hidden="true" />
                        </button>

                        <button
                          type="button"
                          style={{ cursor: "pointer" }}
                          className="btn btn-outline-dark btn-sm"
                          onClick={() => ToEditable(PractiveProvID)}
                          disabled={PractiveProvID ? false : true}
                        >
                          <i
                            style={{ cursor: "pointer" }}
                            className="far fa-building  mx-1 mt-1"
                          />
                        </button>
                      </div>
                      {touched.providerPractice && errors.providerPractice ? (
                        <p className="form-error mx-2">
                          *{errors.providerPractice}
                        </p>
                      ) : null}
                      <label
                        className="mt-2 fw-bold text-dark"
                        htmlFor="billclaimunder"
                      >
                        Bill claims under
                      </label>
                      <div className="input-group mt-2">
                        <input
                          className="form-control form-control-sm"
                          type="text"
                          placeholder="SELF"
                          aria-label="check"
                          id="billclaimunder"
                          name="billclaimunder"
                          value={Bill_ClaimName}
                          disabled
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={60}
                          data-bs-toggle="modal"
                          data-bs-target="#allproviderModal"
                          style={{ cursor: "pointer" }}
                        />
                        <button
                          disabled={Bill_ClaimName ? false : true}
                          onClick={() => setBillClaimName("")}
                          type="button"
                          className="btn btn-sm btn-outline-dark"
                          id="billclaimunderbtnclose"
                        >
                          <i className="fas fa-times" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          className="input-group-text btn-hov"
                          id="providerpracticebtn"
                          onClick={() => dispatch(setBillClicked("bill"))}
                          data-bs-toggle="modal"
                          data-bs-target="#allproviderModal"
                        >
                          <i className="fas fa-search" aria-hidden="true" />
                        </button>
                        <BillClaimsUnderAllProviderModal
                          billclaimsID={billclaimsID}
                          billClaimName={billClaimName}
                        />
                      </div>
                      <label
                        className="mt-2 text-dark fw-bold"
                        htmlFor="billclaimunder"
                      >
                        Check Eligibility under
                      </label>
                      <div className="input-group mt-2">
                        <input
                          className="form-control form-control-sm"
                          type="text"
                          placeholder="SELF"
                          aria-label="check"
                          id="checkeligibility"
                          name="checkeligibility"
                          value={CheckEligName}
                          disabled
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={60}
                          data-bs-toggle="modal"
                          data-bs-target="#eligibilityUnderproviderModal"
                          style={{ cursor: "pointer" }}
                        />

                        <button
                          disabled={CheckEligName ? false : true}
                          onClick={() => setCheckEligName("")}
                          type="button"
                          className="btn btn-sm btn-outline-dark"
                          id="checkeligbtnclose"
                        >
                          <i className="fas fa-times" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          className="input-group-text btn-hov"
                          data-bs-toggle="modal"
                          onClick={() =>
                            dispatch(setEligibilityUnderClicked("check"))
                          }
                          data-bs-target="#eligibilityUnderproviderModal"
                          id="providerpracticebtn"
                        >
                          <i className="fas fa-search" aria-hidden="true" />
                        </button>
                      </div>
                      <EligibilityUnderAllProviderModal
                        checkeligiID={checkeligiID}
                        checkeligiName={checkeligiName}
                      />
                    </div>
                    <div className="col-md-12 mt-2 d-flex">
                      <div className="col-md-6">
                        <label className="text-dark fw-bold">
                          SSN/EIN Type
                        </label>
                        <select
                          id="idType"
                          value={EIN_SSN}
                          className="form-select form-select-sm"
                          onChange={(e) => setSSN(e.target.value)}
                        >
                          <option value={0}>Social Security# (SSN)</option>
                          <option value={1}>
                            Employe Identification# (EIN)
                          </option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="text-dark fw-bold">SSN/EIN</label>
                        <input
                          type="text"
                          className="form-control form-control-sm mx-2"
                          id="providerssn"
                          name="providerssn"
                          placeholder="Social Security# (SSN)/ EIN"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          onChange={(e) =>
                            setproviderssn(
                              e.target.value?.replace(/[^0-9]/gi, "")
                            )
                          }
                          value={providerssn}
                          maxLength={9}
                        />
                      </div>
                    </div>
                    <div className="col-md-12 mt-2 d-flex">
                      <div className="col-md-6">
                        <label htmlFor="" className="fw-bold text-dark">
                          Bill as
                        </label>
                        <select
                          id="billas"
                          value={Billas}
                          className="form-select form-select-sm"
                          onChange={(e) => setBillas(e.target.value)}
                        >
                          <option value={0}>Individual</option>
                          <option value={1}>Group</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12 mt-2 d-flex">
                      <div className="col-md-6">
                        <label htmlFor="profmode" className="text-dark fw-bold">
                          Professional Mode
                        </label>
                        <select
                          disabled
                          id="profmode"
                          onChange={(e) => setProfMode(e.target.value)}
                          className="form-select form-select-sm"
                        >
                          <option value="1">TEST</option>
                        </select>
                      </div>
                      <div className="col-md-6 mx-2">
                        <label
                          htmlFor="InstitutionalMode"
                          className="fw-bold text-dark"
                        >
                          Institutional Mode
                        </label>
                        <select
                          onChange={(e) => setInstMode(e.target.value)}
                          disabled
                          id="InstitutionalMode"
                          className="form-select form-select-sm"
                        >
                          <option value="1">TEST</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 mt-3 mx-0">
                    <div className="card mb-2">
                      <div className="card-header">
                        <i className="fas fa-chair me-1" />
                        Internal Use
                      </div>
                      <div className="card-body ">
                        <div className="col-md-6">
                          <label className="fw-bold text-dark">
                            Submitter #
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm placeText"
                            id="submitter"
                            placeholder="Submitter #"
                            name="submitter"
                            disabled
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12 mt-3">
              <div className="card mb-2">
                <div className="card-header">
                  <i className="fas fa-chair me-1" />
                  Contact Info
                </div>
                <div className="card-body ">
                  <div className="col-md-12 d-flex">
                    <div className="col-md-6">
                      <label className="fw-bold text-dark">Home Phone</label>
                      <PatternFormat
                        format="(###) ###-####"
                        pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                        title="Please Enter a Valid Phone #"
                        mask="_"
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="providerhomephone"
                        placeholder="Home Phone"
                        name="providerhomephone"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        minLength={14}
                        onChange={(e) =>
                          setproviderhomephone(
                            e.target.value?.replace(/[^0-9]/gi, "")
                          )
                        }
                        value={providerhomephone}
                      />
                    </div>
                    <div className="col-md-6 mx-2">
                      <label className="fw-bold text-dark">Cell Phone</label>
                      <PatternFormat
                        format="(###) ###-####"
                        pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                        title="Please Enter a Valid Phone #"
                        mask=""
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="providercellphone"
                        placeholder="Cell Phone"
                        name="providercellphone"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        minLength={14}
                        onChange={(e) =>
                          setprovidercellphone(
                            e.target.value?.replace(/[^0-9]/gi, "")
                          )
                        }
                        value={providercellphone}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 d-flex mt-2">
                    <div className="col-md-6">
                      <label className="fw-bold text-dark">Fax #</label>
                      <PatternFormat
                        format="(###) ###-####"
                        pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                        title="Please Enter a Valid Phone #"
                        mask=""
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="providerfax"
                        placeholder="Fax #"
                        name="providerfax"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        minLength={14}
                        onChange={(e) =>
                          setproviderfax(
                            e.target.value?.replace(/[^0-9]/gi, "")
                          )
                        }
                        value={providerfax}
                      />
                    </div>
                    <div className="col-md-6 mx-2">
                      <label className="fw-bold text-dark">Pager #</label>
                      <PatternFormat
                        format="(###) ###-####"
                        pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                        title="Please Enter a Valid Phone #"
                        mask=""
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="providerpager"
                        placeholder="Pager #"
                        name="providerpager"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        minLength={14}
                        onChange={(e) =>
                          setproviderpager(
                            e.target.value?.replace(/[^0-9]/gi, "")
                          )
                        }
                        value={providerpager}
                      />
                    </div>
                  </div>

                  <div className="col-md-12 mt-2">
                    <label className="fw-bold text-dark">Email</label>
                    <input
                      type="email"
                      className="form-control form-control-sm placeText"
                      id="provideremail"
                      placeholder="Email"
                      name="provideremail"
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      required
                      maxLength={100}
                      onChange={(e) =>
                        setprovideremail(e.target.value?.toString())
                      }
                      value={provideremail}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* ************************************* PENDING ********************************************** */}
            <div className="col-md-12 mt-3">
              <div className="card mb-2">
                <div className="card-header">
                  <i className="fas fa-chair me-1" />
                  ID Numbers
                </div>
                <div className="card-body ">
                  <div className="col-md-12 d-flex">
                    <div className="col-md-6">
                      <label className="fw-bold text-dark">
                        Speciality License #
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="specialityLicense"
                        placeholder="Speciality License #"
                        name="specialityLicense"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setspecialityLicense(
                            e.target.value
                              ?.toString()
                              ?.toUpperCase()
                              ?.trimStart()
                          )
                        }
                        maxLength={15}
                        value={specialityLicense}
                      />
                    </div>
                    <div className="col-md-6 mx-2">
                      <label className="fw-bold text-dark">State License</label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="stateLicense"
                        placeholder="State License"
                        name="stateLicense"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setstateLicense(
                            e.target.value
                              ?.toString()
                              ?.toUpperCase()
                              ?.trimStart()
                          )
                        }
                        maxLength={15}
                        value={stateLicense}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 d-flex mt-2">
                    <div className="col-md-6">
                      <label className="fw-bold text-dark">
                        Anesthesia License #
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="anesthesiaLicense"
                        placeholder="Anesthesia License #"
                        name="anesthesiaLicense"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setanesthesiaLicense(
                            e.target.value
                              ?.toString()
                              ?.toUpperCase()
                              ?.trimStart()
                          )
                        }
                        value={anesthesiaLicense}
                        maxLength={15}
                      />
                    </div>
                    <div className="col-md-6 mx-2">
                      <label className="fw-bold text-dark">UPIN #</label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="upin"
                        placeholder="UPIN #"
                        name="upin"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setupin(
                            e.target.value
                              ?.toString()
                              ?.toUpperCase()
                              ?.trimStart()
                          )
                        }
                        value={upin_provider}
                        maxLength={6}
                      />
                    </div>
                  </div>

                  <div className="col-md-12 d-flex mt-2">
                    <div className="col-md-6">
                      <label className="fw-bold text-dark">Blue Cross #</label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="bluecross"
                        placeholder="Blue Cross #"
                        name="bluecross"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          setbluecross(
                            e.target.value
                              ?.toString()
                              ?.toUpperCase()
                              ?.trimStart()
                          )
                        }
                        value={providerbluecross}
                        maxLength={15}
                      />
                    </div>
                    <div className="col-md-6 mx-2">
                      <label className="fw-bold text-dark">
                        Tricare/Champus #
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm placeText"
                        id="tricareChamp"
                        placeholder="Tricare/Champus #"
                        name="tricareChamp"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) =>
                          settricareChamp(
                            e.target.value
                              ?.toString()
                              ?.toUpperCase()
                              ?.trimStart()
                          )
                        }
                        value={providertricareChamp}
                        maxLength={15}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12 mt-3">
              <div className="card mb-2">
                <div className="card-header">
                  <i className="fas fa-chair me-1" />
                  Claim Defaults
                </div>
                {/* ************ Rev Code Modal *********** */}
                <div
                  className="modal fade text-dark"
                  id="showRevModel"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex={-1}
                  aria-labelledby="showRevModel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-md modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">All Revenue Codes</h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="col-md-12">
                          <div className="mt-0">
                            {/* ======= REV ======= */}
                            <label htmlFor="rev" className="text-dark fw-bold">
                              Revenue Codes
                            </label>
                            <input
                              id="rev"
                              type="search"
                              className="form-control form-control-sm"
                              placeholder="Search for Revenue codes"
                              aria-label="Search"
                              maxLength={60}
                              onChange={(e) => setSearchRev(e.target.value)}
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
                                    <tr>
                                      <th>Code</th>
                                      <th>Description</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {Revdata?.filter((items) => {
                                      return searchRev === ""
                                        ? items
                                        : items?.description
                                            ?.toLowerCase()
                                            ?.includes(
                                              searchRev?.toLowerCase()
                                            );
                                      // ||
                                      // items?.id?.includes(search);
                                    })?.map((rev, i) => {
                                      return (
                                        <tr
                                          className="practice-font"
                                          key={i}
                                          data-bs-dismiss="modal"
                                          onClick={() => {
                                            setRevCode(rev?.revenue_code);
                                            setRevID(rev?.id);
                                          }}
                                        >
                                          <td>{rev?.revenue_code}</td>
                                          <td>{rev?.description}</td>
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

                {/* ************************************************* */}
                <div className="card-body">
                  <label htmlFor="rev" className="text-dark fw-bold">
                    Revenue Code
                  </label>
                  <div className="input-group mt-0">
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      placeholder="Rev Code"
                      aria-label="check"
                      id="rev_code"
                      name="rev_code"
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      value={RevCode?.toString()?.toUpperCase()}
                      onChange={(e) =>
                        setRevCode(
                          e.target.value?.toString()?.toUpperCase()?.trim()
                        )
                      }
                      maxLength={4}
                    />
                    <button
                      type="button"
                      className="input-group-text btn-hov"
                      id="providerpracticebtn"
                      data-bs-toggle="modal"
                      data-bs-target="#showRevModel"
                    >
                      <i className="fas fa-search" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="col-md-5 mx-5">
          <div className="accordion" id="accordionExample">
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
                      value={Prov_Notes}
                      onChange={(e) => setNotes(e.target.value?.toString())}
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows={10}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Alerts
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <button
                    disabled={true}
                    onClick={() => alert("Create Addon")}
                    className="btn btn-outline-primary btn-sm"
                  >
                    <span className="fas fa-plus" /> Add Alerts
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditableProvider;
