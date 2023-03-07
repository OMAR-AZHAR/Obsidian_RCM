import 'yup-phone-lite';
import * as Yup from 'yup';
export const FormValNewClaim = Yup.object({
  claim_patient: Yup.string(),
  claim_renderingProvider: Yup.string(),
  claim_billingProvider: Yup.string(),
  claimReference: Yup.string(),
  claim_orderingProvider: Yup.string(),
  claim_ref_Provider: Yup.string(),
  claim_sales_rep: Yup.string(),
  claim_facility: Yup.string(),
  claim_location_select: Yup.string(),
  claim_primary_ins: Yup.string(),
  claim_secondary_ins: Yup.string(),
  claim_ternary_ins: Yup.string()
});
