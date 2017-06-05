import React from 'react'
import { Form } from 'semantic-ui-react'

const CheckboxField = ({ input: { value, onChange }, onSubmit, label }) =>
  <Form.Checkbox
    label={label}
    toggle
    checked={!!value}
    onChange={(_,data) => {
      onChange(data.checked)
      if(onSubmit) {
        onSubmit(data.checked)
      }
    }} />

export default CheckboxField
