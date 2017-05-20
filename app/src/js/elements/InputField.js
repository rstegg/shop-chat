import React, { Component } from 'react'
import { Form, Label } from 'semantic-ui-react'

class InputField extends Component {
  render() {
  const { input, meta: { asyncValidating, touched, error }, onKeyUp, type, autoFocus, label, placeholder } = this.props
  return (
    <Form.Field>
      <label>{label}</label>
      <div className={asyncValidating ? 'ui right icon input loading' : 'ui input'}>
        <input type={type || 'text'} {...input} onKeyUp={onKeyUp} autoFocus={autoFocus || false} placeholder={placeholder || label} />
        {asyncValidating && <i className='search icon'></i>}
      </div>
      {touched && error && <Label basic color='red' pointing>{error}</Label>}
    </Form.Field>
    )
  }
}


export default InputField
