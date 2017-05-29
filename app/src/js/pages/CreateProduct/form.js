import React from 'react'
import { connect } from 'react-redux'

import { Field, reduxForm } from 'redux-form'
import { Form, Label } from 'semantic-ui-react'

import { validate } from './validators'

import InputField from 'elements/InputField'
import AreaField from 'elements/AreaField'

const CheckboxField = ({ input: { value, onChange } }) =>
  <Form.Checkbox
    label='Public'
    toggle
    checked={!!value}
    onChange={(_,data) => onChange(data.checked)} />

const CurrencyField = ({ input: { value, onChange } }) =>
  <Form.Input labelPosition='left' type='text' placeholder='0.00'>
    <Label basic>$</Label>
    <input value={value} onChange={onChange} />
  </Form.Input>

const CreateProductForm = ({handleSubmit}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name='name' label='Name' placeholder='Product name' />
    <Field component={AreaField} name='description' label='Description' placeholder='Product descripton'  />
    <Field component={CurrencyField} name='price' />
    <Field component={CheckboxField} name='is_public' />
    <Form.Button type='submit' primary>Submit</Form.Button>
  </Form>

const connectedCreateProductForm = reduxForm({
  form: 'newProduct',
  validate
})(CreateProductForm)

const mapStateToProps = state =>
({
  initialValues: state.products.new
})

export default connect(mapStateToProps)(connectedCreateProductForm)
