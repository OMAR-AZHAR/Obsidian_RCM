import { useFormik } from "formik";
import { lazy, useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { InputDecimal } from "react-input-decimal";
import { Link, useNavigate } from "react-router-dom";
import { date } from "yup";
import API from "../../../Api/ClientApi";
import Swal from "../../../GLOBAL/SwalAlert";
const InstitutionalClaim = () => {
  const navigate = useNavigate();

  // clear text input
  const cleartext = () => {
    claim_patient.value = "";
  };
  // open patietn form
  const OpenPatientForm = (name) => {
    name ? alert(name) : alert("Please Select Patient");
  };

  /* -------------------------------------------------------- Current Date -------------------- */
  let defaultValue = new Date(new Date().setDate(new Date().getDate()))
    .toISOString()
    .split("T")[0];

  let currentTime =
    new Date().getHours() +
    ":" +
    new Date().getMinutes() +
    ":" +
    new Date().getSeconds();

  // |------------CLAIM FORM  hooks-----------------|
  const [patientData, setPatientData] = useState([]);
  const [claimAttendProvider, setclaimAttendProvider] = useState([]);
  const [RevCodes, setRevCodes] = useState([]);
  const [HcpcCodes, setHcpcCodes] = useState([]);
  const [dignoseCodes, setDignoseCodes] = useState([]);
  const [modifiers, setModifiers] = useState([]);

  // // const [externalCausedignoseCodes, setexternalCausedignoseCodes] = useState(
  //   []
  // );
  const [refferingProviders, setRefferingProviders] = useState([]);
  const [occurrenceSpanApi, setOccurrenceSpanApi] = useState([]);
  const [occurrenceApi, setOccurrenceApi] = useState([]);
  const [ValueApi, setValueApi] = useState([]);
  const [ConditionApi, setConditionApi] = useState([]);
  const [instClaimFacility, setinstClaimFacility] = useState([]);
  const [instClaimOfficeLocation, setInstClaimOfficeLocation] = useState("");
  const [instClaimInsurance, setinstClaimInsurance] = useState([]);
  const [instCaimReference, setInstCaimReference] = useState("");
  // |----------- type of bill dynamic dropdowns ---------|
  const [typeOfFacilityValue, setTypeOfFacilityValue] = useState(1);
  const [typeOfCareValue, setTypeOfCareValue] = useState(1);
  const [typeOfBillFrequency, setTypeOfBillFrequency] = useState(1);
  // Hide and show Primary Insurance UseState
  const [priMemberId, setPriMemberId] = useState("");
  const [priPolicyType, setPriPolicyType] = useState("");
  const [primInsCopayDue, setPriCopayDue] = useState("");
  const [priGroupNumber, setPriGroupNumber] = useState("");
  const [priOriginClaim, setPriOriginClaim] = useState("");
  const [priAuthorization, setPriAuthorization] = useState("");
  const [priRefferelType, setPriRefferelType] = useState("");

  // // Hide and show Secondary Insurance UseState
  const [secMemberId, setSecMemberId] = useState("");
  const [secPolicyType, setSecPolicyType] = useState("");
  const [secInsCopayDue, setSecCopayDue] = useState("");
  const [secGroupNumber, setSecGroupNumber] = useState("");
  const [secOriginClaim, setSecOriginClaim] = useState("");
  const [secAuthorization, setSecAuthorization] = useState("");
  const [secRefferelType, setSecRefferelType] = useState("");

  // Hide and show Ternary Insurance UseState
  const [terMemberId, setTerMemberId] = useState("");
  const [terPolicyType, setTerPolicyType] = useState("");
  const [terInsCopayDue, setTerCopayDue] = useState("");
  const [terGroupNumber, setTerGroupNumber] = useState("");
  const [terOriginClaim, setTerOriginClaim] = useState("");
  const [terAuthorization, setTerAuthorization] = useState("");
  const [terRefferelType, setTerRefferelType] = useState("");

  // |----------------- Get Patient Name and Id ------------------------|
  const [instPatientId, setInstPatientId] = useState("");
  const [instPatientName, setInstPatientName] = useState("");
  const [claimAttendProviderId, setClaimAttendProviderId] = useState("");
  const [claimAttendProviderName, setClaimAttendProviderName] = useState("");
  const [instBillingProviderId, setinstBillingProviderId] = useState("");
  const [instBillingProviderName, setinstBillingProviderName] = useState("");
  const [instOperatingProviderName, setinstOperatingProviderName] =
    useState("");
  const [instOperatingProviderId, setinstOperatingProviderId] = useState("");
  const [instOtherProviderName, setinstOtherProviderName] = useState("");
  const [instOtherProviderId, setinstOtherProviderId] = useState("");
  const [instRefPcpProviderName, setinstRefPcpProviderName] = useState("");
  const [instRefPcpProviderId, setinstRefPcpProviderId] = useState("");
  const [instSalesRepProviderName, setInstSalesRepProviderName] = useState("");
  const [instSalesRepProviderId, setInstSalesRepProviderId] = useState("");
  const [InstclaimRefPcp, setInstclaimRefPcp] = useState("Operating");
  const [InstClaimRefPCB, setInstClaimRefPCB] = useState("Ref");
  const [facilityProviderName, setgetFacilityProviderName] = useState("");
  const [facilityProviderId, setgetFacilityProviderId] = useState("");
  const [primInsuranceProviderName, setPrimInsuranceProviderName] =
    useState("");
  const [primInsuranceProviderId, setPrimInsuranceProviderId] = useState("");

  const [secInsuranceProviderName, setSecInsuranceProviderName] = useState("");
  const [secInsuranceProviderId, setSecInsuranceProviderId] = useState("");
  const [terInsuranceProviderName, setTerInsuranceProviderName] = useState("");
  const [terInsuranceProviderId, setTerInsuranceProviderId] = useState("");

  const [amount, Setamount] = useState("");
  const [unites, Setunites] = useState("");
  const [unitprice, Setunitprice] = useState("");
  const [description, SetDescription] = useState("");

  //|-------------- show/hide insurance details---------------|
  const [textHide, setTextHide] = useState(false);
  const [secondaryInsurance, setsecondaryInsurance] = useState(false);
  const [ternaryInsurance, setTernaryInsurance] = useState(false);
  const handleHidingPriInsurance = () => {
    setTextHide(!textHide);
  };

  const handleHidingSecInsurance = () => {
    setsecondaryInsurance(!secondaryInsurance);
  };

  const handleHidingTerInsurance = () => {
    setTernaryInsurance(!ternaryInsurance);
  };

  //|-------------- Get Functions---------------|
  const [PricipalDiagnoseCod, setPricipalDiagnoseCod] = useState("");
  const [poa, setPoa] = useState("");
  const [PricipalDiagnoseId, setPricipalDiagnoseId] = useState("");
  const getPricipalDiagnoseCodeId = (code, id) => {
    setPricipalDiagnoseCod(code);
    setPricipalDiagnoseId(id);
  };
  const getPatientIdName = (name, id) => {
    setInstPatientName(name);
    setInstPatientId(id);
  };
  const getClaimAttendProviderName = (name, id) => {
    setClaimAttendProviderName(name);
    setClaimAttendProviderId(id);
  };
  const getBillProviderNameId = (name, id) => {
    setinstBillingProviderName(name);
    setinstBillingProviderId(id);
  };

  const getOperatingProviderName = (name, id) => {
    setinstOperatingProviderName(name);
    setinstOperatingProviderId(id);
  };

  const getOtherProviderName = (name, id) => {
    setinstOtherProviderName(name);
    setinstOtherProviderId(id);
  };

  const getRefPcpProviderName = (name, id) => {
    setinstRefPcpProviderName(name);
    setinstRefPcpProviderId(id);
  };
  const getSalesRepProviderName = (name, id) => {
    setInstSalesRepProviderName(name);
    setInstSalesRepProviderId(id);
  };

  const getFacilityProviderAddress = (name, id) => {
    setgetFacilityProviderName(name);
    setgetFacilityProviderId(id);
  };

  const getPrimInsuranceProviderName = (name, id) => {
    setPrimInsuranceProviderName(name);
    setPrimInsuranceProviderId(id);
  };

  const getSecInsuranceProviderName = (name, id) => {
    setSecInsuranceProviderName(name);
    setSecInsuranceProviderId(id);
  };

  const getTerInsuranceProviderName = (name, id) => {
    setTerInsuranceProviderName(name);
    setTerInsuranceProviderId(id);
  };

  // |------------------charges form hooks --------|
  const [serviceDate, setServiceDate] = useState("");
  const [claimprocedureID, setclaimprocedureID] = useState("");
  const [getmodifier1Id, setGetmodifier1Id] = useState("");
  const [getmodifier1Code, setGetmodifier1Code] = useState("");
  const [getmodifier2Id, setGetmodifier2Id] = useState("");
  const [getmodifier2Code, setGetmodifier2Code] = useState("");
  const [getmodifier3Id, setGetmodifier3Id] = useState("");
  const [getmodifier3Code, setGetmodifier3Code] = useState("");
  const [getmodifier4Id, setGetmodifier4Id] = useState("");
  const [getmodifier4Code, setGetmodifier4Code] = useState("");
  const [InsChargeDescr, setInsChargeDescr] = useState("");
  const [unitPrice, setUnitPrice] = useState(0.0);
  const [units, setUnits] = useState(1.0);
  const [instChargeRevenueCode, setInstChargeRevenueCode] = useState("");
  const [instChargeRevenueId, setInstChargeRevenueId] = useState("");
  const [claimChargesTableProcedureCode, setclaimChargesTableProcedureCode] =
    useState("");
  const [
    claimChargesTableProcedureCodeId,
    setclaimChargesTableProcedureCodeId,
  ] = useState("");
  const [hcpcCode, setHcpcCode] = useState("");
  const [hcpcCodeId, setHcpcCodeId] = useState("");
  const [addTableRow, setAddTableRow] = useState([]);
  const [claimchargesChangesTo, setclaimchargesChangesTo] =
    useState("no change");

  // -------------------------------testing

  const getRebvenueCodeId = (code, descr, id) => {
    setInstChargeRevenueCode(code);
    setInstChargeRevenueId(id);
    addTableRow.push({
      // |---------charges form data|

      description: descr,
      dos: "2023-01-31",
      procedureCodeId: hcpcCodeId,
      procedureCode: hcpcCode,
      revenueCode: code,
      revenueCodeId: id,
      modifier1Id: getmodifier1Id,
      modifier1Code: getmodifier1Code,
      modifier2Id: getmodifier2Id,
      modifier2Code: getmodifier2Code,
      modifier3Id: getmodifier3Id,
      modifier3Code: getmodifier3Code,
      modifier4Id: getmodifier4Id,
      modifier4Code: getmodifier4Code,
      units: 1,
      unitPrice: 1,
      chageOption: claimchargesChangesTo,
    });
  };
  const getHCPCCodeId = (code, id) => {
    setHcpcCode(code);
    setHcpcCodeId(id);
    // addTableRow.push({
    //   // |---------charges form data|
    // });
  };
  // |-------------------additional info hooks ----------------|
  const [statementCoversFrom, setStatementCoversFrom] = useState(defaultValue);
  const [statementCoversTo, setStatementCoversTo] = useState(defaultValue);
  const [admissionDate, setAdmissionDate] = useState("");
  const [admissionHours, setAdmissionHours] = useState("");
  const [admissionType, setAdmissionType] = useState("1");
  const [admissionSource, setAdmissionSource] = useState("");
  const [dischargeHours, setDischargeHours] = useState("");
  const [patientStatus, setPatientStatus] = useState("");
  const [delayReasonCode, setDelayReasonCode] = useState("");
  const [pps, setPps] = useState("");
  const [pEstimatedAmount, setPEstimatedAmount] = useState(0.0);
  const [remarks, setRemarks] = useState("");
  const [employmentCondition, setEmploymentCondition] = useState(0);
  const [autoAccidentCondition, setAutoAccidentCondition] = useState(0);
  const [otherAccidentCondition, setOtherAccidentCondition] = useState(0);
  const [releaseofInfo, setReleaseofInfo] = useState(1);
  const [assignmetOfBenft, setAssignmetOfBenft] = useState(1);
  const [provideracceptassignment, setProviderAcceptAssignment] = useState(1);
  const [epsdtnoRefferel, setepsdtnoRefferel] = useState(false);
  const [epsdtnoRefused, setepsdtnoRefused] = useState(false);
  const [epsdtnoTreatment, setepsdtnoTreatment] = useState(false);
  const [epsdtprovider, setepsdtprovider] = useState(false);

  const [documentationtype, setDocumentationType] = useState("Yes");
  const [documentationmethod, setDocumentationMethod] = useState("Yes");

  const employmentConditionHandler = (event) => {
    setEmploymentCondition(event.target.value);
  };
  const autoAccidentConditionHandler = (event) => {
    setAutoAccidentCondition(event.target.value);
  };
  const otherAccidentConditionHandler = (event) => {
    setOtherAccidentCondition(event.target.value);
  };

  // |------------------- information codes hooks ----------------|
  const [diagnoseCode, setDiagnoseCode] = useState("");
  const [diagnoseCodeId, setDiagnoseCodeId] = useState("");
  const [admittingDiagnosisId, setadmittingDiagnosisId] = useState("");
  const [admittingDiagnosisName, setadmittingDiagnosisName] = useState("");

  const [externalCauseinjuryId, setexternalCauseofinjuryId] = useState("");
  const [externalCauseinjuryCode, setexternalCauseofinjuryCode] = useState("");
  const [externalCauseinjuryDesc, setexternalCauseofinjuryDesc] = useState("");
  const [addExternalCauseNewRow, setaddExternalCauseNewRow] = useState([]);

  // const [patientRevesitReason, setpatientRevesitReason] = useState("");
  const [patientRevesitReasonId, setpatientRevesitReasonId] = useState("");
  const [patientRevesitReasonDesc, setpatientRevesitReasonDesc] = useState("");
  const [patientRevesitReasonCode, setpatientRevesitReasonCode] = useState("");
  const [patientRevesitReasonRow, setpatientRevesitReasonrow] = useState([]);
  const [otherDiagnosisid, setotherDiagnosisId] = useState("");
  const [otherDiagnosisDesc, setotherDiagnosisDesc] = useState("");
  const [otherDiagnosisCode, setotherDiagnosisCode] = useState("");
  const [otherDiagnosisPOA, setotherDiagnosisPOA] = useState("1");
  const [otherDiagnosisRow, setotherDiagnosisrow] = useState([]);

  const [pricipalprocedurecode, setpricipalprocedurecode] = useState("");
  const [pricipalprocedureId, setpricipalprocedureId] = useState("");
  const [pricipalprocedurecodeDate, setpricipalprocedurDate] =
    useState(defaultValue);

  const [OtherPrcedureId, setOtherPrcedureId] = useState("");

  const [OtherPrcedureRow, setOtherPrcedureRow] = useState([]);
  const [otherProcedureDate, setotherProcedureDate] = useState("");
  const [spanOccurrenceRow, setSpanOccurrenceRow] = useState([]);
  const [OccurrenceRow, setOccurrenceRow] = useState([]);
  const [OccurrenceCodeId, setOccurrenceCodeId] = useState([]);
  const [OccurrenceDate, setOccurrenceDate] = useState("");
  const [spanOccurrenceCodeId, setSpanOccurrenceCodeId] = useState("");
  const [otherSpanFromDate, setotherSpanFromDate] = useState("");
  const [otherSpanToDate, setotherSpanToDate] = useState("");

  const [valueRow, setValueRow] = useState([]);
  const [valueId, setValueId] = useState([]);
  const [occurrenceAmount, setoccurrenceAmount] = useState();
  const [conditionRow, setconditionRow] = useState([]);
  const [ConditioncodeId, setConditioncodeId] = useState("");
  const [addmissionSource, setaddmissionSource] = useState([]);
  const [addmissionType, setAddmissionType] = useState([]);

  const getExternalCauseInjury = (id, code, desc) => {
    setexternalCauseofinjuryId(id);
    setexternalCauseofinjuryCode(code);
    setexternalCauseofinjuryDesc(desc);
    const addData = { id: id, code: code, description: desc };
    const NewaddRow = [addData, ...addExternalCauseNewRow];
    setaddExternalCauseNewRow(NewaddRow);
  };

  const getOtherDiagnosisData = (id, code, desc) => {
    setotherDiagnosisId(id);
    setotherDiagnosisCode(code);
    setotherDiagnosisDesc(desc);
    const addRow = {
      id: id,
      code: code,
      description: desc,
      poa: otherDiagnosisPOA,
    };
    const newRowAdded = [addRow, ...otherDiagnosisRow];
    setotherDiagnosisrow(newRowAdded);
  };

  const UpdateExternalCauseCodeDesc = (code, desc) => {
    // setexternalCauseofinjuryCode(code);
    // setexternalCauseofinjuryDesc(desc);
  };

  const getpatientRevisitReason = (id, code, desc) => {
    setpatientRevesitReasonId(id);
    /*  
    , setpatientRevesitReasonCode(code);
    setpatientRevesitReasonDesc(desc); */
    const addData = {
      id: id,
      code: code,
      description: desc,
    };

    /*  const UpdatepatientRevisitIDName = (id, code, desc) => {
      setUpdatepatientRevisitCode(code);
      setUpdatepatientRevisitDesc(desc);
    }; */
    const newRowAdded = [addData, ...patientRevesitReasonRow];
    setpatientRevesitReasonrow(newRowAdded);
  };

  const getOtherPrcedure = (id, code, desc) => {
    setOtherPrcedureId(id);
    /* 
    setOtherPrcedureDesc(desc);
    setOtherPrcedureCode(code); */

    const addData = {
      id: id,
      code: code,
      description: desc,
      date: otherProcedureDate ? otherProcedureDate : defaultValue,
    };
    const newRowAdded = [addData, ...OtherPrcedureRow];
    setOtherPrcedureRow(newRowAdded);
    setotherProcedureDate("");
  };

  const getOccurrenceSpanCodeDesc = (code, id, desc) => {
    setSpanOccurrenceCodeId(id);
    const addRow = {
      id: id,
      code: code,
      description: desc,
      dateFrom: otherSpanFromDate ? otherSpanFromDate : defaultValue,
      dateTo: otherSpanToDate ? otherSpanToDate : defaultValue,
    };
    const newRowAddedData = [addRow, ...spanOccurrenceRow];
    setSpanOccurrenceRow(newRowAddedData);
    setotherSpanToDate("");
    setotherSpanFromDate("");
  };

  const getOccurrenceCodeDesc = (code, id, desc) => {
    setOccurrenceCodeId(id);
    const addRow = {
      id: id,
      code: code,
      description: desc,
      date: OccurrenceDate ? OccurrenceDate : defaultValue,
    };
    const occurrenceNewRow = [addRow, ...OccurrenceRow];
    setOccurrenceRow(occurrenceNewRow);
    setOccurrenceDate("");
  };

  const getValueCodeDesc = (code, id, desc) => {
    setValueId(id);
    const addRow = {
      id: id,
      code: code,
      amount: occurrenceAmount,
      description: desc,
    };
    const newOccurrenceRow = [addRow, ...valueRow];
    setValueRow(newOccurrenceRow);
  };

  const getConditionCodeDesc = (code, id, desc) => {
    setConditioncodeId(id);
    const addRow = {
      id: id,
      code: code,
      description: desc,
      amount: "",
    };
    const newOccurrenceRow = [addRow, ...conditionRow];
    setconditionRow(newOccurrenceRow);
  };

  /*   const getDiagnoseCodeId = (code, desc) => {
    patientRevesitReasonCode(code);
    patientRevesitReasonDesc(desc);
  }; */

  const getAdmittingDiagnosisCodeId = (code, id) => {
    setadmittingDiagnosisName(code);
    setadmittingDiagnosisId(id);
  };

  const getPrincipalPrcedure = (code, id) => {
    setpricipalprocedurecode(code);
    setpricipalprocedureId(id);
  };

  const getModifier1CodeId = (id, code) => {
    setGetmodifier1Id(id);
    setGetmodifier1Code(code);
  };
  const getModifier2CodeId = (id, code) => {
    setGetmodifier2Id(id);
    setGetmodifier2Code(code);
  };
  const getModifier3CodeId = (id, code) => {
    setGetmodifier3Id(id);
    setGetmodifier3Code(code);
  };
  const getModifier4CodeId = (id, code) => {
    setGetmodifier4Id(id);
    setGetmodifier4Code(code);
  };

  //  |---------------------Fetching Data From API-------------------------------|
  useEffect(() => {
    const fetchAdmissionSource = async () => {
      const response = await API.get("claim/admission/source");
      const newData = response.data.data;
      setaddmissionSource(newData);
    };

    const fetchAdmissionType = async () => {
      const response = await API.get("claim/admission/type");
      const newData = response.data.data;
      setAddmissionType(newData);
    };
    fetchAdmissionType();
    fetchAdmissionSource();

    const fetchPatient = async () => {
      const response = await API.get("claim/patient");
      const newData = response.data.data;
      setPatientData(newData);
    };

    const fetchAllProviderData = async () => {
      const response = await API.get("customersetup/provider");
      const newData = response.data.data;
      setclaimAttendProvider(newData);
    };

    // facility data
    const fetchFacilityData = async () => {
      const response = await API.get("customersetup/facility");
      const newData = response.data.data;
      setinstClaimFacility(newData);
    };

    // all payer data
    const fetchDataInsurance = async () => {
      const response = await API.get("customersetup/payer");
      const newData = response.data.data;
      setinstClaimInsurance(newData);
    };
    // all revenue code data
    const fetchRevenueCode = async () => {
      const response = await API.get("customersetup/code/revenue");
      const newData = response.data.data;
      setRevCodes(newData);
    };
    const fetchHCPCCodes = async () => {
      const response = await API.get("claim/procedure/code");
      const newData = response.data.data;
      setHcpcCodes(newData);
    };

    // modifier data
    const fetchModifiers = async () => {
      const response = await API.get("common/function/modifiers");
      const newData = response.data.data;
      setModifiers(newData);
    };

    const fetchDiagnoseCodes = async () => {
      const response = await API.get("customersetup/code/diagnosis");
      const newData = response.data.data;
      setDignoseCodes(newData);
    };
    const fetchRefferingProvider = async () => {
      const response = await API.get("customersetup/referringprovider");
      const newData = response.data.data;
      setRefferingProviders(newData);
    };

    const fetchOccurrenceSpan = async () => {
      const response = await API.get("claim/occurance/span/codes");
      const newData = response.data.data;
      setOccurrenceSpanApi(newData);
    };

    const fetchOccurrence = async () => {
      const response = await API.get("claim/occurance/codes");
      const newData = response.data.data;
      setOccurrenceApi(newData);
    };

    const fetchsetValueApi = async () => {
      const response = await API.get("claim/value/codes");
      const newData = response.data.data;
      setValueApi(newData);
    };

    const fetchConditionApi = async () => {
      const response = await API.get("claim/condition/codes");
      const newData = response.data.data;
      setConditionApi(newData);
    };

    fetchPatient();
    fetchAllProviderData();
    fetchFacilityData();
    fetchDataInsurance();
    fetchModifiers();
    fetchRevenueCode();
    fetchHCPCCodes();
    fetchRefferingProvider();
    fetchDiagnoseCodes();
    fetchOccurrenceSpan();
    fetchOccurrence();
    fetchsetValueApi();
    fetchConditionApi();
  }, []);
  // save institutional claim
  const [codeId, setCodeId] = useState({ ExtDiagnosisCodeId: "" });
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
    initialValues: {},
    // validationSchema: FormValNewProcedure,
    validateOnChange: true,
    validateOnBlur: true,
    // By disabling validation onChange and onBlur formik will validate on submit.

    onSubmit: (values, action) => {
      // values from hooks
      -API.post("claim/institutional/store", {
        // |--------claim--------------|
        patientId: instPatientId ? Number(instPatientId) : "",
        attendingProviderId: claimAttendProviderId
          ? Number(claimAttendProviderId)
          : "",
        billingProviderId: instBillingProviderId
          ? Number(instBillingProviderId)
          : "",
        operatingProviderId: instOperatingProviderId
          ? Number(instOperatingProviderId)
          : "",
        otherProviderId: instOtherProviderId ? Number(instOtherProviderId) : "",
        referringProviderId: instRefPcpProviderId
          ? Number(instRefPcpProviderId)
          : "",
        // sales rep absent
        facilityId: facilityProviderId ? Number(facilityProviderId) : "",
        primaryPayerId: primInsuranceProviderId
          ? Number(primInsuranceProviderId)
          : "",
        secondaryPayerId: secInsuranceProviderId
          ? Number(secInsuranceProviderId)
          : "",
        tertiaryPayerId: terInsuranceProviderId
          ? Number(terInsuranceProviderId)
          : "",

        // |--------charge--------------|
        claimCharges: addTableRow,
        // facilityTypesId: "",
        // careTypeId: "",
        // frequencyId: "",
        // reference: "",

        Poa: poa ? poa : "",
        // |--------additional info--------------|
        admittingDiagnosisId: admittingDiagnosisId
          ? Number(admittingDiagnosisId)
          : "",
        statementCoverFrom: statementCoversFrom,
        statementCoverTo: statementCoversTo,
        admissionDate: admissionDate,
        admissionHour: admissionHours,
        admissionType: Number(admissionType),
        admissionSource: admissionSource ? Number(admissionSource) : "",
        dischargeHour: dischargeHours,
        PatientStatus: Number(patientStatus),
        delayReasonCode: delayReasonCode,
        Pps: "pps",
        patientEstimatedAmount: Number.parseFloat(pEstimatedAmount),
        Remarks: remarks,
        patientEmployment: employmentCondition,
        autoAccident: autoAccidentCondition,
        otherAccident: otherAccidentCondition,
        releaseInfo: releaseofInfo,
        // accidentStateId: "",
        assignmentBenefits: assignmetOfBenft,
        providerAcceptAssignment: provideracceptassignment,
        epsdtClearification: "",
        documentationMethod: documentationmethod,
        documentationType: documentationtype,

        // principalProcidureDate: "",
        instExtDiagnosisCodeId: externalCauseinjuryId,
        instReasonDiagnosisCodeId: patientRevesitReasonId,
        instOtherDiagnosisCodesId: otherDiagnosisid,
        instOtherPoa: otherDiagnosisPOA,
        instOtherPrinProcedCodeId: OtherPrcedureRow,

        occuranceSpanCodeId: spanOccurrenceRow,
        occuranceSpanDateFrom: otherSpanFromDate,
        occuranceSpanDateTo: otherSpanToDate,
        occurrenceCodeId: OccurrenceRow,
        occurrenceDate: OccurrenceDate,
        instvalueCodeId: valueRow,

        instConditionCodeId: conditionRow,
        // |--------------information codes -------|
        instExtDiagnosisCode: addExternalCauseNewRow,
        instReasonDiagnosisCode: patientRevesitReasonRow,
        principalDiagnosisCodeId: PricipalDiagnoseId,
        otherDiagnosisCode: otherDiagnosisRow,
        // POA: otherDiagnosisPOA,
        principalProcidureDate: pricipalprocedurecodeDate,
        principalProcidureCodeId: pricipalprocedureId,
      })
        .then(function (response) {
          if (response.data.status === 201) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Institutional Claim Added",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/claim", { replace: true });
            FormReset();
          } else if (response.data.status === 500) {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Some Error Occured!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          // if(error){
          //   (error)
          // }
        });
    },
  });
  return (
    <div className="row mt-3 d-flex">
      <div
        className="col-md-8"
        style={{ overflowY: "scroll", height: "calc(100vh - 127px)" }}
      >
        <form action="" onSubmit={handleSubmit}>
          <div className="col-md-5 d-flex">
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
                id="nav-informaton-codes-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-informaton-codes"
                type="button"
                role="tab"
                aria-controls="nav-informaton-codes"
                aria-selected="false"
              >
                Information Codes
              </button>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            {/* ============================================   CLAIM FORM  ======================= */}
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
                    onChange={(e) => setInstCaimReference(e.target.value)}
                    name="claimReference"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength={40}
                  />
                </div>

                <div className="col-md-3 d-flex align-items-center mt-4 ">
                  <p>
                    <span className="fas fa-triangle-exclamation fs-4" /> Claim
                    is incomplete
                  </p>
                </div>

                <div className="col-md-2">
                  <label htmlFor="claim_frequency">Type OF Bill</label>
                  <div className="input-group">
                    <input
                      className={`form-control form-control-sm`}
                      type="text"
                      placeholder="Type of Bill"
                      aria-label="typeofbill"
                      id="typeofbill"
                      name="typeofbill"
                      value={
                        "" +
                        typeOfFacilityValue +
                        typeOfCareValue +
                        typeOfBillFrequency
                      }
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                    />
                    <button
                      type="button"
                      className="input-group-text bg-light btn-sm btn-hov"
                      id="typeofbillbtn"
                      data-bs-toggle="modal"
                      data-bs-target="#typeOfbillModel"
                    >
                      <i className="fas fa-search" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
                {/* ******************* type of bill model  ************************** */}
                <div
                  className="modal fade text-dark"
                  id="typeOfbillModel"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  aria-hidden="true"
                  aria-labelledby="typeOfbillModel"
                  // tabindex={-1}
                >
                  <div className="modal-dialog modal-md modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5>Type of Bill</h5>
                      </div>
                      <div className="modal-body">
                        <div className="col-md-12">
                          <label htmlFor="">Type of Facility</label>
                          <select
                            onChange={(e) =>
                              setTypeOfFacilityValue(e.target.value)
                            }
                            id="defaultChargeStatus"
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                          >
                            <option selected value={1}>
                              1 - Hospital
                            </option>
                            <option value={2}>2 - Skilled</option>
                            <option value={3}>3 - Home Health</option>
                            <option value={4}>
                              4 - Religious Non-Medical Health Care Institutions
                            </option>
                            <option value={6}>6 - Intermediate Care</option>
                            <option value={7}>7 - Clinic</option>
                            <option value={8}>
                              8 - Special Facility or Hospital ASC Surgery
                            </option>
                          </select>
                        </div>
                        <div className="col-md-12 mt-2">
                          {/* |------------dropdown values dynamic based on type of facility--------------| */}
                          <label htmlFor="">Type of Care</label>

                          {typeOfFacilityValue == 1 ? (
                            <div>
                              <select
                                onChange={(e) =>
                                  setTypeOfCareValue(e.target.value)
                                }
                                id="defaultChargeStatus"
                                className="form-select form-select-sm"
                                aria-label=".form-select-sm example"
                              >
                                <option selected value={1}>
                                  1 - Inpatient(including Medicare Part A)
                                </option>
                                <option value={2}>
                                  2 - Inpatient(including Medicare Part B Only)
                                </option>
                                <option value={3}>3 - Outpatient</option>
                                <option value={4}>
                                  4 - Laboratroy Service Provided to
                                  Non-Patients
                                </option>
                                <option value={8}>8 - Swing Bad</option>
                              </select>
                            </div>
                          ) : typeOfFacilityValue == 2 ? (
                            <div>
                              <select
                                onChange={(e) =>
                                  setTypeOfCareValue(e.target.value)
                                }
                                id="defaultChargeStatus"
                                className="form-select form-select-sm"
                                aria-label=".form-select-sm example"
                              >
                                <option selected value={1}>
                                  1 - Inpatient(including Medicare Part A)
                                </option>
                                <option value={2}>
                                  2 - Inpatient(including Medicare Part B Only)
                                </option>
                                <option value={3}>3 - Outpatient</option>
                                {/* <option value={4}>4 - Laboratroy Service Provided to Non-Patients</option> */}
                                <option value={8}>8 - Swing Bad</option>
                              </select>
                            </div>
                          ) : typeOfFacilityValue == 3 ? (
                            <div>
                              <select
                                onChange={(e) =>
                                  setTypeOfCareValue(e.target.value)
                                }
                                id="defaultChargeStatus"
                                className="form-select form-select-sm"
                                aria-label=".form-select-sm example"
                              >
                                {/* <option selected value={1}>1 - Inpatient(including Medicare Part A)</option> */}
                                <option value={2}>
                                  2 - Under A Plan Of Treatment
                                </option>
                                {/* <option value={3}>3 - Outpatient</option> */}
                                <option value={4}>
                                  4 - Not Under A Plan Of Treatment
                                </option>
                                {/* <option value={8}>8 - Swing Bad</option> */}
                              </select>
                            </div>
                          ) : typeOfFacilityValue == 4 ? (
                            <div>
                              <select
                                onChange={(e) =>
                                  setTypeOfCareValue(e.target.value)
                                }
                                id="defaultChargeStatus"
                                className="form-select form-select-sm"
                                aria-label=".form-select-sm example"
                              >
                                <option selected value={1}>
                                  1 - Inpatient
                                </option>
                                {/* <option value={2}>2 - Under A Plan Of Treatment</option> */}
                                <option value={3}>
                                  3 - Outpatient Services
                                </option>
                                {/* <option value={4}>4 - Not Under A Plan Of Treatment</option> */}
                                {/* <option value={8}>8 - Swing Bad</option> */}
                              </select>
                            </div>
                          ) : typeOfFacilityValue == 6 ? (
                            <div>
                              <select
                                onChange={(e) =>
                                  setTypeOfCareValue(e.target.value)
                                }
                                id="defaultChargeStatus"
                                className="form-select form-select-sm"
                                aria-label=".form-select-sm example"
                              >
                                <option selected value={5}>
                                  5 - Level I
                                </option>
                                <option value={6}>6 - Level II</option>
                              </select>
                            </div>
                          ) : typeOfFacilityValue == 7 ? (
                            <div>
                              <select
                                onChange={(e) =>
                                  setTypeOfCareValue(e.target.value)
                                }
                                id="defaultChargeStatus"
                                className="form-select form-select-sm"
                                aria-label=".form-select-sm example"
                              >
                                <option selected value={1}>
                                  1 - Rural Health
                                </option>
                                <option value={2}>
                                  2 - Hospital Based or Independent Renal
                                  Dialysis Center
                                </option>
                                <option value={3}>3 -Free Standing </option>
                                <option value={4}>
                                  4 - Outpatient Rehabiliation Facility (ORF)
                                </option>
                                <option value={5}>
                                  5 - Comprhensive Outpatient Rehabiliation
                                  Facility (CORF)
                                </option>
                                <option value={6}>
                                  6 - Community Mental Health Center
                                </option>
                                <option value={7}>
                                  7 - Federally Qualified Health Center (FQHC)
                                </option>
                                <option value={8}>
                                  8 - Licensed Freestanding Emergency Medical
                                  Facility
                                </option>
                                <option value={9}>9 - OTHER</option>
                              </select>
                            </div>
                          ) : typeOfFacilityValue == 8 ? (
                            <div>
                              <select
                                onChange={(e) =>
                                  setTypeOfCareValue(e.target.value)
                                }
                                id="defaultChargeStatus"
                                className="form-select form-select-sm"
                                aria-label=".form-select-sm example"
                              >
                                <option selected value={1}>
                                  1 - Hospice(Nonhospital based)
                                </option>
                                <option value={2}>
                                  2 - Hospice(Hospital based)
                                </option>
                                <option value={3}>
                                  3 -Ambulatory Surgery Center
                                </option>
                                <option value={4}>
                                  4 - Free standing Birhting Center
                                </option>
                                <option value={5}>
                                  5 - Critical Access Hospital
                                </option>
                                <option value={6}>
                                  6 - Residential Facility
                                </option>
                                <option value={7}>
                                  7 - Freestanding Non-Residential Opiod
                                  Treatment Program
                                </option>
                                <option value={9}>9 - OTHER</option>
                              </select>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="col-md-12 mt-2">
                          <label htmlFor="">Frequency</label>
                          <select
                            onChange={(e) =>
                              setTypeOfBillFrequency(e.target.value)
                            }
                            id="defaultChargeStatus"
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                          >
                            <option value={0}>0- Non-Payment Zero</option>
                            <option selected value={1}>
                              1 - Admit Through Discharge Claim
                            </option>
                            <option value={2}>2 - Interim-First Claim</option>
                            <option value={3}>
                              3 - Interim-Continuing Claims
                            </option>
                            <option value={4}>4 - Interim-Last Claim</option>
                            <option value={7}>
                              7 - Replacement of Prior Claim
                            </option>
                            <option value={8}>
                              8 - Void/Cancel of Prior Claim
                            </option>
                            <option value={9}>
                              9 - Final Claim for a Home Health PPS Episode
                            </option>
                            <option value="A">
                              A - Hospital Admission Notice
                            </option>
                            <option value="B">
                              B - Cancellation of Election Notice
                            </option>
                            <option value="C">
                              C - Hospital Change of Provider Notice
                            </option>
                            <option value="D">
                              D - Termination/Revocation Notice
                            </option>
                            <option value="E">
                              E - Hospice Change of Ownership
                            </option>
                            <option value="F">
                              F - Beneficiary Initiated Adjustment Claim
                            </option>
                            <option value="G">
                              G - CWF Initiated Adjudtment Claim
                            </option>
                            <option value="H">
                              H - CMS Initiated Adjudtment Claim
                            </option>
                            <option value="I">
                              I - Intermediatry Adjustment Claim (Other than QIO
                              or Provider)
                            </option>
                            <option value="J">
                              J - Initiated Adjustment Claim-Other
                            </option>
                            <option value="K">
                              K - OIG Initiated Adjustment Claim
                            </option>
                            <option value="M">
                              M - MSP Initiated Adjustment Claim
                            </option>
                            <option value="O">O - NonPayment/Zero Claim</option>
                            <option value="P">P - QIO Adjustment Claim</option>
                            <option value="Q">
                              Q - Claim Submitted for Reconsideration/Reopening
                              outside <br /> of Timely Limits
                            </option>
                            <option value="X">
                              X - Void/Cancel a Prior Abbreviation Encounter
                              Submission
                            </option>
                            <option value="Y">
                              Y - Replacement of Prior Abbreviation Encounter
                              Submission
                            </option>
                            <option value="Z">
                              Z - New Abbreviation Encounter Submission
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          data-bs-target="#exampleModalToggle2"
                          data-bs-toggle="modal"
                        >
                          Apply
                        </button>
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
              </div>
              <div className="col-md-12 d-flex mt-2">
                {/* *************************Patient ModelClaim  *******************/}
                <div className="col-md-10">
                  <div
                    className="modal fade"
                    id="patient_searchModal"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex={-1}
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered modal-xl">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="staticBackdropLabel"
                          >
                            Patient Search
                          </h1>
                        </div>
                        <div className="modal-body">
                          <div className="col-md-7 mb-2 d-flex gap-2">
                            <div className="input-group">
                              <button
                                data-bs-toggle="modal"
                                data-bs-target="#refPcp_providerModal"
                                title="Select referring Provider"
                                type="button"
                                className="input-group-text btn-hov"
                                id="claim_ref_Providerbtn"
                              >
                                <i
                                  className="fas fa-search"
                                  aria-hidden="true"
                                />
                              </button>
                              <input
                                className="form-control form-control-sm placeTextTax"
                                type="text"
                                placeholder="Search by name,DOB,account,member ID,phone #"
                                aria-label="ref_pro"
                                id="claim_refPCP_Provider"
                                name="claim_refPCP_Provider"
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                // onChange={handleChange}
                                // value={claimRefferingProv}
                                ////onBlur={handleBlur}
                              />
                            </div>
                          </div>
                          <div className="d-flex col-md-12 gap-2 flex-column ">
                            <div className="col-md-5 d-flex align-items-center">
                              <label cAccess Speech htmlFor="">
                                Search By :
                              </label>
                              <input
                                className="form-check-input mx-2"
                                type="radio"
                                name="searchby "
                                id="searchby"
                              />
                              <label
                                classNAccess
                                Speech
                                Deviceme="form-check-label mt-1"
                                htmlFor="otheraccno"
                              >
                                Patient
                              </label>
                              <input
                                className="form-check-input mx-2"
                                type="radio"
                                name="searchbyPatient"
                                id="searchbyPatient"
                              />
                              <label
                                className="form-check-label mt-1"
                                htmlFor="otheraccyes"
                              >
                                Insured
                              </label>
                            </div>

                            <div className="d-flex gap-2">
                              <div className="form-check  mt-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="searchbyPatientInsured"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="searchInactivePatients"
                                >
                                  Search Inactive Patients
                                </label>
                              </div>{" "}
                              <div className="form-check mt-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="showexactmatchesonly"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="manageAccsearch_inactive"
                                >
                                  Show exact matches only
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="card mb-2">
                            <div className="card-header">Recently Opened</div>
                            <div className="card-body ">
                              <table className="table table-light mt-2 table-hover table-striped mt-2 table table-bordered">
                                <thead>
                                  <tr>
                                    <th>Account #</th>
                                    <th>Name</th>
                                    <th>Date of Birtht</th>
                                    <th>Insured</th>
                                    <th>Balance due pat</th>
                                    <th>Account Type</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {patientData === 0
                                    ? "Please Wait..."
                                    : patientData?.map((provi, i) => (
                                        <tr
                                          key={i}
                                          data-bs-dismiss="modal"
                                          onClick={() =>
                                            getPatientIdName(
                                              provi.first_name +
                                                " " +
                                                provi.last_name,
                                              provi.id
                                            )
                                          }
                                        >
                                          <td>{provi.id}</td>
                                          <td>
                                            {provi.first_name +
                                              " " +
                                              provi.last_name}
                                          </td>

                                          <td>{provi.dob}</td>
                                          <td>{"provi.insurance"}</td>
                                          <td>{provi.patient_types}</td>
                                          <td>
                                            {provi.payements
                                              ? "Active"
                                              : "Inactive"}{" "}
                                          </td>
                                        </tr>
                                      ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                          >
                            Search
                          </button>
                          <button
                            type="button"
                            className="btn btn-light btn-sm"
                            data-bs-dismiss="modal"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ****************************** Patient Input  */}
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
                      // onChange={handleChange}
                      value={instPatientName}
                      // onBlur={handleBlur}
                    />

                    <button
                      title="CLear"
                      onClick={cleartext}
                      type="button"
                      id="claim_primInsbtn"
                      className="btn btn-outline-secondary btn-sm"
                    >
                      <i className="fas fa-x" aria-hidden="true" />
                    </button>

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
                  {/* ****************************** Patient  Input End  */}
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

              {/* ****************************** Attendng Provider Input  */}
              <div className="col-md-12 d-flex mt-2">
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      data-bs-toggle="modal"
                      data-bs-target="#attending_providerModal"
                      className="form-control form-control-sm placeTextTax"
                      type="text"
                      required
                      placeholder="Attending Provider"
                      aria-label="render_prov"
                      id="claim_renderingProvider"
                      name="claim_renderingProvider"
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={handleChange}
                      value={claimAttendProviderName}
                      onBlur={handleBlur}
                    />
                    {/* <button
                      title="CLear"
                      onClick={cleartext}
                      type="button"
                      id="claim_primInsbtn"
                      className="btn btn-outline-secondary btn-sm"
                    >
                      <i className="fas fa-x" aria-hidden="true" />
                    </button> */}
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#attending_providerModal"
                      type="button"
                      title="Select rendering Provider"
                      className="input-group-text btn-hov"
                      id="claim_renderingProviderbtn"
                    >
                      <i className="fas fa-search" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                {/* ******************************attending provider model ****************************/}
                <div
                  className="modal fade"
                  id="attending_providerModal"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex={-1}
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1
                          className="modal-title fs-5"
                          id="staticBackdropLabel"
                        >
                          All Providers
                        </h1>
                      </div>
                      <div className="modal-body">
                        <div className="col-md-12 mb-2">
                          <div className="input-group">
                            <input
                              autoFocus
                              className="form-control form-control-sm placeTextTax"
                              type="text"
                              placeholder="Search for providers "
                              aria-label="npi"
                              id="renderProvsearch"
                              name="renderProvsearch"
                              autoComplete="off"
                              autoCapitalize="off"
                              autoCorrect="off"
                              spellCheck="false"
                            />
                          </div>
                        </div>
                        <table className="table table-light table-hover table-striped table table-bordered">
                          <thead>
                            <tr>
                              <th>Reference #</th>
                              <th>NPI</th>
                              <th>Name</th>
                              <th>Submitter #</th>
                              <th>Tax ID</th>
                              <th>Prof.Mode</th>
                              <th>Practice</th>
                              <th>Inst.Mode</th>
                            </tr>
                          </thead>
                          <tbody>
                            {claimAttendProvider === 0
                              ? "Please Wait.."
                              : claimAttendProvider?.map((provi, i) => (
                                  <tr
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() =>
                                      getClaimAttendProviderName(
                                        provi.last_name + " " + provi.last_name,
                                        provi?.id
                                      )
                                    }
                                  >
                                    <td>{provi?.id ? provi?.id : ""}</td>
                                    <td>
                                      {provi?.npi_code ? provi?.npi_code : ""}
                                    </td>
                                    <td>
                                      {provi?.last_name + " " + provi?.last_name
                                        ? provi?.last_name +
                                          " " +
                                          provi?.last_name
                                        : ""}
                                    </td>
                                    <td>{"?"}</td>
                                    <td>{"?"}</td>
                                    <td>
                                      {provi?.provider_billing
                                        ?.professional_mode
                                        ? provi?.provider_billing
                                            ?.professional_mode
                                        : ""}{" "}
                                    </td>
                                    <td>
                                      {provi?.provider_billing?.practice?.name
                                        ? provi?.provider_billing?.practice
                                            ?.name
                                        : ""}
                                    </td>
                                    <td>
                                      {provi?.provider_billing
                                        ?.institutional_mode
                                        ? provi?.provider_billing
                                            ?.institutional_mode
                                        : ""}
                                    </td>
                                  </tr>
                                ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="modal-footer">
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

              {/* ****************************** Billing Provider Input  */}
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
                      value={instBillingProviderName}
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
              {/* **********************billing provider model ******************************** */}
              <div
                className="modal fade"
                id="billing_providerModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">
                        All Provider
                      </h1>
                    </div>
                    <div className="modal-body">
                      <div className="col-md-12 mb-2">
                        <div className="input-group">
                          <input
                            autoFocus
                            className="form-control form-control-sm placeTextTax"
                            type="text"
                            placeholder="Search for providers "
                            aria-label="npi"
                            id="billingProvsearch"
                            name="billingProvsearch"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                          />
                        </div>
                      </div>
                      <table className="table table-light table-hover table-striped table table-bordered">
                        <thead>
                          <tr>
                            <th>Reference #</th>
                            <th>NPI</th>
                            <th>Name</th>
                            <th>Submitter #</th>
                            <th>Tax ID</th>
                            <th>Prof. Mode</th>
                            <th>Practice</th>
                            <th>Inst. Mode</th>
                          </tr>
                        </thead>
                        <tbody>
                          {claimAttendProvider.map((provi, i) => (
                            <tr
                              key={i}
                              data-bs-dismiss="modal"
                              onClick={() =>
                                getBillProviderNameId(
                                  provi?.first_name + " " + provi?.last_name,
                                  provi?.id
                                )
                              }
                            >
                              <td>{provi.id}</td>
                              <td>{provi.npi_code}</td>
                              <td>
                                {provi.first_name + " " + provi.last_name}
                              </td>
                              <td>{(provi.submitter = "?")}</td>
                              <td>{provi.taxId}</td>
                              <td>{provi.ProfMode}</td>
                              <td>{provi.practice}</td>
                              <td>{"institutional_mode"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="modal-footer">
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

              {/* ********************************************* Operating Provider Input  */}
              <div className="col-md-12 d-flex mt-2">
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      data-bs-toggle="modal"
                      data-bs-target="#operating_providerModal"
                      className="form-control form-control-sm placeTextTax"
                      type="text"
                      placeholder="Operating Provider"
                      aria-label="op_prov"
                      id="claim_operatingProvider"
                      name="claim_operatingProvider"
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={handleChange}
                      value={instOperatingProviderName}
                      onBlur={handleBlur}
                    />

                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#operating_providerModal"
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
              {/* ******************* operating model *************************/}
              <div
                className="modal fade"
                id="operating_providerModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">
                        All Provider
                      </h1>
                    </div>
                    <div className="modal-body">
                      <div className="col-md-12 mb-2">
                        <div className="input-group">
                          <input
                            autoFocus
                            className="form-control form-control-sm placeTextTax"
                            type="text"
                            placeholder="Search for providers "
                            aria-label="npi"
                            id="supervisProvsearch"
                            name="renderProvsearch"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                          />
                        </div>
                      </div>
                      <table className="table table-light table-hover table-striped table table-bordered">
                        <thead>
                          <tr>
                            <th>Reference #</th>
                            <th>NPI</th>
                            <th>Name</th>
                            <th>Submitter #</th>
                            <th>Tax ID</th>
                            <th>Prof. Mode</th>
                            <th>Practice</th>
                            <th>Inst. Mode</th>
                          </tr>
                        </thead>
                        <tbody>
                          {claimAttendProvider.length === 0
                            ? "Please Wait..."
                            : claimAttendProvider?.map((provi, i) => (
                                <tr
                                  key={i}
                                  data-bs-dismiss="modal"
                                  onClick={() =>
                                    getOperatingProviderName(
                                      provi?.first_name +
                                        " " +
                                        provi?.last_name,
                                      provi?.id
                                    )
                                  }
                                >
                                  <td>{provi?.id}</td>
                                  <td>{provi?.npi_code}</td>
                                  <td>
                                    {provi?.first_name + " " + provi?.last_name}
                                  </td>
                                  <td>{"provi.submitter"}</td>
                                  <td>{provi?.taxId}</td>
                                  <td>{"practice.professional_mode"} </td>
                                  <td>
                                    {provi?.provider_billing?.practice_id}
                                  </td>
                                  <td>{"provi.instMode"}</td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="modal-footer">
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
              {/* ***************************************************** Other provider Input  */}
              <div className="col-md-10 d-flex mt-2">
                <div className="col-md-9">
                  <div className="input-group">
                    <input
                      data-bs-toggle="modal"
                      data-bs-target="#other_providerModal"
                      className="form-control form-control-sm placeTextTax"
                      type="text"
                      placeholder="Other Provider"
                      aria-label="otherprov"
                      id="claim_otherProvider"
                      name="claim_otherProvider"
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      onChange={handleChange}
                      value={instOtherProviderName}
                      onBlur={handleBlur}
                    />

                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#other_providerModal"
                      title="Select Ordering Provider"
                      type="button"
                      className="input-group-text btn-hov"
                      id="claim_supervisorProviderbtn"
                    >
                      <i className="fas fa-search" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="col-md-3 mx-2">
                  <select
                    onChange={(e) => setInstclaimRefPcp(e.target.value)}
                    value={InstclaimRefPcp}
                    onBlur={handleBlur}
                    id="claim_ref_provider_select"
                    className="form-select form-select-sm"
                  >
                    <option value="Operating">Operating</option>
                    <option value="Rendering">Rendering</option>
                  </select>
                </div>
                <button
                  type="button"
                  title="Open Ordering Provider"
                  className="btn btn-outline-primary btn-sm mx-2"
                >
                  <span className="fas fa-hospital-user" />
                </button>
              </div>
              {/* other provider model */}
              <div
                className="modal fade"
                id="other_providerModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">
                        All Referring Provider
                      </h1>
                    </div>
                    <div className="modal-body">
                      <div className="col-md-12 mb-2">
                        <div className="input-group">
                          <input
                            autoFocus
                            className="form-control form-control-sm placeTextTax"
                            type="text"
                            placeholder="Search for providers "
                            aria-label="npi"
                            id="orderProvsearch"
                            name="orderProvsearch"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                          />
                        </div>
                      </div>
                      <table className="table table-light table-hover table-striped table table-bordered">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Reference #</th>
                            <th>NPI</th>
                            <th>Address</th>
                          </tr>
                        </thead>
                        <tbody>
                          {refferingProviders.lenght === 0
                            ? "Please Wait!"
                            : refferingProviders?.map((provi, i) => (
                                <tr
                                  key={i}
                                  data-bs-dismiss="modal"
                                  onClick={() =>
                                    getOtherProviderName(
                                      provi?.first_name +
                                        " " +
                                        provi?.last_name,
                                      provi?.id
                                    )
                                  }
                                >
                                  <td>
                                    {provi?.first_name + " " + provi.last_name}
                                  </td>
                                  <td>
                                    {provi?.reference ? provi?.reference : ""}
                                  </td>
                                  <td>{provi?.npi_code}</td>
                                  <td>{provi?.address1}</td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                      >
                        Search
                      </button>
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

              {/* ****************************** Reference provider Input  */}
              <div className="col-md-12 d-flex mt-2">
                <div className="col-md-8">
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
                      value={instRefPcpProviderName}
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
                    onChange={(e) => setInstClaimRefPCB(e.target.value)}
                    value={InstClaimRefPCB}
                    // onBlur={handleBlur}
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
              {/* ****************RefPCP Provider Model *******************/}
              <div
                className="modal fade"
                id="refPcp_providerModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">
                        All Referring Providers
                      </h1>
                    </div>
                    <div className="modal-body">
                      <div className="col-md-12 mb-2">
                        <div className="input-group">
                          <input
                            autoFocus
                            className="form-control form-control-sm placeTextTax"
                            type="text"
                            placeholder="Search for providers "
                            aria-label="npi"
                            id="orderProvsearch"
                            name="orderProvsearch"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                          />
                        </div>
                      </div>
                      <table className="table table-light table-hover table-striped table table-bordered">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Reference #</th>
                            <th>NPI</th>
                            <th>Address</th>
                          </tr>
                        </thead>
                        <tbody>
                          {refferingProviders.lenght === 0
                            ? "Please Wait!"
                            : refferingProviders?.map((provi, i) => (
                                <tr
                                  key={i}
                                  data-bs-dismiss="modal"
                                  onClick={() =>
                                    getRefPcpProviderName(
                                      provi?.first_name +
                                        " " +
                                        provi?.last_name,
                                      provi?.id
                                    )
                                  }
                                >
                                  <td>
                                    {provi?.first_name + " " + provi.last_name}
                                  </td>
                                  <td>
                                    {provi?.reference ? provi?.reference : ""}
                                  </td>
                                  <td>{provi?.npi_code}</td>
                                  <td>{provi?.address1}</td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                      >
                        Search
                      </button>
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
              {/* ************************************************* Sales Rep Input  */}
              <div className="col-md-12 d-flex mt-2">
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      data-bs-toggle="modal"
                      data-bs-target="#salesref_providerModal"
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
                      value={instSalesRepProviderName}
                      // onChange={handleChange}
                      // onBlur={handleBlur}
                    />

                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#salesref_providerModal"
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
              {/* ****************sales rep Provider Model *******************/}
              <div
                className="modal fade"
                id="salesref_providerModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">
                        All Referring Provider
                      </h1>
                    </div>
                    <div className="modal-body">
                      <div className="col-md-12 mb-2">
                        <div className="input-group">
                          <input
                            autoFocus
                            className="form-control form-control-sm placeTextTax"
                            type="text"
                            placeholder="Search for providers "
                            aria-label="npi"
                            id="orderProvsearch"
                            name="orderProvsearch"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                          />
                        </div>
                      </div>
                      <table className="table table-light table-hover table-striped table table-bordered">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Reference #</th>
                            <th>NPI</th>
                            <th>Address</th>
                          </tr>
                        </thead>
                        <tbody>
                          {refferingProviders.lenght === 0
                            ? "Please Wait!"
                            : refferingProviders?.map((provi, i) => (
                                <tr
                                  key={i}
                                  data-bs-dismiss="modal"
                                  onClick={() =>
                                    getSalesRepProviderName(
                                      provi?.first_name +
                                        " " +
                                        provi?.last_name,
                                      provi?.id
                                    )
                                  }
                                >
                                  <td>
                                    {provi?.first_name + " " + provi.last_name}
                                  </td>
                                  <td>
                                    {provi?.reference ? provi?.reference : ""}
                                  </td>
                                  <td>{provi?.npi_code}</td>
                                  <td>{provi?.address1}</td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                      >
                        Search
                      </button>
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
              {/* ************************************************* Facility  Input  */}

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
                      value={facilityProviderName}
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
              {/*  ***************************FacilityProviderModel ******************** */}
              <div
                className="modal fade"
                id="facility_providerModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">
                        All Facilities
                      </h1>
                    </div>
                    <div className="modal-body">
                      <div className="col-md-12 mb-2">
                        <div className="input-group">
                          <input
                            autoFocus
                            className="form-control form-control-sm placeTextTax"
                            type="text"
                            placeholder="Search for Facilities "
                            aria-label="npi"
                            id="orderProvsearch"
                            name="orderProvsearch"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                          />
                        </div>
                      </div>
                      <table className="table table-light table-hover table-striped table table-bordered">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Reference #</th>
                            <th>NPI</th>
                          </tr>
                        </thead>
                        <tbody>
                          {instClaimFacility?.length == 0
                            ? "Please Wait!"
                            : instClaimFacility?.map((provi, i) => (
                                <tr
                                  key={i}
                                  data-bs-dismiss="modal"
                                  onClick={() =>
                                    getFacilityProviderAddress(
                                      provi?.facility_name,
                                      provi?.id
                                    )
                                  }
                                >
                                  <td>{provi.facility_name}</td>
                                  <td>{provi.reference_num}</td>
                                  <td>{provi.npi_code}</td>
                                  <td>{provi.address1}</td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                      >
                        Search
                      </button>
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

              {/* ************************************************* Office Location Input  */}

              <div className="col-md-10 mt-2">
                <select
                  onChange={(e) => setInstClaimOfficeLocation(e.target.value)}
                  value={instClaimOfficeLocation}
                  onBlur={handleBlur}
                  id="claim_location_select"
                  className="form-select form-select-sm"
                >
                  <option defaultValue={"Office Location"}>
                    Office Location
                  </option>
                  {instClaimFacility?.map((provi, i) => {
                    return (
                      <option value={provi.facility_name}>
                        {provi.facility_name}
                      </option>
                    );
                  })}
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
                      value={primInsuranceProviderName}
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
              {/* ******************Primary Insurance Moddel ********************** */}
              {/* show hide primary insurance details */}
              {primInsuranceProviderName && (
                <div className="mt-1">
                  <span className="mt-2 " onClick={handleHidingPriInsurance}>
                    <Link to="">
                      <small>
                        {textHide == true ? "Hide" : "Show"} Primary Policy
                        Details
                      </small>
                    </Link>
                  </span>
                  {/* {loading ? "Loading..." : null} */}
                  {textHide && (
                    <div className="col-md-12 mt-2">
                      <div className="d-flex col-md-10 gap-2">
                        <div className="col-md-3 d-flex  flex-column">
                          <label htmlFor="">Member Id</label>

                          <input
                            className={`form-control form-control-sm`}
                            type="text"
                            placeholder="Member Id"
                            aria-label=""
                            id="memberid"
                            name="memberid"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                            onChange={(e) => setPriMemberId(e.target.value)}
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="">Policy Type</label>

                          <select
                            id="Policy type"
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            onChange={(e) => setPriPolicyType(e.target.value)}
                          >
                            <option selected>Other</option>
                            <option value="Auto Insurance Policy">
                              Auto Insurance Policy
                            </option>
                            <option value="Group Policy">Group Policy</option>
                            <option value="Individual Policy">
                              Individual
                            </option>
                            <option value="Long Term Policy">
                              Long Term Policy
                            </option>
                            <option value="Litigation">Litigation</option>
                            <option value="------">------</option>
                            <option value="Medicare Primary">
                              Medicare Primary
                            </option>
                            <option value="Other">Other</option>{" "}
                            <option value="Self Payment (Cash-No Insurance)">
                              Self Payment (Cash-No Insurance)
                            </option>{" "}
                            <option value="Suppplemetal Policy">
                              Suppplemetal Policy
                            </option>
                          </select>
                        </div>

                        <div className="col-md-3 d-flex flex-column">
                          <label htmlFor="">Copay Due </label>

                          <input
                            className={`form-control form-control-sm`}
                            type="number"
                            placeholder="Copay Due"
                            aria-label="copaydue"
                            id="copaydue"
                            name="copaydue"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                            onChange={(e) => setPriCopayDue(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="d-flex col-md-10 gap-2">
                        <div className="col-md-5 d-flex  flex-column">
                          <label htmlFor="">Group Number</label>

                          <input
                            className={`form-control form-control-sm`}
                            type="text"
                            placeholder="groupnumber"
                            aria-label=""
                            id="groupnumber"
                            name="groupnumber"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                            onChange={(e) => setPriGroupNumber(e.target.value)}
                          />
                        </div>

                        <div className="col-md-5 d-flex flex-column">
                          <label htmlFor="">Origin Claim#</label>

                          <input
                            className={`form-control form-control-sm`}
                            type="number"
                            placeholder="Origin Claim#"
                            aria-label="originclaim"
                            id="originclaim"
                            name="originclaim"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                            onChange={(e) => setPriOriginClaim(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="d-flex col-md-10 gap-2">
                        <div className="col-md-8 d-flex  flex-column">
                          <label htmlFor="">Authrization</label>

                          <input
                            className={`form-control form-control-sm`}
                            type="text"
                            placeholder="Authrization#"
                            aria-label=""
                            id="Authrization"
                            name="Authrization"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                            onChange={(e) =>
                              setPriAuthorization(e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="">Refferel Type</label>

                          <select
                            id="Refferel Type"
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            onChange={(e) => setPriRefferelType(e.target.value)}
                          >
                            <option value="Prior Auth Number">
                              Prior Auth Number
                            </option>
                            <option value="Refferel Number">
                              Refferel Number
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* -------------------------------- Hide Functionality Rnd------------------- */}
              <div
                className="modal fade"
                id="primIns_providerModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">
                        All Payers
                      </h1>
                    </div>
                    <div className="modal-body">
                      <div className="col-md-12 mb-2">
                        <div className="input-group">
                          <input
                            autoFocus
                            className="form-control form-control-sm placeTextTax"
                            type="text"
                            placeholder="Search for providers "
                            aria-label="npi"
                            id="orderProvsearch"
                            name="orderProvsearch"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                          />
                        </div>
                      </div>
                      <table className="table table-light table-hover table-striped table table-bordered">
                        <thead>
                          <tr>
                            <th>Plan Name</th>
                            <th>Address</th>
                            <th>Payer Name</th>
                            <th>Reference</th>
                          </tr>
                        </thead>
                        <tbody>
                          {instClaimInsurance.length === 0
                            ? "Please Wait!"
                            : instClaimInsurance?.map((provi, i) => (
                                <tr
                                  key={i}
                                  data-bs-dismiss="modal"
                                  onClick={() =>
                                    getPrimInsuranceProviderName(
                                      provi?.payer_name,
                                      provi?.id
                                    )
                                  }
                                >
                                  <td>{provi?.plan_name}</td>
                                  <td>{provi?.city}</td>
                                  <td>{provi?.payer_name}</td>
                                  <td>{provi?.reference}</td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                      >
                        Search
                      </button>
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

              {/* {showhidePrimaryDetails === true ? (
                <div className="col-md-12 mt-2">
                  <Link
                    to="#!"
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
              )} */}
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
                      value={secInsuranceProviderName}
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
              {/* **************************** SecondaryInsuranceModel ***************** */}
              {/* show hide SecondaryInsurance  details */}
              {secInsuranceProviderName && (
                <div>
                  <span className="mt-3" onClick={handleHidingSecInsurance}>
                    <Link to="">
                      <small>
                        {secondaryInsurance == true ? "Hide" : "Show"} Secondary
                        Policy Details
                      </small>
                    </Link>
                  </span>
                  {/* {loading ? "Loading..." : null} */}
                  {secondaryInsurance && (
                    <div className="col-md-12 mt-2">
                      <div className="d-flex col-md-10 gap-2">
                        <div className="col-md-5 d-flex  flex-column">
                          <label htmlFor="">Member Id</label>

                          <input
                            className={`form-control form-control-sm`}
                            type="text"
                            placeholder="Member Id"
                            aria-label=""
                            id="memberid"
                            name="memberid"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                            onChange={(e) => setSecMemberId(e.target.value)}
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="">Policy Type</label>

                          <select
                            id="Policy type"
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            onChange={(e) => setSecPolicyType(e.target.value)}
                          >
                            <option selected>Other</option>
                            <option value="Auto Insurance Policy">
                              Auto Insurance Policy
                            </option>
                            <option value="Group Policy">Group Policy</option>
                            <option value="Individual Policy">
                              Individual
                            </option>
                            <option value="Long Term Policy">
                              Long Term Policy
                            </option>
                            <option value="Litigation">Litigation</option>
                            <option value="------">------</option>
                            <option value="Medicare Primary">
                              Medicare Primary
                            </option>
                            <option value="Other">Other</option>{" "}
                            <option value="Self Payment (Cash-No Insurance)">
                              Self Payment (Cash-No Insurance)
                            </option>{" "}
                            <option value="Suppplemetal Policy">
                              Suppplemetal Policy
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="d-flex col-md-10 gap-2">
                        <div className="col-md-5 d-flex  flex-column">
                          <label htmlFor="">Group Number</label>

                          <input
                            className={`form-control form-control-sm`}
                            type="text"
                            placeholder="groupnumber"
                            aria-label=""
                            id="groupnumber"
                            name="groupnumber"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                            onChange={(e) => setSecGroupNumber(e.target.value)}
                          />
                        </div>

                        <div className="col-md-5 d-flex flex-column">
                          <label htmlFor="">Origin Claim#</label>

                          <input
                            className={`form-control form-control-sm`}
                            type="number"
                            placeholder="Origin Claim#"
                            aria-label="originclaim"
                            id="originclaim"
                            name="originclaim"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                            onChange={(e) => setSecOriginClaim(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="d-flex col-md-10 gap-2">
                        <div className="col-md-8 d-flex  flex-column">
                          <label htmlFor="">Authrization</label>

                          <input
                            className={`form-control form-control-sm`}
                            type="text"
                            placeholder="Authrization#"
                            aria-label=""
                            id="Authrization"
                            name="Authrization"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                            onChange={(e) =>
                              setSecAuthorization(e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="">Refferel Type</label>

                          <select
                            id="Refferel Type"
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            onChange={(e) => setSecRefferelType(e.target.value)}
                          >
                            <option value="Prior Auth Number">
                              Prior Auth Number
                            </option>
                            <option value="Refferel Number">
                              Refferel Number
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* -------------------------- END ------------------ */}
              <div
                className="modal fade"
                id="secIns_providerModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">
                        All Payers
                      </h1>
                    </div>
                    <div className="modal-body">
                      <div className="col-md-12 mb-2">
                        <div className="input-group">
                          <input
                            autoFocus
                            className="form-control form-control-sm placeTextTax"
                            type="text"
                            placeholder="Search for providers "
                            aria-label="npi"
                            id="orderProvsearch"
                            name="orderProvsearch"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                          />
                        </div>
                      </div>
                      <table className="table table-light table-hover table-striped table table-bordered">
                        <thead>
                          <tr>
                            <th>Plan Name</th>
                            <th>Address</th>
                            <th>Payer Name</th>
                            <th>Reference</th>
                          </tr>
                        </thead>
                        <tbody>
                          {instClaimInsurance.length === 0
                            ? "Please Wait!"
                            : instClaimInsurance?.map((provi, i) => (
                                <tr
                                  key={i}
                                  data-bs-dismiss="modal"
                                  onClick={() =>
                                    getSecInsuranceProviderName(
                                      provi?.payer_name,
                                      provi?.id
                                    )
                                  }
                                >
                                  <td>{provi?.plan_name}</td>
                                  <td>{provi?.city}</td>
                                  <td>{provi?.payer_name}</td>
                                  <td>{provi?.payer_type_id}</td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                      >
                        Search
                      </button>
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
              {/* {showhideSecondaryDetails === true ? (
                <div className="col-md-12 mt-2">
                  <Link
                    to="#!"
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
              )} */}
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
                      value={terInsuranceProviderName}
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

              {/* ******************<TernaryInsuranceModel ************************ */}
              {/* ================ Ternary Hiding Dev */}
              {terInsuranceProviderName && (
                <div className="mt-1">
                  <span className="mt-2 " onClick={handleHidingTerInsurance}>
                    <Link to="">
                      <small>
                        {ternaryInsurance == true ? "Hide" : "Show"} Ternary
                        Policy Details
                      </small>
                    </Link>
                  </span>
                  {/* {/ {loading ? "Loading..." : null} /} */}
                  {ternaryInsurance && (
                    <div className="col-md-12 mt-2">
                      <div className="d-flex col-md-10 gap-2">
                        <div className="col-md-3 d-flex  flex-column">
                          <label htmlFor="">Member Id</label>

                          <input
                            className={`form-control form-control-sm`}
                            type="text"
                            placeholder="Member Id"
                            aria-label=""
                            id="memberid"
                            name="memberid"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                            onChange={(e) => setTerMemberId(e.target.value)}
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="">Policy Type</label>

                          <select
                            id="Policy type"
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            onChange={(e) => setTerPolicyType(e.target.value)}
                          >
                            <option selected>Other</option>
                            <option value="Auto Insurance Policy">
                              Auto Insurance Policy
                            </option>
                            <option value="Group Policy">Group Policy</option>
                            <option value="Individual Policy">
                              Individual
                            </option>
                            <option value="Long Term Policy">
                              Long Term Policy
                            </option>
                            <option value="Litigation">Litigation</option>
                            <option value="------">------</option>
                            <option value="Medicare Primary">
                              Medicare Primary
                            </option>
                            <option value="Other">Other</option>{" "}
                            <option value="Self Payment (Cash-No Insurance)">
                              Self Payment (Cash-No Insurance)
                            </option>{" "}
                            <option value="Suppplemetal Policy">
                              Suppplemetal Policy
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="d-flex col-md-10 gap-2">
                        <div className="col-md-5 d-flex  flex-column">
                          <label htmlFor="">Group Number</label>

                          <input
                            className={`form-control form-control-sm`}
                            type="text"
                            placeholder="groupnumber"
                            aria-label=""
                            id="groupnumber"
                            name="groupnumber"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                            onChange={(e) => setTerGroupNumber(e.target.value)}
                          />
                        </div>

                        <div className="col-md-5 d-flex flex-column">
                          <label htmlFor="">Origin Claim#</label>

                          <input
                            className={`form-control form-control-sm`}
                            type="number"
                            placeholder="Origin Claim#"
                            aria-label="originclaim"
                            id="originclaim"
                            name="originclaim"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                            onChange={(e) => setTerOriginClaim(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="d-flex col-md-10 gap-2">
                        <div className="col-md-8 d-flex  flex-column">
                          <label htmlFor="">Authrization</label>

                          <input
                            className={`form-control form-control-sm`}
                            type="text"
                            placeholder="Authrization#"
                            aria-label=""
                            id="Authrization"
                            name="Authrization"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                            onChange={(e) =>
                              setTerAuthorization(e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="">Refferel Type</label>

                          <select
                            id="Refferel Type"
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            onChange={(e) => setTerRefferelType(e.target.value)}
                          >
                            <option value="Prior Auth Number">
                              Prior Auth Number
                            </option>
                            <option value="Refferel Number">
                              Refferel Number
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* --------------------------------- RND -------------------- */}
              <div
                className="modal fade"
                id="ternIns_providerModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">
                        All Payers
                      </h1>
                    </div>
                    <div className="modal-body">
                      <div className="col-md-12 mb-2">
                        <div className="input-group">
                          <input
                            autoFocus
                            className="form-control form-control-sm placeTextTax"
                            type="text"
                            placeholder="Search for providers "
                            aria-label="npi"
                            id="orderProvsearch"
                            name="orderProvsearch"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                          />
                        </div>
                      </div>
                      <table className="table table-light table-hover table-striped table table-bordered">
                        <thead>
                          <tr>
                            <th>Plan Name</th>
                            <th>Address</th>
                            <th>Payer Name</th>
                            <th>Reference</th>
                          </tr>
                        </thead>
                        <tbody>
                          {instClaimInsurance.length === 0
                            ? "Please wait"
                            : instClaimInsurance?.map((provi, i) => (
                                <tr
                                  key={i}
                                  data-bs-dismiss="modal"
                                  onClick={() =>
                                    getTerInsuranceProviderName(
                                      provi?.payer_name,
                                      provi?.id
                                    )
                                  }
                                >
                                  <td>{provi?.plan_name}</td>
                                  <td>{provi?.city}</td>
                                  <td>{provi?.payer_name}</td>
                                  <td>{provi?.payer_type_id}</td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                      >
                        Search
                      </button>
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

              {/* {showhideTernaryDetails === true ? (
                <div className="col-md-12 mt-2">
                  <Link
                    to="#!"
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
              )} */}
            </div>
            {/* ========================================   CHARGES FORM  ======================= */}
            <div
              className="tab-pane fade"
              id="nav-charges"
              role="tabpanel"
              aria-labelledby="nav-charges-tab"
              tabIndex="0"
            >
              {/* codes & card */}
              <div className="d-flex col-md-12 mt-3">
                {/* -------------Charges Option*/}
                <div className="w-50 mx-3">
                  <div className="col-md-12 mt-2">
                    <div className="card mb-2">
                      <div className="card-header">Charges Options</div>
                      <div className="card-body ">
                        <div className="col-md-12">
                          <div className="col-md-12 d-flex  flex-column">
                            <div className="col-md-12 d-flex ">
                              <input
                                className="form-check-input "
                                type="checkbox"
                                value=""
                                id="excludeCode"
                              />
                              <label htmlFor="excludeCode mx-0">
                                Update patient procedure Code defaults{" "}
                              </label>
                            </div>

                            <div className="col-md-12 mt-2 d-flex gap-2">
                              <div className="col-md-5">
                                <label htmlFor="">Use Description From </label>
                                <select
                                  id="transportreasons"
                                  className="form-select form-select-sm"
                                  aria-label=".form-select-sm example"
                                >
                                  <option selected>REVCODE</option>
                                  <option value="Collection">Collection</option>
                                  <option value="Paid">Paid</option>
                                  <option value="Paid">
                                    Waiting For Review
                                  </option>
                                </select>
                              </div>
                              <div className="col-md-5">
                                <label htmlFor="">Set all changes to </label>
                                <select
                                  id="transportreasons"
                                  className="form-select form-select-sm"
                                  aria-label=".form-select-sm example"
                                  onchange={(e) =>
                                    setclaimchargesChangesTo(e.target.value)
                                  }
                                >
                                  <option selected>No Change</option>
                                  <option value="Collection">Collection</option>
                                  <option value="Paid">Paid</option>
                                  <option value="Paid">
                                    Waiting For Review
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ****************************  table  ***********************************/}
              <div className="col-md-12">
                <div className="overflow-scroll">
                  <table className="table table-light table-hover table-striped table table-bordered caption-top">
                    <thead className="text-nowrap">
                      <tr>
                        <th scope="text-center">Service Date</th>
                        <th scope="col">HCPCS</th>
                        <th scope="col">Mod 1</th>
                        <th scope="col">Mod 2</th>
                        <th scope="col">Mod 3</th>
                        <th scope="col">Mod 4</th>
                        <th scope="col">Rev Code</th>
                        <th scope="col">Description</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Units</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Status</th>
                        <th scope="col">Other</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>
                          {" "}
                          <input
                            // onChange={(e) => setEffectiveDate(e.target.value)}
                            type="date"
                            id="service"
                            name="service"
                            className="form-control form-control-sm"
                          />{" "}
                        </td>

                        <td>
                          <div
                            className="input-group"
                            style={{ width: "100px" }}
                          >
                            <input
                              className={`form-control form-control-sm`}
                              type="text"
                              placeholder="hcpcs"
                              aria-label=""
                              id="hcpcs"
                              name="hcpcs"
                              value={hcpcCode}
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
                              data-bs-toggle="modal"
                              data-bs-target="#instClaimHCPCModal"
                            >
                              <i
                                className="fas fa-search"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </div>
                        </td>

                        <td>
                          <div
                            className="input-group"
                            style={{ width: "100px" }}
                          >
                            <input
                              className={`form-control form-control-sm`}
                              type="text"
                              placeholder=""
                              aria-label="mod1"
                              id="mod1"
                              name="mod1"
                              value={
                                getmodifier1Code
                                  ? getmodifier1Code.toString()
                                  : ""
                              }
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
                              data-bs-toggle="modal"
                              data-bs-target="#mod1Modal"
                            >
                              <i
                                className="fas fa-search"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </div>
                        </td>
                        <td>
                          <div
                            className="input-group"
                            style={{ width: "100px" }}
                          >
                            <input
                              className={`form-control form-control-sm`}
                              type="text"
                              placeholder=""
                              aria-label="mod2"
                              id="mod2"
                              name="mod2"
                              value={
                                getmodifier2Code
                                  ? getmodifier2Code.toString()
                                  : ""
                              }
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
                              data-bs-toggle="modal"
                              data-bs-target="#mod2Modal"
                            >
                              <i
                                className="fas fa-search"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </div>
                        </td>

                        <td>
                          <div
                            className="input-group"
                            style={{ width: "100px" }}
                          >
                            <input
                              className={`form-control form-control-sm`}
                              type="text"
                              placeholder=""
                              aria-label="mod3"
                              id="mod3"
                              name="mod3"
                              value={
                                getmodifier3Code
                                  ? getmodifier3Code.toString()
                                  : ""
                              }
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
                              data-bs-toggle="modal"
                              data-bs-target="#mod3Modal"
                            >
                              <i
                                className="fas fa-search"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </div>
                        </td>
                        <td>
                          <div
                            className="input-group"
                            style={{ width: "100px" }}
                          >
                            <input
                              className={`form-control form-control-sm`}
                              type="text"
                              placeholder=""
                              aria-label="mod4"
                              id="mod4"
                              name="mod4"
                              value={
                                getmodifier4Code
                                  ? getmodifier4Code.toString()
                                  : ""
                              }
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
                              data-bs-toggle="modal"
                              data-bs-target="#mod4Modal"
                            >
                              <i
                                className="fas fa-search"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </div>
                        </td>

                        <td>
                          <div
                            className="input-group"
                            style={{ width: "100px" }}
                          >
                            <input
                              className={`form-control form-control-sm`}
                              type="text"
                              placeholder=""
                              aria-label="revcode"
                              id="revcode"
                              // required
                              name="revcode"
                              value={instChargeRevenueCode}
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
                              data-bs-toggle="modal"
                              data-bs-target="#instClaimRevCodeModal"
                            >
                              <i
                                className="fas fa-search"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </div>
                        </td>

                        <td>
                          <div className="input-group">
                            <input
                              className={`form-control  form-control-sm`}
                              type="text"
                              placeholder=""
                              aria-label="description"
                              id="description"
                              maxLength={10}
                              minLength={10}
                              onchange={(e) => SetDescription(e.target.value)}
                            />
                          </div>
                        </td>

                        <td>
                          <div
                            className="input-group"
                            style={{ width: "100px" }}
                          >
                            <input
                              className={`form-control form-control-sm`}
                              type="number"
                              placeholder="0.00"
                              aria-label="unitprice"
                              id="unitprice"
                              name="unitprice"
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
                          <div
                            className="input-group"
                            style={{ width: "100px" }}
                          >
                            <input
                              className={`form-control form-control-sm`}
                              type="number"
                              placeholder="1.0"
                              aria-label="units"
                              id="units"
                              name="units"
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
                          <div
                            className="input-group"
                            style={{ width: "100px" }}
                          >
                            <input
                              className={`form-control form-control-sm`}
                              type="number"
                              placeholder="1.0"
                              aria-label="amount"
                              id="amount"
                              name="amount"
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
                            <div
                              className="col-md-5"
                              style={{ width: "190px" }}
                            >
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
                          <div
                            className="col-md-5 mt-1"
                            style={{ width: "60px" }}
                          >
                            <Link to="">
                              <p
                                data-bs-toggle="modal"
                                data-bs-target="#otherModel"
                              >
                                Other
                              </p>
                            </Link>
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
                      </tr>
                      {/* |-------------hCPC code Modal ---------- */}
                      <div
                        className="modal fade"
                        id="instClaimHCPCModal"
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                        tabIndex={-1}
                        aria-labelledby="staticBackdropLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-centered modal-xl">
                          <div className="modal-content">
                            <div className="modal-body">
                              <div className="col-md-7 mb-2 d-flex gap-2">
                                <div className="input-group">
                                  <button
                                    data-bs-toggle="modal"
                                    data-bs-target="#refPcp_providerModal"
                                    title="Select referring Provider"
                                    type="button"
                                    className="input-group-text btn-hov"
                                    id="claim_ref_Providerbtn"
                                  >
                                    <i
                                      className="fas fa-search"
                                      aria-hidden="true"
                                    />
                                  </button>
                                  <input
                                    className="form-control form-control-sm placeTextTax"
                                    type="text"
                                    placeholder="Search for revenue codes by code or description."
                                    aria-label="ref_pro"
                                    id="claim_refPCP_Provider"
                                    name="claim_refPCP_Provider"
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    spellCheck="false"
                                    // onChange={handleChange}
                                    // value={claimRefferingProv}
                                    ////onBlur={handleBlur}
                                  />
                                </div>
                              </div>
                              <div className="d-flex col-md-12 gap-2 flex-column ">
                                <div className="d-flex gap-2">
                                  <div className="form-check mt-1">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      value=""
                                      id="showexactmatchesonly"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="manageAccsearch_inactive"
                                    >
                                      include Inactive codes
                                    </label>
                                  </div>
                                </div>
                              </div>

                              <div className="card mb-2">
                                <div className="card-header">
                                  Recently Opened
                                </div>
                                <div className="card-body ">
                                  <table className="table table-light mt-2 table-hover table-striped mt-2 table table-bordered">
                                    <thead>
                                      <tr>
                                        <th>Code #</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Inactive</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {HcpcCodes === 0
                                        ? "Please Wait..."
                                        : HcpcCodes?.map((provi, i) => (
                                            <tr
                                              key={i}
                                              data-bs-dismiss="modal"
                                              onClick={() =>
                                                getHCPCCodeId(
                                                  provi?.procedure_code,
                                                  provi?.id
                                                )
                                              }
                                            >
                                              <td>{provi?.procedure_code}</td>
                                              <td>{provi?.description}</td>
                                              <td>{provi?.default_price}</td>
                                              <td>
                                                {provi?.deleted_at == null
                                                  ? "Active"
                                                  : "Inactive"}
                                              </td>
                                            </tr>
                                          ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-outline-primary btn-sm"
                              >
                                Search
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                                data-bs-dismiss="modal"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* |-------------Rev Code Modal -----------| */}
                      <div
                        className="modal fade"
                        id="instClaimRevCodeModal"
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                        tabIndex={-1}
                        aria-labelledby="staticBackdropLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-centered modal-xl">
                          <div className="modal-content">
                            <div className="modal-body">
                              <div className="col-md-7 mb-2 d-flex gap-2">
                                <div className="input-group">
                                  <button
                                    data-bs-toggle="modal"
                                    data-bs-target="#refPcp_providerModal"
                                    title="Select referring Provider"
                                    type="button"
                                    className="input-group-text btn-hov"
                                    id="claim_ref_Providerbtn"
                                  >
                                    <i
                                      className="fas fa-search"
                                      aria-hidden="true"
                                    />
                                  </button>
                                  <input
                                    className="form-control form-control-sm placeTextTax"
                                    type="text"
                                    placeholder="Search for revenue codes by code or description."
                                    aria-label="ref_pro"
                                    id="claim_refPCP_Provider"
                                    name="claim_refPCP_Provider"
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    spellCheck="false"
                                    // onChange={handleChange}
                                    // value={claimRefferingProv}
                                    ////onBlur={handleBlur}
                                  />
                                </div>
                              </div>
                              <div className="d-flex col-md-12 gap-2 flex-column ">
                                <div className="d-flex gap-2">
                                  <div className="form-check mt-1">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      value=""
                                      id="showexactmatchesonly"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="manageAccsearch_inactive"
                                    >
                                      include Inactive codes
                                    </label>
                                  </div>
                                </div>
                              </div>

                              <div className="card mb-2">
                                <div className="card-header">
                                  Recently Opened
                                </div>
                                <div className="card-body ">
                                  <table className="table table-light mt-2 table-hover table-striped mt-2 table table-bordered">
                                    <thead>
                                      <tr>
                                        <th>Code #</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Inactive</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {RevCodes === 0
                                        ? "Please Wait..."
                                        : RevCodes?.map((provi, i) => (
                                            <tr
                                              key={i}
                                              data-bs-dismiss="modal"
                                              onClick={() =>
                                                getRebvenueCodeId(
                                                  provi?.revenue_code,
                                                  provi?.description,
                                                  provi.id
                                                )
                                              }
                                            >
                                              <td>{provi?.revenue_code}</td>
                                              <td>{provi?.description}</td>
                                              <td>{provi?.price}</td>
                                              <td>
                                                {provi?.deleted_at == null
                                                  ? "Active"
                                                  : "Inactive"}
                                              </td>
                                            </tr>
                                          ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-outline-primary btn-sm"
                              >
                                Search
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                                data-bs-dismiss="modal"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {addTableRow?.map((data, i) => (
                        <tr key={i}>
                          <td>
                            {" "}
                            <input
                              // onChange={(e) => setEffectiveDate(e.target.value)}
                              type="date"
                              id="service"
                              name="service"
                              className="form-control form-control-sm"
                            />{" "}
                          </td>

                          <td>
                            <div
                              className="input-group"
                              style={{ width: "100px" }}
                            >
                              <input
                                className={`form-control form-control-sm`}
                                type="text"
                                placeholder="hcpcs"
                                aria-label=""
                                id="hcpcs"
                                name="hcpcs"
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
                                data-bs-toggle="modal"
                                data-bs-target="#instClaimHCPCModal"
                              >
                                <i
                                  className="fas fa-search"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                          </td>
                          {/* |-------------hCPC code Modal ---------- */}
                          <div
                            className="modal fade"
                            id="instClaimHCPCModal"
                            data-bs-backdrop="static"
                            data-bs-keyboard="false"
                            tabIndex={-1}
                            aria-labelledby="staticBackdropLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog modal-dialog-centered modal-xl">
                              <div className="modal-content">
                                <div className="modal-body">
                                  <div className="col-md-7 mb-2 d-flex gap-2">
                                    <div className="input-group">
                                      <button
                                        data-bs-toggle="modal"
                                        data-bs-target="#refPcp_providerModal"
                                        title="Select referring Provider"
                                        type="button"
                                        className="input-group-text btn-hov"
                                        id="claim_ref_Providerbtn"
                                      >
                                        <i
                                          className="fas fa-search"
                                          aria-hidden="true"
                                        />
                                      </button>
                                      <input
                                        className="form-control form-control-sm placeTextTax"
                                        type="text"
                                        placeholder="Search for revenue codes by code or description."
                                        aria-label="ref_pro"
                                        id="claim_refPCP_Provider"
                                        name="claim_refPCP_Provider"
                                        autoComplete="off"
                                        autoCapitalize="off"
                                        autoCorrect="off"
                                        spellCheck="false"
                                        // onChange={handleChange}
                                        // value={claimRefferingProv}
                                        ////onBlur={handleBlur}
                                      />
                                    </div>
                                  </div>
                                  <div className="d-flex col-md-12 gap-2 flex-column ">
                                    <div className="d-flex gap-2">
                                      <div className="form-check mt-1">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          value=""
                                          id="showexactmatchesonly"
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="manageAccsearch_inactive"
                                        >
                                          include Inactive codes
                                        </label>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="card mb-2">
                                    <div className="card-header">
                                      Recently Opened
                                    </div>
                                    <div className="card-body ">
                                      <table className="table table-light mt-2 table-hover table-striped mt-2 table table-bordered">
                                        <thead>
                                          <tr>
                                            <th>Code #</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Inactive</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {RevCodes === 0
                                            ? "Please Wait..."
                                            : RevCodes?.map((provi, i) => (
                                                <tr
                                                  key={i}
                                                  data-bs-dismiss="modal"
                                                  // onClick={() =>
                                                  //   getPatientIdName(
                                                  //     provi.first_name +
                                                  //     " " +
                                                  //     provi.last_name,
                                                  //     provi.id
                                                  //   )
                                                  // }
                                                >
                                                  <td>{provi?.revenue_code}</td>
                                                  <td>{provi?.description}</td>
                                                  <td>{provi?.price}</td>
                                                  <td>
                                                    {provi?.deleted_at == null
                                                      ? "Active"
                                                      : "Inactive"}
                                                  </td>
                                                </tr>
                                              ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-outline-primary btn-sm"
                                  >
                                    Search
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm"
                                    data-bs-dismiss="modal"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <td>
                            <div
                              className="input-group"
                              style={{ width: "100px" }}
                            >
                              <input
                                className={`form-control form-control-sm`}
                                type="text"
                                placeholder=""
                                aria-label="mod1"
                                id="mod1"
                                name="mod1"
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
                                data-bs-toggle="modal"
                                data-bs-target="#modifiers1Chargemodal"
                              >
                                <i
                                  className="fas fa-search"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                          </td>
                          <td>
                            <div
                              className="input-group"
                              style={{ width: "100px" }}
                            >
                              <input
                                className={`form-control form-control-sm`}
                                type="text"
                                placeholder=""
                                aria-label="mod2"
                                id="mod2"
                                name="mod2"
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
                                data-bs-toggle="modal"
                                data-bs-target="#modifiers2Chargemodal"
                              >
                                <i
                                  className="fas fa-search"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                          </td>

                          <td>
                            <div
                              className="input-group"
                              style={{ width: "100px" }}
                            >
                              <input
                                className={`form-control form-control-sm`}
                                type="text"
                                placeholder=""
                                aria-label="mod3"
                                id="mod3"
                                name="mod3"
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
                                data-bs-toggle="modal"
                                data-bs-target="#mod1Modal"
                              >
                                <i
                                  className="fas fa-search"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                          </td>
                          <td>
                            <div
                              className="input-group"
                              style={{ width: "100px" }}
                            >
                              <input
                                className={`form-control form-control-sm`}
                                type="text"
                                placeholder=""
                                aria-label="mod4"
                                id="mod4"
                                name="mod4"
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
                                data-bs-toggle="modal"
                                data-bs-target="#modifiers4Chargemodal"
                              >
                                <i
                                  className="fas fa-search"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                          </td>

                          <td>
                            <div
                              className="input-group"
                              style={{ width: "100px" }}
                            >
                              <input
                                className={`form-control form-control-sm`}
                                type="text"
                                placeholder=""
                                aria-label="revcode"
                                id="revcode"
                                name="revcode"
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
                                data-bs-toggle="modal"
                                data-bs-target="#instClaimRevCodeModal"
                              >
                                <i
                                  className="fas fa-search"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                          </td>
                          {/* |-------------Rev Code Modal -----------| */}
                          <div
                            className="modal fade"
                            id="instClaimRevCodeModal"
                            data-bs-backdrop="static"
                            data-bs-keyboard="false"
                            tabIndex={-1}
                            aria-labelledby="staticBackdropLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog modal-dialog-centered modal-xl">
                              <div className="modal-content">
                                <div className="modal-body">
                                  <div className="col-md-7 mb-2 d-flex gap-2">
                                    <div className="input-group">
                                      <button
                                        data-bs-toggle="modal"
                                        data-bs-target="#refPcp_providerModal"
                                        title="Select referring Provider"
                                        type="button"
                                        className="input-group-text btn-hov"
                                        id="claim_ref_Providerbtn"
                                      >
                                        <i
                                          className="fas fa-search"
                                          aria-hidden="true"
                                        />
                                      </button>
                                      <input
                                        className="form-control form-control-sm placeTextTax"
                                        type="text"
                                        placeholder="Search for revenue codes by code or description."
                                        aria-label="ref_pro"
                                        id="claim_refPCP_Provider"
                                        name="claim_refPCP_Provider"
                                        autoComplete="off"
                                        autoCapitalize="off"
                                        autoCorrect="off"
                                        spellCheck="false"
                                        // onChange={handleChange}
                                        // value={claimRefferingProv}
                                        ////onBlur={handleBlur}
                                      />
                                    </div>
                                  </div>
                                  <div className="d-flex col-md-12 gap-2 flex-column ">
                                    <div className="d-flex gap-2">
                                      <div className="form-check mt-1">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          value=""
                                          id="showexactmatchesonly"
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="manageAccsearch_inactive"
                                        >
                                          include Inactive codes
                                        </label>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="card mb-2">
                                    <div className="card-header">
                                      Recently Opened
                                    </div>
                                    <div className="card-body ">
                                      <table className="table table-light mt-2 table-hover table-striped mt-2 table table-bordered">
                                        <thead>
                                          <tr>
                                            <th>Code #</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Inactive</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {RevCodes === 0
                                            ? "Please Wait..."
                                            : RevCodes?.map((provi, i) => (
                                                <tr
                                                  key={i}
                                                  data-bs-dismiss="modal"
                                                  onClick={() =>
                                                    getRebvenueCodeId(
                                                      provi?.revenue_code,
                                                      provi.id
                                                    )
                                                  }
                                                >
                                                  <td>{provi?.revenue_code}</td>
                                                  <td>{provi?.description}</td>
                                                  <td>{provi?.price}</td>
                                                  <td>
                                                    {provi?.deleted_at == null
                                                      ? "Active"
                                                      : "Inactive"}
                                                  </td>
                                                </tr>
                                              ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-outline-primary btn-sm"
                                  >
                                    Search
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm"
                                    data-bs-dismiss="modal"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <td>
                            <div className="input-group">
                              <input
                                className={`form-control  form-control-sm`}
                                type="text"
                                placeholder="Description"
                                name="Description"
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                maxLength={10}
                                minLength={10}
                                onchange={(e) => SetDescription(e.target.value)}
                              />
                            </div>
                          </td>

                          <td>
                            <div
                              className="input-group"
                              style={{ width: "100px" }}
                            >
                              <input
                                className={`form-control form-control-sm`}
                                type="number"
                                placeholder="0.00"
                                aria-label="unitprice"
                                id="unitprice"
                                name="unitprice"
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                maxLength={10}
                                minLength={10}
                                value={unitprice}
                                onchange={(e) => Setunitprice(e.target.value)}
                              />
                            </div>
                          </td>

                          <td>
                            <div
                              className="input-group"
                              style={{ width: "100px" }}
                            >
                              <input
                                className={`form-control form-control-sm`}
                                type="number"
                                placeholder="1.0"
                                aria-label="units"
                                id="units"
                                name="units"
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                maxLength={10}
                                minLength={10}
                                value={unites}
                                onchange={(e) => Setunites(e.target.value)}
                              />
                            </div>
                          </td>

                          <td>
                            <div
                              className="input-group"
                              style={{ width: "100px" }}
                            >
                              <input
                                className={`form-control form-control-sm`}
                                type="number"
                                placeholder="1.00"
                                aria-label="amount"
                                id="amount"
                                name="amount"
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                maxLength={10}
                                minLength={10}
                                value={amount}
                                onchange={(e) => Setamount(e.target.value)}
                              />
                            </div>
                          </td>

                          <td>
                            <div className="col-md-10 d-flex">
                              <div
                                className="col-md-5"
                                style={{ width: "190px" }}
                              >
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
                                  <option value="Paid">
                                    Waiting For Review
                                  </option>
                                </select>
                              </div>
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
                                  data-bs-target="#otherModel"
                                >
                                  Other
                                </p>
                              </Link>
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="col-md-4">
                    <p>0 charges</p>
                  </div>
                </div>
              </div>
            </div>

            {/* -----------claim charge modifiers modalS start--------------- */}
            <div
              className="modal fade text-dark"
              id="mod1Modal"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              aria-hidden="true"
              aria-labelledby="modifier1Chargemodal"
              // tabindex={-1}
            >
              <div className="modal-dialog modal-md modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5>All Modifiers</h5>
                  </div>
                  <div className="modal-body">
                    <div className="d-flex align-items-center">
                      <div className="col-md-9">
                        <label htmlFor="">Search for modifiers</label>
                        <input
                          type="text"
                          id="search"
                          name="search"
                          // value={query}
                          // onChange={(e) => handleSearch(e)}
                          className="form-control form-control-sm"
                          aria-label="Small"
                          placeholder="Search for modifiers"
                          aria-describedby="inputGroup-sizing-sm"
                        />
                      </div>
                    </div>
                    <div className="col-xl-12 mt-2">
                      <div className="card">
                        <div className="card-header">
                          <i className="fas fa-chair me-1"></i>
                          Recently Opened
                        </div>
                        <div className="card-body">
                          <table
                            className="table table-hover table-sm mt-3 table-bordered caption-top"
                            data-bs-spy="scroll"
                            data-bs-offset="50"
                          >
                            <thead>
                              <tr className="bg-primary">
                                <th scope="col">Code</th>
                                <th scope="col">Descripton</th>
                              </tr>
                            </thead>
                            <tbody>
                              {modifiers?.map((role, i) => (
                                <tr
                                  data-bs-toggle="modal"
                                  name="icdACode"
                                  onClick={() =>
                                    getModifier1CodeId(
                                      role?.id,
                                      role?.modifier_code
                                    )
                                  }
                                  id="icdA"
                                  key={i}
                                >
                                  <td>{role?.modifier_code}</td>
                                  <td>{role?.modifier_description}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            // data-bs-target="#exampleModalToggle2"
                            data-bs-toggle="modal"
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
            <div
              className="modal fade text-dark"
              id="mod2Modal"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              aria-hidden="true"
              aria-labelledby="modifier1Chargemodal"
              // tabindex={-1}
            >
              <div className="modal-dialog modal-md modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5>All Modifiers</h5>
                  </div>
                  <div className="modal-body">
                    <div className="d-flex align-items-center">
                      <div className="col-md-9">
                        <label htmlFor="">Search for modifiers</label>
                        <input
                          type="text"
                          id="search"
                          name="search"
                          // value={query}
                          // onChange={(e) => handleSearch(e)}
                          className="form-control form-control-sm"
                          aria-label="Small"
                          placeholder="Search for modifiers"
                          aria-describedby="inputGroup-sizing-sm"
                        />
                      </div>
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
                              </tr>
                            </thead>
                            <tbody>
                              {modifiers?.map((role, i) => (
                                <tr
                                  data-bs-toggle="modal"
                                  name="icdACode"
                                  onClick={() =>
                                    getModifier2CodeId(
                                      role?.id,
                                      role?.modifier_code
                                    )
                                  }
                                  id="icdA"
                                  key={i}
                                >
                                  <td>{role?.modifier_code}</td>
                                  <td>{role?.modifier_description}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            // data-bs-target="#exampleModalToggle2"
                            data-bs-toggle="modal"
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
            <div
              className="modal fade text-dark"
              id="mod3Modal"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              aria-hidden="true"
              aria-labelledby="modifier1Chargemodal"
              // tabindex={-1}
            >
              <div className="modal-dialog modal-md modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5>All Modifiers</h5>
                  </div>
                  <div className="modal-body">
                    <div className="d-flex align-items-center">
                      <div className="col-md-9">
                        <label htmlFor="">Search for modifiers</label>
                        <input
                          type="text"
                          id="search"
                          name="search"
                          // value={query}
                          // onChange={(e) => handleSearch(e)}
                          className="form-control form-control-sm"
                          aria-label="Small"
                          placeholder="Search for modifiers"
                          aria-describedby="inputGroup-sizing-sm"
                        />
                      </div>
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
                              </tr>
                            </thead>
                            <tbody>
                              {modifiers?.map((role, i) => (
                                <tr
                                  data-bs-toggle="modal"
                                  name="icdACode"
                                  onClick={() =>
                                    getModifier3CodeId(
                                      role?.id,
                                      role?.modifier_code
                                    )
                                  }
                                  id="icdA"
                                  key={i}
                                >
                                  <td>{role?.modifier_code}</td>
                                  <td>{role?.modifier_description}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            // data-bs-target="#exampleModalToggle2"
                            data-bs-toggle="modal"
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
            <div
              className="modal fade text-dark"
              id="mod4Modal"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              aria-hidden="true"
              aria-labelledby="modifier1Chargemodal"
              // tabindex={-1}
            >
              <div className="modal-dialog modal-md modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5>All Modifiers</h5>
                  </div>
                  <div className="modal-body">
                    <div className="d-flex align-items-center">
                      <div className="col-md-9">
                        <label htmlFor="">Search for modifiers</label>
                        <input
                          type="text"
                          id="search"
                          name="search"
                          // value={query}
                          // onChange={(e) => handleSearch(e)}
                          className="form-control form-control-sm"
                          aria-label="Small"
                          placeholder="Search for modifiers"
                          aria-describedby="inputGroup-sizing-sm"
                        />
                      </div>
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
                              </tr>
                            </thead>
                            <tbody>
                              {modifiers?.map((role, i) => (
                                <tr
                                  data-bs-toggle="modal"
                                  name="icdACode"
                                  onClick={() =>
                                    getModifier4CodeId(
                                      role?.id,
                                      role?.modifier_code
                                    )
                                  }
                                  id="icdA"
                                  key={i}
                                >
                                  <td>{role?.modifier_code}</td>
                                  <td>{role?.modifier_description}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            // data-bs-target="#exampleModalToggle2"
                            data-bs-toggle="modal"
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
            {/* -----------claim charge modifier modal end--------------- */}
            {/* ***********************************  Other  Model  ***************** */}
            <div
              className="modal fade text-dark"
              id="otherModel"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              aria-hidden="true"
              aria-labelledby="otherModel"
              // tabindex={-1}
            >
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5>Other Info</h5>
                  </div>
                  <div className="modal-body">
                    <div className="col-md-12 d-flex flex-column">
                      <div className="col-md-4 d-flex flex-column">
                        <div className="col-md-12 d-flex">
                          <input
                            className={`form-control form-control-sm`}
                            type="text"
                            placeholder="Non-Covered Amount"
                            aria-label="noncovered"
                            id="noncovered"
                            name="noncovered"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                          />
                        </div>
                      </div>

                      <div className="col-md-12 mt-3">
                        <div className="card mb-2">
                          <div className="card-header">Drug Inoformation</div>
                          <div className="card-body ">
                            <div className="col-md-11 d-flex gap-2">
                              <div className="col-md-3">
                                <input
                                  className={`form-control form-control-sm`}
                                  type="text"
                                  placeholder="Drug Code"
                                  aria-label="drugcode"
                                  id="drugcode"
                                  name="drugcode"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  maxLength={10}
                                  minLength={10}
                                />
                              </div>
                              <div className="col-md-3">
                                <input
                                  className={`form-control form-control-sm`}
                                  type="text"
                                  placeholder="Drug Units"
                                  aria-label="drugunits"
                                  id="drugunits"
                                  name="drugunits"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  maxLength={10}
                                  minLength={10}
                                />
                              </div>

                              <div className="col-md-3">
                                <select
                                  id="defaultChargeStatus"
                                  className="form-select form-select-sm"
                                  aria-label=".form-select-sm example"
                                >
                                  <option selected></option>
                                  <option value="Balance Due Patient">
                                    Balance Due Patient
                                  </option>
                                  <option value="On Hold">On Hold</option>
                                  <option value="Pending Patient">
                                    Pending Patient
                                  </option>
                                </select>
                              </div>

                              <div className="col-md-2">
                                <input
                                  className={`form-control form-control-sm`}
                                  type="text"
                                  placeholder="Drug Days"
                                  aria-label="drugdays"
                                  id="drugdays"
                                  name="drugdays"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  maxLength={10}
                                  minLength={10}
                                />
                              </div>
                            </div>

                            <div className="col-md-11 d-flex gap-2 mt-2">
                              <div className="col-md-3">
                                {" "}
                                <div>
                                  <label htmlFor="">Drug Code Formate</label>
                                </div>
                                <div className="col-md-12">
                                  <select
                                    id="defaultChargeStatus"
                                    className="form-select form-select-sm"
                                    aria-label=".form-select-sm example"
                                  >
                                    <option selected></option>
                                    <option value="Balance Due Patient">
                                      Balance Due Patient
                                    </option>
                                    <option value="On Hold">On Hold</option>
                                    <option value="Pending Patient">
                                      Pending Patient
                                    </option>
                                  </select>
                                </div>
                              </div>

                              <div className="col-md-3">
                                <div>
                                  <div>
                                    <label htmlFor="">Drug Price</label>
                                  </div>
                                  <div>
                                    <input
                                      className={`form-control form-control-sm`}
                                      type="number"
                                      placeholder="0.0"
                                      aria-label="drugunits"
                                      id="drugunits"
                                      name="drugunits"
                                      autoComplete="off"
                                      autoCapitalize="off"
                                      autoCorrect="off"
                                      spellCheck="false"
                                      maxLength={10}
                                      minLength={10}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-11 d-flex gap-2 mt-2">
                              <div className="col-md-3">
                                <input
                                  className={`form-control form-control-sm`}
                                  type="text"
                                  placeholder="Prescription #"
                                  aria-label="Prescription"
                                  id="prescription"
                                  name="prescription"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  maxLength={10}
                                  minLength={10}
                                />
                              </div>
                              <div className="col-md-3 ">
                                <input
                                  className={`form-control form-control-sm`}
                                  type="number"
                                  placeholder="Prescription Date"
                                  aria-label="prescriptiondate"
                                  id="prescriptiondate"
                                  name="prescriptiondate"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  maxLength={10}
                                  minLength={10}
                                />
                              </div>

                              <div className="col-md-3 ">
                                <input
                                  className={`form-control form-control-sm`}
                                  type="number"
                                  placeholder="Prescription Month"
                                  aria-label="prescriptionmonth"
                                  id="prescriptionmonth"
                                  name="prescriptionmonth"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  maxLength={10}
                                  minLength={10}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      data-bs-target="#exampleModalToggle2"
                      data-bs-toggle="modal"
                    >
                      Apply
                    </button>
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
            {/* ====================================   ADDITIONAL INFO FORM  ======================= */}
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
                    CMS 1450(UB-04) Box Numbers (For Printed Claims)
                  </label>
                </div>
                <hr />
              </div>
              {/* ----------------Claim Infotmation -------------------- */}
              <div className="col-xl-11 mt-3">
                <div className="card mb-2">
                  <div className="card-header">Claim Information</div>
                  <div className="card-body ">
                    <div className="col-md-12">
                      {/* -------------------dates ----------------------- */}
                      <div className="col-md-12 d-flex ">
                        <div className="col-md-5 mx-2">
                          <label htmlFor="">Statement Covers From Date</label>
                          <input
                            onChange={(e) =>
                              setStatementCoversFrom(e.target.value)
                            }
                            value={
                              statementCoversFrom ? statementCoversFrom : ""
                            }
                            type="date"
                            id="statementcover1"
                            name="statementcover1"
                            className="form-control form-control-sm"
                          />
                        </div>
                        <div className="col-md-5">
                          <label htmlFor="">Statement Covers To Date</label>
                          <input
                            type="date"
                            onChange={(e) =>
                              setStatementCoversTo(e.target.value)
                            }
                            value={statementCoversTo ? statementCoversTo : ""}
                            placeholder="hre"
                            id="statementcover2"
                            name="statementcover2"
                            className="form-control form-control-sm"
                          />
                        </div>
                      </div>
                      <div className="col-md-12 d-flex mt-3">
                        <div className="col-md-5 mx-2">
                          <label htmlFor="">Admission Date</label>
                          <input
                            onChange={(e) => setAdmissionDate(e.target.value)}
                            type="date"
                            placeholder="Admission Date"
                            id="admissiondate"
                            name="admissiondate"
                            className="form-control form-control-sm"
                          />
                        </div>
                        <div className="col-md-5">
                          <label htmlFor="">Admission Hour</label>
                          <select
                            className="form-select form-select-sm"
                            placeholder="Admission Hour"
                            id="admissionhour"
                            name="admissionhour"
                            onChange={(e) => setAdmissionHours(e.target.value)}
                          >
                            <option value=""> </option>
                            <option value="00">[00] 12:00-12:59 AM</option>
                            <option value="01">[01] 1:00-1:59 AM</option>
                            <option value="02">[02] 2:00-2:59 AM</option>
                            <option value="03">[03] 3:00-3:59 AM</option>
                            <option value="04">[04] 4:00-4:59 AM</option>
                            <option value="05">[05] 5:00-5:59 AM</option>
                            <option value="06">[06] 6:00-6:59 AM</option>
                            <option value="07">[07] 7:00-7:59 AM</option>
                            <option value="08">[08] 8:00-8:59 AM</option>
                            <option value="09">[09] 9:00-9:59 AM</option>
                            <option value="10">[10] 10:00-10:59 AM</option>
                            <option value="11">[11] 11:00-11:59 AM</option>
                            <option value="12">[12] 12:00-12:59 PM</option>
                            <option value="13">[13] 1:00-1:59 PM</option>
                            <option value="14">[14] 2:00-2:59 PM</option>
                            <option value="15">[15] 3:00-3:59 PM</option>
                            <option value="16">[16] 4:00-4:59 PM</option>
                            <option value="17">[17] 5:00-5:59 PM</option>
                            <option value="18">[18] 6:00-6:59 PM</option>
                            <option value="19">[19] 7:00-7:59 PM</option>
                            <option value="20">[20] 8:00-8:59 PM</option>
                            <option value="21">[21] 9:00-9:59 PM</option>
                            <option value="22">[22] 10:00-10:59 PM</option>
                            <option value="23">[23] 11:00-11:59 PM</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-12 d-flex mt-3">
                        <div className="col-md-4">
                          <label htmlFor="">Admission Type</label>
                          <select
                            id="admissiontype"
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            onChange={(e) => setAdmissionType(e.target.value)}
                            defaultValue={admissionType ? admissionType : "1"}
                          >
                            {addmissionType?.map((type) => (
                              <option value={type.id}>{type.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-12 col-sm-12 d-flex flex-column mt-3">
                        <div className="col-md-12 col-sm-12">
                          <label htmlFor="">Admission Source</label>
                          <select
                            id="admissionsource"
                            className="form-select form-select-sm"
                            onChange={(e) => setAdmissionSource(e.target.value)}
                            aria-label=".form-select-sm example"
                          >
                            {/* later it will fetch from api */}
                            <option value="" selected>
                              {"<None>"}
                            </option>
                            {addmissionSource?.map((source) => (
                              <option value={source.id}>{source.name}</option>
                            ))}
                          </select>
                        </div>

                        <div className="col-md-6 col-sm-6 mt-2">
                          <label htmlFor="">Discharge Hour</label>
                          <select
                            id="dischargehour"
                            onChange={(e) => setDischargeHours(e.target.value)}
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                          >
                            <option selected value={"none"}>
                              {"<None>"}
                            </option>
                            <option value="00">[00] 12:00-12:59 AM</option>
                            <option value="01">[01] 1:00-1:59 AM</option>
                            <option value="02">[02] 2:00-2:59 AM</option>
                            <option value="03">[03] 3:00-3:59 AM</option>
                            <option value="04">[04] 4:00-4:59 AM</option>
                            <option value="05">[05] 5:00-5:59 AM</option>
                            <option value="06">[06] 6:00-6:59 AM</option>
                            <option value="07">[07] 7:00-7:59 AM</option>
                            <option value="08">[08] 8:00-8:59 AM</option>
                            <option value="09">[09] 9:00-9:59 AM</option>
                            <option value="10">[10] 10:00-10:59 AM</option>
                            <option value="11">[11] 11:00-11:59 AM</option>
                            <option value="12">[12] 12:00-12:59 PM</option>
                            <option value="13">[13] 1:00-1:59 PM</option>
                            <option value="14">[14] 2:00-2:59 PM</option>
                            <option value="15">[15] 3:00-3:59 PM</option>
                            <option value="16">[16] 4:00-4:59 PM</option>
                            <option value="17">[17] 5:00-5:59 PM</option>
                            <option value="18">[18] 6:00-6:59 PM</option>
                            <option value="19">[19] 7:00-7:59 PM</option>
                            <option value="20">[20] 8:00-8:59 PM</option>
                            <option value="21">[21] 9:00-9:59 PM</option>
                            <option value="22">[22] 10:00-10:59 PM</option>
                            <option value="23">[23] 11:00-11:59 PM</option>
                          </select>
                        </div>

                        <div className="col-md-12 col-sm-12 mt-2">
                          <label htmlFor="">Patient Status</label>
                          <select
                            id="patientstatus"
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            onChange={(e) => setPatientStatus(e.target.value)}
                          >
                            {/* <option selected value={"none"}>
                              {"<None>"}
                            </option> */}
                            <option value="01">
                              01- Discharged to home or self care(routine
                              discharge)
                            </option>
                            <option value="02">
                              02- Discharged/Transfered to a short term general
                              hospital for inpatient care
                            </option>
                            <option value="03">
                              03- Discharged/Transfered to skilled nursing
                              facility (SNF) with Medicare certification
                            </option>
                            <option value="04">
                              04- Discharged/Transfered to a facility that
                              provides Custodial or Supportive Care
                            </option>
                            <option value="05">
                              05- Discharged/Transfered to Designated Cancer
                              Center or Children's Hospital
                            </option>
                            <option value="06">
                              06- Discharged/Transfered to home under care of
                              organized home health service organization
                            </option>
                            <option value="07">
                              07 - Left against medical advice or discontinued
                              care
                            </option>
                            <option value="09">
                              09 - Admitted as an inpatient to this hospital{" "}
                            </option>
                            <option value="20">20 - Expired </option>
                            <option value="21">
                              21 - Discharged/Transferred to Court/Law
                              Enforcement{" "}
                            </option>
                            <option value="30">30 - Still Patient </option>
                            <option value="40">40 - Expired at home </option>
                            <option value="41">
                              41 - Expired in a medical facility{" "}
                            </option>
                            <option value="42">
                              42 - Expired-Place Unknown{" "}
                            </option>
                            <option value="43">
                              43 - Discharged/Transferred to a federal health
                              care facility{" "}
                            </option>
                            <option value="50">50 - Hospice-Home </option>
                            <option value="51">
                              51 - Hospice-Medical Facility(Certified) Providing
                              Hospice Level of Care{" "}
                            </option>
                            {/* <option value=""> 61 - Discharged/Transferred to hospital-based Medicare approved swing bed </option>
<option value=""> 62 - <p>Discharged/Transferred to an inpatient rehabilitation facility (IRF) including Rehabilitation Distinct Part Units </p> <br></br> <p>of a Hospital </p> </option>
<option value=""> 63 - Discharged/Transferred to a Medicare Certified Long Term Care Hospital(LTCH) </option>
<option value=""> 64 - Discharged/Transferred to a Nursing Facility Certified under Medicaid but not Certified under Medicare </option>
<option value=""> 65 - Discharged/Transferred to a psychiatric hospital or Psychiatric Distinct Part Unit of a Hospital </option>
<option value=""> 66 - Discharged/Transferred to a Critical Access Hospital(CAH) </option>
<option value=""> 69 - Discharged/Transferred to a designated disaster alternative care site </option>
<option value=""> 69 - Discharged/Transferred to a designated disaster alternative care site </option>
<option value=""> 70 - Discharged/Transferred to another type of health care institution not defined elsewhere in this code list </option>
<option value=""> 81 - Discharged to Home or Self Care with a Planned Acute Care Hospital Inpatient Readmission </option>
<option value=""> 82 - Discharged/Transferred to a Short Term General Hospital for Inpatient Care with a Planned Acute Care Hospital Inpatient Readmission </option>
<option value=""> 83 - Discharged/Transferred to a Skilled Nursing Facility(SNF) with Medicare Certification with a Planned Acute Care Hospital Inpatient Readmisison </option>
<option value=""> 84 - Discharged/Transferred to a Facility that Provides Custodial or Supportive Care with a Planned Acute Care Hospital Inpatient Readmission </option>
<option value=""> 85 - Discharged/Transferred to a Designated Cancer Center or Children's Hospital with a Planned Acute Care Hospital Inpatient Readmission </option>
<option value=""> 86 - Discharged/Transferred to Home Under Care of Organized Home Health Service Organization with a Planned Acute Care Hospital Inpatient Readmission </option>
<option value=""> 87 - Discharged/Transferred to Court/Law Enforcement with a Planned Acute Care Hospital Inpatient Readmission </option>
<option value=""> 88 - Discharged/Transferred to a Federal Health Care Facility with a Planned Acute Care Hospital Inpatient Readmission </option>
<option value=""> 89 - Discharged/Transferred to a Hospital-based Medicare Approved Swing Bed with a Planned Acute Care Hospital Inpatient Readmission </option>
<option value=""> 90 - Discharged/Transferred to an Inpatient Rehabilitation Facility(IRF) including Rehabilitation Distinct Part Units of a Hospital with a Planned Acute Care Hospital Inpatient Readmission </option>
<option value=""> </option>
<option value=""> </option>
<option value=""> </option>
<option value=""> </option>
<option value=""> </option>
<option value=""> </option>
<option value=""> </option>
<option value=""> </option>
<option value=""> </option>
<option value=""> </option>
<option value=""> </option>
<option value=""> </option> */}
                          </select>
                        </div>

                        <div className="col-md-12 col-sm-12 mt-2">
                          <label htmlFor="">Delay Reason Code</label>
                          <select
                            id="delayreasoncode"
                            onChange={(e) => setDelayReasonCode(e.target.value)}
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            value={delayReasonCode}
                          >
                            <option value="none">None</option>
                            <option value="Proof of Eligibility Unknown or Unavailable">
                              Proof of Eligibility Unknown or Unavailable
                            </option>
                            <option value="Litigation">Litigation</option>
                            <option value="Authorization Delays">
                              Authorization Delays
                            </option>
                            <option value="Delay in Certifying Provider">
                              Delay in Certifying Provider
                            </option>
                            <option value="Delay in Supplying Billing Forms">
                              Delay in Supplying Billing Forms
                            </option>
                            <option value="Delay in Delivery of Custom-made Appliances">
                              Delay in Delivery of Custom-made Appliances
                            </option>
                            <option value="Third Party Processing Delay">
                              Third Party Processing Delay
                            </option>
                            <option value="Delay in Eligibility Determination">
                              Delay in Eligibility Determination
                            </option>
                            <option value="Original Claim Rejected or Denied Due to a Reason Unrelated to the Billing Limitation RulesAdministration Delay in the Prior Approval ProcessNatural Disaster">
                              Original Claim Rejected or Denied Due to a Reason
                              Unrelated to the Billing Limitation
                              RulesAdministration Delay in the Prior Approval
                              ProcessNatural Disaster
                            </option>
                            <option value="Administration Delay in the Prior Approval ProcessNatural Disaster">
                              Administration Delay in the Prior Approval
                              ProcessNatural Disaster
                            </option>
                            <option value="Natural Disaster">
                              Natural Disaster
                            </option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div className="col-md-6 col-sm-7 mt-2">
                          <input
                            type="text"
                            onChange={(e) => setPps(e.target.value)}
                            placeholder="PPS(Diagnosis Related Group)"
                            id="pps"
                            value={pps}
                            name="pps"
                            className="form-control form-control-sm"
                          />
                        </div>

                        <div className="col-md-6 col-sm-6 mt-2">
                          <label htmlFor="">Patient estimated Amount Due</label>
                          <InputDecimal
                            precision={2}
                            className={`form-control form-control-sm`}
                            type="text"
                            value={pEstimatedAmount}
                            placeholder="0.0"
                            id="patientEstimatedAmount"
                            name="patientEstimatedAmount"
                            onChangeValue={(value) => {
                              setPEstimatedAmount(
                                parseFloat(value)?.toFixed(2)
                              );
                            }}
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            style={{ textAlign: "right" }}
                          />
                        </div>

                        <div className="col-md-12">
                          <div className="col-md-12 col-sm-12 mt-2">
                            <label htmlFor="">Remarks</label>
                            <textarea
                              class="form-control"
                              id="exampleFormControlTextarea1"
                              rows="2"
                              onChange={(e) => setRemarks(e.target.value)}
                              value={remarks}
                              maxLength={250}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ############################### Patient Condition#########3 */}
                  <div className="col-xl-11 mt-3">
                    <div className="card mb-2">
                      <div className="card-header">Patient Condition</div>
                      <div className="card-body ">
                        <div className="col-md-12">
                          <p>Is Patient Condition Related to:</p>
                          <div className="col-md-5 d-flex align-items-center">
                            <label htmlFor="">Employment</label>
                            <input
                              onChange={employmentConditionHandler}
                              type="radio"
                              value={1}
                              checked={employmentCondition == 1}
                              className="form-check-input mx-2"
                              name="employment"
                              id="empyes"
                            />
                            <label
                              className="form-check-label mt-1"
                              htmlFor="empyes"
                            >
                              Yes{" "}
                            </label>

                            <input
                              onChange={employmentConditionHandler}
                              type="radio"
                              value={0}
                              checked={employmentCondition == 0}
                              className="form-check-input mx-2"
                              name="employment"
                              id="empno"
                            />
                            <label
                              className="form-check-label mt-1"
                              htmlFor="empno"
                            >
                              No{" "}
                            </label>
                          </div>
                          <div className="col-md-5 d-flex align-items-center mt-2">
                            <label htmlFor="">Auto Accident</label>
                            <input
                              onChange={autoAccidentConditionHandler}
                              type="radio"
                              value={1}
                              checked={autoAccidentCondition == 1}
                              className="form-check-input mx-2"
                              name="autoAccd"
                              id="autoaccyes"
                            />
                            <label
                              className="form-check-label mt-1"
                              htmlFor="autoaccyes"
                            >
                              Yes
                            </label>
                            <input
                              onChange={autoAccidentConditionHandler}
                              type="radio"
                              value={0}
                              checked={autoAccidentCondition == 0}
                              className="form-check-input mx-2"
                              name="autoAccd"
                              id="autoaccno"
                            />
                            <label
                              className="form-check-label mt-1"
                              htmlFor="autoaccno"
                            >
                              {" "}
                              No{" "}
                            </label>
                          </div>
                          <div className="col-md-5 d-flex align-items-center mt-2">
                            <label htmlFor="">Other Accident</label>
                            <input
                              onChange={otherAccidentConditionHandler}
                              type="radio"
                              value={1}
                              checked={otherAccidentCondition == 1}
                              className="form-check-input mx-2"
                              name="OtherAccd"
                              id="otheraccyes"
                            />
                            <label
                              className="form-check-label mt-1"
                              htmlFor="otheraccyes"
                            >
                              Yes
                            </label>
                            {/* logic remainig */}
                            <input
                              onChange={otherAccidentConditionHandler}
                              type="radio"
                              value={0}
                              checked={otherAccidentCondition == 0}
                              className="form-check-input mx-2"
                              name="OtherAccd"
                              id="otheraccno"
                            />
                            <label
                              className="form-check-label mt-1"
                              htmlFor="otheraccno"
                            >
                              No
                            </label>
                          </div>{" "}
                          <hr />
                          {/* -------------------dates ----------------------- */}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ############################### Assigment of Benefits#########3 */}
                  <div className="card mb-2 mt-2">
                    <div className="card-header">Assigment of Benefits</div>
                    <div className="card-body ">
                      <div className="col-md-8 d-flex flex-column">
                        <div className="d-flex col-md-12 gap-2">
                          <div className="col-md-5 d-flex flex-column ">
                            <label htmlFor="">Release of Info</label>
                            <div className="col-md-4">
                              <select
                                id="defaultChargeStatus"
                                onChange={(e) =>
                                  setReleaseofInfo(e.target.value)
                                }
                                defaultValue={releaseofInfo}
                                className="form-select form-select-sm"
                                aria-label=".form-select-sm example"
                              >
                                <option selected value={1}>
                                  Yes
                                </option>
                                <option value={0}>No</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-md-5 d-flex flex-column">
                            <label htmlFor="">Assigment of Benefits</label>
                            <div className="col-md-4">
                              <select
                                id="yes"
                                onChange={(e) =>
                                  setAssignmetOfBenft(e.target.value)
                                }
                                className="form-select form-select-sm"
                                aria-label=".form-select-sm example"
                                defaultValue={assignmetOfBenft}
                              >
                                <option value={1}>Yes</option>
                                <option value={0}>No</option>
                                {/* <option value="2">On Hold</option>
<option value="3">Pending Patient</option> */}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-5 col-sm-5 mt-2">
                          <div className="col-md-12 d-flex flex-column">
                            <label htmlFor="">Provider Accept Assignment</label>
                            <div className="col-md-4">
                              <select
                                id="yes"
                                className="form-select form-select-sm"
                                aria-label=".form-select-sm example"
                                defaultValue={provideracceptassignment}
                                onChange={(e) =>
                                  setProviderAcceptAssignment(e.target.value)
                                }
                              >
                                <option value={1}>Yes</option>
                                <option value={0}>No</option>
                                {/* <option value="3">On Hold</option>
<option value="4">Pending Patient</option> */}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ############################### EPSDT Certification #########3 */}
                  <div className="card mb-2">
                    <div className="card-header">EPSDT Certification</div>
                    <div className="card-body ">
                      <label htmlFor="">Select up to 3 if applicable</label>
                      <div className="col-md-12 col-sm-12 flex-column d-flex">
                        <div className="col-md-6 d-flex">
                          <div className="col-md-12 gap-2 d-flex p-1 mt-2">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="referallgiven"
                              onChange={() =>
                                setepsdtnoRefferel(!epsdtnoRefferel)
                              }
                              checked={epsdtnoRefferel}
                              value=""
                            />
                            <label htmlFor="excludeCode mx-0">
                              No referral given
                            </label>
                          </div>
                          <div className="col-md-6 gap-2 d-flex p-1 mt-2">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="refusedreferall"
                              onChange={() =>
                                setepsdtnoRefused(!epsdtnoRefused)
                              }
                              checked={epsdtnoRefused}
                            />
                            <label htmlFor="excludeCode mx-0">
                              Patient refused referral
                            </label>
                          </div>
                        </div>

                        <div className="col-md-6 d-flex">
                          <div className="col-md-12 gap-2 d-flex p-1 mt-2">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              onChange={() =>
                                setepsdtnoTreatment(!epsdtnoTreatment)
                              }
                              checked={epsdtnoTreatment}
                              id="undertreatment"
                            />
                            <label htmlFor="excludeCode mx-0">
                              Patient is currently Under treatment
                            </label>
                          </div>

                          <div className="col-md-12 gap-2 d-flex p-1 mt-2">
                            <input
                              chacked
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="anotherreferall"
                              onChange={() => setepsdtprovider(!epsdtprovider)}
                              checked={epsdtprovider}
                            />
                            <label htmlFor="excludeCode mx-0">
                              Patient is referred to another provider
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ############################### Other Reference Information #########3 */}

                  <div className="card mb-2 mt-2 border-bottom-0">
                    <div className="card-header">
                      Other Reference Information{" "}
                    </div>
                    <div className="card-body ">
                      <div className="col-md-10 d-flex flex-column">
                        <div className="d-flex col-md-10 gap-2">
                          <div className="col-md-5 d-flex flex-column ">
                            <label htmlFor=""> Documentation Type</label>
                            <div className="col-md-12">
                              <select
                                id="documentationtype"
                                className="form-select form-select-sm"
                                aria-label=".form-select-sm example"
                                defaultValue={documentationtype}
                                onChange={(e) =>
                                  setDocumentationType(e.target.value)
                                }
                              >
                                <option value="Yes">Yes</option>
                                <option value="Documentation Type">
                                  Documentation Type
                                </option>
                                <option value="On Hold">On Hold</option>
                                <option value="Pending Patient">
                                  Pending Patient
                                </option>
                              </select>
                            </div>
                          </div>

                          <div className="col-md-5 d-flex flex-column">
                            <label htmlFor=""> Documentation Method</label>
                            <div className="col-md-12">
                              <select
                                id="documentationtype2"
                                className="form-select form-select-sm"
                                aria-label=".form-select-sm example"
                                defaultValue={documentationmethod}
                                onChange={(e) =>
                                  setDocumentationMethod(e.target.value)
                                }
                              >
                                <option selected>Yes</option>
                                <option value="Yes">Yes</option>
                                <option value="On Hold">On Hold</option>
                                <option value="Pending Patient">
                                  Pending Patient
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ===================================   INFORMATION CODES FORM  ======================= */}
            <div
              className="tab-pane fade"
              id="nav-informaton-codes"
              role="tabpanel"
              aria-labelledby="nav-ambulanceclaim-tab"
              tabIndex="0"
            >
              <div className="col-md-12 d-flex flex-column mt-2">
                <label htmlFor="">
                  Show Additional Information about each field
                </label>
              </div>
              <div className="col-md-11 d-flex align-items-center">
                <div className="form-check mx-2">
                  <input
                    disabled
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
                    disabled
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
                    disabled
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="cms"
                  />
                  <label className="form-check-label" htmlFor="cms">
                    CMS 1450(UB-04) Box Numbers (For Printed Claims)
                  </label>
                </div>
                <hr />
              </div>
              {/* -------------------------------  Principal Diagnosis Input ---------------- */}

              <div className="col-md-12 d-flex align-items-center">
                <div className="input-group w-50  mx-2 mt-4">
                  <input
                    className={`form-control form-control-sm`}
                    type="text"
                    placeholder="Principal Diagnosis"
                    aria-label="hcpcs"
                    id="rincipalDiagnosis"
                    name="rincipalDiagnosis"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength={10}
                    minLength={10}
                    value={PricipalDiagnoseCod}
                  />
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#dignoseCodesModal"
                    className="input-group-text bg-light btn-sm btn-hov"
                    id="NPIbtn"
                  >
                    <i className="fas fa-search" aria-hidden="true"></i>
                  </button>
                </div>
                <div
                  className="modal fade"
                  id="dignoseCodesModal"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex={-1}
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-md">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1
                          className="modal-title fs-5"
                          id="staticBackdropLabel"
                        >
                          All Diagnosis Codes
                        </h1>
                      </div>
                      <div className="modal-body">
                        <div className="col-md-12 mb-2">
                          <div className="input-group">
                            <input
                              className="form-control form-control-sm placeTextTax"
                              type="text"
                              placeholder="Search for providers "
                              aria-label="npi"
                              id="renderProvsearch"
                              name="renderProvsearch"
                              autoComplete="off"
                              autoCapitalize="off"
                              autoCorrect="off"
                              spellCheck="false"
                            />
                          </div>
                        </div>
                        <table className="table table-light table-hover table-striped table table-bordered">
                          <thead>
                            <tr>
                              <th>Diagnose Code</th>
                              <th>Description</th>
                              <th>Inactive</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dignoseCodes === 0
                              ? "Please Wait..."
                              : dignoseCodes?.map((provi, i) => (
                                  <tr
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() =>
                                      getPricipalDiagnoseCodeId(
                                        provi?.diagnosis_code,
                                        provi?.id
                                      )
                                    }
                                  >
                                    <td>{provi?.diagnosis_code}</td>
                                    <td>{provi?.description}</td>
                                    <td>
                                      {provi?.deleted_at == null
                                        ? "Active"
                                        : "Inactive"}
                                    </td>
                                  </tr>
                                ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                        >
                          Search
                        </button>
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
                <div className="col-md-5">
                  <label htmlFor="">POA</label>
                  <select
                    id="transportreasons"
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    onChange={(e) => setPoa(e.target.value)}
                  >
                    <option value="" selected></option>
                    <option selected value="1">
                      1-Unreported
                    </option>
                    <option value="Y">Y-Yes</option>
                    <option value="N">N-No</option>
                    <option value="U">U-Unknown</option>
                    <option value="W">W-Undetermined</option>
                  </select>
                </div>
              </div>

              {/* -------------------------------  Admitting Diagnosis Input ---------------- */}
              <div className="col-md-12">
                <div className="input-group w-25  mx-2 mt-4">
                  <input
                    className={`form-control form-control-sm`}
                    type="text"
                    placeholder="Admitting Diagnosis"
                    aria-label="hcpcs"
                    id="admittingDiagnosis"
                    name="admittingDiagnosis"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength={10}
                    value={admittingDiagnosisName}
                    minLength={10}
                  />
                  <button
                    type="button"
                    className="input-group-text bg-light btn-sm btn-hov"
                    id="NPIbtn"
                    data-bs-toggle="modal"
                    data-bs-target="#admittingDiagnosisModal"
                  >
                    <i className="fas fa-search" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
              {/* -------------------------------  Admitting Diagnosis Modal ---------------- */}
              <div
                className="modal fade"
                id="admittingDiagnosisModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-md">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">
                        All Diagnosis Codes
                      </h1>
                    </div>
                    <div className="modal-body">
                      <div className="col-md-12 mb-2">
                        <div className="input-group">
                          <input
                            className="form-control form-control-sm placeTextTax"
                            type="text"
                            placeholder="Search for providers "
                            aria-label="npi"
                            id="renderProvsearch"
                            name="renderProvsearch"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                          />
                        </div>
                      </div>
                      <table className="table table-light table-hover table-striped table table-bordered">
                        <thead>
                          <tr>
                            <th>Diagnose Code</th>
                            <th>Description</th>
                            <th>Inactive</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dignoseCodes === 0
                            ? "Please Wait..."
                            : dignoseCodes?.map((provi, i) => (
                                <tr
                                  key={i}
                                  data-bs-dismiss="modal"
                                  onClick={() =>
                                    getAdmittingDiagnosisCodeId(
                                      provi?.diagnosis_code,
                                      provi?.id
                                    )
                                  }
                                >
                                  <td>{provi?.diagnosis_code}</td>
                                  <td>{provi?.description}</td>
                                  <td>
                                    {provi?.deleted_at == null
                                      ? "Active"
                                      : "Inactive"}
                                  </td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                      >
                        Search
                      </button>
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
              {/* -------------------------------  End Modal ---------------- */}
              {/* ************************   External  Cause of injury  ************************ */}
              <div className="table-responsive  mt-2">
                <label className="fw-bold" htmlFor="">
                  External Cause of injury
                </label>
                <table
                  className="table table-light table-hover table-striped table table-bordered"
                  // style={{
                  //   overflowY: "scroll",
                  //   height: "calc(100vh - 127px",
                  // }}
                >
                  <thead>
                    <tr>
                      <th scope="col" className="col-md-4">
                        Code
                      </th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>

                  <tbody>
                    {addExternalCauseNewRow.map((provie) => (
                      <tr>
                        <td>
                          <div className="input-group">
                            <button
                              type="button"
                              className="input-group-text bg-light btn-sm btn-hov"
                              id="NPIbtn"
                            >
                              <i
                                className="fas fa-search"
                                aria-hidden="true"
                              ></i>
                            </button>
                            <input
                              className="form-control form-control-sm"
                              type="text"
                              placeholder=""
                              aria-label="hcpcs"
                              id="hcpcs"
                              name="hcpcs"
                              autoComplete="off"
                              autoCapitalize="off"
                              autoCorrect="off"
                              spellCheck="false"
                              maxLength={10}
                              minLength={10}
                              data-bs-toggle="modal"
                              data-bs-target="#externalCauseofinjury"
                              value={provie.code}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="input-group">
                            <input
                              className={`form-control form-control-sm`}
                              type="text"
                              placeholder=""
                              aria-label="hcpcs"
                              id="desc"
                              name="desc"
                              autoComplete="off"
                              autoCapitalize="off"
                              autoCorrect="off"
                              spellCheck="false"
                              maxLength={10}
                              minLength={10}
                              data-bs-toggle="modal"
                              data-bs-target="#externalCauseofinjury"
                              value={
                                provie.description
                                // ? provie.description
                                // : externalCauseinjuryDesc
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                    <td>
                      <div className="input-group">
                        <button
                          type="button"
                          className="input-group-text bg-light btn-sm btn-hov"
                          id="NPIbtn"
                          data-bs-toggle="modal"
                          data-bs-target="#externalCauseofinjury"
                        >
                          <i className="fas fa-search" aria-hidden="true"></i>
                        </button>{" "}
                        <input
                          className="form-control form-control-sm"
                          type="text"
                          placeholder=""
                          aria-label="hcpcs"
                          id="hcpcs"
                          name="hcpcs"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={10}
                          minLength={10}
                          // value={externalCauseinjuryCode}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="text"
                          placeholder=""
                          // disabled
                          aria-label="hcpcs"
                          id="desc"
                          name="desc"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={10}
                          minLength={10}
                          // value={externalCauseinjuryDesc}
                        />
                      </div>
                    </td>
                  </tbody>
                </table>
              </div>
              {/* -------------------------------  External  Cause of injury ---------------- */}
              <div
                className="modal fade"
                id="externalCauseofinjury"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-md">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">
                        All Diagnosis Codes
                      </h1>
                    </div>
                    <div className="modal-body">
                      <div className="col-md-12 mb-2">
                        <div className="input-group">
                          <input
                            className="form-control form-control-sm placeTextTax"
                            type="text"
                            placeholder="Search for providers "
                            aria-label="npi"
                            id="renderProvsearch"
                            name="renderProvsearch"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                          />
                        </div>
                      </div>
                      <table className="table table-light table-hover table-striped table table-bordered">
                        <thead>
                          <tr>
                            <th>Diagnose Code</th>
                            <th>Description</th>
                            <th>Inactive</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dignoseCodes === 0
                            ? "Please Wait..."
                            : dignoseCodes?.map((provi, i) => (
                                <tr
                                  key={i}
                                  data-bs-dismiss="modal"
                                  onClick={() =>
                                    provi.id === externalCauseinjuryId &&
                                    provi.diagnosis_code ===
                                      externalCauseinjuryCode &&
                                    provi.description ===
                                      externalCauseinjuryDesc
                                      ? UpdateExternalCauseCodeDesc(
                                          provi?.diagnosis_code,
                                          provi?.description
                                        )
                                      : getExternalCauseInjury(
                                          provi?.id,
                                          provi?.diagnosis_code,
                                          provi?.description
                                        )
                                  }
                                >
                                  <td>{provi?.diagnosis_code}</td>
                                  <td>{provi?.description}</td>
                                  <td>
                                    {provi?.deleted_at == null
                                      ? "Active"
                                      : "Inactive"}
                                  </td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                      >
                        Search
                      </button>
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
              {/* -------------------------------  End Modal ---------------- */}

              {/* ************************   Patient's Reason for Visit  ************************ */}
              <div className="table-responsive">
                <label className="fw-bold" htmlFor="">
                  Patient's Reason for Visit
                </label>
                <table
                  className="table table-light table-hover table-striped table table-bordered"
                  // style={{
                  //   overflowY: "scroll",
                  //   height: "calc(100vh - 127px",
                  // }}
                >
                  <thead>
                    <tr>
                      <th scope="col">Code</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>

                  <tbody>
                    {patientRevesitReasonRow.map((provi, i) => (
                      <tr key={i}>
                        <td className="col-md-4">
                          <div className="input-group">
                            <button
                              type="button"
                              className="input-group-text bg-light btn-sm btn-hov"
                              id="NPIbtn"
                              data-bs-toggle="modal"
                              data-bs-target="#patientReasonVisitmodal"
                            >
                              <i
                                className="fas fa-search"
                                aria-hidden="true"
                              ></i>
                            </button>
                            <input
                              className="form-control form-control-sm col-md-12"
                              type="text"
                              placeholder=""
                              aria-label="hcpcs"
                              id="hcpcs"
                              name="hcpcs"
                              autoComplete="off"
                              autoCapitalize="off"
                              autoCorrect="off"
                              spellCheck="false"
                              maxLength={10}
                              minLength={10}
                              value={provi.code}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="input-group">
                            <input
                              className={`form-control form-control-sm`}
                              type="text"
                              placeholder=""
                              aria-label="hcpcs"
                              id="provi.description"
                              name="provi.description"
                              value={provi.description}
                              autoComplete="off"
                              autoCapitalize="off"
                              autoCorrect="off"
                              spellCheck="false"
                              maxLength={10}
                              minLength={10}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                    <td className="col-md-4">
                      <div className="input-group">
                        {" "}
                        <button
                          type="button"
                          className="input-group-text bg-light btn-sm btn-hov"
                          id="NPIbtn"
                          data-bs-toggle="modal"
                          data-bs-target="#patientReasonVisitmodal"
                        >
                          <i className="fas fa-search" aria-hidden="true"></i>
                        </button>
                        <input
                          className="form-control form-control-sm col-md-12"
                          type="text"
                          placeholder=""
                          aria-label="hcpcs"
                          id="hcpcs"
                          name="hcpcs"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={10}
                          minLength={10}
                          // value={patientRevesitReasonCode}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="text"
                          placeholder=""
                          aria-label="hcpcs"
                          id="desc"
                          name="desc"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={10}
                          minLength={10}
                          // value={patientRevesitReasonDesc}
                        />
                      </div>
                    </td>
                  </tbody>
                </table>
              </div>

              {/* -------------------------------  Patient's Reason for Visit modal---------------- */}
              <div
                className="modal fade"
                id="patientReasonVisitmodal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-md">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">
                        All Diagnosis Codes
                      </h1>
                    </div>
                    <div className="modal-body">
                      <div className="col-md-12 mb-2">
                        <div className="input-group">
                          <input
                            className="form-control form-control-sm placeTextTax"
                            type="text"
                            placeholder="Search for providers "
                            aria-label="npi"
                            id="renderProvsearch"
                            name="renderProvsearch"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                          />
                        </div>
                      </div>
                      <table className="table table-light table-hover table-striped table table-bordered">
                        <thead>
                          <tr>
                            <th>Diagnose Code</th>
                            <th>Description</th>
                            <th>Inactive</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dignoseCodes === 0
                            ? "Please Wait..."
                            : dignoseCodes?.map((provi, i) => (
                                <tr
                                  key={i}
                                  data-bs-dismiss="modal"
                                  onClick={() =>
                                    patientRevesitReasonRow.code ===
                                    provi.diagnosis_code
                                      ? UpdatepatientRevisitIDName(
                                          provi?.id,
                                          provi?.diagnosis_code,
                                          provi?.description
                                        )
                                      : getpatientRevisitReason(
                                          provi?.id,
                                          provi?.diagnosis_code,
                                          provi?.description
                                        )
                                  }
                                >
                                  <td>{provi?.diagnosis_code}</td>
                                  <td>{provi?.description}</td>
                                  <td>
                                    {provi?.deleted_at == null
                                      ? "Active"
                                      : "Inactive"}
                                  </td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                      >
                        Search
                      </button>
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
              {/* -------------------------------  End Modal ---------------- */}

              {/* ************************   Other Diagnosis  ************************ */}
              <div className="table-responsive">
                <label className="fw-bold" htmlFor="">
                  Other Diagnosis
                </label>
                <table
                  className="table table-light table-hover table-striped table table-bordered"
                  // style={{
                  //   overflowY: "scroll",
                  //   height: "calc(100vh - 127px",
                  // }}
                >
                  <thead>
                    <tr>
                      <th scope="col">Code</th>
                      <th scope="col">Description</th>
                      <th scope="col">POA</th>
                    </tr>
                  </thead>

                  <tbody>
                    {otherDiagnosisRow.map((privi) => (
                      <tr>
                        <td className="col-md-3">
                          <div className="input-group">
                            <button
                              type="button"
                              className="input-group-text bg-light btn-sm btn-hov"
                              id="NPIbtn"
                              data-bs-toggle="modal"
                              data-bs-target="#otherdiagnosismodal"
                            >
                              <i
                                className="fas fa-search"
                                aria-hidden="true"
                              ></i>
                            </button>
                            <input
                              className="form-control form-control-sm"
                              type="text"
                              placeholder=""
                              aria-label="hcpcs"
                              id="hcpcs"
                              name="hcpcs"
                              autoComplete="off"
                              autoCapitalize="off"
                              autoCorrect="off"
                              spellCheck="false"
                              maxLength={10}
                              minLength={10}
                              value={privi.code}
                            />
                          </div>
                        </td>
                        <td className="col-md-6">
                          <div className="input-group">
                            <input
                              className={`form-control form-control-sm`}
                              type="text"
                              placeholder=""
                              aria-label="hcpcs"
                              id="desc"
                              name="desc"
                              autoComplete="off"
                              autoCapitalize="off"
                              autoCorrect="off"
                              spellCheck="false"
                              maxLength={10}
                              minLength={10}
                              value={privi.description}
                            />
                          </div>
                        </td>
                        <td className="col-md-3">
                          <div className="input-group">
                            <div className="col-md-12">
                              <select
                                id=""
                                className="form-select form-select-sm"
                                aria-label=".form-select-sm example"
                                // value={privi}
                                onChange={(e) =>
                                  setotherDiagnosisPOA(e.target.value)
                                }
                                // value={otherDiagnosisPOA}
                              >
                                <option value="1">1-Unrepeated</option>
                                <option value="Y">Y-Yes</option>
                                <option value="N">N-No</option>
                                <option value="U">U-Unknown</option>
                                <option value="W">W-Undetermind</option>
                              </select>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      {" "}
                      <td className="col-md-3">
                        <div className="input-group">
                          {" "}
                          <button
                            type="button"
                            className="input-group-text bg-light btn-sm btn-hov"
                            id="NPIbtn"
                            data-bs-toggle="modal"
                            data-bs-target="#otherdiagnosismodal"
                          >
                            <i className="fas fa-search" aria-hidden="true"></i>
                          </button>
                          <input
                            className="form-control form-control-sm"
                            type="text"
                            placeholder=""
                            aria-label="hcpcs"
                            id="hcpcs"
                            name="hcpcs"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            // value={otherDiagnosisCode}
                          />
                        </div>
                      </td>
                      <td className="col-md-6">
                        <div className="input-group">
                          <input
                            className={`form-control form-control-sm`}
                            type="text"
                            placeholder=""
                            aria-label="hcpcs"
                            id="desc"
                            name="desc"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                            // value={otherDiagnosisDesc}
                          />
                        </div>
                      </td>
                      <td className="col-md-3">
                        <div className="input-group">
                          <div className="col-md-12">
                            <select
                              id=""
                              className="form-select form-select-sm"
                              aria-label=".form-select-sm example"
                            >
                              <option value="null" selected></option>
                              <option value="1-Unrepeated">1-Unrepeated</option>
                              <option value="Y-Yes">Y-Yes</option>
                              <option value="N-No">N-No</option>
                              <option value="U-Unknown">U-Unknown</option>
                              <option value="W-Undetermind">
                                W-Undetermind
                              </option>
                            </select>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* -------------------------------  Other Diagnosis modal---------------- */}
              <div
                className="modal fade"
                id="otherdiagnosismodal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-md">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">
                        All Diagnosis Codes
                      </h1>
                    </div>
                    <div className="modal-body">
                      <div className="col-md-12 mb-2">
                        <div className="input-group">
                          <input
                            className="form-control form-control-sm placeTextTax"
                            type="text"
                            placeholder="Search for providers "
                            aria-label="npi"
                            id="renderProvsearch"
                            name="renderProvsearch"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                          />
                        </div>
                      </div>
                      <table className="table table-light table-hover table-striped table table-bordered">
                        <thead>
                          <tr>
                            <th>Diagnose Code</th>
                            <th>Description</th>
                            <th>Inactive</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dignoseCodes === 0
                            ? "Please Wait..."
                            : dignoseCodes?.map((provi, i) => (
                                <tr
                                  key={i}
                                  data-bs-dismiss="modal"
                                  onClick={() =>
                                    getOtherDiagnosisData(
                                      provi?.id,
                                      provi?.diagnosis_code,
                                      provi?.description
                                    )
                                  }
                                >
                                  <td>{provi?.diagnosis_code}</td>
                                  <td>{provi?.description}</td>
                                  <td>
                                    {provi?.deleted_at == null
                                      ? "Active"
                                      : "Inactive"}
                                  </td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                      >
                        Search
                      </button>
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
              {/* -------------------------------  End Modal ---------------- */}

              {/* ----------------------  principal procedure  ------------------- */}
              <div className="d-flex gap-2">
                <div className="col-md-4">
                  <div className="input-group col-md-4">
                    <button
                      type="button"
                      className="input-group-text bg-light btn-sm btn-hov"
                      id="NPIbtn"
                      data-bs-toggle="modal"
                      data-bs-target="#principleprocedure"
                    >
                      <i className="fas fa-search" aria-hidden="true"></i>
                    </button>
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      placeholder="principal procedure"
                      aria-label="hcprincipal procedurpcs"
                      id="principal procedur"
                      name="principal procedur"
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      maxLength={10}
                      minLength={10}
                      value={pricipalprocedurecode}
                    />
                  </div>
                </div>
                <td>
                  <input
                    type="date"
                    id="pricipalprocedurDate"
                    name="serpricipalprocedurDatevice"
                    className="form-control form-control-sm"
                    onChange={(e) => setpricipalprocedurDate(e.target.value)}
                    value={pricipalprocedurecodeDate}
                  />
                </td>
                {/* -------------------------------  Principle procedure modal---------------- */}
                <div
                  className="modal fade"
                  id="principleprocedure"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex={-1}
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-md">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1
                          className="modal-title fs-5"
                          id="staticBackdropLabel"
                        >
                          All ICD Procedure Code
                        </h1>
                      </div>
                      <div
                        className="modal-body"
                        style={{
                          overflowY: "scroll",
                          height: "calc(50vh - 77px",
                        }}
                      >
                        <div className="col-md-12 mb-2">
                          <div className="input-group">
                            <input
                              className="form-control form-control-sm placeTextTax"
                              type="text"
                              placeholder="Search for providers "
                              aria-label="npi"
                              id="renderProvsearch"
                              name="renderProvsearch"
                              autoComplete="off"
                              autoCapitalize="off"
                              autoCorrect="off"
                              spellCheck="false"
                            />
                          </div>
                        </div>
                        <table className="table table-light table-hover table-striped table table-bordered">
                          <thead>
                            <tr>
                              <th>ICD Procedure Code</th>
                              <th>Description</th>
                              <th>Inactive</th>
                            </tr>
                          </thead>
                          <tbody>
                            {HcpcCodes === 0
                              ? "Please Wait..."
                              : HcpcCodes?.map((provi, i) => (
                                  <tr
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() =>
                                      getPrincipalPrcedure(
                                        provi?.procedure_code,
                                        provi?.id
                                      )
                                    }
                                  >
                                    <td>{provi?.procedure_code}</td>
                                    <td>{provi?.description}</td>
                                    <td>
                                      {provi?.deleted_at == null
                                        ? "Active"
                                        : "Inactive"}
                                    </td>
                                  </tr>
                                ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                        >
                          Search
                        </button>
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
              </div>

              {/* ************************   Other Procedure  ************************ */}
              <div className="table-responsive mt-2">
                <label className="fw-bold" htmlFor="">
                  Other Procedure
                </label>
                <table
                  className="table table-light table-hover table-striped table table-bordered"
                  // style={{
                  //   overflowY: "scroll",
                  //   height: "calc(100vh - 127px",
                  // }}
                >
                  <thead>
                    <tr>
                      <th scope="col">Code</th>
                      <th scope="col">Date</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>

                  <tbody>
                    {OtherPrcedureRow?.map((provi) => (
                      <tr>
                        <td>
                          <div className="input-group">
                            <button
                              type="button"
                              className="input-group-text bg-light btn-sm btn-hov"
                              id="NPIbtn"
                              data-bs-toggle="modal"
                              data-bs-target="#otherProcedure"
                            >
                              <i
                                className="fas fa-search"
                                aria-hidden="true"
                              ></i>
                            </button>
                            <input
                              className="form-control form-control-sm"
                              type="text"
                              placeholder=""
                              aria-label=""
                              id="provi.code"
                              name="provi.code"
                              autoComplete="off"
                              autoCapitalize="off"
                              autoCorrect="off"
                              spellCheck="false"
                              maxLength={10}
                              minLength={10}
                              // value={OtherPrcedureCode}
                              value={provi.code}
                            />
                          </div>
                        </td>
                        <td>
                          <input
                            type="date"
                            id="otherprodate"
                            value={provi?.date}
                            // defaultValue={defaultValue}
                            name="otherprodate"
                            className="form-control form-control-sm"
                          />{" "}
                        </td>
                        <td>
                          <div className="input-group">
                            <input
                              className={`form-control form-control-sm`}
                              type="text"
                              placeholder=""
                              aria-label=""
                              id="provi.descriptiond"
                              name="provi.descriptiond"
                              autoComplete="off"
                              autoCapitalize="off"
                              autoCorrect="off"
                              spellCheck="false"
                              maxLength={10}
                              minLength={10}
                              // value={OtherPrcedureDesc}
                              value={provi.description}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td>
                        <div className="input-group">
                          <button
                            type="button"
                            className="input-group-text bg-light btn-sm btn-hov"
                            id="NPIbtn"
                            data-bs-toggle="modal"
                            data-bs-target="#otherProceduree"
                          >
                            <i className="fas fa-search" aria-hidden="true"></i>
                          </button>
                          <input
                            className="form-control form-control-sm"
                            type="text"
                            placeholder=""
                            aria-label=""
                            id="x"
                            name="x"
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
                        <input
                          // onChange={(e) => setEffectiveDate(e.target.value)}
                          type="date"
                          id="otherprodate"
                          name="otherprodate"
                          className="form-control form-control-sm"
                          // defaultValue={defaultValue}
                          onChange={(e) =>
                            setotherProcedureDate(e.target.value)
                          }
                          value={otherProcedureDate}
                        />{" "}
                      </td>
                      <td>
                        <div className="input-group">
                          <input
                            className={`form-control form-control-sm`}
                            type="text"
                            placeholder=""
                            aria-label=""
                            id="y"
                            name="y"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* ************************   Other Procedure  Modal ************************ */}
                <div
                  className="modal fade"
                  id="otherProceduree"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex={-1}
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-md">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1
                          className="modal-title fs-5"
                          id="staticBackdropLabel"
                        >
                          All Icd/Procedure Codes
                        </h1>
                      </div>
                      <div className="modal-body">
                        <div className="col-md-12 mb-2">
                          <div className="input-group">
                            <input
                              className="form-control form-control-sm placeTextTax"
                              type="text"
                              placeholder="Search for providers "
                              aria-label="npi"
                              id="renderProvsearch"
                              name="renderProvsearch"
                              autoComplete="off"
                              autoCapitalize="off"
                              autoCorrect="off"
                              spellCheck="false"
                            />
                          </div>
                        </div>
                        <table className="table table-light table-hover table-striped table table-bordered">
                          <thead>
                            <tr>
                              <th>ICD Prp Code</th>
                              <th>Description</th>
                              <th>Inactive</th>
                            </tr>
                          </thead>
                          <tbody>
                            {HcpcCodes === 0
                              ? "Please Wait..."
                              : HcpcCodes?.map((provi, i) => (
                                  <tr
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() =>
                                      getOtherPrcedure(
                                        provi?.id,
                                        provi?.procedure_code,
                                        provi?.description
                                      )
                                    }
                                  >
                                    <td>{provi?.procedure_code}</td>
                                    <td>{provi?.description}</td>
                                    <td>
                                      {provi?.deleted_at == null
                                        ? "Active"
                                        : "Inactive"}
                                    </td>
                                  </tr>
                                ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                        >
                          Search
                        </button>
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
              </div>
              {/* ************************   Occurrence  Span ************************ */}
              <div className="table-responsive mt-2">
                <label className="fw-bold" htmlFor="">
                  Occurrence Span
                </label>
                <table
                  className="table table-light table-hover table-striped table table-bordered"
                  // style={{
                  //   overflowY: "scroll",
                  //   height: "calc(100vh - 127px",
                  // }}
                >
                  <thead>
                    <tr>
                      <th scope="col">Code</th>
                      <th scope="col">From</th>
                      <th scope="col">To</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>

                  <tbody>
                    {spanOccurrenceRow.map((provi, i) => {
                      return (
                        <tr>
                          <td>
                            <div className="input-group">
                              <button
                                type="button"
                                className="input-group-text bg-light btn-sm btn-hov"
                                id="NPIbtn"
                                data-bs-toggle="modal"
                                data-bs-target="#occuranceSpan"
                              >
                                <i
                                  className="fas fa-search"
                                  aria-hidden="true"
                                ></i>
                              </button>
                              <input
                                className="form-control form-control-sm"
                                type="text"
                                aria-label="hcpcs"
                                id="hcpcs"
                                name="hcpcs"
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                maxLength={10}
                                minLength={10}
                                value={provi.code}
                              />
                            </div>
                          </td>
                          <td>
                            <input
                              type="date"
                              id="spanfrom"
                              name="spanfrom"
                              className="form-control form-control-sm"
                              value={provi.dateTo}
                            />
                          </td>
                          <td>
                            <input
                              // onChange={(e) => setEffectiveDate(e.target.value)}
                              type="date"
                              id="spanto"
                              name="spanto"
                              className="form-control form-control-sm"
                              value={provi.dateFrom}
                            />{" "}
                          </td>
                          <td>
                            <div className="input-group">
                              <input
                                className={`form-control form-control-sm`}
                                type="text"
                                aria-label="hcpcs"
                                id="desc"
                                name="desc"
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                maxLength={10}
                                minLength={10}
                                value={provi.description}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td>
                        <div className="input-group">
                          <button
                            type="button"
                            className="input-group-text bg-light btn-sm btn-hov"
                            id="NPIbtn"
                            data-bs-toggle="modal"
                            data-bs-target="#occuranceSpan"
                          >
                            <i className="fas fa-search" aria-hidden="true"></i>
                          </button>
                          <input
                            className="form-control form-control-sm"
                            type="text"
                            placeholder="Occurrence"
                            aria-label="hcpcs"
                            id="hcpcs"
                            name="hcpcs"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                            data-bs-toggle="modal"
                            data-bs-target="#occuranceSpan"
                          />
                        </div>
                      </td>
                      <td>
                        {" "}
                        <input
                          // onChange={(e) => setEffectiveDate(e.target.value)}
                          type="date"
                          id="spanoccurrenceTo"
                          name="spanoccurrenceTo"
                          value={otherSpanToDate}
                          className="form-control form-control-sm"
                          onChange={(e) => setotherSpanToDate(e.target.value)}
                        />{" "}
                      </td>
                      <td>
                        {" "}
                        <input
                          // onChange={(e) => setEffectiveDate(e.target.value)}
                          type="date"
                          id="spanoccurrencefrom"
                          name="spanoccurrencfromn"
                          className="form-control form-control-sm"
                          onChange={(e) => setotherSpanFromDate(e.target.value)}
                          value={otherSpanFromDate}
                        />
                      </td>
                      <td>
                        <div className="input-group">
                          <input
                            className={`form-control form-control-sm`}
                            type="text"
                            placeholder=""
                            aria-label="hcpcs"
                            id="desc"
                            name="desc"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* ************************ Occurrence Span Modal ************************ */}
              <div
                className="modal fade"
                id="occuranceSpan"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-md">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">
                        All Icd/Procedure Codes
                      </h1>
                    </div>
                    <div
                      className="modal-body"
                      style={{
                        overflowY: "scroll",
                        height: "calc(40vh - 57px)",
                      }}
                    >
                      <div className="col-md-12 mb-2">
                        <div className="input-group">
                          <input
                            className="form-control form-control-sm placeTextTax"
                            type="text"
                            placeholder="Search for providers "
                            aria-label="npi"
                            id="renderProvsearch"
                            name="renderProvsearch"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                          />
                        </div>
                      </div>
                      <table className="table table-light table-hover table-striped table table-bordered">
                        <thead>
                          <tr>
                            <th>Code</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {occurrenceSpanApi === 0
                            ? "Please Wait..."
                            : occurrenceSpanApi?.map((provi, i) => (
                                <tr
                                  key={i}
                                  data-bs-dismiss="modal"
                                  onClick={() =>
                                    getOccurrenceSpanCodeDesc(
                                      provi?.code,
                                      provi?.id,
                                      provi?.description
                                    )
                                  }
                                >
                                  <td>{provi?.code}</td>
                                  <td>{provi?.description}</td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                      >
                        Search
                      </button>
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
              {/* ************************   Occurnace  ************************ */}
              <div className="table-responsive mt-2">
                <label className="fw-bold" htmlFor="">
                  Occurrence
                </label>
                <table
                  className="table table-light table-hover table-striped table table-bordered"
                  // style={{
                  //   overflowY: "scroll",
                  //   height: "calc(100vh - 127px",
                  // }}
                >
                  <thead>
                    <tr>
                      <th scope="col">Code</th>
                      <th scope="col">Date</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>

                  <tbody>
                    {OccurrenceRow.map((provi) => {
                      return (
                        <tr>
                          <td>
                            <div className="input-group">
                              <button
                                type="button"
                                className="input-group-text bg-light btn-sm btn-hov"
                                id="NPIbtn"
                              >
                                <i
                                  className="fas fa-search"
                                  aria-hidden="true"
                                ></i>
                              </button>
                              <input
                                className="form-control form-control-sm"
                                type="text"
                                placeholder=""
                                aria-label="hcpcs"
                                id="hcpcs"
                                name="hcpcs"
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                maxLength={10}
                                minLength={10}
                                value={provi.code}
                              />
                            </div>
                          </td>
                          <td>
                            <input
                              // onChange={(e) => setEffectiveDate(e.target.value)}
                              type="date"
                              id="occurrencdatee"
                              name="occurrencdatee"
                              className="form-control form-control-sm"
                              value={provi.date}
                            />
                          </td>
                          <td>
                            <div className="input-group">
                              <input
                                className={`form-control form-control-sm`}
                                type="text"
                                placeholder=""
                                aria-label="hcpcs"
                                id="occurrencdesc"
                                name="occurrencedesc"
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                maxLength={10}
                                minLength={10}
                                value={provi.description}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td>
                        <div className="input-group">
                          <button
                            type="button"
                            className="input-group-text bg-light btn-sm btn-hov"
                            id="NPIbtn"
                            data-bs-toggle="modal"
                            data-bs-target="#occurance"
                          >
                            <i className="fas fa-search" aria-hidden="true"></i>
                          </button>
                          <input
                            className="form-control form-control-sm"
                            type="text"
                            placeholder=""
                            aria-label="hcpcs"
                            id="hcpcs"
                            name="hcpcs"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                            data-bs-toggle="modal"
                            data-bs-target="#occurance"
                          />
                        </div>
                      </td>
                      <td>
                        {" "}
                        <input
                          // onChange={(e) => setEffectiveDate(e.target.value)}
                          type="date"
                          id="service"
                          name="service"
                          className="form-control form-control-sm"
                          onChange={(e) => setOccurrenceDate(e.target.value)}
                          value={OccurrenceDate}
                        />{" "}
                      </td>
                      <td>
                        <div className="input-group">
                          <input
                            className={`form-control form-control-sm`}
                            type="text"
                            placeholder=""
                            aria-label="hcpcs"
                            id="desc"
                            name="desc"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={10}
                            minLength={10}
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* ************************ Occurrence  Modal ************************ */}
                <div
                  className="modal fade"
                  id="occurance"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex={-1}
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-md">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1
                          className="modal-title fs-5"
                          id="staticBackdropLabel"
                        >
                          All Icd/Procedure Codes
                        </h1>
                      </div>
                      <div
                        className="modal-body"
                        style={{
                          overflowY: "scroll",
                          height: "calc(40vh - 57px)",
                        }}
                      >
                        <div className="col-md-12 mb-2">
                          <div className="input-group">
                            <input
                              className="form-control form-control-sm placeTextTax"
                              type="text"
                              placeholder="Search for providers "
                              aria-label="npi"
                              id="renderProvsearch"
                              name="renderProvsearch"
                              autoComplete="off"
                              autoCapitalize="off"
                              autoCorrect="off"
                              spellCheck="false"
                            />
                          </div>
                        </div>
                        <table className="table table-light table-hover table-striped table table-bordered">
                          <thead>
                            <tr>
                              <th>Code</th>
                              <th>Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {occurrenceApi === 0
                              ? "Please Wait..."
                              : occurrenceApi?.map((provi, i) => (
                                  <tr
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() =>
                                      getOccurrenceCodeDesc(
                                        provi?.code,
                                        provi?.id,
                                        provi?.description
                                      )
                                    }
                                  >
                                    <td>{provi?.code}</td>
                                    <td>{provi?.description}</td>
                                  </tr>
                                ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                        >
                          Search
                        </button>
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
              </div>
              {/* ************************   value   ************************ */}
              <div className="table-responsive mt-2">
                <label className="fw-bold" htmlFor="">
                  Value
                </label>
                <table
                  className="table table-light table-hover table-striped table table-bordered"
                  // style={{
                  //   overflowY: "scroll",
                  //   height: "calc(100vh - 127px",
                  // }}
                >
                  <thead>
                    <tr>
                      <th scope="col">Code</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>

                  <tbody>
                    {valueRow?.map((provi, i) => {
                      return (
                        <tr>
                          <td>
                            <div className="input-group">
                              {" "}
                              <button
                                type="button"
                                className="input-group-text bg-light btn-sm btn-hov"
                                id="NPIbtn"
                              >
                                <i
                                  className="fas fa-search"
                                  aria-hidden="true"
                                ></i>
                              </button>
                              <input
                                className="form-control form-control-sm"
                                type="text"
                                placeholder=""
                                aria-label="hcpcs"
                                id="hcpcs"
                                name="hcpcs"
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                maxLength={10}
                                minLength={10}
                                value={provi.code}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="input-group">
                              <input
                                className={`form-control form-control-sm`}
                                type="text"
                                placeholder=""
                                aria-label="hcpcs"
                                id="desc"
                                name="desc"
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                maxLength={10}
                                minLength={10}
                                value={provi.amount}
                                // onChange={(e) => setValueamount(e.target.value)}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="input-group">
                              <input
                                className={`form-control form-control-sm`}
                                type="text"
                                placeholder=""
                                aria-label="hcpcs"
                                id="desc"
                                name="desc"
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                maxLength={10}
                                minLength={10}
                                value={provi.description}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    <td>
                      <div className="input-group">
                        {" "}
                        <button
                          type="button"
                          className="input-group-text bg-light btn-sm btn-hov"
                          id="NPIbtn"
                          data-bs-toggle="modal"
                          data-bs-target="#claimvalue"
                        >
                          <i className="fas fa-search" aria-hidden="true"></i>
                        </button>
                        <input
                          className="form-control form-control-sm"
                          type=""
                          placeholder=""
                          aria-label="occurrence"
                          id="occurrence"
                          name="occurrence"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={10}
                          minLength={10}
                          data-bs-toggle="modal"
                          data-bs-target="#claimvalue"
                        />
                      </div>
                    </td>
                    <td>
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="number"
                          placeholder="0.0"
                          aria-label="amount"
                          id="amount"
                          name="amount"
                          onchange={(e) => setoccurrenceAmount(e.target.value)}
                          // value={occurrenceAmount}
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={10}
                          minLength={1}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="text"
                          placeholder=""
                          aria-label="hcpcs"
                          id="desc"
                          name="desc"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={10}
                          minLength={10}
                        />
                      </div>
                    </td>
                  </tbody>
                </table>
                {/* ************************ Value  Modal ************************ */}
                <div
                  className="modal fade"
                  id="claimvalue"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex={-1}
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-md">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1
                          className="modal-title fs-5"
                          id="staticBackdropLabel"
                        >
                          All Icd/Procedure Codes
                        </h1>
                      </div>
                      <div
                        className="modal-body"
                        style={{
                          overflowY: "scroll",
                          height: "calc(40vh - 57px)",
                        }}
                      >
                        <div className="col-md-12 mb-2">
                          <div className="input-group">
                            <input
                              className="form-control form-control-sm placeTextTax"
                              type="text"
                              placeholder="Search for providers "
                              aria-label="npi"
                              id="renderProvsearch"
                              name="renderProvsearch"
                              autoComplete="off"
                              autoCapitalize="off"
                              autoCorrect="off"
                              spellCheck="false"
                            />
                          </div>
                        </div>
                        <table className="table table-light table-hover table-striped table table-bordered">
                          <thead>
                            <tr>
                              <th>Code</th>
                              <th>Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ValueApi === 0
                              ? "Please Wait..."
                              : ValueApi?.map((provi, i) => (
                                  <tr
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() =>
                                      getValueCodeDesc(
                                        provi?.code,
                                        provi?.id,
                                        provi?.description
                                      )
                                    }
                                  >
                                    <td>{provi?.code}</td>
                                    <td>{provi?.description}</td>
                                  </tr>
                                ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                        >
                          Search
                        </button>
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
              </div>
              {/* ************************   Condition   ************************ */}

              <div className="table-responsive mt-2">
                <label className="fw-bold" htmlFor="">
                  Condition
                </label>
                <table
                  className="table table-light table-hover table-striped table table-bordered"
                  // style={{
                  //   overflowY: "scroll",
                  //   height: "calc(100vh - 127px",
                  // }}
                >
                  <thead>
                    <tr>
                      <th scope="col">Code</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>

                  <tbody>
                    {conditionRow.map((provi) => {
                      return (
                        <tr>
                          <td>
                            <div className="input-group">
                              <button
                                type="button"
                                className="input-group-text bg-light btn-sm btn-hov"
                                id="NPIbtn"
                              >
                                <i
                                  className="fas fa-search"
                                  aria-hidden="true"
                                ></i>
                              </button>
                              <input
                                className="form-control form-control-sm"
                                type="text"
                                placeholder=""
                                aria-label="hcpcs"
                                id="hcpcs"
                                name="hcpcs"
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                maxLength={10}
                                minLength={10}
                                value={provi.code}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="input-group">
                              <input
                                className={`form-control form-control-sm`}
                                type="text"
                                placeholder=""
                                aria-label="hcpcs"
                                id="desc"
                                name="desc"
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                maxLength={10}
                                minLength={10}
                                value={provi.description}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    <td>
                      <div className="input-group">
                        {" "}
                        <button
                          type="button"
                          className="input-group-text bg-light btn-sm btn-hov"
                          id="NPIbtn"
                          data-bs-target="#condition"
                          data-bs-toggle="modal"
                        >
                          <i className="fas fa-search" aria-hidden="true"></i>
                        </button>
                        <input
                          className="form-control form-control-sm"
                          type="text"
                          placeholder=""
                          aria-label="hcpcs"
                          id="hcpcs"
                          name="hcpcs"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={10}
                          minLength={10}
                          data-bs-target="#condition"
                          data-bs-toggle="modal"
                        />
                      </div>
                    </td>
                    <td>
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="text"
                          placeholder=""
                          aria-label="hcpcs"
                          id="desc"
                          name="desc"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={10}
                          minLength={10}
                        />
                      </div>
                    </td>
                  </tbody>
                </table>
              </div>
              {/* ************************ Condtition  Modal ************************ */}
              <div
                className="modal fade"
                id="condition"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-md">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">
                        All Icd/Procedure Codes
                      </h1>
                    </div>
                    <div
                      className="modal-body"
                      style={{
                        overflowY: "scroll",
                        height: "calc(40vh - 57px)",
                      }}
                    >
                      <div className="col-md-12 mb-2">
                        <div className="input-group">
                          <input
                            className="form-control form-control-sm placeTextTax"
                            type="text"
                            placeholder="Search for providers "
                            aria-label="npi"
                            id="renderProvsearch"
                            name="renderProvsearch"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                          />
                        </div>
                      </div>
                      <table className="table table-light table-hover table-striped table table-bordered">
                        <thead>
                          <tr>
                            <th>Code</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ConditionApi === 0
                            ? "Please Wait..."
                            : ConditionApi?.map((provi, i) => (
                                <tr
                                  key={i}
                                  data-bs-dismiss="modal"
                                  onClick={() =>
                                    getConditionCodeDesc(
                                      provi?.code,
                                      provi?.id,

                                      provi?.description
                                    )
                                  }
                                >
                                  <td>{provi?.code}</td>
                                  <td>{provi?.description}</td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                      >
                        Search
                      </button>
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
            </div>
          </div>
        </form>
      </div>

      <div className="col-md-4">Notes Here</div>
    </div>
  );
};
export default InstitutionalClaim;
