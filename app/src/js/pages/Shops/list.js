import React from 'react'
import { length } from 'ramda'

import ShopItem from 'elements/ListItem/ShopListItem'
import Card from 'elements/Card'

const ShopsList =
({
  shops
}) =>
  <div className='columns'>
    {length(shops) ? shops.map((shop, i) =>
      <div className='column is-4'>
        <ShopItem key={`shop-${i}`} shop={shop} />
      </div>
    ) :
      <Card>
        <Card.Image src='/images/productholder.png' />
        <Card.Content>No Shops!</Card.Content>
      </Card>
    }
  </div>
export default ShopsList
