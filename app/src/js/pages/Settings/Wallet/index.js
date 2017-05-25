import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Card } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

import WalletList from './list'

import { openAddCard } from 'actions/card'

class WalletSettings extends Component {
  render() {
    const { user, openAddCard } = this.props
    if(!user.isAuthenticated) {
      return <Redirect to='/' />
    }
    return (
      <Card>
        <Card.Content>
          <Card.Header>Payment Options</Card.Header>
          <Card.Description>
            <WalletList
              wallet={user.wallet || []} //TODO: PLACEHOLDER
             />
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button basic onClick={openAddCard}>Add a card</Button>
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = ({user}) =>
({
  user
})

const mapDispatchToProps = dispatch =>
({
  openAddCard: () => dispatch(openAddCard())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletSettings)
