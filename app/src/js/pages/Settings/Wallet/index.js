import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Card } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

import WalletList from './list'

import { openAddCard } from 'actions/card'
import { openAddBitcoin } from 'actions/bitcoin'
import { fetchStripeCards, fetchStripeBitcoins } from 'actions/stripe'

class WalletSettings extends Component {
  componentWillMount() {
    const { fetchStripeCards, fetchStripeBitcoins, user } = this.props
    fetchStripeCards(user)
    fetchStripeBitcoins(user)
  }
  render() {
    const { user, card, bitcoin, openAddCard, openAddBitcoin } = this.props
    if (!user.isAuthenticated) {
      return <Redirect to='/' />
    }
    const cardList = card.list || []
    const bitcoinList = bitcoin.list || []
    const cardAndBitcoinList = cardList.concat(bitcoinList)
    return (
      <Card>
        <Card.Content>
          <Card.Header>Payment Options</Card.Header>
          <Card.Description>
            <WalletList
              wallet={cardAndBitcoinList} //TODO: cards should be associated to user?
             />
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Button basic onClick={openAddCard}>Add a card</Button>
            <Button basic onClick={openAddBitcoin}>Add bitcoin</Button>
          </div>
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = ({user, card, bitcoin}) =>
({
  user,
  card,
  bitcoin
})

const mapDispatchToProps = dispatch =>
({
  openAddBitcoin: () => dispatch(openAddBitcoin()),
  openAddCard: () => dispatch(openAddCard()),
  fetchStripeCards: user => dispatch(fetchStripeCards(user)),
  fetchStripeBitcoins: user => dispatch(fetchStripeBitcoins(user)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletSettings)
