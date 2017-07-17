import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Card } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

import WithdrawList from './list'

import { openWithdrawBank } from 'actions/bank'
import { openWithdrawBitcoin } from 'actions/bitcoin'
import { fetchStripeBanks, fetchStripeBitcoins } from 'actions/stripe'

class WithdrawSettings extends Component {
  componentWillMount() {
    const { fetchStripeBanks, fetchStripeBitcoins, user } = this.props
    fetchStripeBanks(user)
    fetchStripeBitcoins(user)
  }
  render() {
    const { user, bank, openWithdrawBank, openWithdrawBitcoin } = this.props
    if (!user.isAuthenticated) {
      return <Redirect to='/' />
    }
    return (
      <Card>
        <Card.Content>
          <Card.Header>Withdraw Options</Card.Header>
          <Card.Description>
            <WithdrawList
              wallet={bank.list || []} //TODO: banks should be associated to user?
             />
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button basic onClick={openWithdrawBank}>Add a bank</Button>
            <Button basic onClick={openWithdrawBitcoin}>Add bitcoin</Button>
          </div>
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = ({ user, bank, bitcoin }) =>
({
  user,
  bank,
  bitcoin
})

const mapDispatchToProps = dispatch =>
({
  openWithdrawBank: () => dispatch(openWithdrawBank()),
  openWithdrawBitcoin: () => dispatch(openWithdrawBitcoin()),
  fetchStripeBanks: user => dispatch(fetchStripeBanks(user)),
  fetchStripeBitcoins: user => dispatch(fetchStripeBitcoins(user)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithdrawSettings)
