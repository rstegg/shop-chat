import React from 'react'
import { connect } from 'react-redux'

import { Modal, Button } from 'semantic-ui-react'

import AddCreditCardForm from './form'

import { closeAddCard } from 'actions/card'
import { addStripeCard } from 'actions/stripe'

const AddCreditCard = ({ user, card, closeAddCard, addStripeCard }) =>
  <Modal open={card.isOpen} style={{ textAlign: 'center' }}>
    <Modal.Header>Add a Card</Modal.Header>
    <Modal.Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <AddCreditCardForm />
    </Modal.Content>
    <Modal.Actions>
      <Button color='black' onClick={closeAddCard} content='Cancel' />
      <Button positive icon='checkmark' labelPosition='right' content='Add card'
        onClick={() => {
          addStripeCard(card, user)
          closeAddCard()
        }} />
    </Modal.Actions>
  </Modal>

const mapStateToProps = ({ user, card }) =>
({
  user,
  card
})

const mapDispatchToProps = dispatch =>
({
  addStripeCard: (card, user) => dispatch(addStripeCard(card, user)),
  closeAddCard: () => dispatch(closeAddCard()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCreditCard)
