import { useFormik } from "formik";
import { lazy, useState, useEffect } from "react";
import { PatternFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// import { Typeahead } from "react-bootstrap-typeahead"; // ES2015
import API from "../../../Api/ClientApi";
import useFetch from "../../../Hooks/useFetch";
import { Alert } from "../../../GLOBAL/SwalAlert";
import { EditPracticeFetch } from "../../../Redux/features/Practice/EditablePracticeSlice";
// import { FormValEditablePract } from "./FormValeditablepractices";
// import DatalistInput from "react-datalist-input";
// import "react-datalist-input/dist/styles.css";
// import {
//   getOfficeAddress,
//   getOfficeCity,
//   getOfficeName,
//   getOfficeNpi,
//   getOfficeState,
// } from "../../../../Redux/features/Practice/NewPracticeOfficeSlice";
import useGet from "../../../Hooks/useGet";
import {
  EditPractice_City_stateFetch,
  EditPractice_City_stateFetch2,
  getEditPractZipCode1,
  getEditPractZipCode2,
} from "../../../Redux/features/Global_Forms/City_stateSlice";
const EditabelPracticeDefaults = lazy(() =>
  import("./EditabelPracticeDefaults")
);
const EditabelPracticeOffices = lazy(() =>
  import("./OtherOffices/NewPracticeOffices")
);
import { FormVal } from "./FormValcustomerpractices";

export default function EditablePractice() {
  const params = useParams();
  const [SearchNPIReg, setSearchNPIReg] = useState("");

  const dispatch = useDispatch();
  const { data: TaxData, loading: loadingtax } = useFetch(
    "customersetup/practice/taxonomyapi"
  );
  const [search, setSearch] = useState("");
  const [individual_checked, setIndividualChecked] = useState(false);
  const [organization_checked, setOrgChecked] = useState(true);
  const [any_checked, setAnyChecked] = useState(false);
  const [searchNPI, setSearchNPI] = useState("");
  const [citydata, setcitydata] = useState("");
  const [zipdata, setzipdata] = useState("");

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
  //   ======= Editable Practice Data Start =======
  // const { data: editpractdata, status } = useSelector(
  //   (state) => state?.EditPractice
  // );
  // ************************************* //
  const POS_ID = useSelector((state) => state.POSSlice?.POS_id);
  const TOS_ID = useSelector((state) => state.DefaultClaims?.TOS_ID_Value);
  const payer_add_loc = useSelector(
    (state) => state.DefaultClaims?.payeraddresslocation
  );
  const print_anesthesia_start_stop = useSelector(
    (state) => state.DefaultClaims?.printstartstop
  );
  const auto_decrement = useSelector(
    (state) => state.DefaultClaims?.autodecrement
  );
  const include_accident = useSelector(
    (state) => state.DefaultClaims?.includeaccident
  );
  const exclude_facility = useSelector(
    (state) => state.DefaultClaims?.excludefacility
  );
  // Institutional Claim Defaults
  const type_of_fbill = useSelector((state) => state.DefaultClaims?.typeofbill);
  const admission_type = useSelector((state) => state.DefaultClaims?.admtype);
  const admission_source = useSelector(
    (state) => state.DefaultClaims?.admsource
  );
  const patient_status = useSelector(
    (state) => state.DefaultClaims?.patientstatus
  );
  // Default Patient
  const marital_status = useSelector(
    (state) => state.DefaultClaims?.maritalstatus
  );
  const employed_status = useSelector(
    (state) => state.DefaultClaims?.employedstatus
  );
  const student_status = useSelector(
    (state) => state.DefaultClaims?.studentstatus
  );
  const residence_type = useSelector(
    (state) => state.DefaultClaims?.residencetype
  );
  const statement_type = useSelector(
    (state) => state.DefaultClaims?.statementtype
  );
  const mail_statement_to = useSelector(
    (state) => state.DefaultClaims?.mailstatemento
  );
  const send_statement = useSelector(
    (state) => state.DefaultClaims?.sendstatement
  );
  const language = useSelector((state) => state.DefaultClaims?.language);
  const accept_assignment = useSelector(
    (state) => state.DefaultClaims?.acceptassignment
  );
  const gender = useSelector((state) => state.DefaultClaims?.gender);
  // Default ERAs
  const allow_auto_patient_payment = useSelector(
    (state) => state.DefaultClaims?.allowautopatientpayment
  );
  const info_line_for_Red_payments = useSelector(
    (state) => state.DefaultClaims?.infoline
  );
  const use_medicare_allow = useSelector(
    (state) => state.DefaultClaims?.usemedicareallow
  );

  // ************************************** //

  const practiceeditid = useSelector(
    (state) => state?.EditPractice?.data?.[0]?.id
  );

  const practiceNPI = useSelector(
    (state) => state?.EditPractice?.data?.[0]?.npi_code
  );

  const practicename = useSelector(
    (state) => state?.EditPractice.data?.[0]?.name
  );
  const practcode = useSelector(
    (state) => state?.EditPractice.data?.[0]?.practice_code
  );
  const org_type = useSelector(
    (state) => state?.EditPractice.data?.[0]?.org_type_id
  );
  const tcnprefix = useSelector(
    (state) => state?.EditPractice.data?.[0]?.tcn_prefix
  );
  const reference = useSelector(
    (state) => state?.EditPractice.data?.[0]?.reference
  );
  // ===== Common Address ========
  const address = useSelector(
    (state) => state?.EditPractice.data?.[0]?.address1
  );
  const address2 = useSelector(
    (state) => state?.EditPractice.data?.[0]?.address2
  );
  const city_name = useSelector((state) => state?.EditPractice.data?.[0]?.city);

  const state_name = useSelector(
    (state) => state?.EditPractice.data?.[0]?.state
  );

  const sequence = useSelector(
    (state) => state?.EditPractice.data?.[0]?.sequence?.id
  );
  const email = useSelector((state) => state?.EditPractice.data?.[0]?.email);
  const zip = useSelector((state) => state?.EditPractice.data?.[0]?.zip);
  const phone = useSelector((state) => state?.EditPractice.data?.[0]?.phone);

  const fax = useSelector((state) => state?.EditPractice.data?.[0]?.fax);
  // ===== Pay to Address ========
  const paytoaddress = useSelector(
    (state) => state?.EditPractice.data?.[0]?.pay_address1
  );
  const paytoaddress2 = useSelector(
    (state) => state?.EditPractice.data?.[0]?.pay_address2
  );
  const paytocity_name = useSelector(
    (state) => state?.EditPractice.data?.[0]?.pay_city
  );

  const paytostate_name = useSelector(
    (state) => state?.EditPractice.data?.[0]?.pay_state
  );

  const paytozip = useSelector(
    (state) => state?.EditPractice?.data?.[0]?.pay_zip
  );

  const paytosame = useSelector(
    (state) => state?.EditPractice.data?.[0]?.payaddress_same_pa
  );
  const taxonomy_id = useSelector(
    (state) => state?.EditPractice?.data?.[0]?.taxonomy_code?.id
  );
  const taxonomy_code = useSelector(
    (state) => state?.EditPractice?.data?.[0]?.taxonomy_code?.taxo_code
  );
  const taxonomy_description = useSelector(
    (state) => state?.EditPractice?.data?.[0]?.taxonomy_code?.Description
  );
  const EditNotes = useSelector(
    (state) => state.EditPractice.data?.[0]?.notes?.note
  );
  const practice_status = useSelector(
    (state) => state.EditPractice.data?.[0]?.practice_status
  );

  const [editpracticename, setEditPracticeName] = useState("");
  const [editpracticenpi, setEditPracticeNpi] = useState("");
  const [editpracticecode, setEditPracticeCode] = useState("");
  const [editpracticeorg_type, setEditPracticeOrgType] = useState(0);
  const [editpracticetcn, setEditPracticetcn] = useState("");
  const [editpracticereference, setEditPracticeRef] = useState("");
  // common Address
  const [editpracticeaddress, setEditPracticeAddress] = useState("");

  const [editpracticeemail, setEditPracticeEmail] = useState("");

  //
  const [editpracticecityfax, setEditPracticeFax] = useState("");
  const [editpracticecityphone, setEditPracticePhone] = useState("");
  // Pay to Address
  const [editpracticepaytoaddress, setEditPracticepaytoAddress] = useState("");

  const [editpracticesequence, setEditpracticesequence] = useState("");
  const [editpracticepaytosame, setEditpracticepaytosame] = useState("");
  // console.log("Checked", editpracticepaytosame);
  const [editpracticetaxonomy, setEditpracticetaxonomy] = useState("");
  const [TaxonomyCode, SetTaxonomyCode] = useState("");
  const [TaxonomyId, SetTaxonomyId] = useState("");
  const [TaxonomyDescription, SetTaxonomyDescription] = useState("");

  const [practiceinactive, SetPracticeInactive] = useState(false);
  const [editpracticenotes, setEditpracticeNotes] = useState("");

  const [editpracticeaddress2, setEditPracticeAddress2] = useState("");
  const [editpracticepaytoaddress2, setEditPracticepaytoAddress2] =
    useState("");
  // Zip API
  const zipapi = useSelector(
    (state) => state.CityStateZip?.editpracticezip?.ZipCode?.Zip5
  );
  const zipapiCity = useSelector(
    (state) => state.CityStateZip?.editpracticezip?.ZipCode?.City
  );
  const zipapiState = useSelector(
    (state) => state.CityStateZip?.editpracticezip?.ZipCode?.State
  );
  // for p2 address
  const zipapi2 = useSelector(
    (state) => state.CityStateZip?.editpracticezip2?.ZipCode?.Zip5
  );
  const zipapiCity2 = useSelector(
    (state) => state.CityStateZip?.editpracticezip2?.ZipCode?.City
  );
  const zipapiState2 = useSelector(
    (state) => state.CityStateZip?.editpracticezip2?.ZipCode?.State
  );

  // Set Zip API for Primary Office
  const [zipapicode, setzipapicode] = useState("");
  const [zipapi_city, setzipapi_city] = useState("");
  const [zipapi_state, setzipapi_state] = useState("");
  // Set Api for pay to address
  const [zipapicode2, setzipapicode2] = useState("");
  const [zipapi_city2, setzipapi_city2] = useState("");

  const [zipapi_state2, setzipapi_state2] = useState("");
  // const [practiceID, setPractID] = useState("");
  useEffect(() => {
    // setPractID(practiceeditid);
    if (params.id) {
      dispatch(EditPracticeFetch(params.id));

      setEditPracticeName(practicename ? practicename : "");
      setEditPracticeNpi(practiceNPI ? practiceNPI : "");
      setEditPracticeCode(practcode ? practcode : "");
      setEditPracticeOrgType(org_type ? org_type : editpracticeorg_type);
      setEditPracticetcn(tcnprefix ? tcnprefix : "");
      setEditPracticeRef(reference ? reference : "");
      // Address 1
      setEditPracticeAddress(address ? address : "");
      setEditPracticeAddress2(address2 ? address2 : "");
      setEditPracticeEmail(email ? email : "");

      setEditPracticeFax(fax ? fax : "");
      setEditPracticePhone(phone ? phone : "");

      // Pay to Address
      setEditPracticepaytoAddress(paytoaddress ? paytoaddress : "");
      setEditPracticepaytoAddress2(paytoaddress2 ? paytoaddress2 : "");
      setEditpracticepaytosame(Boolean(paytosame));
      setEditpracticesequence(sequence ? sequence : "");
      SetTaxonomyId(taxonomy_id ? taxonomy_id : TaxonomyId);
      SetTaxonomyCode(taxonomy_code ? taxonomy_code : TaxonomyCode);
      SetTaxonomyDescription(
        taxonomy_description ? taxonomy_description : TaxonomyDescription
      );
      // console.log("checked", practice_status, "checkedinput: ", practiceinactive);
      SetPracticeInactive(
        practice_status ? !practice_status : !practiceinactive
      );
      // Editable Notes
      setEditpracticeNotes(EditNotes ? EditNotes : "");

      // settaxoid(taxonomy_id);
      // settaxo(taxonomy_code);
      // settaxodesc(taxo_description);

      // setzipapicode(zipapi ? zipapi : zip);
      // setzipapi_city(zipapiCity ? zipapiCity : city_name);
      // setzipapi_state(zipapiState ? zipapiState : state_name);
      // // setEditPracticeNpi(NPI_Code);
      // setzipapicode2(zipapi2 ? zipapi2 : paytozip);
      // setzipapi_city2(zipapiCity2 ? zipapiCity2 : paytocity_name);
      // setzipapi_state2(zipapiState2 ? zipapiState2 : paytostate_name);
    }
  }, [
    params,
    practiceeditid,
    practicename,
    EditNotes,
    practcode,
    org_type,
    tcnprefix,
    reference,
    address,
    zip,
    state_name,
    email,
    phone,
    city_name,
    fax,
    paytoaddress,
    paytozip,
    paytostate_name,
    paytocity_name,
    address2,
    paytoaddress2,
    // zipapi,
    // zipapiCity,
    // zipapiState,
    // zipapi2,
    // zipapiCity2,
    // zipapiState2,
    taxonomy_code,
    practice_status,
    // paytosame,
    // TaxonomyCode,
    taxonomy_description,
    taxonomy_id,

    // TaxonomyId,
  ]);
  useEffect(() => {
    let zipbool = true;
    setzipapicode(zipapi ? zipapi : zip);
    setzipapi_city(zipapiCity ? zipapiCity : city_name);
    setzipapi_state(zipapiState ? zipapiState : state_name);

    return () => {
      zipbool = false;
    };
  }, [zipapi, practiceeditid]);

  useEffect(() => {
    let zipbool2 = true;

    setzipapicode2(zipapi2 ? zipapi2 : paytozip);
    setzipapi_city2(zipapiCity2 ? zipapiCity2 : paytocity_name);
    setzipapi_state2(zipapiState2 ? zipapiState2 : paytostate_name);
    return () => {
      zipbool2 = false;
    };
  }, [zipapi2, practiceeditid]);
  const [payToaddressinfo, setpayToaddressinfo] = useState(false);
  const [checked, setchecked] = useState(true);
  const [required, setrequired] = useState(false);

  // get data from api
  useEffect(() => {
    // ======= Condition to Show/Hide Fields based on Same/Different Address for CheckBox =======
    if (editpracticepaytosame === true) {
      setchecked(true);
      setpayToaddressinfo(false);
    } else if (editpracticepaytosame === false) {
      setchecked(false);
      setpayToaddressinfo(true);
    }
  }, [editpracticepaytosame]);
  //   ======= Editable Practice Data End =======
  // console.log("checked val", checked);
  // newOffice values from redux
  // const officeName = useSelector((state) => state?.NewOffice.officeName);
  // const officeNpi = useSelector((state) => state?.NewOffice.officeNpi);
  // const officeAddress = useSelector((state) => state?.NewOffice.officeAddress);
  // const officeCity = useSelector((state) => state?.NewOffice.officeCity);
  // const officeState = useSelector((state) => state?.NewOffice.officeState);
  // const officeZipCode = useSelector((state) => state?.NewOffice.officeZipCode);

  const payToAddressToggle = () => {
    if (payToaddressinfo === false) {
      // Nullify the Pay to Address fields if pay to address is same as primary
      setEditPracticepaytoAddress("");
      setEditPracticepaytoAddress2("");
      dispatch(getEditPractZipCode2(""));
      setzipapi_city2("");
      setzipapi_state2("");
      setzipapicode2("");
    }
    payToaddressinfo === true
      ? setpayToaddressinfo(false)
      : setpayToaddressinfo(true);
    // setrequired(true);
    required === true ? setrequired(false) : setrequired(true);
    // setchecked(false);
    checked === true ? setchecked(false) : setchecked(true);
  };
  // API to get Organization Types
  const { data: orgType, loading } = useFetch(
    "customersetup/practice/org_type"
  );

  const navigate = useNavigate();
  const initialValues = {
    practiceName: "",
    npi_code: "",
    practiceTaxonomy: "",
    practiceSequence: "",
    practiceReference: "",
    practiceTCN: "",
    practiceCode: "",
    // primary address values
    practicsAddress: "",
    practicsAddress2: "",
    practiceCity: "",
    practiceState: "",
    practicZipCode: "",
    practicePhone: "",
    practiceFax: "",
    practiceEmail: "",

    // pay to address data
    practicePayToAddressAdd: "",
    practicePayToAddressAdd2: "",
    practicePayToAddressCity: "",
    practicePayToAddressState: "",
    practicPayToAddressZipCode: "",

    paytoAddressPractice: "",
    paytoAddressPractice2: "",
    EditablePracticeNotes: "",
    newpracticeOrgType: "",
    // newOfficedata
    newOfficeName: "",
    newOfficeSequence: "",
    newOfficeNpi: "",
    newOfficeAddress: "",
    newOfficeCity: "",
    newOfficeState: "",
    newOfficeZipCode: "",
  };
  function Dump() {
    setEditPracticeName("");
    setEditPracticeNpi("");
    setEditPracticeCode("");
    setEditPracticeOrgType("");
    setEditPracticetcn("");
    setEditPracticeRef("");
    setEditPracticeAddress("");
    setEditPracticeEmail("");
    setEditPracticeFax("");
    setEditPracticePhone("");
    setEditPracticeAddress2("");
    setEditPracticepaytoAddress2("");
    setEditPracticepaytoAddress("");

    // setEditpracticepaytosame("");
    setEditpracticesequence("");
    SetTaxonomyId("");
    SetTaxonomyCode("");
    SetTaxonomyDescription("");
    setEditpracticeNotes("");
    setzipapicode("");
    setzipapi_city("");
    setzipapi_state("");
    setzipapicode2("");
    setzipapi_city2("");
    setzipapi_state2("");
  }
  let user = JSON.parse(sessionStorage.getItem("access"));
  let customerID = JSON.parse(sessionStorage.getItem("customer_id"));
  function put() {
    API.put(
      `customersetup/practice/update/${practiceeditid}`,
      {
        // Editable_practiceID: Number(practiceID),
        practiceName: editpracticename?.toUpperCase().trimStart(),
        npi_code: Number(editpracticenpi),
        practiceTaxonomy: Number(TaxonomyId),

        practiceReference: editpracticereference,
        practiceTCN: editpracticetcn,
        practiceCode: editpracticecode,

        // ======= primary address data =======
        practicsAddress: editpracticeaddress?.toUpperCase().trimStart(),
        practicsAddress2: editpracticeaddress2?.toUpperCase().trimStart(),
        practiceCity: zipapi_city,
        // ?.toUpperCase().trimStart(),
        practiceState: zipapi_state,
        // ?.toUpperCase().trimStart(),
        // editpracticesequence: Number(editpracticesequence),
        practicZipCode: zipapicode,
        practicePhone: editpracticecityphone,
        practiceFax: editpracticecityfax,
        practiceEmail: editpracticeemail,

        // ======= pay to address data =======
        practicePayToAddressAdd: editpracticepaytoaddress
          ?.toString()
          ?.toUpperCase()
          .trimStart(),
        practicePayToAddressAdd2: editpracticepaytoaddress2
          ?.toString()
          ?.toUpperCase()
          .trimStart(),
        practicePayToAddressCity: zipapi_city2,
        // ?.toUpperCase()
        // .trimStart(),
        practicePayToAddressState: zipapi_state2,

        // ?.toUpperCase().trimStart(),
        practicPayToAddressZipCode: zipapicode2,
        // ======= Office Data =======
        // new office data
        // newOfficeName: officeName,
        // newOfficeNpi: officeNpi,
        // newOfficeAddress: officeAddress,
        // newOfficeCity: officeCity,
        // newOfficeState: officeState,
        // newOfficeZipCode: officeZipCode,
        // ======= Misc =======
        paytoAddressPractice: Number(checked),
        EditablePracticeNotes: editpracticenotes,
        Editpractice_OrgType: Number(editpracticeorg_type),
        practiceinactive: Number(!practiceinactive),
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
            "Practice Updated Successfully!",
            false,
            1500
          );
          Dump();
          // setSelectText("Organization type");
          // dispatch(SetTOS(""));
          // dispatch(SetPOS(""));
          // dispatch(getOfficeName(""));
          // dispatch(getOfficeNpi(""));
          // dispatch(getOfficeAddress(""));
          // dispatch(getOfficeCity(""));
          // dispatch(getOfficeState(""));
          // dispatch(getOfficeState(""));
          dispatch(getEditPractZipCode1(""));
          dispatch(getEditPractZipCode2(""));

          localStorage.removeItem("TOB_Value");
          navigate("/customersetup/practice", { replace: true });
        }
        if (response.data.status === 422) {
          Alert("center", "error", response.data.message, false, 2500);
        } else if (response.data.status === 500) {
          Alert("center", "error", response.data.error, false, 2500);

          // dispatch(SetTOS(""));
          // dispatch(SetPOS(""));
        }
      })
      //reset form

      .catch((error) => {
        Alert("center", "error", error, false, 2500);
        // dispatch(SetTOS(""));
        // dispatch(SetPOS(""));
        // dispatch(getOfficeNpi(""));
        // dispatch(getOfficeAddress(""));
        // dispatch(getOfficeCity(""));
        // dispatch(getOfficeState(""));
        // dispatch(getOfficeState(""));
      });
  }
  function post() {
    API.post(
      "customersetup/practice/store",
      {
        // Editable_practiceID: Number(practiceID),
        practiceName: editpracticename?.toUpperCase().trimStart(),
        npi_code: Number(editpracticenpi),
        practiceTaxonomyid: Number(TaxonomyId),

        practiceReference: editpracticereference,
        practiceTCN: editpracticetcn,
        practiceCode: editpracticecode,

        // ======= primary address data =======
        practicsAddress: editpracticeaddress?.toUpperCase().trimStart(),
        practicsAddress2: editpracticeaddress2?.toUpperCase().trimStart(),
        practiceCity: zipapi_city,
        // ?.toUpperCase().trimStart(),
        practiceState: zipapi_state,
        // ?.toUpperCase().trimStart(),
        // editpracticesequence: Number(editpracticesequence),
        practicZipCode: zipapicode,
        practicePhone: editpracticecityphone,
        practiceFax: editpracticecityfax,
        practiceEmail: editpracticeemail,

        // ======= pay to address data =======
        practicePayToAddressAdd: editpracticepaytoaddress
          ?.toString()
          ?.toUpperCase()
          .trimStart(),
        practicePayToAddressAdd2: editpracticepaytoaddress2
          ?.toString()
          ?.toUpperCase()
          .trimStart(),
        practicePayToAddressCity: zipapi_city2,
        // ?.toUpperCase()
        // .trimStart(),
        practicePayToAddressState: zipapi_state2,

        // ?.toUpperCase().trimStart(),
        practicPayToAddressZipCode: zipapicode2,
        // ======= Office Data =======
        // new office data
        // newOfficeName: officeName,
        // newOfficeNpi: officeNpi,
        // newOfficeAddress: officeAddress,
        // newOfficeCity: officeCity,
        // newOfficeState: officeState,
        // newOfficeZipCode: officeZipCode,
        // ======= Misc =======

        paytoAddressPractice: Number(checked),
        newPracticeNotes: editpracticenotes,
        newpractice_OrgType: Number(editpracticeorg_type),
        practiceinactive: Number(!practiceinactive),
        // Misc
        POS_ID,
        TOS_ID,
        payer_add_loc,
        print_anesthesia_start_stop,
        auto_decrement,
        include_accident,
        exclude_facility,
        // type_of_fbill,
        type_of_fbill: "111",
        admission_type,
        admission_source,
        patient_status,
        marital_status,
        employed_status,
        student_status,
        residence_type,
        statement_type,
        mail_statement_to,
        send_statement,
        language,
        accept_assignment,
        gender,
        allow_auto_patient_payment,
        info_line_for_Red_payments,
        use_medicare_allow,
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
            "Practice Updated Successfully!",
            false,
            1500
          );
          Dump();
          // setSelectText("Organization type");
          // dispatch(SetTOS(""));
          // dispatch(SetPOS(""));
          // dispatch(getOfficeName(""));
          // dispatch(getOfficeNpi(""));
          // dispatch(getOfficeAddress(""));
          // dispatch(getOfficeCity(""));
          // dispatch(getOfficeState(""));
          // dispatch(getOfficeState(""));
          dispatch(getEditPractZipCode1(""));
          dispatch(getEditPractZipCode2(""));

          localStorage.removeItem("TOB_Value");

          navigate("/customersetup/practice", { replace: true });
        }
        if (response.data.status === 422) {
          Alert("center", "error", response.data.message, false, 2500);
        } else if (response.data.status === 500) {
          Alert("center", "error", response.data.error, false, 2500);

          // dispatch(SetTOS(""));
          // dispatch(SetPOS(""));
        }
      })
      //reset form

      .catch((error) => {
        Alert("center", "error", error, false, 2500);
        // dispatch(SetTOS(""));
        // dispatch(SetPOS(""));
        // dispatch(getOfficeNpi(""));
        // dispatch(getOfficeAddress(""));
        // dispatch(getOfficeCity(""));
        // dispatch(getOfficeState(""));
        // dispatch(getOfficeState(""));
      });
  }
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,

    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: FormVal,
    validateOnChange: true,
    validateOnBlur: true,
    // By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: (values, action) => {
      // values from hooks
      // newOfficeName = officeName;
      // newOfficeNpi = officeNpi;
      // newOfficeAddress = officeAddress;
      // newOfficeCity = officeCity;
      // newOfficeState = officeState;
      // newOfficeZipCode = officeZipCode;
      params.id ? put() : post();
      action.resetForm();
    },
  });

  return (
    <div>
      <div className="row mt-4 dflex">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} action="post">
            <div className="row g-3">
              <div className="col-12">
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
                    Dump();
                    navigate("/customersetup/practice");
                  }}
                >
                  Cancel
                </button>
              </div>
              <div className="col-md-7">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="practiceName"
                  placeholder="Name"
                  autoComplete="off"
                  name="practiceName"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                  value={editpracticename
                    ?.toString()
                    // ?.replace(/[^A-Za-z ]/gi, "")
                    .trimStart()
                    .toUpperCase()}
                  onChange={(e) => setEditPracticeName(e.target.value)}
                  maxLength="60"
                  required
                />
                <div className="col-md-12">
                  {touched.practiceName && errors.practiceName ? (
                    <p className="form-error">*{errors.practiceName}</p>
                  ) : null}
                </div>
              </div>
              <div className="col-md-5 mt-5 px-0">
                {params.id ? (
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="makepractiveinactive"
                      checked={practiceinactive}
                      onChange={(e) => SetPracticeInactive(e.target.checked)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="makepractiveinactive"
                    >
                      Make this practice inactive
                    </label>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-4">
                <label htmlFor="">NPI</label>
                <div className="input-group">
                  <input
                    className={`form-control form-control-sm`}
                    type="text"
                    placeholder="NPI"
                    aria-label="NPI"
                    id="npi_code"
                    name="npi_code"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength={10}
                    value={
                      editpracticenpi
                      // ?.replace(/[^0-9]/gi, "")
                      // .trimStart()
                    }
                    onChange={(e) => setEditPracticeNpi(e.target.value)}
                  />
                  <button
                    onClick={null}
                    type="button"
                    className="input-group-text btn-hov"
                    id="NPIbtn"
                    data-bs-toggle="modal"
                    data-bs-target="#NPIRegistryModaltriggerinEditablePractice"
                  >
                    <i className="fas fa-search" aria-hidden="true"></i>
                  </button>
                  {/* ********************* 1st Modal Start (NPI Registry Input Fields) ********************* */}
                  <div
                    className="modal fade text-dark"
                    id="NPIRegistryModaltriggerinEditablePractice"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    aria-hidden="true"
                    aria-labelledby="NPIRegistryModaltriggerinEditablePractice"
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
                                  onChange={(e) => setSearchNPI(e.target.value)}
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
                                  onChange={(e) => setSearchNPI(e.target.value)}
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
                                onChange={(e) => setSearchNPI(e.target.value)}
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
                                onChange={(e) => setSearchNPI(e.target.value)}
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
                                    onChange={(e) =>
                                      setcitydata(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                      setSearchNPI(e.target.value)
                                    }
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
                            className="btn btn-sm btn-outline-primary"
                            data-bs-target="#exampleModalToggle2"
                            data-bs-toggle="modal"
                            type="button"
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
                        <div className="px-3  mb-2 mt-0">
                          {" "}
                          <label
                            htmlFor="SearchNPI"
                            className="fw-bold text-dark"
                          >
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
                                                  setEditPracticeNpi(
                                                    pract?.[1]
                                                  );
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
                                                    setEditPracticeNpi(
                                                      pract?.[1]
                                                    );
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
                                                  setEditPracticeNpi(
                                                    pract?.[1]
                                                  );
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
                                                    setEditPracticeNpi(
                                                      pract?.[1]
                                                    );
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
                                                  setEditPracticeNpi(
                                                    pract?.[1]
                                                  );
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
                                                    setEditPracticeNpi(
                                                      pract?.[1]
                                                    );
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
                                                  setEditPracticeNpi(
                                                    pract?.[1]
                                                  );
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
                                                    setEditPracticeNpi(
                                                      pract?.[1]
                                                    );
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
                            data-bs-target="#NPIRegistryModaltriggerinEditablePractice"
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
                  {/* ************ NPI Registry Modal End************** */}
                  <div className="col-md-12">
                    {touched.npi_code && errors.npi_code ? (
                      <p className="form-error">*{errors.npi_code}</p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="">Organization Type</label>
                {loading ? (
                  "Loading..."
                ) : (
                  <select
                    value={editpracticeorg_type}
                    // defaultValue="Organization type"
                    defaultValue={0}
                    id="newpracticeOrgType"
                    name="newpracticeOrgType"
                    className="form-select form-select-sm"
                    onChange={(e) => {
                      setEditPracticeOrgType(e.target.value);
                    }}
                  >
                    {/* <option value={null} hidden>
                      Organization type
                    </option> */}

                    {orgType?.map((org, i) => {
                      return (
                        <option
                          className="fs-6"
                          key={i}
                          {...org}
                          value={org?.id}
                        >
                          {org?.type}
                        </option>
                      );
                    })}
                  </select>
                )}
              </div>
              <div className="row">
                <div
                  className="col-md-4 mx-0 px-2 mt-2 mb-
              1"
                >
                  <label htmlFor="practiceTaxonomy">Taxonomy</label>

                  <div className="input-group">
                    <input
                      className="form-control form-control-sm placeTextTax"
                      type="text"
                      placeholder="Taxonomy Speciality"
                      aria-label="Taxonomy Speciality"
                      id="practiceTaxonomy"
                      name="practiceTaxonomy"
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      style={{ cursor: "pointer" }}
                      data-bs-toggle="modal"
                      data-bs-target="#taxonomyspecmodalinEditablepractice"
                      value={TaxonomyCode}
                      // onChange={(e) =>
                      //   setEditpracticetaxonomy(e.target.value?.toString())
                      // }
                      //
                      maxLength={10}
                    />
                    <button
                      type="button"
                      className="input-group-text btn-hov"
                      id="Taxonomy"
                      data-bs-toggle="modal"
                      data-bs-target="#taxonomyspecmodalinEditablepractice"
                    >
                      <i className="fas fa-search" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
                <div className="col-md-8 mt-4"> {TaxonomyDescription}</div>
              </div>
              {/* {showTaxonomy_Modal && (
                    <TAXONOMY_SPEC_MODAL
                      closeTaxonomy_Spec_Modal={closeTaxonomy_Spec_Modal}
                      showTaxonomy_Modal={showTaxonomy_Modal}
                    />
                  )} */}
              {/* ******************* TAXONOMY ******************* */}

              <div
                className="modal fade text-dark"
                id="taxonomyspecmodalinEditablepractice"
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
                        "LOading..."
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
                                      SetTaxonomyId(taxo?.id);

                                      SetTaxonomyCode(taxo?.taxo_code);

                                      SetTaxonomyDescription(taxo?.Description);

                                      // taxo_facility(taxo?.taxo_code);
                                      // taxo_fac_desc(taxo?.Description);
                                      // taxo_fac_id(taxo?.id);
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
                        onClick={null}
                        className="btn-outline-danger btn btn-sm"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* ****************************************************************************** */}
              <div className="col-md-12 mt-0">
                {touched.practiceTaxonomy && errors.practiceTaxonomy ? (
                  <p className="form-error">*{errors.practiceTaxonomy}</p>
                ) : null}
              </div>

              <div className="row">
                <div className="col-md-3 mt-2 px-2">
                  {/* <label style={{fontSize:'12px'}}>Sequence #</label> */}
                  <label htmlFor="">Sequence #</label>
                  <input
                    type="tel"
                    className="form-control form-control-sm placeText px-3"
                    id="practiceSequence"
                    placeholder="Sequence #"
                    name="practiceSequence"
                    disabled
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    value={editpracticesequence}
                    onChange={handleChange}
                    maxLength={8}
                  />
                  <div className="col-md-12">
                    {touched.practiceSequence && errors.practiceSequence ? (
                      <p className="form-error">*{errors.practiceSequence}</p>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-3 mt-2">
                  <label htmlFor="">Reference #</label>
                  <input
                    type="tel"
                    className="form-control form-control-sm placeText px-3"
                    id="practiceReference"
                    placeholder="Reference #"
                    name="practiceReference"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    value={editpracticereference
                      ?.toString()
                      ?.toUpperCase()
                      .trimStart()}
                    onChange={(e) =>
                      setEditPracticeRef(
                        e.target.value?.toString()?.toUpperCase().trimStart()
                      )
                    }
                    maxLength={12}
                  />
                </div>

                <div className="col-md-3 mt-2">
                  <label htmlFor="">TCN</label>
                  <input
                    type="tel"
                    className="form-control form-control-sm placeText px-3"
                    id="practiceTCN"
                    placeholder="TCN Prefix"
                    name="practiceTCN"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    value={
                      editpracticetcn
                      // .trimStart()
                    }
                    onChange={(e) =>
                      setEditPracticetcn(
                        e.target.value?.toString()?.toUpperCase().trimStart()
                      )
                    }
                    maxLength="4"
                  />
                  <div className="col-md-12">
                    {touched.practiceTCN && errors.practiceTCN ? (
                      <p className="form-error">*{errors.practiceTCN}</p>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-3 mt-2">
                  <label htmlFor="">Code</label>
                  <input
                    type="tel"
                    className="form-control form-control-sm placeText px-3"
                    id="practiceCode"
                    placeholder="Code"
                    name="practiceCode"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    value={
                      editpracticecode
                      // .trimStart()
                    }
                    onChange={(e) =>
                      setEditPracticeCode(
                        e.target.value?.toString()?.toUpperCase().trimStart()
                      )
                    }
                    maxLength={3}
                  />
                  <div className="col-md-12">
                    {touched.practiceCode && errors.practiceCode ? (
                      <p className="form-error">*{errors.practiceCode}</p>
                    ) : null}
                  </div>
                </div>
              </div>
              {/* primary office details */}
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-header">
                    <i className="fas fa-chair me-1"></i>
                    Primary Office
                  </div>
                  <div className="card-body">
                    <div className="col-md-12 px-2">
                      <div className="row">
                        <label htmlFor="" className="text-dark px-0">
                          Address
                        </label>
                        <input
                          type="text"
                          className={`form-control form-control-sm`}
                          id="practicsAddress"
                          name="practicsAddress"
                          placeholder="Address"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          required
                          value={editpracticeaddress?.toUpperCase().trimStart()}
                          onChange={(e) =>
                            setEditPracticeAddress(
                              e.target.value
                                ?.toString()
                                ?.toUpperCase()
                                .trimStart()
                            )
                          }
                          maxLength={40}
                        />
                        <div className="col-md-12 px-0">
                          {touched.practicsAddress && errors.practicsAddress ? (
                            <p className="form-error">
                              *{errors.practicsAddress}
                            </p>
                          ) : null}
                        </div>
                        <input
                          type="text"
                          className={`form-control form-control-sm mt-2`}
                          id="practicsAddress2"
                          name="practicsAddress2"
                          placeholder=""
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          value={editpracticeaddress2}
                          onChange={(e) =>
                            setEditPracticeAddress2(
                              e.target.value
                                ?.toString()
                                ?.toUpperCase()
                                .trimStart()
                            )
                          }
                          maxLength={40}
                        />
                        <div className="col-md-12 px-0">
                          {touched.practicsAddress2 &&
                          errors.practicsAddress2 ? (
                            <p className="form-error">
                              *{errors.practicsAddress2}
                            </p>
                          ) : null}
                        </div>
                        {/* *********************************************************************************************** */}

                        <div className="col-md-12 d-flex mt-2 px-0">
                          <div className="col-md-5">
                            <label htmlFor="" className="text-dark px-0">
                              City
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-sm placeText"
                              id="practiceCity"
                              placeholder="City"
                              name="practiceCity"
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

                            {touched.practiceCity && errors.practiceCity ? (
                              <p className="form-error mx-0 px-0">
                                *{errors.practiceCity}
                              </p>
                            ) : null}
                          </div>

                          <div className="col-md-2 mx-2">
                            <label htmlFor="" className="text-dark px-0">
                              State
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-sm placeText"
                              id="practiceState"
                              placeholder="State"
                              name="practiceState"
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
                            {/* 
                            value={values?.practiceState
                              .replace(/[^A-Za-z]/gi, "")
                              .trimStart()
                              .toUpperCase()}
                           
                          /> */}
                            <div className="col-md-12">
                              {touched.practiceState && errors.practiceState ? (
                                <p className="form-error">
                                  *{errors.practiceState}
                                </p>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-md-4 mx-1">
                            <label htmlFor="" className="text-dark px-0">
                              Zip
                            </label>
                            <PatternFormat
                              format="#####-####"
                              mask=""
                              type="text"
                              className="form-control form-control-sm"
                              id="practicZipCode"
                              name="practicZipCode"
                              placeholder="ZIP Code"
                              autoComplete="off"
                              autoCapitalize="characters"
                              autoCorrect="off"
                              spellCheck="false"
                              required
                              // onChange={handleChange}
                              value={zipapicode}
                              onChange={(e) => {
                                setzipapicode(e.target.value?.trim());
                                setFieldValue(
                                  "practicZipCode",
                                  e.target.value
                                    ?.toString()
                                    ?.replace(/[^0-9]/gi, "")
                                    ?.trim(),
                                  true
                                );
                                (zipapicode.match(/(?<!\d)\d{4}(?!\d)/gm) ||
                                  zipapicode.match(/(?<!\d)\d{8}(?!\d)/gm)) &&
                                  dispatch(
                                    EditPractice_City_stateFetch(
                                      e.target.value
                                        ?.replace(/[^0-9]/gi, "")
                                        .trim()
                                    )
                                  );
                              }}
                              minLength={5}
                            />
                          </div>
                        </div>

                        {/* ****************************************************************************************************** */}

                        <div className="col-md-4 mt-2 px-0">
                          <label htmlFor="" className="text-dark px-0">
                            Phone
                          </label>
                          <PatternFormat
                            format="(###) ###-####"
                            mask=""
                            type="text"
                            className={`form-control form-control-sm`}
                            pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                            title="Please Enter a Valid Phone #"
                            id="practicePhone"
                            placeholder="Phone"
                            name="practicePhone"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            required
                            value={
                              editpracticecityphone
                              // .trimStart()
                            }
                            onChange={(e) =>
                              setEditPracticePhone(e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-4 mt-2 px-1">
                          <label htmlFor="" className="text-dark px-0">
                            Fax
                          </label>
                          <PatternFormat
                            format="(###) ###-####"
                            pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                            title="Please Enter a Valid Fax #"
                            mask=""
                            type="text"
                            className={`form-control form-control-sm`}
                            id="practiceFax"
                            placeholder="Fax"
                            name="practiceFax"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            value={
                              editpracticecityfax
                              // .trimStart()
                            }
                            onChange={(e) => setEditPracticeFax(e.target.value)}
                          />
                        </div>
                        <div className="col-md-12 mt-2 px-0">
                          <label htmlFor="" className="text-dark px-0">
                            Email
                          </label>
                          <input
                            type="text"
                            className={`form-control form-control-sm`}
                            id="practiceEmail"
                            placeholder="Email"
                            name="practiceEmail"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            value={editpracticeemail?.trim()}
                            onChange={(e) =>
                              setEditPracticeEmail(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-check mx-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="paytoAddressPractice"
                  name="paytoAddressPractice"
                  onClick={payToAddressToggle}
                  checked={checked}
                  // value={editpracticepaytosame}
                />
                <label
                  className={`form-check-label`}
                  htmlFor="paytoAddressPractice"
                >
                  Pay-to address is the same as the primary office address
                </label>
              </div>
              {payToaddressinfo && (
                // pay to address
                <div className="col-xl-12">
                  <div className="card mb-2">
                    <div className="card-header">
                      <i className="fas fa-chair me-1"></i>
                      Pay To Address
                    </div>
                    <div className="card-body">
                      <div className="col-md-12">
                        <div className="col-md-12 mt-0 px-0">
                          <label htmlFor="" className="text-dark px-0">
                            Address
                          </label>
                          <input
                            type="text"
                            className={`form-control form-control-sm`}
                            id="practicePayToAddressAdd"
                            placeholder="Address"
                            name="practicePayToAddressAdd"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            value={editpracticepaytoaddress
                              ?.toUpperCase()
                              .trimStart()}
                            onChange={(e) =>
                              setEditPracticepaytoAddress(e.target.value)
                            }
                            //
                            maxLength={60}
                          />
                          <div className="col-md-12">
                            {touched.practicePayToAddressAdd &&
                            errors.practicePayToAddressAdd ? (
                              <p className="form-error">
                                *{errors.practicePayToAddressAdd}
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-12 mt-2 px-0">
                          <input
                            type="text"
                            className={`form-control form-control-sm`}
                            id="practicePayToAddressAdd2"
                            placeholder=""
                            name="practicePayToAddressAdd2"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            value={editpracticepaytoaddress2
                              ?.toUpperCase()
                              .trimStart()}
                            onChange={(e) =>
                              setEditPracticepaytoAddress2(
                                e.target.value
                                  ?.toString()
                                  ?.toUpperCase()
                                  .trimStart()
                              )
                            }
                            //
                            maxLength={40}
                          />
                          <div className="col-md-12">
                            {touched.practicePayToAddressAdd2 &&
                            errors.practicePayToAddressAdd2 ? (
                              <p className="form-error">
                                *{errors.practicePayToAddressAdd2}
                              </p>
                            ) : null}
                          </div>
                        </div>
                        {/* *********************************************************************************************** */}

                        <div className="col-md-12 d-flex mt-2 px-0">
                          <div className="col-md-5">
                            <label htmlFor="" className="text-dark px-0">
                              City
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-sm placeText"
                              id="practicePayToAddressCity"
                              placeholder="City"
                              name="practicePayToAddressCity"
                              autoComplete="off"
                              autoCapitalize="characters"
                              autoCorrect="off"
                              spellCheck="false"
                              onChange={(e) =>
                                setzipapi_city2(
                                  e.target.value
                                    ?.replace(/[^A-Za-z ]/gi, "")
                                    .toUpperCase()
                                    .trimStart()
                                )
                              }
                              value={zipapi_city2
                                ?.replace(/[^A-Za-z ]/gi, "")
                                .toUpperCase()
                                .trimStart()}
                              maxLength={28}
                            />

                            {touched.practicePayToAddressCity &&
                            errors.practicePayToAddressCity ? (
                              <p className="form-error mx-0 px-0">
                                *{errors.practicePayToAddressCity}
                              </p>
                            ) : null}
                          </div>

                          <div className="col-md-2 mx-2">
                            <label htmlFor="" className="text-dark px-0">
                              State
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-sm placeText"
                              id="practicePayToAddressState"
                              placeholder="State"
                              name="practicePayToAddressState"
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
                                setzipapi_state2(
                                  e.target.value
                                    ?.replace(/[^A-Za-z ]/gi, "")
                                    .toUpperCase()
                                    .trimStart()
                                );
                              }}
                              value={zipapi_state2
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
                              {touched.practicePayToAddressState &&
                              errors.practicePayToAddressState ? (
                                <p className="form-error">
                                  *{errors.practicePayToAddressState}
                                </p>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-md-4 mx-1">
                            <label htmlFor="" className="text-dark px-0">
                              Zip
                            </label>
                            <PatternFormat
                              format="#####-####"
                              mask=""
                              type="text"
                              className="form-control form-control-sm"
                              id="practicPayToAddressZipCode"
                              name="practicPayToAddressZipCode"
                              placeholder="ZIP Code"
                              autoComplete="off"
                              autoCapitalize="characters"
                              autoCorrect="off"
                              spellCheck="false"
                              // onChange={handleChange}
                              value={zipapicode2}
                              //
                              onChange={(e) => {
                                setzipapicode2(
                                  e.target.value?.replace(/[^0-9]/gi, "").trim()
                                );
                                setFieldValue(
                                  "practicPayToAddressZipCode",
                                  e.target.value

                                    ?.replace(/[^0-9]/gi, "")
                                    .trim(),
                                  true
                                );
                                (zipapicode2.match(/(?<!\d)\d{4}(?!\d)/gm) ||
                                  zipapicode2.match(/(?<!\d)\d{8}(?!\d)/gm)) &&
                                  dispatch(
                                    EditPractice_City_stateFetch2(
                                      e.target.value
                                        ?.replace(/[^0-9]/gi, "")
                                        .trim()
                                    )
                                  );
                              }}
                            />

                            {touched.practicPayToAddressZipCode &&
                            errors.practicPayToAddressZipCode ? (
                              <p className="form-error mx-1">
                                *{errors.practicPayToAddressZipCode}
                              </p>
                            ) : null}
                          </div>
                        </div>

                        {/* ****************************************************************************************************** */}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
        {/* ========== Editable Notes ========== */}
        <div className="col-md-6 mt-2">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Notes
                </button>
              </h2>
              <div
                id="collapseOne"
                className={`accordion-collapse collapse ${
                  EditNotes ? "show" : ""
                }`}
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body px-2 py-2">
                  <div className="px-0 mx-0">
                    <textarea
                      onChange={(e) =>
                        setEditpracticeNotes(e.target.value?.toString())
                      }
                      className="form-control"
                      id="EditabelParacticeTextarea1"
                      rows={10}
                      value={editpracticenotes}
                    />
                  </div>
                </div>
              </div>
            </div>
            <EditabelPracticeOffices />
            <EditabelPracticeDefaults />
          </div>
        </div>
      </div>
    </div>
  );
}
