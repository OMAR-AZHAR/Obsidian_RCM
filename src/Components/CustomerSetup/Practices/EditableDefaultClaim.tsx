import { SetStateAction, useState, useEffect } from "react";
import PLACE_OF_SERVICE_MODAL from "../../../GLOBAL/NPI_TAX_PLACE/PLACE_OF_SERVICE";

import TYPE_OF_SERVICE_MODAL from "../../../GLOBAL/NPI_TAX_PLACE/TYPE_OF_SERVICE";

import TYPES_OF_BILL_MODAL from "../../../GLOBAL/TYPES_OF_BILL";
import useFetch from "../../../Hooks/useFetch";
import {
  getAdmSource,
  getAdmType,
  getAutoDecrement,
  getExcludeFacility,
  getIncludeAccident,
  getPatientStatus,
  getPayerAddress,
  getPrintStartStop,
  getTypeofBill,
} from "../../../Redux/features/Practice/DefaultClaimsSlice";
import { useDispatch, useSelector } from "react-redux";
// *********
// ***
// *
// *************************
// Issues:
// 1) POS and TOS are not Editable
// *************************
// *********
// ***
// *
export default function EditableDefaultClaim() {
  const dispatch = useDispatch();
  const SetPOSValue = useSelector((state: any) => state.POSSlice?.POS_id);
  const SetTOSValue = useSelector((state: any) => state.POSSlice?.TOS_id);
  // Data from API backend data stored
  const pos_id = useSelector(
    (state: any) => state.EditPractice?.data?.claim?.pos_id
  );
  const tos_code = useSelector(
    (state: any) => state.EditPractice?.data?.claim?.tos_data?.tos_code
  );
  const payer_address_location = useSelector(
    (state: any) => state.EditPractice?.data?.claim?.address_location
  );
  const print_anesthesia_box_24 = useSelector(
    (state: any) => state.EditPractice?.data?.claim?.print_anesthesia_box_24
  );
  const auto_decrement = useSelector(
    (state: any) => state.EditPractice?.data?.claim?.auto_decrement
  );
  const include_acc_illness_info = useSelector(
    (state: any) => state.EditPractice?.data?.claim?.include_acc_illness_info
  );
  const exclude_facility = useSelector(
    (state: any) => state.EditPractice?.data?.claim?.exclude_facility
  );
  // Type of Bill
  const typeOfcare = useSelector(
    (state: any) => state.EditPractice?.data?.type_of_care?.id
  );

  const typeOffacility = useSelector(
    (state: any) => state.EditPractice?.data?.type_of_facility?.id
  );
  const frequency = useSelector(
    (state: any) => state.EditPractice?.data?.frequency?.id
  );
  const admtype = useSelector(
    (state: any) => state.EditPractice?.data?.claim?.admission_type?.id
  );
  const admsource = useSelector(
    (state: any) => state.EditPractice?.data?.claim?.admission_source?.id
  );
  const patstatus = useSelector(
    (state: any) => state.EditPractice?.data?.claim?.patient_status_id
  );

  const [POS, SetPOS] = useState();
  const [TOS, SetTOS] = useState();
  const [printAnesthesia, setPrintAnesthesia] = useState<Boolean>(false);
  const [autodecre, setAutoDecre] = useState<Boolean>(false);
  const [include_acc_illness, setinclude_acc_illness] =
    useState<Boolean>(false);
  const [exclude_facility_state, setexclude_facility_state] =
    useState<Boolean>(false);
  // console.log("Setting", SetPOSValue, SetTOSValue);
  const [TobValue, SetTOB] = useState<any>("");

  dispatch(getTypeofBill(TobValue));
  const SetInputValue = (e: SetStateAction<string>) => {
    // 👇️ take parameter passed from Child component (NewFacilityNotes)
    SetTOB(e);
  };
  useEffect(() => {
    SetPOS(pos_id);
    SetTOS(tos_code);
    setPrintAnesthesia(Boolean(print_anesthesia_box_24));
    setAutoDecre(Boolean(auto_decrement));
    setinclude_acc_illness(Boolean(include_acc_illness_info));
    setexclude_facility_state(Boolean(exclude_facility));
    SetTOB("" + frequency + typeOfcare + typeOffacility);
  }, [
    pos_id,
    tos_code,
    payer_address_location,
    print_anesthesia_box_24,
    auto_decrement,
    include_acc_illness_info,
    exclude_facility,
    typeOfcare,
    typeOffacility,
    frequency,
    admtype,
    patstatus,
  ]);

  // Admission Types
  const { data: admissionType, loading: loadingtypes } = useFetch(
    "customersetup/practice/admissontype"
  );
  const { data: admissionSource, loading: loadingsource } = useFetch(
    "customersetup/practice/admissonsource"
  );
  const { data: patientStatus, loading: loadpatient } = useFetch(
    "customersetup/practice/patient_status"
  );

  return (
    <div className="px-0">
      <div className="row">
        <div className="col py-3">
          <div className="input-group">
            <input
              className="form-control form-control-sm"
              type="text"
              placeholder="Place of Service"
              aria-label="PlaceofService"
              id="PlaceofService"
              name="PlaceofService"
              // value={POSvalue}
              maxLength={2}
              value={POS}
              onChange={(e) => dispatch(SetPOS(SetPOSValue)!)}

              // onChange={(e) => dispatch(SetPOS(e.target.value))}
            />

            <PLACE_OF_SERVICE_MODAL POS_Facility={undefined} />

            <button
              type="button"
              className="input-group-text btn-hov"
              id="PlaceofServicebtn"
              data-bs-toggle="modal"
              data-bs-target="#showPOSModel"
            >
              <i className="fas fa-search" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="col px-2 py-3">
          <div className="input-group">
            <input
              className="form-control form-control-sm"
              type="text"
              placeholder="Type of Service"
              aria-label="TypeofService"
              id="TypeofService"
              name="TypeofService"
              onChange={(e) => dispatch(SetTOS(SetTOSValue)!)}
              value={TOS}
            />
            <TYPE_OF_SERVICE_MODAL />

            <button
              type="button"
              className="input-group-text btn-hov"
              id="TypeofServicebtn"
              data-bs-toggle="modal"
              data-bs-target="#showTOSModel"
            >
              <i className="fas fa-search" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        {" "}
        <div className="col-md-10">
          <label className="mer-4">Payer Address Location on Claim Form</label>
        </div>
        <div className="col-md-7">
          <select
            defaultValue={payer_address_location}
            className="form-select form-select-sm"
            aria-label=".form-select-sm example"
            id="newPracticePayerAddressLocation"
            name="newPracticePayerAddressLocation"
            onChange={(e) => dispatch(getPayerAddress(e.target.value))}
          >
            <option value={1}>Right Side</option>
            <option value={2}>Left Side</option>
          </select>
        </div>
      </div>
      <div className="col-md-12 px-0 mt-3">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={Boolean(printAnesthesia)}
            value=""
            id="newPracticeprintAnesthesia"
            name="newPracticeprintAnesthesia"
            onChange={(e) => {
              setPrintAnesthesia(e.target.checked);
              dispatch(getPrintStartStop(Number(e.target.checked)));
            }}
          />
          <label
            className="form-check-label"
            htmlFor="newPracticeprintAnesthesia"
          >
            Print Anesthesia start/stop time in CMS-1500 box 24
          </label>
        </div>
        <div className="form-check mt-2">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            checked={Boolean(autodecre)}
            id="newPracticeautoDecrement"
            name="newPracticeautoDecrement"
            onChange={(e) => {
              setAutoDecre(e.target.checked);
              dispatch(getAutoDecrement(Number(e.target.checked)));
            }}
          />
          <label
            className="form-check-label"
            htmlFor="newPracticeautoDecrement"
          >
            Auto decrement authorized visits on claim entry
          </label>
        </div>
        <div className="form-check mt-2">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            checked={Boolean(include_acc_illness)}
            id="newPracticeincludeAccident"
            onChange={(e) => {
              setinclude_acc_illness(e.target.checked);
              dispatch(getIncludeAccident(Number(e.target.checked)));
            }}
          />
          <label
            className="form-check-label"
            htmlFor="newPracticeincludeAccident"
          >
            Include accident and illness info on claims for all patients
          </label>
        </div>
        <div className="form-check mt-2">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            checked={Boolean(exclude_facility_state)}
            id="newPracticenexcludeFacility"
            name="newPracticenexcludeFacility"
            onChange={(e) => {
              setexclude_facility_state(e.target.checked);
              dispatch(getExcludeFacility(Number(e.target.checked)));
            }}
          />
          <label
            className="form-check-label"
            htmlFor="newPracticenexcludeFacility"
          >
            Exclude the Facility when sending claims to insurance
          </label>
        </div>
      </div>
      <div className="card px-0 me-0 mx-0">
        <h5
          className="card-header"
          style={{ fontSize: "13px", fontWeight: "bold" }}
        >
          Institutional Claim Defaults
        </h5>
        <div className="card-body">
          <div className="col-md-12">
            <div className="col-md-6">
              {" "}
              <div className="input-group">
                <input
                  className="form-control form-control-sm"
                  type="text"
                  placeholder="Type of Bill"
                  aria-label="TypeofBill"
                  id="newPracticeTypeofBill"
                  name="newPracticeTypeofBill"
                  value={TobValue?.trim()?.toUpperCase()}
                  onChange={(e) => SetTOB(e.target.value)}
                  maxLength={4}
                />
                <button
                  type="button"
                  className="input-group-text btn-hov"
                  id="PlaceofServicebtn"
                  data-bs-toggle="modal"
                  data-bs-target="#showTOBModel"
                >
                  <i className="fas fa-search" aria-hidden="true" />
                </button>

                <TYPES_OF_BILL_MODAL SetInputValue={SetInputValue} />
              </div>
            </div>

            <div className="col-md-6 mt-2">
              <label>Admission Type</label>
              {loadingtypes ? (
                "Loading..."
              ) : (
                <select
                  defaultValue={admtype}
                  className="form-select form-select-sm "
                  aria-label=".form-select-sm example"
                  id="newPracticeAdmissionType"
                  name="newPracticeAdmissionType"
                  onChange={(e) => dispatch(getAdmType(e.target.value))}
                >
                  <option value={"(No Selection)"} disabled>
                    (No Selection)
                  </option>

                  {admissionType?.map((aT, i) => {
                    return (
                      <option key={i} {...aT} value={aT?.id}>
                        {aT?.name}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>

            <div className="col-md-12 mt-2">
              <label>Admission Source</label>
              {loadingsource ? (
                "Loading..."
              ) : (
                <select
                  defaultValue={admsource}
                  className="form-select form-select-sm "
                  aria-label=".form-select-sm example"
                  id="newPracticeAdmissonSource"
                  name="newPracticeAdmissonSource"
                  onChange={(e) => dispatch(getAdmSource(e.target.value))}
                >
                  <option value={"(No Selection)"} disabled>
                    (No Selection)
                  </option>
                  {admissionSource?.map((aS, i) => {
                    return (
                      <option key={i} {...aS} value={aS.id}>
                        {aS.name}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>

            <div className="col-md-12 mt-2">
              <label>Patient Status</label>
              {loadpatient ? (
                "Loading..."
              ) : (
                <select
                  defaultValue={patstatus}
                  className="form-select form-select-sm "
                  aria-label=".form-select-sm example"
                  id="newPracticePatientStatus"
                  name="newPracticePatientStatus"
                  onChange={(e) => dispatch(getPatientStatus(e.target.value))}
                >
                  <option value={"(No Selection)"} disabled>
                    (No Selection)
                  </option>
                  {patientStatus?.map((pS, i) => {
                    return (
                      <option key={i} {...pS} value={pS.id}>
                        {pS.patient_status}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
