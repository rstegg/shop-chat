import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card, Image, Label } from 'semantic-ui-react'
import CreateShopForm from './form'

import { createShop, uploadShopImage, uploadShopImageFailure } from 'actions/shops'

import Dropzone from 'components/Dropzone'

const Avatar = ({image, uploadShopImage, uploadShopImageFailure}) =>
  <Dropzone className='ui image editable' onDrop={uploadShopImage} onDropRejected={uploadShopImageFailure}>
    <Image src={image || '/images/productholder.png'} />
  </Dropzone>

class CreateShop extends Component {
  render() {
    const { user, shop, createShop, uploadShopImage } = this.props
    if(!user.isAuthenticated) {
      return <Redirect to='/login' />
    }
    if(shop.isCreated) {
      return <Redirect to='/shops' />
    }
    return (
      <Card>
        <Avatar image={shop.image} uploadShopImage={img => uploadShopImage(img[0], user)} uploadShopImageFailure={uploadShopImageFailure} />
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
  uploadShopImageFailure: () => dispatch(uploadShopImageFailure()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateShop)
