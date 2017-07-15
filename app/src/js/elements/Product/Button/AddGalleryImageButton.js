import React from 'react'

import { Card, Image } from 'semantic-ui-react'

const AddGalleryImageButton = ({ addGalleryImage }) =>
  <Card onClick={addGalleryImage} style={{ display: 'flex' }}>
    <Image src='/images/add_image_btn.png' />
  </Card>

export default AddGalleryImageButton
