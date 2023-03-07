import * as Yup from "yup";
export const FormValNewReferring = Yup.object({
  // Organization Name
  newreforganizationName: Yup.string(),
  // .required("required"),
  // Last Name
  referring_lastname: Yup.string(),
  // .required('*required'),
  // First Name
  referring_firstname: Yup.string(),
  // .required('*required'),
  // MI
  referring_mi: Yup.string(),
  // Credentials
  referring_credentials: Yup.string(),
  newreferringemail: Yup.string(),
  newreferringcity: Yup.string(),

  // Phone
  newreferringphone: Yup.string().min(14, "invalid phone"),
  // Home Phone
  newreferringhomephone: Yup.string().min(14, "invalid phone"),
  // Cell Phone
  newreferringcellphone: Yup.string().min(14, "invalid phone"),
  // Fax
  newreferringfax: Yup.string().min(14, "invalid phone"),
  // Pager
  newreferringpager: Yup.string().min(14, "invalid phone"),
  newreferringnpi: Yup.string(),
  newreferringtaxonomySpeciality: Yup.string(),
  referringsequence: Yup.string(),
  referringreference: Yup.string(),
  referringaddress: Yup.string(),
  referringaddress2: Yup.string(),
  newreferringstate: Yup.string(),
  // .required('*required')
  // .matches(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/, 'Invalid state'),
  // .min(2, "Invalid state").max(2, "Invalid state"),
  newreferringtaxid: Yup.string(),
  newrefbcbsid: Yup.string(),
  newreferringlocationupin: Yup.string(),
  newreferringchampusid: Yup.string(),
  newreferringspeclicense: Yup.string(),
  newrefstatelic: Yup.string(),
  newrefmarketer: Yup.string(),
  newrefanesthesialic: Yup.string(),
  placeofservice: Yup.string(),
  Notes: Yup.string(),
  newreferringmedicareid: Yup.string(),
  newreferringmedicaidid: Yup.string(),
  // Zip Code
  newreferringzipcode: Yup.string(),
  // .matches(/^\d{5}(-\d{4})?$/, 'Invalid Zip Code')
});
