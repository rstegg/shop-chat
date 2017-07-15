import React from 'react'
import { connect } from 'react-redux'

import { Modal, Button } from 'semantic-ui-react'

import WithdrawBitcoinForm from './form'

import { closeWithdrawBitcoin } from 'actions/bitcoin'
import { addStripeBitcoin } from 'actions/stripe'

const WithdrawBitcoin = ({ user, bitcoin, closeWithdrawBitcoin, addStripeBitcoin }) =>
  <Modal open={bitcoin.isWithdrawOpen} style={{ textAlign: 'center' }}>
    <Modal.Header>Bitcoin Address</Modal.Header>
    <Modal.Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <WithdrawBitcoinForm />
    </Modal.Content>
    <Modal.Actions>
      <Button color='black' onClick={closeWithdrawBitcoin} content='Cancel' />
      <Button positive icon='checkmark' labelPosition='right' content='Add address'
        onClick={() => {
          addStripeBitcoin(bitcoin, user)
          closeWithdrawBitcoin()
        }} />
    </Modal.Actions>
  </Modal>

const mapStateToProps = ({ user, bitcoin }) =>
({
  user,
  bitcoin
})

const mapDispatchToProps = dispatch =>
({
  addStripeBitcoin: (bitcoin, user) => dispatch(addStripeBitcoin(bitcoin, user)),
  closeWithdrawBitcoin: () => dispatch(closeWithdrawBitcoin()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithdrawBitcoin)
