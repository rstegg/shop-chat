import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card, Image } from 'semantic-ui-react'
import CreateProductForm from './form'

import { createProduct, uploadProductImage } from '../../redux/actions/products'

import Dropzone from '../../components/Dropzone'

const Avatar = ({image, uploadProductImage}) =>
  <Dropzone className='ui image editable' onDrop={uploadProductImage}>
    <Image src={image || '/images/productholder.png'} />
  </Dropzone>

const CreateProduct = ({ user, product, image, createProduct, uploadProductImage }) =>
  !user.isAuthenticated ?
    <Redirect to='/login' from='/products/new' />
  : product.isCreated ?
    <Redirect to='/products' from='/products/new' />
  :
    <Card>
      <Avatar image={image || product.image} uploadProductImage={img => uploadProductImage(img[0], user)} />
      <Card.Content>
        <Card.Header>New Product</Card.Header>
        <Card.Description>
          <CreateProductForm onSubmit={values => createProduct(({...values, image: product.image}), user)} />
        </Card.Description>
      </Card.Content>
    </Card>

const mapStateToProps = ({user, products}) =>
({
  user,
  product: products.new,
  image: products.image
})

const mapDispatchToProps = dispatch =>
({
  createProduct: (product, user) => dispatch(createProduct(product, user)),
  uploadProductImage: (img, user) => dispatch(uploadProductImage(img, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateProduct)
