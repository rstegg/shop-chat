import React from 'react'
import { connect } from 'react-redux'

import { Field, reduxForm } from 'redux-form'

import { validate } from './validators'

import InputField from 'elements/InputField'

import { Form } from 'semantic-ui-react'

const CheckboxField = ({ input: { value, onChange } }) =>
  <Form.Checkbox
    label='Public'
    toggle
    checked={!!value}
    onChange={(_,data) => onChange(data.checked)} />

const CreateShopForm = ({handleSubmit}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name='name' type='text' label='Shop name' placeholder='Name' />
    <Field component={CheckboxField} name='is_public' />
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
