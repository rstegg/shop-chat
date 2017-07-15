import React from 'react'
import { connect } from 'react-redux'

import { Modal, Button } from 'semantic-ui-react'

import AddBitcoinForm from './form'

import { closeAddBitcoin } from 'actions/bitcoin'
import { addStripeBitcoin } from 'actions/stripe'

const AddBitcoin = ({ user, bitcoin, closeAddBitcoin, addStripeBitcoin }) =>
  <Modal open={bitcoin.isOpen} style={{ textAlign: 'center' }}>
    <Modal.Header>Add Bitcoin</Modal.Header>
    <Modal.Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <AddBitcoinForm />
    </Modal.Content>
    <Modal.Actions>
      <Button color='black' onClick={closeAddBitcoin} content='Cancel' />
      <Button positive icon='checkmark' labelPosition='right' content='Add bitcoin'
        onClick={() => {
          addStripeBitcoin(bitcoin, user)
          closeAddBitcoin()
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
  closeAddBitcoin: () => dispatch(closeAddBitcoin()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBitcoin)
