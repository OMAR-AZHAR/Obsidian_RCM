import * as Yup from 'yup';

export const ModalValidation = Yup.object({
  customer_name: Yup.string().required('*required').max(60, '*max 60 characters allowed').min(4, '*min 4 characters'),
});
