import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card, Image } from 'semantic-ui-react'
import CreateProductForm from './form'

import { createProduct, uploadProductImage } from 'actions/products'

import Dropzone from 'components/Dropzone'

const Avatar = ({image, uploadProductImage}) =>
  <Dropzone className='ui image editable' onDrop={uploadProductImage}>
    <Image src={image || '/images/productholder.png'} />
  </Dropzone>

class CreateProduct extends Component {
  render() {
    const { user, shop, product, createProduct, uploadProductImage } = this.props
    if(!user.isAuthenticated) {
      return <Redirect to='/login' />
    }
    if(product.isCreated) {
      return <Redirect to={`/shop/${shop.slug}`} />
    }
    return (
      <Card>
        <Avatar image={product.image} uploadProductImage={img => uploadProductImage(img[0], user)} />
        <Card.Content>
          <Card.Header>New Product</Card.Header>
          <Card.Description>
            <CreateProductForm onSubmit={values => createProduct(({...values, image: product.image}), shop.id, user)} />
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = ({user, shops, products}) =>
({
  user,
  shop: shops.current,
  product: products.new
})

const mapDispatchToProps = dispatch =>
({
  createProduct: (product, shopId, user) => dispatch(createProduct(product, shopId, user)),
  uploadProductImage: (img, user) => dispatch(uploadProductImage(img, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateProduct)
