import React from 'react'

import { Dimmer, Label, Loader, Image } from 'semantic-ui-react'

import Dropzone from 'components/Dropzone'

const AvatarField = ({product, className, openEditProductCropper, onUploadEditProductImageFailure}) =>
  <Dropzone className={`ui image editable avatar-image ${className}`} onDropAccepted={openEditProductCropper} onDropRejected={onUploadEditProductImageFailure}>
    {product.image_loading && <Dimmer active><Loader /></Dimmer>}
    <Image src={product.image || '/images/productholder.png'} />
    {product.image_error && <Label basic color='red'>Invalid image</Label>}
  </Dropzone>

export default AvatarField
