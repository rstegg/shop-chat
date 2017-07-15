import React from 'react'
import { Header } from 'semantic-ui-react'
import { pipe, path } from 'ramda'

import EditorField from 'elements/Input/EditorField'

const getFontRGB = path([ 'themes', 'font' ])
const toRGBStyle = rgba => rgba ? `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})` : 'rgba(0,0,0,1)'
const getFont = pipe(getFontRGB, toRGBStyle)

const DescriptionField = ({ isEditing, product, user, editProduct, editProductField }) =>
  <EditorField
    isEditing={isEditing}
    placeholder='Description' name='description'
    style={{ color: getFont(product) }}
    onClick={() => editProductField('description')} onClickOutside={() => editProductField(null)}
    onSubmit={description => editProduct({ ...product, description }, user)}>
    <Header as='h4' style={{ color: getFont(product) }}>{product.description || 'Add a description'}</Header>
  </EditorField>

export default DescriptionField
