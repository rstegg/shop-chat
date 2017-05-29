import React from 'react'
import { length } from 'ramda'

import WalletListItem from 'elements/WalletListItem'
import { Feed } from 'semantic-ui-react'

const WalletList =
({
  wallet
}) =>
  <Feed>
    {length(wallet) ? wallet.map((wallet, i) =>
      <WalletListItem key={`wallet-${i}`} wallet={wallet} />
    ) :
    <Feed.Event>
      <Feed.Label image='/images/productholder.png' />
      <Feed.Content content='Empty!' />
    </Feed.Event>
    }
  </Feed>

export default WalletList
