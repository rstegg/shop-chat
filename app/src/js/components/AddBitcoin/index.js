import React from 'react'
import { connect } from 'react-redux'

import { Modal, Button } from 'semantic-ui-react'

import AddBankForm from './form'

import { closeAddBank } from 'actions/bank'
import { addStripeBank } from 'actions/stripe'

const AddBank = ({user, bank, closeAddBank, addStripeBank}) =>
  <Modal open={bank.isOpen} style={{textAlign: 'center'}}>
    <Modal.Header>Add Bank</Modal.Header>
    <Modal.Content style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <AddBankForm />
    </Modal.Content>
    <Modal.Actions>
      <Button color='black' onClick={closeAddBank} content='Cancel' />
      <Button positive icon='checkmark' labelPosition='right' content='Add bank'
        onClick={() => {
          addStripeBank(bank, user)
          closeAddBank()
        }} />
    </Modal.Actions>
  </Modal>

const mapStateToProps = ({user, bank, form}) =>
({
  user,
  bank
})

const mapDispatchToProps = dispatch =>
({
  addStripeBank: (bank, user) => dispatch(addStripeBank(bank, user)),
  closeAddBank: () => dispatch(closeAddBank()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBank)
