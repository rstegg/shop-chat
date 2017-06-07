import React from 'react'
import { NavLink } from 'react-router-dom'

import { Card, Image } from 'semantic-ui-react'

const ShopItem = ({className, onClick, shop}) =>
  <Card as={NavLink} to={`/shop/${shop.slug}`}>
    <Image src={shop.image || '/images/productholder.png'} alt={shop.name} />
    <Card.Content>
      <Card.Header>{shop.name}</Card.Header>
    </Card.Content>
  </Card>

export default ShopItem
