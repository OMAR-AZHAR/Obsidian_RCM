import * as Yup from "yup";
export const FormValNewFacility = Yup.object({
  newfacilityName: Yup.string()
    .max(60, "Not more than 60 characters")
    .min(2, "must be more than 2 characters"),
  // .required("required"),
  newfacilityemail: Yup.string().email("Enter valid email"),
  newfacilitycity: Yup.string()
    // .matches(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/, "Invalid City")
    // .required("required")
    .max(28, "Enter valid city"),
  // .min(3, "Invalid city"),
  newfacilityphone: Yup.string().min(14, "invalid phone"),
  newfacilitynpi: Yup.string()
    .max(10, "10 digits only")
    .min(10, "10 digits only"),
  newfacilitytaxonomySpeciality: Yup.string().min(2, "Invalid State"),
  // .max(10, "10 digits only")
  // .min(10, "10 digits only"),
  newfacilityfax: Yup.string().min(14, "invalid phone"),
  facilitysequence: Yup.string(),
  facilityreference: Yup.string(),
  facilityaddress: Yup.string().min(4, "invalid address"),
  // .required("required"),
  facilityaddress2: Yup.string().min(4, "invalid address"),
  // .required("required"),
  newfacilitystate: Yup.string(),
  // .required("required"),
  // .matches(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/, "Invalid state"),
  // .min(2, "Invalid state").max(2, "Invalid state"),
  newfacilitytaxid: Yup.string(),
  newfacilitycliaid: Yup.string(),
  newfacilitylocationproviderid: Yup.string(),
  siteId: Yup.string(),
  newfacilitybluecrossid: Yup.string(),
  blueshieldId: Yup.string(),
  locatorCode: Yup.string(),
  placeofservice: Yup.string(),
  Notes: Yup.string(),
  newfacilitymedicareid: Yup.string(),
  newfacilitymedicaidid: Yup.string(),
  newfacilityzipcode: Yup.string().min(5, "Invalid zipcode"),
  // .required("required"),
});
