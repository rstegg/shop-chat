import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Form } from 'semantic-ui-react'

import InputField from 'elements/Input/InputField'
import CheckboxField from 'elements/Input/CheckboxField'

import { validate } from './validators'

const CreateShopForm = ({handleSubmit}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name='name' type='text' label='Shop name' placeholder='Name' />
    <Field component={CheckboxField} name='isPublic' label='Public' />
    <Form.Button type='submit' primary>Create</Form.Button>
  </Form>

const ConnectedCreateShopForm = reduxForm({
  form: 'newShop',
  validate
})(CreateShopForm)

const mapStateToProps = ({shops}) =>
({
  initialValues: shops.new
})

export default connect(mapStateToProps)(ConnectedCreateShopForm)
