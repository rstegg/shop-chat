import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, Header, Checkbox } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'

import ShopMenu from 'components/SocialMenu'
import Dropzone from 'components/Dropzone'

import EditorField from 'elements/EditorField'

import { editShop, uploadEditShopImage, editShopField } from 'actions/shops'

import ShopChatPage from 'components/Chat'
import GridLayout from 'components/layouts/Grid'

import Products from './Products'

const Avatar = ({image, uploadEditShopImage}) =>
  <Dropzone className='ui image editable' onDrop={uploadEditShopImage}>
    <Image src={image || '/images/productholder.png'} />
  </Dropzone>

const CheckboxField = ({ input: { value, onChange }, onSubmit }) =>
  <Checkbox
    label='Public'
    toggle
    checked={!!value}
    onChange={(_,data) => {
      onChange(data.checked)
      onSubmit(data.checked)
    }} />

const NameField = ({isEditing, shop, user, editShop, editShopField}) =>
  <EditorField
    isEditing={shop.focused === 'name'}
    placeholder='Name' name='name'
    onClick={() => editShopField('name')} onClickOutside={() => editShopField(null)}
    onSubmit={name => editShop({...shop, name}, user)}>
    <Header as='h1'>{shop.name}</Header>
  </EditorField>

const DescriptionField = ({isEditing, shop, user, editShop, editShopField}) =>
  <EditorField
    isEditing={isEditing}
    placeholder='Description' name='description'
    onClick={() => editShopField('description')} onClickOutside={() => editShopField(null)}
    onSubmit={description => editShop({...shop, description}, user)}>
    <Header as='h4'>{shop.description || 'Add a description'}</Header>
  </EditorField>

const PublicField = ({shop, user, editShop}) =>
  <Field component={CheckboxField} name='is_public' onSubmit={v => editShop({...shop, is_public: v}, user)} />

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
      user
    } = this.props
    return (
      <GridLayout
        Image={<Avatar image={image || shop.image} uploadEditShopImage={img => uploadEditShopImage(img[0], shop, user)} />}
        Canopy={<Products />}
        ChatBox={<ShopChatPage thread={shop} threadType='shop' />}
        Header={<NameField isEditing={shop.focused === 'name'} shop={shop} user={user} editShop={editShop} editShopField={editShopField} />}
        SubHeader={<DescriptionField isEditing={shop.focused === 'description'} shop={shop} user={user} editShop={editShop} editShopField={editShopField} />}
        Gutter={<PublicField shop={shop} user={user} editShop={editShop} />}
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

const mapStateToProps = ({shops, user}) =>
({
  user: user,
  shop: shops.current,
  image: shops.image,
  initialValues: shops.current
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
