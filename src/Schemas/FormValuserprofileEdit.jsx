import * as Yup from "yup";
export const FormValuserprofileEdit = Yup.object({
  // User Management -> user profile validations
  //   username: Yup.string().min(3).max(25).required("required"),
  email: Yup.string().email().min(4, "Invalid email"),
  firstname: Yup.string()
    .max(20)
    .min(2, "must be more than 2 characters")
    .matches(/^[aA-zZ\s]+$/, "only letters allowed"),
  phone1: Yup.string(),
  title: Yup.string()
    .max(10)
    .min(2, "must be more than 2 characters")
    .matches(/^[aA-zZ\s]+$/, "only letters allowed"),
  phone2: Yup.string(),
  ext1: Yup.string()
    .matches(/^\d+$/, "only numbers allowed")
    .min(5, "5 digits")
    .max(5, "max 5 allowed"),
  ext2: Yup.string()
    .matches(/^\d+$/, "only numbers allowed")
    .min(5, "5 digits")
    .max(5, "max 5 allowed"),
  lastname: Yup.string()
    .max(20)
    .min(2, "must be more than 2 characters")
    .matches(/^[aA-zZ\s]+$/, "only letters allowed"),
  // user_email: Yup.string().user_email().required("Enter valid user_email"),
  userprofilemi: Yup.string().max(1, "Maximum 1").min(1, "Minimum 1"),
  user_type: Yup.string(),
  userprofilepic: Yup.mixed(),
});
