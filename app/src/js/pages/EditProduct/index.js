import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card, Image } from 'semantic-ui-react'
import EditProductForm from './form'

import { editProduct, uploadProductImage } from 'actions/products'

import Dropzone from 'components/Dropzone'

const Avatar = ({image, uploadProductImage}) =>
  <Dropzone className='ui image editable' onDrop={uploadProductImage}>
    <Image src={image || '/images/shopholder.png'} />
  </Dropzone>

const EditProduct = ({ user, shop, editProduct, uploadProductImage }) =>
  !user.isAuthenticated ?
    <Redirect to='/login' />
  : shop.isEdited ?
    <Redirect to='/shops' />
  :
    <Card>
      <Avatar image={shop.image} uploadProductImage={img => uploadProductImage(img[0], user)} />
      <Card.Content>
        <Card.Header>Editing {shop.name}</Card.Header>
        <Card.Description>
          <EditProductForm onSubmit={values => editProduct(({...values, image: shop.image, id: shop.id}), user)} />
        </Card.Description>
      </Card.Content>
    </Card>

const mapStateToProps = ({user, shops}) =>
({
  user,
  shop: shops.current
})

const mapDispatchToProps = dispatch =>
({
  editProduct: (shop, user) => dispatch(editProduct(shop, user)),
  uploadProductImage: (img, user) => dispatch(uploadProductImage(img, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProduct)
