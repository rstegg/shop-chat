import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card, Image } from 'semantic-ui-react'
import CreateShopForm from './form'

import { createShop, uploadShopImage } from 'actions/shops'

import Dropzone from 'components/Dropzone'

const Avatar = ({image, uploadShopImage}) =>
  <Dropzone className='ui image editable' onDrop={uploadShopImage}>
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
        <Avatar image={shop.image} uploadShopImage={img => uploadShopImage(img[0], user)} />
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateShop)
