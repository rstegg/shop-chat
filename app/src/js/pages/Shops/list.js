import React from 'react'

import ShopItem from '../../elements/ShopItem'
import { Feed } from 'semantic-ui-react'

const ShopsList =
({
  shops,
  setCurrentShop
}) =>
  <Feed>
    {shops.length ? shops.map((shop, i) =>
      <ShopItem key={`shop-${i}`} shop={shop} onClick={() => setCurrentShop(shop)} />
    ) :
    <Feed.Event>
      <Feed.Label image='/images/productholder.png' />
      <Feed.Content content='No Shops!' />
    </Feed.Event>
    }
  </Feed>

export default ShopsList
