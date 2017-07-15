import React from 'react'
import { NavLink } from 'react-router-dom'

import { Card, Image } from 'semantic-ui-react'

const ShopItem = ({ shop }) =>
  <Card as={NavLink} to={`/shop/${shop.slug}`} style={{ maxWidth: '300px' }}>
    <Image src={shop.image || '/images/productholder.png'} alt={shop.name} />
    <Card.Content>
      <Card.Header>{shop.name}</Card.Header>
      {!!shop.description && <Card.Description>{shop.description}</Card.Description>}
    </Card.Content>
  </Card>

export default ShopItem
