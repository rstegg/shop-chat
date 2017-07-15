import React from 'react'

import { Card, Dimmer, Label, Loader, Image, Icon } from 'semantic-ui-react'

import Dropzone from 'components/Dropzone'

const GalleryAvatar = ({ product, index, openAddGalleryProductCropper, onUploadGalleryProductImageFailure, onDeleteGalleryImage }) =>
  <Card>
    <Dropzone className='ui image editable gallery-image' onDropAccepted={openAddGalleryProductCropper} onDropRejected={onUploadGalleryProductImageFailure}>
      {product.gallery[index].imageLoading && <Dimmer active><Loader /></Dimmer>}
      <Image src={product.gallery[index].image || '/images/productholder.png'} />
      {product.gallery[index].imageError && <Label basic color='red'>Invalid image</Label>}
    </Dropzone>
    <Icon color='red' name='delete' style={{ cursor: 'pointer', position: 'absolute' }} onClick={() => onDeleteGalleryImage(index)} />
  </Card>

export default GalleryAvatar
