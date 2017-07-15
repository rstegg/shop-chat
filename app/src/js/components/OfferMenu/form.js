import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form, Label, Divider } from 'semantic-ui-react'
import { length } from 'ramda'

import { validate } from './validators'

const createOptions = products =>
  products
    .map(product => ({ key: product.id, value: product.id, text: product.name, image: product.image || '/images/productholder.png' }) )

const SelectField = ({ input: { value, onChange }, meta: { touched, error }, label, placeholder, options }) =>
  <Form.Field>
    <Form.Select
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={(_,data) => onChange(data.value)}
      options={options} />
    {touched && error && <Label basic color='red' pointing='left' floating style={{ top: '28px' }}>{error}</Label>}
  </Form.Field>

const CurrencyField = ({ input, meta: { touched, error } }) =>
  <Form.Field>
    <Form.Input labelPosition='left' type='text' placeholder='0.00'>
      <Label basic>$</Label>
      <input {...input} />
    </Form.Input>
    {touched && error && <Label basic color='red' pointing='left' floating  style={{ top: '45%' }}>{error}</Label>}
  </Form.Field>

const SocialMenuForm = ({ handleSubmit, products }) =>
  <Form onSubmit={handleSubmit}>
    {length(products) && <Field component={SelectField} name='productId' label='Product' placeholder='Product' options={createOptions(products)} />}
    <Field component={CurrencyField} name='price' />
    <Divider />
    <Form.Button fluid type='submit' positive>Send offer</Form.Button>
  </Form>

export default reduxForm({
  form: 'shopOffer',
  validate
})(SocialMenuForm)
