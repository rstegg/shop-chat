import React from 'react'
import { Field } from 'redux-form'

import InputField from './InputField'

const EditorField = ({children, fieldComponent, onClick, isEditing, placeholder, label, name, value, type, onSubmit}) =>
  isEditing ?
    <Field
      component={fieldComponent || InputField}
      type={type || 'text'}
      label={label}
      placeholder={placeholder}
      name={name}
      onKeyUp={e => {
        if(e.keyCode === 13) {
          onSubmit(e.target.value)
        }}
      }
      onClick={v => onSubmit(v)}
      />
  :
    <div onClick={onClick}>
      {children}
    </div>

export default EditorField
