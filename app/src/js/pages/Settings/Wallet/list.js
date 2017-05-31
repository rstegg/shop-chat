import React from 'react'
import { length } from 'ramda'

import WalletListItem from 'elements/WalletListItem'
import { Segment } from 'semantic-ui-react'

const WalletList =
({
  wallet
}) =>
  <Segment.Group>
    {length(wallet) ? wallet.map((wallet, i) =>
      <WalletListItem key={`wallet-${i}`} wallet={wallet} />
    ) :
    <Segment.Group>
      <Segment image='/images/productholder.png' />
      <Segment content='Empty!' />
    </Segment.Group>
    }
  </Segment.Group>

export default WalletList
