import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { Form, Dropdown, Label, Divider } from 'semantic-ui-react'

import countries from './countries'

import InputField from 'elements/Input/InputField'

import { validate } from './validators'

const DropdownField = ({ input: { value, onChange }, meta: { touched, error }, label, onSubmit, placeholder, options }) =>
  <Form.Field>
    <Dropdown
      label={label}
      placeholder={placeholder}
      search
      selection
      value={value}
      onChange={(_,data) => {
        onChange(data.value)
        if (onSubmit) {
          onSubmit(data.value)
        }
      }}
      options={options} />
    {touched && error && <Label basic color='red' pointing>{error}</Label>}
  </Form.Field>

const AddressForm = ({ handleSubmit, submitting }) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name='name' type='text' label='Full Name' placeholder='' />
    <Field component={InputField} name='line1' type='text' label='Address' placeholder='Street and number, P.O. box, c/o.' />
    <Field component={InputField} name='line2' type='text' placeholder='Apartment, suite, unit, building, floor, etc.' />
    <Field component={InputField} name='city' type='text' label='City' placeholder='' />
    <Field component={InputField} name='region' type='text' label='State/Province/Region' placeholder='' />
    <Field component={DropdownField} name='country' label='Country' options={countries} />
    <Field component={InputField} name='zip' type='text' label='Zip' placeholder='' />
    <Divider />
    <Form.Button loading={submitting} type='submit' primary>Save</Form.Button>
  </Form>

const ConnectedAddressForm = reduxForm({
  form: 'addressSettings',
  validate
})(AddressForm)

const mapStateToProps = ({ user }) =>
({
  initialValues: user.address
})

export default connect(mapStateToProps)(ConnectedAddressForm)
