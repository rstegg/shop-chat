import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card, Image, Label, Dimmer, Loader } from 'semantic-ui-react'
import CreateProductForm from './form'

import { createProduct, uploadProductImage, onUploadProductImageFailure } from 'actions/products'

import Dropzone from 'components/Dropzone'

const Avatar = ({product, uploadProductImage, onUploadProductImageFailure}) =>
  <Dropzone className='ui image editable' onDrop={uploadProductImage} onDropRejected={onUploadProductImageFailure}>
    {product.image_loading && <Dimmer active><Loader /></Dimmer>}
    <Image src={product.image || '/images/productholder.png'} />
    {product.image_error && <Label basic color='red'>Invalid image</Label>}
  </Dropzone>

class CreateProduct extends Component {
  render() {
    const { user, shop, product, createProduct, uploadProductImage, onUploadProductImageFailure } = this.props
    if(!user.isAuthenticated) {
      return <Redirect to='/login' />
    }
    if(product.isCreated) {
      return <Redirect to={`/shop/${shop.slug}`} />
    }
    return (
      <Card>
        <Avatar product={product} uploadProductImage={img => uploadProductImage(img[0], user)} onUploadProductImageFailure={onUploadProductImageFailure} />
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
  uploadProductImage: (img, user) => dispatch(uploadProductImage(img, user)),
  onUploadProductImageFailure: () => dispatch(onUploadProductImageFailure()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateProduct)
