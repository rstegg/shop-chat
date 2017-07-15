import React, { Component } from 'react'
import AvatarEditor from 'react-avatar-editor'

import { Modal, Button } from 'semantic-ui-react'

class ImageCropper extends Component {
  onSave() {
    const { uploadImage, closeCropper } = this.props
    this.editor.getImageScaledToCanvas().toBlob(blob => {
      uploadImage(blob)
      closeCropper()
    })
  }
  render() {
    const { image, isOpen, closeCropper } = this.props
    if (!isOpen) {
      return null
    }
    return (
      <Modal open={isOpen} style={{textAlign: 'center'}}>
        <Modal.Header>Position and size your photo</Modal.Header>
        <Modal.Content>
          <AvatarEditor
            ref={ref => this.editor = ref}
            image={image.preview}
            width={300}
            height={300}
            border={50}
            color={[255, 255, 255, 0.6]}
            scale={1}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={closeCropper} content='Cancel' />
          <Button positive icon='checkmark' labelPosition='right' content='Save'
            onClick={() => this.onSave()} />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default ImageCropper
