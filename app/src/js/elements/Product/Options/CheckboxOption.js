import React from 'react'
import { Form } from 'semantic-ui-react'

const CheckboxOption = ({ input: { value, onChange }, onSubmit, label, style }) =>
  <Form.Checkbox
    label={label}
    checked={!!value}
    style={style}
    onChange={(_,data) => {
      onChange(data.checked)
      if(onSubmit) {
        onSubmit(data.checked)
      }
    }} />

export default CheckboxOption
