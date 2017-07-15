import React from 'react'
import { connect } from 'react-redux'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

import { resetAddress } from 'actions/address'

const EmailAlert = ({ visible, resetAddress }) =>
  <Modal open={visible} onClose={resetAddress} basic size='small'>
    <Header icon='address card' content='Success!' />
    <Modal.Content>
      <h3>Shipping address updated.</h3>
    </Modal.Content>
    <Modal.Actions>
      <Button color='green' onClick={resetAddress} inverted>
        <Icon name='checkmark' />
      </Button>
    </Modal.Actions>
  </Modal>

const mapStateToProps = ({ user }) =>
({
  user,
  visible: user.isAddressSaved
})

const mapDispatchToProps = dispatch =>
({
  resetAddress: () => dispatch(resetAddress())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailAlert)
