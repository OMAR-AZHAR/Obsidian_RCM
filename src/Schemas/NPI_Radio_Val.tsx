import 'yup-phone-lite';
import * as Yup from 'yup';
export const NPI_Radio_Val = Yup.object({
  NPIzipcode: Yup.string().matches(/^\d{5}(-\d{4})?$/, 'Invalid Zip Code'),
  // User Management -> user profile validations
  NPItaxonomyname: Yup.string(),
  NPIorganizationname: Yup.string(),
  NPIfirstname: Yup.string(),
  NPIlastname: Yup.string(),
  NPIcity: Yup.string(),
  NPIstate: Yup.string()
});
