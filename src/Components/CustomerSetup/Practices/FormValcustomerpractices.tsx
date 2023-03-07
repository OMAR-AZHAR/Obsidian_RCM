import * as Yup from "yup";
export const FormVal = Yup.object({
  // New Practice form validation
  practiceName: Yup.string()
    .uppercase()
    .max(60, "Must be 60 characters only")
    .min(2, "must be more than 2 characters")
    .matches(/^[aA-zZ\s]+$/, "only letters allowed"),
  // .required("required"),
  npi_code: Yup.string()

    .max(10, "10 digits only")
    .min(10, "10 digits only")
    .uppercase(),
  practiceTaxonomy: Yup.string()
    .length(10, "must be 10 digits")
    .max(10, "only 10 digits allowed"),
  // .required("required"),
  practiceSequence: Yup.string(),
  practiceReference: Yup.string(),
  practiceTCN: Yup.string().max(4),
  practiceCode: Yup.string().max(3),
  practicsAddress: Yup.string(),
  // .required("required"),
  practicsAddress2: Yup.string(),
  practiceCity: Yup.string(),
  // .required("required")
  // .max(28, "Enter Valid City")
  // .min(3, "Invalid city"),
  practiceState: Yup.string(),
  // .required("Invalid").min(2, "Invalid state"),
  practicZipCode: Yup.string().min(5, "Invalid zipcode"),
  // /.required("required"),
  // .matches(/^\d{5}(-\d{4})?$/, "Invalid Zip Code"),
  practicePhone: Yup.string(),
  // .required("required"),
  practiceFax: Yup.string(),
  practiceEmail: Yup.string().email("Enter valid email"),
  paytoAddressPractice: Yup.string(),
  // pay to address data
  practicePayToAddressAdd: Yup.string(),
  practicePayToAddressAdd2: Yup.string(),
  practicePayToAddressCity: Yup.string(),
  practicePayToAddressState: Yup.string().max(10, "Invalid state"),
  practicPayToAddressZipCode: Yup.string().min(5, "Invalid zipcode"),
  //   password: Yup.string().min(6).required("Please enter your password"),
  //   confirm_password: Yup.string()
  //     .required()
  //     .oneOf([Yup.ref("password"), null], "Password must match"),
  newPracticeNotes: Yup.string(),
  newpracticeOrgType: Yup.string(),

  // practicsOfficeName: Yup.string()
  //   .required("required")
  //   .min(3, "Invalid Office Name")
  //   .max(60, "Invalid office Name"),
  // practicsOfficeSequence: Yup.string().required("required"),
  // practicsOfficeNPI: Yup.string()
  //   .required("required")
  //   .max(10, "Invalid NPI")
  //   .min(10, "Invalid NPI"),
  // practicsOfficeAddress: Yup.string()
  //   .required("required")
  //   .min(2, "Invalid Address"),
  // practiceOfficecity: Yup.string(),
  // // required("required"),
  // practiceOfficestate: Yup.string(),
  // // required("required"),
  // practiceOfficeZip: Yup.string().required("required"),
});
