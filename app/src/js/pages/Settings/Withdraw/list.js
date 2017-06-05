import React from 'react'
import { length } from 'ramda'

import WalletListItem from 'elements/ListItem/WalletListItem'
import { Segment, Header, Icon } from 'semantic-ui-react'

const WalletList =
({
  wallet
}) =>
  <Segment.Group>
    {length(wallet) ? wallet.map((wallet, i) =>
      <WalletListItem key={`wallet-${i}`} wallet={wallet} />
    ) :
      <div>
        <Header icon textAlign='center'>
          <Icon name='meh' />
          <Header.Content>
            Empty!
          </Header.Content>
        </Header>
      </div>
    }
  </Segment.Group>

export default WalletList
