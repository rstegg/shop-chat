import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Card } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

import WalletList from './list'

import { openAddCard } from 'actions/card'
import { openAddBank } from 'actions/bank'
import { fetchStripeCards } from 'actions/stripe'

class WalletSettings extends Component {
  componentWillMount() {
    const { fetchStripeCards, user } = this.props
    fetchStripeCards(user)
  }
  render() {
    const { user, card, openAddCard, openAddBank } = this.props
    if(!user.isAuthenticated) {
      return <Redirect to='/' />
    }
    return (
      <Card>
        <Card.Content>
          <Card.Header>Payment Options</Card.Header>
          <Card.Description>
            <WalletList
              wallet={card.list || []} //TODO: cards should be associated to user?
             />
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Button basic onClick={openAddCard}>Add a card</Button>
            <Button basic onClick={openAddBank}>Add a bank</Button>
          </div>
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = ({user, card}) =>
({
  user,
  card
})

const mapDispatchToProps = dispatch =>
({
  openAddBank: () => dispatch(openAddBank()),
  openAddCard: () => dispatch(openAddCard()),
  fetchStripeCards: user => dispatch(fetchStripeCards(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletSettings)
