import React from 'react'
import { NavLink } from 'react-router-dom'

import Card from 'elements/Card'

const ProductListItem = ({product}) =>
  <NavLink to={`/shop/${product.shop.slug}/product/${product.slug}`}>
    <Card>
      <Card.Image src={product.image || '/images/productholder.png'} />
      <Card.Title>{product.name}</Card.Title>
      <Card.Content>
        {!!product.description && <Card.Content>{product.description}</Card.Content>}
      </Card.Content>
    </Card>
  </NavLink>

export default ProductListItem
