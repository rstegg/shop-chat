import React from 'react'
import { connect } from 'react-redux'
import { Button, Card } from 'semantic-ui-react'

import SettingsLayout from 'components/layouts/Settings'

import WalletList from './list'

import { openAddCard } from 'actions/card'

const WalletSettings = ({user, openAddCard}) =>
  <SettingsLayout>
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
  </SettingsLayout>

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
