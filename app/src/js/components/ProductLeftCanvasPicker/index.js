import React, { Component } from 'react'

import { Card, Modal, Button } from 'semantic-ui-react'

class ProductLeftCanvasPicker extends Component {
  render() {
    const { isOpen, saveLeftCanvas, closeCropper } = this.props
    if(!isOpen) {
      return null
    }
    return (
      <Modal open={isOpen} style={{textAlign: 'center'}}>
        <Modal.Header>Choose a style</Modal.Header>
        <Modal.Content>
          <Card.Group>
            <Card onClick={() => saveLeftCanvas('type-a')}>
              <Card.Header>Type A</Card.Header>
            </Card>
            <Card onClick={() => saveLeftCanvas('type-b')}>
              <Card.Header>Type B</Card.Header>
            </Card>
            <Card onClick={() => saveLeftCanvas('type-c')}>
              <Card.Header>Type C</Card.Header>
            </Card>
          </Card.Group>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={closeCropper} content='Cancel' />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default ProductLeftCanvasPicker
