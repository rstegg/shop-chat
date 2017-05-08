import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card, Image } from 'semantic-ui-react'
import EditProfileForm from './form'

import { editProduct, uploadProductImage } from '../../redux/actions/products'

import Dropzone from '../../components/Dropzone'

const Avatar = ({image, uploadProductImage}) =>
  <Dropzone className='ui image editable' onDrop={uploadProductImage}>
    <Image src={image || '/images/shopholder.png'} />
  </Dropzone>

const EditProfile = ({ user, shop, image, editProduct, uploadProductImage }) =>
  !user.isAuthenticated ?
    <Redirect to='/login' from='/shops/edit' />
  : shop.isEdited ?
    <Redirect to='/shops' from='/shops/edit' />
  :
    <Card>
      <Avatar image={image || shop.image} uploadProductImage={img => uploadProductImage(img[0], user)} />
      <Card.Content>
        <Card.Header>Editing {shop.name}</Card.Header>
        <Card.Description>
          <EditProfileForm onSubmit={values => editProduct(({...values, image: image || shop.image, id: shop.id}), user)} />
        </Card.Description>
      </Card.Content>
    </Card>

const mapStateToProps = ({user, shops}) =>
({
  user,
  shop: shops.current,
  image: shops.image
})

const mapDispatchToProps = dispatch =>
({
  editProduct: (shop, user) => dispatch(editProduct(shop, user)),
  uploadProductImage: (img, user) => dispatch(uploadProductImage(img, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfile)
