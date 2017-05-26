import React from 'react'
import { NavLink } from 'react-router-dom'

import { Feed, Header, Icon } from 'semantic-ui-react'

const renderCardType = type => {
  switch(type) {
    case 'Visa':
      return <Icon name='visa' />
    case 'MasterCard':
      return <Icon name='mastercard' />
    case 'American Express':
      return <Icon name='american express' />
    case 'Diners Club':
      return <Icon name='diners club' />
    case 'Discover':
      return <Icon name='discover' />
    case 'JCB':
      return <Icon name='japan credit bureau' />
    case 'Maestro':
    case 'UnionPay':
    default:
      return <Icon name='payment' />
  }
}

const WalletListItem = ({className, onClick, wallet}) =>
  <Feed.Event>
    <Feed.Label>
      {wallet.type === 'CreditCard' && renderCardType(wallet.cardType)}
    </Feed.Label>
    <Feed.Content>
      <Header>{wallet.description}</Header>
    </Feed.Content>
  </Feed.Event>

export default WalletListItem
