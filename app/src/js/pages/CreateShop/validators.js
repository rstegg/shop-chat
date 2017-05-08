export const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.description) {
    errors.description = 'Required'
  }
  if (!values.shop_type) {
    errors.shop_type = 'Required'
  }
  if (values.shop_type === 'other' && !values.topic) {
    errors.topic = 'Required'
  }
  if (values.topic === 'topic' && !values.topic_other) {
    errors.topic_other = 'Required'
  }
  return errors
}
