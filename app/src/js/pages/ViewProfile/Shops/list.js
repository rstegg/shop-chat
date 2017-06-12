import React from 'react'
import { length } from 'ramda'

import ShopItem from 'elements/ListItem/ShopListItem'
import { Card, Image } from 'semantic-ui-react'

const ShopsList =
({
  shops
}) =>
  <Card.Group itemsPerRow={4}>
    {length(shops) ? shops.map((shop, i) =>
      <ShopItem key={`shop-${i}`} shop={shop} />
    ) :
      <Card>
        <Image src='/images/productholder.png' />
        <Card.Content>No Shops!</Card.Content>
      </Card>
    }
  </Card.Group>
export default ShopsList
