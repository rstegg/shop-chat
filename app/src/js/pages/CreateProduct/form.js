import React from 'react'
import { connect } from 'react-redux'

import { Field, reduxForm } from 'redux-form'
import { Form, Label } from 'semantic-ui-react'

import { validate } from './validators'
import { normalizePrice } from './normalize'

import InputField from 'elements/InputField'
import AreaField from 'elements/AreaField'
import CurrencyField from 'elements/CurrencyField'
import CheckboxField from 'elements/CheckboxField'

const CreateProductForm = ({handleSubmit}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name='name' label='Name' placeholder='Product name' />
    <Field component={AreaField} name='description' label='Description' placeholder='Product descripton'  />
    <Field component={CurrencyField} name='price' label='Base price' placeholder='0.00' normalize={normalizePrice} />
    <Field component={CheckboxField} name='is_public' label='Public' />
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
