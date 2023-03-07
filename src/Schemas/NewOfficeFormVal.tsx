import 'yup-phone-lite';
import * as Yup from 'yup';
export const NewOfficeFormVal = Yup.object({
  practicsOfficeName: Yup.string().required('required'),
  practicsOfficeSequence: Yup.string(),
  practicsOfficeNPI: Yup.string(),
  practicsOfficeAddress: Yup.string().required('required'),
  practiceOfficeCity: Yup.string().required('required'),
  practiceOfficeState: Yup.string().required('required'),
  practiceOfficeZip: Yup.string().required('required')
});
