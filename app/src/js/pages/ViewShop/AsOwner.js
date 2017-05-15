import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, Header } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'

import ShopMenu from 'components/ProductMenu'
import Dropzone from 'components/Dropzone'

import ProfileLabel from 'elements/ProfileLabel'
import EditorField from 'elements/EditorField'

import { editShop, uploadEditShopImage, editShopField } from 'actions/shops'

import ShopChatPage from 'components/Chat'
import GridLayout from 'components/layouts/Grid'

import Products from './Products'

const Avatar = ({image, uploadEditShopImage}) =>
  <Dropzone className='ui image editable' onDrop={uploadEditShopImage}>
    <Image src={image || '/images/productholder.png'} />
  </Dropzone>

const NameField = ({isEditing, shop, editShop, editShopField}) =>
  <EditorField
    isEditing={shop.focused === 'name'}
    placeholder='Name' name='name'
    onClick={() => editShopField('name')} onSubmit={v => editShop({...shop, name: v}, shop)}>
    <Header as='h1'>{shop.name}</Header>
  </EditorField>

const DescriptionField = ({isEditing, shop, editShop, editShopField}) =>
  <EditorField
    isEditing={isEditing}
    placeholder='Description' name='description'
    onClick={() => editShopField('description')} onSubmit={v => editShop({...shop, description: v}, shop)}>
    <Header as='h4'>{shop.description || 'Add a description'}</Header>
  </EditorField>

class AdminView extends Component {
  componentWillUnmount() {
    this.props.editShopField(null)
  }
  render() {
    const {
      editShop,
      editShopField,
      uploadEditShopImage,
      image,
      shop,
      user,
      params
    } = this.props
    return (
      <GridLayout
        Image={<Avatar image={image || shop.image} uploadEditShopImage={img => uploadEditShopImage(img[0], shop, user)} />}
        Canopy={<Products />}
        ChatBox={<ShopChatPage room={shop} roomType='shop' />}
        Header={<NameField isEditing={shop.focused === 'name'} shop={shop} editShop={editShop} editShopField={editShopField} />}
        SubHeader={<DescriptionField isEditing={shop.focused === 'description'} shop={shop} editShop={editShop} editShopField={editShopField} />}
        Gutter={<ProfileLabel username={shop.user.username} image={shop.user.image} />}
        GutterRight={<ShopMenu url={`https://kuwau.com/shop/${shop.slug}`} shopId={shop.id} />} />
    )
  }
}


const ConnectedAdminView = reduxForm({
  form: 'editShop',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  // validate
})(AdminView)

const mapStateToProps = state =>
({
  user: state.user,
  shop: state.shops.current,
  image: state.shops.image,
  initialValues: state.shops.current
})

const mapDispatchToProps = dispatch =>
({
  editShop: (shop, user) => dispatch(editShop(shop, user)),
  uploadEditShopImage: (img, shop, user) => dispatch(uploadEditShopImage(img, shop, user)),
  editShopField: field => dispatch(editShopField(field))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedAdminView)
