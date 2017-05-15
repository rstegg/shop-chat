import React from 'react'

import { Field, reduxForm } from 'redux-form'
import { Form } from 'semantic-ui-react'
import InputField from 'elements/InputField'

const ShopChatForm = ({handleSubmit, resetForm}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} label='Message' name='text' placeholder='Type a chat message' />
    <Form.Button type='submit' primary>Send</Form.Button>
  </Form>

export default reduxForm({
  form: 'sendRoomChatMessage'
})(ShopChatForm)
