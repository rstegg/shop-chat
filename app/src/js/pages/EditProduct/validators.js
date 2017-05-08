export const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.shop_type) {
    errors.shop_type = 'Required'
  }
  if (values.shop_type === 'fixed' && !values.amount) {
    errors.amount = 'Required'
  }
  return errors
}
