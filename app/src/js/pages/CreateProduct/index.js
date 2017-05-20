import React from 'react'
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

const CreateProduct = ({ user, shop, product, image, createProduct, uploadProductImage }) =>
  !user.isAuthenticated ?
    <Redirect to='/login' />
  : product.isCreated ?
    <Redirect to={`/shop/${shop.slug}`} />
  :
    <Card>
      <Avatar image={product.image} uploadProductImage={img => uploadProductImage(img[0], user)} />
      <Card.Content>
        <Card.Header>New Product</Card.Header>
        <Card.Description>
          <CreateProductForm onSubmit={values => createProduct(({...values, image: product.image}), shop.id, user)} />
        </Card.Description>
      </Card.Content>
    </Card>

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
