import React from 'react'
import { Field } from 'redux-form'

import CheckboxField from 'elements/Input/CheckboxField'

const PublicField = ({ product, user, editProduct, style }) =>
  <Field
    component={CheckboxField}
    style={style}
    name='isPublic' label='Public'
    onSubmit={isPublic => editProduct({ ...product, isPublic }, user)} />

export default PublicField
