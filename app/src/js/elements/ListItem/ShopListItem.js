import React from 'react'
import { NavLink } from 'react-router-dom'

import { Feed, Header } from 'semantic-ui-react'

const ShopItem = ({className, onClick, shop}) =>
  <Feed.Event as={NavLink} to={`/shop/${shop.slug}`}>
    <Feed.Label>
      <img src={shop.image || '/images/productholder.png'} alt={shop.name} />
    </Feed.Label>
    <Feed.Content>
      <Header>{shop.name}</Header>
    </Feed.Content>
  </Feed.Event>

export default ShopItem
