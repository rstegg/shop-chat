import React from 'react'
import { Header } from 'semantic-ui-react'
import { pipe, path, length } from 'ramda'

import EditorField from 'elements/Input/EditorField'

const getFontRGB = path([ 'themes', 'font' ])
const toRGBStyle = rgba => rgba ? `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})` : 'rgba(0,0,0,1)'
const getFont = pipe(getFontRGB, toRGBStyle)

const NameField = ({ product, user, editProduct, editProductField }) =>
  <EditorField
    isEditing={product.focused === 'name'}
    placeholder='Name' name='name'
    style={{ color: getFont(product) }}
    onClick={() => editProductField('name')} onClickOutside={() => editProductField(null)}
    onSubmit={name => {
      if (length(name)) {
        editProduct({ ...product, name }, user)
      }
    }}>
    <Header as='h1' style={{ color: getFont(product) }}>{product.name}</Header>
  </EditorField>

export default NameField
