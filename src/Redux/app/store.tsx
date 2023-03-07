import { configureStore } from "@reduxjs/toolkit";
import ShowAllRolesSlice from "../../Redux/features/Security/ShowAllRolesSlice";
import ClaimAddNewSlice from "../features/Claim/ClaimAddNewSlice";
import CustomerManagmentSlice from "../features/CustomerManagment/CustomerManagmentSlice";
import ManageAccessCustomerSlice from "../features/CustomerManagment/ManageAccessCustomerSlice";
import POSreducer from "../features/Global_Forms/POS_TOB_TOS_slice";
import DefaultClaimsReducer from "../features/Practice/DefaultClaimsSlice";
import EditablePracticeSlice from "../features/Practice/EditablePracticeSlice";
import NewPracticeOfficeSlice from "../features/Practice/NewPracticeOfficeSlice";
import AllProviderSlice from "../features/Providers/AllPRoviderSlice";
import FiltersReducer from "../features/Sessions/FiltersSlice";
import TestThunkSlice from "../features/TestThunkSlice";
import EditUserSlice from "../features/UserManagement/EditUserSlice";
import AccessHoursReducer from "../features/UserManagement/UserProfile/AccessHoursSlice";
import CustomerAccessReducer from "../features/UserManagement/UserProfile/CustomerAccessSlice";
import CustomerNamesSlice from "../features/UserManagement/UserProfile/CustomerNamesSlice";
import GetUserSlice from "../features/UserManagement/UserProfile/GetUserSlice";
import PermissionEditSlice from "../features/UserManagement/UserProfile/PermissionEditSlice";
import PermissionReducer from "../features/UserManagement/UserProfile/PermissionSlice";
import City_stateSliceReducer from "../features/Global_Forms/City_stateSlice";
import taxonomySliceReducer from "../features/Global_Forms/taxonomySlice";
import NPISliceReducer from "../features/Global_Forms/NPISlice";
import EditableFacilityReducer from "../features/FacilityStates/EditableFacility";
import RefCity_stateFetchReducer from "../features/ReferringProviderRedux/Referring_City_stateSlice";
import PayersCityZipSliceReducer from "../features/Payer_Redux/PayersCityZipSlice";
import Codes from "../features/Codes/Codes";
import Patient_City_StateReducer from "../features/Patient/Patient_City_State";
import Patient_EditableSliceReducer from "../features/Patient/Patient_EditableSlice";
import Facility_City_StateReducer from "../features/FacilityStates/Facility_City_State";
import EditableProviderSliceReducer from "../features/Providers/EditableProviderSlice";
import EditableRefProviderSliceReducer from "../features/ReferringProviderRedux/EditableRefProviderSlice";
import EditablePayerSlice from "../features/Payer_Redux/EditablePayerSlice";

export const store = configureStore({
  reducer: {
    // All Reducers Defined here
    PermissionCustomers: PermissionReducer,
    CustomersAccess: CustomerAccessReducer,
    AccessHoursLimit: AccessHoursReducer,
    SessionsFilters: FiltersReducer,
    ProductSlice: TestThunkSlice,
    CustomersManagment: CustomerManagmentSlice,
    Claim: ClaimAddNewSlice,
    NewOffice: NewPracticeOfficeSlice,
    GetUsers: GetUserSlice,
    EditUser: EditUserSlice,
    EditPractice: EditablePracticeSlice,
    DefaultClaims: DefaultClaimsReducer,
    PermissionEditSlice: PermissionEditSlice,
    POSSlice: POSreducer,
    ShowAllRolesSlice: ShowAllRolesSlice,
    ManageAccessCustomerSlice: ManageAccessCustomerSlice,
    CustomerNamesSlice: CustomerNamesSlice,
    AllProviderSlice: AllProviderSlice,
    CityStateZip: City_stateSliceReducer,
    taxonomySlice: taxonomySliceReducer,
    NPISlice: NPISliceReducer,
    EditFacilitySlice: EditableFacilityReducer,
    Facility_City_State: Facility_City_StateReducer,
    RefCityStateZip: RefCity_stateFetchReducer,
    PayersCityStateZip: PayersCityZipSliceReducer,
    Codes: Codes,
    PatientCityState: Patient_City_StateReducer,
    Patient_Editable: Patient_EditableSliceReducer,
    Editable_Provider: EditableProviderSliceReducer,
    EditableRefProvider: EditableRefProviderSliceReducer,
    EditablePayer: EditablePayerSlice,
  },
});
