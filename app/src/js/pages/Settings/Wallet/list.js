import React from 'react'

import WalletListItem from 'elements/ShopItem'
import { Feed } from 'semantic-ui-react'

const WalletList =
({
  wallet
}) =>
  <Feed>
    {wallet.length ? wallet.map((wallet, i) =>
      <WalletListItem key={`wallet-${i}`} wallet={wallet} />
    ) :
    <Feed.Event>
      <Feed.Label image='/images/productholder.png' />
      <Feed.Content content='Empty!' />
    </Feed.Event>
    }
  </Feed>

export default WalletList
