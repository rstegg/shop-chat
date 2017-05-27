import React, { Component } from 'react'
import { connect } from 'react-redux'
import AvatarEditor from 'react-avatar-editor'

import { Modal, Button } from 'semantic-ui-react'

import { uploadProfileImage, closeProfileCropper } from 'actions/profile'

class ImageCropper extends Component {
  onSave() {
    const { uploadImage, closeCropper, user } = this.props
    this.editor.getImageScaledToCanvas().toBlob(blob => uploadImage(blob, user))
    closeCropper()
  }
  render() {
    const { image, isOpen, closeProfileCropper } = this.props
    if(!isOpen) {
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
            color={[255, 255, 255, 0.6]} // RGBA
            scale={1}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={closeProfileCropper} content='Cancel' />
          <Button positive icon='checkmark' labelPosition='right' content='Save'
            onClick={() => this.onSave()} />
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = ({user}) =>
({
  user
})

export default connect(mapStateToProps)(ImageCropper)
