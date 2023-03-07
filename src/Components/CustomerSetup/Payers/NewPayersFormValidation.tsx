import * as Yup from "yup";
export const NewPayersFormValidation = Yup.object({
  newpayername: Yup.string()
    .max(60, "Not more than 60 characters")
    .min(2, "must be more than 2 characters"),

  newpayerplanname: Yup.string()
    .max(60, "Not more than 60 characters")
    .min(2, "must be more than 2 characters"),
  newpayeremail: Yup.string().email("Enter valid email"),
  newpayercity: Yup.string()
    // .required("required")
    .max(28, "Enter valid city")
    .min(3, "Invalid city"),
  newpayerphone: Yup.string().min(14, "invalid phone"),
  newfacilitynpi: Yup.string()
    .max(10, "10 digits only")
    .min(10, "10 digits only"),
  newfacilitytaxonomySpeciality: Yup.string()
    .max(10, "10 digits only")
    .min(10, "10 digits only"),
  newpayerfax: Yup.string().min(14, "invalid fax"),
  newpayersequence: Yup.string(),
  newpayerreference: Yup.string(),
  // Contact Info
  newpayeraddress: Yup.string(),
  // .required("required").min(4, "Invalid address"),
  newpayeraddress2: Yup.string().min(4, "Invalid address"),
  newpayerstate: Yup.string()
    // .required('required')
    .min(2, "Invalid state"),
  newpayerzipcode: Yup.string(),
  // .required("required")
  // .matches(/^\d{5}(-\d{4})?$/, "Invalid Zip Code"),
  newpayerwebsite: Yup.string(),
  // ID Numbers
  newpayergroupnumber: Yup.string(),
  newpayerclaimoffice: Yup.string(),
  newpayerID_medigap: Yup.string(),
  newpayerocna: Yup.string(),
  // Alternate Practice Info
  newpayeraltpractname: Yup.string()
    .max(60, "Not more than 60 characters")
    .min(2, "must be more than 2 characters"),
  newpayeraltpractaddress: Yup.string().min(4, "invalid address"),
  newpayeraltpractaddress2: Yup.string().min(4, "invalid address"),
  newpayeraltpractcity: Yup.string()
    .max(28, "Enter valid city")
    .min(3, "Invalid city"),
  newpayeraltpractstate: Yup.string().min(2, "Invalid state"),
  newpayeraltpractzipcode: Yup.string(),
  // .matches(
  //   /^\d{5}(-\d{4})?$/,
  //   "Invalid Zip Code"
  // ),?
  newpayeraltpracttaxid: Yup.string(),
  newpayeraltpractnpi: Yup.string()
    .max(10, "10 digits only")
    .min(10, "10 digits only"),
  newpayeraltpracttaxonomySpeciality: Yup.string()
    .max(10, "10 digits only")
    .min(10, "10 digits only"),
  // Clearinghouse master payer search
  masterpayersearch: Yup.string()
    .max(60, "Not more than 60 characters")
    .min(2, "must be more than 2 characters"),
  masterpayersearchpayerid: Yup.string(),
});
