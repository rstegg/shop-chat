import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { Form, Divider } from 'semantic-ui-react'

import InputField from 'elements/InputField'

import { validate, asyncValidate } from './validators'

const SettingsForm = ({handleSubmit, submitting}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name="name" type="text" label='Name *' placeholder='Username' />
    <Field component={InputField} name="email" type="text" label='Email *' placeholder='Email' />
    <Field component={InputField} name="username" type="text" label='Username *' placeholder='Username' />
    <Field component={InputField} name="old_password" type="password" label='Old Password *' placeholder='' />
    <Field component={InputField} name="new_password" type="password" label='New Password' placeholder='' />
    * required
    <br />
    * changing your email will require verification
    <Divider />
    <Form.Button loading={submitting} type="submit" primary>Save</Form.Button>
  </Form>

const ConnectedSettingsForm = reduxForm({
  form: 'accountSettings'
  validate,
  asyncValidate,
  asyncBlurFields: ['username', 'email']
})(SettingsForm)

const mapStateToProps = ({user}) =>
({
  initialValues: user
})

export default connect(mapStateToProps)(ConnectedSettingsForm)
