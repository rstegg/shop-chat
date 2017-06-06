import React from 'react'
import { NavLink } from 'react-router-dom'

import { Card, Image } from 'semantic-ui-react'

const ProductListItem = ({onClick, shopId, product}) =>
  <Card as={NavLink} to={`/shop/${product.shop.slug}/product/${product.slug}`}>
    <Image src={product.image || '/images/productholder.png'} />
    <Card.Content>
      <Card.Header>{product.name}</Card.Header>
    </Card.Content>
  </Card>

export default ProductListItem
