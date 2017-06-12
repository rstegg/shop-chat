import React from 'react'
import { Header } from 'semantic-ui-react'
import { pipe, path, length } from 'ramda'

import EditorField from 'elements/Input/EditorField'

import normalizePrice from 'utils/normalizers/price'

const getFontRGB = path(['themes', 'font', 'rgb'])
const toRGBStyle = rgba => !!rgba ? `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})` : `rgba(0,0,0,1)`
const getFont = pipe(getFontRGB, toRGBStyle)

const PriceField = ({isEditing, product, user, editProduct, editProductField}) =>
  <EditorField
    isEditing={isEditing}
    placeholder='Price' name='price'
    style={{color: getFont(product)}}
    normalize={normalizePrice}
    onClick={() => editProductField('price')} onClickOutside={() => editProductField(null)}
    onSubmit={price => {
      if(length(price)) {
        editProduct({...product, price}, user)
      }
    }}>
    <Header as='h4' style={{color: getFont(product)}}>${product.price}</Header>
  </EditorField>

export default PriceField
