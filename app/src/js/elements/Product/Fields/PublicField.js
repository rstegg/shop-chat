import React from 'react'
import { Field } from 'redux-form'

import CheckboxField from 'elements/Input/CheckboxField'

const PublicField = ({product, user, editProduct, style}) =>
  <Field
    component={CheckboxField} 
    style={style}
    name='is_public' label='Public'
    onSubmit={is_public => editProduct({...product, is_public}, user)} />

export default PublicField
