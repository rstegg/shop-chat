import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card, Image, Label, Loader, Dimmer } from 'semantic-ui-react'
import CreateShopForm from './form'

import { createShop, openCreateShopCropper, closeCreateShopCropper, uploadShopImage, onUploadShopImageFailure } from 'actions/shops'

import ImageCropper from 'components/ImageCropper'
import Dropzone from 'components/Dropzone'

const Avatar = ({shop, openCropper, onUploadShopImageFailure}) =>
  <Dropzone className='ui image editable avatar-image' onDropAccepted={openCropper} onDropRejected={onUploadShopImageFailure}>
    {shop.image_loading && <Dimmer active><Loader /></Dimmer>}
    <Image src={shop.image || '/images/productholder.png'} />
  </Dropzone>

class CreateShop extends Component {
  render() {
    const {
      user,
      shop,
      openCreateShopCropper,
      closeCreateShopCropper,
      createShop,
      uploadShopImage,
      onUploadShopImageFailure
    } = this.props
    if(!user.isAuthenticated) {
      return <Redirect to='/login' />
    }
    if(shop.isCreated) {
      return <Redirect to='/shops' />
    }
    return (
      <Card>
        {shop.isCropperOpen ?
          <ImageCropper isOpen={shop.isCropperOpen} image={shop.imagePreview} uploadImage={img => uploadShopImage(img, user)} closeCropper={closeCreateShopCropper} />
          :
          <Avatar shop={shop} openCropper={img => openCreateShopCropper(img[0])} onUploadShopImageFailure={onUploadShopImageFailure} />
        }
        {shop.image_error && <Label basic color='red'>Invalid image</Label>}
        <Card.Content>
          <Card.Header>New Shop</Card.Header>
          <Card.Description>
            <CreateShopForm
              shop={shop}
              onSubmit={values => createShop({...values, image: shop.image}, user)}
            />
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}


const mapStateToProps = ({user, shops}) =>
({
  user,
  shop: shops.new
})

const mapDispatchToProps = dispatch =>
({
  createShop: (shop, user) => dispatch(createShop(shop, user)),
  uploadShopImage: (img, user) => dispatch(uploadShopImage(img, user)),
  openCreateShopCropper: img => dispatch(openCreateShopCropper(img)),
  closeCreateShopCropper: () => dispatch(closeCreateShopCropper()),
  onUploadShopImageFailure: () => dispatch(onUploadShopImageFailure()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateShop)
