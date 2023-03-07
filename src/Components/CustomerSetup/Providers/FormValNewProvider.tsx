import * as Yup from "yup";
export const FormValNewProvider = Yup.object({
  // providerlastname: Yup.string()
  //   .uppercase()
  //   .max(25)
  //   .min(2, 'must be more than 2 characters')
  //   .matches(/^[aA-zZ\s]+$/, 'only letters allowed')
  //   .required('required'),
  // providerfirstname: Yup.string()
  //   .uppercase()
  //   .max(25)
  //   .min(2, 'must be more than 2 characters')
  //   .matches(/^[aA-zZ\s]+$/, 'only letters allowed')
  //   .required('required'),
  // providerOrgname: Yup.string()
  //   .uppercase()
  //   .max(25)
  //   .min(2, 'must be more than 2 characters')
  //   .matches(/^[aA-zZ\s]+$/, 'only letters allowed')
  //   .required('required'),
  providertaxonomySpeciality: Yup.string()
    .max(25)
    .min(2, "must be more than 2 characters"),
  // .matches(/^[aA-zZ\s]+$/, "only letters allowed"),
  // .required('required'),
  providerPractice: Yup.string()
    .max(25)
    .min(2, "must be more than 2 characters")
    .matches(/^[aA-zZ\s]+$/, "only letters allowed"),
  // .required("required"),
  providerssn: Yup.string(),
  // providermi: Yup.string()
  //   .required('required')
  //   .matches(/^[aA-zZ\s]+$/, ''),
  providernpi: Yup.string(),
  // .required('required'),
  providerhomephone: Yup.string().min(14, "invalid phone"),
  providercellphone: Yup.string().min(14, "invalid phone"),
  providerfax: Yup.string().min(14, "invalid phone"),
  providerpager: Yup.string().min(14, "invalid phone"),
  provideremail: Yup.string().email(),
  specialityLicense: Yup.string(),
  stateLicense: Yup.string(),
  anesthesiaLicense: Yup.string(),
  upin: Yup.string(),
  bluecross: Yup.string(),
  tricareChamp: Yup.string(),
});
