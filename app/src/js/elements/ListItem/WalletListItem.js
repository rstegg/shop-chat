import React from 'react'
import { NavLink } from 'react-router-dom'

import { Header, Segment, Icon } from 'semantic-ui-react'

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

//TODO: route to wallet ID

const WalletListItem = ({className, onClick, wallet}) =>
  <NavLink to='/settings/wallet'>
    <Segment clearing>
      <Header floated='left'>
        {wallet.object === 'card' && renderCardType(wallet.brand)} ending in {wallet.last4}
      </Header>
      <Header floated='right'>
        {wallet.exp_month}/{wallet.exp_year}
      </Header>
    </Segment>
  </NavLink>

export default WalletListItem
