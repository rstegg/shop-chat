import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card, Image, Label } from 'semantic-ui-react'
import CreateProductForm from './form'

import { createProduct, uploadProductImage, onUploadProductImageFailure } from 'actions/products'

import Dropzone from 'components/Dropzone'

const Avatar = ({image, uploadProductImage, onUploadProductImageFailure}) =>
  <Dropzone className='ui image editable' onDrop={uploadProductImage} onDropRejected={onUploadProductImageFailure}>
    <Image src={image || '/images/productholder.png'} />
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
        <Avatar image={product.image} uploadProductImage={img => uploadProductImage(img[0], user)} onUploadProductImageFailure={onUploadProductImageFailure} />
        {product.image_error && <Label basic color='red'>Invalid image</Label>}
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
