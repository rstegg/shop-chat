import React from 'react'
import { Form, Label } from 'semantic-ui-react'

const CurrencyField = ({ input, meta: { touched, error }, label, placeholder }) =>
  <Form.Field>
    <label>{label}</label>
    <div className='ui left icon input'>
      <i className='dollar icon'></i>
      <input type='text' {...input} placeholder={placeholder} />
    </div>
    {touched && error && <Label basic color='red' pointing>{error}</Label>}
  </Form.Field>

export default CurrencyField
