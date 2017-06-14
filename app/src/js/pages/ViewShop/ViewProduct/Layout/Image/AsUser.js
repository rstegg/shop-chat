import React from 'react'
import { Segment, Header, Image } from 'semantic-ui-react'
import { pipe, path } from 'ramda'

import ProductCartMenu from 'components/Product/Cart/Menu'
import ProductImageSegment from 'components/Product/Segment/ImageSegment'

const getPrimaryRGB = path(['themes', 'primary', 'rgb'])
const getSecondaryRGB = path(['themes', 'secondary', 'rgb'])
const getBackgroundRGB = path(['themes', 'background', 'rgb'])
const getFontRGB = path(['themes', 'font', 'rgb'])

const toRGBStyle = rgba => !!rgba ? `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})` : `rgba(255,255,255,1)`

const getPrimary = pipe(getPrimaryRGB, toRGBStyle)
const getSecondary = pipe(getSecondaryRGB, toRGBStyle)
const getBackground = pipe(getBackgroundRGB, toRGBStyle)
const getFont = pipe(getFontRGB, toRGBStyle)

const UserView = ({
  product,
  user,
}) =>
  <div className='ui segment product-container' style={{background: getBackground(product)}}>
    <Image src={product.image || '/images/productholder.png'} className='product-image-underlay' />
    <Segment basic style={{display: 'flex', width: '100%', pointerEvents: 'none', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
      <ProductImageSegment>
        <Header as='h1' style={{color: getFont(product)}}>{product.name}</Header>
      </ProductImageSegment>
      <ProductImageSegment>
        <Header as='h4' style={{color: getFont(product)}}>${product.price}</Header>
      </ProductImageSegment>
      {!!product.description && <ProductImageSegment>
        <Header as='h4' style={{color: getFont(product)}}>{product.description || 'No description'}</Header>
      </ProductImageSegment>}
    </Segment>
    <ProductCartMenu />
  </div>

export default UserView
