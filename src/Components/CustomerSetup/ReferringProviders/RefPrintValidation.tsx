import { object, string } from "yup";
export const RefPrintValidation = object({
  RefNamebtwfirst: string().max(1, "invalid").ensure(),
  RefNamebtwlast: string().max(1, "invalid").ensure(),
  newrefprintzipcode: string()
    .min(5, " ")
    .matches(/^[a-zA-Z0-9_.-]*$/),
  // check_all: string().when(
  //   ["RefNamebtwfirst", "RefNamebtwlast", "newrefprintzipcode"],
  //   {
  //     is: (
  //       RefNamebtwfirst: any,
  //       RefNamebtwlast: any,
  //       newrefprintzipcode: any
  //     ) => !RefNamebtwfirst && !RefNamebtwlast && !newrefprintzipcode,
  //     then: string().required("Please provide at least one search criteria"),
  //     otherwise: string(),
  //   }
  // ),
});
