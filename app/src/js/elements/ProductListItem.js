import React from 'react'
import { NavLink } from 'react-router-dom'

import { Feed, Header } from 'semantic-ui-react'

const ProductListItem = ({onClick, shopId, product}) =>
  <Feed.Event as={NavLink} to={`/shop/${product.shop.slug}/product/${product.slug}`}>
    <Feed.Label>
      <img src={product.image || '/images/productholder.png'} alt={product.name} />
    </Feed.Label>
    <Feed.Content>
      <Header>{product.name}</Header>
    </Feed.Content>
  </Feed.Event>

export default ProductListItem
