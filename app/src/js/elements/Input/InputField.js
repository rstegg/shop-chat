import React from 'react'
import { Form, Label } from 'semantic-ui-react'

const InputField = ({ input, meta: { asyncValidating, touched, error }, className, style, onKeyUp, type, autoFocus, label, placeholder, pointing }) =>
  <Form.Field className={className} style={style}>
    <label>{label}</label>
    <div className={asyncValidating ? 'ui right icon input loading' : 'ui input'}>
      <input type={type || 'text'} {...input} style={style} onKeyUp={onKeyUp} autoFocus={autoFocus || false} placeholder={placeholder || label} />
      {asyncValidating && <i className='search icon'></i>}
    </div>
    {touched && error && <Label basic color='red' pointing={pointing || true}>{error}</Label>}
  </Form.Field>


export default InputField
