import React, { Component } from 'react'
import { Form, Label } from 'semantic-ui-react'

class InputField extends Component {
  render() {
    const { input, meta: { asyncValidating, touched, error }, className, style, onKeyUp, type, autoFocus, label, placeholder, pointing } = this.props
    return (
      <div className='field' style={style}>
        <label className='label'>{label}</label>
        <div className={asyncValidating ? 'control is-loading' : 'control'}>
          <input className='input' type={type || 'text'} {...input} style={style} onKeyUp={onKeyUp} autoFocus={autoFocus || false} placeholder={placeholder || label} />
        </div>
        {touched && error && <Label basic color='red' pointing={pointing || true}>{error}</Label>}
      </div>
    )
  }
}


export default InputField
