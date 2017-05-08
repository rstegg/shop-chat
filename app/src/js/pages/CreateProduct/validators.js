export const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.product_type) {
    errors.product_type = 'Required'
  }
  if (values.product_type === 'fixed' && !values.amount) {
    errors.amount = 'Required'
  }
  return errors
}
