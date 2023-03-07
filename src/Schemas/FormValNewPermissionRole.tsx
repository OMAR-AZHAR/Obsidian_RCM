import * as Yup from "yup";
export const FormValNewPermissionRole = Yup.object({
  rolename: Yup.string()
    .uppercase()
    .max(25)
    .min(2, "must be more than 2 characters")
    .matches(/^[aA-zZ\s]+$/, "only letters allowed")
    .required("required"),
});
