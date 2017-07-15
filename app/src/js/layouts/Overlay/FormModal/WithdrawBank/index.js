import React from 'react'
import { connect } from 'react-redux'

import { Modal, Button } from 'semantic-ui-react'

import AddBankForm from './form'

import { closeWithdrawBank } from 'actions/bank'
import { addStripeBank } from 'actions/stripe'

const AddBank = ({ user, bank, closeWithdrawBank, addStripeBank }) =>
  <Modal open={bank.isWithdrawOpen} style={{ textAlign: 'center' }}>
    <Modal.Header>Add Bank</Modal.Header>
    <Modal.Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <AddBankForm />
    </Modal.Content>
    <Modal.Actions>
      <Button color='black' onClick={closeWithdrawBank} content='Cancel' />
      <Button positive icon='checkmark' labelPosition='right' content='Add bank'
        onClick={() => {
          addStripeBank(bank, user)
          closeWithdrawBank()
        }} />
    </Modal.Actions>
  </Modal>

const mapStateToProps = ({ user, bank }) =>
({
  user,
  bank
})

const mapDispatchToProps = dispatch =>
({
  addStripeBank: (bank, user) => dispatch(addStripeBank(bank, user)),
  closeWithdrawBank: () => dispatch(closeWithdrawBank()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBank)
