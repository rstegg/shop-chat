import React from 'react'
import { length } from 'ramda'

import ShopItem from 'elements/ListItem/ShopListItem'
import { Feed } from 'semantic-ui-react'

const ShopsList =
({
  shops
}) =>
  <Feed>
    {length(shops) ? shops.map((shop, i) =>
      <ShopItem key={`shop-${i}`} shop={shop} />
    ) :
    <Feed.Event>
      <Feed.Label image='/images/productholder.png' />
      <Feed.Content content='No Shops!' />
    </Feed.Event>
    }
  </Feed>

export default ShopsList
