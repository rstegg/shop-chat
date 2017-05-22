export const validate = values => {
  const errors = {}
  if (!values.product) {
    errors.product = 'Required'
  }
  if (!values.price) {
    errors.price = 'Required'
  }
  return errors
}
