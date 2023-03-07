import { useState, useEffect, useCallback } from "react";

// const ClaimDefaultInfo = lazy(() => import("./ClaimDefaultInfo"));
import { useNavigate, useParams } from "react-router-dom";
import { PatternFormat } from "react-number-format";
import { InputDecimal } from "react-input-decimal";
import { Table } from "react-bootstrap";
import validator from "validator";

import { useDispatch, useSelector } from "react-redux";
import API from "../../../Api/ClientApi";
import { Alert } from "../../../GLOBAL/SwalAlert";
import { useFormik } from "formik";
import {
  getEditPatientZipCode,
  getEditPatientZipCode2,
  getEditPatientZipCode3,
  getEditPatientZipCode_InsuredData,
  getEditPatientZipCode_InsuredData2,
  PatientEditCity_stateFetch,
  PatientEditCity_stateFetch2,
  PatientEditCity_stateFetch3,
  PatientEditCity_stateFetch4,
  PatientEditCity_stateFetch5,
} from "../../../Redux/features/Patient/Patient_City_State";
import useFetch from "../../../Hooks/useFetch";
import { EditPatientFetch } from "../../../Redux/features/Patient/Patient_EditableSlice";
import { FormValPat } from "./FormValPat";

const EditablePatient = () => {
  const [image, setImage] = useState({ preview: "", raw: "" });
  const navigate = useNavigate();
  // change image
  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };
  // Setting all field values
  const dispatch = useDispatch();
  function validateEmail() {
    if (validator.isEmail(email_contact)) {
      return true;
    } else if (email_contact === "") {
      return true;
    } else {
      alert("Please enter a valid e-mail address");
      return false;
    }
  }
  function validateEmail_emergency() {
    if (validator.isEmail(email_emergencycontact)) {
      return true;
    } else if (email_emergencycontact === "") {
      return true;
    } else {
      alert("Please enter a valid e-mail address in emergency contact");
      return false;
    }
  }
  function validateEmail_Insurance() {
    if (validator.isEmail(Email_Insurance)) {
      return true;
    } else if (Email_Insurance === "") {
      return true;
    } else {
      alert("Please enter a valid e-mail address in Insurance info");
      return false;
    }
  }
  function validateEmail_Billing() {
    if (validator.isEmail(Email_billing)) {
      return true;
    } else if (Email_billing === "") {
      return true;
    } else {
      alert("Please enter a valid e-mail address in Billing info");
      return false;
    }
  }
  // Race API
  const { data: raceapi } = useFetch("patient/race");
  // **************************** From Redux Thunk (from API) Start ****************************
  const editpatientID = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.id
  );
  // -------------------- Start Basic Information (on Top) -------------------- //
  const patient_status = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_status
  );
  const first_name_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.first_name
  );
  const last_name_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.last_name
  );
  const MI_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.mi
  );
  const suffix_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.suffix
  );
  const gender_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.gender
  );
  const dob_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.dob
  );
  const dod_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.dod
  );
  const ssn_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.ssn
  );
  const patient_Types = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_types
  );
  const reference_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.reference
  );
  // -------------------- End Basic Information (on Top) -------------------- //

  // -------------------- Start Contact Information -------------------- //
  const address1_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.address1
  );
  const address2_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.address2
  );
  const city_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.city
  );
  const state_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.state
  );
  const zip_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.zip
  );

  const homephone_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.home_phone
  );
  const cellphone_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.cell_phone
  );
  const workphone_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.work_phone
  );

  const ext_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.ext
  );
  const email_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.email
  );
  // -------------------- End Contact Information -------------------- //

  // -------------------- Start of Other -------------------- //
  const driver_license_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.driver_license
  );

  const marital_status_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.marital_status
  );
  const student_status_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.student_status
  );
  const employment_status_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.employment_status
  );

  const residence_type_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.residence_type
  );
  const account_prefix_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.account_prefix
  );
  const preferred_language_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.preferred_language
  );
  const other_info_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.other_info
  );
  // -------------------- End of Other -------------------- //

  // -------------------- Start of Meaningful Use -------------------- //
  const ethnicity_id_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.ethnicity_id
  );
  const language_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.language
  );
  const race_id_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.race_id
  );

  // -------------------- End of Meaningful Use -------------------- //

  // -------------------- Start of Emergency Contact -------------------- //
  const rel_to_patient_patientinfo = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.emergency_contact_relation
  );
  const perm_to_speak_patient = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.permission_speak
  );
  const emergency_lname = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.emergency_lname
  );
  const emergency_fname = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.emergency_fname
  );
  const emergency_mi = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.emergency_mi
  );
  const emergency_address1 = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.emergency_address1
  );
  const emergency_address2 = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.emergency_address2
  );
  const emergency_city_patientinfo = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.emergency_city
  );
  const emergency_state_patientinfo = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.emergency_state
  );
  const emergency_zip_patientinfo = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.emergency_zip
  );
  const emergency_home = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.emergency_home
  );
  const emergency_cell = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.emergency_cell
  );
  const emergency_work_phone = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.emergency_work_phone
  );
  const emergency_email = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.emergency_email
  );
  const emergency_remarks = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.remarks
  );
  const emergency_referral_source = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.referral_source
  );
  // -------------------- End of Emergency Contact -------------------- //

  // -------------------- Start of Billing Info Section -------------------- //

  const statment_type_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_billing_info?.statment_type
  );
  const send_statement_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_billing_info?.send_statement
  );
  const mail_statement_to_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_billing_info?.mail_statement_to
  );
  const patient_comment_print_statement_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_billing_info
        ?.patient_comment_print_statement
  );
  const patient_comment_auto_statement_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_billing_info
        ?.patient_comment_auto_statement
  );
  const send_final_demand_notice_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_billing_info
        ?.send_final_demand_notice
  );

  const collection_date_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_billing_info?.collection_date
  );
  const collection_reason_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_billing_info?.collection_reason
  );
  // -------------------- Start of Billing Info Guarantor -------------------- //
  const rel_to_pat_billing_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_billing_guarantor?.relationship
  );
  const first_name_guarantor_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_billing_guarantor?.first_name
  );
  const last_name_guarantor_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_billing_guarantor?.last_name
  );
  const MI_guarantor_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_billing_guarantor?.mi
  );
  const Address1_guarantor_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_billing_guarantor?.address1
  );
  const Address2_guarantor_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_billing_guarantor?.address2
  );
  const city_guarantor_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_billing_guarantor?.city
  );
  const state_guarantor_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_billing_guarantor?.state
  );
  const zipcode_guarantor_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_billing_guarantor?.zip
  );
  const homephone_guarantor_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_billing_guarantor?.home_phone
  );
  const cellphone_guarantor_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_billing_guarantor?.cell
  );
  const workphone_guarantor_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_billing_guarantor?.work_phone
  );
  const email_guarantor_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_billing_guarantor?.email
  );
  const remarks_guarantor_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_billing_guarantor?.remarks
  );
  // -------------------- End of Billing Info Guarantor -------------------- //

  // -------------------- End of Billing Info Section -------------------- //

  // -------------------- Start of Claim Defaults Section -------------------- //

  // IDs
  const default_provider_id_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.default_provider_id
  );
  const practice_location_id_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.default_provider?.default_provider_practice?.practice
        ?.practice_location?.practice_location_id
  );
  const ordering_provider_id_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.ordering_provider_id
  );
  const facility_id_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default?.facility_id
  );
  const referring_provider_id_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.referring_provider_id
  );
  const sales_representative_id_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.sales_representative_id
  );
  // Default Provider Names
  const default_provider_fname_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.default_provider?.first_name
  );
  const default_provider_lname_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.default_provider?.last_name
  );
  const default_provider_orgname_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.default_provider?.organization_name
  );
  const default_provider_npi_code_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.default_provider?.npi_code
  );
  const default_provider_sequence_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.default_provider?.sequence?.id
  );
  // Default Practice location Names
  const default_practice_location_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.default_provider?.default_provider_practice?.practice
        ?.practice_location?.name
  );
  const default_practice_name_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.default_provider?.default_provider_practice?.practice?.name
  );
  // Default Ordering Provider (aka Referring Provider)
  const default_ordering_provider_fname_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.ordering_provider?.first_name
  );
  const default_ordering_provider_lname_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.ordering_provider?.last_name
  );
  const default_ordering_provider_orgname_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.ordering_provider?.organization_name
  );
  // Default Referring Provider
  const default_referring_provider_fname_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.referring_provider?.first_name
  );
  const default_referring_provider_lname_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.referring_provider?.last_name
  );
  const default_referring_provider_orgname_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.referring_provider?.organization_name
  );

  // Default Sales Rep (aka Referring Provider)

  const default_sales_rep_fname_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.sales_representative?.first_name
  );
  const default_sales_rep_lname_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.sales_representative?.last_name
  );
  const default_sales_rep_orgname_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.sales_representative?.organization_name
  );
  // Default Facility
  const facility_name_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default?.facility
        ?.facility_name
  );

  const assignment_benefits_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.assignment_benefits
  );
  const provider_accept_assignment_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.provider_accept_assignment
  );
  const include_accident_illness_claim_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.include_accident_illness_claim
  );

  const illness_accident_date_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.illness_accident_date
  );
  const accident_state_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default?.accident_state
  );
  const accident_type_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default?.accident_type
  );
  const box_11b_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default?.box_11b
  );
  const box_19_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_claims_default?.box_19
  );
  const last_menstrual_date_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.last_menstrual_date
  );
  const admission_date_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default?.admission_date
  );
  const initial_treatment_date_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.initial_treatment_date
  );
  // --------------------- Codes (Start) --------------------- //
  const icd1_ID_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_claims_default?.icd1
  );
  const icd1_code_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default?.icd1_code
  );
  const icd2_ID_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_claims_default?.icd2
  );
  const icd2_code_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default?.icd2_code
  );
  const icd3_ID_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_claims_default?.icd3
  );
  const icd3_code_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default?.icd3_code
  );
  const icd4_ID_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_claims_default?.icd4
  );
  const icd4_code_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default?.icd4_code
  );
  const icd5_ID_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_claims_default?.icd5
  );
  const icd5_code_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default?.icd5_code
  );
  const icd6_ID_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_claims_default?.icd6
  );
  const icd6_code_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default?.icd6_code
  );
  const icd7_ID_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_claims_default?.icd7
  );
  const icd7_code_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default?.icd7_code
  );
  const icd8_ID_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_claims_default?.icd8
  );
  const icd8_code_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default?.icd8_code
  );

  const icd9_ID_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_claims_default?.icd9
  );
  const icd9_code_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default?.icd9_code
  );
  const icd10_ID_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_claims_default?.icd10
  );
  const icd10_code_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default?.icd10_code
  );
  const icd11_ID_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_claims_default?.icd11
  );
  const icd11_code_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default?.icd11_code
  );
  const icd12_ID_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_claims_default?.icd12
  );
  const icd12_code_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default?.icd12_code
  );
  const procedure_code_id1_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.procedure_code_id1
  );
  const procedure_code1_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default?.procedure_code1
  );
  const procedure_code_id2_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.procedure_code_id2
  );
  const procedure_code2_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default?.procedure_code2
  );
  const procedure_code_id3_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.procedure_code_id3
  );
  const procedure_code3_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default?.procedure_code3
  );
  const procedure_code_id4_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.procedure_code_id4
  );
  const procedure_code4_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default?.procedure_code4
  );
  const procedure_code_id5_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.procedure_code_id5
  );
  const procedure_code5_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default?.procedure_code5
  );
  const procedure_code_id6_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default
        ?.procedure_code_id6
  );
  const procedure_code6_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_claims_default?.procedure_code6
  );
  // --------------------- Codes (End) --------------------- //
  // -------------------- End of Claim Defaults Section -------------------- //

  // -------------------- Start of Insurance Info Section -------------------- //
  const payer_name_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_payer?.primary_payer
        ?.payer_name
  );
  const relation_insured_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_payer?.relation_insured
  );
  const insured_lname_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_payer?.insured_lname
  );
  const insured_fname_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_payer?.insured_fname
  );
  const insured_mi_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_payer?.insured_mi
  );
  const insured_suffix_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_payer?.insured_suffix
  );
  const insured_gender_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_payer?.insured_gender
  );
  const insured_dob_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_payer?.insured_dob
  );
  const insured_ssn_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_payer?.insured_ssn
  );

  const insured_address1_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_payer?.insured_address1
  );
  const insured_address2_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_payer?.insured_address2
  );
  const insured_city_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_payer?.insured_city
  );
  const insured_state_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_payer?.insured_state
  );
  const insured_zip_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_payer?.insured_zip
  );
  const insured_hphone_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_payer?.insured_hphone
  );
  const insured_cell_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_payer?.insured_cell
  );
  const insured_workphone_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_payer?.insured_workphone
  );
  const insured_ext_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_payer?.insured_ext
  );
  const insured_email_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_payer?.insured_email
  );
  const insured_3rdPartyAdmin_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_payer?.insured_3rdPartyAdmin
  );
  const insured_phone_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_payer?.insured_phone
  );
  const insured_emp_status_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_payer?.insured_emp_status
  );
  const insured_emp_name_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_payer?.insured_emp_name
  );
  const insured_emp_address1_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_payer?.insured_emp_address1
  );
  const insured_emp_address2_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_payer?.insured_emp_address2
  );
  const insured_emp_city_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_payer?.insured_emp_city
  );
  const insured_emp_state_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_payer?.insured_emp_state
  );
  const insured_emp_zip_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_payer?.insured_emp_zip
  );

  const priority_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_payer?.priority
  );
  const policy_type_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_payer?.policy_type
  );
  const payer_id_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_payer?.payer_id
  );
  const member_id_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_payer?.member_id
  );
  const group_id_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_payer?.group_id
  );
  const copay_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_payer?.copay
  );
  const co_insurance_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_payer?.co_insurance
  );
  const deductible_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_payer?.deductible
  );
  const out_pocket_max_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_payer?.out_pocket_max
  );
  const effective_date_api = useSelector(
    (state) => state?.Patient_Editable.data?.[0]?.patient_payer?.effective_date
  );
  const termination_date_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_payer?.termination_date
  );

  const patient_is_insured_api = useSelector(
    (state) =>
      state?.Patient_Editable.data?.[0]?.patient_payer?.patient_is_insured
  );
  // -------------------- End of Insurance Info Section -------------------- //

  // **************************** From Redux Thunk (from API) End ****************************

  // -------------------- Start of Basic Information (states) -------------------- //
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [MI, setMI] = useState("");
  const [suffix, setSuffix] = useState("");
  const [gender, setGender] = useState("");
  const [DOB, setDOB] = useState("");
  const [DOD, setDOD] = useState("");
  const [SSN, setSSN] = useState("");
  const [inactivePatient, SetinactivePatient] = useState(false);
  // -------------------- End of Basic Information -------------------- //

  var today = new Date();
  var birthDate = new Date(DOB);

  // Calculate years
  var years;
  if (
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() == birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate())
  ) {
    years = today.getFullYear() - birthDate.getFullYear();
  } else {
    years = today.getFullYear() - birthDate.getFullYear() - 1;
  }

  // Calculate months
  var months;
  if (today.getDate() >= birthDate.getDate()) {
    months = today.getMonth() - birthDate.getMonth();
  } else if (today.getDate() < birthDate.getDate()) {
    months = today.getMonth() - birthDate.getMonth() - 1;
  }
  // make month positive
  months = months < 0 ? months + 12 : months;

  // Calculate days
  var days;
  // days of months in a year
  var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (today.getDate() >= birthDate.getDate()) {
    days = today.getDate() - birthDate.getDate();
  } else {
    days =
      today.getDate() - birthDate.getDate() + monthDays[birthDate.getMonth()];
  }

  // *************************
  const [patient_type, setPatient_type] = useState("Insurance");
  const [referencenum, setReferenceNum] = useState("");
  const [Address_contact, setAddress_contact] = useState("");
  const [Address2_contact, setAddress2_contact] = useState("");
  const [homephone_contact, setHomePhone_contact] = useState("");
  const [cellphone_contact, setcellphone_contact] = useState("");
  const [workphone_contact, setworkphone_contact] = useState("");
  const [ext_contact, setExt_contact] = useState("");
  const [email_contact, setEmail_contact] = useState("");
  const [driver_license, setDriverLicense] = useState("");
  const [marital_status, setmarital_status] = useState("Married");
  const [student_status, setstudent_status] = useState("Not a Student");
  const [employment_status, setemployment_status] =
    useState("Employed full-time");
  const [residence_type, setResidence_type] = useState("Nursing Home");
  const [account_prefix, setAccount_prefix] = useState("");
  const [prefered_language, setPrefered_language] = useState("");
  const [other_info, setother_info] = useState("");
  const [ethnicityID, setEthnicityID] = useState("");
  const [language, setLanguage] = useState("English");
  const [race, setRace] = useState(1);
  const [rel_to_patient, setrel_to_patient] = useState("None");
  const [rel_to_patient_guarantor, setrel_to_patient_guarantor] =
    useState("None");
  const [perm_to_speak, setperm_to_speak] = useState(1);
  const [last_name_emergency, setlast_name_emergency] = useState("");
  const [first_name_emergency, setfirst_name_emergency] = useState("");
  const [MI_emergency, setMI_emergency] = useState("");
  const [address_emergency, setaddress_emergency] = useState("");
  const [address2_emergency, setaddress2_emergency] = useState("");
  const [homephone_emergencycontact, setHomePhone_emergencycontact] =
    useState("");
  const [cellphone_emergencycontact, setcellphone_emergencycontact] =
    useState("");
  const [workphone_emergencycontact, setworkphone_emergencycontact] =
    useState("");
  const [email_emergencycontact, setemail_emergencycontact] = useState("");
  const [remarks_emergencycontact, setRemarks_emergencycontact] = useState("");
  const [referel_emergencycontact, setReferel_emergencycontact] = useState("");

  // Billing info Start
  const [sendStatement, setSendStatement] = useState(true);
  const [statement_type, setstatement_type] = useState(0);
  const [mailStatement, setmailStatement] = useState("Primary Insured");
  const [patient_comment, setPatient_comment] = useState("");
  const [patient_comment2, setpatient_comment2] = useState("");
  const [finaldemandnotice, setfinaldemandnotice] = useState(false);
  const [CollectionDate, setCollectionDate] = useState("");
  const [collectionreason, setcollectionreason] = useState("");
  const [billingLastName, setbillingLastName] = useState("");
  const [billingFirstName, setbillingFirstName] = useState("");
  const [billingMI, setbillingMI] = useState("");
  const [billingAddress1, setbillingAddress1] = useState("");
  const [billingAddress2, setbillingAddress2] = useState("");
  const [HomePhone_billinginfo, setHomePhone_billinginfo] = useState("");
  const [CellPhone_billinginfo, setCellPhone_billinginfo] = useState("");
  const [WorkPhone_billinginfo, setWorkPhone_billinginfo] = useState("");
  const [Email_billing, setEmail_billing] = useState("");
  const [remarks_billing, setRemarks_billing] = useState("");
  // Zip API
  const zipapi = useSelector(
    (state) => state?.PatientCityState?.zipcode_editable?.ZipCode?.Zip5
  );
  const zipapiCity = useSelector(
    (state) => state?.PatientCityState?.zipcode_editable?.ZipCode?.City
  );
  const zipapiState = useSelector(
    (state) => state?.PatientCityState?.zipcode_editable?.ZipCode?.State
  );

  // Zip API2
  const zipapi2 = useSelector(
    (state) => state?.PatientCityState?.zipcode2_editable?.ZipCode?.Zip5
  );
  const zipapiCity2 = useSelector(
    (state) => state?.PatientCityState?.zipcode2_editable?.ZipCode?.City
  );
  const zipapiState2 = useSelector(
    (state) => state?.PatientCityState?.zipcode2_editable?.ZipCode?.State
  );
  // Set Zip API
  const [zipapicode, setzipapicode] = useState("");
  const [zipapi_city, setzipapi_city] = useState("");
  const [zipapi_state, setzipapi_state] = useState("");

  const [emergencyZip, setemergencyZip] = useState("");
  const [emergency_city, setemergency_city] = useState("");
  const [emergency_state, setemergency_state] = useState("");

  // Zip API
  const zipapi3 = useSelector(
    (state) => state?.PatientCityState?.zipcode3_editable?.ZipCode?.Zip5
  );
  const zipapiCity3 = useSelector(
    (state) => state?.PatientCityState?.zipcode3_editable?.ZipCode?.City
  );
  const zipapiState3 = useSelector(
    (state) => state?.PatientCityState?.zipcode3_editable?.ZipCode?.State
  );
  // Set Zip API
  const [zipapicode3, setzipapicode3] = useState("");
  const [zipapi_city3, setzipapi_city3] = useState("");
  const [zipapi_state3, setzipapi_state3] = useState("");

  const zipapi_insured = useSelector(
    (state) =>
      state?.PatientCityState?.zipcode_insured_data1_editable?.ZipCode?.Zip5
  );
  const zipapiCity_insured = useSelector(
    (state) =>
      state?.PatientCityState?.zipcode_insured_data1_editable?.ZipCode?.City
  );
  const zipapiState_insured = useSelector(
    (state) =>
      state?.PatientCityState?.zipcode_insured_data1_editable?.ZipCode?.State
  );

  // Zip API 2
  const zipapi_employee_info = useSelector(
    (state) =>
      state?.PatientCityState?.zipcode_insured_data2_employee_info_editable
        ?.ZipCode?.Zip5
  );
  const zipapiCity_employee_info = useSelector(
    (state) =>
      state?.PatientCityState?.zipcode_insured_data2_employee_info_editable
        ?.ZipCode?.City
  );
  const zipapiState_employee_info = useSelector(
    (state) =>
      state?.PatientCityState?.zipcode_insured_data2_employee_info_editable
        ?.ZipCode?.State
  );
  // Set Zip API
  const [zipapicode_insured_party, setzipapicode_insured_party] = useState("");
  const [zipapi_city_insured_party, setzipapi_city_insured_party] =
    useState("");
  const [zipapi_state_insured_party, setzipapi_state_insured_party] =
    useState("");
  // Zip in Eployee Info
  const [zipapicode_employee_info, setzipapicode_employee_info] = useState("");
  const [zipapi_city_employee_info, setzipapi_city_employee_info] =
    useState("");
  const [zipapi_state_employee_info, setzipapi_state_employee_info] =
    useState("");
  // const Zip1 = () => {
  //   if (city_patient || state_patient || zip_patient) {
  //     setzipapicode(zip_patient);
  //     setzipapi_city(city_patient);
  //     setzipapi_state(state_patient);
  //   } else if (zipapi || zipapiCity || zipapiState) {

  //   }
  // };

  const params = useParams();

  // ****************************** Insurance Info States Start ********************************* //
  const [patient_rel_insured_party, setpatient_rel_insured_party] =
    useState("Unknown");
  const [lastname_insured_party, setlastname_insured_party] = useState("");
  const [firstname_insured_party, setfirstname_insured_party] = useState("");
  const [MI_insured_party, setMI_insured_party] = useState("");
  const [Suffix_insured_party, setSuffix_insured_party] = useState("");
  const [gender_insured_party, setGender_insured_party] = useState("");
  const [DOB_insured_party, setDOB_insured_party] = useState("");
  const [SSN_insured_party, setSSN_insured_party] = useState("");
  const [Address1_insured_party, setAddress1_insured_party] =
    useState(Address_contact);
  const [Address2_insured_party, setAddress2_insured_party] =
    useState(Address2_contact);

  const [HomePhone_Insuranceinfo, setHomePhone_Insuranceinfo] = useState("");
  const [CellPhone_Insuranceinfo, setCellPhone_Insuranceinfo] = useState("");
  const [WorkPhone_Insuranceinfo, setWorkPhone_Insuranceinfo] = useState("");
  const [Phone_Insuranceinfo, setPhone_Insuranceinfo] = useState("");
  const [Email_Insurance, setEmail_Insurance] = useState("");
  const patient_rel = [
    {
      value: "Unknown",
    },
    {
      value: "Spouse",
    },
    {
      value: "Child",
    },
    {
      value: "Other (individual)",
    },
    {
      value: "Other (Organization)",
    },
    {
      value: "Employee",
    },
  ];
  const [ext_contact_insured_party, setExt_Insured_party] = useState("");
  const [thirdparty_insured_party, setthirdparty_Insured_party] = useState("");
  const [employee_status, setEmployeeStatus] = useState("Employed full-time");
  const employeestatus = [
    {
      value: "Employed full-time",
    },

    {
      value: "Employed part-time",
    },
    {
      value: "Not employed",
    },
    {
      value: "Self employed",
    },
    {
      value: "Retired",
    },
    {
      value: "On active military duty",
    },
    {
      value: "Unknown",
    },
  ];
  const [Name_employee_info, setName_employee_info] = useState("");
  const [Address1_employee_info, setAddress1_employee_info] = useState("");
  const [Address2_employee_info, setAddress2_employee_info] = useState("");
  //
  const { data: payermodaldata } = useFetch("customersetup/payer");
  const [PayerSearch, setPayerSearch] = useState("");
  //
  const [showCard, setshowCard] = useState(false);
  const [showInsuranceCard, setshowInsuranceCard] = useState(false);
  const AddNewInsurance = () => {
    lastname_insured_party ? setshowCard(true) : alert("Last Name is required");

    payer && memberID
      ? setshowInsuranceCard(true)
      : setshowInsuranceCard(false);
  };
  const [Inactivate, setInactivate] = useState("");
  const [Inactivate_primary, setInactivate_primary] = useState("");
  const Activate = () => {
    if (Inactivate === "") {
      setInactivate("(INACTIVE)");
    } else {
      setInactivate("");
    }
  };
  const Activate_Primary = () => {
    if (Inactivate_primary === "") {
      setInactivate_primary("(INACTIVE)");
    } else {
      setInactivate_primary("");
    }
  };
  // **************************** End of Insured Party Values ****************************

  // **************************** Start of Payer Info Values ****************************

  const PolicyType = [
    {
      policy: "Auto Insurance Policy",
    },
    {
      policy: "Group Policy",
    },
    {
      policy: "Individual Policy",
    },
    {
      policy: "Long Term Policy",
    },
    {
      policy: "Litigation",
    },
    {
      policy: "-----",
    },
    {
      policy: "Medicare Primary",
    },
    {
      policy: "Other",
    },
    {
      policy: "Self Payment (Cash - No Insurance)",
    },
    {
      policy: "Supplemental Policy",
    },
  ];
  const [priority, setPriority] = useState(0);
  const [policy_type, setPolicy_type] = useState("Other");
  const [payer, setPayer] = useState("");
  const [payerID, setPayerID] = useState("");
  const [memberID, setMemeberID] = useState("");
  const [groupID, setGroupID] = useState("");

  const [copay, setCopay] = useState(0);

  const [co_insurance, setco_insurance] = useState(0);

  const [deductible, setdeductible] = useState(0);
  const [OutOfPocket, setOutOfPocket] = useState(0);
  const [effectiveDate, seteffectiveDate] = useState("");
  const [terminationDate, setterminationDate] = useState("");

  // **************************** End of Payer Info Values ****************************

  // *********************************** End Insurance info States ***********************************************

  // ********************************** Start of Claim Defaults *******************************************
  const { data: provide, loading: loadprov } = useFetch(
    "patient/providerPractice"
  );
  const { data: recentreferringproviders, loading: loadref } = useFetch(
    "customersetup/referringprovider"
  );
  const { data: facility, loading: loadfacilitydata } = useFetch(
    "customersetup/facility"
  );
  const { data: ICD_data, loading: load_ICDs } = useFetch(
    "common/function/diagnosis/code"
  );

  const { data: CPT_data, loading: load_CPTs } = useFetch(
    "common/function/procedure/code"
  );
  // const navigate = useNavigate();
  const ToEditableFacilityForm = useCallback(
    // Goto User Editable form
    (id) => {
      navigate(`/editablefacility/${id}`, { replace: true });
    },
    [navigate]
  );

  const [defaultprovider, setDefaultProvider] = useState("");
  const [defaultproviderNPI, setDefaultProviderNPI] = useState("");
  const [defaultpractice, setdefaultpractice] = useState("");
  const [officelocationID, setofficelocationID] = useState("");
  const [officelocationName, setofficelocationName] = useState("");

  // IDs of all
  const [defaultOrderingproviderID, setdefaultOrderingproviderID] =
    useState("");
  const [DefaultRefProviderID, setDefaultRefProviderID] = useState("");
  const [defaultSalesRepID, setdefaultSalesRepID] = useState("");

  const [DefaultProviderID, setDefaultProviderID] = useState("");
  const [DefaultProviderPractID, setDefaultProviderPractID] = useState(1);

  // search field
  const [RefSearch, setSearchRefProvider] = useState("");
  const [searchprovider, setSearchProvider] = useState("");
  const [search, setSearchDefaultFacility] = useState("");
  const [SearchdefaultSalesRep, setSearchdefaultSalesRep] = useState("");
  const [DefaultRefSearch, setSearchDefaultRefProvider] = useState("");
  const [showprovider, setshowprovider] = useState(true);
  //** */

  // *** Values ***

  const [defaultOrderingprovider, setdefaultOrderingprovider] = useState("");
  const [DefaultFacility, setDefaultFacility] = useState("");

  const [DefaultRef, setDefaultRefProvider] = useState("");
  const [defaultSalesRep, setdefaultSalesRep] = useState("");
  const [Assignment_of_Benefits, setAssignment_of_Benefits] = useState(
    "Signed signature authorization form or forms for both Box 12 and Box 13 are on file"
  );
  const [provider_accepts_assignments, setprovider_accepts_assignments] =
    useState("Use the default accept assignment for the provider");
  const [Include_accident_illness_info, setInclude_accident_illness_info] =
    useState(false);
  const [Accident_Date, setAccident_Date] = useState("");
  const [Accident_State, setAccident_State] = useState("");
  const [Accident_type, setAccident_type] = useState("");
  const [Box_11b_ClaimDefaults, setBox_11b_ClaimDefaults] = useState("");
  // (Not to Call Under API call)
  const [ICDStatus, setICDStatus] = useState("");
  const [CPTStatus, setCPTStatus] = useState("");
  const [DefaultFacilityID, setDefaultFacilityID] = useState("");
  // **************************** ICD Values (to post API) *********************************
  const [ICD_A, setICD_A] = useState("");
  const [ICD_B, setICD_B] = useState("");
  const [ICD_C, setICD_C] = useState("");
  const [ICD_D, setICD_D] = useState("");
  const [ICD_E, setICD_E] = useState("");
  const [ICD_F, setICD_F] = useState("");
  const [ICD_G, setICD_G] = useState("");
  const [ICD_H, setICD_H] = useState("");
  const [ICD_I, setICD_I] = useState("");
  const [ICD_J, setICD_J] = useState("");
  const [ICD_K, setICD_K] = useState("");
  const [ICD_L, setICD_L] = useState("");
  // CPT States
  const [CPT_1, setCPT_1] = useState("");
  const [CPT_2, setCPT_2] = useState("");
  const [CPT_3, setCPT_3] = useState("");
  const [CPT_4, setCPT_4] = useState("");
  const [CPT_5, setCPT_5] = useState("");
  const [CPT_6, setCPT_6] = useState("");
  // **************************** ICD Values (to post API) *********************************
  const [ICD_A_ID, setICD_A_ID] = useState("");
  const [ICD_B_ID, setICD_B_ID] = useState("");
  const [ICD_C_ID, setICD_C_ID] = useState("");
  const [ICD_D_ID, setICD_D_ID] = useState("");
  const [ICD_E_ID, setICD_E_ID] = useState("");
  const [ICD_F_ID, setICD_F_ID] = useState("");
  const [ICD_G_ID, setICD_G_ID] = useState("");
  const [ICD_H_ID, setICD_H_ID] = useState("");
  const [ICD_I_ID, setICD_I_ID] = useState("");
  const [ICD_J_ID, setICD_J_ID] = useState("");
  const [ICD_K_ID, setICD_K_ID] = useState("");
  const [ICD_L_ID, setICD_L_ID] = useState("");
  // CPT States
  const [CPT_1_ID, setCPT_1_ID] = useState("");
  const [CPT_2_ID, setCPT_2_ID] = useState("");
  const [CPT_3_ID, setCPT_3_ID] = useState("");
  const [CPT_4_ID, setCPT_4_ID] = useState("");
  const [CPT_5_ID, setCPT_5_ID] = useState("");
  const [CPT_6_ID, setCPT_6_ID] = useState("");
  const [Box_19_ClaimDefaults, setBox_19_ClaimDefaults] = useState("");
  const [
    last_menstrual_date_claimDefaults,
    setlast_menstrual_date_claimDefaults,
  ] = useState("");
  const [admission_Date_ClaimDefaults, setadmission_Date_ClaimDefaults] =
    useState("");
  const [initial_Treatment_Date, setinitial_Treatment_Date] = useState("");
  // Search ICD or CPT
  const [searchICD, setsearchICD] = useState("");
  const [searchCPT, setsearchCPT] = useState("");

  const ICD_fields = [
    {
      type: "text",
      placeholder: "ICD A",
      id: "ICD_A",
      name: "ICD_A",
      autoComplete: "off",
      autoCapitalize: "off",
      autoCorrect: "off",
      spellCheck: false,
      maxLength: 10,
      minLength: 10,
      data_bs_toggle: "modal",
      data_bs_target: "#DefaultCodesModel",
      btn_ID: "ICD_A_btn",
      ICD_Status: "ICD_A_Status",
      value: ICD_A,
    },
    {
      type: "text",
      placeholder: "ICD B",
      id: "ICD_B",
      name: "ICD_B",
      autoComplete: "off",
      autoCapitalize: "off",
      autoCorrect: "off",
      spellCheck: false,
      maxLength: 10,
      minLength: 10,
      btn_ID: "ICD_B_btn",
      ICD_Status: "ICD_B_Status",
      value: ICD_B,

      data_bs_toggle: "modal",
      data_bs_target: "#DefaultCodesModel",
    },
    {
      type: "text",
      placeholder: "ICD C",
      id: "ICD_C",
      name: "ICD_C",
      autoComplete: "off",
      autoCapitalize: "off",
      autoCorrect: "off",
      spellCheck: false,
      maxLength: 10,
      minLength: 10,
      btn_ID: "ICD_C_btn",
      ICD_Status: "ICD_C_Status",
      data_bs_toggle: "modal",
      data_bs_target: "#DefaultCodesModel",
      value: ICD_C,
    },
    {
      type: "text",
      placeholder: "ICD D",
      id: "ICD_D",
      name: "ICD_D",
      autoComplete: "off",
      autoCapitalize: "off",
      autoCorrect: "off",
      spellCheck: false,
      maxLength: 10,
      minLength: 10,
      btn_ID: "ICD_D_btn",
      ICD_Status: "ICD_D_Status",
      data_bs_toggle: "modal",
      data_bs_target: "#DefaultCodesModel",
      value: ICD_D,
    },

    {
      type: "text",
      placeholder: "ICD E",
      id: "ICD_E",
      name: "ICD_E",
      autoComplete: "off",
      autoCapitalize: "off",
      autoCorrect: "off",
      spellCheck: false,
      maxLength: 10,
      minLength: 10,
      btn_ID: "ICD_E_btn",
      ICD_Status: "ICD_E_Status",
      data_bs_toggle: "modal",
      data_bs_target: "#DefaultCodesModel",
      value: ICD_E,
    },
    {
      type: "text",
      placeholder: "ICD F",
      id: "ICD_F",
      name: "ICD_F",
      autoComplete: "off",
      autoCapitalize: "off",
      autoCorrect: "off",
      spellCheck: false,
      maxLength: 10,
      minLength: 10,
      btn_ID: "ICD_F_btn",
      ICD_Status: "ICD_F_Status",
      data_bs_toggle: "modal",
      data_bs_target: "#DefaultCodesModel",
      value: ICD_F,
    },
    {
      type: "text",
      placeholder: "ICD G",
      id: "ICD_G",
      name: "ICD_G",
      autoComplete: "off",
      autoCapitalize: "off",
      autoCorrect: "off",
      spellCheck: false,
      maxLength: 10,
      minLength: 10,
      btn_ID: "ICD_G_btn",
      ICD_Status: "ICD_G_Status",
      data_bs_toggle: "modal",
      data_bs_target: "#DefaultCodesModel",
      value: ICD_G,
    },
    {
      type: "text",
      placeholder: "ICD H",
      id: "ICD_H",
      name: "ICD_H",
      autoComplete: "off",
      autoCapitalize: "off",
      autoCorrect: "off",
      spellCheck: false,
      maxLength: 10,
      minLength: 10,
      btn_ID: "ICD_H_btn",
      ICD_Status: "ICD_H_Status",
      data_bs_toggle: "modal",
      data_bs_target: "#DefaultCodesModel",
      value: ICD_H,
    },
    {
      type: "text",
      placeholder: "ICD I",
      id: "ICD_I",
      name: "ICD_I",
      autoComplete: "off",
      autoCapitalize: "off",
      autoCorrect: "off",
      spellCheck: false,
      maxLength: 10,
      minLength: 10,
      btn_ID: "ICD_I_btn",
      ICD_Status: "ICD_I_Status",
      data_bs_toggle: "modal",
      data_bs_target: "#DefaultCodesModel",
      value: ICD_I,
    },
    {
      type: "text",
      placeholder: "ICD J",
      id: "ICD_J",
      name: "ICD_J",
      autoComplete: "off",
      autoCapitalize: "off",
      autoCorrect: "off",
      spellCheck: false,
      maxLength: 10,
      minLength: 10,
      btn_ID: "ICD_J_btn",
      ICD_Status: "ICD_J_Status",
      data_bs_toggle: "modal",
      data_bs_target: "#DefaultCodesModel",
      value: ICD_J,
    },
    {
      type: "text",
      placeholder: "ICD K",
      id: "ICD_K",
      name: "ICD_K",
      autoComplete: "off",
      autoCapitalize: "off",
      autoCorrect: "off",
      spellCheck: false,
      maxLength: 10,
      minLength: 10,
      btn_ID: "ICD_K_btn",
      ICD_Status: "ICD_K_Status",
      data_bs_toggle: "modal",
      data_bs_target: "#DefaultCodesModel",
      value: ICD_K,
    },
    {
      type: "text",
      placeholder: "ICD L",
      id: "ICD_L",
      name: "ICD_L",
      autoComplete: "off",
      autoCapitalize: "off",
      autoCorrect: "off",
      spellCheck: false,
      maxLength: 10,
      minLength: 10,
      btn_ID: "ICD_L_btn",
      ICD_Status: "ICD_L_Status",
      data_bs_toggle: "modal",
      data_bs_target: "#DefaultCodesModel",
      value: ICD_L,
    },
  ];
  const [error, seterror] = useState("");
  const CPT_fields = [
    {
      type: "text",
      placeholder: "CPT #1",
      id: "CPT_1",
      name: "CPT_1",
      autoComplete: "off",
      autoCapitalize: "off",
      autoCorrect: "off",
      spellCheck: false,
      maxLength: 10,
      minLength: 10,
      btn_ID: "CPT_1_btn",
      CPT_Status: "CPT_1_Status",
      data_bs_toggle: "modal",
      data_bs_target: "#DefaultCPTCodesModel",
      value: CPT_1,
    },
    {
      type: "text",
      placeholder: "CPT #2",
      id: "CPT_2",
      name: "CPT_2",
      autoComplete: "off",
      autoCapitalize: "off",
      autoCorrect: "off",
      spellCheck: false,
      maxLength: 10,
      minLength: 10,
      btn_ID: "CPT_2_btn",
      CPT_Status: "CPT_2_Status",
      data_bs_toggle: "modal",
      data_bs_target: "#DefaultCPTCodesModel",
      value: CPT_2,
    },
    {
      type: "text",
      placeholder: "CPT #3",
      id: "CPT_3",
      name: "CPT_3",
      autoComplete: "off",
      autoCapitalize: "off",
      autoCorrect: "off",
      spellCheck: false,
      maxLength: 10,
      minLength: 10,
      btn_ID: "CPT_3_btn",
      CPT_Status: "CPT_3_Status",
      data_bs_toggle: "modal",
      data_bs_target: "#DefaultCPTCodesModel",
      value: CPT_3,
    },
    {
      type: "text",
      placeholder: "CPT #4",
      id: "CPT_4",
      name: "CPT_4",
      autoComplete: "off",
      autoCapitalize: "off",
      autoCorrect: "off",
      spellCheck: false,
      maxLength: 10,
      minLength: 10,
      btn_ID: "CPT_4_btn",
      CPT_Status: "CPT_4_Status",
      data_bs_toggle: "modal",
      data_bs_target: "#DefaultCPTCodesModel",
      value: CPT_4,
    },
    {
      type: "text",
      placeholder: "CPT #5",
      id: "CPT_5",
      name: "CPT_5",
      autoComplete: "off",
      autoCapitalize: "off",
      autoCorrect: "off",
      spellCheck: false,
      maxLength: 10,
      minLength: 10,
      btn_ID: "CPT_5_btn",
      CPT_Status: "CPT_5_Status",
      data_bs_toggle: "modal",
      data_bs_target: "#DefaultCPTCodesModel",
      value: CPT_5,
    },
    {
      type: "text",
      placeholder: "CPT #6",
      id: "CPT_6",
      name: "CPT_6",
      autoComplete: "off",
      autoCapitalize: "off",
      autoCorrect: "off",
      spellCheck: false,
      maxLength: 10,
      minLength: 10,
      btn_ID: "CPT_6_btn",
      CPT_Status: "CPT_6_Status",
      data_bs_toggle: "modal",
      data_bs_target: "#DefaultCPTCodesModel",
      value: CPT_6,
    },
  ];

  const setshowproviderfunc = () => {
    if (showprovider === false) {
      setshowprovider(true);
    } else {
      setshowprovider(false);
    }
  };

  // ********************************* End of Claim Defaults States ********************************************

  function setEmpty() {
    setPatient_type("");
    setReferenceNum("");
    setAddress_contact("");
    setAddress2_contact("");
    setHomePhone_contact("");
    setcellphone_contact("");
    setworkphone_contact("");
    setExt_contact("");
    setEmail_contact("");
    setDriverLicense("");
    setmarital_status("");
    setstudent_status("");
    setemployment_status("");
    setResidence_type("");
    setAccount_prefix("");
    setPrefered_language("");
    setother_info("");
    setEthnicityID("");
    setLanguage("");
    setRace("");
    setrel_to_patient("");
    setrel_to_patient_guarantor("");
    setperm_to_speak(1);
    setlast_name_emergency("");
    setfirst_name_emergency("");
    setMI_emergency("");
    setaddress_emergency("");
    setaddress2_emergency("");
    setHomePhone_emergencycontact("");
    setcellphone_emergencycontact("");
    setworkphone_emergencycontact("");
    setemail_emergencycontact("");
    setRemarks_emergencycontact("");
    setReferel_emergencycontact("");
    setzipapicode("");
    setzipapi_city("");
    setzipapi_state("");
    setemergencyZip("");
    setemergency_city("");
    setemergency_state("");
    setFirstName("");
    setLastName("");
    setMI("");
    setSuffix("");
    setGender("");
    setDOB("");
    setDOD("");
    setSSN("");
    dispatch(getEditPatientZipCode(""));
    dispatch(getEditPatientZipCode2(""));
    dispatch(getEditPatientZipCode3(""));

    // Insurance info
    setpatient_rel_insured_party("");
    setlastname_insured_party("");
    setfirstname_insured_party("");
    setMI_insured_party("");
    setSuffix_insured_party("");
    setGender_insured_party("");
    setDOB_insured_party("");
    setSSN_insured_party("");
    setAddress1_insured_party("");
    setAddress2_insured_party("");
    setHomePhone_Insuranceinfo("");
    setCellPhone_Insuranceinfo("");
    setWorkPhone_Insuranceinfo("");
    setPhone_Insuranceinfo("");
    setEmail_Insurance("");
    setExt_Insured_party("");
    setthirdparty_Insured_party("");
    setEmployeeStatus("");
    setName_employee_info("");
    setAddress1_employee_info("");
    setAddress2_employee_info("");
    setInactivate("");
    setInactivate_primary("");
    dispatch(getEditPatientZipCode_InsuredData(""));
    dispatch(getEditPatientZipCode_InsuredData2(""));

    // billing info
    setSendStatement("");
    setstatement_type("");
    setmailStatement("");
    setPatient_comment("");
    setpatient_comment2("");
    setfinaldemandnotice("");
    setCollectionDate("");
    setcollectionreason("");
    setbillingLastName("");
    setbillingFirstName("");
    setbillingMI("");
    setbillingAddress1("");
    setbillingAddress2("");
    setHomePhone_billinginfo("");
    setCellPhone_billinginfo("");
    setWorkPhone_billinginfo("");
    setEmail_billing("");
    setRemarks_billing("");

    // Claim Defaults
    setofficelocationID("");
    setPriority("");
    setPolicy_type("");
    setPayer("");
    setMemeberID("");
    setGroupID("");
    setCopay("");
    setco_insurance("");
    setdeductible("");
    setOutOfPocket("");
    seteffectiveDate("");
    setterminationDate("");
    setDefaultProvider("");
    setDefaultProviderNPI("");
    setdefaultOrderingprovider("");
    setDefaultFacility("");
    setDefaultRefProvider("");
    setdefaultSalesRep("");
    setAssignment_of_Benefits("");
    setprovider_accepts_assignments("");
    setInclude_accident_illness_info("");
    setAccident_Date("");
    setAccident_State("");
    setAccident_type("");
    setBox_11b_ClaimDefaults("");
    setICDStatus("");
    setCPTStatus("");
    setDefaultFacilityID("");
    setICD_A("");
    setICD_B("");
    setICD_C("");
    setICD_D("");
    setICD_E("");
    setICD_F("");
    setICD_G("");
    setICD_H("");
    setICD_I("");
    setICD_J("");
    setICD_K("");
    setICD_L("");
    setCPT_1("");
    setCPT_2("");
    setCPT_3("");
    setCPT_4("");
    setCPT_5("");
    setCPT_6("");

    setICD_A_ID("");
    setICD_B_ID("");
    setICD_C_ID("");
    setICD_D_ID("");
    setICD_E_ID("");
    setICD_G_ID("");
    setICD_F_ID("");
    setICD_H_ID("");
    setICD_I_ID("");
    setICD_J_ID("");
    setICD_K_ID("");
    setICD_L_ID("");
    setCPT_1_ID("");
    setCPT_2_ID("");
    setCPT_3_ID("");
    setCPT_4_ID("");
    setCPT_5_ID("");
    setCPT_6_ID("");
    setBox_19_ClaimDefaults("");
    setlast_menstrual_date_claimDefaults("");
    setadmission_Date_ClaimDefaults("");
    setinitial_Treatment_Date("");
    setdefaultOrderingproviderID("");
    setDefaultRefProviderID("");
    setdefaultSalesRepID("");
    setDefaultFacilityID("");
    setDefaultProviderID("");
    setDefaultProviderPractID("");
  }
  // function checkNullInsuredValues() {
  //   if (!lastname_insured_party && !gender_insured_party) {
  //     alert("Insurance is required");
  //   }
  // }
  // let user = JSON.parse(sessionStorage.getItem("access"));
  // let customerID = JSON.parse(sessionStorage.getItem("customer_id"));
  // API to POST Input Values

  let user = JSON.parse(sessionStorage.getItem("access"));
  let customerID = JSON.parse(sessionStorage.getItem("customer_id"));
  const [disabled, setDisabled] = useState(false);
  const [patient_is_insured, setpatient_is_insured] = useState(false);
  const TogglePatientInsured = (e) => {
    // Patient is Insured ?
    if (e) {
      setlastname_insured_party(last_name);
      setfirstname_insured_party(first_name);
      setMI_insured_party(MI);
      setSuffix_insured_party(suffix);
      setGender_insured_party(gender);
      setDOB_insured_party(DOB);
      setSSN_insured_party(SSN);
      setAddress1_insured_party(Address_contact);
      setAddress2_insured_party(Address2_contact);
      setzipapi_city_insured_party(zipapi_city);
      setzipapi_state_insured_party(zipapi_state);
      setzipapicode_insured_party(zipapicode);
      setHomePhone_Insuranceinfo(homephone_contact);
      setCellPhone_Insuranceinfo(cellphone_contact);
      setWorkPhone_Insuranceinfo(workphone_contact);
      setExt_Insured_party(ext_contact);
      setEmail_Insurance(email_contact);
      setpatient_rel_insured_party("SELF");
      setDisabled(true);
    } else {
      setlastname_insured_party("");
      setfirstname_insured_party("");
      setMI_insured_party("");
      setSuffix_insured_party("");
      setGender_insured_party("");
      setDOB_insured_party("");
      setSSN_insured_party("");
      setAddress1_insured_party("");
      setAddress2_insured_party("");
      setzipapi_city_insured_party("");
      setzipapi_state_insured_party("");
      setzipapicode_insured_party("");
      setpatient_rel_insured_party("");
      setHomePhone_Insuranceinfo("");
      setCellPhone_Insuranceinfo("");
      setWorkPhone_Insuranceinfo("");
      setExt_Insured_party("");
      setEmail_Insurance("");
      setDisabled(false);
    }
  };
  // ******************************** Mapping State Values ********************************

  useEffect(() => {
    if (params.id) {
      dispatch(EditPatientFetch(params.id));

      // editable patient api data
      // *** ------- Start Basic Information ------- *** //
      SetinactivePatient(patient_status === 0 ? false : true);
      setFirstName(first_name_patient ? first_name_patient : "");
      setLastName(last_name_patient ? last_name_patient : "");
      setMI(MI_patient ? MI_patient : "");
      setSuffix(suffix_patient ? suffix_patient : "");
      setGender(gender_patient ? gender_patient : "");
      setDOB(dob_patient ? dob_patient : "");
      setDOD(dod_patient ? dod_patient : "");
      setSSN(ssn_patient ? ssn_patient : "");
      setPatient_type(patient_Types ? patient_Types : "");
      // *** ------- End Basic Information ------- *** //

      // *** ------- Start Contact Information ------- *** //
      setAddress_contact(address1_patient ? address1_patient : "");
      setAddress2_contact(address2_patient ? address2_patient : "");
      setReferenceNum(reference_patient ? reference_patient : "");
      setHomePhone_contact(homephone_patient ? homephone_patient : "");
      setcellphone_contact(cellphone_patient ? cellphone_patient : "");
      setworkphone_contact(workphone_patient ? workphone_patient : "");
      setExt_contact(ext_patient ? ext_patient : "");
      setEmail_contact(email_patient ? email_patient : "");
      // setzipapicode(zipapi ? zipapi : zip_patient);
      // setzipapi_city(zipapiCity ? zipapiCity : city_patient);
      // setzipapi_state(zipapiState ? zipapiState : state_patient);
      // *** ------- End Contact Information ------- *** //

      // *** ------- Start Other ------- *** //
      setDriverLicense(driver_license_patient ? driver_license_patient : "");
      setmarital_status(marital_status_patient ? marital_status_patient : "");
      setstudent_status(student_status_patient ? student_status_patient : "");
      setemployment_status(
        employment_status_patient ? employment_status_patient : ""
      );
      setResidence_type(residence_type_patient ? residence_type_patient : "");
      setAccount_prefix(account_prefix_patient ? account_prefix_patient : "");
      setPrefered_language(
        preferred_language_patient ? preferred_language_patient : ""
      );
      setother_info(other_info_patient ? other_info_patient : "");

      setEthnicityID(ethnicity_id_patient ? ethnicity_id_patient : "");
      setLanguage(language_patient ? language_patient : "");

      setRace(race_id_patient ? race_id_patient : "");

      // *** ----------------------- Start Emergency Contact ----------------------- *** //
      setperm_to_speak(perm_to_speak_patient ? perm_to_speak_patient : 1);
      setrel_to_patient(
        rel_to_patient_patientinfo ? rel_to_patient_patientinfo : ""
      );

      setlast_name_emergency(emergency_lname ? emergency_lname : "");
      setfirst_name_emergency(emergency_fname ? emergency_fname : "");
      setMI_emergency(emergency_mi ? emergency_mi : "");
      setaddress_emergency(emergency_address1 ? emergency_address1 : "");
      setaddress2_emergency(emergency_address2 ? emergency_address2 : "");

      // setemergencyZip(zipapi2 ? zipapi2 : emergency_zip_patientinfo);
      // setemergency_city(zipapiCity2 ? zipapiCity2 : emergency_city_patientinfo);
      // setemergency_state(
      //   zipapiState2 ? zipapiState2 : emergency_state_patientinfo
      // );

      setHomePhone_emergencycontact(emergency_home ? emergency_home : "");
      setworkphone_emergencycontact(
        emergency_work_phone ? emergency_work_phone : ""
      );
      setcellphone_emergencycontact(emergency_cell ? emergency_cell : "");
      setemail_emergencycontact(emergency_email ? emergency_email : "");
      setRemarks_emergencycontact(emergency_remarks ? emergency_remarks : "");
      // *** ----------------------- End Emergency Contact ----------------------- *** //
      // TogglePatientInsured();

      // PENDING FROM BACKEND ***
      // setzipapicode3(zipapi3);
      // setzipapi_city3(zipapiCity3);
      // setzipapi_state3(zipapiState3);

      // Insurance Info Add New
      // setzipapicode_insured_party(zipapi_insured);
      // setzipapi_city_insured_party(zipapiCity_insured);
      // setzipapi_state_insured_party(zipapiState_insured);
      // setzipapicode_employee_info(zipapi_employee_info);
      // setzipapi_city_employee_info(zipapiCity_employee_info);
      // setzipapi_state_employee_info(zipapiState_employee_info);
      // ************************

      // -------------------- Start of Billing Info Values -------------------- //
      setSendStatement(send_statement_api === 0 ? false : true);
      setstatement_type(statment_type_api === 0 ? 0 : 1);
      setmailStatement(mail_statement_to_api ? mail_statement_to_api : "");
      setPatient_comment(
        patient_comment_print_statement_api
          ? patient_comment_print_statement_api
          : ""
      );
      setpatient_comment2(
        patient_comment_auto_statement_api
          ? patient_comment_auto_statement_api
          : ""
      );
      setfinaldemandnotice(send_final_demand_notice_api === 0 ? false : true);
      setCollectionDate(collection_date_api ? collection_date_api : "");
      setcollectionreason(collection_reason_api ? collection_reason_api : "");
      // -------------------- Start of Billing Guarantor Values -------------------- //
      setrel_to_patient_guarantor(
        rel_to_pat_billing_api ? rel_to_pat_billing_api : ""
      );
      setbillingFirstName(
        first_name_guarantor_api ? first_name_guarantor_api : ""
      );
      setbillingLastName(
        last_name_guarantor_api ? last_name_guarantor_api : ""
      );
      setbillingMI(MI_guarantor_api ? MI_guarantor_api : "");
      setbillingAddress1(Address1_guarantor_api ? Address1_guarantor_api : "");
      setbillingAddress2(Address2_guarantor_api ? Address2_guarantor_api : "");
      // setzipapicode3(zipapi3 ? zipapi3 : zipcode_guarantor_api);
      // setzipapi_city3(zipapiCity3 ? zipapiCity3 : city_guarantor_api);
      // setzipapi_state3(zipapiState3 ? zipapiState3 : state_guarantor_api);
      setHomePhone_billinginfo(
        homephone_guarantor_api ? homephone_guarantor_api : ""
      );
      setCellPhone_billinginfo(
        cellphone_guarantor_api ? cellphone_guarantor_api : ""
      );
      setWorkPhone_billinginfo(
        workphone_guarantor_api ? workphone_guarantor_api : ""
      );
      setEmail_billing(email_guarantor_api ? email_guarantor_api : "");
      setRemarks_billing(remarks_guarantor_api ? remarks_guarantor_api : "");
      // -------------------- End of Billing Guarantor Values -------------------- //
      // -------------------- End of Billing Info Values -------------------- //

      // -------------------- Start of Claim Default Values -------------------- //
      setDefaultProviderID(
        default_provider_id_api ? default_provider_id_api : ""
      );
      setDefaultFacilityID(facility_id_api ? facility_id_api : "");
      setdefaultOrderingproviderID(
        ordering_provider_id_api ? ordering_provider_id_api : ""
      );
      setdefaultSalesRepID(
        sales_representative_id_api ? sales_representative_id_api : ""
      );
      setofficelocationID(
        practice_location_id_api
          ? practice_location_id_api
          : provide?.[0]?.practice?.practice_location?.id
      );
      // *** *** Provider/PRact Names *** ***
      setDefaultProvider(
        default_provider_lname_api
          ? `${
              default_provider_lname_api +
              `, ` +
              default_provider_fname_api +
              ` ` +
              `(${default_provider_sequence_api})`
            }`
          : default_provider_orgname_api
      );

      setDefaultProviderNPI(
        default_provider_npi_code_api ? default_provider_npi_code_api : ""
      );
      setdefaultpractice(
        default_practice_name_api ? default_practice_name_api : ""
      );
      setofficelocationName(
        default_practice_location_api ? default_practice_location_api : ""
      );
      setdefaultOrderingprovider(
        default_ordering_provider_lname_api
          ? `${
              default_ordering_provider_lname_api +
              `, ` +
              default_ordering_provider_fname_api
            }`
          : default_ordering_provider_orgname_api
      );
      setdefaultSalesRep(
        default_sales_rep_lname_api
          ? `${
              default_sales_rep_lname_api + `, ` + default_sales_rep_fname_api
            }`
          : default_sales_rep_orgname_api
      );
      setDefaultRefProvider(
        default_referring_provider_lname_api
          ? `${
              default_referring_provider_lname_api +
              `, ` +
              default_referring_provider_fname_api
            }`
          : default_referring_provider_orgname_api
      );
      setDefaultFacility(facility_name_api ? facility_name_api : "");

      // *** *** *** *** *** ***
      // ----- Assignment ------ //
      setAssignment_of_Benefits(
        assignment_benefits_api ? assignment_benefits_api : ""
      );
      setprovider_accepts_assignments(
        provider_accept_assignment_api ? provider_accept_assignment_api : ""
      );
      // ----- Default Codes ----- //
      setICD_A(icd1_code_api ? icd1_code_api : "");
      setICD_B(icd2_code_api ? icd2_code_api : "");
      setICD_C(icd3_code_api ? icd3_code_api : "");
      setICD_D(icd4_code_api ? icd4_code_api : "");
      setICD_E(icd5_code_api ? icd5_code_api : "");
      setICD_F(icd6_code_api ? icd6_code_api : "");
      setICD_G(icd7_code_api ? icd7_code_api : "");
      setICD_H(icd8_code_api ? icd8_code_api : "");
      setICD_I(icd9_code_api ? icd9_code_api : "");
      setICD_J(icd10_code_api ? icd10_code_api : "");
      setICD_K(icd11_code_api ? icd11_code_api : "");
      setICD_L(icd12_code_api ? icd12_code_api : "");
      //
      setCPT_1_ID(procedure_code_id1_api ? procedure_code_id1_api : "");
      setCPT_2_ID(procedure_code_id2_api ? procedure_code_id2_api : "");
      setCPT_3_ID(procedure_code_id3_api ? procedure_code_id3_api : "");
      setCPT_4_ID(procedure_code_id4_api ? procedure_code_id4_api : "");
      setCPT_5_ID(procedure_code_id5_api ? procedure_code_id5_api : "");
      setCPT_6_ID(procedure_code_id6_api ? procedure_code_id6_api : "");
      //
      setCPT_1(procedure_code1_api ? procedure_code1_api : "");
      setCPT_2(procedure_code2_api ? procedure_code2_api : "");
      setCPT_3(procedure_code3_api ? procedure_code3_api : "");
      setCPT_4(procedure_code4_api ? procedure_code4_api : "");
      setCPT_5(procedure_code5_api ? procedure_code5_api : "");
      setCPT_6(procedure_code6_api ? procedure_code6_api : "");
      //
      setICD_A_ID(icd1_ID_api ? icd1_ID_api : "");
      setICD_B_ID(icd2_ID_api ? icd2_ID_api : "");
      setICD_C_ID(icd3_ID_api ? icd3_ID_api : "");
      setICD_D_ID(icd4_ID_api ? icd4_ID_api : "");
      setICD_E_ID(icd5_ID_api ? icd5_ID_api : "");
      setICD_F_ID(icd6_ID_api ? icd6_ID_api : "");
      setICD_G_ID(icd7_ID_api ? icd7_ID_api : "");
      setICD_H_ID(icd8_ID_api ? icd8_ID_api : "");
      setICD_I_ID(icd9_ID_api ? icd9_ID_api : "");
      setICD_J_ID(icd10_ID_api ? icd10_ID_api : "");
      setICD_K_ID(icd11_ID_api ? icd11_ID_api : "");
      setICD_L_ID(icd12_ID_api ? icd12_ID_api : "");

      // ----- Illness & Accident Info ----- //
      setInclude_accident_illness_info(
        include_accident_illness_claim_api === 0 ? false : true
      );
      setAccident_Date(
        illness_accident_date_api ? illness_accident_date_api : ""
      );
      setAccident_State(accident_state_api ? accident_state_api : "");
      setAccident_type(accident_type_api ? accident_type_api : "");

      // ----- 0ther ----- //
      setBox_11b_ClaimDefaults(box_11b_api ? box_11b_api : "");
      setBox_19_ClaimDefaults(box_19_api ? box_19_api : "");
      setlast_menstrual_date_claimDefaults(
        last_menstrual_date_api ? last_menstrual_date_api : ""
      );
      setadmission_Date_ClaimDefaults(
        admission_date_api ? admission_date_api : ""
      );
      setinitial_Treatment_Date(
        initial_treatment_date_api ? initial_treatment_date_api : ""
      );

      // -------------------- Start of Insurance Info Values -------------------- //
      setpatient_rel_insured_party(
        relation_insured_api ? relation_insured_api : ""
      );
      setlastname_insured_party(insured_lname_api ? insured_lname_api : "");
      setfirstname_insured_party(insured_fname_api ? insured_fname_api : "");
      setMI_insured_party(insured_mi_api ? insured_mi_api : "");
      setSuffix_insured_party(insured_suffix_api ? insured_suffix_api : "");
      setGender_insured_party(insured_gender_api ? insured_gender_api : "");
      setshowCard(lastname_insured_party != "" ? false : true);
      setshowInsuranceCard(
        payer_id_api != null && member_id_api != null ? true : false
      );
      setDOB_insured_party(insured_dob_api ? insured_dob_api : "");
      setSSN_insured_party(insured_ssn_api ? insured_ssn_api : "");
      setAddress1_insured_party(
        insured_address1_api ? insured_address1_api : ""
      );
      setAddress2_insured_party(
        insured_address2_api ? insured_address2_api : ""
      );
      // setzipapicode_insured_party(
      //   zipapi_insured ? zipapi_insured : insured_zip_api
      // );
      // setzipapi_city_insured_party(
      //   zipapiCity_insured ? zipapiCity_insured : insured_city_api
      // );
      // setzipapi_state_insured_party(
      //   zipapiState_insured ? zipapiState_insured : insured_state_api
      // );
      setHomePhone_Insuranceinfo(insured_hphone_api ? insured_hphone_api : "");
      setCellPhone_Insuranceinfo(insured_cell_api ? insured_cell_api : "");
      setWorkPhone_Insuranceinfo(
        insured_workphone_api ? insured_workphone_api : ""
      );
      setExt_Insured_party(insured_ext_api ? insured_ext_api : "");
      setEmail_Insurance(insured_email_api ? insured_email_api : "");
      setthirdparty_Insured_party(
        insured_3rdPartyAdmin_api ? insured_3rdPartyAdmin_api : ""
      );
      setPhone_Insuranceinfo(insured_phone_api ? insured_phone_api : "");

      // Employee Information
      setEmployeeStatus(insured_emp_status_api ? insured_emp_status_api : "");
      setName_employee_info(insured_emp_name_api ? insured_emp_name_api : "");
      setAddress1_employee_info(
        insured_emp_address1_api ? insured_emp_address1_api : ""
      );
      setAddress2_employee_info(
        insured_emp_address2_api ? insured_emp_address2_api : ""
      );

      // setzipapi_city_employee_info(
      //   zipapiCity_employee_info
      //     ? zipapiCity_employee_info
      //     : insured_emp_city_api
      // );
      // setzipapi_state_employee_info(
      //   zipapiState_employee_info
      //     ? zipapiState_employee_info
      //     : insured_emp_state_api
      // );
      // setzipapicode_employee_info(
      //   zipapi_employee_info ? zipapi_employee_info : insured_emp_zip_api
      // );
      // setpatient_is_insured(
      //   patient_is_insured_api === 1 ? setDisabled(true) : setDisabled(false)
      // );
      // -------------------- End of Insurance Info Values -------------------- //

      // -------------------- Start of Payer Info Values -------------------- //
      setPriority(priority_api ? priority_api : 0);
      setPolicy_type(policy_type_api ? policy_type_api : "Other");
      setPayer(payer_name_api ? payer_name_api : "");
      setPayerID(payer_id_api ? payer_id_api : "");
      setMemeberID(member_id_api ? member_id_api : "");
      setGroupID(group_id_api ? group_id_api : "");
      setCopay(copay_api ? copay_api : "");
      setco_insurance(co_insurance_api ? co_insurance_api : "");
      setdeductible(deductible_api ? deductible_api : "");
      setOutOfPocket(out_pocket_max_api ? out_pocket_max_api : "");
      seteffectiveDate(effective_date_api ? effective_date_api : "");
      setterminationDate(termination_date_api ? termination_date_api : "");
      // -------------------- End of Payer Info Values -------------------- //

      // -------------------- End of Claim Default Values -------------------- //
    }
  }, [
    // *************************** Basic info *************************** //

    editpatientID,
    patient_status,
    first_name_patient,
    last_name_patient,
    MI_patient,
    suffix_patient,
    gender_patient,
    dob_patient,
    dod_patient,
    ssn_patient,
    patient_Types,
    reference_patient,
    address1_patient,
    address2_patient,
    homephone_patient,
    cellphone_patient,
    workphone_patient,
    ext_patient,
    email_patient,
    driver_license_patient,
    marital_status_patient,
    student_status_patient,
    employment_status_patient,
    residence_type_patient,
    account_prefix_patient,
    preferred_language_patient,
    other_info_patient,
    language_patient,
    rel_to_patient_patientinfo,
    // General Zip
    // zipapi,
    // zipapiCity,
    // zipapiState,
    // zipapi2,
    // zipapiCity2,
    // zipapiState2,
    // zipapi3,
    // zipapiCity3,
    // zipapiState3,
    // ***** Insured Info Zip *****
    // zipapi_insured,
    // zipapiCity_insured,
    // zipapiState_insured,
    // zipapi_employee_info,
    // zipapiCity_employee_info,
    // zipapiState_employee_info,
    // *************************** Emergency Contact *************************** //
    emergency_lname,
    emergency_fname,
    emergency_mi,
    emergency_address1,
    emergency_address2,
    emergency_city_patientinfo,
    emergency_state_patientinfo,
    emergency_zip_patientinfo,
    emergency_home,
    emergency_cell,
    emergency_work_phone,
    emergency_email,
    emergency_remarks,
    // last_name,
    // first_name,
    // gender,
    // *************************** Billing Info *************************** //
    statment_type_api,
    send_statement_api,
    mail_statement_to_api,
    patient_comment_print_statement_api,
    patient_comment_auto_statement_api,
    send_final_demand_notice_api,
    collection_date_api,
    collection_reason_api,
    // *************************** Billing Guarantor *************************** //
    rel_to_pat_billing_api,
    first_name_guarantor_api,
    last_name_guarantor_api,
    MI_guarantor_api,
    Address1_guarantor_api,
    Address2_guarantor_api,
    // city_guarantor_api,
    // state_guarantor_api,
    // zipcode_guarantor_api,
    homephone_guarantor_api,
    cellphone_guarantor_api,
    workphone_guarantor_api,
    email_guarantor_api,
    remarks_guarantor_api,
    // *************************** Claim Defaults *************************** //
    // showCard,
    // showInsuranceCard,
    default_provider_id_api,
    practice_location_id_api,
    ordering_provider_id_api,
    facility_id_api,
    referring_provider_id_api,
    sales_representative_id_api,
    // Names
    default_provider_fname_api,
    default_provider_lname_api,
    default_provider_orgname_api,
    default_provider_npi_code_api,
    default_provider_sequence_api,
    default_practice_location_api,
    default_ordering_provider_fname_api,
    default_ordering_provider_lname_api,
    default_ordering_provider_orgname_api,
    default_referring_provider_fname_api,
    default_referring_provider_lname_api,
    default_referring_provider_orgname_api,
    default_sales_rep_fname_api,
    default_sales_rep_lname_api,
    default_sales_rep_orgname_api,
    facility_name_api,
    default_practice_name_api,
    //
    assignment_benefits_api,
    provider_accept_assignment_api,
    include_accident_illness_claim_api,
    illness_accident_date_api,
    accident_state_api,
    accident_type_api,
    box_11b_api,
    box_19_api,
    last_menstrual_date_api,
    admission_date_api,
    initial_treatment_date_api,
    icd1_ID_api,
    icd1_code_api,
    icd2_ID_api,
    icd2_code_api,
    icd3_ID_api,
    icd3_code_api,
    icd4_ID_api,
    icd4_code_api,
    icd5_ID_api,
    icd5_code_api,
    icd6_ID_api,
    icd6_code_api,
    icd7_ID_api,
    icd7_code_api,
    icd8_ID_api,
    icd8_code_api,
    icd9_ID_api,
    icd9_code_api,
    icd10_ID_api,
    icd10_code_api,
    icd11_ID_api,
    icd11_code_api,
    icd12_ID_api,
    icd12_code_api,
    procedure_code_id1_api,
    procedure_code1_api,
    procedure_code_id2_api,
    procedure_code2_api,
    procedure_code_id3_api,
    procedure_code3_api,
    procedure_code_id4_api,
    procedure_code4_api,
    procedure_code_id5_api,
    procedure_code5_api,
    procedure_code_id6_api,
    procedure_code6_api,

    // Insurance info
    patient_is_insured_api,
    payer_name_api,
    relation_insured_api,
    insured_lname_api,
    insured_fname_api,
    insured_mi_api,
    insured_suffix_api,
    insured_gender_api,
    insured_dob_api,
    insured_ssn_api,
    insured_address1_api,
    insured_address2_api,
    insured_city_api,
    insured_state_api,
    insured_zip_api,
    insured_hphone_api,
    insured_cell_api,
    insured_workphone_api,
    insured_ext_api,
    insured_email_api,
    insured_3rdPartyAdmin_api,
    insured_phone_api,
    insured_emp_status_api,
    insured_emp_name_api,
    insured_emp_address1_api,
    insured_emp_address2_api,
    insured_emp_city_api,
    insured_emp_state_api,
    insured_emp_zip_api,
    priority_api,
    policy_type_api,
    payer_id_api,
    member_id_api,
    group_id_api,
    copay_api,
    co_insurance_api,
    deductible_api,
    out_pocket_max_api,
    effective_date_api,
    termination_date_api,
  ]);
  // Zip, City State 1
  useEffect(() => {
    let cleanup = true;
    setzipapicode(zipapi ? zipapi : zip_patient);
    setzipapi_city(zipapiCity ? zipapiCity : city_patient);
    setzipapi_state(zipapiState ? zipapiState : state_patient);
    return () => {
      cleanup = false;
    };
  }, [zipapi, editpatientID]);

  // Zip, City State 2
  useEffect(() => {
    let cleanup = true;
    setemergencyZip(zipapi2 ? zipapi2 : emergency_zip_patientinfo);
    setemergency_city(zipapiCity2 ? zipapiCity2 : emergency_city_patientinfo);
    setemergency_state(
      zipapiState2 ? zipapiState2 : emergency_state_patientinfo
    );
    return () => {
      cleanup = false;
    };
  }, [zipapi2, editpatientID]);

  // Zip, City State 3
  useEffect(() => {
    let cleanup = true;
    setzipapicode3(zipapi3 ? zipapi3 : zipcode_guarantor_api);
    setzipapi_city3(zipapiCity3 ? zipapiCity3 : city_guarantor_api);
    setzipapi_state3(zipapiState3 ? zipapiState3 : state_guarantor_api);
    return () => {
      cleanup = false;
    };
  }, [zipapi3, editpatientID]);

  // Zip, City State 4
  useEffect(() => {
    let cleanup = true;
    setzipapicode_insured_party(
      zipapi_insured ? zipapi_insured : insured_zip_api
    );
    setzipapi_city_insured_party(
      zipapiCity_insured ? zipapiCity_insured : insured_city_api
    );
    setzipapi_state_insured_party(
      zipapiState_insured ? zipapiState_insured : insured_state_api
    );
    return () => {
      cleanup = false;
    };
  }, [zipapi_insured, editpatientID]);

  // Zip, City State 5
  useEffect(() => {
    let cleanup = true;
    setzipapi_city_employee_info(
      zipapiCity_employee_info ? zipapiCity_employee_info : insured_emp_city_api
    );
    setzipapi_state_employee_info(
      zipapiState_employee_info
        ? zipapiState_employee_info
        : insured_emp_state_api
    );
    setzipapicode_employee_info(
      zipapi_employee_info ? zipapi_employee_info : insured_emp_zip_api
    );
    return () => {
      cleanup = false;
    };
  }, [zipapi_employee_info, editpatientID]);
  function put() {
    API.put(
      `patient/update/${editpatientID}`,
      {
        // ******************************** General Form Fields ********************************
        first_name,
        last_name,
        MI,
        suffix,
        gender,
        DOB,
        DOD,
        SSN,
        patient_type,
        referencenum,
        Inactivate_Patient: Number(inactivePatient),
        // ******************************** Patient Info ********************************
        Address_contact_PatientInfo: Address_contact,
        Address2_contact_PatientInfo: Address2_contact,
        homephone_contact_PatientInfo: homephone_contact,
        cellphone_contact_PatientInfo: cellphone_contact,
        workphone_contact_PatientInfo: workphone_contact,
        ext_contact_PatientInfo: ext_contact,
        email_contact_PatientInfo: email_contact,
        driver_license_PatientInfo: driver_license,
        marital_status_PatientInfo: marital_status,
        student_status_PatientInfo: student_status,
        employment_status_PatientInfo: employment_status,
        residence_type_PatientInfo: residence_type,
        account_prefix_PatientInfo: account_prefix,
        prefered_language_PatientInfo: prefered_language,
        other_info_PatientInfo: other_info,
        ethnicity_PatientInfo: ethnicityID,
        language_PatientInfo: language,
        race_PatientInfo: race,
        rel_to_patient_PatientInfo: rel_to_patient,
        perm_to_speak_PatientInfo: perm_to_speak,
        last_name_emergency_PatientInfo: last_name_emergency,
        first_name_emergency_PatientInfo: first_name_emergency,
        MI_emergency_PatientInfo: MI_emergency,
        address_emergency_PatientInfo: address_emergency,
        address2_emergency_PatientInfo: address2_emergency,
        homephone_emergencycontact_PatientInfo: homephone_emergencycontact,
        cellphone_emergencycontact_PatientInfo: cellphone_emergencycontact,
        workphone_emergencycontact_PatientInfo: workphone_emergencycontact,
        email_emergencycontact_PatientInfo: email_emergencycontact,
        remarks_emergencycontact_PatientInfo: remarks_emergencycontact,
        referel_source_PatientInfo: referel_emergencycontact,
        zipapicode_PatientInfo: zipapicode,
        zipapi_city_PatientInfo: zipapi_city,
        zipapi_state_PatientInfo: zipapi_state,

        emergencyZip_PatientInfo: emergencyZip,
        emergency_city_PatientInfo: emergency_city,
        emergency_state_PatientInfo: emergency_state,

        // ******************************** Billing Info ********************************
        sendStatement_billing_info: Number(sendStatement),
        statement_type_billing_info: statement_type,
        mailStatement_billingInfo: mailStatement
          ? mailStatement
          : "Primary Insured",
        patient_comment_billingInfo: patient_comment,
        patient_comment2_billing_info: patient_comment2,
        finaldemandnotice_billingInfo: Number(finaldemandnotice),
        CollectionDate_billingInfo: CollectionDate,
        collectionreason_billing_info: collectionreason,
        rel_to_patient_guarantor_billingInfo: rel_to_patient_guarantor
          ? rel_to_patient_guarantor
          : "None",
        LastName_billingInfo: billingLastName,
        FirstName_billingInfo: billingFirstName,
        MI_billingInfo: billingMI,
        Address1_billingInfo: billingAddress1,
        Address2_billingInfo: billingAddress2,
        HomePhone_billinginfo,
        CellPhone_billinginfo,
        WorkPhone_billinginfo,
        Email_billingInfo: Email_billing,
        Remarks_billingInfo: remarks_billing,
        zip_billingInfo: zipapicode3,
        city_billingInfo: zipapi_city3,
        state_billingInfo: zipapi_state3,

        // ******************* Insurance info Values ******************
        patient_is_insured: Number(patient_is_insured),
        patient_rel_insured_party,
        lastname_insured_party,
        firstname_insured_party,
        MI_insured_party,
        Suffix_insured_party,
        gender_insured_party,
        DOB_insured_party,
        SSN_insured_party,
        Address1_insured_party,
        Address2_insured_party,
        HomePhone_Insuranceinfo,
        CellPhone_Insuranceinfo,
        WorkPhone_Insuranceinfo,
        Phone_Insuranceinfo,
        Email_Insurance,
        ext_contact_insured_party,
        thirdparty_insured_party,
        Name_employee_info_Insured_party: Name_employee_info,
        employee_status_insured_party: employee_status,
        Address1_employee_info_Insured_party: Address1_employee_info,
        Address2_employee_info_Insured_party: Address2_employee_info,
        Inactivate_Insured_party: Inactivate,
        Inactivate_primary_Insured: Inactivate_primary,
        priority_payer_info: priority,
        policy_type_payer_info: policy_type,
        // payerName_payer_info: payer,
        PayerID_payer_info: payerID,
        memberID_payer_info: memberID,
        groupID_payer_info: groupID,
        copay_payer_info: copay,
        co_insurance_payer_info: co_insurance,
        deductible_payer_info: deductible,
        OutOfPocket_payer_info: OutOfPocket,
        effectiveDate_payer_info: effectiveDate,
        terminationDate_payer_info: terminationDate,
        zipapicode_insured_party,
        zipapi_city_insured_party,
        zipapi_state_insured_party,
        zipapicode_employee_info_Insured_party: zipapicode_employee_info,
        zipapi_city_employee_info_Insured_party: zipapi_city_employee_info,
        zipapi_state_employee_info_Insured_party: zipapi_state_employee_info,

        // ******************* Claim Default Values ******************
        // defaultprovider_ClaimDefault: defaultprovider,
        // // defaultproviderNPI_ClaimDefault: defaultproviderNPI,
        DefaultProviderID_ClaimDefault: DefaultProviderID
          ? DefaultProviderID
          : provide?.[0]?.provide_id,
        officelocationID_ClaimDefault: officelocationID
          ? officelocationID
          : provide?.[0]?.practice?.practice_location?.id,
        // defaultOrderingprovider_ClaimDefault: defaultOrderingprovider,
        // DefaultFacility_ClaimDefault: DefaultFacility,
        // DefaultRef_ClaimDefault: DefaultRef,
        // defaultSalesRep_ClaimDefault: defaultSalesRep,

        defaultOrderingproviderID_ClaimDefault: defaultOrderingproviderID,
        DefaultRefProviderID_ClaimDefault: DefaultRefProviderID,
        defaultSalesRepID_ClaimDefault: defaultSalesRepID,

        DefaultFacilityID_ClaimDefault: DefaultFacilityID,
        DefaultProviderPractID_ClaimDefault: DefaultProviderPractID,
        Assignment_of_Benefits_ClaimDefault: Assignment_of_Benefits,
        provider_accepts_assignments_ClaimDefault: provider_accepts_assignments,
        Include_accident_illness_info_ClaimDefault: Number(
          Include_accident_illness_info
        ),
        Accident_Date_ClaimDefault: Accident_Date,
        Accident_State_ClaimDefault: Accident_State,
        Accident_type_ClaimDefault: Accident_type,
        Box_11b_ClaimDefaults,
        Box_19_ClaimDefaults,
        ICD_A_ClaimDefault: ICD_A,
        ICD_B_ClaimDefault: ICD_B,
        ICD_C_ClaimDefault: ICD_C,
        ICD_D_ClaimDefault: ICD_D,
        ICD_E_ClaimDefault: ICD_E,
        ICD_F_ClaimDefault: ICD_F,
        ICD_G_ClaimDefault: ICD_G,
        ICD_H_ClaimDefault: ICD_H,
        ICD_I_ClaimDefault: ICD_I,
        ICD_J_ClaimDefault: ICD_J,
        ICD_K_ClaimDefault: ICD_K,
        ICD_L_ClaimDefault: ICD_L,
        CPT_1_ClaimDefault: CPT_1,
        CPT_2_ClaimDefault: CPT_2,
        CPT_3_ClaimDefault: CPT_3,
        CPT_4_ClaimDefault: CPT_4,
        CPT_5_ClaimDefault: CPT_5,
        CPT_6_ClaimDefault: CPT_6,

        ICD_A_ClaimDefault_ID: ICD_A_ID,
        ICD_B_ClaimDefault_ID: ICD_B_ID,
        ICD_C_ClaimDefault_ID: ICD_C_ID,
        ICD_D_ClaimDefault_ID: ICD_D_ID,
        ICD_E_ClaimDefault_ID: ICD_E_ID,
        ICD_F_ClaimDefault_ID: ICD_F_ID,
        ICD_G_ClaimDefault_ID: ICD_G_ID,
        ICD_H_ClaimDefault_ID: ICD_H_ID,
        ICD_I_ClaimDefault_ID: ICD_I_ID,
        ICD_J_ClaimDefault_ID: ICD_J_ID,
        ICD_K_ClaimDefault_ID: ICD_K_ID,
        ICD_L_ClaimDefault_ID: ICD_L_ID,
        CPT_1_ClaimDefault_ID: CPT_1_ID,
        CPT_2_ClaimDefault_ID: CPT_2_ID,
        CPT_3_ClaimDefault_ID: CPT_3_ID,
        CPT_4_ClaimDefault_ID: CPT_4_ID,
        CPT_5_ClaimDefault_ID: CPT_5_ID,
        CPT_6_ClaimDefault_ID: CPT_6_ID,

        last_menstrual_date_claimDefaults,
        admission_Date_ClaimDefaults,
        initial_Treatment_Date_ClaimDefault: initial_Treatment_Date,
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
            "New Patient Updated Successfully",
            false,
            1500
          );
          // set input fields to null on below function trigger
          setEmpty();
          navigate("/patient", {
            replace: true,
          });
        }
        if (response.data.status === 422) {
          Alert("center", "error", response.data.message, false, 2500);
        } else if (response.data.status === 500) {
          Alert("center", "error", response.data.error, false, 2500);
        }
        //  else {
        //   Alert("center", "error", response.data.error, false, 2500);
        // }
      })

      .catch((error) => {
        Alert("center", "error", error, false, 2500);
      });
  }
  function post() {
    API.post(
      "patient/store",
      {
        // ******************************** General Form Fields ********************************
        first_name,
        last_name,
        MI,
        suffix,
        gender,
        DOB,
        DOD,
        SSN,
        patient_type,
        referencenum,
        // ******************************** Patient Info ********************************
        Address_contact_PatientInfo: Address_contact,
        Address2_contact_PatientInfo: Address2_contact,
        homephone_contact_PatientInfo: homephone_contact,
        cellphone_contact_PatientInfo: cellphone_contact,
        workphone_contact_PatientInfo: workphone_contact,
        ext_contact_PatientInfo: ext_contact,
        email_contact_PatientInfo: email_contact,
        driver_license_PatientInfo: driver_license,
        marital_status_PatientInfo: marital_status,
        student_status_PatientInfo: student_status,
        employment_status_PatientInfo: employment_status,
        residence_type_PatientInfo: residence_type,
        account_prefix_PatientInfo: account_prefix,
        prefered_language_PatientInfo: prefered_language,
        other_info_PatientInfo: other_info,
        ethnicity_PatientInfo: ethnicityID,
        language_PatientInfo: language,
        race_PatientInfo: race,
        rel_to_patient_PatientInfo: rel_to_patient,
        perm_to_speak_PatientInfo: perm_to_speak,
        last_name_emergency_PatientInfo: last_name_emergency,
        first_name_emergency_PatientInfo: first_name_emergency,
        MI_emergency_PatientInfo: MI_emergency,
        address_emergency_PatientInfo: address_emergency,
        address2_emergency_PatientInfo: address2_emergency,
        homephone_emergencycontact_PatientInfo: homephone_emergencycontact,
        cellphone_emergencycontact_PatientInfo: cellphone_emergencycontact,
        workphone_emergencycontact_PatientInfo: workphone_emergencycontact,
        email_emergencycontact_PatientInfo: email_emergencycontact,
        remarks_emergencycontact_PatientInfo: remarks_emergencycontact,
        referel_source_PatientInfo: referel_emergencycontact,
        zipapicode_PatientInfo: zipapicode,
        zipapi_city_PatientInfo: zipapi_city,
        zipapi_state_PatientInfo: zipapi_state,

        emergencyZip_PatientInfo: emergencyZip,
        emergency_city_PatientInfo: emergency_city,
        emergency_state_PatientInfo: emergency_state,

        // ******************************** Billing Info ********************************
        sendStatement_billing_info: sendStatement,
        statement_type_billing_info: statement_type,
        mailStatement_billingInfo: mailStatement,
        patient_comment_billingInfo: patient_comment,
        patient_comment2_billing_info: patient_comment2,
        finaldemandnotice_billingInfo: finaldemandnotice,
        CollectionDate_billingInfo: CollectionDate,
        collectionreason_billing_info: collectionreason,
        rel_to_patient_guarantor_billingInfo: rel_to_patient_guarantor,
        LastName_billingInfo: billingLastName,
        FirstName_billingInfo: billingFirstName,
        MI_billingInfo: billingMI,
        Address1_billingInfo: billingAddress1,
        Address2_billingInfo: billingAddress2,
        HomePhone_billinginfo,
        CellPhone_billinginfo,
        WorkPhone_billinginfo,
        Email_billingInfo: Email_billing,
        Remarks_billingInfo: remarks_billing,
        zip_billingInfo: zipapicode3,
        city_billingInfo: zipapi_city3,
        state_billingInfo: zipapi_state3,

        // ******************* Insurance info Values ******************
        patient_rel_insured_party,
        lastname_insured_party,
        firstname_insured_party,
        MI_insured_party,
        Suffix_insured_party,
        gender_insured_party,
        DOB_insured_party,
        SSN_insured_party,
        Address1_insured_party,
        Address2_insured_party,
        HomePhone_Insuranceinfo,
        CellPhone_Insuranceinfo,
        WorkPhone_Insuranceinfo,
        Phone_Insuranceinfo,
        Email_Insurance,
        ext_contact_insured_party,
        thirdparty_insured_party,
        Name_employee_info_Insured_party: Name_employee_info,
        employee_status_insured_party: employee_status,
        Address1_employee_info_Insured_party: Address1_employee_info,
        Address2_employee_info_Insured_party: Address2_employee_info,
        Inactivate_Insured_party: Inactivate,
        Inactivate_primary_Insured: Inactivate_primary,
        priority_payer_info: priority,
        policy_type_payer_info: policy_type,
        // payerName_payer_info: payer,
        PayerID_payer_info: payerID,
        memberID_payer_info: memberID,
        groupID_payer_info: groupID,
        copay_payer_info: copay,
        co_insurance_payer_info: co_insurance,
        deductible_payer_info: deductible,
        OutOfPocket_payer_info: OutOfPocket,
        effectiveDate_payer_info: effectiveDate,
        terminationDate_payer_info: terminationDate,
        zipapicode_insured_party,
        zipapi_city_insured_party,
        zipapi_state_insured_party,
        zipapicode_employee_info_Insured_party: zipapicode_employee_info,
        zipapi_city_employee_info_Insured_party: zipapi_city_employee_info,
        zipapi_state_employee_info_Insured_party: zipapi_state_employee_info,

        // ******************* Claim Default Values ******************
        // defaultprovider_ClaimDefault: defaultprovider,
        // // defaultproviderNPI_ClaimDefault: defaultproviderNPI,
        DefaultProviderID_ClaimDefault: DefaultProviderID
          ? DefaultProviderID
          : provide?.[0]?.provide_id,
        officelocationID_ClaimDefault: officelocationID
          ? officelocationID
          : provide?.[0]?.practice?.practice_location?.id,
        // defaultOrderingprovider_ClaimDefault: defaultOrderingprovider,
        // DefaultFacility_ClaimDefault: DefaultFacility,
        // DefaultRef_ClaimDefault: DefaultRef,
        // defaultSalesRep_ClaimDefault: defaultSalesRep,

        defaultOrderingproviderID_ClaimDefault: defaultOrderingproviderID,
        DefaultRefProviderID_ClaimDefault: DefaultRefProviderID,
        defaultSalesRepID_ClaimDefault: defaultSalesRepID,

        DefaultFacilityID_ClaimDefault: DefaultFacilityID,
        DefaultProviderPractID_ClaimDefault: DefaultProviderPractID,
        Assignment_of_Benefits_ClaimDefault: Assignment_of_Benefits,
        provider_accepts_assignments_ClaimDefault: provider_accepts_assignments,
        Include_accident_illness_info_ClaimDefault:
          Include_accident_illness_info,
        Accident_Date_ClaimDefault: Accident_Date,
        Accident_State_ClaimDefault: Accident_State,
        Accident_type_ClaimDefault: Accident_type,
        Box_11b_ClaimDefaults,
        Box_19_ClaimDefaults,
        ICD_A_ClaimDefault: ICD_A,
        ICD_B_ClaimDefault: ICD_B,
        ICD_C_ClaimDefault: ICD_C,
        ICD_D_ClaimDefault: ICD_D,
        ICD_E_ClaimDefault: ICD_E,
        ICD_F_ClaimDefault: ICD_F,
        ICD_G_ClaimDefault: ICD_G,
        ICD_H_ClaimDefault: ICD_H,
        ICD_I_ClaimDefault: ICD_I,
        ICD_J_ClaimDefault: ICD_J,
        ICD_K_ClaimDefault: ICD_K,
        ICD_L_ClaimDefault: ICD_L,
        CPT_1_ClaimDefault: CPT_1,
        CPT_2_ClaimDefault: CPT_2,
        CPT_3_ClaimDefault: CPT_3,
        CPT_4_ClaimDefault: CPT_4,
        CPT_5_ClaimDefault: CPT_5,
        CPT_6_ClaimDefault: CPT_6,

        ICD_A_ClaimDefault_ID: ICD_A_ID,
        ICD_B_ClaimDefault_ID: ICD_B_ID,
        ICD_C_ClaimDefault_ID: ICD_C_ID,
        ICD_D_ClaimDefault_ID: ICD_D_ID,
        ICD_E_ClaimDefault_ID: ICD_E_ID,
        ICD_F_ClaimDefault_ID: ICD_F_ID,
        ICD_G_ClaimDefault_ID: ICD_G_ID,
        ICD_H_ClaimDefault_ID: ICD_H_ID,
        ICD_I_ClaimDefault_ID: ICD_I_ID,
        ICD_J_ClaimDefault_ID: ICD_J_ID,
        ICD_K_ClaimDefault_ID: ICD_K_ID,
        ICD_L_ClaimDefault_ID: ICD_L_ID,
        CPT_1_ClaimDefault_ID: CPT_1_ID,
        CPT_2_ClaimDefault_ID: CPT_2_ID,
        CPT_3_ClaimDefault_ID: CPT_3_ID,
        CPT_4_ClaimDefault_ID: CPT_4_ID,
        CPT_5_ClaimDefault_ID: CPT_5_ID,
        CPT_6_ClaimDefault_ID: CPT_6_ID,

        last_menstrual_date_claimDefaults,
        admission_Date_ClaimDefaults,
        initial_Treatment_Date_ClaimDefault: initial_Treatment_Date,
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
            "New Patient Added Successfully",
            false,
            1500
          );
          // set input fields to null on below function trigger
          setEmpty();
          navigate("/patient", {
            replace: true,
          });
        }
        if (response.data.status === 422) {
          Alert("center", "error", response.data.message, false, 2500);
        } else if (response.data.status === 500) {
          Alert("center", "error", response.data.error, false, 2500);
        }
        //  else {
        //   Alert("center", "error", response.data.error, false, 2500);
        // }
      })

      .catch((error) => {
        Alert("center", "error", error, false, 2500);
      });
  }
  const {
    values,

    handleSubmit,
  } = useFormik({
    initialValues: {
      first_name: "",
    },
    validationSchema: FormValPat,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, action) => {
      // gender_insured_party === ""
      //   ? alert("Insurance is required")
      //   :

      editpatientID
        ? validateEmail() &&
          validateEmail_emergency() &&
          validateEmail_Insurance() &&
          validateEmail_Billing() &&
          put()
        : validateEmail() &&
          validateEmail_emergency() &&
          validateEmail_Insurance() &&
          validateEmail_Billing() &&
          post();
      action.resetForm();
    },
  });
  return (
    <>
      {/* *************** Default Diagnostic Codes Modal Start ********************* */}

      <div
        className="modal fade"
        id="DefaultCodesModel"
        tabIndex={-1}
        aria-labelledby="DefaultCodesModel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-md modal-dialog-centered text-dark">
          <div className="modal-content">
            <div className="modal-body">
              {/* ********************************** */}
              <div className="col-md-12">
                <div className="input-group">
                  <input
                    className="form-control form-control-sm w-50"
                    type="text"
                    placeholder="Search for Diagnosis codes by code or description."
                    id="search"
                    name="search"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength={60}
                    onChange={(e) => setsearchICD(e.target.value?.toString())}
                  />
                  <button
                    type="button"
                    className="input-group-text btn-hov"
                    id="searchbtn"
                  >
                    <i className="fas fa-search" aria-hidden="true" />
                  </button>
                </div>

                <div className="form-check mt-2 mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="inactive_providers"
                    name="inactive_providers"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="inactive_providers"
                  >
                    Include inactive codes
                  </label>
                </div>

                <div className="col-md-12">
                  <div className="table-responsive" style={{ height: "300px" }}>
                    <table className="table table-light table-hover table-striped table table-bordered caption-top">
                      <thead className="">
                        <tr>
                          <th>Diagnosis Code</th>
                          <th>Description</th>
                          <th>Inactive</th>
                        </tr>
                      </thead>
                      {ICDStatus === "ICD_A_Status" && (
                        <tbody>
                          {load_ICDs
                            ? "Loading..."
                            : ICD_data?.filter((item) => {
                                return searchICD === ""
                                  ? item
                                  : item?.diagnosis_code
                                      ?.toLowerCase()
                                      .includes(searchICD?.toLowerCase()) ||
                                      item?.description
                                        ?.toString()
                                        ?.toLowerCase()
                                        .includes(searchICD?.toLowerCase());
                              })?.map((icd, i) => {
                                return (
                                  <tr
                                    className="table-active facility-font"
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      setICD_A(icd?.diagnosis_code);
                                      setICD_A_ID(icd?.id);
                                    }}
                                  >
                                    <td>{icd?.diagnosis_code}</td>
                                    <td>{icd?.description}</td>
                                    <td>{icd?.deleted_at ? "Inactive" : ""}</td>
                                  </tr>
                                );
                              })}
                        </tbody>
                      )}
                      {ICDStatus === "ICD_B_Status" && (
                        <tbody>
                          {load_ICDs
                            ? "Loading..."
                            : ICD_data?.filter((item) => {
                                return searchICD === ""
                                  ? item
                                  : item?.diagnosis_code
                                      ?.toLowerCase()
                                      .includes(searchICD?.toLowerCase()) ||
                                      item?.description
                                        ?.toString()
                                        ?.toLowerCase()
                                        .includes(searchICD?.toLowerCase());
                              })?.map((icd, i) => {
                                return (
                                  <tr
                                    className="table-active facility-font"
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      setICD_B(icd?.diagnosis_code);

                                      setICD_B_ID(icd?.id);
                                    }}
                                  >
                                    <td>{icd?.diagnosis_code}</td>
                                    <td>{icd?.description}</td>
                                    <td>{icd?.deleted_at ? "Inactive" : ""}</td>
                                  </tr>
                                );
                              })}
                        </tbody>
                      )}
                      {ICDStatus === "ICD_C_Status" && (
                        <tbody>
                          {load_ICDs
                            ? "Loading..."
                            : ICD_data?.filter((item) => {
                                return searchICD === ""
                                  ? item
                                  : item?.diagnosis_code
                                      ?.toLowerCase()
                                      .includes(searchICD?.toLowerCase()) ||
                                      item?.description
                                        ?.toString()
                                        ?.toLowerCase()
                                        .includes(searchICD?.toLowerCase());
                              })?.map((icd, i) => {
                                return (
                                  <tr
                                    className="table-active facility-font"
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      setICD_C(icd?.diagnosis_code);
                                      setICD_C_ID(icd?.id);
                                    }}
                                  >
                                    <td>{icd?.diagnosis_code}</td>
                                    <td>{icd?.description}</td>
                                    <td>{icd?.deleted_at ? "Inactive" : ""}</td>
                                  </tr>
                                );
                              })}
                        </tbody>
                      )}
                      {ICDStatus === "ICD_D_Status" && (
                        <tbody>
                          {load_ICDs
                            ? "Loading..."
                            : ICD_data?.filter((item) => {
                                return searchICD === ""
                                  ? item
                                  : item?.diagnosis_code
                                      ?.toLowerCase()
                                      .includes(searchICD?.toLowerCase()) ||
                                      item?.description
                                        ?.toString()
                                        ?.toLowerCase()
                                        .includes(searchICD?.toLowerCase());
                              })?.map((icd, i) => {
                                return (
                                  <tr
                                    className="table-active facility-font"
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      setICD_D(icd?.diagnosis_code);
                                      setICD_D_ID(icd?.id);
                                    }}
                                  >
                                    <td>{icd?.diagnosis_code}</td>
                                    <td>{icd?.description}</td>
                                    <td>{icd?.deleted_at ? "Inactive" : ""}</td>
                                  </tr>
                                );
                              })}
                        </tbody>
                      )}
                      {ICDStatus === "ICD_E_Status" && (
                        <tbody>
                          {load_ICDs
                            ? "Loading..."
                            : ICD_data?.filter((item) => {
                                return searchICD === ""
                                  ? item
                                  : item?.diagnosis_code
                                      ?.toLowerCase()
                                      .includes(searchICD?.toLowerCase()) ||
                                      item?.description
                                        ?.toString()
                                        ?.toLowerCase()
                                        .includes(searchICD?.toLowerCase());
                              })?.map((icd, i) => {
                                return (
                                  <tr
                                    className="table-active facility-font"
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      setICD_E(icd?.diagnosis_code);
                                      setICD_E_ID(icd?.id);
                                    }}
                                  >
                                    <td>{icd?.diagnosis_code}</td>
                                    <td>{icd?.description}</td>
                                    <td>{icd?.deleted_at ? "Inactive" : ""}</td>
                                  </tr>
                                );
                              })}
                        </tbody>
                      )}
                      {ICDStatus === "ICD_F_Status" && (
                        <tbody>
                          {load_ICDs
                            ? "Loading..."
                            : ICD_data?.filter((item) => {
                                return searchICD === ""
                                  ? item
                                  : item?.diagnosis_code
                                      ?.toLowerCase()
                                      .includes(searchICD?.toLowerCase()) ||
                                      item?.description
                                        ?.toString()
                                        ?.toLowerCase()
                                        .includes(searchICD?.toLowerCase());
                              })?.map((icd, i) => {
                                return (
                                  <tr
                                    className="table-active facility-font"
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      setICD_F(icd?.diagnosis_code);
                                      setICD_F_ID(icd?.id);
                                    }}
                                  >
                                    <td>{icd?.diagnosis_code}</td>
                                    <td>{icd?.description}</td>
                                    <td>{icd?.deleted_at ? "Inactive" : ""}</td>
                                  </tr>
                                );
                              })}
                        </tbody>
                      )}
                      {ICDStatus === "ICD_G_Status" && (
                        <tbody>
                          {load_ICDs
                            ? "Loading..."
                            : ICD_data?.filter((item) => {
                                return searchICD === ""
                                  ? item
                                  : item?.diagnosis_code
                                      ?.toLowerCase()
                                      .includes(searchICD?.toLowerCase()) ||
                                      item?.description
                                        ?.toString()
                                        ?.toLowerCase()
                                        .includes(searchICD?.toLowerCase());
                              })?.map((icd, i) => {
                                return (
                                  <tr
                                    className="table-active facility-font"
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      setICD_G(icd?.diagnosis_code);
                                      setICD_G_ID(icd?.id);
                                    }}
                                  >
                                    <td>{icd?.diagnosis_code}</td>
                                    <td>{icd?.description}</td>
                                    <td>{icd?.deleted_at ? "Inactive" : ""}</td>
                                  </tr>
                                );
                              })}
                        </tbody>
                      )}
                      {ICDStatus === "ICD_H_Status" && (
                        <tbody>
                          {load_ICDs
                            ? "Loading..."
                            : ICD_data?.filter((item) => {
                                return searchICD === ""
                                  ? item
                                  : item?.diagnosis_code
                                      ?.toLowerCase()
                                      .includes(searchICD?.toLowerCase()) ||
                                      item?.description
                                        ?.toString()
                                        ?.toLowerCase()
                                        .includes(searchICD?.toLowerCase());
                              })?.map((icd, i) => {
                                return (
                                  <tr
                                    className="table-active facility-font"
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      setICD_H(icd?.diagnosis_code);
                                      setICD_H_ID(icd?.id);
                                    }}
                                  >
                                    <td>{icd?.diagnosis_code}</td>
                                    <td>{icd?.description}</td>
                                    <td>{icd?.deleted_at ? "Inactive" : ""}</td>
                                  </tr>
                                );
                              })}
                        </tbody>
                      )}
                      {ICDStatus === "ICD_I_Status" && (
                        <tbody>
                          {load_ICDs
                            ? "Loading..."
                            : ICD_data?.filter((item) => {
                                return searchICD === ""
                                  ? item
                                  : item?.diagnosis_code
                                      ?.toLowerCase()
                                      .includes(searchICD?.toLowerCase()) ||
                                      item?.description
                                        ?.toString()
                                        ?.toLowerCase()
                                        .includes(searchICD?.toLowerCase());
                              })?.map((icd, i) => {
                                return (
                                  <tr
                                    className="table-active facility-font"
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      setICD_I(icd?.diagnosis_code);
                                      setICD_I_ID(icd?.id);
                                    }}
                                  >
                                    <td>{icd?.diagnosis_code}</td>
                                    <td>{icd?.description}</td>
                                    <td>{icd?.deleted_at ? "Inactive" : ""}</td>
                                  </tr>
                                );
                              })}
                        </tbody>
                      )}
                      {ICDStatus === "ICD_J_Status" && (
                        <tbody>
                          {load_ICDs
                            ? "Loading..."
                            : ICD_data?.filter((item) => {
                                return searchICD === ""
                                  ? item
                                  : item?.diagnosis_code
                                      ?.toLowerCase()
                                      .includes(searchICD?.toLowerCase()) ||
                                      item?.description
                                        ?.toString()
                                        ?.toLowerCase()
                                        .includes(searchICD?.toLowerCase());
                              })?.map((icd, i) => {
                                return (
                                  <tr
                                    className="table-active facility-font"
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      setICD_J(icd?.diagnosis_code);
                                      setICD_J_ID(icd?.id);
                                    }}
                                  >
                                    <td>{icd?.diagnosis_code}</td>
                                    <td>{icd?.description}</td>
                                    <td>{icd?.deleted_at ? "Inactive" : ""}</td>
                                  </tr>
                                );
                              })}
                        </tbody>
                      )}
                      {ICDStatus === "ICD_K_Status" && (
                        <tbody>
                          {load_ICDs
                            ? "Loading..."
                            : ICD_data?.filter((item) => {
                                return searchICD === ""
                                  ? item
                                  : item?.diagnosis_code
                                      ?.toLowerCase()
                                      .includes(searchICD?.toLowerCase()) ||
                                      item?.description
                                        ?.toString()
                                        ?.toLowerCase()
                                        .includes(searchICD?.toLowerCase());
                              })?.map((icd, i) => {
                                return (
                                  <tr
                                    className="table-active facility-font"
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      setICD_K(icd?.diagnosis_code);
                                      setICD_K_ID(icd?.id);
                                    }}
                                  >
                                    <td>{icd?.diagnosis_code}</td>
                                    <td>{icd?.description}</td>
                                    <td>{icd?.deleted_at ? "Inactive" : ""}</td>
                                  </tr>
                                );
                              })}
                        </tbody>
                      )}
                      {ICDStatus === "ICD_L_Status" && (
                        <tbody>
                          {load_ICDs
                            ? "Loading..."
                            : ICD_data?.filter((item) => {
                                return searchICD === ""
                                  ? item
                                  : item?.diagnosis_code
                                      ?.toLowerCase()
                                      .includes(searchICD?.toLowerCase()) ||
                                      item?.description
                                        ?.toString()
                                        ?.toLowerCase()
                                        .includes(searchICD?.toLowerCase());
                              })?.map((icd, i) => {
                                return (
                                  <tr
                                    className="table-active facility-font"
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      setICD_L(icd?.diagnosis_code);
                                      setICD_L_ID(icd?.id);
                                    }}
                                  >
                                    <td>{icd?.diagnosis_code}</td>
                                    <td>{icd?.description}</td>
                                    <td>{icd?.deleted_at ? "Inactive" : ""}</td>
                                  </tr>
                                );
                              })}
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
              {/* ******************************** */}
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

      {/* *********************Default Diagnostic Codes Modal End ********************* */}

      {/* *************** Default CPT Codes Modal Start ********************* */}

      <div
        className="modal fade"
        id="DefaultCPTCodesModel"
        tabIndex={-1}
        aria-labelledby="DefaultCPTCodesModel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-md modal-dialog-centered text-dark">
          <div className="modal-content">
            <div className="modal-body">
              {/* ********************************** */}
              <div className="col-md-12">
                <div className="input-group">
                  <input
                    className="form-control form-control-sm w-50"
                    type="text"
                    placeholder="Search for CPT/HCPCS codes by code or description."
                    id="search"
                    name="search"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength={60}
                    onChange={(e) => setsearchCPT(e.target.value?.toString())}
                  />
                  <button
                    type="button"
                    className="input-group-text btn-hov"
                    id="searchbtn"
                  >
                    <i className="fas fa-search" aria-hidden="true" />
                  </button>
                </div>

                <div className="form-check mt-2 mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="inactive_CPT"
                    name="inactive_CPT"
                  />
                  <label className="form-check-label" htmlFor="inactive_CPT">
                    Include inactive codes
                  </label>
                </div>

                <div className="col-md-12">
                  <div className="table-responsive" style={{ height: "300px" }}>
                    <table className="table table-light table-hover table-striped table table-bordered caption-top">
                      <thead className="">
                        <tr>
                          <th>Code</th>
                          <th>Description</th>
                          <th>Price</th>
                          <th>Inactive</th>
                        </tr>
                      </thead>
                      {CPTStatus === "CPT_1_Status" && (
                        <tbody>
                          {load_CPTs
                            ? "Loading..."
                            : CPT_data?.filter((item) => {
                                return searchCPT === ""
                                  ? item
                                  : item?.procedure_code
                                      ?.toLowerCase()
                                      .includes(searchCPT?.toLowerCase()) ||
                                      item?.description
                                        ?.toString()
                                        ?.toLowerCase()
                                        .includes(searchCPT?.toLowerCase());
                              })?.map((cpt, i) => {
                                return (
                                  <tr
                                    className="table-active facility-font"
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      setCPT_1(cpt?.procedure_code);
                                      setCPT_1_ID(cpt?.id);
                                    }}
                                  >
                                    <td>{cpt?.procedure_code}</td>
                                    <td>{cpt?.description}</td>
                                    <td>{cpt?.default_price}</td>
                                    <td>{cpt?.deleted_at ? "Inactive" : ""}</td>
                                  </tr>
                                );
                              })}
                        </tbody>
                      )}

                      {CPTStatus === "CPT_2_Status" && (
                        <tbody>
                          {load_CPTs
                            ? "Loading..."
                            : CPT_data?.filter((item) => {
                                return searchCPT === ""
                                  ? item
                                  : item?.procedure_code
                                      ?.toLowerCase()
                                      .includes(searchCPT?.toLowerCase()) ||
                                      item?.description
                                        ?.toString()
                                        ?.toLowerCase()
                                        .includes(searchCPT?.toLowerCase());
                              })?.map((cpt, i) => {
                                return (
                                  <tr
                                    className="table-active facility-font"
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      setCPT_2(cpt?.procedure_code);
                                      setCPT_2_ID(cpt?.id);
                                    }}
                                  >
                                    <td>{cpt?.procedure_code}</td>
                                    <td>{cpt?.description}</td>
                                    <td>{cpt?.default_price}</td>
                                    <td>{cpt?.deleted_at ? "Inactive" : ""}</td>
                                  </tr>
                                );
                              })}
                        </tbody>
                      )}

                      {CPTStatus === "CPT_3_Status" && (
                        <tbody>
                          {load_CPTs
                            ? "Loading..."
                            : CPT_data?.filter((item) => {
                                return searchCPT === ""
                                  ? item
                                  : item?.procedure_code
                                      ?.toLowerCase()
                                      .includes(searchCPT?.toLowerCase()) ||
                                      item?.description
                                        ?.toString()
                                        ?.toLowerCase()
                                        .includes(searchCPT?.toLowerCase());
                              })?.map((cpt, i) => {
                                return (
                                  <tr
                                    className="table-active facility-font"
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      setCPT_3(cpt?.procedure_code);
                                      setCPT_3_ID(cpt?.id);
                                    }}
                                  >
                                    <td>{cpt?.procedure_code}</td>
                                    <td>{cpt?.description}</td>
                                    <td>{cpt?.default_price}</td>
                                    <td>{cpt?.deleted_at ? "Inactive" : ""}</td>
                                  </tr>
                                );
                              })}
                        </tbody>
                      )}

                      {CPTStatus === "CPT_4_Status" && (
                        <tbody>
                          {load_CPTs
                            ? "Loading..."
                            : CPT_data?.filter((item) => {
                                return searchCPT === ""
                                  ? item
                                  : item?.procedure_code
                                      ?.toLowerCase()
                                      .includes(searchCPT?.toLowerCase()) ||
                                      item?.description
                                        ?.toString()
                                        ?.toLowerCase()
                                        .includes(searchCPT?.toLowerCase());
                              })?.map((cpt, i) => {
                                return (
                                  <tr
                                    className="table-active facility-font"
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      setCPT_4(cpt?.procedure_code);
                                      setCPT_4_ID(cpt?.id);
                                    }}
                                  >
                                    <td>{cpt?.procedure_code}</td>
                                    <td>{cpt?.description}</td>
                                    <td>{cpt?.default_price}</td>
                                    <td>{cpt?.deleted_at ? "Inactive" : ""}</td>
                                  </tr>
                                );
                              })}
                        </tbody>
                      )}

                      {CPTStatus === "CPT_5_Status" && (
                        <tbody>
                          {load_CPTs
                            ? "Loading..."
                            : CPT_data?.filter((item) => {
                                return searchCPT === ""
                                  ? item
                                  : item?.procedure_code
                                      ?.toLowerCase()
                                      .includes(searchCPT?.toLowerCase()) ||
                                      item?.description
                                        ?.toString()
                                        ?.toLowerCase()
                                        .includes(searchCPT?.toLowerCase());
                              })?.map((cpt, i) => {
                                return (
                                  <tr
                                    className="table-active facility-font"
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      setCPT_5(cpt?.procedure_code);
                                      setCPT_5_ID(cpt?.id);
                                    }}
                                  >
                                    <td>{cpt?.procedure_code}</td>
                                    <td>{cpt?.description}</td>
                                    <td>{cpt?.default_price}</td>
                                    <td>{cpt?.deleted_at ? "Inactive" : ""}</td>
                                  </tr>
                                );
                              })}
                        </tbody>
                      )}

                      {CPTStatus === "CPT_6_Status" && (
                        <tbody>
                          {load_CPTs
                            ? "Loading..."
                            : CPT_data?.filter((item) => {
                                return searchCPT === ""
                                  ? item
                                  : item?.procedure_code
                                      ?.toLowerCase()
                                      .includes(searchCPT?.toLowerCase()) ||
                                      item?.description
                                        ?.toString()
                                        ?.toLowerCase()
                                        .includes(searchCPT?.toLowerCase());
                              })?.map((cpt, i) => {
                                return (
                                  <tr
                                    className="table-active facility-font"
                                    key={i}
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      setCPT_6(cpt?.procedure_code);
                                      setCPT_6_ID(cpt?.id);
                                    }}
                                  >
                                    <td>{cpt?.procedure_code}</td>
                                    <td>{cpt?.description}</td>
                                    <td>{cpt?.default_price}</td>
                                    <td>{cpt?.deleted_at ? "Inactive" : ""}</td>
                                  </tr>
                                );
                              })}
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
              {/* ******************************** */}
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

      {/* *********************Default CPT Codes Modal End ********************* */}

      {/* *************** Default Provider Modal Start ********************* */}
      <div
        className="modal fade"
        id="showAllProvidersModel"
        tabIndex={-1}
        aria-labelledby="showAllProvidersModel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-md modal-dialog-centered text-dark">
          <div className="modal-content">
            <div className="modal-body">
              {/* ********************************** */}
              <div className="col-md-12">
                <div className="input-group">
                  <input
                    className="form-control form-control-sm w-50"
                    type="text"
                    placeholder="Search for provider by name or ID"
                    id="search"
                    name="search"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength={10}
                    onChange={(e) =>
                      setSearchProvider(e.target.value?.toString())
                    }
                  />
                  <button
                    type="button"
                    className="input-group-text btn-hov"
                    id="searchbtn"
                  >
                    <i className="fas fa-search" aria-hidden="true" />
                  </button>
                </div>

                <div className="form-check mt-2 mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="inactive_providers"
                    name="inactive_providers"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="inactive_providers"
                  >
                    Include inactive providers
                  </label>
                </div>

                <div className="col-md-12">
                  <div className="table-responsive" style={{ height: "300px" }}>
                    <table className="table table-light table-hover table-striped table table-bordered caption-top">
                      <thead className="">
                        <tr>
                          <th>Provider Name</th>
                          <th>NPI</th>
                          <th>Seq#</th>

                          <th>Inactive</th>
                        </tr>
                      </thead>
                      <tbody>
                        {provide
                          ?.filter((item) => {
                            return searchprovider === ""
                              ? item
                              : item?.provider?.first_name
                                  ?.toLowerCase()
                                  .includes(searchprovider?.toLowerCase()) ||
                                  item?.provider?.npi_code
                                    ?.toString()
                                    ?.toLowerCase()
                                    .includes(searchprovider?.toLowerCase()) ||
                                  item?.sequence_provider?.id
                                    ?.toString()
                                    ?.toLowerCase()
                                    .includes(searchprovider?.toLowerCase());
                          })
                          ?.map((prov, i) => {
                            return (
                              <tr
                                className="table-active facility-font"
                                key={i}
                                data-bs-dismiss="modal"
                                onClick={() => {
                                  setofficelocationName(
                                    prov?.practice?.practice_location?.name !=
                                      null
                                      ? prov?.practice?.practice_location?.name
                                      : ""
                                  );
                                  setdefaultpractice(
                                    prov?.practice?.name != null
                                      ? prov?.practice?.name
                                      : ""
                                  );
                                  setofficelocationID(
                                    prov?.practice?.practice_location?.id
                                      ? prov?.practice?.practice_location?.id
                                      : ""
                                  );
                                  setDefaultProviderNPI(
                                    prov?.provider?.npi_code
                                  );
                                  setDefaultProvider(
                                    prov?.provider?.last_name +
                                      ` , ` +
                                      prov?.provider?.first_name +
                                      `  ` +
                                      `(${prov?.sequence_provider?.id})`
                                  );
                                  setDefaultProviderID(prov?.provide_id);
                                  setDefaultProviderPractID(prov?.practice?.id);
                                }}
                              >
                                <td>
                                  {prov?.provider?.last_name +
                                    ` ` +
                                    prov?.provider?.first_name}
                                </td>
                                <td>{prov?.provider?.npi_code}</td>
                                <td>{prov?.sequence_provider?.id}</td>

                                <td>
                                  {prov.Inactive == true ? (
                                    <span className="fas fa-check"></span>
                                  ) : (
                                    ""
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* ******************************** */}
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
      {/* *********************Default Provider Modal End ********************* */}

      {/* ***************** Default Ordering Provider Modal **************** */}
      {/* ************************************ */}
      <div
        className="modal fade"
        id="showAllRefProvidersModel"
        tabIndex={-1}
        aria-labelledby="showAllRefProvidersModel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-md modal-dialog-centered text-dark">
          <div className="modal-content">
            <div className="modal-body">
              {/* ********************************** */}
              <div className="col-md-12">
                <div className="input-group ">
                  <input
                    className="form-control form-control-sm w-50"
                    type="text"
                    placeholder="Search for provider by name or ID"
                    id="search"
                    name="search"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength={10}
                    onChange={(e) =>
                      setSearchRefProvider(e.target.value?.toString())
                    }
                  />
                  <button
                    type="button"
                    className="input-group-text btn-hov"
                    id="searchbtn"
                  >
                    <i className="fas fa-search" aria-hidden="true" />
                  </button>
                </div>

                <div className="form-check mt-2 mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="inactive_providers"
                    name="inactive_providers"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="inactive_providers"
                  >
                    Include inactive providers
                  </label>
                </div>

                <div className="col-md-12">
                  <div className="table-responsive" style={{ height: "300px" }}>
                    <table className="table table-light table-hover table-striped table table-bordered caption-top table-responsive">
                      <thead className="">
                        <tr>
                          <th>Last Name</th>
                          <th>First Name</th>
                          <th>Credentials</th>
                          <th>Seq#</th>
                          <th>NPI</th>
                          <th>Inactive</th>
                        </tr>
                      </thead>
                      {loadref ? (
                        "Loading..."
                      ) : (
                        <tbody>
                          <>
                            {recentreferringproviders
                              ?.filter((item) => {
                                return RefSearch === ""
                                  ? item
                                  : item?.last_name
                                      ?.toString()
                                      ?.toLowerCase()
                                      ?.includes(RefSearch?.toLowerCase()) ||
                                      item?.first_name
                                        ?.toString()
                                        ?.toLowerCase()
                                        ?.includes(RefSearch?.toLowerCase()) ||
                                      item?.credentials
                                        ?.toString()
                                        ?.toLowerCase()
                                        ?.includes(RefSearch?.toLowerCase()) ||
                                      item?.sequence?.id
                                        ?.toString()
                                        ?.toLowerCase()
                                        ?.includes(RefSearch?.toLowerCase()) ||
                                      item?.npi_code
                                        ?.toString()
                                        ?.toLowerCase()
                                        ?.includes(RefSearch?.toLowerCase());
                              })
                              ?.map((ref, i) => {
                                return (
                                  <tr
                                    data-bs-dismiss="modal"
                                    key={i}
                                    {...ref}
                                    onClick={(e) => {
                                      setdefaultOrderingprovider(
                                        ref?.last_name + ` , ` + ref?.first_name
                                      );
                                      setdefaultOrderingproviderID(ref?.id);
                                    }}
                                  >
                                    <td>{ref?.last_name}</td>
                                    <td>{ref?.first_name}</td>
                                    <td>{ref?.credentials}</td>
                                    <td>{ref?.sequence?.id}</td>
                                    <td>{ref?.npi_code}</td>

                                    <td>{ref?.deleted_at}</td>
                                  </tr>
                                );
                              })}
                          </>
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
              {/* ******************************** */}
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
      {/* ****************************************** */}

      {/* ***************** Default Referring Provider Modal **************** */}
      {/* ************************************ */}
      <div
        className="modal fade"
        id="showDefaultRefProvidersModel"
        tabIndex={-1}
        aria-labelledby="showDefaultRefProvidersModel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-md modal-dialog-centered text-dark">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 fw-bold"
                id="exampleModalToggleLabel"
              >
                All Referring Providers
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* ********************************** */}
              <div className="col-md-12">
                <div className="input-group ">
                  <input
                    className="form-control form-control-sm w-50"
                    type="text"
                    placeholder="Search for provider by name or ID"
                    id="search"
                    name="search"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength={10}
                    onChange={(e) =>
                      setSearchDefaultRefProvider(e.target.value?.toString())
                    }
                  />
                  <button
                    type="button"
                    className="input-group-text btn-hov"
                    id="searchbtn"
                  >
                    <i className="fas fa-search" aria-hidden="true" />
                  </button>
                </div>

                <div className="form-check mt-2 mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="inactive_providers"
                    name="inactive_providers"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="inactive_providers"
                  >
                    Include inactive referring providers
                  </label>
                </div>

                <div className="col-md-12">
                  <div className="table-responsive" style={{ height: "300px" }}>
                    <table className="table table-light table-hover table-striped table table-bordered caption-top table-responsive">
                      <thead className="">
                        <tr>
                          <th>Last Name</th>
                          <th>First Name</th>
                          <th>Credentials</th>
                          <th>Seq#</th>
                          <th>NPI</th>
                          <th>Inactive</th>
                        </tr>
                      </thead>
                      {loadref ? (
                        "Loading..."
                      ) : (
                        <tbody>
                          <>
                            {recentreferringproviders
                              ?.filter((item) => {
                                return DefaultRefSearch === ""
                                  ? item
                                  : item?.last_name
                                      ?.toString()
                                      ?.toLowerCase()
                                      ?.includes(
                                        DefaultRefSearch?.toLowerCase()
                                      ) ||
                                      item?.first_name
                                        ?.toString()
                                        ?.toLowerCase()
                                        ?.includes(
                                          DefaultRefSearch?.toLowerCase()
                                        ) ||
                                      item?.credentials
                                        ?.toString()
                                        ?.toLowerCase()
                                        ?.includes(
                                          DefaultRefSearch?.toLowerCase()
                                        ) ||
                                      item?.sequence?.id
                                        ?.toString()
                                        ?.toLowerCase()
                                        ?.includes(
                                          DefaultRefSearch?.toLowerCase()
                                        ) ||
                                      item?.npi_code
                                        ?.toString()
                                        ?.toLowerCase()
                                        ?.includes(
                                          DefaultRefSearch?.toLowerCase()
                                        );
                              })
                              ?.map((ref, i) => {
                                return (
                                  <tr
                                    data-bs-dismiss="modal"
                                    key={i}
                                    {...ref}
                                    onClick={(e) => {
                                      setDefaultRefProvider(
                                        ref?.last_name + ` , ` + ref?.first_name
                                      );
                                      setDefaultRefProviderID(ref?.id);
                                    }}
                                  >
                                    <td>{ref?.last_name}</td>
                                    <td>{ref?.first_name}</td>
                                    <td>{ref?.credentials}</td>
                                    <td>{ref?.sequence?.id}</td>
                                    <td>{ref?.npi_code}</td>

                                    <td>{ref?.deleted_at}</td>
                                  </tr>
                                );
                              })}
                          </>
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
              {/* ******************************** */}
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
      {/* ********************end default ref provider modal********************** */}

      {/* ***************** Default Sales Rep Modal **************** */}
      {/* ************************************ */}
      <div
        className="modal fade"
        id="showDefaultSalesRepModel"
        tabIndex={-1}
        aria-labelledby="showDefaultSalesRepModel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-md modal-dialog-centered text-dark">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 fw-bold"
                id="exampleModalToggleLabel"
              >
                All Referring Providers
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* ********************************** */}
              <div className="col-md-12">
                <div className="input-group ">
                  <input
                    className="form-control form-control-sm w-50"
                    type="text"
                    placeholder="Search for provider by name or ID"
                    id="search"
                    name="search"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength={10}
                    onChange={(e) =>
                      setSearchdefaultSalesRep(e.target.value?.toString())
                    }
                  />
                  <button
                    type="button"
                    className="input-group-text btn-hov"
                    id="searchbtn"
                  >
                    <i className="fas fa-search" aria-hidden="true" />
                  </button>
                </div>

                <div className="form-check mt-2 mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="inactive_providers"
                    name="inactive_providers"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="inactive_providers"
                  >
                    Include inactive referring providers
                  </label>
                </div>

                <div className="col-md-12">
                  <div className="table-responsive" style={{ height: "300px" }}>
                    <table className="table table-light table-hover table-striped table table-bordered caption-top table-responsive">
                      <thead className="">
                        <tr>
                          <th>Last Name</th>
                          <th>First Name</th>
                          <th>Credentials</th>
                          <th>Seq#</th>
                          <th>NPI</th>
                          <th>Inactive</th>
                        </tr>
                      </thead>
                      {loadref ? (
                        "Loading..."
                      ) : (
                        <tbody>
                          <>
                            {recentreferringproviders
                              ?.filter((item) => {
                                return SearchdefaultSalesRep === ""
                                  ? item
                                  : item?.last_name
                                      ?.toString()
                                      ?.toLowerCase()
                                      ?.includes(
                                        SearchdefaultSalesRep?.toLowerCase()
                                      ) ||
                                      item?.first_name
                                        ?.toString()
                                        ?.toLowerCase()
                                        ?.includes(
                                          SearchdefaultSalesRep?.toLowerCase()
                                        ) ||
                                      item?.credentials
                                        ?.toString()
                                        ?.toLowerCase()
                                        ?.includes(
                                          SearchdefaultSalesRep?.toLowerCase()
                                        ) ||
                                      item?.sequence?.id
                                        ?.toString()
                                        ?.toLowerCase()
                                        ?.includes(
                                          SearchdefaultSalesRep?.toLowerCase()
                                        ) ||
                                      item?.npi_code
                                        ?.toString()
                                        ?.toLowerCase()
                                        ?.includes(
                                          SearchdefaultSalesRep?.toLowerCase()
                                        );
                              })
                              ?.map((ref, i) => {
                                return (
                                  <tr
                                    data-bs-dismiss="modal"
                                    key={i}
                                    {...ref}
                                    onClick={() => {
                                      setdefaultSalesRep(
                                        ref?.last_name + ` , ` + ref?.first_name
                                      );
                                      setdefaultSalesRepID(ref?.id);
                                    }}
                                  >
                                    <td>{ref?.last_name}</td>
                                    <td>{ref?.first_name}</td>
                                    <td>{ref?.credentials}</td>
                                    <td>{ref?.sequence?.id}</td>
                                    <td>{ref?.npi_code}</td>

                                    <td>{ref?.deleted_at}</td>
                                  </tr>
                                );
                              })}
                          </>
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
              {/* ******************************** */}
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
      {/* ********************End default sales rep modal********************** */}

      {/* ************************* Default Facility ******************************* */}
      {/* ************************************ */}
      <div
        className="modal fade"
        id="showDefaultFacilityModel"
        tabIndex={-1}
        aria-labelledby="showDefaultFacilityModel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-md modal-dialog-centered text-dark">
          <div className="modal-content">
            <div className="modal-body">
              {/* ********************************** */}
              <div className="col-md-12">
                <div className="input-group ">
                  <input
                    className="form-control form-control-sm w-50"
                    type="text"
                    placeholder="Search for provider by name or ID"
                    id="search"
                    name="search"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength={10}
                    onChange={(e) =>
                      setSearchDefaultFacility(e.target.value?.toString())
                    }
                  />
                  <button
                    type="button"
                    className="input-group-text btn-hov"
                    id="searchbtn"
                  >
                    <i className="fas fa-search" aria-hidden="true" />
                  </button>
                </div>

                <div className="form-check mt-2 mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="inactive_providers"
                    name="inactive_providers"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="inactive_providers"
                  >
                    Include inactive providers
                  </label>
                </div>

                <div className="col-md-12">
                  <div className="table-responsive" style={{ height: "300px" }}>
                    <table className="table table-light table-hover table-striped table table-bordered caption-top">
                      <thead className="">
                        <tr>
                          <th>Facility Name</th>
                          <th>Address</th>
                          <th>Seq #</th>
                          <th>NPI</th>
                          <th>Inactive</th>
                        </tr>
                      </thead>
                      <tbody>
                        {facility
                          ?.filter((item) => {
                            return search === ""
                              ? item
                              : item?.facility_name
                                  ?.toLowerCase()
                                  ?.includes(search?.toLowerCase()) ||
                                  item?.address1
                                    ?.toLowerCase()
                                    ?.includes(search?.toLowerCase()) ||
                                  item?.sequence?.id
                                    ?.toString()
                                    ?.includes(search) ||
                                  item?.npi_code?.toString()?.includes(search);
                          })
                          ?.map((faclty, i) => {
                            return (
                              <tr
                                data-bs-dismiss="modal"
                                className="table-active facility-font"
                                key={i}
                                onClick={(e) => {
                                  setDefaultFacility(
                                    faclty?.facility_name?.toString()
                                  );
                                  setDefaultFacilityID(faclty?.id);
                                }}
                              >
                                <td>{faclty?.facility_name}</td>
                                <td>{faclty?.address1}</td>
                                <td>{faclty?.sequence?.id}</td>
                                <td>{faclty?.npi_code}</td>
                                <td>
                                  {faclty.Inactive == true ? (
                                    <span className="fas fa-check"></span>
                                  ) : (
                                    ""
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* ******************************** */}
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
      {/* ****************************************** */}
      <div className="row d-lg-flex mt-3 user-select-none">
        <div className="col-md-9">
          {/* form here */}
          <form
            name="patient_form"
            className="mt-3 user-select-none"
            onSubmit={handleSubmit}
            action="post"
          >
            <div className="col-md-12 d-flex mb-2">
              {editpatientID ? (
                <button
                  type="submit"
                  className="btn btn-outline-primary btn-sm"
                >
                  {" "}
                  <span className="fas fa-check"></span> Update
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-outline-primary btn-sm"
                >
                  {" "}
                  <span className="fas fa-check"></span> Save
                </button>
              )}
              <button
                onClick={() => {
                  setEmpty();
                  navigate("/patient");
                }}
                type="button"
                className="btn btn-outline-danger btn-sm mx-2"
              >
                {" "}
                <span className="fas fa-times"></span> Cancel
              </button>

              <button
                type="button"
                className="btn btn-outline-primary btn-sm mx-2"
                data-bs-toggle="modal"
                data-bs-target="#NPIRegistryModaltriggerinRefProvider"
              >
                <span className="fas fa-user-check"></span> Check Eligibility
              </button>

              {/* *************************  Check eligibility 1st model *********** */}
              <div
                className="modal fade text-dark"
                id="NPIRegistryModaltriggerinRefProvider"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                aria-hidden="true"
                aria-labelledby="NPIRegistryModaltriggerinRefProvider"
                tabindex={-1}
              >
                <div className="modal-dialog modal-md modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1
                        className="modal-title fs-5 fw-bold"
                        id="exampleModalToggleLabel"
                      >
                        Check Eligibility
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body ">
                      <div className="col-md-12">
                        <label htmlFor="">Insurance Policy</label>
                        <div className="col-md-12">
                          <select
                            defaultValue={"Primary"}
                            id="Insurance"
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                          >
                            <option value="Primary">Priamry - Humanaaz</option>
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

                      <div className="col-md-12 mt-3">
                        <label htmlFor="">Service Type</label>
                        <div className="col-md-12">
                          <select
                            id="Service"
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                          >
                            <option>30 - Health Benfit Plan Coverage</option>
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

                      <div className="col-md-12 gap-2 mt-3 d-flex">
                        <div className="col-md-3">
                          <select
                            id="today"
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                          >
                            <option>Today</option>
                            <option value="yesterday">Yesterday</option>
                            <option value="tommorrow">Tommorrow</option>
                          </select>
                        </div>

                        <div className="col-md-3">
                          <input
                            className={`form-control form-control-sm`}
                            type="date"
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
                        </div>
                        <div className="col-md-3">
                          <input
                            className={`form-control form-control-sm`}
                            type="date"
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
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        data-bs-target="#exampleModalToggle2"
                        data-bs-toggle="modal"
                        // onClick={SendSearchHCPCSQuery}
                      >
                        Check Eligibility
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
              {/* <div
              className="modal fade"
              id="checkeligibility"
              tabindex="-1"
              role="dialog"
              aria-labelledby="checkeligibility"
              aria-hidden="true"
            >
              <div
                className="modal-dialog"
                role="document"
                data-bs-toggle="modal"
                data-bs-target="#checkeligibility"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="checkeligibility">
                      Check Eligibility
                    </h5>
                  </div>

                  <div className="modal-body ">
                    <div className="col-md-12">
                      <label htmlFor="">Insurance Policy</label>
                      <div className="col-md-12">
                        <select
                          id="Insurance"
                          className="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                        >
                          <option >Priamry - Humanaaz</option>
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

                    <div className="col-md-12 mt-3">
                      <label htmlFor="">Service Type</label>
                      <div className="col-md-12">
                        <select
                          id="Service"
                          className="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                        >
                          <option >
                            30 - Health Benfit Plan Coverage
                          </option>
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

                    <div className="col-md-12 gap-2 mt-3 d-flex">
                      <div className="col-md-3">
                        <select
                          id="today"
                          className="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                        >
                          <option >Today</option>
                          <option value="yesterday">Yesterday</option>
                          <option value="tommorrow">Tommorrow</option>
                        </select>
                      </div>

                      <div className="col-md-3">
                        <input
                          className={`form-control form-control-sm`}
                          type="date"
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
                      </div>
                      <div className="col-md-3">
                        <input
                          className={`form-control form-control-sm`}
                          type="date"
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
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button type="button" className="btn btn-outline-primary">
                      Check Eligibility
                    </button>
                  </div>
                </div>
              </div>
            </div> */}

              {/* *************************  Check eligibility 1st model end*********** */}
              {/* 2nd model start */}
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
                        Eligibility response for LOPEZ, MELINDA
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>

                    <div className="col-md-11 mx-2 d-flex gap-3 mt-">
                      <div className="col-md-4 d-flex flex-column">
                        <div>
                          <label htmlFor="">Payer : HUMNAAZ AZ (61101)</label>
                        </div>
                        <div>
                          <label htmlFor="">
                            Provider : BAIR, ZACHATY (NPI:#1503458)
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4 d-flex flex-column">
                        <div>
                          <label htmlFor="">Payer : HUMNAAZ AZ (61101)</label>
                        </div>
                        <div>
                          <label htmlFor="">
                            Provider : BAIR, ZACHATY (NPI:#1503458)
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="modal-body">
                      <div className="d-flex gap-2">
                        <span className="">
                          <i
                            className="fas fa-circle-check fs-2 "
                            aria-hidden="true"
                          />
                        </span>
                        <h5>Active Coverage</h5>
                      </div>
                      <nav>
                        <div
                          className="nav nav-tabs"
                          id="nav-tab"
                          role="tablist"
                        >
                          <button
                            className="nav-link "
                            id="nav-claim-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-Subcriber"
                            type="button"
                            role="tab"
                            aria-controls="nav-Subcriber"
                            aria-selected="true"
                          >
                            Subscriber/Plan Information
                          </button>

                          <button
                            className="nav-link active"
                            id="nav-charges-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-Eligibility"
                            type="button"
                            role="tab"
                            aria-controls="nav-charges"
                            aria-selected="false"
                          >
                            Eligibility/Benefit Details
                          </button>
                        </div>
                      </nav>

                      <div className="tab-content" id="nav-tabContent">
                        <div
                          className="tab-pane fade show "
                          id="nav-Subcriber"
                          role="tabpanel"
                          aria-labelledby="nav-Subcriber-tab"
                          tabIndex="0"
                        >
                          <div className="col-md-12 d-flex flex-column">
                            <label htmlFor="">Eligibility/Benefit</label>
                            <div className="d-flex gap-2 col-md-12">
                              <div className="col-md-5">
                                <select
                                  id="defaultChargeStatus"
                                  className="form-select form-select-sm"
                                  aria-label=".form-select-sm example"
                                >
                                  <option>UNIT (UN)</option>
                                  <option value="Balance Due Patient">
                                    Balance Due Patient
                                  </option>
                                  <option value="On Hold">On Hold</option>
                                  <option value="Pending Patient">
                                    Pending Patient
                                  </option>
                                </select>
                              </div>

                              <div className="col-md-5">
                                <select
                                  id="defaultChargeStatus"
                                  className="form-select form-select-sm"
                                  aria-label=".form-select-sm example"
                                >
                                  <option>UNIT (UN)</option>
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

                            <div
                              className="table-responsive "
                              style={{
                                overflowY: "scroll",
                                height: "calc(60vh - 100px)",
                              }}
                            >
                              <table className="table table-light table-hover table-striped table table-bordered">
                                <thead>
                                  <tr>
                                    <th scope="col">Service</th>
                                    <th scope="col">Coverage Level</th>
                                    <th scope="col">Available</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">In Network</th>
                                    <th scope="col">Message</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  <tr>
                                    <td>Health Benefit Plan Coverage </td>
                                    <td>Individual</td>
                                    <td>calender Year</td>
                                    <td>$700</td>
                                    <td>Yes</td>
                                    <td>Seq#087</td>
                                  </tr>
                                  <tr>
                                    <td>Health Benefit Plan Coverage </td>
                                    <td>Individual</td>
                                    <td>calender Year</td>
                                    <td>$700</td>
                                    <td>Yes</td>
                                    <td>Seq#087</td>
                                  </tr>
                                  <tr>
                                    <td>Health Benefit Plan Coverage </td>
                                    <td>Individual</td>
                                    <td>calender Year</td>
                                    <td>$700</td>
                                    <td>Yes</td>
                                    <td>Seq#087</td>
                                  </tr>
                                  <tr>
                                    <td>Health Benefit Plan Coverage </td>
                                    <td>Individual</td>
                                    <td>calender Year</td>
                                    <td>$700</td>
                                    <td>Yes</td>
                                    <td>Seq#087</td>
                                  </tr>
                                  <tr>
                                    <td>Health Benefit Plan Coverage </td>
                                    <td>Individual</td>
                                    <td>calender Year</td>
                                    <td>$700</td>
                                    <td>Yes</td>
                                    <td>Seq#087</td>
                                  </tr>
                                  <tr>
                                    <td>Health Benefit Plan Coverage </td>
                                    <td>Individual</td>
                                    <td>calender Year</td>
                                    <td>$700</td>
                                    <td>Yes</td>
                                    <td>Seq#087</td>
                                  </tr>
                                  <tr>
                                    <td>Health Benefit Plan Coverage </td>
                                    <td>Individual</td>
                                    <td>calender Year</td>
                                    <td>$700</td>
                                    <td>Yes</td>
                                    <td>Seq#087</td>
                                  </tr>

                                  <tr>
                                    <td>Health Benefit Plan Coverage </td>
                                    <td>Individual</td>
                                    <td>calender Year</td>
                                    <td>$700</td>
                                    <td>Yes</td>
                                    <td>Seq#087</td>
                                  </tr>

                                  <tr>
                                    <td>Health Benefit Plan Coverage </td>
                                    <td>Individual</td>
                                    <td>calender Year</td>
                                    <td>$700</td>
                                    <td>Yes</td>
                                    <td>Seq#087</td>
                                  </tr>

                                  <tr>
                                    <td>Health Benefit Plan Coverage </td>
                                    <td>Individual</td>
                                    <td>calender Year</td>
                                    <td>$700</td>
                                    <td>Yes</td>
                                    <td>Seq#087</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-content" id="nav-tabContent">
                        <div
                          className="tab-pane fade show "
                          id="nav-Eligibility"
                          role="tabpanel"
                          aria-labelledby="nav-Subcriber-tab"
                          tabIndex="0"
                        >
                          <div className="col-md-12 d-flex flex-column">
                            <div
                              className="table-responsive "
                              style={{
                                overflowY: "scroll",
                                height: "calc(60vh - 100px)",
                              }}
                            >
                              <table className="table table-light table-hover table-striped table table-bordered">
                                <thead>
                                  <tr>
                                    <th scope="col">Type</th>
                                    <th scope="col">Insured or Subscriber</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  <tr>
                                    <th>Last Name</th>
                                    <td>1</td>
                                  </tr>
                                  <tr>
                                    <th>First Name</th>
                                    <td>John</td>
                                  </tr>
                                  <tr>
                                    <th>Member Identification Number</th>
                                    <td>22224353</td>
                                  </tr>
                                  <tr>
                                    <th>Group</th>
                                    <td>89845</td>
                                  </tr>
                                  <tr>
                                    <th>Address</th>
                                    <td>9834 N North</td>
                                  </tr>
                                  <tr>
                                    <th>City</th>
                                    <td>SCOTTSLE</td>
                                  </tr>
                                  <tr>
                                    <th>State</th>
                                    <td>AZ</td>
                                  </tr>
                                  <tr>
                                    <th>Zip</th>
                                    <td>2600</td>
                                  </tr>
                                  <tr>
                                    <th>Date of Birth</th>
                                    <td>02/03/1988</td>
                                  </tr>
                                  <tr>
                                    <th>Gender</th>
                                    <td>Female</td>
                                  </tr>
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
                        className="btn btn-sm btn-outline-primary"
                        // data-bs-target="#NPIRegistryModaltriggerinRefProvider"
                        data-bs-toggle="modal"
                        data-bs-dissmiss="model"
                      >
                        Print
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
              {/* 2nd model end */}

              {/* ########################### tab Dev  */}
              <div className="tab-content" id="nav-tabContent"></div>
              {/* #########################################################33 */}

              {first_name &&
              last_name &&
              DOB &&
              Address_contact &&
              zipapicode &&
              zipapi_city &&
              zipapi_state ? null : (
                <span className="text-danger mx-5 user-select-none">
                  * Please fill require fields to enable insurance, billing and
                  claim sections
                </span>
              )}
            </div>

            <div className="col-md-10 d-flex">
              {/* Profile Picture is Defined in a Component Below */}
              {/* <div>
              <label htmlFor="upload-button">
                {image.preview ? (
                  <img
                    src={image.preview}
                    className="rounded-circle pe-auto"
                    alt="Profile Picture"
                    width="130"
                    height="140"
                  />
                ) : (
                  <>
                    <span
                      className="fa-stack fa-2x mb-2 pe-auto"
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fa-sharp fa-solid fa-circle-user fa-2x pe-auto"></i>
                    </span>
                    
                  </>
                )}
              </label>
              <input
                type="file"
                id="upload-button"
                style={{ display: "none" }}
                onChange={handleChangeImage}
              />
              <br />
            </div> */}
              <div className="col-md-12">
                <div className="col-md-6 d-flex">
                  <div className="col-md-2 ms-0 pe-0 mx-0 me-4">
                    <label htmlFor="upload-button">
                      {image.preview ? (
                        <img
                          src={image.preview}
                          className="rounded-circle pe-auto"
                          alt="Profile Picture"
                          width="90"
                          height="90"
                        />
                      ) : (
                        <>
                          <span
                            className="fa-stack fa-3x mb-2 pe-auto"
                            style={{ cursor: "pointer" }}
                          >
                            <i className="fa-sharp fa-solid fa-circle-user fa-2x pe-auto"></i>
                          </span>
                        </>
                      )}
                    </label>
                    <input
                      type="file"
                      id="upload-button"
                      style={{ display: "none" }}
                      onChange={handleChangeImage}
                    />
                    <br />
                  </div>
                  <div className="col-md-6 mx-2">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className={`form-control form-control-sm fw-bold ${
                        last_name ? null : `is-invalid`
                      }`}
                      id="patient_lastName"
                      placeholder="Last Name"
                      autoComplete="off"
                      name="patient_lastName"
                      required={true}
                      value={last_name?.toString()}
                      onChange={(e) =>
                        setLastName(
                          e.target.value
                            ?.toString()
                            ?.replace(/[^A-Za-z ]/gi, "")
                            ?.trimStart()
                            ?.toUpperCase()
                        )
                      }
                      maxLength={60}
                    />
                  </div>
                  <div className="col-md-5 mx-2">
                    <label>First Name</label>
                    <input
                      type="text"
                      className={`form-control form-control-sm fw-bold ${
                        first_name ? null : `is-invalid`
                      }`}
                      id="patient_firstName"
                      placeholder="First Name"
                      autoComplete="off"
                      name="patient_firstName"
                      required={true}
                      value={first_name?.toString()}
                      onChange={(e) =>
                        setFirstName(
                          e.target.value
                            ?.toString()
                            ?.replace(/[^A-Za-z ]/gi, "")
                            ?.trimStart()
                            ?.toUpperCase()
                        )
                      }
                      maxLength={35}
                      // onBlur={handleBlur}
                    />
                    {/* {touched.username && errors.username ? (
              <p className="form-error">{errors.username}</p>
            ) : null} */}
                  </div>
                  <div className="col-md-2">
                    <label>MI</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="patient_mi"
                      placeholder="MI"
                      autoComplete="off"
                      name="patient_mi"
                      value={MI}
                      onChange={(e) =>
                        setMI(
                          e.target.value
                            ?.toString()
                            ?.replace(/[^A-Za-z ]/gi, "")
                            ?.trim()
                            ?.toUpperCase()
                        )
                      }
                      maxLength={1}
                    />
                    {/* {touched.username && errors.username ? (
              <p className="form-error">{errors.username}</p>
            ) : null} */}
                  </div>
                  <div className="col-md-3 mx-2">
                    <label>Suffix</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="patient_suffix"
                      placeholder="Suffix"
                      autoComplete="off"
                      name="patient_suffix"
                      value={suffix}
                      onChange={(e) =>
                        setSuffix(
                          e.target.value
                            ?.toString()
                            ?.replace(/[^A-Za-z ]/gi, "")
                            ?.trimStart()
                            ?.toUpperCase()
                        )
                      }
                      maxLength={10}
                    />
                    {/* {touched.username && errors.username ? (
              <p className="form-error">{errors.username}</p>
            ) : null} */}
                  </div>
                </div>
                <div className="col-md-6 d-flex mt-2">
                  <div className="col-md-3">
                    <label>Gender</label>
                    <select
                      defaultValue=""
                      value={gender}
                      id="new_patuentgender"
                      name="new_patuentgender"
                      className="form-select form-select-sm"
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value={null}></option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Unknown">Unknown</option>
                    </select>
                  </div>
                  <div className="col-md-4 mx-2">
                    <label>Date of Birth</label>
                    <input
                      max={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setDOB(e.target.value?.toString())}
                      type="date"
                      id="birth_date"
                      name="birth_date"
                      className={`form-control form-control-sm ${
                        DOB ? null : `is-invalid`
                      }`}
                      value={DOB}
                      required={true}
                    />
                  </div>
                  <div className="mt-4 mx-2 text-nowrap">
                    {birthDate != ""
                      ? years != ""
                        ? `(${years + " y" + ""})`
                        : months != ""
                        ? `(${months + " m" + ""})`
                        : days != ""
                        ? `(${days + " d" + ""})`
                        : `N/A`
                      : `N/A`}
                  </div>
                  <div className="col-md-4">
                    <label>Date of Death</label>
                    <input
                      value={DOD}
                      max={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setDOD(e.target.value?.toString())}
                      type="date"
                      id="death_date"
                      name="death_date"
                      className="form-control form-control-sm"
                    />
                  </div>

                  <div className="col-md-4 mx-1">
                    <label>SSN</label>
                    <PatternFormat
                      format="###-##-####"
                      mask=""
                      onChange={(e) =>
                        setSSN(
                          e.target.value
                            ?.toString()
                            ?.replace(/[^0-9]/gi, "")
                            ?.trim()
                        )
                      }
                      type="text"
                      className="form-control form-control-sm"
                      id="new_patientssn"
                      placeholder="SSN"
                      autoComplete="off"
                      name="new_patientssn"
                      value={SSN}
                      maxLength={11}
                      minLength={11}
                      // value={values.username}
                      // onChange={handleChange}
                      // onBlur={handleBlur}
                    />
                    {/* {touched.username && errors.username ? (
              <p className="form-error">{errors.username}</p>
            ) : null} */}
                  </div>
                  <div className="form-check text-nowrap mt-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="makepatientinactive"
                      checked={inactivePatient}
                      onChange={(e) => SetinactivePatient(e.target.checked)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="makepatientinactive"
                    >
                      Make this patient inactive
                    </label>
                  </div>
                </div>
                {/* contact info etc */}
                <ul className="nav nav-tabs mt-4" id="pills-tab" role="tablist">
                  <ul
                    className="nav nav-tabs mb-3"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#patient_info"
                        type="button"
                        role="tab"
                        aria-controls="pills_patient_info"
                        aria-selected="true"
                      >
                        <span className="fw-bold">Patient Info</span>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        disabled={
                          first_name &&
                          last_name &&
                          DOB &&
                          Address_contact &&
                          zipapicode &&
                          zipapi_city &&
                          zipapi_state
                            ? false
                            : true
                        }
                        className="nav-link"
                        id="pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#insurance_info"
                        type="button"
                        role="tab"
                        aria-controls="pills_insurance_info"
                        aria-selected="false"
                      >
                        <span className="fw-bold">Insurance Info</span>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        disabled={
                          first_name &&
                          last_name &&
                          DOB &&
                          Address_contact &&
                          zipapicode &&
                          zipapi_city &&
                          zipapi_state
                            ? false
                            : true
                        }
                        className="nav-link"
                        id="pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#billing_info"
                        type="button"
                        role="tab"
                        aria-controls="pills_billing_info"
                        aria-selected="false"
                      >
                        <span className="fw-bold">Billing Info</span>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        disabled={
                          first_name &&
                          last_name &&
                          DOB &&
                          Address_contact &&
                          zipapicode &&
                          zipapi_city &&
                          zipapi_state
                            ? false
                            : true
                        }
                        className="nav-link"
                        id="pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#claim_def"
                        type="button"
                        role="tab"
                        aria-controls="pills_claim_def"
                        aria-selected="false"
                      >
                        <span className="fw-bold">Claim Defaults</span>
                      </button>
                    </li>
                  </ul>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="patient_info"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <div className="col-md-10">
                      {/* <PatientInfo /> */}
                      {/* ******************* Start of Patient Info Tab ******************** */}
                      <div
                        className="col-md-12 mt-3 border-1"
                        // style={{ overflowY: "scroll", height: "calc(100vh - 127px)" }}
                      >
                        <div className="col-md-12 d-flex">
                          <div className="col-md-4 mx-2">
                            <label>Type</label>
                            <select
                              id="pat_type"
                              defaultValue={"Insurance"}
                              value={patient_type}
                              onChange={(e) => setPatient_type(e.target.value)}
                              className="form-select form-select-sm"
                            >
                              <option value="Other">Other</option>
                              <option value="Insurance">Insurance</option>
                              <option value="Worker's Comp.">
                                Worker's Comp.
                              </option>
                              <option value="Corporate">Corporate</option>
                              <option value="Self Pay">Self Pay</option>
                              <option value="Courtesy">Courtesy</option>

                              <option value="Collection">Collection</option>

                              <option value="Pre-Collection">
                                Pre-Collection
                              </option>

                              <option value="Type I">Type I</option>

                              <option value="Type II">Type II</option>
                              <option value="Payment Plan">Payment Plan</option>
                              <option value="Payment Plan Collection">
                                Payment Plan Collection
                              </option>
                              <option value="Auto">Auto</option>
                            </select>
                          </div>
                          <div className="col-md-2">
                            <label>Account #</label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              id="patientInfoaccount"
                              name="patientInfoaccount"
                              disabled
                              placeholder="NEW #"
                              autoComplete="off"
                              autoCapitalize="off"
                              autoCorrect="off"
                              spellCheck="false"
                            />
                          </div>
                          <div className="col-md-3">
                            <label className="mx-2">Reference #</label>
                            <input
                              type="text"
                              className="form-control form-control-sm mx-2"
                              id="patientInforeference"
                              name="patientInfoaccount"
                              placeholder="Reference #"
                              autoComplete="off"
                              autoCapitalize="off"
                              autoCorrect="off"
                              spellCheck="false"
                              maxLength={20}
                              value={referencenum
                                ?.toString()
                                ?.trimStart()
                                ?.toUpperCase()}
                              onChange={(e) =>
                                setReferenceNum(
                                  e.target.value
                                    ?.toString()
                                    ?.trimStart()
                                    ?.toUpperCase()
                                )
                              }
                            />
                          </div>
                        </div>
                        {/* contact info */}
                        <div className="card mb-2 mt-2">
                          <div className="card-header">Contact Information</div>
                          <div className="card-body ">
                            <div className="col-md-12">
                              <label className="text-dark">Address</label>
                              <input
                                type="text"
                                className={`form-control form-control-sm ${
                                  Address_contact ? null : `is-invalid`
                                }`}
                                id="patientinfo_address"
                                name="patientinfo_address"
                                placeholder="Address"
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                value={Address_contact?.toString()
                                  ?.trimStart()
                                  ?.toUpperCase()}
                                onChange={(e) =>
                                  setAddress_contact(
                                    e.target.value
                                      ?.toString()
                                      ?.trimStart()
                                      ?.toUpperCase()
                                  )
                                }
                                maxLength={40}
                                minLength={1}
                                required={true}
                              />
                              <input
                                type="text"
                                className="form-control form-control-sm mt-2"
                                id="patientinfo_address"
                                name="patientinfo_address"
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                value={Address2_contact?.toString()
                                  ?.trimStart()
                                  ?.toUpperCase()}
                                onChange={(e) =>
                                  setAddress2_contact(
                                    e.target.value
                                      ?.toString()
                                      ?.trimStart()
                                      ?.toUpperCase()
                                  )
                                }
                                maxLength={40}
                                minLength={1}
                              />
                            </div>
                            <div className="col-md-12 mt-3 d-flex">
                              <div className="col-md-5">
                                <label className="text-dark">City</label>
                                <input
                                  type="text"
                                  className={`form-control form-control-sm placeText ${
                                    zipapi_city ? null : `is-invalid`
                                  }`}
                                  id="patientcitycontact"
                                  placeholder="City"
                                  name="patientcitycontact"
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
                                <label className="text-dark">State</label>
                                <input
                                  type="text"
                                  className={`form-control form-control-sm placeText ${
                                    zipapi_state ? null : `is-invalid`
                                  }`}
                                  id="patientstate"
                                  placeholder="State"
                                  name="patientstate"
                                  autoComplete="off"
                                  autoCapitalize="characters"
                                  autoCorrect="off"
                                  spellCheck="false"
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
                              <div className="col-md-4">
                                <label className="text-dark">Zip</label>
                                <PatternFormat
                                  format="#####-####"
                                  mask=""
                                  type="text"
                                  className={`form-control form-control-sm ${
                                    zipapicode ? null : `is-invalid`
                                  }`}
                                  id="patientzipcode"
                                  name="patientzipcode"
                                  placeholder="ZIP Code"
                                  autoComplete="off"
                                  autoCapitalize="characters"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  value={zipapicode}
                                  onChange={(e) => {
                                    setzipapicode(
                                      e.target.value
                                        ?.replace(/[^0-9]/gi, "")
                                        ?.trim()
                                    );
                                    (zipapicode.match(/(?<!\d)\d{4}(?!\d)/gm) ||
                                      zipapicode.match(
                                        /(?<!\d)\d{8}(?!\d)/gm
                                      )) &&
                                      dispatch(
                                        PatientEditCity_stateFetch(
                                          e.target.value
                                            ?.replace(/[^0-9]/gi, "")
                                            ?.trim()
                                        )
                                      );
                                  }}
                                  minLength={5}
                                />
                              </div>
                            </div>
                            <div className="col-md-12 mt-2 d-flex">
                              <div className="col-md-6">
                                <label className="text-dark">Home Phone</label>
                                <PatternFormat
                                  format="(###) ###-####"
                                  pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                  title="Please Enter a Valid Phone #"
                                  mask=""
                                  type="text"
                                  className="form-control form-control-sm placeText"
                                  id="patientinfo_homephone"
                                  placeholder="Home Phone"
                                  name="patientinfo_homephone"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  value={homephone_contact}
                                  onChange={(e) =>
                                    setHomePhone_contact(e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-md-6 mx-2">
                                <label className="text-dark">Cell Phone</label>
                                <PatternFormat
                                  format="(###) ###-####"
                                  pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                  title="Please Enter a Valid Phone #"
                                  mask=""
                                  type="text"
                                  className="form-control form-control-sm placeText"
                                  id="patientinfo_cellphone"
                                  placeholder="Cell Phone"
                                  name="patientinfo_cellphone"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  value={cellphone_contact}
                                  onChange={(e) =>
                                    setcellphone_contact(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-12 mt-2 d-flex">
                              <div className="col-md-6">
                                <label className="text-dark">Work Phone</label>
                                <PatternFormat
                                  format="(###) ###-####"
                                  pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                  title="Please Enter a Valid Phone #"
                                  mask=""
                                  type="text"
                                  className="form-control form-control-sm placeText"
                                  id="patientinfo_workphone"
                                  placeholder="Work Phone"
                                  name="patientinfo_workphone"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  value={workphone_contact}
                                  onChange={(e) =>
                                    setworkphone_contact(e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-md-3 mx-2">
                                <label className="text-dark">Ext</label>
                                <input
                                  type="text"
                                  className="form-control form-control-sm placeText"
                                  id="patientinfo_ext"
                                  placeholder="Ext"
                                  name="patientinfo_ext"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  maxLength={5}
                                  value={ext_contact}
                                  onChange={(e) =>
                                    setExt_contact(
                                      e.target.value
                                        .replace(/[^0-9]/gi, "")
                                        ?.trim()
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-12 mt-2">
                              <label className="text-dark">Email</label>
                              <input
                                type="email"
                                className={`form-control form-control-sm placeText   
                              
                                `}
                                title="Please enter a valid Email"
                                id="patientinfo_email"
                                placeholder="Email"
                                name="email"
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                minLength={6}
                                maxLength={100}
                                value={
                                  email_contact
                                  // email_contact.match(
                                  //   /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
                                  // )
                                  //   ? email_contact
                                  //   : seterror("Error")
                                }
                                onChange={(e) => {
                                  setEmail_contact(e.target.value);
                                  // ValidateEmail(e);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-12 mt-3">
                          {/*appointment reminder  */}
                          <div className="card mb-2">
                            <div className="card-header">
                              Appointment Reminder
                            </div>
                            <div className="card-body text-dark">
                              <p>
                                You do not have access to this feature. Please
                                see your account's Authorized Representative for
                                assistance.
                              </p>
                            </div>
                          </div>
                          {/*other  */}
                          <div className="card mb-2">
                            <div className="card-header">Other</div>
                            <div className="card-body ">
                              <div className="col-md-12">
                                <label className="text-dark">
                                  Driver's License
                                </label>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  id="patientinfo_driverLicense"
                                  name="patientinfo_driverLicense"
                                  placeholder="Driver License"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  maxLength={20}
                                  value={driver_license}
                                  onChange={(e) =>
                                    setDriverLicense(
                                      e.target.value
                                        ?.toString()
                                        ?.trimStart()
                                        ?.toUpperCase()
                                    )
                                  }
                                />
                              </div>
                              <div className="col-md-12 mt-2 d-flex">
                                <div className="col-md-6">
                                  <label htmlFor="" className="text-dark">
                                    Martial Status
                                  </label>
                                  <select
                                    defaultValue={"Married"}
                                    value={marital_status}
                                    onChange={(e) =>
                                      setmarital_status(e.target.value)
                                    }
                                    id="patientinfo_martialStatus"
                                    className="form-select form-select-sm"
                                  >
                                    <option value="Married">Married</option>
                                    <option value="Single">Single</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Windowed">Windowed</option>
                                    <option value="Legally Seperated">
                                      Legally Seperated
                                    </option>
                                    <option value="Unknown">Unknown</option>
                                  </select>
                                </div>
                                <div className="col-md-6 mx-2">
                                  <label htmlFor="" className="text-dark">
                                    Student Status
                                  </label>
                                  <select
                                    defaultValue={"Not a Student"}
                                    value={student_status}
                                    id="patientinfo_stStatus"
                                    className="form-select form-select-sm"
                                    onChange={(e) =>
                                      setstudent_status(e.target.value)
                                    }
                                  >
                                    <option value="Not a Student">
                                      Not a Student
                                    </option>
                                    <option value="Full-time student">
                                      Full-time student
                                    </option>
                                    <option value="Part-time student">
                                      Part-time student
                                    </option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-12 mt-2 d-flex">
                                <div className="col-md-6">
                                  <label htmlFor="" className="text-dark">
                                    Employment Status
                                  </label>
                                  <select
                                    value={employment_status}
                                    onChange={(e) =>
                                      setemployment_status(e.target.value)
                                    }
                                    id="patientinfo_emplymemtStatus"
                                    className="form-select form-select-sm"
                                  >
                                    <option value="Employed full-time">
                                      Employed full-time
                                    </option>
                                    <option value="Employed part-time">
                                      Employed part-time
                                    </option>
                                    <option value="Not employed">
                                      Not employed
                                    </option>
                                    <option value="Self employed">
                                      Self employed
                                    </option>
                                    <option value="Retired">Retired</option>
                                    <option value="On active military duty">
                                      On active military duty
                                    </option>
                                    <option value="Disabled">Disabled</option>
                                    <option value="Unknown">Unknown</option>
                                  </select>
                                </div>
                                <div className="col-md-6 mx-2">
                                  <label htmlFor="" className="text-dark">
                                    Residence Type
                                  </label>
                                  <select
                                    value={residence_type}
                                    onChange={(e) =>
                                      setResidence_type(e.target.value)
                                    }
                                    id="patientinfo_residenceType"
                                    defaultValue={"Nursing Home"}
                                    className="form-select form-select-sm"
                                  >
                                    <option value="Private Home">
                                      Private Home
                                    </option>
                                    <option value="Nursing Home">
                                      Nursing Home
                                    </option>
                                    <option value="Residential Treatment Patient">
                                      Residential Treatment Patient
                                    </option>
                                    <option value="Skilled Nursing Home">
                                      Skilled Nursing Home
                                    </option>
                                    <option value="Homeless">Homeless</option>
                                    <option value="Prefer not to answer">
                                      Prefer not to answer
                                    </option>
                                    <option value="Unknown">Unknown</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-12 mt-2 d-flex">
                                <div className="col-md-6">
                                  <label className="text-dark">
                                    Account Prefix
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control form-control-sm placeText"
                                    id="patientinfo_accountPref"
                                    placeholder="Account Prefix"
                                    name="patientinfo_accountPref"
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    spellCheck="false"
                                    value={account_prefix}
                                    maxLength={5}
                                    onChange={(e) =>
                                      setAccount_prefix(
                                        e.target.value
                                          ?.toString()
                                          ?.trimStart()
                                          ?.toUpperCase()
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-md-6 mx-2">
                                  <label className="text-dark">
                                    Preferred Language
                                  </label>
                                  <input
                                    maxLength={25}
                                    type="text"
                                    className="form-control form-control-sm placeText"
                                    id="patientinfo_preferedLng"
                                    placeholder="Prefered Language"
                                    name="patientinfo_preferedLng"
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    spellCheck="false"
                                    value={prefered_language}
                                    onChange={(e) =>
                                      setPrefered_language(
                                        e.target.value
                                          ?.toString()
                                          ?.trimStart()
                                          ?.toUpperCase()
                                          ?.replace(/[^A-Za-z ]/gi, "")
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-md-12 mt-2">
                                <label className="text-dark">Other Info</label>
                                <input
                                  maxLength={50}
                                  type="text"
                                  className="form-control form-control-sm placeText"
                                  id="patientinfo_otherinfo"
                                  placeholder="Other Info"
                                  name="patientinfo_otherinfo"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  onChange={(e) =>
                                    setother_info(e.target.value)
                                  }
                                  value={other_info}
                                />
                              </div>
                            </div>
                          </div>
                          {/*meaningful use  */}
                          <div className="card mb-2">
                            <div className="card-header">Meaningful Use</div>
                            <div className="card-body ">
                              <div className="col-md-12 mt-2">
                                <div className="row">
                                  <div className="col-md-4">
                                    <label htmlFor="" className="text-dark">
                                      Ethnicity
                                    </label>
                                    <select
                                      defaultValue={null}
                                      value={ethnicityID}
                                      onChange={(e) =>
                                        setEthnicityID(e.target.value)
                                      }
                                      id="patientinfo_ethnicity"
                                      className="form-select form-select-sm"
                                    >
                                      <option value={null}></option>
                                      <option value={1}>
                                        Not Hispanic or Latino
                                      </option>
                                      <option value={2}>
                                        Hispanic or Latino
                                      </option>
                                      <option value={3}>Undetermined</option>
                                    </select>
                                  </div>
                                  <div className="col-md-3 mx-2">
                                    <label htmlFor="" className="text-dark">
                                      Language
                                    </label>
                                    <select
                                      value={language}
                                      onChange={(e) =>
                                        setLanguage(e.target.value)
                                      }
                                      id="patientinfo_language"
                                      className="form-select form-select-sm"
                                    >
                                      <option value="English">English</option>
                                      <option value="Spanish">Spanish</option>
                                      <option value="Other">Other</option>
                                    </select>
                                  </div>
                                  <div className="col-md-10 mt-2">
                                    <label className="text-dark">Race</label>
                                    <select
                                      value={race}
                                      onChange={(e) => setRace(e.target.value)}
                                      id="patientinfo_race"
                                      className="form-select form-select-sm"
                                    >
                                      {raceapi?.map((rc) => {
                                        return (
                                          <option
                                            value={rc?.Id}
                                            {...rc}
                                            key={rc?.Id}
                                          >
                                            {rc?.Descriptions}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/*emergency contact  */}
                          <div className="card mb-2">
                            <div className="card-header">Emergency Contact</div>
                            <div className="card-body ">
                              <div className="col-md-12 mt-2 d-flex">
                                <div className="col-md-4">
                                  <label htmlFor="" className="text-dark">
                                    Relationship to Patient
                                  </label>
                                  <select
                                    value={rel_to_patient}
                                    onChange={(e) =>
                                      setrel_to_patient(e.target.value)
                                    }
                                    id="patientinfo_relation"
                                    className="form-select form-select-sm"
                                  >
                                    <option value="None">None</option>
                                    <option value="Spouse">Spouse</option>
                                    <option value="Parent">Parent</option>
                                    <option value="Child">Child</option>
                                    <option value="Relative">Relative</option>
                                    <option value="Other">Other</option>
                                  </select>
                                </div>
                                <div className="col-md-3 mx-2">
                                  <label htmlFor="" className="text-dark">
                                    Permission to Speak
                                  </label>
                                  <select
                                    value={perm_to_speak}
                                    onChange={(e) =>
                                      setperm_to_speak(e.target.value)
                                    }
                                    id="patientinfo_speakPermission"
                                    className="form-select form-select-sm"
                                  >
                                    <option value={1}>Yes</option>
                                    <option value={0}>No</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-12 mt-2 d-flex">
                                <div className="col-md-4">
                                  <label className="text-dark">Last Name</label>
                                  <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    id="patientinfo_lastName"
                                    placeholder="Last Name"
                                    autoComplete="off"
                                    name="patientinfo_lastName"
                                    maxLength={60}
                                    value={last_name_emergency}
                                    onChange={(e) =>
                                      setlast_name_emergency(
                                        e.target.value
                                          ?.toString()
                                          ?.trimStart()
                                          ?.toUpperCase()
                                          ?.replace(/[^A-Za-z ]/gi, "")
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-md-4 mx-2">
                                  <label className="text-dark">
                                    First Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    id="patientinfo_firstName"
                                    placeholder="First Name"
                                    autoComplete="off"
                                    name="patientinfo_firstName"
                                    maxLength={28}
                                    value={first_name_emergency}
                                    onChange={(e) =>
                                      setfirst_name_emergency(
                                        e.target.value
                                          ?.toString()
                                          ?.trimStart()
                                          ?.toUpperCase()
                                          ?.replace(/[^A-Za-z ]/gi, "")
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="text-dark">MI</label>
                                  <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    id="patientinfo_mi"
                                    placeholder="MI"
                                    autoComplete="off"
                                    name="patientinfo_mi"
                                    maxLength={1}
                                    value={MI_emergency}
                                    onChange={(e) =>
                                      setMI_emergency(
                                        e.target.value
                                          ?.toString()
                                          ?.trim()
                                          ?.toUpperCase()
                                          ?.replace(/[^A-Za-z ]/gi, "")
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-md-12 mt-2">
                                <label className="text-dark">Address</label>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  id="emergencyContact_address"
                                  name="emergencyContact_address"
                                  placeholder="Address"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  maxLength={40}
                                  minLength={1}
                                  value={address_emergency}
                                  onChange={(e) =>
                                    setaddress_emergency(
                                      e.target.value
                                        ?.toString()
                                        ?.trimStart()
                                        ?.toUpperCase()
                                    )
                                  }
                                />
                                <input
                                  type="text"
                                  className="form-control form-control-sm mt-2"
                                  id="emergencyContact_address2"
                                  name="emergencyContact_address2"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  maxLength={40}
                                  minLength={1}
                                  value={address2_emergency}
                                  onChange={(e) =>
                                    setaddress2_emergency(
                                      e.target.value
                                        ?.toString()
                                        ?.trimStart()
                                        ?.toUpperCase()
                                    )
                                  }
                                />
                              </div>
                              <div className="col-md-12 mt-2 d-flex">
                                <div className="col-md-5">
                                  <label className="text-dark">City</label>
                                  <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    id="emergencyContact_city"
                                    name="emergencyContact_city"
                                    placeholder="City"
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    spellCheck="false"
                                    onChange={(e) =>
                                      setemergency_city(
                                        e.target.value
                                          ?.replace(/[^A-Za-z ]/gi, "")
                                          .toUpperCase()
                                          .trimStart()
                                      )
                                    }
                                    value={emergency_city
                                      ?.replace(/[^A-Za-z ]/gi, "")
                                      .toUpperCase()
                                      .trimStart()}
                                    maxLength={28}
                                  />
                                </div>
                                <div className="col-md-2 mx-2">
                                  <label className="text-dark">State</label>
                                  <input
                                    type="text"
                                    className="form-control form-control-sm placeText"
                                    id="emergencyContact_state"
                                    placeholder="State"
                                    name="emergencyContact_state"
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    spellCheck="false"
                                    onChange={(e) => {
                                      setemergency_state(
                                        e.target.value
                                          ?.replace(/[^A-Za-z ]/gi, "")
                                          .toUpperCase()
                                          .trimStart()
                                      );
                                    }}
                                    value={emergency_state
                                      ?.replace(/[^A-Za-z ]/gi, "")
                                      .toUpperCase()
                                      .trimStart()}
                                    maxLength={2}
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label className="text-dark">Zip</label>
                                  <PatternFormat
                                    format="#####-####"
                                    mask=""
                                    type="text"
                                    className="form-control form-control-sm"
                                    id="emerygencyzipcode"
                                    name="emerygencyzipcode"
                                    placeholder="ZIP Code"
                                    autoComplete="off"
                                    autoCapitalize="characters"
                                    autoCorrect="off"
                                    spellCheck="false"
                                    value={emergencyZip}
                                    onChange={(e) => {
                                      setemergencyZip(
                                        e.target.value
                                          ?.replace(/[^0-9]/gi, "")
                                          ?.trim()
                                      );
                                      (emergencyZip.match(
                                        /(?<!\d)\d{4}(?!\d)/gm
                                      ) ||
                                        emergencyZip.match(
                                          /(?<!\d)\d{8}(?!\d)/gm
                                        )) &&
                                        dispatch(
                                          PatientEditCity_stateFetch2(
                                            e.target.value
                                              ?.replace(/[^0-9]/gi, "")
                                              ?.trim()
                                          )
                                        );
                                    }}
                                    minLength={5}
                                  />
                                </div>
                              </div>
                              <div className="col-md-12 mt-2 d-flex">
                                <div className="col-md-6">
                                  <label className="text-dark">
                                    Home Phone
                                  </label>
                                  <PatternFormat
                                    format="(###) ###-####"
                                    pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                    title="Please Enter a Valid Phone #"
                                    mask=""
                                    type="text"
                                    className="form-control form-control-sm placeText"
                                    id="emergencyContact_homephone"
                                    placeholder="Home Phone"
                                    name="emergencyContact_homephone"
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    spellCheck="false"
                                    value={homephone_emergencycontact}
                                    onChange={(e) =>
                                      setHomePhone_emergencycontact(
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-md-6 mx-2">
                                  <label className="text-dark">
                                    Cell Phone
                                  </label>
                                  <PatternFormat
                                    format="(###) ###-####"
                                    pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                    title="Please Enter a Valid Phone #"
                                    mask=""
                                    type="text"
                                    className="form-control form-control-sm placeText"
                                    id="emergencyContact_cellphone"
                                    placeholder="Cell Phone"
                                    name="emergencyContact_cellphone"
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    spellCheck="false"
                                    value={cellphone_emergencycontact}
                                    onChange={(e) =>
                                      setcellphone_emergencycontact(
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-md-12 mt-2 d-flex">
                                <div className="col-md-6">
                                  <label className="text-dark">
                                    Work Phone
                                  </label>
                                  <PatternFormat
                                    format="(###) ###-####"
                                    pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                    title="Please Enter a Valid Phone #"
                                    mask=""
                                    type="text"
                                    className="form-control form-control-sm placeText"
                                    id="emergencyContact_workphone"
                                    placeholder="Work Phone"
                                    name="emergencyContact_workphone"
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    spellCheck="false"
                                    value={workphone_emergencycontact}
                                    onChange={(e) =>
                                      setworkphone_emergencycontact(
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-md-12 mt-2">
                                <label className="text-dark">Email</label>
                                <input
                                  type="email"
                                  className="form-control form-control-sm placeText"
                                  id="emergencyContact_email"
                                  placeholder="Email"
                                  name="email"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  maxLength={100}
                                  minLength={6}
                                  value={email_emergencycontact}
                                  onChange={(e) => {
                                    setemail_emergencycontact(
                                      e.target.value?.toString()?.trimStart()
                                    );
                                    // ValidateEmail(e);
                                  }}
                                />
                              </div>
                              <div className="col-md-12 mt-2">
                                <label className="text-dark">Remarks</label>
                                <input
                                  type="text"
                                  className="form-control form-control-sm placeText"
                                  id="emergencyContact_remarks"
                                  placeholder="Remarks"
                                  name="emergencyContact_remarks"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  value={remarks_emergencycontact}
                                  onChange={(e) =>
                                    setRemarks_emergencycontact(
                                      e.target.value?.toString()?.trimStart()
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          {/*Referral source  */}
                          {/* <div className="card mb-2">
                            <div className="card-header">Referal Source</div>
                            <div className="card-body ">
                              <div className="col-md-12">
                                <label
                                  htmlFor="referal_info"
                                  className="text-dark"
                                >
                                  How did you find us?
                                </label>
                                <select
                                  defaultValue=""
                                  id="referal_info"
                                  onChange={(e) =>
                                    setReferel_emergencycontact(
                                      e.target.value?.toString()
                                    )
                                  }
                                  className="form-select form-select-sm"
                                >
                                  <option value=""></option>
                                  <option value="Friend">Friend</option>
                                  <option value="News">News</option>
                                  <option value="Other">Other</option>
                                </select>
                              </div>
                            </div>
                          </div> */}
                        </div>
                      </div>

                      {/* ******************* End of Patient Info ******************** */}
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="insurance_info"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    {/* <InsuranceInfo /> */}
                    {/* **************************************** Start Insurance Info ************************************ */}
                    <div>
                      {/* *********** Add New Modal *********** */}
                      <div
                        className="modal fade"
                        id="AddNewModal"
                        tabIndex={-1}
                        aria-labelledby="AddNewModal"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-centered text-dark">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title fw-bold">
                                Add Policy and Insured
                              </h5>
                            </div>
                            <div className="modal-body">
                              {/* ******************** Tab ********************* */}
                              <ul
                                className="nav nav-tabs"
                                id="myTab"
                                role="tablist"
                              >
                                <li className="nav-item" role="presentation">
                                  <button
                                    className="nav-link active"
                                    id="home-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#home-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="home-tab-pane"
                                    aria-selected="true"
                                  >
                                    <b>Insured Party</b>
                                  </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                  <button
                                    className="nav-link"
                                    id="profile-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#profile-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="profile-tab-pane"
                                    aria-selected="false"
                                  >
                                    <b>Payer Info</b>
                                  </button>
                                </li>
                              </ul>
                              <div className="tab-content" id="myTabContent">
                                <div
                                  className="tab-pane fade show active"
                                  id="home-tab-pane"
                                  role="tabpanel"
                                  aria-labelledby="home-tab"
                                  tabIndex={0}
                                >
                                  <div className="mt-2">
                                    {/* <AddNew_Insurance /> */}
                                    {/* **************************************** Insured Party Fields Start **************************************** */}
                                    <>
                                      <div
                                        className="pe-3 ps-1"
                                        style={{
                                          height: "300px",
                                          overflowY: "scroll",
                                          overflowX: "hidden",
                                        }}
                                      >
                                        <div className="col-md-12">
                                          <div class="form-check">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              name="patientisinsured"
                                              id="patientisinsured"
                                              onChange={(e) => {
                                                TogglePatientInsured(
                                                  e.target.checked
                                                );
                                                setpatient_is_insured(
                                                  e.target.checked
                                                );
                                              }}
                                              checked={patient_is_insured}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="patientisinsured"
                                            >
                                              Patient is Insured
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <label htmlFor="patient_rel">
                                            Patient Relation to Insured
                                          </label>
                                          <select
                                            disabled={disabled}
                                            value={patient_rel_insured_party}
                                            onChange={(e) =>
                                              setpatient_rel_insured_party(
                                                e.target.value?.toString()
                                              )
                                            }
                                            id="patient_rel"
                                            className="form-select form-select-sm"
                                          >
                                            <option value="SELF" hidden>
                                              {disabled ? `SELF` : ""}
                                            </option>
                                            {patient_rel?.map((rel) => {
                                              return (
                                                <option
                                                  key={rel?.value}
                                                  {...rel}
                                                  value={rel?.value}
                                                >
                                                  {rel?.value}
                                                </option>
                                              );
                                            })}
                                          </select>
                                        </div>
                                        <div className="row mt-2 mb-2 px-0 pe-0 p-0">
                                          <div className="col-md-4">
                                            <label htmlFor="lastname">
                                              Last Name
                                            </label>
                                            <input
                                              disabled={disabled}
                                              id="lastname"
                                              placeholder="Last Name"
                                              required={false}
                                              maxLength={60}
                                              value={lastname_insured_party}
                                              onChange={(e) =>
                                                setlastname_insured_party(
                                                  e.target.value
                                                    ?.toString()
                                                    ?.toUpperCase()
                                                    ?.replace(
                                                      /[^A-Za-z ]/gi,
                                                      ""
                                                    )
                                                    ?.trimStart()
                                                )
                                              }
                                              className={`form-control form-control-sm ${
                                                lastname_insured_party
                                                  ? null
                                                  : `is-invalid`
                                              }`}
                                            />
                                          </div>
                                          <div className="col-md-4">
                                            <label htmlFor="firstname">
                                              First Name
                                            </label>
                                            <input
                                              disabled={disabled}
                                              maxLength={28}
                                              id="firstname"
                                              placeholder="First Name"
                                              required={false}
                                              value={firstname_insured_party}
                                              onChange={(e) =>
                                                setfirstname_insured_party(
                                                  e.target.value
                                                    ?.toString()
                                                    ?.toUpperCase()
                                                    ?.replace(
                                                      /[^A-Za-z ]/gi,
                                                      ""
                                                    )
                                                    ?.trimStart()
                                                )
                                              }
                                              className={`form-control form-control-sm ${
                                                firstname_insured_party
                                                  ? null
                                                  : `is-invalid`
                                              }`}
                                            />
                                          </div>
                                          <div className="col-md-2">
                                            <label htmlFor="">MI</label>
                                            <input
                                              disabled={disabled}
                                              maxLength={1}
                                              minLength={1}
                                              id="mi"
                                              placeholder="MI"
                                              required={false}
                                              value={MI_insured_party}
                                              onChange={(e) =>
                                                setMI_insured_party(
                                                  e.target.value
                                                    ?.toString()
                                                    ?.toUpperCase()
                                                    ?.replace(
                                                      /[^A-Za-z ]/gi,
                                                      ""
                                                    )
                                                    ?.trimStart()
                                                )
                                              }
                                              className="form-control form-control-sm"
                                            />
                                          </div>
                                          <div className="col-md-2">
                                            <label htmlFor="">Suffix</label>
                                            <input
                                              disabled={disabled}
                                              maxLength={10}
                                              id="Suffix"
                                              placeholder="Suffix"
                                              required={false}
                                              value={Suffix_insured_party}
                                              onChange={(e) =>
                                                setSuffix_insured_party(
                                                  e.target.value
                                                    ?.toString()
                                                    ?.toUpperCase()
                                                    ?.replace(
                                                      /[^A-Za-z ]/gi,
                                                      ""
                                                    )
                                                    ?.trimStart()
                                                )
                                              }
                                              className="form-control form-control-sm"
                                            />
                                          </div>
                                        </div>

                                        <div className="row">
                                          <div className="col-md-4">
                                            <label htmlFor="gender_insured_party">
                                              <label htmlFor="">Gender</label>
                                              <select
                                                disabled={disabled}
                                                className={`form-select form-select-sm ${
                                                  gender_insured_party
                                                    ? null
                                                    : `is-invalid`
                                                }`}
                                                defaultValue={""}
                                                value={gender_insured_party}
                                                onChange={(e) =>
                                                  setGender_insured_party(
                                                    e.target.value?.toString()
                                                  )
                                                }
                                                // required
                                                id="gender_insured_party"
                                                //   className="form-select form-select-sm"
                                              >
                                                <option
                                                  value={null}
                                                  hidden={true}
                                                ></option>
                                                <option value={"Male"}>
                                                  Male
                                                </option>
                                                <option value={"Female"}>
                                                  Female
                                                </option>
                                                <option value={"Unknown"}>
                                                  Unknown
                                                </option>
                                              </select>
                                            </label>
                                          </div>
                                          <div className="col-md-4">
                                            <label htmlFor="">
                                              Date of Birth
                                            </label>
                                            <input
                                              value={DOB_insured_party}
                                              disabled={disabled}
                                              max={
                                                new Date()
                                                  .toISOString()
                                                  .split("T")[0]
                                              }
                                              type="date"
                                              onChange={(e) =>
                                                setDOB_insured_party(
                                                  e.target.value?.toString()
                                                )
                                              }
                                              className={`form-control form-control-sm ${
                                                DOB_insured_party
                                                  ? null
                                                  : `is-invalid`
                                              }`}
                                              required={false}
                                            />
                                          </div>
                                          <div className="col-md-4">
                                            <label htmlFor="">SSN</label>
                                            <PatternFormat
                                              disabled={disabled}
                                              minLength={11}
                                              maxLength={11}
                                              type="text"
                                              format="###-##-####"
                                              mask=""
                                              value={SSN_insured_party}
                                              onChange={(e) =>
                                                setSSN_insured_party(
                                                  e.target.value?.toString()
                                                )
                                              }
                                              className={`form-control form-control-sm`}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <label htmlFor="Address1_Insured_party">
                                            Address
                                          </label>
                                          <input
                                            disabled={disabled}
                                            maxLength={40}
                                            id="Address1_Insured_party"
                                            placeholder="Address"
                                            required={false}
                                            value={Address1_insured_party}
                                            onChange={(e) =>
                                              setAddress1_insured_party(
                                                e.target.value
                                                  ?.toString()
                                                  ?.toUpperCase()

                                                  ?.trimStart()
                                              )
                                            }
                                            className={`form-control form-control-sm mt-1 ${
                                              Address1_insured_party
                                                ? null
                                                : `is-invalid`
                                            }`}
                                          />

                                          <input
                                            disabled={disabled}
                                            maxLength={40}
                                            id="Address2_Insured_party"
                                            required={false}
                                            value={Address2_insured_party}
                                            onChange={(e) =>
                                              setAddress2_insured_party(
                                                e.target.value
                                                  ?.toString()
                                                  ?.toUpperCase()

                                                  ?.trimStart()
                                              )
                                            }
                                            className={`form-control form-control-sm mt-1`}
                                          />
                                        </div>

                                        <div className="col-md-12 mt-3 d-flex">
                                          <div className="col-md-5">
                                            <label className="text-dark">
                                              City
                                            </label>
                                            <input
                                              disabled={disabled}
                                              type="text"
                                              className={`form-control form-control-sm placeText ${
                                                zipapi_city_insured_party
                                                  ? null
                                                  : `is-invalid`
                                              }`}
                                              id="patientcitycontact_insuredParty"
                                              placeholder="City"
                                              name="patientcitycontact_insuredParty"
                                              autoComplete="off"
                                              autoCapitalize="characters"
                                              autoCorrect="off"
                                              spellCheck="false"
                                              onChange={(e) =>
                                                setzipapi_city_insured_party(
                                                  e.target.value
                                                    ?.toString()
                                                    ?.replace(
                                                      /[^A-Za-z ]/gi,
                                                      ""
                                                    )
                                                    .toUpperCase()
                                                    .trimStart()
                                                )
                                              }
                                              value={zipapi_city_insured_party
                                                ?.replace(/[^A-Za-z ]/gi, "")
                                                .toUpperCase()
                                                .trimStart()}
                                              maxLength={28}
                                              required={false}
                                            />
                                          </div>
                                          <div className="col-md-2 mx-2">
                                            <label className="text-dark">
                                              State
                                            </label>
                                            <input
                                              disabled={disabled}
                                              type="text"
                                              className={`form-control form-control-sm placeText ${
                                                zipapi_state_insured_party
                                                  ? null
                                                  : `is-invalid`
                                              }`}
                                              id="patientstate_insuredParty"
                                              placeholder="State"
                                              name="patientstate_insuredParty"
                                              autoComplete="off"
                                              autoCapitalize="characters"
                                              autoCorrect="off"
                                              spellCheck="false"
                                              onChange={(e) => {
                                                setzipapi_state_insured_party(
                                                  e.target.value
                                                    ?.replace(
                                                      /[^A-Za-z ]/gi,
                                                      ""
                                                    )
                                                    .toUpperCase()
                                                    .trimStart()
                                                );
                                              }}
                                              value={zipapi_state_insured_party
                                                ?.replace(/[^A-Za-z ]/gi, "")
                                                .toUpperCase()
                                                .trimStart()}
                                              maxLength={2}
                                              required={false}
                                            />
                                          </div>
                                          <div className="col-md-4">
                                            <label className="text-dark">
                                              Zip
                                            </label>
                                            <PatternFormat
                                              disabled={disabled}
                                              format="#####-####"
                                              mask=""
                                              type="text"
                                              className={`form-control form-control-sm ${
                                                zipapicode_insured_party
                                                  ? null
                                                  : `is-invalid`
                                              }`}
                                              id="patientzipcode_insuredParty"
                                              name="patientzipcode_insuredParty"
                                              placeholder="ZIP Code"
                                              autoComplete="off"
                                              autoCapitalize="characters"
                                              autoCorrect="off"
                                              spellCheck="false"
                                              value={zipapicode_insured_party}
                                              onChange={(e) => {
                                                setzipapicode_insured_party(
                                                  e.target.value
                                                    ?.replace(/[^0-9]/gi, "")
                                                    ?.trim()
                                                );
                                                (zipapicode_insured_party.match(
                                                  /(?<!\d)\d{4}(?!\d)/gm
                                                ) ||
                                                  zipapicode_insured_party.match(
                                                    /(?<!\d)\d{8}(?!\d)/gm
                                                  )) &&
                                                  dispatch(
                                                    PatientEditCity_stateFetch4(
                                                      e.target.value
                                                        ?.replace(
                                                          /[^0-9]/gi,
                                                          ""
                                                        )
                                                        ?.trim()
                                                    )
                                                  );
                                              }}
                                              minLength={5}
                                            />
                                          </div>
                                        </div>

                                        <div className="row">
                                          <div className="col-md-12 mt-2 d-flex">
                                            <div className="col-md-4">
                                              <label className="text-dark">
                                                Home Phone
                                              </label>
                                              <PatternFormat
                                                disabled={disabled}
                                                format="(###) ###-####"
                                                pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                                title="Please Enter a Valid Phone #"
                                                mask=""
                                                type="text"
                                                className="form-control form-control-sm placeText"
                                                id="Insurancecontact_homephone"
                                                placeholder="Home Phone"
                                                name="Insurancecontact_homephone"
                                                autoComplete="off"
                                                autoCapitalize="off"
                                                autoCorrect="off"
                                                spellCheck="false"
                                                value={HomePhone_Insuranceinfo}
                                                onChange={(e) =>
                                                  setHomePhone_Insuranceinfo(
                                                    e.target.value
                                                  )
                                                }
                                              />
                                            </div>
                                            <div className="col-md-4 mx-1">
                                              <label className="text-dark">
                                                Cell Phone
                                              </label>
                                              <PatternFormat
                                                disabled={disabled}
                                                format="(###) ###-####"
                                                pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                                title="Please Enter a Valid Phone #"
                                                mask=""
                                                type="text"
                                                className="form-control form-control-sm placeText"
                                                id="Insurance_info_cellphone"
                                                placeholder="Cell Phone"
                                                name="Insurance_info_cellphone"
                                                autoComplete="off"
                                                autoCapitalize="off"
                                                autoCorrect="off"
                                                spellCheck="false"
                                                value={CellPhone_Insuranceinfo}
                                                onChange={(e) =>
                                                  setCellPhone_Insuranceinfo(
                                                    e.target.value
                                                  )
                                                }
                                              />
                                            </div>
                                            <div className="col-md-4 mx-0">
                                              <label className="text-dark">
                                                Work Phone
                                              </label>
                                              <PatternFormat
                                                disabled={disabled}
                                                format="(###) ###-####"
                                                pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                                title="Please Enter a Valid Phone #"
                                                mask=""
                                                type="text"
                                                className="form-control form-control-sm placeText"
                                                id="Insurance_info_workphone"
                                                placeholder="Work Phone"
                                                name="Insurance_info_workphone"
                                                autoComplete="off"
                                                autoCapitalize="off"
                                                autoCorrect="off"
                                                spellCheck="false"
                                                value={WorkPhone_Insuranceinfo}
                                                onChange={(e) =>
                                                  setWorkPhone_Insuranceinfo(
                                                    e.target.value
                                                  )
                                                }
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-3">
                                            <label className="text-dark">
                                              Ext
                                            </label>
                                            <input
                                              disabled={disabled}
                                              type="text"
                                              className="form-control form-control-sm placeText"
                                              id="patientinfo_ext"
                                              placeholder="Ext"
                                              name="patientinfo_ext"
                                              autoComplete="off"
                                              autoCapitalize="off"
                                              autoCorrect="off"
                                              spellCheck="false"
                                              maxLength={5}
                                              value={ext_contact_insured_party}
                                              onChange={(e) =>
                                                setExt_Insured_party(
                                                  e.target.value
                                                    .replace(/[^0-9]/gi, "")
                                                    ?.trim()
                                                )
                                              }
                                            />
                                          </div>
                                          <div className="col-md-12 mt-2">
                                            <label className="text-dark">
                                              Email
                                            </label>
                                            <input
                                              disabled={disabled}
                                              type="text"
                                              className="form-control form-control-sm placeText"
                                              id="Insurance_info_email"
                                              placeholder="Email"
                                              name="email"
                                              autoComplete="off"
                                              autoCapitalize="off"
                                              autoCorrect="off"
                                              spellCheck="false"
                                              // minLength={6}
                                              value={Email_Insurance}
                                              maxLength={100}
                                              onChange={(e) =>
                                                setEmail_Insurance(
                                                  e.target.value
                                                    ?.toString()
                                                    ?.trimStart()
                                                )
                                              }
                                            />
                                          </div>
                                          <div className="row">
                                            <div className="col-md-8 mt-2">
                                              <label className="text-dark">
                                                Third Party Administrator
                                              </label>
                                              <input
                                                type="text"
                                                className="form-control form-control-sm placeText"
                                                id="Insurance_info_thirdparty"
                                                placeholder="Third Party Administrator"
                                                name="Insurance_info_thirdparty"
                                                autoComplete="off"
                                                autoCapitalize="off"
                                                autoCorrect="off"
                                                spellCheck="false"
                                                value={thirdparty_insured_party}
                                                maxLength={40}
                                                onChange={(e) =>
                                                  setthirdparty_Insured_party(
                                                    e.target.value
                                                      ?.toString()
                                                      ?.trimStart()
                                                      ?.toUpperCase()
                                                  )
                                                }
                                              />
                                            </div>
                                            <div className="col-md-4 mt-2">
                                              <label className="text-dark">
                                                Phone
                                              </label>
                                              <PatternFormat
                                                format="(###) ###-####"
                                                pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                                title="Please Enter a Valid Phone #"
                                                mask=""
                                                type="text"
                                                className="form-control form-control-sm placeText"
                                                id="Insurance_info_phone"
                                                placeholder="Phone"
                                                name="Insurance_info_phone"
                                                autoComplete="off"
                                                autoCapitalize="off"
                                                autoCorrect="off"
                                                spellCheck="false"
                                                value={Phone_Insuranceinfo}
                                                onChange={(e) =>
                                                  setPhone_Insuranceinfo(
                                                    e.target.value
                                                  )
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-12 mt-3">
                                          <b>Employee Information</b>
                                        </div>
                                        <div className="col-md-12 mt-2">
                                          {" "}
                                          <label htmlFor="employee_info_status">
                                            Employee Status
                                          </label>
                                          <select
                                            defaultValue={"Employed full-time"}
                                            value={employee_status}
                                            onChange={(e) =>
                                              setEmployeeStatus(
                                                e.target.value?.toString()
                                              )
                                            }
                                            id="employee_info_status"
                                            className="form-select form-select-sm"
                                          >
                                            {employeestatus?.map((emp) => {
                                              return (
                                                <option
                                                  key={emp?.value}
                                                  {...emp}
                                                  value={emp?.value}
                                                >
                                                  {emp?.value}
                                                </option>
                                              );
                                            })}
                                          </select>
                                        </div>
                                        <div className="col-md-12 mt-2 mb-2">
                                          <label htmlFor="Address1_employee_info">
                                            Name
                                          </label>
                                          <input
                                            type="text"
                                            maxLength={40}
                                            id="Name_employee_info"
                                            placeholder="Name"
                                            required={false}
                                            value={Name_employee_info}
                                            onChange={(e) =>
                                              setName_employee_info(
                                                e.target.value
                                                  ?.toString()
                                                  ?.replace(/[^A-Za-z ]/gi, "")
                                                  ?.toUpperCase()

                                                  ?.trimStart()
                                              )
                                            }
                                            className={`form-control form-control-sm mt-1`}
                                          />
                                        </div>
                                        <div className="col-md-12 mt-2 mb-2">
                                          <label htmlFor="Address1_employee_info">
                                            Address
                                          </label>
                                          <input
                                            type="text"
                                            maxLength={40}
                                            id="Address1_employee_info"
                                            placeholder="Address"
                                            required={false}
                                            value={Address1_employee_info}
                                            onChange={(e) =>
                                              setAddress1_employee_info(
                                                e.target.value
                                                  ?.toString()
                                                  ?.toUpperCase()

                                                  ?.trimStart()
                                              )
                                            }
                                            className={`form-control form-control-sm mt-1`}
                                          />

                                          <input
                                            placeholder="Address"
                                            type="text"
                                            maxLength={40}
                                            id="Address2_employee_info"
                                            required={false}
                                            value={Address2_employee_info}
                                            onChange={(e) =>
                                              setAddress2_employee_info(
                                                e.target.value
                                                  ?.toString()
                                                  ?.toUpperCase()

                                                  ?.trimStart()
                                              )
                                            }
                                            className={`form-control form-control-sm mt-1`}
                                          />
                                        </div>
                                        {/* *********** Employee Info City State Zip *********** */}
                                        <div className="col-md-12 mt-2 mb-2 d-flex">
                                          <div className="col-md-5">
                                            <label className="text-dark">
                                              City
                                            </label>
                                            <input
                                              type="text"
                                              className={`form-control form-control-sm placeText`}
                                              id="patientcitycontact_insuredParty"
                                              placeholder="City"
                                              name="patientcitycontact_insuredParty"
                                              autoComplete="off"
                                              autoCapitalize="characters"
                                              autoCorrect="off"
                                              spellCheck="false"
                                              onChange={(e) =>
                                                setzipapi_city_employee_info(
                                                  e.target.value
                                                    ?.replace(
                                                      /[^A-Za-z ]/gi,
                                                      ""
                                                    )
                                                    .toUpperCase()
                                                    .trimStart()
                                                )
                                              }
                                              value={zipapi_city_employee_info
                                                ?.replace(/[^A-Za-z ]/gi, "")
                                                .toUpperCase()
                                                .trimStart()}
                                              maxLength={28}
                                              required={false}
                                            />
                                          </div>
                                          <div className="col-md-2 mx-2">
                                            <label className="text-dark">
                                              State
                                            </label>
                                            <input
                                              type="text"
                                              className={`form-control form-control-sm placeText`}
                                              id="patientstate_insuredParty"
                                              placeholder="State"
                                              name="patientstate_insuredParty"
                                              autoComplete="off"
                                              autoCapitalize="characters"
                                              autoCorrect="off"
                                              spellCheck="false"
                                              onChange={(e) => {
                                                setzipapi_state_employee_info(
                                                  e.target.value
                                                    ?.replace(
                                                      /[^A-Za-z ]/gi,
                                                      ""
                                                    )
                                                    .toUpperCase()
                                                    .trimStart()
                                                );
                                              }}
                                              value={zipapi_state_employee_info
                                                ?.replace(/[^A-Za-z ]/gi, "")
                                                .toUpperCase()
                                                .trimStart()}
                                              maxLength={2}
                                              required={false}
                                            />
                                          </div>
                                          <div className="col-md-4">
                                            <label className="text-dark">
                                              Zip
                                            </label>
                                            <PatternFormat
                                              format="#####-####"
                                              mask=""
                                              type="text"
                                              className={`form-control form-control-sm`}
                                              id="patientzipcode_insuredParty"
                                              name="patientzipcode_insuredParty"
                                              placeholder="ZIP Code"
                                              autoComplete="off"
                                              autoCapitalize="characters"
                                              autoCorrect="off"
                                              spellCheck="false"
                                              value={zipapicode_employee_info}
                                              onChange={(e) => {
                                                setzipapicode_employee_info(
                                                  e.target.value
                                                    ?.replace(/[^0-9]/gi, "")
                                                    ?.trim()
                                                );
                                                (zipapicode_employee_info.match(
                                                  /(?<!\d)\d{4}(?!\d)/gm
                                                ) ||
                                                  zipapicode_employee_info.match(
                                                    /(?<!\d)\d{8}(?!\d)/gm
                                                  )) &&
                                                  dispatch(
                                                    PatientEditCity_stateFetch5(
                                                      e.target.value
                                                        ?.replace(
                                                          /[^0-9]/gi,
                                                          ""
                                                        )
                                                        ?.trim()
                                                    )
                                                  );
                                              }}
                                              minLength={5}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </>

                                    {/* **************************************** Insured Party Fields End **************************************** */}
                                  </div>
                                </div>
                                <div
                                  className="tab-pane fade"
                                  id="profile-tab-pane"
                                  role="tabpanel"
                                  aria-labelledby="profile-tab"
                                  tabIndex={0}
                                >
                                  {/* <AddNew_PayerInfo /> */}

                                  {/* ***************************** (Start) Add New Payer Info ***************************** */}
                                  <>
                                    {/* ********* *Payers Modal is located in InsuranceInfo.jsx/tsx File
                                     *********** */}
                                    <div className="row">
                                      <div className="col-md-12 mt-2 d-flex">
                                        <div className="col-md-4">
                                          <label className="text-dark">
                                            Priority
                                          </label>
                                          <select
                                            defaultValue={0}
                                            value={priority}
                                            onChange={(e) =>
                                              setPriority(e.target.value)
                                            }
                                            className="form-select form-select-sm"
                                            aria-label=".form-select-sm example"
                                          >
                                            <option value={0}>Primary</option>
                                            <option value={1}>Secondary</option>
                                            <option value={2}>Tertiary</option>
                                          </select>
                                        </div>
                                        <div className="col-md-8 mx-2">
                                          <label className="text-dark">
                                            Policy Type
                                          </label>
                                          <select
                                            value={policy_type}
                                            onChange={(e) =>
                                              setPolicy_type(e.target.value)
                                            }
                                            defaultValue={"Other"}
                                            className="form-select form-select-sm"
                                            aria-label=".form-select-sm example"
                                          >
                                            {PolicyType?.map((pol) => {
                                              return (
                                                <option
                                                  key={pol?.policy}
                                                  {...pol}
                                                  value={pol?.policy}
                                                >
                                                  {pol?.policy}
                                                </option>
                                              );
                                            })}
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="d-flex">
                                      <div className="col-md-11 me-2">
                                        <label>Payer</label>
                                        <div className="input-group">
                                          <input
                                            style={{ cursor: "pointer" }}
                                            className={`form-control form-control-sm ${
                                              payer ? null : "is-invalid"
                                            }`}
                                            type="text"
                                            placeholder="Payers"
                                            id="payermodal"
                                            name="payermodal"
                                            autoComplete="off"
                                            autoCapitalize="off"
                                            autoCorrect="off"
                                            spellCheck="false"
                                            maxLength={10}
                                            autoFocus
                                            value={payer}
                                            required={false}
                                            data-bs-target="#showPayersModal"
                                            data-bs-toggle="modal"
                                          />

                                          <button
                                            type="button"
                                            className="input-group-text btn btn-sm btn-outline-secondary"
                                            id="nullPayers"
                                            onClick={(e) => setPayer("")}
                                            disabled={payer ? false : true}
                                          >
                                            <i
                                              className="fas fa-close"
                                              aria-hidden="true"
                                            />
                                          </button>
                                          <button
                                            type="button"
                                            className="input-group-text btn-hov"
                                            id="Payers"
                                            data-bs-toggle="modal"
                                            data-bs-target="#showPayersModal"
                                          >
                                            <i
                                              className="fas fa-search"
                                              aria-hidden="true"
                                            />
                                          </button>
                                        </div>
                                      </div>
                                      <div className="col-md-1">
                                        <label htmlFor=""></label>
                                        <button
                                          disabled
                                          type="button"
                                          className="input-group-text btn-hov"
                                          id="Payers"
                                          data-bs-toggle="modal"
                                          data-bs-target="#showPayersModal"
                                        >
                                          <i
                                            className="fas fa-add"
                                            aria-hidden="true"
                                          />
                                        </button>
                                      </div>
                                    </div>

                                    <div className="row">
                                      <div className="col-md-12 mt-2 d-flex">
                                        <div className="col-md-6">
                                          <label htmlFor="member_id">
                                            Member ID
                                          </label>
                                          <input
                                            placeholder="Member ID"
                                            maxLength={20}
                                            value={memberID}
                                            onChange={(e) =>
                                              setMemeberID(
                                                e.target.value
                                                  ?.toString()

                                                  ?.trimStart()
                                                  ?.toUpperCase()
                                              )
                                            }
                                            id="member_id"
                                            className={`form-control form-control-sm ${
                                              memberID ? null : "is-invalid"
                                            }`}
                                          />
                                        </div>
                                        <div className="col-md-6 mx-2">
                                          <label htmlFor="group_id">
                                            Group ID
                                          </label>
                                          <input
                                            type="text"
                                            value={groupID}
                                            onChange={(e) =>
                                              setGroupID(
                                                e.target.value
                                                  ?.toString()

                                                  ?.trimStart()
                                                  ?.toUpperCase()
                                              )
                                            }
                                            placeholder="Group ID"
                                            maxLength={29}
                                            id="group_id"
                                            className="form-control form-control-sm"
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <div className="row">
                                      <div className="col-md-12 mt-2 d-flex pe-4">
                                        <div className="col-md-3">
                                          <label htmlFor="group_id">
                                            Copay
                                          </label>
                                          {/* <InputDecimal
                                            precision={2}
                                            value={copay}
                                            onChangeValue={(value) => {
                                              setCopay(
                                                parseFloat(value)?.toFixed(2)
                                              );
                                            }}
                                            style={{ textAlign: "left" }}
                                            //   onChange={(e) => setCopay(e.target.value)}
                                            className="form-control form-control-sm"
                                          /> */}
                                          <PatternFormat
                                            format="###.##"
                                            mask=""
                                            value={copay}
                                            onChangeValue={(value) => {
                                              setCopay(value);
                                            }}
                                            type="text"
                                            className="form-control form-control-sm"
                                          />
                                        </div>

                                        <div className="col-md-3 mx-1">
                                          <label htmlFor="group_id">
                                            Co-Insurance %
                                          </label>
                                          <input
                                            type="text"
                                            maxLength={3}
                                            style={{ textAlign: "right" }}
                                            value={co_insurance}
                                            onChange={(e) =>
                                              setco_insurance(
                                                e.target.value?.replace(
                                                  /[^0-9]/gi,
                                                  ""
                                                )
                                              )
                                            }
                                            onInput={(object) => {
                                              if (
                                                object.target.value.length >
                                                object.target.maxLength
                                              ) {
                                                object.target.value =
                                                  object.target.value.slice(
                                                    0,
                                                    object.target.maxLength
                                                  );
                                              }
                                            }}
                                            className="form-control form-control-sm"
                                          />
                                        </div>

                                        <div className="col-md-3 mx-1">
                                          <label htmlFor="group_id">
                                            Deductible
                                          </label>
                                          <PatternFormat
                                            format="#####.##"
                                            mask=""
                                            value={deductible}
                                            onChangeValue={(value) => {
                                              setdeductible(value);
                                            }}
                                            className="form-control form-control-sm"
                                          />
                                        </div>

                                        <div className="col-md-3 mx-0">
                                          <label htmlFor="group_id">
                                            Out of Pocket
                                          </label>
                                          <PatternFormat
                                            format="#####.##"
                                            mask=""
                                            value={OutOfPocket}
                                            onChangeValue={(value) => {
                                              setOutOfPocket(
                                                parseFloat(value)?.toFixed(2)
                                              );
                                            }}
                                            className="form-control form-control-sm"
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <div className="row mt-2">
                                      <div className="col-md-6">
                                        <label htmlFor="effective_date">
                                          Effective Date
                                        </label>
                                        <input
                                          type="date"
                                          onChange={(e) =>
                                            seteffectiveDate(e.target.value)
                                          }
                                          value={effectiveDate}
                                          id="effective_date"
                                          className="form-control form-control-sm"
                                        />
                                      </div>
                                      <div className="col-md-6">
                                        {" "}
                                        <label htmlFor="termination_date">
                                          Termination Date
                                        </label>
                                        <input
                                          onChange={(e) =>
                                            setterminationDate(e.target.value)
                                          }
                                          value={terminationDate}
                                          type="date"
                                          id="termination_date"
                                          className="form-control form-control-sm"
                                        />
                                      </div>
                                    </div>
                                  </>

                                  {/* ***************************** (End) Add New Payer Info ***************************** */}
                                </div>
                              </div>
                              {/* ********************** End of Tab ********************** */}
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                onClick={() => {
                                  AddNewInsurance();
                                }}
                                className="btn btn-primary btn-sm"
                                data-bs-dismiss={`${
                                  lastname_insured_party ? "modal" : null
                                }`}
                              >
                                Add
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

                      {/* *********************************** End of Add NEw Modal ************************************ */}

                      {/* ***************************** Payer Modal Start ********************************** */}
                      <div
                        className="modal fade"
                        id="showPayersModal"
                        tabIndex={-1}
                        aria-labelledby="showPayersModal"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-lg modal-md modal-dialog-centered text-dark">
                          <div className="modal-content">
                            <div className="modal-body">
                              {/* ********************************** */}
                              <div className="col-md-12">
                                <div className="input-group ">
                                  <input
                                    className="form-control form-control-sm w-50"
                                    type="text"
                                    placeholder="Search for Payer"
                                    id="search"
                                    name="search"
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    spellCheck="false"
                                    maxLength={10}
                                    onChange={(e) =>
                                      setPayerSearch(e.target.value?.toString())
                                    }
                                  />
                                  <button
                                    type="button"
                                    className="input-group-text btn-hov"
                                    id="searchbtn"
                                  >
                                    <i
                                      className="fas fa-search"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </div>

                                <div className="form-check mt-2 mb-3">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="inactive_payers"
                                    name="inactive_payers"
                                  />
                                  <label
                                    className="form-check-label user-select-none"
                                    htmlFor="inactive_payers"
                                  >
                                    Include inactive payers
                                  </label>
                                </div>

                                <div className="col-md-12">
                                  <div
                                    className="table-responsive"
                                    style={{ height: "300px" }}
                                  >
                                    {/* ************** Table ************ */}
                                    <Table
                                      striped
                                      bordered
                                      hover
                                      className="mt-2"
                                    >
                                      <thead>
                                        <tr>
                                          <th>Payer Name</th>
                                          <th>Payer Type</th>
                                          <th>State</th>
                                          <th>Seq#</th>
                                          <th>Payer ID</th>
                                          <th>clearinghouse ID</th>
                                          <th>Inactive</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {payermodaldata
                                          ?.filter((item) => {
                                            return PayerSearch === ""
                                              ? item
                                              : item?.payer_name
                                                  ?.toString()
                                                  ?.toLowerCase()
                                                  ?.includes(
                                                    PayerSearch?.toLowerCase()
                                                  ) ||
                                                  item?.payer_type?.payer_type
                                                    ?.toString()
                                                    ?.toLowerCase()
                                                    ?.includes(
                                                      PayerSearch?.toLowerCase()
                                                    ) ||
                                                  item?.state
                                                    ?.toString()
                                                    ?.toLowerCase()
                                                    ?.includes(
                                                      PayerSearch?.toLowerCase()
                                                    ) ||
                                                  item?.sequence?.id
                                                    ?.toString()
                                                    ?.toLowerCase()
                                                    ?.includes(
                                                      PayerSearch?.toLowerCase()
                                                    ) ||
                                                  item?.payer_id
                                                    ?.toString()
                                                    ?.toLowerCase()
                                                    ?.includes(
                                                      PayerSearch?.toLowerCase()
                                                    ) ||
                                                  item?.clearinghouseid
                                                    ?.toString()
                                                    ?.toLowerCase()
                                                    ?.includes(
                                                      PayerSearch?.toLowerCase()
                                                    );
                                          })
                                          ?.map((payer, i) => {
                                            return (
                                              <tr
                                                key={i}
                                                {...payer}
                                                onClick={() => {
                                                  setPayer(payer?.payer_name);
                                                  setPayerID(payer?.id);
                                                }}
                                                data-bs-toggle="modal"
                                                data-bs-target="#AddNewModal"
                                                style={{ cursor: "pointer" }}
                                              >
                                                <td>{payer?.payer_name}</td>
                                                <td>
                                                  {
                                                    payer?.payer_type
                                                      ?.payer_type
                                                  }
                                                </td>
                                                <td>{payer?.state}</td>
                                                <td>{payer?.sequence?.id}</td>
                                                <td>{payer?.payer_id}</td>
                                                <td>
                                                  {payer?.clearinghouseid}
                                                </td>
                                                <td>{payer?.deleted_at}</td>
                                              </tr>
                                            );
                                          })}
                                      </tbody>
                                    </Table>
                                  </div>
                                </div>
                              </div>
                              {/* ******************************** */}
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-outline-secondary btn-sm"
                                data-bs-toggle="modal"
                                data-bs-target="#AddNewModal"
                              >
                                Back
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
                      {/* ****************************************** */}

                      {/* ************************************* Payer Modal End ******************************************* */}

                      <div className="d-flex flex-row mb-2">
                        <div className="p-2">
                          {" "}
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#AddNewModal"
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                          >
                            Add New
                          </button>
                        </div>
                        <div className="p-2">
                          <button
                            disabled
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                          >
                            Link to Family
                          </button>
                        </div>
                        <div className="p-2">
                          {" "}
                          <button
                            disabled
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                          >
                            Insurance History
                          </button>
                        </div>
                      </div>

                      <div className="col-md-12 px-2">
                        {!showCard === "" ? (
                          `There are currently no insurances for this patient. Please use the
        buttons above to add them.`
                        ) : (
                          <div className="card">
                            <div className="card-header">
                              {`${
                                lastname_insured_party
                                  ? lastname_insured_party + `,`
                                  : null
                              } ${
                                firstname_insured_party
                                  ? firstname_insured_party
                                  : ""
                              } ${MI_insured_party ? MI_insured_party : ""} ${
                                Suffix_insured_party ? Suffix_insured_party : ""
                              }`}
                              {` ` + Inactivate}
                              <span className="d-flex d align-content-end justify-content-end">
                                <button
                                  type="button"
                                  onClick={null}
                                  data-bs-toggle="modal"
                                  data-bs-target="#AddNewModal"
                                  className={"btn btn-sm btn-success me-2"}
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    Activate();
                                  }}
                                  className={`btn btn-sm btn-${
                                    Inactivate ? `success` : `danger`
                                  } user-select-none`}
                                >
                                  {Inactivate ? "Activate" : "Inactivate"}
                                </button>
                              </span>
                            </div>
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-4 text-dark">
                                  {DOB_insured_party ? (
                                    <b>DOB: {DOB_insured_party}</b>
                                  ) : null}
                                  <br />
                                  {gender_insured_party
                                    ? gender_insured_party
                                    : null}
                                </div>
                                <div className="col-md-4 text-dark">
                                  {Address1_insured_party
                                    ? Address1_insured_party
                                    : null}{" "}
                                  {` `}{" "}
                                  {Address2_insured_party
                                    ? Address2_insured_party + `,`
                                    : null}
                                  {` `}
                                  {zipapi_city_insured_party
                                    ? zipapi_city_insured_party + `,`
                                    : null}
                                  {` `}{" "}
                                  {zipapi_state_insured_party
                                    ? zipapi_state_insured_party + `,`
                                    : null}
                                  {` `}
                                  {zipapicode_insured_party
                                    ? zipapicode_insured_party
                                    : null}
                                </div>
                                <div className="col-md-4 text-dark">
                                  {HomePhone_Insuranceinfo
                                    ? `Home: ` + HomePhone_Insuranceinfo
                                    : null}
                                  <br />
                                  {CellPhone_Insuranceinfo
                                    ? `Cell: ` + CellPhone_Insuranceinfo
                                    : null}
                                  <br />
                                  {WorkPhone_Insuranceinfo
                                    ? `Work: ` + WorkPhone_Insuranceinfo
                                    : null}
                                  <br />
                                  {ext_contact_insured_party
                                    ? `Ext:` + ext_contact_insured_party
                                    : null}
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-md-6"></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="col-md-12 px-2 mt-3">
                        {showInsuranceCard ? (
                          <div className="card">
                            <div className="card-header user-select-none">
                              <button
                                // aria-readonly
                                disabled={Inactivate_primary}
                                type="button"
                                onClick={() =>
                                  alert("To Editable Form of Payers (NC)")
                                }
                                className="fw-bold btn btn-sm btn-primary user-select-none"
                              >
                                {" "}
                                {payer + ` ` + Inactivate_primary}
                              </button>
                              <span className="d-flex d align-content-end justify-content-end">
                                <button
                                  // disabled
                                  type="button"
                                  onClick={null}
                                  data-bs-toggle="modal"
                                  data-bs-target="#AddNewModal"
                                  className={"btn btn-sm btn-success me-2"}
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    Activate_Primary();
                                  }}
                                  className={`btn btn-sm me-2 btn-${
                                    Inactivate_primary ? "success" : "danger"
                                  } user-select-none`}
                                >
                                  {Inactivate_primary
                                    ? "Activate"
                                    : "Inactivate"}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    null;
                                  }}
                                  disabled
                                  className={`btn btn-sm btn-success user-select-none`}
                                >
                                  Eligibility
                                </button>
                              </span>
                            </div>
                            <div className="card-body user-select-none">
                              <div className="col-md-4">
                                <div className="d-flex align-items-center user-select-none">
                                  <span
                                    style={{
                                      color: "#2a5c12",
                                      backgroundColor: "#dcefd3",
                                      borderColor: "#cee9c1",
                                      marginTop: "-80px",
                                    }}
                                    className="default-description user-select-none"
                                  >
                                    Primary - All Claims
                                  </span>
                                </div>
                              </div>
                              <div className="row text-dark">
                                <div className="col-md-4">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      alert(
                                        "You need Access and Modify permissions for Document Management to modify documents. Please contact your administrator for assistance."
                                      )
                                    }
                                    className="btn btn-transparent"
                                  >
                                    {" "}
                                    <i className="fas fa-image fa-6x" />
                                  </button>
                                </div>
                                <div className="col-md-4">
                                  <span className="fw-bold">
                                    Insured:{" "}
                                    {firstname_insured_party +
                                      ` ` +
                                      MI_insured_party +
                                      ` ` +
                                      lastname_insured_party}
                                  </span>
                                  <br />
                                  <span className="fw-bold">
                                    Member ID: {memberID}
                                  </span>
                                  <br />
                                  <span className="fw-bold">
                                    Group ID: {groupID}
                                  </span>
                                </div>
                                <div className="col-md-4">
                                  <span className="fw-bold">
                                    Copay: {`$` + copay}
                                  </span>
                                  <br />
                                  <span className="fw-bold">
                                    Co-Insurance: {co_insurance + "%"}
                                  </span>
                                  <br />
                                  <span className="fw-bold">
                                    Deductible: {deductible}
                                  </span>
                                  <br />
                                  <span className="fw-bold">
                                    Out of Pocket Max: {`$` + OutOfPocket}
                                  </span>
                                  <br />
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    {/* ************************************** End Insurance Info ************************************* */}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="billing_info"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    {/* <BillingInfo /> */}
                    {/* ******************************** Billing Info Start *********************************** */}
                    <div className="row d-lg-flex mt-2">
                      <div className="col-md-9">
                        <div className="card mb-2 mt-2">
                          <div className="card-header">Statement Options</div>
                          <div className="card-body ">
                            <div className="col-md-12">
                              <div className="form-check">
                                <input
                                  onChange={(e) =>
                                    setSendStatement(e.target.checked)
                                  }
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={sendStatement}
                                  // value="Send Statement"
                                  id="sendStatement"
                                />
                                <label
                                  className="form-check-label text-dark"
                                  htmlFor="sendStatement"
                                >
                                  Send Statement
                                </label>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="row">
                                <div className="col-md-6">
                                  <label
                                    className="text-dark"
                                    htmlFor="Statementtype"
                                  >
                                    Statement Type
                                  </label>
                                  <select
                                    value={statement_type}
                                    onChange={(e) =>
                                      setstatement_type(e.target.value)
                                    }
                                    id="Statementtype"
                                    className="form-select form-select-sm"
                                    aria-label=".form-select-sm example"
                                  >
                                    <option value={0}>Single</option>
                                    <option value={1}>Family</option>
                                  </select>
                                </div>
                                <div className="col-md-6">
                                  <label
                                    className="text-dark"
                                    htmlFor="mailstatement"
                                  >
                                    Mail Statement To
                                  </label>
                                  <select
                                    value={mailStatement}
                                    onChange={(e) =>
                                      setmailStatement(e.target.value)
                                    }
                                    id="mailstatement"
                                    defaultValue={"Primary Insured"}
                                    className="form-select form-select-sm"
                                    aria-label=".form-select-sm example"
                                  >
                                    <option value="Patient">Patient</option>
                                    <option value="Primary Insured">
                                      Primary Insured
                                    </option>
                                    <option value="Secondary Insured">
                                      Secondary Insured
                                    </option>
                                    <option value="Tertiary Insured">
                                      Tertiary Insured
                                    </option>
                                    <option value="Primary Insurance">
                                      Primary Insurance
                                    </option>
                                    <option value="Secondary Insurance">
                                      Secondary Insurance
                                    </option>
                                    <option value="Guarantor">Guarantor</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12 mt-2">
                              <label className="text-dark">
                                Patient Comment (applies to user print
                                statements)
                              </label>
                              <textarea
                                placeholder="Patient Comment (applies to user print statements)"
                                className="form-control"
                                aria-label="With textarea"
                                value={patient_comment}
                                onChange={(e) =>
                                  setPatient_comment(
                                    e.target.value
                                      ?.toString()
                                      ?.trimStart()
                                      ?.toUpperCase()
                                  )
                                }
                                cols={20}
                                rows={8}
                                wrap="hard"
                                maxLength={400}
                              ></textarea>
                            </div>

                            <div className="col-md-6 mt-4">
                              <label className="text-nowrap text-dark">
                                Patient Comment (applies to automated
                                statements)
                              </label>
                              <textarea
                                placeholder="Patient Comment (applies to automated statements)"
                                className="form-control"
                                aria-label="With textarea"
                                value={patient_comment2}
                                onChange={(e) =>
                                  setpatient_comment2(
                                    e.target.value
                                      ?.toString()
                                      ?.trimStart()
                                      ?.toUpperCase()
                                  )
                                }
                                cols={20}
                                rows={8}
                                wrap="hard"
                                maxLength={200}
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        <div className="card mb-2 mt-2">
                          <div className="card-header">Collection Options</div>
                          <div className="card-body ">
                            <div className="col-md-12">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value="Send a Final Demand Notice instead of regular statement"
                                  id="finaldemandnotice"
                                  onChange={(e) =>
                                    setfinaldemandnotice(
                                      Number(e.target.checked)
                                    )
                                  }
                                  checked={finaldemandnotice}
                                />

                                <label
                                  className="form-check-label text-dark"
                                  htmlFor="finaldemandnotice"
                                >
                                  Send a Final Demand Notice instead of regular
                                  statement <br />
                                  (applies to statement automation and batch
                                  printing)
                                </label>
                              </div>
                              <div className="row">
                                <div className="col-md-3">
                                  <label className="text-dark">
                                    Collection Date
                                  </label>
                                  <input
                                    onChange={(e) =>
                                      setCollectionDate(
                                        e.target.value?.toString()
                                      )
                                    }
                                    value={CollectionDate}
                                    type="date"
                                    className="form-control form-control-sm"
                                  />
                                </div>
                                <div className="col-md-9">
                                  <label className="text-dark">
                                    Collection Reason
                                  </label>
                                  <input
                                    placeholder="Collection Reason"
                                    type="text"
                                    maxLength={75}
                                    className="form-control form-control-sm"
                                    value={collectionreason}
                                    onChange={(e) =>
                                      setcollectionreason(
                                        e.target.value
                                          ?.toString()
                                          ?.trimStart()
                                          ?.toUpperCase()
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card mb-2 mt-2">
                          <div className="card-header">
                            Payment Portal Options
                          </div>
                          <div className="card-body">
                            <div className="col-md-12 text-dark">
                              You do not have access to this feature. Please see
                              your account's Authorized Representative for
                              assistance.
                            </div>
                          </div>
                        </div>

                        <div className="card mb-2 mt-2">
                          <div className="card-header">Guarantor</div>
                          <div className="card-body">
                            <div className="col-md-6 text-dark">
                              <label>Relationship to Patient</label>
                              <select
                                value={rel_to_patient_guarantor}
                                onChange={(e) =>
                                  setrel_to_patient_guarantor(e.target.value)
                                }
                                defaultValue="None"
                                className="form-select form-select-sm"
                                aria-label=".form-select-sm example"
                              >
                                <option value="None">None</option>
                                <option value="Spouse">Spouse</option>
                                <option value="Parent">Parent</option>
                                <option value="Child">Child</option>

                                <option value="Relative">Relative</option>

                                <option value="Other">Other</option>
                              </select>
                            </div>
                            <div className="row mt-2">
                              <div className="col-md-5">
                                <label className="text-dark">Last Name</label>
                                <input
                                  placeholder="Last Name"
                                  type="text"
                                  maxLength={30}
                                  className="form-control form-control-sm"
                                  value={billingLastName}
                                  onChange={(e) =>
                                    setbillingLastName(
                                      e.target.value
                                        ?.toString()
                                        ?.trimStart()
                                        ?.toUpperCase()
                                    )
                                  }
                                />
                              </div>
                              <div className="col-md-4">
                                <label className="text-dark">First Name</label>
                                <input
                                  placeholder="First Name"
                                  type="text"
                                  maxLength={20}
                                  className="form-control form-control-sm"
                                  value={billingFirstName}
                                  onChange={(e) =>
                                    setbillingFirstName(
                                      e.target.value
                                        ?.toString()
                                        ?.trimStart()
                                        ?.toUpperCase()
                                    )
                                  }
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="text-dark">MI</label>
                                <input
                                  placeholder="MI"
                                  type="text"
                                  maxLength={1}
                                  className="form-control form-control-sm"
                                  value={billingMI}
                                  onChange={(e) =>
                                    setbillingMI(
                                      e.target.value
                                        ?.toString()
                                        ?.trim()
                                        ?.toUpperCase()
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-12 mt-2">
                              <label className="text-dark">Address</label>
                              <input
                                placeholder="Address"
                                type="text"
                                minLength={1}
                                maxLength={40}
                                className="form-control form-control-sm"
                                value={billingAddress1}
                                onChange={(e) =>
                                  setbillingAddress1(
                                    e.target.value
                                      ?.toString()
                                      ?.trimStart()
                                      ?.toUpperCase()
                                  )
                                }
                              />

                              <input
                                placeholder=""
                                type="text"
                                minLength={1}
                                maxLength={40}
                                className="form-control form-control-sm mt-2"
                                value={billingAddress2}
                                onChange={(e) =>
                                  setbillingAddress2(
                                    e.target.value
                                      ?.toString()
                                      ?.trimStart()
                                      ?.toUpperCase()
                                  )
                                }
                              />
                            </div>
                            <div className="col-md-12 mt-3 d-flex">
                              <div className="col-md-5">
                                <label className="text-dark">City</label>
                                <input
                                  type="text"
                                  className="form-control form-control-sm placeText"
                                  id="patientbillingcitycontact"
                                  placeholder="City"
                                  name="patientbillingcitycontact"
                                  autoComplete="off"
                                  autoCapitalize="characters"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  onChange={(e) =>
                                    setzipapi_city3(
                                      e.target.value
                                        ?.replace(/[^A-Za-z ]/gi, "")
                                        .toUpperCase()
                                        .trimStart()
                                    )
                                  }
                                  value={zipapi_city3
                                    ?.replace(/[^A-Za-z ]/gi, "")
                                    .toUpperCase()
                                    .trimStart()}
                                  maxLength={28}
                                />
                              </div>
                              <div className="col-md-2 mx-2">
                                <label className="text-dark">State</label>
                                <input
                                  type="text"
                                  className="form-control form-control-sm placeText"
                                  id="patientstateinbillinginfo"
                                  placeholder="State"
                                  name="patientstateinbillinginfo"
                                  autoComplete="off"
                                  autoCapitalize="characters"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  onChange={(e) => {
                                    setzipapi_state3(
                                      e.target.value
                                        ?.replace(/[^A-Za-z ]/gi, "")
                                        .toUpperCase()
                                        .trim()
                                    );
                                  }}
                                  value={zipapi_state3
                                    ?.replace(/[^A-Za-z ]/gi, "")
                                    .toUpperCase()
                                    .trimStart()}
                                  maxLength={2}
                                />
                              </div>
                              <div className="col-md-4">
                                <label className="text-dark">Zip</label>
                                <PatternFormat
                                  format="#####-####"
                                  mask=""
                                  type="text"
                                  className="form-control form-control-sm"
                                  id="patientzipcode"
                                  name="patientzipcode"
                                  placeholder="ZIP Code"
                                  autoComplete="off"
                                  autoCapitalize="characters"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  value={zipapicode3}
                                  onChange={(e) => {
                                    setzipapicode3(
                                      e.target.value
                                        ?.replace(/[^0-9]/gi, "")
                                        ?.trim()
                                    );
                                    (zipapicode3?.match(
                                      /(?<!\d)\d{4}(?!\d)/gm
                                    ) ||
                                      zipapicode3?.match(
                                        /(?<!\d)\d{8}(?!\d)/gm
                                      )) &&
                                      dispatch(
                                        PatientEditCity_stateFetch3(
                                          e.target.value
                                            ?.replace(/[^0-9]/gi, "")
                                            ?.trim()
                                        )
                                      );
                                  }}
                                  minLength={5}
                                />
                              </div>
                            </div>

                            <div className="col-md-12 mt-2 d-flex">
                              <div className="col-md-4">
                                <label className="text-dark">Home Phone</label>
                                <PatternFormat
                                  format="(###) ###-####"
                                  pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                  title="Please Enter a Valid Phone #"
                                  mask=""
                                  type="text"
                                  className="form-control form-control-sm placeText"
                                  id="billingcontact_homephone"
                                  placeholder="Home Phone"
                                  name="billingcontact_homephone"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  value={HomePhone_billinginfo}
                                  onChange={(e) =>
                                    setHomePhone_billinginfo(e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-md-4 mx-1">
                                <label className="text-dark">Cell Phone</label>
                                <PatternFormat
                                  format="(###) ###-####"
                                  pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                  title="Please Enter a Valid Phone #"
                                  mask=""
                                  type="text"
                                  className="form-control form-control-sm placeText"
                                  id="billing_info_cellphone"
                                  placeholder="Cell Phone"
                                  name="billing_info_cellphone"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  value={CellPhone_billinginfo}
                                  onChange={(e) =>
                                    setCellPhone_billinginfo(e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-md-4 mx-0">
                                <label className="text-dark">Work Phone</label>
                                <PatternFormat
                                  format="(###) ###-####"
                                  pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                  title="Please Enter a Valid Phone #"
                                  mask=""
                                  type="text"
                                  className="form-control form-control-sm placeText"
                                  id="billing_info_workphone"
                                  placeholder="Work Phone"
                                  name="billing_info_workphone"
                                  autoComplete="off"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  value={WorkPhone_billinginfo}
                                  onChange={(e) =>
                                    setWorkPhone_billinginfo(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-12 mt-2">
                              <label className="text-dark">Email</label>
                              <input
                                type="text"
                                className="form-control form-control-sm placeText"
                                id="billing_info_email"
                                placeholder="Email"
                                name="email"
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                value={Email_billing}
                                // minLength={6}
                                maxLength={100}
                                onChange={(e) => {
                                  setEmail_billing(
                                    e.target.value?.toString()?.trimStart()
                                  );
                                  // ValidateEmail(e);
                                }}
                              />
                            </div>

                            <div className="col-md-12 mt-2">
                              <label className="text-dark">Remarks</label>
                              <input
                                type="text"
                                className="form-control form-control-sm placeText"
                                id="billing_info_remarks"
                                placeholder="Remarks"
                                name="billing_info_remarks"
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck="false"
                                value={remarks_billing}
                                maxLength={100}
                                onChange={(e) =>
                                  setRemarks_billing(
                                    e.target.value
                                      ?.toString()
                                      ?.trimStart()
                                      ?.toUpperCase()
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ******************************** Billing Info End *********************************** */}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="claim_def"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    {/* <ClaimDefaultInfo /> */}
                    {/* *********************************************** Claim Defaults Start *********************************************** */}
                    <>
                      <div className="row d-lg-flex mt-3">
                        <div className="col-md-10">
                          <label>Default Provider</label>
                          <div className="input-group">
                            <input
                              style={{ cursor: "pointer" }}
                              className="form-control form-control-sm"
                              type="text"
                              placeholder="Default Provider"
                              aria-label="Default Provider"
                              id="default_provider"
                              name="default_provider"
                              autoComplete="off"
                              autoCapitalize="off"
                              autoCorrect="off"
                              spellCheck="false"
                              maxLength={60}
                              autoFocus
                              value={
                                defaultprovider
                                  ? defaultprovider
                                  : provide?.[0]?.provider?.last_name +
                                    `, ` +
                                    provide?.[0]?.provider?.first_name +
                                    ` ` +
                                    `(${provide?.[0]?.sequence_provider?.id})`
                              }
                              required={false}
                              data-bs-toggle="modal"
                              data-bs-target="#showAllProvidersModel"
                            />
                            <button
                              type="button"
                              className="input-group-text btn btn-sm btn-outline-secondary"
                              id="nulldefaultproviders"
                              onClick={() => {
                                setDefaultProvider("");
                                setDefaultProviderNPI("");
                                setdefaultpractice("");
                              }}
                              disabled={defaultprovider ? false : true}
                            >
                              <i className="fas fa-close" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              className="input-group-text btn-hov"
                              id="providerpracticebtn"
                              data-bs-toggle="modal"
                              data-bs-target="#showAllProvidersModel"
                            >
                              <i className="fas fa-search" aria-hidden="true" />
                            </button>

                            <button
                              style={{ cursor: "pointer" }}
                              className="btn btn-outline-dark btn-sm"
                              // onClick={() => ToEditable(PractiveProvID)}
                              // disabled={defaultprovider ? false : true}
                              disabled={true}
                            >
                              <i
                                style={{ cursor: "pointer" }}
                                className="far fa-building  mx-1 mt-1"
                              />
                            </button>
                          </div>
                        </div>
                        <ul className="nav">
                          <li className="nav-item">
                            <a
                              className="nav-link user-select-none"
                              onClick={() => setshowproviderfunc()}
                              style={{ cursor: "pointer" }}
                            >
                              {showprovider
                                ? `Hide Provider Details`
                                : `Show Provider Details`}
                            </a>
                          </li>
                        </ul>
                        {showprovider ? (
                          <div className="col-md-12 mt-1">
                            <span>
                              <b>NPI:</b>&nbsp;
                              {defaultproviderNPI
                                ? defaultproviderNPI
                                : provide?.[0]?.provider?.npi_code}
                            </span>
                            <br />
                            <span>
                              <b>Practice:</b>&nbsp;
                              {defaultpractice
                                ? defaultpractice
                                : provide?.[0]?.practice?.name}
                            </span>
                          </div>
                        ) : null}
                      </div>
                      <div className="col-md-10 mt-2">
                        <label>Office Location</label>
                        <select
                          className="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                        >
                          <option value={officelocationName}>
                            {officelocationName
                              ? officelocationName
                              : provide?.[0]?.practice?.practice_location?.name
                              ? provide?.[0]?.practice?.practice_location?.name
                              : ""}
                          </option>
                        </select>
                      </div>
                      <div className="col-md-10 mt-2">
                        <label>Default Ordering Provider</label>
                        <div className="input-group">
                          <input
                            style={{ cursor: "pointer" }}
                            className="form-control form-control-sm"
                            type="text"
                            placeholder="Default ordering provider"
                            aria-label="NPI"
                            id="defaultorderingprovider"
                            name="defaultorderingprovider"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck={false}
                            maxLength={60}
                            autoFocus
                            value={defaultOrderingprovider}
                            required={false}
                            data-bs-toggle="modal"
                            data-bs-target="#showAllRefProvidersModel"
                          />
                          <button
                            type="button"
                            className="input-group-text btn btn-sm btn-outline-secondary"
                            id="null"
                            onClick={(e) => {
                              setdefaultOrderingprovider("");
                            }}
                            disabled={defaultOrderingprovider ? false : true}
                          >
                            <i className="fas fa-close" aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            className="input-group-text btn-hov"
                            id="providerpracticebtn"
                            data-bs-toggle="modal"
                            data-bs-target="#showAllRefProvidersModel"
                          >
                            <i className="fas fa-search" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="col-md-10 mt-2 mb-2">
                        <label>Default Facility</label>
                        <div className="input-group">
                          <input
                            style={{ cursor: "pointer" }}
                            className="form-control form-control-sm"
                            type="text"
                            placeholder="Default Facility"
                            aria-label="Default Facility"
                            id="Default_Facility"
                            name="Default_Facility"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={60}
                            autoFocus
                            value={DefaultFacility}
                            required={false}
                            data-bs-toggle="modal"
                            data-bs-target="#showDefaultFacilityModel"
                          />
                          <button
                            type="button"
                            className="input-group-text btn btn-sm btn-outline-secondary"
                            id="nullify_facility"
                            onClick={(e) => {
                              setDefaultFacility("");
                              setDefaultFacilityID(null);
                            }}
                            disabled={DefaultFacility ? false : true}
                          >
                            <i className="fas fa-close" aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            className="input-group-text btn-hov"
                            id="providerpracticebtn"
                            data-bs-toggle="modal"
                            data-bs-target="#showDefaultFacilityModel"
                          >
                            <i className="fas fa-search" aria-hidden="true" />
                          </button>

                          <button
                            style={{ cursor: "pointer" }}
                            className="btn btn-outline-dark btn-sm"
                            onClick={() =>
                              ToEditableFacilityForm(DefaultFacilityID)
                            }
                            disabled={DefaultFacilityID ? false : true}
                            // disabled={true}
                          >
                            <i
                              style={{ cursor: "pointer" }}
                              className="far fa-building  mx-1 mt-1"
                            />
                          </button>
                        </div>
                      </div>

                      <div className="col-md-10 mt-2 mb-2">
                        <label>Default Referring Provider</label>
                        <div className="input-group">
                          <input
                            style={{ cursor: "pointer" }}
                            className="form-control form-control-sm"
                            type="text"
                            placeholder="Default Referring Provider"
                            aria-label="Default Referring Provider"
                            id="Default_Referring_Provider"
                            name="Default_Referring_Provider"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={60}
                            autoFocus
                            value={DefaultRef}
                            required={false}
                            data-bs-toggle="modal"
                            data-bs-target="#showDefaultRefProvidersModel"
                          />
                          <button
                            type="button"
                            className="input-group-text btn btn-sm btn-outline-secondary"
                            id="nullify_ref_prov"
                            onClick={(e) => {
                              setDefaultRefProvider("");
                            }}
                            disabled={DefaultRef ? false : true}
                          >
                            <i className="fas fa-close" aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            className="input-group-text btn-hov"
                            id="providerpracticebtn"
                            data-bs-toggle="modal"
                            data-bs-target="#showDefaultRefProvidersModel"
                          >
                            <i className="fas fa-search" aria-hidden="true" />
                          </button>

                          <button
                            style={{ cursor: "pointer" }}
                            className="btn btn-outline-dark btn-sm"
                            // onClick={() => ToEditable(PractiveProvID)}
                            // disabled={defaultprovider ? false : true}
                            disabled={true}
                          >
                            <i
                              style={{ cursor: "pointer" }}
                              className="far fa-building  mx-1 mt-1"
                            />
                          </button>
                        </div>
                      </div>

                      <div className="col-md-10">
                        <label>Default Sales Rep</label>
                        <div className="input-group">
                          <input
                            style={{ cursor: "pointer" }}
                            className="form-control form-control-sm"
                            type="text"
                            placeholder="Default Sales Rep"
                            aria-label="NPI"
                            id="provider"
                            name="provider"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            maxLength={60}
                            autoFocus
                            value={defaultSalesRep}
                            required={false}
                            data-bs-toggle="modal"
                            data-bs-target="#showDefaultSalesRepModel"
                          />
                          <button
                            type="button"
                            className="input-group-text btn btn-sm btn-outline-secondary"
                            id="nullify_sales_rep"
                            onClick={(e) => {
                              setdefaultSalesRep("");
                            }}
                            disabled={defaultSalesRep ? false : true}
                          >
                            <i className="fas fa-close" aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            className="input-group-text btn-hov"
                            id="providerpracticebtn"
                            data-bs-toggle="modal"
                            data-bs-target="#showDefaultSalesRepModel"
                          >
                            <i className="fas fa-search" aria-hidden="true" />
                          </button>

                          <button
                            style={{ cursor: "pointer" }}
                            className="btn btn-outline-dark btn-sm"
                            // onClick={() => ToEditable(PractiveProvID)}
                            // disabled={defaultprovider ? false : true}
                            disabled={true}
                          >
                            <i
                              style={{ cursor: "pointer" }}
                              className="far fa-building  mx-1 mt-1"
                            />
                          </button>
                        </div>
                      </div>
                      {DefaultRef && (
                        <div className="row">
                          <div className="col-md-4 mt-2">
                            <label htmlFor="RP_type">
                              Referring Provider Type
                            </label>
                            <select
                              id="RP_type"
                              className="form-select-sm form-select"
                              aria-label="Default select example"
                            >
                              <option value="1">Referring Provider</option>
                              <option value="2">Primary Care Provider</option>
                            </select>
                          </div>
                          <div className="col-md-8 mt-3">
                            <label />
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexCheckDefault"
                              >
                                Do not send referring provider on claims for
                                this patient
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="col-md-10">
                        <div className="card mb-2 mt-2">
                          <div className="card-header">Assignment</div>
                          <div className="card-body ">
                            <div className="col-md-12">
                              <div className="col-md-10">
                                <label className="text-dark">
                                  Assignments of Benefits
                                </label>
                                <select
                                  onChange={(e) =>
                                    setAssignment_of_Benefits(e.target.value)
                                  }
                                  value={Assignment_of_Benefits}
                                  defaultValue="Signed signature authorization form or forms for both Box 12
                and Box 13 are on file"
                                  className="form-select form-select-sm"
                                  aria-label=".form-select-sm example"
                                >
                                  <option
                                    value="Signed signature authorization form or forms for both Box 12
                    and Box 13 are on file"
                                  >
                                    Signed signature authorization form or forms
                                    for both Box 12 and Box 13 are on file
                                  </option>
                                  <option value="Signed CMS 1500 claim form on file">
                                    Signed CMS 1500 claim form on file
                                  </option>
                                  <option value="Signed signature authorization form for Box 13 on file">
                                    Signed signature authorization form for Box
                                    13 on file
                                  </option>
                                  <option value="Signature generated by provider because the patient was not physically present for services">
                                    Signature generated by provider because the
                                    patient was not physically present for
                                    services
                                  </option>

                                  <option value="Signed signature authorization form for Box 12 on file">
                                    Signed signature authorization form for Box
                                    12 on file
                                  </option>
                                  <option value="Patient refuses to assign benefits">
                                    Patient refuses to assign benefits
                                  </option>
                                </select>
                              </div>
                              <div className="col-md-10 mt-2">
                                <label className="text-dark">
                                  Provider Accepts Assignments
                                </label>
                                <select
                                  onChange={(e) =>
                                    setprovider_accepts_assignments(
                                      e.target.value
                                    )
                                  }
                                  value={provider_accepts_assignments}
                                  defaultValue=""
                                  className="form-select form-select-sm"
                                  aria-label=".form-select-sm example"
                                >
                                  <option value="Use the default accept assignment for the provider">
                                    Use the default accept assignment for the
                                    provider
                                  </option>
                                  <option value="Yes, the provider accepts the assignment of benefits">
                                    Yes, the provider accepts the assignment of
                                    benefits
                                  </option>
                                  <option
                                    value="No, the provider does not accept the
                                    assignment of benefits"
                                  >
                                    No, the provider does not accept the
                                    assignment of benefits
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-10">
                        <div className="card mb-2 mt-2">
                          <div className="card-header">Default Codes</div>
                          <div className="card-body p-0 pe-0 pb-3">
                            <div className="col-md-12 px-3 pb-2">
                              <div className="row">
                                {ICD_fields?.map((icd, i) => {
                                  return (
                                    <div
                                      key={i}
                                      {...icd}
                                      className="col-md-3 pt-3 mt-2 px-1"
                                    >
                                      <div className="input-group">
                                        <input
                                          className={`form-control form-control-sm`}
                                          type={icd.type}
                                          placeholder={icd.placeholder}
                                          id={icd.id}
                                          name={icd.name}
                                          autoComplete={icd.autoComplete}
                                          autoCapitalize={icd.autoCapitalize}
                                          autoCorrect={icd.autoCorrect}
                                          spellCheck={icd.spellCheck}
                                          maxLength={icd.maxLength}
                                          minLength={icd.minLength}
                                          value={icd?.value}
                                          // data-bs-toggle={icd.data_bs_toggle}
                                          // data-bs-target={icd.data_bs_target}
                                        />
                                        <button
                                          type="button"
                                          className="input-group-text btn-hov"
                                          id={icd.btn_ID}
                                          data-bs-toggle="modal"
                                          data-bs-target={icd?.data_bs_target}
                                          onClick={() =>
                                            setICDStatus(icd?.ICD_Status)
                                          }
                                        >
                                          <i
                                            className="fas fa-search"
                                            aria-hidden="true"
                                          ></i>
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            <hr className="text-dark" />
                            <div className="col-md-12 px-3 mt-1">
                              <div className="row">
                                {CPT_fields?.map((cpt, i) => {
                                  return (
                                    <div
                                      key={i}
                                      {...cpt}
                                      className="col-md-3 px-1"
                                    >
                                      <div className="input-group pt-3">
                                        <input
                                          className={`form-control form-control-sm`}
                                          type={cpt.type}
                                          placeholder={cpt.placeholder}
                                          id={cpt.id}
                                          name={cpt.name}
                                          autoComplete={cpt.autoComplete}
                                          autoCapitalize={cpt.autoCapitalize}
                                          autoCorrect={cpt.autoCorrect}
                                          spellCheck={cpt.spellCheck}
                                          maxLength={cpt.maxLength}
                                          minLength={cpt.minLength}
                                          value={cpt?.value}
                                        />
                                        <button
                                          type="button"
                                          className="input-group-text btn-hov"
                                          id={cpt.btn_ID}
                                          data-bs-toggle="modal"
                                          data-bs-target={cpt?.data_bs_target}
                                          onClick={() =>
                                            setCPTStatus(cpt?.CPT_Status)
                                          }
                                        >
                                          <i
                                            className="fas fa-search"
                                            aria-hidden="true"
                                          ></i>
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-10">
                        <div className="card mb-2 mt-2">
                          <div className="card-header">
                            {" "}
                            Illness & Accident Information{" "}
                          </div>
                          <div className="card-body ">
                            <div className="col-md-12">
                              <div className="form-check">
                                <input
                                  onChange={(e) =>
                                    setInclude_accident_illness_info(
                                      e.target.checked
                                    )
                                  }
                                  checked={Include_accident_illness_info}
                                  className="form-check-input"
                                  type="checkbox"
                                  value="Include accident and illness information on claims"
                                  id="Include accident and illness information on claims"
                                />
                                <label
                                  className="form-check-label text-dark"
                                  htmlFor="Include accident and illness information on claims"
                                >
                                  Include accident and illness information on
                                  claims
                                </label>
                              </div>
                              <div className="row">
                                <div className="col-md-3">
                                  <label className="text-dark">
                                    Illness/Accident Date
                                  </label>
                                  <input
                                    value={Accident_Date}
                                    onChange={(e) =>
                                      setAccident_Date(e.target.value)
                                    }
                                    max={new Date().toISOString().split("T")[0]}
                                    type="date"
                                    className="form-control form-control-sm"
                                  />
                                </div>
                                <div className="col-md-3">
                                  <label className="text-dark">
                                    Accident State
                                  </label>
                                  <input
                                    onChange={(e) =>
                                      setAccident_State(
                                        e.target.value
                                          ?.toString()
                                          ?.replace(/[^A-Za-z]/gi, "")
                                          ?.toUpperCase()
                                          ?.trim()
                                      )
                                    }
                                    value={Accident_State}
                                    maxLength={2}
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder="Accident State"
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label className="text-dark">
                                    Accident Type
                                  </label>
                                  <select
                                    onChange={(e) =>
                                      setAccident_type(e.target.value)
                                    }
                                    value={Accident_type}
                                    className="form-select form-select-sm"
                                    aria-label=".form-select-sm example"
                                  >
                                    <option value="Not Accident Related">
                                      Not Accident Related
                                    </option>
                                    <option value="Employment Accident">
                                      Employment Accident
                                    </option>
                                    <option value="Auto Accident">
                                      Auto Accident
                                    </option>
                                    <option value="Other Accident">
                                      Other Accident
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-10">
                        <div className="card mb-2 mt-2">
                          <div className="card-header"> Other </div>
                          <div className="card-body ">
                            <div className="col-md-12">
                              <label className="text-dark">Box 11b</label>
                              <input
                                onChange={(e) =>
                                  setBox_11b_ClaimDefaults(
                                    e.target.value
                                      ?.toString()
                                      ?.toUpperCase()
                                      ?.trimStart()
                                  )
                                }
                                value={Box_11b_ClaimDefaults}
                                maxLength={40}
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Box 11b"
                              />

                              <label className="text-dark pt-3">Box 19</label>
                              <input
                                onChange={(e) =>
                                  setBox_19_ClaimDefaults(
                                    e.target.value
                                      ?.toString()
                                      ?.toUpperCase()
                                      ?.trimStart()
                                  )
                                }
                                value={Box_19_ClaimDefaults}
                                maxLength={83}
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Box 19"
                              />
                            </div>

                            <div className="row mt-3 mb-3">
                              <div className="col-md-4">
                                <label className="text-dark">
                                  Last Menstrual Date
                                </label>
                                <input
                                  value={last_menstrual_date_claimDefaults}
                                  onChange={(e) =>
                                    setlast_menstrual_date_claimDefaults(
                                      e.target.value
                                    )
                                  }
                                  type="date"
                                  max={new Date().toISOString().split("T")[0]}
                                  className="form-control form-control-sm"
                                />
                              </div>

                              <div className="col-md-4">
                                <label className="text-dark">
                                  Admission Date
                                </label>
                                <input
                                  value={admission_Date_ClaimDefaults}
                                  onChange={(e) =>
                                    setadmission_Date_ClaimDefaults(
                                      e.target.value
                                    )
                                  }
                                  max={new Date().toISOString().split("T")[0]}
                                  type="date"
                                  className="form-control form-control-sm"
                                />
                              </div>

                              <div className="col-md-4">
                                <label className="text-dark">
                                  Initial Treatment Date
                                </label>
                                <input
                                  value={initial_Treatment_Date}
                                  onChange={(e) =>
                                    setinitial_Treatment_Date(e.target.value)
                                  }
                                  max={new Date().toISOString().split("T")[0]}
                                  type="date"
                                  className="form-control form-control-sm"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>

                    {/* *********************************************** Claim Defaults End *********************************************** */}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="col-md-3">notes</div>
      </div>
    </>
  );
};

export default EditablePatient;
