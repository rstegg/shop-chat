import React from 'react'

import { Field, reduxForm } from 'redux-form'
import { Form, Button } from 'semantic-ui-react'
import InputField from 'elements/InputField'

import OfferMenu from './OfferMenu'

const ShopChatForm = ({handleSubmit, resetForm, roomType}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} label='Message' name='text' placeholder='Type a chat message' />
    <Button.Group fluid>
      <Button type='submit' primary>Send</Button>
      {roomType === 'shop' && <OfferMenu />}
    </Button.Group>
  </Form>

export default reduxForm({
  form: 'sendRoomChatMessage'
})(ShopChatForm)
