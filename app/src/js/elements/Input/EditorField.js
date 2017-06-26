import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import { Field } from 'redux-form'

import InputField from './InputField'
import onClickOutside from 'components/OnClickOutside'

class EditorField extends Component {
  handleClickOutside = evt => {
    this.props.onClickOutside()
  }
  render() {
    const { children, fieldComponent, normalize, onClick, isEditing, placeholder, label, name, type, style, onSubmit } = this.props
    if(isEditing) {
      return (
        <Field
          autoFocus
          component={fieldComponent || InputField}
          type={type || 'text'}
          label={label}
          placeholder={placeholder}
          name={name}
          normalize={normalize}
          onKeyUp={e => {
            if(e.keyCode === 13) {
              onSubmit(e.target.value)
            }}
          }
          onClick={v => onSubmit(v)}
          pointing='left'
          className='ignore-onclickoutside'
          style={style}
        />
      )
    }
    return (
      <div onClick={onClick} className='edit-field-container'>
        <div>
          {children}
        </div>
        <i className='fa fa-pencil'></i>
      </div>
    )
  }
}

export default onClickOutside(EditorField)
