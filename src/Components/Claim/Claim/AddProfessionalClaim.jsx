import { useFormik } from "formik";
import React from "react";
import { lazy, useEffect, useState } from "react";
import { InputDecimal } from "react-input-decimal";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import API from "../../../Api/ClientApi";
import Swal from "../../../GLOBAL/SwalAlert";
import {
  setTogglePrimaryDetails,
  setToggleSecondaryDetails,
  setToggleTernaryDetails,
} from "../../../Redux/features/Claim/ClaimAddNewSlice";
const AddProfessionalClaim = () => {
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
  /////////////Hide and show Primary & secondary Insurance
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

  const navigate = useNavigate();
  // data from API(table->db)
  const [diagnosisCode, setDiagnosisCode] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [claimRenderingProviderData, setClaimRenderingProviderData] = useState(
    []
  );
  const [orderingRefPcSalesRepData, setOrderingRefPcSalesRepData] = useState(
    []
  );
  const [procedureData, setprocedureData] = useState([]);
  const [facilityData, setFacilityData] = useState([]);
  const [payerData, setpayerData] = useState([]);
  const [modifiers, setModifiers] = useState([]);
  const [getPos, setGetPos] = useState([]);
  const [getTos, setGetTos] = useState([]);
  const [getInventory, setgetInventory] = useState([]);

  // claim form hooks
  // |-----------------------------------------------------|
  const [claimReference, setClaimReference] = useState("");
  const [claimFrequency, setClaimFrequency] = useState("1-Original Claim");
  const [claimPatientId, setClaimPatientID] = useState("");
  const [claimPatientName, setClaimPatientName] = useState("");
  const [claimPatientNameID, setClaimPatientNameID] = useState("");

  const [claimRenderProv, setClaimRenderProv] = useState("");
  const [claimRenderProvId, setclaimRenderProvId] = useState("");
  const [claimBillingProv, setClaimBillingProv] = useState("");
  const [claimBillingProvId, setClaimBillingProvId] = useState("");
  const [claimSuperVisProvCode, setclaimSuperVisProvCode] = useState("");
  const [claimSuperVisProvId, setclaimSuperVisProvId] = useState("");
  const [claimOrderingProvCode, setclaimOrderingProvCode] = useState("");
  const [claimOrderingProvId, setClaimOrderingProvId] = useState("");
  const [claimRefferingProvCode, setclaimRefferingProvCode] = useState("");
  const [claimRefferingProvId, setclaimRefferingProvId] = useState("");
  const [claimRefPcp, setclaimRefPcp] = useState("Ref");
  const [claimSalesRepProvCode, setclaimSalesRepProvCode] = useState("");
  const [claimSalesRepProvId, setclaimSalesRepProvId] = useState("");
  const [claimFacilityName, setClaimFacilityName] = useState("");
  const [claimFacilityId, setClaimFacilityId] = useState("");
  const [claimOfficeLocation, setclaimOfficeLocation] = useState("TX");
  const [claimPrimaryInsName, setclaimPrimaryInsName] = useState("");
  const [claimPrimaryInsId, setclaimPrimaryInsId] = useState("");
  /// |--------------primary insurance policy details-----------------|
  const [primInsmemberId, setPrimInsmemberId] = useState("");
  const [primInsPolicyType, setPrimInsPolicyType] = useState("Other");
  const [primInsCopayDue, setPrimInsCopayDue] = useState("");
  const [primInsGrpNumb, setPrimInsGrpNumb] = useState("");
  const [primInsOriginClaim, setPrimInsOriginClaim] = useState("");
  const [primInsauth, setprimInsAuth] = useState("");
  const [primInsRefferel, setprimInsRefferel] = useState("");

  const [procIdd, setProcIdd] = useState({ id: 3, code: 1232 });

  /// |--------------Secondary insurance policy details-----------------|
  const [claimSecondaryInsName, setclaimSecondaryInsName] = useState("");
  const [claimSecondaryInsId, setsecInsuclaimSecondaryInsId] = useState("");
  const [secInsmemberId, setsecInsmemberId] = useState("");
  const [secInsPolicyType, setSecInsPolicyType] = useState("Other");
  const [secInsCopayDue, setSecInsCopayDue] = useState("");
  const [secInsGrpNumb, setSecInsGrpNumb] = useState("");
  const [secInsOriginClaim, setSecInsOriginClaim] = useState("");
  const [secInsauth, setSecInsAuth] = useState("");
  const [secInsRefferel, setSecInsRefferel] = useState("");

  /// |--------------Ternary insurance policy details-----------------|
  const [claimTernaryInsName, setclaimTernaryInsName] = useState("");
  const [claimTernaryInsId, setclaimTernaryInsID] = useState("");

  const [terInsmemberId, secTerInsmemberId] = useState("");
  const [terInsPolicyType, secTerInsPolicyType] = useState("Other");
  const [terInsCopayDue, secTerInsCopayDue] = useState("");
  const [terInsGrpNumb, secTerInsGrpNumb] = useState("");
  const [terInsOriginClaim, secTerInsOriginClaim] = useState("");
  const [terInsauth, secTerInsAuth] = useState("");
  const [terInsRefferel, secTerInsRefferel] = useState("");
  const [terInsucopaydue, setterInsucopaydue] = useState("");

  // claim form functions
  // get patient detail from table
  const getPatientIdName = (name, id, primInsuranceId) => {
    setClaimPatientID(id);
    setClaimPatientName(name);
    setclaimPrimaryInsId(primInsuranceId);
  };
  // get provider detail from table
  const getProviderIdName = (name, id) => {
    setClaimRenderProv(name);
    setclaimRenderProvId(id);
  };
  const getBillingProviderIdName = (name, id) => {
    setClaimBillingProv(name);
    setClaimBillingProvId(id);
  };
  const getSuperVisingProviderIdName = (name, id) => {
    setclaimSuperVisProvCode(name);
    setclaimSuperVisProvId(id);
  };
  const getOrderingProviderIdName = (name, id) => {
    setclaimOrderingProvCode(name);
    setClaimOrderingProvId(id);
  };
  const getReferingProviderIdName = (name, id) => {
    setclaimRefferingProvCode(name);
    setclaimRefferingProvId(id);
  };
  const getClaimSalesRepNameId = (name, id) => {
    setclaimSalesRepProvCode(name);
    setclaimSalesRepProvId(id);
  };
  // get facility detail from table
  const getFacilityIdName = (name, id) => {
    setClaimFacilityName(name);
    setClaimFacilityId(id);
  };
  // get payer detail from table
  const getPayerIdName = (name, id, memberId) => {
    setclaimPrimaryInsName(name);
    setclaimPrimaryInsId(id);
  };
  // get payer detail from table
  const getSecondaryInsIdName = (name, id) => {
    setclaimSecondaryInsName(name);
    setsecInsuclaimSecondaryInsId(id);
  };
  // get payer detail from table
  const getTernaryInsIdName = (name, id) => {
    setclaimTernaryInsName(name);
    setclaimTernaryInsID(id);
  };
  /* -------------------------------------------------------------- charges form hooks----------- */
  const [icdACode, setIcdACode] = useState("");
  const [icdACOdeId, seticdACOdeId] = useState("");
  const [icdBCode, setIcdBCode] = useState("");
  const [icdBCodeId, setIcdBCodeId] = useState("");
  const [icdCCode, setIcdCode] = useState("");
  const [icdCCodeId, setIcdCodeId] = useState("");
  const [icdDCode, setIcdDCode] = useState("");
  const [icdDCodeId, setIcdDCodeId] = useState("");
  const [icdECode, setIcdECode] = useState("");
  const [icdECodeId, setIcdECodeId] = useState("");
  const [icdFCode, setIcdFCode] = useState("");
  const [icdFCodeId, setIcdFCodeId] = useState("");
  const [icdGCode, setIcdGCode] = useState("");
  const [icdGCodeId, setIcdGCodeID] = useState("");
  const [icdHCode, setIcdHCode] = useState("");
  const [icdHCodeId, setIcdHCodeId] = useState("");
  const [icdICode, setIcdICode] = useState("");
  const [icdICodeId, setIcdICodeId] = useState("");
  const [icdJCode, setIcdJCode] = useState("");
  const [icdJCodeId, setIcdJCodeId] = useState("");
  const [icdKCode, setIcdKCode] = useState("");
  const [icdKCodeId, setIcdKCodeId] = useState("");
  const [icdLCode, setIcdLCode] = useState("");
  const [icdLCodeId, setIcdLCodeId] = useState("");
  const [updatePatientIcd, setUpdatePatientIcd] = useState(0);
  const [setallChanges, setSetallChanges] = useState("No change");
  const [chargesTableToDate, setchargesTableToDate] = useState(defaultValue);
  const [chargesTableFromDate, setchargesTableFromDate] =
    useState(defaultValue);
  const [claimChargesTableProcedureCode, setclaimChargesTableProcedureCode] =
    useState("");
  const [
    claimChargesTableProcedureCodeId,
    setclaimChargesTableProcedureCodeId,
  ] = useState("");
  const [getmodifier1Id, setGetmodifier1Id] = useState("");
  const [getmodifier1Code, setGetmodifier1Code] = useState("");
  const [getmodifier2Id, setGetmodifier2Id] = useState("");
  const [getmodifier2Code, setGetmodifier2Code] = useState("");
  const [getmodifier3Id, setGetmodifier3Id] = useState("");
  const [getmodifier3Code, setGetmodifier3Code] = useState("");
  const [getmodifier4Id, setGetmodifier4Id] = useState("");
  const [getmodifier4Code, setGetmodifier4Code] = useState("");
  const [units, setUnits] = useState(1.0);
  const [amount, setAmount] = useState(0.0);
  const [posId, setPosId] = useState("");
  const [posIdCOdeId, setPosIdCOdeId] = useState("");
  const [tosId, setTosId] = useState("");
  const [tosIdCOdeId, setTosIdCOdeId] = useState("");
  const [unitPrice, setUnitPrice] = useState(0.0);
  const [chargetableDeleteSt, setChargetableDeleteSt] = useState(0);
  const [chargeTableStatus, setChargeTableStatus] = useState(
    "Balance Due Patient"
  );
  const [getInventoryCodeId, setgetInventoryCodeId] = useState("");
  const [getInventoryCode, setgetInventoryCode] = useState("");
  /* Other Form Hooks */
  const [cliamchargeotherFamily, setcliamchargeotherFamily] = useState(0);
  const [cliamchargeotherEPSD, setcliamchargeotherEPSD] = useState("");
  const [cliamchargeotherEmerg, setcliamchargeotherEmerg] = useState(0);
  const [cliamchargeotherCOB, setcliamchargeotherCOB] = useState("");
  const [cliamchargeotherhopice, setcliamchargeotherhopice] = useState(0);
  /* Drug Information */
  const [cliamchargeotherdrugUnit, setcliamchargeotherdrugUnit] = useState("");
  const [cliamchargeotherdrugcode, setcliamchargeotherdrugcode] = useState("");
  const [chargeotheruniteSelect, setchargeotheruniteSelect] = useState("");
  const [cliamchargeotherdrugDays, setcliamchargeotherdrugDays] = useState("");
  const [chargeotherDrugFormate, setchargeotherDrugFormate] = useState("");
  const [chargeotherDrugPrice, setchargeotherDrugPrice] = useState("");
  const [chargeotherDrugUnit, setchargeotherDrugUnit] = useState("");
  const [chargeotherPres, setchargeotherPres] = useState("");
  const [chargeotherPreDate, setchargeotherPreDate] = useState(defaultValue);
  const [chargeotherPresDateInput, setchargeotherPresDateInput] = useState("");
  const [chargeotherDesc, setchargeotherDesc] = useState("");
  const [chargeotherHemoblobin, setchargeotherHemoblobin] = useState("");
  const [chargeotherHematocrit, setchargeotherHematocrit] = useState("");
  const [chargeotherEpostin, setchargeotherEpostin] = useState("");
  const [chargeotherCreat, setchargeotherCreat] = useState("");
  const [chargeotherAnesthesia, setchargeotherAnesthesia] = useState("");
  const [chargeotherAneststartTime, setchargeotherAneststartTime] =
    useState(currentTime);
  const [chargeotherAnestEndTime, setchargeotherAnestEndTime] =
    useState(currentTime);
  const [chargeotherNarrative, setchargeotherNarrative] = useState("");
  const [chargeotherCLIA, setchargeotherCLIA] = useState("");
  const [chargeotherpatientICD, setchargeotherpatientICD] = useState(0);
  const [chargeotherpatientICDTF, setchargeotherpatientICDTF] = useState();

  // |------------------------Get code and id for ICD's-----------------------------|

  console.log("rfrfsd", cliamchargeotherhopice);
  const getHandleCheckbox = () => {
    setchargeotherpatientICD(!chargeotherpatientICD);
    setchargeotherpatientICDTF(chargeotherpatientICD === true ? 1 : 0);
  };
  const togglechargetableDeleteSt = () => {
    chargetableDeleteSt === 0
      ? setChargetableDeleteSt(1)
      : setChargetableDeleteSt(0);
  };
  // toggle state
  const toggleUpdatePatientIcd = () => {
    updatePatientIcd === 0 ? setUpdatePatientIcd(1) : setUpdatePatientIcd(0);
  };
  const getIcdACodeId = (id, code) => {
    setIcdACode(code);
    seticdACOdeId(id);
  };
  const getIcdBCodeId = (id, code) => {
    setIcdBCodeId(id);
    setIcdBCode(code);
  };
  const getIcdCCodeId = (id, code) => {
    setIcdCodeId(id);
    setIcdCode(code);
  };
  const getIcdDCodeId = (id, code) => {
    setIcdDCodeId(id);
    setIcdDCode(code);
  };
  const getIcdECodeId = (id, code) => {
    setIcdECodeId(id);
    setIcdECode(code);
  };
  const getIcdFCodeId = (id, code) => {
    setIcdFCodeId(id);
    setIcdFCode(code);
  };
  const getIcdGCodeId = (id, code) => {
    setIcdGCodeID(id);
    setIcdGCode(code);
  };
  const getIcdHCodeId = (id, code) => {
    setIcdHCodeId(id);
    setIcdHCode(code);
  };
  const getIcdICodeId = (id, code) => {
    setIcdICodeId(id);
    setIcdICode(code);
  };
  const getIcdJCodeId = (id, code) => {
    setIcdJCodeId(id);
    setIcdJCode(code);
  };
  const getIcdKCodeId = (id, code) => {
    setIcdKCodeId(id);
    setIcdKCode(code);
  };
  const getIcdLCodeId = (id, code) => {
    setIcdLCodeId(id);
    setIcdLCode(code);
  };
  const getPosCodeId = (id, code) => {
    setPosIdCOdeId(id);
    setPosId(code);
  };
  const getTosCodeId = (id, code) => {
    setTosIdCOdeId(id);
    setTosId(code);
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
  const getIneventoryCodeId = (id, code) => {
    setgetInventoryCodeId(code);
    setgetInventoryCode(id);
  };
  // -------------------------------------------------------------------------------------------------------------------------
  const [addTableRow, setAddTableRow] = useState([]);
  // ?????????????????????   remainig....
  const getProcedureCodeId = (id, code, price) => {
    setclaimChargesTableProcedureCode(code);
    setclaimChargesTableProcedureCodeId(id);
    setUnitPrice(price);
    // const arrayNew = [id,id]
    addTableRow.push({
      procedureCode: code,
      procedureCodeId: id,
      diagnosisCodeA: icdACode,
      diagnosisCodeIdA: icdACOdeId ? icdACOdeId : "",
      diagnosisCodeB: icdBCode,
      diagnosisCodeIdB: icdBCodeId ? icdBCodeId : "",
      diagnosisCodeC: icdCCode,
      diagnosisCodeIdC: icdCCodeId ? icdCCodeId : "",
      diagnosisCodeD: icdDCode,
      diagnosisCodeIdD: icdDCodeId ? icdDCodeId : "",
      diagnosisCodeE: icdECode,
      diagnosisCodeIdE: icdECodeId ? icdECodeId : "",
      diagnosisCodeF: icdFCode,
      diagnosisCodeIdF: icdFCodeId ? icdFCodeId : "",
      diagnosisCodeG: icdGCode,
      diagnosisCodeIdG: icdGCodeId ? icdGCodeId : "",
      diagnosisCodeH: icdHCode,
      diagnosisCodeIdH: icdHCodeId ? icdHCodeId : "",
      diagnosisCodeI: icdICode,
      diagnosisCodeIdI: icdICodeId ? icdICodeId : "",
      diagnosisCodeJ: icdJCode,
      diagnosisCodeIdJ: icdJCodeId ? icdJCodeId : "",
      diagnosisCodeK: icdKCode,
      diagnosisCodeIdK: icdKCodeId ? icdKCodeId : "",
      diagnosisCodeL: icdLCode,
      diagnosisCodeIdL: icdLCodeId ? icdLCodeId : "",
      // |-------------------ICD's Key Vlaues end----------------------|
      dateTo: chargesTableToDate,
      dateFrom: chargesTableFromDate,
      units: Number.parseFloat(units),
      chageOption: setallChanges,

      posId: posIdCOdeId ? Number(posIdCOdeId) : "",
      tosId: tosIdCOdeId ? tosIdCOdeId : "",
      // |-------------------Modifier Key Vlaues ----------------------|
      modifier1Id: getmodifier1Id ? Number(getmodifier1Id) : "",
      modifier1Code: getmodifier1Code ? getmodifier1Code : "",
      modifier2Id: getmodifier2Id ? Number(getmodifier2Id) : "",
      modifier2Code: getmodifier2Code ? getmodifier2Code : "",
      modifier3Id: getmodifier3Id ? Number(getmodifier3Id) : "",
      modifier3Code: getmodifier3Code ? getmodifier3Code : "",
      modifier4Id: getmodifier4Id ? Number(getmodifier4Id) : "",
      modifier4Code: getmodifier4Code ? getmodifier4Code : "",
      unitPrice: Number.parseFloat(price),
      inventoryCodeId: getInventoryCodeId  ,
      inventoryCode: getInventoryCode  ,
    });
  };
  // const handleChargesOtherInfo = () => {
  //   addTableRow.push({
  //     // fakhar i have added that
  //     familyPlanning: Number(cliamchargeotherFamily),
  //     epsjdCode: cliamchargeotherEPSD,
  //     emergency: Number(cliamchargeotherEmerg),
  //     cob: cliamchargeotherCOB,
  //     providerEmployedHospice: Number(cliamchargeotherhopice),
  //     drugUnits: Number(cliamchargeotherdrugUnit),
  //     drugCode: Number(cliamchargeotherdrugcode),
  //     unitType: chargeotheruniteSelect,
  //     drugDays: Number(cliamchargeotherdrugDays),
  //     drugCodeFormat: chargeotherDrugFormate,
  //     drugPrice: chargeotherDrugPrice
  //       ? Number.parseFloat(chargeotherDrugPrice)
  //       : "",
  //     // drugUnits: chargeotherDrugUnit,
  //     prescriptionNo: chargeotherPres,
  //     prescriptionDate: chargeotherPreDate,
  //     prescriptionMonths: Number(chargeotherPresDateInput),
  //     claimChargesOtherInfodescription: chargeotherDesc,
  //     hemogloBin: chargeotherHemoblobin
  //       ? Number.parseFloat(chargeotherHemoblobin)
  //       : "",
  //     hematoCrit: chargeotherHematocrit
  //       ? Number.parseFloat(chargeotherHematocrit)
  //       : "",
  //     epoetin: Number(chargeotherEpostin),
  //     creatin: chargeotherCreat ? chargeotherCreat : "",
  //     anesthesiaMinutes: Number(chargeotherAnesthesia),
  //     startTime: chargeotherAneststartTime,
  //     endTime: chargeotherAnestEndTime,
  //     narrativeNotes: chargeotherNarrative,
  //     clia: chargeotherCLIA ? chargeotherCLIA : "",
  //     // "": chargeotherpatientICDTF,
  //   });
  // };
  /* ------------------------------------------------------------------- additional form hooks------*/
  const [employmentCondition, setEmploymentCondition] = useState(0);
  const [autoAccidentCondition, setAutoAccidentCondition] = useState(0);
  const [otherAccidentCondition, setOtherAccidentCondition] = useState(0);

  const handleEmergency = (event) => {
    setcliamchargeotherEmerg(event.target.value);
  };

  const hanldeClaimChargeOtherFamily = (event) => {
    setcliamchargeotherFamily(event.target.value);
    console.log(cliamchargeotherFamily);
  };
  const employmentConditionHandler = (event) => {
    setEmploymentCondition(event.target.value);
  };
  const autoAccidentConditionHandler = (event) => {
    setAutoAccidentCondition(event.target.value);
  };
  const otherAccidentConditionHandler = (event) => {
    setOtherAccidentCondition(event.target.value);
  };
  const [accidentIllnessDate, setAccidentIllnessDate] = useState(defaultValue);
  const [lastMentrualDate, setlastMentrualDate] = useState(defaultValue);
  const [initialTreatmentDate, setInitialTreatmentDate] =
    useState(defaultValue);
  const [dateLastSeen, setdateLastSeen] = useState(defaultValue);
  const [unbleToWorkFromDate, setUnbleToWorkFromDate] = useState(defaultValue);
  const [unbleToWorkToDate, setunbleToWorkToDate] = useState(defaultValue);
  const [patientIsHomeBound, setPatientIsHomeBound] = useState(0);
  const patientIsHomeBoundHandler = (event) => {
    setPatientIsHomeBound(event.target.value);
  };
  /* ------------------------------------------------------------------- cliam Info------*/
  const [claimCodes, setclaimCodes] = useState("");
  const [otherclaimCodes, setOtherClaimCodes] = useState("");
  const [additionalClaimInfo, setAdditionalClaimInfo] = useState("");
  const [cliamNotes, setCliamNotes] = useState("");
  const [resubmitReasoncodes, setResubmitReasoncodes] = useState("");
  const [delayReasonCode, setDelayReasonCode] = useState("None");
  const [haspitalFromDate, sethaspitalFromDate] = useState(defaultValue);
  const [haspitalToDate, sethaspitalToDate] = useState(defaultValue);
  const [labCharges, setLabCharges] = useState(0.0);
  const [specialProgramCode, setspecialProgramCode] = useState("");
  //Assigment of Benefit Hooks
  const [patientSignatureFile, setpatientSignatureFile] = useState(0);

  const [InsuredSignatureFile, setInsuredSignatureFile] = useState(0);
  const [providerAcceptAss, setproviderAcceptAss] = useState(0);
  /////////////Other reference info
  const [documentationMethod, setDocumentationMethod] =
    useState("No Documentation");
  const [documentationType, setDocumentationType] = useState(" ");
  const [patientWieghtIn, setPatientWieghtIn] = useState("0");
  const [patientWieghtIbs, setPatientWieghtIbs] = useState("0");
  const [serviceAuthorizationEx, setServiceAuthorizationEx] = useState(" ");
  const [demonstrationProject, setDemonstrationProject] = useState("");
  const [memmographyCertication, setMemmographyCertication] = useState("");
  const [investigationDeviceExe, setInvestigationDeviceExe] = useState("");
  const [ambulatoryPatientGroup, setAmbulatoryPatientGroup] = useState("");

  /* ------------------------------------------------------------------- aditional form functions------*/

  const [transportReason, settransportReason] = useState(
    "Transport to the nearest facility"
  );
  const [transportMiles, settransportMiles] = useState("");
  const [patientWeight, setpatientWeight] = useState("");
  const [roundTripReason, setRoundTripReason] = useState("");
  const [strecherReason, setstrecherReason] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [pickupCity, setPickupCity] = useState("");
  const [pickupState, setPickupState] = useState("");
  const [pickupZipCode, setPickupZipCode] = useState("");
  const [dropOffAdressName, setdropOffAdressName] = useState("");
  const [dropOffAddress, setDropOffAddress] = useState("");
  const [dropOffCity, setDropOffCity] = useState("");
  const [dropOffState, setDropOffState] = useState("");
  const [dropOffZipCode, setDropOffZipCode] = useState("");

  // ========================================================
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

    // icd codes
    const fetchData = async () => {
      const response = await API.get("customersetup/code/diagnosis");
      const newData = response.data.data;
      setDiagnosisCode(newData);
    };
    // patient data
    const fetchPatient = async () => {
      const response = await API.get("claim/patient");
      const newData = response.data.data;
      setPatientData(newData);
    };
    //  Providers data
    const fetchProvider = async () => {
      const response = await API.get("customersetup/provider");
      const newData = response.data.data;
      setClaimRenderingProviderData(newData);
    };
    // Ordering, Ref PCP SalesRep Providers data
    const fetchOrderingRefPcSalesRepData = async () => {
      const response = await API.get("customersetup/referringprovider");
      const newData = response.data.data;
      setOrderingRefPcSalesRepData(newData);
    };

    // facility data
    const fetchFacility = async () => {
      const response = await API.get("customersetup/facility");
      const newData = response.data.data;
      setFacilityData(newData);
    };
    // all payer data
    const fetchPayer = async () => {
      const response = await API.get("customersetup/payer");
      const newData = await response.data.data;
      setpayerData(newData);
    };
    // procedure data
    const fetchProcedure = async () => {
      const response = await API.get("customersetup/code/procedure");
      const newData = response.data.data;
      setprocedureData(newData);
    };
    // modifier data
    const fetchModifiers = async () => {
      const response = await API.get("common/function/modifiers");
      const newData = response.data.data;
      setModifiers(newData);
    };
    // fetch POS Codes
    const fetchPOSCode = async () => {
      const response = await API.get("common/function/pos");
      const newData = response.data.data;
      setGetPos(newData);
    };
    // fetch TOS codes
    const fetchTOSCode = async () => {
      const response = await API.get("common/function/tos");
      const newData = response.data.data;
      setGetTos(newData);
    };
    // inventory codes
    const fetchInventory = async () => {
      const response = await API.get("customersetup/code/inventory");
      const newData = response.data.data;
      setgetInventory(newData);
    };
    if (
      claimRenderProv &&
      claimPatientName &&
      claimBillingProv &&
      claimPrimaryInsName &&
      icdACode &&
      claimChargesTableProcedureCode
    ) {
      claimPatientName;
      claimRenderProv;
      claimBillingProv;
      claimPrimaryInsName;
      icdACode;
      claimChargesTableProcedureCode;
      setFormComplete(false);
    }
    fetchData();
    fetchPatient();
    fetchProvider();
    fetchFacility();
    fetchPayer();
    fetchProcedure();
    fetchModifiers();
    fetchPOSCode();
    fetchTOSCode();
    fetchInventory();
    fetchOrderingRefPcSalesRepData();
  }, [
    claimPatientName,
    claimBillingProv,
    claimRenderProv,
    claimPrimaryInsName,
    icdACode,
    claimChargesTableProcedureCode,
  ]);
  // data from redux & hookso

  const showClearButton = useSelector(
    (state) => state.Claim.displayClearButton
  );
  const [formComplete, setFormComplete] = useState(true);
  const dispatch = useDispatch();

  // submit claim

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
      -API.post("claim/professional/store", {
        // claim form values
        // |-------------------claim Key Vlaues ----------------------|
        //db_key    : state value
        reference: claimReference,
        frequency: claimFrequency,
        patientId: Number(claimPatientId),
        renderingProviderId: Number(claimRenderProvId),
        billingProviderId: Number(claimBillingProvId),
        supervisingProviderId: claimSuperVisProvId
          ? Number(claimSuperVisProvId)
          : "",
        orderingProviderId: claimOrderingProvId
          ? Number(claimOrderingProvId)
          : "",
        referringProviderId: claimRefferingProvId
          ? Number(claimRefferingProvId)
          : "",
        salesRepId: claimSalesRepProvId,
        facilityId: claimFacilityId ? Number(claimFacilityId) : "",
        /* ----------------- Primary Insurance key : values -----------------------------------------------*/
        primaryPayerId: claimPrimaryInsId ? Number(claimPrimaryInsId) : "",
        primaryMemberId: primInsmemberId,
        primaryPolicyType: primInsPolicyType,
        primaryCopay: primInsCopayDue,
        primaryGroupId: primInsGrpNumb,
        // db: primInsOriginClaim,
        // db: primInsauth,
        primaryPriority: primInsRefferel,
        /* ----------------- secondary Insurance key : values ----------------------------------------------*/
        secondaryPayerId: claimSecondaryInsId
          ? Number(claimSecondaryInsId)
          : "",
        claimSecondaryInsName: claimSecondaryInsId,
        secondaryMemberId: secInsmemberId,
        secondaryPolicyType: secInsPolicyType,
        secondaryGroupId: secInsGrpNumb,
        secondaryPriority: secInsRefferel,
        // "": secInsOriginClaim,
        // "": secInsauth,
        /* --------------------------------- Ternary Insurance key : values -----------------*/
        tertiaryPayerId: claimTernaryInsId ? Number(claimTernaryInsId) : "",
        tertiaryMemberId: terInsmemberId,
        tertiaryPolicyType: terInsPolicyType,
        tertiaryCopay: terInsCopayDue,
        tertiaryGroupId: terInsGrpNumb,
        tertiaryPriority: terInsRefferel,
        // "":terInsOriginClaim,
        // "":terInsauth,

        /* --------------------------------------------------------------------------- charges form key : values ---------*/

        // |-----------fakhar instr code varcahr---------------|
        claimCharges: addTableRow,
        // familyPlanning: cliamchargeotherFamily,
        // epsjdCode: cliamchargeotherEPSD,
        // emergency: cliamchargeotherEmerg,
        // cob: cliamchargeotherCOB,
        // providerEmployedHospice: cliamchargeotherhopice,
        // drugUnits: cliamchargeotherdrugUnit,
        // drugCode: cliamchargeotherdrugcode,
        // unitType: chargeotheruniteSelect,
        // drugDays: cliamchargeotherdrugDays,
        // drugCodeFormat: chargeotherDrugFormate,
        // drugPrice: chargeotherDrugPrice,
        // // "": chargeotherDrugUnit,
        // prescriptionNo: chargeotherPres,
        // prescriptionDate: chargeotherPreDate,
        // prescriptionMonths: chargeotherPresDateInput,
        // description: chargeotherDesc,
        // hemogloBin: chargeotherHemoblobin,
        // hematoCrit: chargeotherHematocrit,
        // epoetin: chargeotherEpostin,
        // creatin: chargeotherCreat,
        // anesthesiaMinutes: chargeotherAnesthesia,
        // startTime: chargeotherAneststartTime,
        // endTime: chargeotherAnestEndTime,
        // narrativeNotes: chargeotherNarrative,
        // clia: chargeotherCLIA,
        // "": chargeotherpatientICDTF,
        // |-------------------ICD's Key Vlaues start ----------------------|

        // |-------------------Modifier Key Vlaues ----------------------|

        // addditional info form
        patientRelatedEmp: employmentCondition,
        patientRelatedAutoAccident: autoAccidentCondition,
        patientRelatedOtherAccident: otherAccidentCondition,
        accidentDate: accidentIllnessDate,
        lastMentrualDate: lastMentrualDate,
        initialTreatmentDate: initialTreatmentDate,
        dateLastSeen: dateLastSeen,
        unableWorkFrom: unbleToWorkFromDate,
        unableWorkTo: unbleToWorkToDate,
        patientHomeBound: patientIsHomeBound,
        claimCodes: claimCodes,
        otherClaimId: otherclaimCodes,
        claimInformation: additionalClaimInfo,
        claimNote: cliamNotes,
        resubmitReasonCode: resubmitReasoncodes,
        delayReasonCode: delayReasonCode,
        hospitalizedFrom: haspitalFromDate,
        hospitalizedTo: haspitalToDate,
        labCharges: Number.parseFloat(labCharges),
        specialProgramCode: specialProgramCode,
        patientSignaturesFile: Number(patientSignatureFile),
        payerSignaturesFile: Number(InsuredSignatureFile),
        providerAcceptAssignment: Number(providerAcceptAss),
        documentationMethod: documentationMethod,
        documentationType: documentationType,
        patientHeight: Number(patientWieghtIn),
        patientWeight: Number(patientWieghtIbs),
        serviceAauthorizationException: serviceAuthorizationEx,
        demonstrationProject: demonstrationProject,
        mammographyCertification: memmographyCertication,
        investigationalDeviceExemption: investigationDeviceExe,
        ambulatoryPatientGroup: ambulatoryPatientGroup,
        //------------ |AMBULANCE INFO REMAINING--------------|
      })
        .then(function (response) {
          if (response.data.status === 201) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Profesional Claim Added",
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
          if (error) {
            error;
          }
        });
    },
  });
  // clear text input
  const cleartext = () => {
    // claim_patient.value = "";
  };
  // open patietn form
  const OpenPatientForm = (name) => {
    name ? alert(name) : alert("Please Select Patient");
  };
  console.log("chargeotherpatientICD", chargeotherpatientICD);
  return (
    <div className="row mt-3 d-flex">
      <div
        className="col-md-8"
        style={{ overflowY: "scroll", height: "calc(100vh - 127px)" }}
      >
        {/* *********************   MAIN BUTTONS ******************* */}
        <form onSubmit={handleSubmit} action="post" novalidate>
          <div className="col-md-5 d-flex">
            <div className="col-md-12 d-flex my-2">
              <button
                type="submit"
                // onClick={saveClaim}
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
                disabled
                className="nav-link"
                id="nav-ambulance-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-ambulance##"
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
                    onChange={(e) => setClaimReference(e.target.value)}
                    maxLength={60}
                  />
                </div>
                {formComplete && (
                  <div className="col-md-3 d-flex align-items-center mt-4 ">
                    <p>
                      <span className="fas fa-triangle-exclamation fs-4 text-warning" />{" "}
                      Claim is incomplete
                    </p>
                  </div>
                )}
                <div className="col-md-3">
                  <label htmlFor="claim_frequency">Frequency</label>
                  <select
                    id="claim_frequency"
                    className="form-select form-select-sm"
                    onChange={(e) => setClaimFrequency(e.target.value)}
                    // //onBlur={handleBlur}
                  >
                    <option value="1-Original Claim">1- Original Claim</option>
                    <option value="7-Replacement of Prior Claim">
                      7- Replacement of Prior Claim
                    </option>
                    <option value="8-Void/Cancel Prior Claim">
                      8- Void/Cancel Prior Claim
                    </option>
                  </select>
                </div>
              </div>
              <div className="col-md-12 d-flex mt-2">
                <div className="col-md-10">
                  {/* ************************ PatientModelClaim **************** */}
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
                          {/* ************* <PatientTable *********/}
                          <div className="col-md-12 mt-4">
                            <div className="col-md-6">
                              <div className="input-group">
                                <input
                                  // autoFocus
                                  className="form-control form-control-sm placeTextTax"
                                  type="text"
                                  placeholder="Search by name, DOB, account #, phone #"
                                  aria-label="npi"
                                  id="manageAccsearchpatient"
                                  name="manageAccsearchpatient"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                />
                                <button
                                  type="button"
                                  className="input-group-text btn-hov"
                                  id="searchpatient"
                                >
                                  <i
                                    className="fas fa-search"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                              <div className="col-md-9 d-flex mt-2">
                                <label htmlFor="">Search by:</label>
                                <div className="form-check mx-2">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="searchby"
                                    id="manageAccpatient"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="manageAccpatient"
                                  >
                                    Patient
                                  </label>
                                </div>
                                <div className="form-check mx-2">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="searchby"
                                    id="manageAccinsured"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="manageAccinsured"
                                  >
                                    Insured
                                  </label>
                                </div>
                              </div>
                              <div className="d-flex mt-2">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="manageAccsearch_inactive"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="manageAccsearch_inactive"
                                  >
                                    Search Inactive Patients
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input mx-2"
                                    type="checkbox"
                                    value=""
                                    id="manageAccshow_exact"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="manageAccshow_exact"
                                  >
                                    Show exact matches only
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div
                              className="col-md-12 mt-3"
                              style={{
                                overflowY: "scroll",
                                height: "calc(60vh - 100px)",
                              }}
                            >
                              <div className="col-md-12 mb-2">
                                <div className="card-body">
                                  <table className="table table-light table-hover table-striped table table-bordered">
                                    <thead>
                                      <tr>
                                        <th>Account #</th>
                                        <th>Name</th>
                                        <th>Date of Birth</th>
                                        <th>Insured</th>
                                        <th>Balance due Patient</th>
                                        <th>Account Type</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {patientData == 0
                                        ? "Please Wait..."
                                        : patientData?.map((patnt, i) => (
                                            <tr
                                              key={i}
                                              onClick={() =>
                                                getPatientIdName(
                                                  patnt.first_name +
                                                    " " +
                                                    patnt.last_name,
                                                  patnt.id,
                                                  patnt?.primary_patient_payer
                                                    .primary_payer?.id,
                                                  patnt?.patient_claims_default
                                                    ?.default_provider
                                                    ?.first_name
                                                )
                                              }
                                              data-bs-dismiss="modal"
                                            >
                                              <td>{"54322"}</td>
                                              <td>
                                                {patnt.first_name +
                                                  " " +
                                                  patnt.last_name}
                                              </td>
                                              <td>{patnt.dob}</td>
                                              <td>
                                                {!patnt.insurance
                                                  ? "insurance"
                                                  : "insurance"}
                                              </td>
                                              <td>{"$6767"}</td>
                                              <td>
                                                {!patnt.payements
                                                  ? "payements"
                                                  : "payements"}
                                              </td>
                                            </tr>
                                          ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
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
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ************************ Patient input field **************** */}
                  <div className="input-group">
                    <input
                      data-bs-toggle="modal"
                      data-bs-target="#patient_searchModal"
                      className="form-control form-control-sm placeTextTax"
                      type="text"
                      // required
                      placeholder="Patient"
                      aria-label="patient"
                      id="claim_patient"
                      name="claim_patient"
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      // onChange={handleChange}
                      value={claimPatientName}
                      // ////onBlur={handleBlur}
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
              {/* {touched.claim_patient && errors.claim_patient ? (
                <p className="form-error mx-2">*{errors.claim_patient}</p>
              ) : null}
              {/* ******************************** RenderingProvider input  ********************* */}
              <div className="col-md-12 d-flex mt-2">
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      data-bs-toggle="modal"
                      data-bs-target="#rendering_providerModal"
                      className="form-control form-control-sm placeTextTax"
                      type="text"
                      // required
                      placeholder="Rendering Provider"
                      aria-label="render_prov"
                      id="claim_renderingProvider"
                      name="claim_renderingProvider"
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      // onChange={handleChange}
                      value={claimRenderProv}
                      // ////onBlur={handleBlur}
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
              {/* {touched.claim_renderingProvider && errors.claim_renderingProvider ? (
                <p className="form-error mx-2">*{errors.claim_renderingProvider}</p>
              ) : null} */}
              {/* ******************************** RenderingProviderModel ********************* */}
              <div
                className="modal fade"
                id="rendering_providerModal"
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
                            <th>Prof. Mode</th>
                            <th>Practice</th>
                            <th>Inst. Mode</th>
                          </tr>
                        </thead>
                        <tbody>
                          {claimRenderingProviderData.map((provi, i) => (
                            <tr
                              key={i}
                              data-bs-dismiss="modal"
                              onClick={() =>
                                getProviderIdName(
                                  provi.first_name + " " + provi.last_name,
                                  provi.id
                                )
                              }
                            >
                              <td>{provi.ref}</td>
                              <td>{provi.npi}</td>
                              <td>
                                {provi.first_name + " " + provi.last_name}
                              </td>
                              <td>{"000000"}</td>
                              <td>{provi.taxId}</td>
                              <td>{provi.ProfMode}</td>
                              <td>{provi.practice}</td>
                              <td>{provi.instMode}</td>
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

              <div className="col-md-12 d-flex mt-2">
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      data-bs-toggle="modal"
                      data-bs-target="#billing_providerModal"
                      className="form-control form-control-sm placeTextTax"
                      type="text"
                      // required
                      placeholder="Billing Provider"
                      aria-label="bill_prov"
                      id="claim_billingProvider"
                      name="claim_billingProvider"
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      // onChange={handleChange}
                      value={claimBillingProv}
                      ////onBlur={handleBlur}
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

              {/* {touched.claim_billingProvider && errors.claim_billingProvider ? (
                <p className="form-error mx-2">*{errors.claim_billingProvider}</p>
              ) : null} */}
              {/* ******************************* BillingProviderModel ********************** */}
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
                          {claimRenderingProviderData.map((provi, i) => (
                            <tr
                              key={i}
                              data-bs-dismiss="modal"
                              onClick={() =>
                                getBillingProviderIdName(
                                  provi.first_name + " " + provi.last_name,
                                  provi.id
                                )
                              }
                            >
                              <td>{provi.ref}</td>
                              <td>{provi.npi}</td>
                              <td>
                                {provi.first_name + " " + provi.last_name}
                              </td>
                              <td>{"000000"}</td>
                              <td>{provi.taxId}</td>
                              <td>{provi.ProfMode}</td>
                              <td>{provi.practice}</td>
                              <td>{provi.instMode}</td>
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
                      // onChange={handleChange}
                      value={claimSuperVisProvCode}
                      ////onBlur={handleBlur}
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
              {/* *************************** SuperVisingProviderModel ****************** */}
              <div
                className="modal fade"
                id="suppervis_providerModal"
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
                            //autoFocus
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
                          {claimRenderingProviderData.map((provi, i) => (
                            <tr
                              key={i}
                              data-bs-dismiss="modal"
                              onClick={() =>
                                getSuperVisingProviderIdName(
                                  provi?.first_name + " " + provi?.last_name,
                                  provi?.id
                                )
                              }
                            >
                              <td>{provi.ref}</td>
                              <td>{provi.npi}</td>
                              <td>
                                {provi.first_name + " " + provi.last_name}
                              </td>
                              <td>{"000000"}</td>
                              <td>{provi.taxId}</td>
                              <td>{provi.ProfMode}</td>
                              <td>{provi.practice}</td>
                              <td>{provi.instMode}</td>
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
              {/* *************************** Ordering Provider  ****************** */}
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
                      // onChange={handleChange}
                      value={claimOrderingProvCode}
                      ////onBlur={handleBlur}
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
              {/* ************************* OrderingProviderModel ********************** */}
              <div
                className="modal fade"
                id="ordering_providerModal"
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
                            //autoFocus
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
                          {orderingRefPcSalesRepData.map((provi, i) => (
                            <tr
                              key={i}
                              data-bs-dismiss="modal"
                              onClick={() =>
                                getOrderingProviderIdName(
                                  provi.first_name + " " + provi.last_name,
                                  provi?.id
                                )
                              }
                            >
                              <td>
                                {provi?.last_name + " " + provi?.first_name}
                              </td>
                              <td>{provi?.reference}</td>
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
                      // onChange={handleChange}
                      value={claimRefferingProvCode}
                      ////onBlur={handleBlur}
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
                    onChange={(e) => setclaimRefPcp(e.target.value)}
                    value={claimRefPcp}
                    // ////onBlur={handleBlur}
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
              {/* **************************** RefPCPProviderModel ************************* */}
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
                        All Referring Provider
                      </h1>
                    </div>
                    <div className="modal-body">
                      <div className="col-md-12 mb-2">
                        <div className="input-group">
                          <input
                            //autoFocus
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
                          {orderingRefPcSalesRepData.map((provi, i) => (
                            <tr
                              key={i}
                              data-bs-dismiss="modal"
                              onClick={() =>
                                getReferingProviderIdName(
                                  provi.first_name + " " + provi.last_name,
                                  provi?.id
                                )
                              }
                            >
                              <td>
                                {provi?.last_name + " " + provi?.first_name}
                              </td>
                              <td>{provi?.reference}</td>
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
              <div className="col-md-12 d-flex mt-2">
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      data-bs-toggle="modal"
                      data-bs-target="#sales_providerModal"
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
                      // onChange={handleChange}
                      value={claimSalesRepProvCode}
                      ////onBlur={handleBlur}
                    />

                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#sales_providerModal"
                      title="Select Referring"
                      type="button"
                      className="input-group-text btn-hov"
                      id="claim_sales_repbtn"
                    >
                      <i className="fas fa-search" aria-hidden="true" />
                    </button>
                  </div>
                  {/* {touched.claim_sales_rep && errors.claim_sales_rep ? (
                    <p className="form-error mx-2">*{errors.claim_sales_rep}</p>
                  ) : null} */}
                </div>
                {/* ********************sales rep model********************** */}
                <div
                  className="modal fade"
                  id="sales_providerModal"
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
                          All Referring Provider
                        </h1>
                      </div>
                      <div className="modal-body">
                        <div className="col-md-12 mb-2">
                          <div className="input-group">
                            <input
                              //autoFocus
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
                            {orderingRefPcSalesRepData.map((provi, i) => (
                              <tr
                                key={i}
                                data-bs-dismiss="modal"
                                onClick={() =>
                                  getClaimSalesRepNameId(
                                    provi.first_name + " " + provi.last_name,
                                    provi?.id
                                  )
                                }
                              >
                                <td>
                                  {provi?.last_name + " " + provi?.first_name}
                                </td>
                                <td>{provi?.reference}</td>
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
                <button
                  type="button"
                  title="Open Sale Rep"
                  className="btn btn-outline-primary btn-sm mx-2"
                >
                  <span className="fas fa-hospital-user" />
                </button>
              </div>
              {/* ********************Facility Input ********************** */}
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
                      // onChange={}
                      value={claimFacilityName}
                      ////onBlur={handleBlur}
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
                  {/* {touched.claim_facility && errors.claim_facility ? (
                    <p className="form-error mx-2">*{errors.claim_facility}</p>
                  ) : null} */}
                </div>
                <button
                  type="button"
                  title="Open Facility"
                  className="btn btn-outline-primary btn-sm mx-2"
                >
                  <span className="far fa-hospital" />
                </button>
              </div>
              {/*  ************************** FacilityProviderModel ********************** */}
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
                            //autoFocus
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
                          {facilityData?.map((facility, i) => (
                            <tr
                              key={i}
                              data-bs-dismiss="modal"
                              onClick={() =>
                                getFacilityIdName(
                                  facility.facility_name,
                                  facility.id
                                )
                              }
                            >
                              <td>{facility.facility_name}</td>
                              <td>{facility.address1}</td>
                              <td>{facility.reference_num}</td>
                              <td>{facility.npi_code}</td>
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
              <div className="col-md-10 mt-2">
                <label htmlFor="">Office Location</label>
                <select
                  onChange={(e) => setclaimOfficeLocation(e.target.value)}
                  value={claimOfficeLocation}
                  // ////onBlur={handleBlur}
                  id="claim_location_select"
                  className="form-select form-select-sm"
                >
                  {facilityData?.map((facility, i) => (
                    <option key={i}>{facility.state}</option>
                  ))}
                </select>
              </div>
              {/* ------------------- Primary Insurance ------------------- */}
              <div className="col-md-12 d-flex mt-2">
                <div className="col-md-10">
                  <div className="input-group">
                    <input
                      data-bs-toggle="modal"
                      data-bs-target={
                        claimPatientName && claimPatientId
                          ? "#patient-selected-Modal"
                          : "#primIns_providerModal"
                      }
                      className="form-control form-control-sm placeTextTax"
                      type="text"
                      placeholder="Primary Insurance"
                      // required
                      aria-label="prm_ins"
                      id="claim_primary_ins"
                      name="claim_primary_ins"
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      // onChange={handleChange}
                      value={
                        claimPrimaryInsName
                          ? claimPrimaryInsName + "" + claimPrimaryInsId
                          : claimPatientName
                          ? claimPatientName + " " + claimPrimaryInsId
                          : ""
                      }
                      ////onBlur={handleBlur}
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
                  {/* {touched.claim_primary_ins && errors.claim_primary_ins ? (
                    <p className="form-error mx-2">*{errors.claim_primary_ins}</p>
                  ) : null} */}
                </div>

                <button
                  type="button"
                  title="Open Primary Insurance"
                  className="btn btn-outline-primary btn-sm mx-2"
                >
                  <span className="fas fa-hand-holding-usd" />
                </button>
              </div>
              {/* show hide primary insurance details */}
              {claimPrimaryInsName ||
                (claimPatientName && (
                  <div className="mt-1">
                    <span className="mt-2 " onClick={handleHidingPriInsurance}>
                      <Link to="#!">
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
                              value={primInsmemberId}
                              name="memberid"
                              autoComplete="off"
                              onChange={(e) =>
                                setPrimInsmemberId(e.target.value)
                              }
                              autoCapitalize="off"
                              autoCorrect="off"
                              spellCheck="false"
                              maxLength={20}
                            />
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="">Policy Type</label>

                            <select
                              id="Policy type"
                              onChange={(e) =>
                                setPrimInsPolicyType(e.target.value)
                              }
                              className="form-select form-select-sm"
                              aria-label=".form-select-sm example"
                            >
                              <option selected>Policy type</option>
                              <option value="Balance Due Patient">
                                Balance Due Patient
                              </option>
                              <option value="On Hold">On Hold</option>
                              <option value="Pending Patient">
                                Pending Patient
                              </option>
                            </select>
                          </div>

                          <div className="col-md-3 d-flex flex-column">
                            <label htmlFor="">Copay Due </label>
                            <input
                              className="form-control form-control-sm"
                              type="number"
                              precision={2}
                              value={primInsCopayDue}
                              placeholder="Copay Due"
                              aria-label="copaydue"
                              id="copaydue"
                              name="copaydue"
                              autoComplete="off"
                              autoCapitalize="off"
                              autoCorrect="off"
                              spellCheck="false"
                              onChange={(e) => {
                                // setPrimInsCopayDue(e.target.value);

                                setPrimInsCopayDue(
                                  parseFloat(e.target.value)?.toFixed(2)
                                );
                              }}
                              style={{ textAlign: "right" }}
                            />
                          </div>
                        </div>
                        <div className="d-flex col-md-10 gap-2">
                          <div className="col-md-5 d-flex  flex-column">
                            <label htmlFor="">Group Number</label>

                            <input
                              className={`form-control form-control-sm`}
                              type="text"
                              placeholder="Group Number"
                              aria-label=""
                              id="groupnumber"
                              name="groupnumber"
                              autoComplete="off"
                              autoCapitalize="off"
                              autoCorrect="off"
                              spellCheck="false"
                              maxLength={20}
                              value={primInsGrpNumb}
                              onChange={(e) => {
                                setPrimInsGrpNumb(e.target.value);
                              }}
                            />
                          </div>

                          <div className="col-md-5 d-flex flex-column">
                            <label htmlFor="">Origin Claim#</label>

                            <input
                              className={`form-control form-control-sm`}
                              type="text"
                              placeholder="Origin Claim#"
                              aria-label="originclaim"
                              id="originclaim"
                              name="originclaim"
                              onChange={(e) =>
                                setPrimInsOriginClaim(e.target.value)
                              }
                              autoComplete="off"
                              autoCapitalize="off"
                              autoCorrect="off"
                              spellCheck="false"
                              maxLength={35}
                              minLength={10}
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
                              value={primInsauth}
                              onChange={() => {
                                setprimInsAuth(e.target.value);
                              }}
                            />
                          </div>
                          <div className="col-md-3">
                            <label htmlFor="">Refferel Type</label>

                            <select
                              id="Refferel Type"
                              className="form-select form-select-sm"
                              aria-label="form-select-sm example"
                              value={primInsRefferel}
                              onChange={(e) =>
                                setprimInsRefferel(e.target.value)
                              }
                            >
                              <option selected>Policy type</option>
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
                      </div>
                    )}
                  </div>
                ))}
              {/* *************************** PrimaryInsModdel *********************** */}

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
                            //autoFocus
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
                          {payerData
                            ? payerData?.map((payer, i) => (
                                <tr
                                  key={i}
                                  data-bs-dismiss="modal"
                                  onClick={() =>
                                    getPayerIdName(payer?.payer_name, payer?.id)
                                  }
                                >
                                  <td>{payer?.plan_name}</td>
                                  <td>{payer?.city}</td>
                                  <td>{payer?.payer_name}</td>
                                  <td>{payer?.reference}</td>
                                </tr>
                              ))
                            : "please wait...."}
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
              <div
                className="modal fade"
                id="patient-selected-Modal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      <nav>
                        <div
                          className="nav nav-tabs"
                          id="nav-tab"
                          role="tablist"
                        >
                          <button
                            className="nav-link active"
                            id="nav-home-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-home"
                            type="button"
                            role="tab"
                            aria-controls="nav-home"
                            aria-selected="true"
                          >
                            Patient payers
                          </button>
                          <button
                            className="nav-link"
                            id="nav-profile-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-profile"
                            type="button"
                            role="tab"
                            aria-controls="nav-profile"
                            aria-selected="false"
                          >
                            All Payers
                          </button>
                        </div>
                      </nav>
                    </div>
                    <div className="modal-body">
                      <table className="table table-light table-hover table-striped table table-bordered">
                        <tbody>
                          <div className="tab-content" id="nav-tabContent">
                            <div className="col-md-12 col-sm-12">
                              <h5>Priamary Policies</h5>
                            </div>
                            <div
                              className="tab-pane fade show border active"
                              id="nav-home"
                              role="tabpanel"
                              aria-labelledby="nav-home-tab"
                              tabindex="0"
                            >
                              <div className="col-md-11 d-flex justify-content-between">
                                <div className="d-flex flex-column">
                                  <div>
                                    <th>Florida MEDICARE(#3457432)</th>
                                  </div>
                                  <div>
                                    <span>Insured : ARther Taylor</span>
                                  </div>
                                  <div>
                                    <span>MemberID : @yhndfh5</span>
                                  </div>
                                  <div>
                                    <span>Group ID : </span>
                                  </div>
                                </div>
                                <div className="d-flex flex-column">
                                  <div>
                                    <span>Copay:$00%</span>
                                  </div>
                                  <div>
                                    <span>Co-Insurance:0% </span>
                                  </div>
                                  <div>
                                    <span>Deductinle:$0.00</span>
                                  </div>
                                </div>
                                <div className="d-flex flex-column">
                                  <div>
                                    <h6>Priamaty Default</h6>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-11 d-flex justify-content-between">
                                <div className="d-flex flex-column">
                                  <div className="d-flex mt-2 flex-column ">
                                    <div>
                                      <th>Secondary Polocies</th>
                                    </div>
                                    <div>
                                      <span>Insured : ARther Taylor</span>
                                    </div>
                                  </div>
                                  <div className="d-flex mt-2 flex-column ">
                                    <div>
                                      <th>Tertiary Polocies</th>
                                    </div>
                                    <div className="">
                                      <span>Group ID : </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div
                              className="tab-pane fade"
                              id="nav-profile"
                              role="tabpanel"
                              aria-labelledby="nav-profile-tab"
                              tabindex="0"
                            >
                              <div
                                className="modal-body"
                                style={{
                                  overflowY: "scroll",
                                  height: "calc(60vh - 70px)",
                                }}
                              >
                                <div className="col-md-12 mb-2">
                                  <div className="input-group">
                                    <input
                                      //autoFocus
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
                                    {payerData
                                      ? payerData?.map((payer, i) => (
                                          <tr
                                            key={i}
                                            data-bs-dismiss="modal"
                                            onClick={() =>
                                              getPayerIdName(
                                                payer?.payer_name,
                                                payer?.id
                                              )
                                            }
                                          >
                                            <td>{payer?.plan_name}</td>
                                            <td>{payer?.city}</td>
                                            <td>{payer?.payer_name}</td>
                                            <td>{payer?.reference}</td>
                                          </tr>
                                        ))
                                      : "please wait...."}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
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
              {/* -------------------------------Primary Insurance Selected Moddel------------------- */}
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
                      // onChange={handleChange}
                      value={claimSecondaryInsName}
                      //onBlur={handleBlur}
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
              {/* show hide SecondaryInsurance  details */}

              {claimSecondaryInsName && (
                <div>
                  <span className="mt-3" onClick={handleHidingSecInsurance}>
                    <Link to="#!">
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
                            value={secInsmemberId}
                            onChange={(e) => setsecInsmemberId(e.target.value)}
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="">Policy Type</label>

                          <select
                            id="Policy type"
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            onChange={(e) =>
                              setSecInsPolicyType(e.target.value)
                            }
                          >
                            <option selected>Policy type</option>
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
                            value={secInsGrpNumb}
                            onChange={() => setSecInsGrpNumb(e.target.value)}
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
                            value={secInsOriginClaim}
                            onChange={() =>
                              setSecInsOriginClaim(e.target.value)
                            }
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
                            value={secInsauth}
                            onChange={() => setSecInsAuth(e.target.value)}
                          />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="">Refferel Type</label>

                          <select
                            id="Refferel Type"
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            onChange={(e) => {
                              setSecInsRefferel(e.target.value);
                            }}
                          >
                            <option selected>Policy type</option>
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
                    </div>
                  )}
                </div>
              )}
              {/* *********************************** SecondaryInsuranceModel **************** */}
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
                            //autoFocus
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
                          {payerData?.map((payer, i) => (
                            <tr
                              key={i}
                              data-bs-dismiss="modal"
                              onClick={() =>
                                getSecondaryInsIdName(
                                  payer.payer_name,
                                  payer.id
                                )
                              }
                            >
                              <td>{payer.plan_name}</td>
                              <td>{payer.city}</td>
                              <td>{payer.payer_name}</td>
                              <td>{payer.reference}</td>
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
                      // onChange={handleChange}
                      value={claimTernaryInsName}
                      //onBlur={handleBlur}
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
              {/* ================ Ternary Hiding Dev */}
              {claimTernaryInsName && (
                <div className="mt-1">
                  <span className="mt-2 " onClick={handleHidingTerInsurance}>
                    <Link to="#!">
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
                            value={terInsmemberId}
                            onChange={(e) => secTerInsmemberId(e.target.value)}
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="">Policy Type</label>

                          <select
                            id="Policy type"
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            onChange={(e) =>
                              secTerInsPolicyType(e.target.value)
                            }
                          >
                            <option selected>Policy type</option>
                            <option value="Balance Due Patient">
                              Balance Due Patient
                            </option>
                            <option value="On Hold">On Hold</option>
                            <option value="Pending Patient">
                              Pending Patient
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
                            value={terInsucopaydue}
                            onChange={(e) => setterInsucopaydue(e.target.value)}
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
                            value={terInsGrpNumb}
                            onChange={(e) => setTerInsGrpNumb(e.target.value)}
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
                            value={terInsOriginClaim}
                            onChange={(e) =>
                              secTerInsOriginClaim(e.target.value)
                            }
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
                            value={terInsauth}
                            onChange={(e) => secTerInsAuth(e.target.value)}
                          />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="">Refferel Type</label>

                          <select
                            id="Refferel Type"
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            onChange={(e) => secTerInsRefferel(e.target.value)}
                          >
                            <option selected>Policy type</option>
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
                    </div>
                  )}
                </div>
              )}
              {/* ******************************** TernaryInsuranceModel **************************** /> */}

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
                            //autoFocus
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
                          {payerData?.map((payer, i) => (
                            <tr
                              key={i}
                              data-bs-dismiss="modal"
                              onClick={() =>
                                getTernaryInsIdName(payer.payer_name, payer.id)
                              }
                            >
                              <td>{payer.plan_name}</td>
                              <td>{payer.city}</td>
                              <td>{payer.payer_name}</td>
                              <td>{payer.reference}</td>
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
            {/* ===================   CHARGES FORM  ======================= */}
            <div
              className="tab-pane fade"
              id="nav-charges"
              role="tabpanel"
              aria-labelledby="nav-charges-tab"
              tabIndex="0"
            >
              {/* codes & card */}
              <div className="d-flex col-md-11 mt-3">
                <div className="col-md-12 ">
                  {/* codes */}
                  <div className="col-md-12 d-flex gap-1 mt-3">
                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="text"
                          placeholder="ICD A"
                          aria-label="ICD A"
                          // required
                          id="icda"
                          value={icdACode}
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
                          data-bs-target="#icdAModel"
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
                      id="icdAModel"
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
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {diagnosisCode?.map((role, i) => (
                                        <tr
                                          data-bs-toggle="modal"
                                          name="icdACode"
                                          id="icdA"
                                          onClick={() =>
                                            getIcdACodeId(
                                              role?.id,
                                              role?.diagnosis_code
                                            )
                                          }
                                          key={i}
                                        >
                                          <td>{role?.diagnosis_code}</td>
                                          <td>{role?.description}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
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
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="text"
                          placeholder="ICD B"
                          aria-label="ICD B"
                          id="icdb"
                          name="icdb"
                          value={icdBCode.toString()}
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
                          data-bs-target="#icdBModel"
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
                    {/* ---------------ICD B Model---------------- */}
                    <div
                      className="modal fade text-dark"
                      id="icdBModel"
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
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {diagnosisCode?.map((role, i) => (
                                        <tr
                                          data-bs-toggle="modal"
                                          onClick={() =>
                                            getIcdBCodeId(
                                              role?.id,
                                              role?.diagnosis_code
                                            )
                                          }
                                          key={i}
                                        >
                                          <td>{role?.diagnosis_code}</td>
                                          <td>{role?.description}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
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
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="text"
                          placeholder="ICD C"
                          aria-label="ICD C"
                          id="icdc"
                          name="icdc"
                          value={icdCCode.toString()}
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
                          data-bs-target="#icdCModel"
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
                    {/* ---------------ICD C Model---------------- */}
                    <div
                      className="modal fade text-dark"
                      id="icdCModel"
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
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {diagnosisCode?.map((role, i) => (
                                        <tr
                                          data-bs-toggle="modal"
                                          onClick={() =>
                                            getIcdCCodeId(
                                              role?.id,
                                              role?.diagnosis_code
                                            )
                                          }
                                          key={i}
                                        >
                                          <td>{role?.diagnosis_code}</td>
                                          <td>{role?.description}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
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
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="text"
                          placeholder="ICD D"
                          aria-label="ICD D"
                          id="icdd"
                          name="icdd"
                          value={icdDCode.toString()}
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
                          data-bs-target="#icdDModel"
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
                  {/* ---------------ICD D Model---------------- */}
                  <div
                    className="modal fade text-dark"
                    id="icdDModel"
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
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {diagnosisCode?.map((role, i) => (
                                      <tr
                                        data-bs-toggle="modal"
                                        onClick={() =>
                                          getIcdDCodeId(
                                            role?.id,
                                            role?.diagnosis_code
                                          )
                                        }
                                        key={i}
                                      >
                                        <td>{role?.diagnosis_code}</td>
                                        <td>{role?.description}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
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
                      </div>
                    </div>
                  </div>

                  {/* codes */}
                  <div className="col-md-12 d-flex gap-1 mt-3">
                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="text"
                          placeholder="ICD E"
                          aria-label="ICD E"
                          id="icde"
                          name="icde"
                          value={icdECode}
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
                          data-bs-target="#icdEModel"
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
                    {/* ---------------ICD E Model---------------- */}
                    <div
                      className="modal fade text-dark"
                      id="icdEModel"
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
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {diagnosisCode?.map((role, i) => (
                                        <tr
                                          data-bs-toggle="modal"
                                          onClick={() =>
                                            getIcdECodeId(
                                              role?.id,
                                              role?.diagnosis_code
                                            )
                                          }
                                          key={i}
                                        >
                                          <td>{role?.diagnosis_code}</td>
                                          <td>{role?.description}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
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
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="text"
                          placeholder="ICD F"
                          aria-label="ICD F"
                          id="icdf"
                          name="icdf"
                          value={icdFCode.toString()}
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
                          data-bs-target="#icdFModel"
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
                    {/* ---------------ICD F Model---------------- */}
                    <div
                      className="modal fade text-dark"
                      id="icdFModel"
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
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {diagnosisCode?.map((role, i) => (
                                        <tr
                                          data-bs-toggle="modal"
                                          onClick={() =>
                                            getIcdFCodeId(
                                              role?.id,
                                              role?.diagnosis_code
                                            )
                                          }
                                          key={i}
                                        >
                                          <td>{role?.diagnosis_code}</td>
                                          <td>{role?.description}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
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
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="text"
                          placeholder="ICD G"
                          aria-label="ICD G"
                          id="icdg"
                          name="icdg"
                          value={icdGCode.toString()}
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
                          data-bs-target="#icdGModel"
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
                    {/* ---------------ICD G Model---------------- */}
                    <div
                      className="modal fade text-dark"
                      id="icdGModel"
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
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {diagnosisCode?.map((role, i) => (
                                        <tr
                                          data-bs-toggle="modal"
                                          onClick={() =>
                                            getIcdGCodeId(
                                              role?.id,
                                              role?.diagnosis_code
                                            )
                                          }
                                          key={i}
                                        >
                                          <td>{role?.diagnosis_code}</td>
                                          <td>{role?.description}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
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
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="text"
                          placeholder="ICD H"
                          aria-label="ICD H"
                          id="icdh"
                          name="icd"
                          value={icdHCode.toString()}
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
                          data-bs-target="#icdHModel"
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
                    {/* ---------------ICD H Model---------------- */}
                    <div
                      className="modal fade text-dark"
                      id="icdHModel"
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
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {diagnosisCode?.map((role, i) => (
                                        <tr
                                          data-bs-toggle="modal"
                                          onClick={() =>
                                            getIcdHCodeId(
                                              role?.id,
                                              role?.diagnosis_code
                                            )
                                          }
                                          key={i}
                                        >
                                          <td>{role?.diagnosis_code}</td>
                                          <td>{role?.description}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
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
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* codes */}
                  <div className="col-md-12 d-flex gap-1 mt-3">
                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="text"
                          placeholder="ICD I"
                          aria-label="ICD I"
                          id="icdi"
                          name="icdi"
                          value={icdICode}
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
                          data-bs-target="#icdIModel"
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
                    {/* ---------------ICD I Model---------------- */}
                    <div
                      className="modal fade text-dark"
                      id="icdIModel"
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
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {diagnosisCode?.map((role, i) => (
                                        <tr
                                          data-bs-toggle="modal"
                                          onClick={() =>
                                            getIcdICodeId(
                                              role?.id,
                                              role?.diagnosis_code
                                            )
                                          }
                                          key={i}
                                        >
                                          <td>{role?.diagnosis_code}</td>
                                          <td>{role?.description}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
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
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="text"
                          placeholder="ICD J"
                          aria-label="ICD J"
                          id="icdj"
                          name="icdj"
                          value={icdJCode.toString()}
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
                          data-bs-target="#icdJModel"
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
                    {/* ---------------icd J Model---------------- */}
                    <div
                      className="modal fade text-dark"
                      id="icdJModel"
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
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {diagnosisCode?.map((role, i) => (
                                        <tr
                                          data-bs-toggle="modal"
                                          onClick={() =>
                                            getIcdJCodeId(
                                              role?.id,
                                              role?.diagnosis_code
                                            )
                                          }
                                          key={i}
                                        >
                                          <td>{role?.diagnosis_code}</td>
                                          <td>{role?.description}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
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
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="text"
                          placeholder="ICD K"
                          aria-label="ICD K"
                          id="icdk"
                          name="icdk"
                          value={icdKCode.toString()}
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
                          data-bs-target="#icdKModel"
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
                    {/* ---------------icd K Model---------------- */}
                    <div
                      className="modal fade text-dark"
                      id="icdKModel"
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
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {diagnosisCode?.map((role, i) => (
                                        <tr
                                          data-bs-toggle="modal"
                                          onClick={() =>
                                            getIcdKCodeId(
                                              role?.id,
                                              role?.diagnosis_code
                                            )
                                          }
                                          key={i}
                                        >
                                          <td>{role?.diagnosis_code}</td>
                                          <td>{role?.description}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
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
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      {/* <label htmlFor="">Revenue Code</label> */}
                      <div className="input-group">
                        <input
                          className={`form-control form-control-sm`}
                          type="text"
                          placeholder="ICD L"
                          aria-label="ICD L"
                          id="icdl"
                          name="icdl"
                          value={icdLCode.toString()}
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
                          data-bs-target="#icdLModel"
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
                    {/* ---------------icd L Model---------------- */}
                    <div
                      className="modal fade text-dark"
                      id="icdLModel"
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
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {diagnosisCode?.map((role, i) => (
                                        <tr
                                          data-bs-toggle="modal"
                                          onClick={() =>
                                            getIcdLCodeId(
                                              role?.id,
                                              role?.diagnosis_code
                                            )
                                          }
                                          key={i}
                                        >
                                          <td>{role?.diagnosis_code}</td>
                                          <td>{role?.description}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
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
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* codes */}
                </div>
                {/* -------------assignment of benefits */}
              </div>
              {/* Assignment of Benefits */}
              <div className="col-md-8">
                <div className="col-md-12 mt-2">
                  <div className="card mb-2">
                    <div className="card-header">Assignment of Benefits</div>
                    <div className="card-body ">
                      <div className="col-md-12">
                        <div className="col-md-10 d-flex"></div>
                        <div className="col-md-12 d-flex flex-column">
                          <div className="col-md-12">
                            <input
                              onClick={toggleUpdatePatientIcd}
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="excludeCode"
                            />
                            <label className="mx-2" htmlFor="excludeCode">
                              Update patient ICD & procedure Code defaults{" "}
                            </label>
                          </div>

                          <div className="col-md-12 mt-2">
                            <label htmlFor="">Set all changes to s</label>
                            <select
                              id="transportreasons"
                              onChange={(e) => setSetallChanges(e.target.value)}
                              className="form-select form-select-sm"
                              aria-label=".form-select-sm example"
                            >
                              <option selected value="No change">
                                No change
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
              </div>
              {/* table//////////////////////////////////////////////////////////////////////// */}
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
                      {addTableRow?.map((data, i) => (
                        <tr key={i}>
                          <td>
                            {" "}
                            <input
                              onChange={(e) =>
                                setchargesTableToDate(e.target.value)
                              }
                              type="date"
                              id="AccidentIllnessDate"
                              name="AccidentIllnessDate"
                              className="form-control form-control-sm"
                            />{" "}
                          </td>
                          <td>
                            <input
                              onChange={(e) =>
                                setchargesTableFromDate(e.target.value)
                              }
                              type="date"
                              id="AccidentIllnessDate"
                              name="AccidentIllnessDate"
                              className="form-control form-control-sm"
                            />
                          </td>
                          <td>
                            <div
                              className="input-group"
                              style={{ width: "110px" }}
                            >
                              <input
                                className={`form-control form-control-sm`}
                                type="text"
                                placeholder="Procedure Code"
                                aria-label="procedureCode"
                                value={claimChargesTableProcedureCode.toString()}
                                id="procedureCode"
                                name="procedureCode"
                                // required
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
                                data-bs-target="#procedureCharge"
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
                                placeholder="Modifier 1"
                                aria-label="Modifier1"
                                id="Modifier1"
                                name="Modifier1"
                                value={
                                  getmodifier1Id
                                    ? getmodifier1Id.toString()
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
                                data-bs-target="#modifier1Chargemodal"
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
                              <InputDecimal
                                precision={2}
                                className={`form-control form-control-sm`}
                                type="number"
                                placeholder="Units"
                                aria-label="Units"
                                value={units}
                                id="Units"
                                name="Units"
                                onChangeValue={(value) => {
                                  setUnits(parseFloat(value)?.toFixed(2));
                                }}
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                style={{ textAlign: "right" }}
                              />
                            </div>
                          </td>
                          <td>
                            <div
                              className="input-group"
                              style={{ width: "100px" }}
                            >
                              <InputDecimal
                                precision={2}
                                className={`form-control form-control-sm`}
                                type="number"
                                placeholder="Amount"
                                aria-label="Amount"
                                id="Amount"
                                name="Amount"
                                value={units * unitPrice}
                                onChangeValue={(value) => {
                                  setAmount(parseFloat(value)?.toFixed(2));
                                }}
                                // onChange={(e) => setAmount(e.target.value)}
                                autoCompletes="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                style={{ textAlign: "right" }}
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
                                type="text"
                                placeholder=""
                                aria-label="dxPointer"
                                id="dxPointer"
                                name="dxPointer"
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
                                data-bs-target="#dxPointerChargemodal"
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
                                placeholder="Modifiers 2"
                                aria-label="modfierd2"
                                id="modfierd2"
                                name="modfierd2"
                                value={getmodifier2Id.toString()}
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
                                data-bs-target="#modifiers2ChargeModal"
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
                                placeholder="POS"
                                aria-label="pos"
                                id="pos"
                                name="pos"
                                value={posId.toString()}
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
                                data-bs-target="#posChargemodal"
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
                                placeholder="Modifier 3"
                                aria-label="Modifier3"
                                id="Modifier3"
                                name="Modifier3"
                                value={getmodifier3Id.toString()}
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
                                data-bs-target="#modifier3Chargemodal"
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
                                placeholder="TOS"
                                aria-label="TOS"
                                id="tos"
                                name="tos"
                                value={tosId.toString()}
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
                                data-bs-target="#tosChargemodal"
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
                                placeholder="Modifier 4"
                                aria-label="Modifier4"
                                id="Modifier4"
                                value={getmodifier4Id.toString()}
                                name="Modifier4"
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
                                data-bs-target="#modifiers4ChargeModal"
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
                              <InputDecimal
                                precision={2}
                                className={`form-control form-control-sm`}
                                type="number"
                                placeholder="Unit Price"
                                aria-label="UnitPrice"
                                value={unitPrice}
                                id="UnitPrice"
                                onChangeValue={(value) => {
                                  setUnitPrice(parseFloat(value)?.toFixed(2));
                                }}
                                style={{ textAlign: "right" }}
                                name="UnitPrice"
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
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
                                  onChange={(e) =>
                                    setChargeTableStatus(e.target.value)
                                  }
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
                            <div className="col-md-5" style={{ width: "60px" }}>
                              <input
                                onClick={togglechargetableDeleteSt}
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
                                  data-bs-toggle="modal"
                                  data-bs-target="#otherModel##"
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
                            <div
                              className="input-group"
                              style={{ width: "100px" }}
                            >
                              <input
                                className={`form-control form-control-sm`}
                                type="text"
                                placeholder="Inventory"
                                aria-label="Inventory"
                                id="Inventory"
                                name="Inventory"
                                value={getInventoryCode.toString()}
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
                                data-bs-target="#inventoryChargeModal"
                              >
                                <i
                                  className="fas fa-search"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td>
                          <input
                            value={chargesTableToDate}
                            onChange={(e) =>
                              setchargesTableToDate(e.target.value)
                            }
                            type="date"
                            id="AccidentIllnessDate"
                            name="AccidentIllnessDate"
                            className="form-control form-control-sm"
                          />{" "}
                        </td>
                        <td>
                          <input
                            value={chargesTableFromDate}
                            onChange={(e) =>
                              setchargesTableFromDate(e.target.value)
                            }
                            type="date"
                            id="AccidentIllnessDate"
                            name="AccidentIllnessDate"
                            className="form-control form-control-sm"
                          />
                        </td>
                        <td>
                          <div
                            className="input-group"
                            style={{ width: "110px" }}
                          >
                            <input
                              className={`form-control form-control-sm`}
                              type="text"
                              placeholder="Procedure Code"
                              aria-label="procedureCode"
                              // value={claimChargesTableProcedureCode.toString()}
                              id="procedureCode"
                              name="procedureCode"
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
                              data-bs-target="#procedureCharge"
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
                              placeholder="Modifier 1"
                              aria-label="Modifier1"
                              id="Modifier1"
                              name="Modifier1"
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
                              data-bs-target="#modifier1Chargemodal"
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
                            <InputDecimal
                              precision={2}
                              className={`form-control form-control-sm`}
                              type="number"
                              placeholder="Units"
                              aria-label="Units"
                              value={units}
                              id="Units"
                              name="Units"
                              onChangeValue={(value) => {
                                setUnits(parseFloat(value)?.toFixed(2));
                              }}
                              autoComplete="off"
                              autoCapitalize="off"
                              autoCorrect="off"
                              spellCheck="false"
                              style={{ textAlign: "right" }}
                            />
                          </div>
                        </td>
                        <td>
                          <div
                            className="input-group"
                            style={{ width: "100px" }}
                          >
                            <InputDecimal
                              precision={2}
                              className={`form-control form-control-sm`}
                              type="number"
                              placeholder="Amount"
                              aria-label="Amount"
                              id="Amount"
                              name="Amount"
                              value={units * unitPrice}
                              onChangeValue={(value) => {
                                setAmount(parseFloat(value)?.toFixed(2));
                              }}
                              // onChange={(e) => setAmount(e.target.value)}
                              autoCompletes="off"
                              autoCapitalize="off"
                              autoCorrect="off"
                              spellCheck="false"
                              style={{ textAlign: "right" }}
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
                              type="text"
                              placeholder=""
                              aria-label="dxPointer"
                              id="dxPointer"
                              name="dxPointer"
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
                              data-bs-target="#dxPointerChargemodal"
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
                              placeholder="Modifiers 2"
                              aria-label="modfierd2"
                              id="modfierd2"
                              name="modfierd2"
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
                              data-bs-target="#modifiers2ChargeModal"
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
                              placeholder="POS"
                              aria-label="pos"
                              id="pos"
                              name="pos"
                              value={posId ? posId.toString() : ""}
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
                              data-bs-target="#posChargemodal"
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
                              placeholder="Modifier 3"
                              aria-label="Modifier3"
                              id="Modifier3"
                              name="Modifier3"
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
                              data-bs-target="#modifier3Chargemodal"
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
                              placeholder="TOS"
                              aria-label="TOS"
                              id="tos"
                              name="tos"
                              value={tosId ? tosId.toString() : ""}
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
                              data-bs-target="#tosChargemodal"
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
                              placeholder="Modifier 4"
                              aria-label="Modifier4"
                              id="Modifier4"
                              value={
                                getmodifier4Code
                                  ? getmodifier4Code.toString()
                                  : ""
                              }
                              name="Modifier4"
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
                              data-bs-target="#modifiers4ChargeModal"
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
                            <InputDecimal
                              precision={2}
                              className={`form-control form-control-sm`}
                              type="number"
                              placeholder="Unit Price"
                              aria-label="UnitPrice"
                              value={unitPrice}
                              id="UnitPrice"
                              onChangeValue={(value) => {
                                setUnitPrice(parseFloat(value)?.toFixed(2));
                              }}
                              style={{ textAlign: "right" }}
                              name="UnitPrice"
                              autoComplete="off"
                              autoCapitalize="off"
                              autoCorrect="off"
                              spellCheck="false"
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
                                onChange={(e) =>
                                  setChargeTableStatus(e.target.value)
                                }
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
                              onClick={togglechargetableDeleteSt}
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
                                data-bs-toggle="modal"
                                data-bs-target="#otherModel"
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
                          <div
                            className="input-group"
                            style={{ width: "100px" }}
                          >
                            <input
                              className={`form-control form-control-sm`}
                              type="text"
                              placeholder="Inventory"
                              aria-label="Inventory"
                              id="Inventory"
                              name="Inventory"
                              value={getInventoryCodeId.toString()}
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
                              data-bs-target="#inventoryChargeModal"
                            >
                              <i
                                className="fas fa-search"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div id="click" className="col-md-4">
                    <p>0 charges</p>
                  </div>
                </div>
              </div>
            </div>
            {/* -----------claim charge procedure modalS start--------------- */}
            <div
              className="modal fade text-dark"
              id="procedureCharge"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              aria-hidden="true"
              aria-labelledby="procedureCharge"
              // tabindex={-1}
            >
              <div className="modal-dialog modal-lg modal-dialog-centere modal-scrollable modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header"></div>
                  <div className="modal-body">
                    <div className="d-flex align-items-center">
                      <div className="col-md-9">
                        <label htmlFor="">
                          Search for CPT/HCPCS codes by code or description
                        </label>
                        <input
                          type="text"
                          id="search"
                          name="search"
                          // value={query}
                          // onChange={(e) => handleSearch(e)}
                          className="form-control"
                          aria-label="Small"
                          placeholder="Search for CPT/HCPCS codes by code or description"
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
                                <th scope="col">Price</th>
                                <th scope="col">Inactive</th>
                              </tr>
                            </thead>
                            <tbody>
                              {procedureData?.map((role, i) => (
                                <tr
                                  data-bs-toggle="modal"
                                  name="icdACode"
                                  onClick={() =>
                                    getProcedureCodeId(
                                      role?.id,
                                      role?.procedure_code,
                                      role?.default_price
                                    )
                                  }
                                  id="icdA"
                                  key={i}
                                >
                                  <td>{role?.procedure_code}</td>
                                  <td>{role?.description}</td>
                                  <td>{role?.default_price}</td>
                                  <td>
                                    {role?.deleted_at === null
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
            {/* -----------claim charge procedure modalS end--------------- */}
            {/* -----------inventoryChargeModal start ---------------------- */}
            <div
              className="modal fade text-dark"
              id="inventoryChargeModal"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              aria-hidden="true"
              aria-labelledby="procedureCharge"
              // tabindex={-1}
            >
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header"></div>
                  <div className="modal-body">
                    <div className="d-flex align-items-center">
                      <div className="col-md-9">
                        <label htmlFor="">
                          Search for inventory codes by code, name or
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
                          placeholder="Search for inventory codes by code, name or description"
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
                                <th scope="col">Cpt Code</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Inactive</th>
                              </tr>
                            </thead>
                            <tbody>
                              {getInventory?.map((role, i) => (
                                <tr
                                  data-bs-toggle="modal"
                                  name="icdACode"
                                  onClick={() =>
                                    getIneventoryCodeId(
                                      role?.id,
                                      role?.inventory_codes
                                    )
                                  }
                                  id="icdA"
                                  key={i}
                                >
                                  <td>{role?.inventory_codes}</td>
                                  <td>
                                    {role?.procedure_codes?.procedure_code}
                                  </td>
                                  <td>{role?.alert_quantity}</td>
                                  <td>
                                    {role?.deleted_at === null
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
            {/* -----------inventoryChargeModal start ---------------------- */}
            {/* -----------claim charge modifiers modalS start--------------- */}
            <div
              className="modal fade text-dark"
              id="modifier1Chargemodal"
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
              id="modifiers2ChargeModal"
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
              id="modifier3Chargemodal"
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
              id="modifiers4ChargeModal"
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
            {/*----------------------- posChargemodal start------------------- */}
            <div
              className="modal fade text-dark"
              id="posChargemodal"
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
                        <label htmlFor="">Search for POS</label>
                        <input
                          type="text"
                          id="search"
                          name="search"
                          // value={query}
                          // onChange={(e) => handleSearch(e)}
                          className="form-control form-control-sm"
                          aria-label="Small"
                          placeholder="Search for POS Codes"
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
                              {getPos?.map((role, i) => (
                                <tr
                                  data-bs-toggle="modal"
                                  name="icdACode"
                                  onClick={() =>
                                    getPosCodeId(role?.id, role?.pos_code)
                                  }
                                  id="icdA"
                                  key={i}
                                >
                                  <td>{role?.pos_code}</td>
                                  <td>{role?.description}</td>
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
            {/*----------------------- posChargemodal end------------------- */}
            {/* ------------------------  tosChargemodal start-------------- */}
            <div
              className="modal fade text-dark"
              id="tosChargemodal"
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
                        <label htmlFor="">Search for TOS</label>
                        <input
                          type="text"
                          id="search"
                          name="search"
                          // value={query}
                          // onChange={(e) => handleSearch(e)}
                          className="form-control form-control-sm"
                          aria-label="Small"
                          placeholder="Search for TOS Codes"
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
                              {getTos?.map((role, i) => (
                                <tr
                                  data-bs-toggle="modal"
                                  name="icdACode"
                                  onClick={() =>
                                    getTosCodeId(role?.id, role?.tos_code)
                                  }
                                  id="icdA"
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
            {/* ------------------------  tosChargemodal end-------------- */}
            {/* ------------- dxPointerChargemodal start ----------------*/}
            <div
              className="modal fade"
              id="dxPointerChargemodal"
              tabIndex="-1"
              aria-labelledby="dxPointerChargemodal"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-body">
                    <p>Click on ICD codes to select or deselect them</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      data-bs-dismiss="modal"
                    >
                      Apply
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/*-------------- dxPointerChargemodal  end ---------------*/}
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
                    <nav>
                      <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button
                          className="nav-link active"
                          id="Form"
                          data-bs-toggle="tab"
                          data-bs-target="#x"
                          type="button"
                          role="tab"
                          aria-controls="Form"
                          aria-selected="true"
                        >
                          Form
                        </button>
                        <button
                          className="nav-link"
                          id="nav-Required-Data"
                          data-bs-toggle="tab"
                          data-bs-target="#y"
                          type="button"
                          role="tab"
                          aria-controls="nav-Required-Data"
                          aria-selected="false"
                        >
                          Required Data
                        </button>
                      </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="x"
                        role="tabpanel"
                        aria-labelledby="Form"
                        tabIndex="1"
                      >
                        <div
                          className="d-flex col-md-12  flex-column"
                          style={{
                            overflowY: "scroll",
                            height: "calc(30vh - 40px)",
                          }}
                        >
                          <div className="d-flex col-md-12  flex-column">
                            <div className="d-flex col-md-12 d-flex flex-column mt-2">
                              <div>
                                <label className="" htmlFor="">
                                  1.Does the patient have severe arthritis of
                                  the hip or knee{" "}
                                </label>
                              </div>
                              <div>
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
                                  yes
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
                                  Does not Apply
                                </label>
                              </div>
                            </div>

                            <div className="d-flex col-md-12 d-flex flex-column mt-2">
                              <div>
                                <label className="" htmlFor="">
                                  2.Does the patient have severe neuromuscular
                                  disease?
                                </label>
                              </div>
                              <div>
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
                                  yes
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
                                  Does not Apply
                                </label>
                              </div>
                            </div>

                            <div className="d-flex col-md-12 d-flex flex-column mt-2">
                              <div>
                                <label className="" htmlFor="">
                                  3.Is the patient completely incapable of
                                  standing up from a regular armchair or any
                                  chair on his/her home?
                                </label>
                              </div>
                              <div>
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
                                  yes
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
                                  Does not Apply
                                </label>
                              </div>
                            </div>

                            <div className="d-flex col-md-12 d-flex flex-column mt-2">
                              <div>
                                <label className="" htmlFor="">
                                  4.Once standing,does the patient have the
                                  ability to ambilate?
                                </label>
                              </div>
                              <div>
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
                                  yes
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
                                  Does not Apply
                                </label>
                              </div>
                            </div>

                            <div className="d-flex col-md-12 d-flex flex-column mt-2">
                              <div>
                                <label className="" htmlFor="">
                                  5.Have all appropriate therapeutic modalties
                                  to enable the patient to transfer from a chair
                                  to a standing postion (e.g medication,
                                  physical therapy) been tried and failed? If
                                  YES, this is documented in the patient's
                                  medical records.
                                </label>
                              </div>
                              <div>
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
                                  yes
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
                                  Does not Apply
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade show "
                        id="y"
                        role="tabpanel"
                        aria-labelledby="nav-Required-Data"
                        tabIndex="0"
                      >
                        <div className="d-flex flex-column col-md-12">
                          <div className="col-md-5 col-sm-10 d-flex flex-column mt-2">
                            <label className="" htmlFor="">
                              Report Transmission Code
                            </label>
                            <div>
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
                                Previously Submitted to payer
                              </label>
                            </div>
                            <div>
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
                                Certification includede in claim
                              </label>
                            </div>
                            <div>
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
                                Narrative Segment included in this claim
                              </label>
                            </div>
                            <div>
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
                                No Documentation is Required
                              </label>
                            </div>
                            <div>
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
                                Not Spacified
                              </label>
                            </div>
                          </div>

                          <div className="col-md-5 col-sm-10 d-flex flex-column mt-2">
                            <label className="" htmlFor="">
                              Condition Indicator
                            </label>
                            <div>
                              <input
                                className="form-check-input mx-2"
                                type="chackbox"
                                name="OtherAccd"
                                id="otheraccno"
                              />
                              <label
                                className="form-check-label mt-1"
                                htmlFor="otheraccno"
                              >
                                Oxygen delivery equipment is stationary
                              </label>
                            </div>
                            <div>
                              <input
                                className="form-check-input mx-2"
                                type="chackbox"
                                name="OtherAccd"
                                id="otheraccno"
                              />
                              <label
                                className="form-check-label mt-1"
                                htmlFor="otheraccno"
                              >
                                Physician Signed cert,at Supplier's Office
                              </label>
                            </div>
                            <div>
                              <input
                                className="form-check-input mx-2"
                                type="chackbox"
                                name="OtherAccd"
                                id="otheraccno"
                              />
                              <label
                                className="form-check-label mt-1"
                                htmlFor="otheraccno"
                              >
                                Ambulation Limitations
                              </label>
                            </div>
                            <div>
                              <input
                                className="form-check-input mx-2"
                                type="chackbox"
                                name="OtherAccd"
                                id="otheraccno"
                              />
                              <label
                                className="form-check-label mt-1"
                                htmlFor="otheraccno"
                              >
                                Patient Discharged from first Facility
                              </label>
                            </div>
                            <div>
                              <input
                                className="form-check-input mx-2"
                                type="chackbox"
                                name="OtherAccd"
                                id="otheraccno"
                              />
                              <label
                                className="form-check-label mt-1"
                                htmlFor="otheraccno"
                              >
                                Replacement Item
                              </label>
                            </div>
                          </div>

                          <div className="col-md-12 d-flex align-items-center mt-2">
                            <label className="" htmlFor="">
                              Code Category
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
                              Duranble Medical Equipment Certification
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
                              Oxygen Therapy certification
                            </label>
                          </div>

                          <div className="col-md-8 d-flex flex-column mt-2">
                            <div>
                              <label className="" htmlFor="">
                                Certification Type
                              </label>
                            </div>
                            <div className="col-md-12 d-flex gap-3 mt-2">
                              <div>
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
                                  Initial
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
                                  Renewal
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
                                  Revised
                                </label>
                              </div>

                              <div className="d-flex flex-column">
                                <label
                                  className="form-check-label mt-1"
                                  htmlFor="otheraccyes"
                                >
                                  Months
                                </label>
                                <input
                                  className="form-check-input mx-2"
                                  type="date"
                                  name="OtherAccd"
                                  id="otheraccyes"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-10 d-flex  mt-2">
                            {" "}
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
                                placeholder="Referring/PCP Provider"
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
                                placeholder="Referring/PCP Provider"
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
                        </div>
                      </div>
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
                    <div
                      className="col-md-11 mx-3"
                      style={{
                        overflowY: "scroll",
                        height: "calc(80vh - 127px)",
                      }}
                    >
                      <div className="col-md-12 mt-2">
                        {/* ####### Service Information */}
                        <div className="card mb-2">
                          <div className="card-header">
                            Servive Inoformation
                          </div>
                          <div className="card-body ">
                            <div className="col-md-12">
                              <div className="col-md-8 d-flex flex-column">
                                <div className="col-md-4">
                                  <input
                                    className={`form-control col-md-4  form-control-sm`}
                                    type="text"
                                    placeholder="EPSDT/CHAP Code"
                                    value={cliamchargeotherEPSD}
                                    aria-label="ICD P"
                                    id="claimespd"
                                    name="claimespd"
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    spellCheck="false"
                                    maxLength={3}
                                    onChange={(e) =>
                                      setcliamchargeotherEPSD(e.taget.value)
                                    }
                                  />
                                </div>

                                <div className="col-md-12 d-flex align-items-center mt-2">
                                  <label className="" htmlFor="">
                                    Family Planning
                                  </label>
                                  <input
                                    className="form-check-input mx-2"
                                    type="radio"
                                    name="familyplanning"
                                    id="familyplanning"
                                    value={0}
                                    checked={cliamchargeotherFamily == 0}
                                    onChange={(e) =>
                                      hanldeClaimChargeOtherFamily(e)
                                    }
                                  />
                                  <label
                                    className="form-check-label mt-1"
                                    htmlFor="familyplanning"
                                  >
                                    No
                                  </label>
                                  <input
                                    className="form-check-input mx-2 "
                                    type="radio"
                                    name="familyplanning"
                                    id="otheraccyes"
                                    value={1}
                                    checked={cliamchargeotherFamily == 1}
                                    onChange={(e) =>
                                      hanldeClaimChargeOtherFamily(e)
                                    }
                                  />
                                  <label
                                    className="form-check-label mt-1"
                                    htmlFor="otheraccyes"
                                  >
                                    Yes
                                  </label>
                                </div>

                                <div className="col-md-12 d-flex align-items-center mt-2">
                                  <label className="" htmlFor="">
                                    Emergency
                                  </label>
                                  <input
                                    className="form-check-input mx-2"
                                    type="radio"
                                    name="emergency"
                                    id="emergency"
                                    value={0}
                                    checked={cliamchargeotherEmerg == 0}
                                    onChange={(e) => handleEmergency(e)}
                                  />
                                  <label
                                    className="form-check-label mt-1"
                                    htmlFor="emergency"
                                  >
                                    No
                                  </label>
                                  <input
                                    className="form-check-input mx-2 "
                                    type="radio"
                                    name="emergency"
                                    id="emergency"
                                    value={1}
                                    checked={cliamchargeotherEmerg == 1}
                                    onChange={(e) => handleEmergency(e)}
                                  />
                                  <label
                                    className="form-check-label mt-1"
                                    htmlFor="emergency"
                                  >
                                    Yes
                                  </label>
                                </div>

                                <div className="col-md-5 mt-2">
                                  {" "}
                                  <input
                                    className={`form-control  form-control-sm`}
                                    type="text"
                                    placeholder="COB"
                                    aria-label="ICD P"
                                    value={cliamchargeotherCOB}
                                    onChange={(e) =>
                                      setcliamchargeotherCOB(e.target.value)
                                    }
                                    id="icdp"
                                    name="icp"
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    spellCheck="false"
                                    maxLength={3}
                                  />
                                </div>

                                <div className="col-md-12 d-flex align-items-center mt-2">
                                  <label className="" htmlFor="">
                                    Is the provider employed by hospice?
                                  </label>
                                  <input
                                    className="form-check-input mx-2"
                                    type="radio"
                                    name="hospice"
                                    id="hospice"
                                    value={0}
                                    checked={cliamchargeotherhopice == 0}
                                    onChange={(e) =>
                                      setcliamchargeotherhopice(e.target.value)
                                    }
                                  />
                                  <label
                                    className="form-check-label mt-1"
                                    htmlFor="emergency"
                                  >
                                    No
                                  </label>
                                  <input
                                    className="form-check-input mx-2 "
                                    type="radio"
                                    name="hospice"
                                    id="hospice"
                                    value={1}
                                    checked={cliamchargeotherhopice == 1}
                                    onChange={(e) =>
                                      setcliamchargeotherhopice(e.target.value)
                                    }
                                  />
                                  <label
                                    className="form-check-label mt-1"
                                    htmlFor="emergency"
                                  >
                                    Yes
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/*Drug Information  */}
                        <div className="card mb-2">
                          <div className="card-header">Drug Inoformation</div>
                          <div className="card-body ">
                            <div className="col-md-11 gap-2 d-flex">
                              <div className="col-md-3">
                                <input
                                  className={`form-control col-md-4  form-control-sm`}
                                  type="number"
                                  placeholder="Drug Code"
                                  aria-label="drugcode"
                                  id="drugcode"
                                  onChange={(e) =>
                                    setcliamchargeotherdrugcode(e.target.value)
                                  }
                                  name="drugcode"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  maxLength={15}
                                  minLength={3}
                                />
                              </div>

                              <div className="col-md-3">
                                <input
                                  className={`form-control col-md-4  form-control-sm`}
                                  type="number"
                                  placeholder="Drug Units"
                                  aria-label="drugunits"
                                  id="drugunits"
                                  name="drugunits"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  maxLength={5}
                                  onChange={(e) =>
                                    setcliamchargeotherdrugUnit(e.target.value)
                                  }
                                  minLength={3}
                                />
                              </div>

                              <div className="col-md-4">
                                <select
                                  id="defaultChargeStatus"
                                  className="form-select form-select-sm"
                                  aria-label=".form-select-sm example"
                                  onChange={(e) =>
                                    setchargeotheruniteSelect(e.target.value)
                                  }
                                >
                                  <option value="UNIT (UN)">UNIT (UN)</option>
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

                              <div className="col-md-2">
                                <input
                                  className={`form-control col-md-4  form-control-sm`}
                                  onChange={(e) =>
                                    setcliamchargeotherdrugDays(e.target.value)
                                  }
                                  value={cliamchargeotherdrugDays}
                                  type="number"
                                  placeholder="Drug Days"
                                  aria-label="drugdays"
                                  id="drugdays"
                                  name="drugdays"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  maxLength={10}
                                  minLength={5}
                                />
                              </div>
                            </div>

                            <div className="col-md-11 gap-2 d-flex  mt-2">
                              <div className="col-md-4">
                                <div>
                                  <label htmlFor="">Drug Code Formate</label>
                                </div>
                                <select
                                  id="defaultChargeStatus"
                                  className="form-select form-select-sm"
                                  aria-label=".form-select-sm example"
                                  onChange={(e) =>
                                    setchargeotherDrugFormate(e.target.value)
                                  }
                                >
                                  <option value=""></option>
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

                              <div className="col-md-3">
                                <label htmlFor="">Drug Price</label>
                                <InputDecimal
                                  precision={2}
                                  className={`form-control form-control-sm`}
                                  placeholder="0.0"
                                  aria-label="drugprice"
                                  value={chargeotherDrugPrice}
                                  id="drugprice"
                                  name="drugprice"
                                  onChangeValue={(value) => {
                                    setchargeotherDrugPrice(
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
                            </div>

                            <div className="col-md-11 gap-2 d-flex mt-2">
                              <div className="col-md-3">
                                <input
                                  className={`form-control col-md-4  form-control-sm`}
                                  type="text"
                                  placeholder=" Prescription #"
                                  aria-label="prescription"
                                  id="prescription"
                                  name="prescription"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  maxLength={15}
                                  minLength={3}
                                  value={chargeotherPres}
                                  onChange={(e) =>
                                    setchargeotherPres(e.target.value)
                                  }
                                />
                              </div>

                              <div className="col-md-3">
                                <input
                                  className={`form-control col-md-4  form-control-sm`}
                                  type="date"
                                  placeholder=""
                                  aria-label="prescriptiondate"
                                  id="prescriptiondate"
                                  name="prescriptiondate"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  maxLength={10}
                                  minLength={3}
                                  onChange={(e) =>
                                    setchargeotherPreDate(e.target.value)
                                  }
                                  value={chargeotherPreDate}
                                />
                              </div>
                              <div className="col-md-5">
                                <input
                                  className={`form-control col-md-4  form-control-sm`}
                                  type="number"
                                  placeholder="Prescription Month"
                                  aria-label="prescriptionmonths"
                                  id="prescriptionmonths"
                                  name="prescriptionmonths"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  maxLength={25}
                                  minLength={3}
                                  onChange={(e) =>
                                    setchargeotherPresDateInput(e.target.value)
                                  }
                                  value={chargeotherPresDateInput}
                                />
                              </div>
                            </div>
                            <div className="col-md-12 mt-2">
                              <div className="col-md-12 mt-2">
                                <input
                                  className={`form-control  form-control-sm`}
                                  type="text"
                                  placeholder="Description"
                                  aria-label="prescriptionmonths"
                                  id="prescriptionmonths"
                                  name="prescriptionmonths"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  maxLength={10}
                                  minLength={3}
                                  value={chargeotherDesc}
                                  onChange={(e) =>
                                    setchargeotherDesc(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* ###############    Measurement  */}

                        <div className="card mb-2">
                          <div className="card-header">Measurement</div>
                          <div className="card-body ">
                            <div className="col-md-10 d-flex gap-2">
                              <div className="col-md-5 d-flex ">
                                <InputDecimal
                                  precision={2}
                                  value={chargeotherHemoblobin}
                                  className="form-control form-control-sm"
                                  placeholder="0.00"
                                  aria-label="Hemoglobin"
                                  id="hemoglobin"
                                  name="hemoglobin"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  onChangeValue={(value) => {
                                    setchargeotherHemoblobin(
                                      parseFloat(value)?.toFixed(2)
                                    );
                                  }}
                                  style={{ textAlign: "right" }}
                                />
                              </div>
                              <div className="col-md-5 d-flex">
                                <InputDecimal
                                  precision={2}
                                  value={chargeotherHematocrit}
                                  className="form-control form-control-sm"
                                  placeholder="0.00"
                                  aria-label="Hematocrit"
                                  id="hematocrit"
                                  name="hematocrit"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  onChangeValue={(value) => {
                                    setchargeotherHematocrit(
                                      parseFloat(value)?.toFixed(2)
                                    );
                                  }}
                                  style={{ textAlign: "right" }}
                                />
                              </div>
                            </div>

                            <div className="col-md-10 d-flex gap-2 mt-2">
                              <div className="col-md-5 d-flex ">
                                <input
                                  className={`form-control col-md-5  form-control-sm`}
                                  type="Number"
                                  placeholder="0"
                                  aria-label="Epoetin"
                                  id="epoetin"
                                  name="epoetin"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  maxLength={10}
                                  minLength={3}
                                  onChange={(e) =>
                                    setchargeotherEpostin(e.target.value)
                                  }
                                  value={
                                    chargeotherEpostin ? chargeotherEpostin : ""
                                  }
                                  style={{ textAlign: "right" }}
                                />
                              </div>
                              <div className="col-md-5 d-flex">
                                <input
                                  className={`form-control col-md-5  form-control-sm`}
                                  type="text"
                                  placeholder="Creatin"
                                  aria-label="creatin"
                                  id="creatin"
                                  name="creatin"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  maxLength={10}
                                  minLength={3}
                                  value={chargeotherCreat}
                                  onChange={(e) =>
                                    setchargeotherCreat(e.target.value)
                                  }
                                  style={{ textAlign: "right" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* ################################### Other ################ */}
                        <div className="card mb-2">
                          <div className="card-header">Other</div>
                          <div className="card-body ">
                            <div className="col-md-10 d-flex gap-2">
                              <div className="col-md-10 d-flex gap-2 mt-2">
                                <div className="col-md-5 d-flex flex-column">
                                  <div>
                                    <label htmlFor="">
                                      Anesthesia/Oxygen Minutes
                                    </label>
                                  </div>
                                  <input
                                    className={`form-control col-md-5  form-control-sm`}
                                    type="number"
                                    placeholder="0"
                                    aria-label="Anesthesia"
                                    id="anesthesia"
                                    name="anesthesia"
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    spellCheck="false"
                                    maxLength={10}
                                    minLength={3}
                                    value={chargeotherAnesthesia}
                                    onChange={(e) =>
                                      setchargeotherAnesthesia(e.target.value)
                                    }
                                    style={{ textAlign: "right" }}
                                  />
                                </div>
                                <div className="col-md-4 d-flex flex-column">
                                  <div>
                                    <label htmlFor="">Start Time</label>
                                  </div>
                                  <input
                                    className={`form-control col-md-5  form-control-sm`}
                                    type="time"
                                    placeholder=""
                                    aria-label="EndTime"
                                    id="endtime"
                                    name="endtime"
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    spellCheck="false"
                                    maxLength={10}
                                    minLength={3}
                                    value={chargeotherAneststartTime}
                                    onChange={(e) =>
                                      setchargeotherAneststartTime(
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-md-4 d-flex flex-column">
                                  <div>
                                    <label htmlFor="">End Time</label>
                                  </div>
                                  <input
                                    className={`form-control col-md-5  form-control-sm`}
                                    type="time"
                                    placeholder=""
                                    aria-label="EndTime"
                                    id="endtime"
                                    name="endtime"
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    spellCheck="false"
                                    maxLength={10}
                                    minLength={3}
                                    value={chargeotherAnestEndTime}
                                    onChange={(e) =>
                                      setchargeotherAnestEndTime(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-md-12 d-flex mt-3">
                              <input
                                className={`form-control form-control-sm`}
                                type="text"
                                placeholder="Narrative  Notes"
                                aria-label="Narrative"
                                id="narrative"
                                name="narrative"
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                maxLength={10}
                                minLength={3}
                                value={chargeotherNarrative}
                                onChange={(e) =>
                                  setchargeotherNarrative(e.target.value)
                                }
                              />
                            </div>

                            <div className="col-md-12 d-flex  gap-2  mt-3">
                              <div className="col-md-5 d-flex">
                                <input
                                  className={`form-control form-control-sm`}
                                  type="text"
                                  placeholder="CLIA #"
                                  aria-label="cli"
                                  id="cli"
                                  name="cli"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  maxLength={10}
                                  minLength={3}
                                  value={setchargeotherCLIA}
                                  onChange={(e) =>
                                    setchargeotherCLIA(e.target.value)
                                  }
                                />
                              </div>
                              <div>
                                <input
                                  className="form-check-input mx-2"
                                  type="checkbox"
                                  id="updatepatient"
                                  checked={chargeotherpatientICD}
                                  // value={chargeotherpatientICD == true ? 1 : 0}
                                  onClick={() => getHandleCheckbox()}
                                />
                                <label htmlFor="excludeCode mx-0">
                                  Update patient ICD & procedure Code defaults{" "}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Model footer */}
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      data-bs-target="#exampleModalToggle2"
                      data-bs-toggle="modal"
                      onClick={() => handleChargesOtherInfo()}
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
              {/* |----------------Patient Condition --------------------| */}
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
                        <label className="" htmlFor="">
                          Auto Accident
                        </label>
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
                        <label className="" htmlFor="">
                          Other Accident
                        </label>
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
                      <div className="col-md-12 d-flex mt-3">
                        <div className="col-md-5 mx-2">
                          <label htmlFor="">Accident/Illness Date</label>
                          <input
                            value={accidentIllnessDate}
                            onChange={(e) =>
                              setAccidentIllnessDate(e.target.value)
                            }
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
                            value={lastMentrualDate}
                            onChange={(e) =>
                              setlastMentrualDate(e.target.value)
                            }
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
                            value={initialTreatmentDate}
                            onChange={(e) =>
                              setInitialTreatmentDate(e.target.value)
                            }
                            type="date"
                            id="InitTreatmentDate"
                            name="InitTreatmentDate"
                            className="form-control form-control-sm"
                          />
                        </div>
                        <div className="col-md-5">
                          <label htmlFor="">Date Last Seen</label>
                          <input
                            value={dateLastSeen}
                            type="date"
                            onChange={(e) => setdateLastSeen(e.target.value)}
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
                            value={unbleToWorkFromDate}
                            onChange={(e) =>
                              setUnbleToWorkFromDate(e.target.value)
                            }
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
                            value={unbleToWorkToDate}
                            onChange={(e) =>
                              setunbleToWorkToDate(e.target.value)
                            }
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
                            onChange={patientIsHomeBoundHandler}
                            type="radio"
                            value={0}
                            checked={patientIsHomeBound == 0}
                            className="form-check-input mx-2"
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
                            onChange={patientIsHomeBoundHandler}
                            type="radio"
                            value={1}
                            checked={patientIsHomeBound == 1}
                            className="form-check-input mx-2"
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
              {/* ----------------Claim Information--------------------------------------------------- */}
              <div className="col-xl-11 mt-2">
                <div className="card mb-2">
                  <div className="card-header">Claim Information</div>
                  <div className="card-body ">
                    <div className="col-md-12">
                      <div className="col-md-10 d-flex ">
                        <div className="col-md-4">
                          <label htmlFor="">Claim Codes</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            id="claimcodes"
                            // autoComplete="off"
                            name="claimcodes"
                            onChange={() => setclaimCodes(e.target.value)}
                            // autoCapitalize="off"
                            // autoCorrect="off"
                            // spellCheck="false"
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
                            type="text"
                            className="form-control form-control-sm"
                            id="otherclaimid"
                            autoComplete="off"
                            name="otherclaimid"
                            onChange={(e) => setOtherClaimCodes(e.target.value)}
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
                          type="text"
                          className="form-control form-control-sm"
                          id="addClaimInfo"
                          autoComplete="off"
                          name="addClaimInfo"
                          onChange={(e) =>
                            setAdditionalClaimInfo(e.target.value)
                          }
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
                          onChange={(e) => setCliamNotes(e.target.value)}
                          type="text"
                          className="form-control form-control-sm"
                          id="claimnotes"
                          autoComplete="off"
                          name="claimnotes"
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
                          onChange={(e) =>
                            setResubmitReasoncodes(e.target.value)
                          }
                          type="text"
                          className="form-control form-control-sm"
                          id="resubmitReasonCode"
                          // autoComplete="off"
                          name="resubmitReasonCode"
                          // autoCapitalize="off"
                          // autoCorrect="off"
                          // spellCheck="false"
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
                          onChange={(e) => setDelayReasonCode(e.target.value)}
                        >
                          <option value="None" selected>
                            None
                          </option>
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
                          <option value="Original Claim Rejected or Denied Due to a Reason Unrelated to the Billing Limitation Rules">
                            Original Claim Rejected or Denied Due to a Reason
                            Unrelated to the Billing Limitation Rules
                          </option>
                          <option value="Administration Delay in the Prior Approval Process">
                            Administration Delay in the Prior Approval Process
                          </option>
                          <option value="Natural Disaster">
                            Natural Disaster
                          </option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="col-md-12 d-flex mt-2">
                        <div className="col-md-5 mx-2">
                          <label htmlFor="">Hospitalized From Date</label>
                          <input
                            value={haspitalFromDate}
                            onChange={(e) =>
                              sethaspitalFromDate(e.target.value)
                            }
                            type="date"
                            id="hospitalizedFromDate"
                            name="hospitalizedFromDate"
                            className="form-control form-control-sm"
                          />
                        </div>
                        <div className="col-md-5">
                          <label htmlFor="">Hospitalized To Date</label>
                          <input
                            value={haspitalToDate}
                            type="date"
                            onChange={(e) => sethaspitalToDate(e.target.value)}
                            placeholder="hre"
                            id="hospitalizedtoDate"
                            name="hospitalizedtoDate"
                            className="form-control form-control-sm"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 mt-2">
                        <label htmlFor="">Lab Charges</label>
                        <InputDecimal
                          precision={2}
                          value={labCharges}
                          className="form-control form-control-sm"
                          id="labCharges"
                          autoComplete="off"
                          name="labCharges"
                          onChangeValue={(value) => {
                            setLabCharges(parseFloat(value)?.toFixed(2));
                          }}
                          style={{ textAlign: "right" }}
                        />
                      </div>
                      <div className="col-md-10 mt-2">
                        <label htmlFor="">Special Program Code</label>
                        <select
                          id="defaultChargeStatus"
                          className="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                          onChange={(e) =>
                            setspecialProgramCode(e.target.value)
                          }
                        >
                          <option value=" " selected>
                            {" "}
                          </option>
                          <option value="Special Federal Funding">
                            Special Federal Funding
                          </option>
                          <option value="Disability">Disability</option>
                          <option value="Second Opinion/Surgery">
                            Second Opinion/Surgery
                          </option>
                          <option value="Physically Handicapped Children's Program">
                            Physically Handicapped Children's Program
                          </option>
                          <option value="Family Planning">
                            Family Planning
                          </option>
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
                            onChange={(e) =>
                              setpatientSignatureFile(e.target.value)
                            }
                          >
                            <option selected value={0}>
                              Informed Consent
                            </option>
                            <option value={1}>Yes</option>
                          </select>
                        </div>
                        <div className="col-md-5 mt-2 mx-2">
                          <label htmlFor="">Insured's Signature on File</label>
                          <select
                            id="defaultChargeStatus"
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            onChange={(e) =>
                              setInsuredSignatureFile(e.target.value)
                            }
                          >
                            <option selected value={0}>
                              No
                            </option>
                            <option value={1}>Yes</option>
                            {/* <option value={2}>Patient Refuses</option> */}
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
                            onChange={(e) =>
                              setproviderAcceptAss(e.target.value)
                            }
                          >
                            <option selected value={0}>
                              No
                            </option>
                            <option value={1}>Yes</option>
                            {/* <option value={2}>Default</option> */}
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
                            onChange={(e) =>
                              setDocumentationMethod(e.target.value)
                            }
                          >
                            <option value="No Documentation" selected>
                              No Documentation
                            </option>
                            <option value="Available on request at provider site">
                              Available on request at provider site
                            </option>
                            <option value="By Mail">By Mail</option>
                            <option value="Electronically">
                              Electronically
                            </option>
                            <option value="E-Mail">E-Mail</option>
                            <option value="Fax">Fax</option>
                          </select>
                        </div>
                        <div className="col-md-5 mt-2 mx-2">
                          <label htmlFor="">Documentation Type</label>
                          <select
                            onChange={(e) =>
                              setDocumentationType(e.target.value)
                            }
                            id="defaultChargeStatus"
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                          >
                            <option value=" " selected>
                              {" "}
                            </option>
                            <option value="Admission Summary">
                              Admission Summary
                            </option>
                            <option value="Allergies/Sensitivities Document">
                              Allergies/Sensitivities Document
                            </option>
                            <option value="Ambulance Certification">
                              Ambulance Certification
                            </option>
                            <option value="Autopsy Report">
                              Autopsy Report
                            </option>
                            <option value="Benchmark Testing Results">
                              Benchmark Testing Results
                            </option>
                            <option value="Blanket Test Results">
                              Blanket Test Results
                            </option>
                            <option value="Certification">Certification</option>
                            <option value="Certified Test Report">
                              Certified Test Report
                            </option>
                            <option value="Chemical Analysis">
                              Chemical Analysis
                            </option>
                            <option value="Chiropractic Justification">
                              Chiropractic Justification
                            </option>
                            <option value="Consent Form(s)">
                              Consent Form(s)
                            </option>
                            <option value="Continued Treatment">
                              Continued Treatment
                            </option>
                            <option value="Death Notification">
                              Death Notification
                            </option>
                            <option value="Dental Models">Dental Models</option>
                            <option value="Diagnostic Report">
                              Diagnostic Report
                            </option>
                            <option value="Discharge Monitoring Report">
                              Discharge Monitoring Report
                            </option>
                            <option value="Discharge Summary">
                              Discharge Summary
                            </option>
                            <option value="Drug Profile Document">
                              Drug Profile Document
                            </option>
                            <option value="Drugs Administered">
                              Drugs Administered
                            </option>
                            <option value="Durable Medical Equipment Prescription">
                              Durable Medical Equipment Prescription
                            </option>
                            <option value="Explanation of Benefits (Coordination of Benefits or Medicare Secondary Payor)">
                              Explanation of Benefits (Coordination of Benefits
                              or Medicare Secondary Payor)
                            </option>
                            <option value="Functional Goals">
                              Functional Goals
                            </option>
                            <option value="Health Certificate">
                              Health Certificate
                            </option>
                            <option value="Health Clinic Records">
                              Health Clinic Records
                            </option>
                            <option value="Immunization Record">
                              Immunization Record
                            </option>
                            <option value="Initial Assessment">
                              Initial Assessment
                            </option>
                            <option value="Justification for Admission">
                              Justification for Admission
                            </option>
                            <option value="Laboratory Results">
                              Laboratory Results
                            </option>
                            <option value="Medical Record Attachment">
                              Medical Record Attachment
                            </option>
                            <option value="Models">Models</option>
                            <option value="Nursing Notes">Nursing Notes</option>
                            <option value="Objective Physical Examination (including vital signs) Document">
                              Objective Physical Examination (including vital
                              signs) Document
                            </option>
                            <option value="Operative Note">
                              Operative Note
                            </option>
                            <option value="Orders and Treatments Document">
                              Orders and Treatments Document
                            </option>
                            <option value="Oxygen Content Averaging Report">
                              Oxygen Content Averaging Report
                            </option>
                            <option value="Oxygen Therapy Certification">
                              Oxygen Therapy Certification
                            </option>
                            <option value="Paramedical Results">
                              Paramedical Results
                            </option>
                            <option value="Parenteral or Enteral Certification">
                              Parenteral or Enteral Certification
                            </option>
                            <option value="Pathology Report">
                              Pathology Report
                            </option>
                            <option value="Patient Medical History Document">
                              Patient Medical History Document
                            </option>
                            <option value="Photographs">Photographs</option>
                            <option value="Physical Therapy Certification">
                              Physical Therapy Certification
                            </option>
                            <option value="Physical Therapy Notes">
                              Physical Therapy Notes
                            </option>
                            <option value="Physician Order">
                              Physician Order
                            </option>
                            <option value="Physician’s Report">
                              Physician’s Report
                            </option>
                            <option value="Plan of Treatment">
                              Plan of Treatment
                            </option>
                            <option value="Prescription">Prescription</option>
                            <option value="Progress Report">
                              Progress Report
                            </option>
                            <option value="Prosthetics or Orthotic Certification">
                              Prosthetics or Orthotic Certification
                            </option>
                            <option value="Radiology Films">
                              Radiology Films
                            </option>
                            <option value="Radiology Reports">
                              Radiology Reports
                            </option>
                            <option value="Recovery Plan">Recovery Plan</option>
                            <option value="Referral Form">Referral Form</option>
                            <option value="Renewable Oxygen Content Averaging Report">
                              Renewable Oxygen Content Averaging Report
                            </option>
                            <option value="Report Justifying Treatment Beyond Utilization Guidelines">
                              Report Justifying Treatment Beyond Utilization
                              Guidelines
                            </option>
                            <option value="Report of Tests and Analysis Report">
                              Report of Tests and Analysis Report
                            </option>
                            <option value="State School Immunization Records">
                              State School Immunization Records
                            </option>
                            <option value="Support Data for Claim">
                              Support Data for Claim
                            </option>
                            <option value="Symptoms Document">
                              Symptoms Document
                            </option>
                            <option value="Treatment Diagnosis">
                              Treatment Diagnosis
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-10 d-flex">
                        <div className="col-md-5 mt-2">
                          <label htmlFor="">Patient Weight (in)</label>
                          <input
                            onChange={(e) => setPatientWieghtIn(e.target.value)}
                            type="number"
                            className="form-control form-control-sm"
                            placeholder="0"
                            id="patientweightin"
                            autoComplete="off"
                            name="patientweightin"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={60}
                            style={{ textAlign: "right" }}
                          />
                        </div>
                        <div className="col-md-5 mt-2 mx-2">
                          <label htmlFor="">Patient Weight (lbs)</label>
                          <input
                            onChange={(e) =>
                              setPatientWieghtIbs(e.target.value)
                            }
                            type="number"
                            placeholder="0"
                            className="form-control form-control-sm"
                            id="patientweightlbs"
                            autoComplete="off"
                            name="patientweightlbs"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={60}
                            style={{ textAlign: "right" }}
                          />
                        </div>
                      </div>
                      <div className="col-md-10 mt-2">
                        <label htmlFor="">
                          Service Authorization Exception
                        </label>
                        <select
                          onChange={(e) =>
                            setServiceAuthorizationEx(e.target.value)
                          }
                          id="defaultChargeStatus"
                          className="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                        >
                          <option value=" " selected>
                            {" "}
                          </option>
                          <option value="Immediate/Urgent Care">
                            Immediate/Urgent Care
                          </option>
                          <option value="Services Rendered in a Retroactive Period">
                            Services Rendered in a Retroactive Period
                          </option>
                          <option value="Emergency Care">Emergency Care</option>
                          <option value="Client as Temporary Medicaid">
                            Client as Temporary Medicaid
                          </option>
                          <option value="Request from County for Second Opinion to Recipient can Work">
                            Request from County for Second Opinion to Recipient
                            can Work
                          </option>
                          <option value="Request for Override Pending">
                            Request for Override Pending
                          </option>
                          <option value="Special Handling">
                            Special Handling
                          </option>
                        </select>
                      </div>
                      <div className="col-md-10 mt-2">
                        <label htmlFor="">Demonstration Project</label>
                        <input
                          onChange={(e) =>
                            setDemonstrationProject(e.target.value)
                          }
                          type="text"
                          className="form-control form-control-sm"
                          id="demonsProj"
                          autoComplete="off"
                          name="demonsProj"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={60}
                        />
                      </div>
                      <div className="col-md-10 mt-2">
                        <label htmlFor="">Mammography Certification</label>
                        <input
                          onChange={(e) =>
                            setMemmographyCertication(e.target.value)
                          }
                          type="text"
                          className="form-control form-control-sm"
                          id="mammogrCertif"
                          autoComplete="off"
                          name="mammogrCertif"
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
                          onChange={(e) =>
                            setInvestigationDeviceExe(e.target.value)
                          }
                          type="text"
                          className="form-control form-control-sm"
                          id="investDevExemp"
                          autoComplete="off"
                          name="investDevExemp"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={60}
                        />
                      </div>
                      <div className="col-md-10 mt-2">
                        <label htmlFor="">Ambulatory Patient Group</label>
                        <input
                          onChange={(e) =>
                            setAmbulatoryPatientGroup(e.target.value)
                          }
                          type="text"
                          className="form-control form-control-sm"
                          id="AmbulPatGroup"
                          autoComplete="off"
                          name="AmbulPatGroup"
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
            {/* backend + checkbox states are remaining */}
            {/* ===================   AMBULANCE INFO FORM   ======================= */}
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
                    id="ambulanceclaimNo"
                  />
                  <label
                    className="form-check-label mt-1"
                    htmlFor="ambulanceclaimNo"
                  >
                    No
                  </label>
                  <input
                    className="form-check-input mx-2"
                    type="radio"
                    name="ambulanceclaim"
                    id="ambulanceclaimYes"
                  />
                  <label
                    className="form-check-label mt-1"
                    htmlFor="ambulanceclaimYes"
                  >
                    Yes
                  </label>
                </div>

                <div className="col-md-10 mt-2">
                  <label htmlFor="">Transport Reasons </label>
                  <select
                    id="transportreasons"
                    onChange={(e) => settransportReason(e.target.value)}
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected value="Transport to the nearest facility">
                      Transport to the nearest facility
                    </option>
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
                      onChange={(e) => settransportMiles(e.target.value)}
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      maxLength={10}
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
                      onChange={(e) => setpatientWeight(e.target.value)}
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      maxLength={10}
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
                    onChange={(e) => setRoundTripReason(e.target.value)}
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength={10}
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
                    onChange={(e) => setstrecherReason(e.target.value)}
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
                          onChange={(e) => setPickupAddress(e.target.value)}
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
                            onChange={(e) => setPickupCity(e.target.value)}
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
                            onChange={(e) => setPickupState(e.target.value)}
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
                            id="zipCode"
                            autoComplete="off"
                            name="state"
                            onChange={(e) => setPickupZipCode(e.target.value)}
                            placeholder="Zip Code"
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
                          onChange={(e) => setdropOffAdressName(e.target.value)}
                          placeholder="Name "
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
                          onChange={(e) => setDropOffAddress(e.target.value)}
                          placeholder=" "
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
                            onChange={(e) => setDropOffCity(e.target.value)}
                            placeholder=" City"
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
                            onChange={(e) => setDropOffState(e.target.value)}
                            placeholder=" State"
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
                            id="zipCode"
                            autoComplete="off"
                            name="zipCode"
                            onChange={(e) => setDropOffZipCode(e.target.value)}
                            placeholder="Zip Code"
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
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="col-md-4">Notes Here</div>
    </div>
  );
};
export default AddProfessionalClaim;
