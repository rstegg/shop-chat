import React, { Component } from 'react'

import { Card, Modal, Button, Icon } from 'semantic-ui-react'

class ProductLeftCanvasPicker extends Component {
  render() {
    const { isOpen, updateLayout, closeLayoutPicker } = this.props
    if(!isOpen) {
      return null
    }
    return (
      <Modal open={isOpen} style={{textAlign: 'center'}}>
        <Modal.Header>Choose a style</Modal.Header>
        <Modal.Content>
          <Card.Group itemsPerRow={3}>
            <Card onClick={() => updateLayout('grid')}>
              <Icon fitted name='block layout' size='massive' className='image' />
              <Card.Header>Grid</Card.Header>
            </Card>
            <Card onClick={() => updateLayout('image')}>
              <Icon fitted name='image' size='massive' />
              <Card.Header>Image</Card.Header>
            </Card>
            <Card onClick={() => updateLayout('gallery')}>
              <Icon fitted name='indent' size='massive' className='image' />
              <Card.Header>Gallery</Card.Header>
            </Card>
          </Card.Group>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={closeLayoutPicker} content='Cancel' />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default ProductLeftCanvasPicker
