import React from 'react'
import { Form, Label } from 'semantic-ui-react'

const DropdownOption = ({ input: { value, onChange }, meta: { asyncValidating, touched, error }, label, onSubmit, placeholder, options }) =>
  <Form.Field>
    <Form.Select
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={(_,data) => {
        onChange(data.value)
        if(onSubmit) {
          onSubmit(data.value)
        }
      }}
      options={options} />
    {touched && error && <Label basic color='red' pointing>{error}</Label>}
  </Form.Field>

export default DropdownOption
