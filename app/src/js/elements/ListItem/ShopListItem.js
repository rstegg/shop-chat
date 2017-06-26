import React from 'react'
import { NavLink } from 'react-router-dom'

import Card from 'elements/Card'

const ShopItem = ({className, onClick, shop}) =>
  <NavLink to={`/shop/${shop.slug}`}>
    <Card>
      <Card.Image src={shop.image || '/images/productholder.png'} />
      <Card.Title>{shop.name}</Card.Title>
      <Card.Content>
        {!!shop.description && <Card.Description>{shop.description}</Card.Description>}
      </Card.Content>
    </Card>
  </NavLink>

export default ShopItem
