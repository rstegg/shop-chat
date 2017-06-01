import React from 'react'
import { connect } from 'react-redux'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

import { resetAccount } from 'actions/account'

const EmailAlert = ({visible, resetAccount}) =>
  <Modal open={visible} onClose={resetAccount} basic size='small'>
    <Header icon='id badge' content='Success!' />
    <Modal.Content>
      <h3>Account updated.</h3>
    </Modal.Content>
    <Modal.Actions>
      <Button color='green' onClick={resetAccount} inverted>
        <Icon name='checkmark' />
      </Button>
    </Modal.Actions>
  </Modal>

const mapStateToProps = ({user}) =>
({
  user,
  visible: user.isAccountSaved
})

const mapDispatchToProps = dispatch =>
({
  resetAccount: () => dispatch(resetAccount())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailAlert)
