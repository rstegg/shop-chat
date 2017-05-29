import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Image, Header, Label, Dimmer, Loader } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'

import ShareMenu from 'components/SocialMenu'
import ImageCropper from 'components/ImageCropper'
import Dropzone from 'components/Dropzone'

import CheckboxField from 'elements/CheckboxField'
import EditorField from 'elements/EditorField'

import { deleteShop, editShop, editShopField, switchToShopUser, openEditShopCropper, closeEditShopCropper, uploadEditShopImage, onUploadEditShopImageFailure } from 'actions/shops'

import ShopChat from 'components/Chat'
import GridLayout from 'components/layouts/Grid'

const Avatar = ({shop, openEditShopCropper, onUploadEditShopImageFailure}) =>
  <Dropzone className='ui image editable avatar-image' onDrop={openEditShopCropper} onDropRejected={onUploadEditShopImageFailure}>
    {shop.image_loading && <Dimmer active><Loader /></Dimmer>}
    <Image src={shop.image || '/images/productholder.png'} />
    {shop.image_error && <Label basic color='red'>Invalid image</Label>}
  </Dropzone>

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
  <Field component={CheckboxField} name='is_public' label='Public' onSubmit={is_public => editShop({...shop, is_public}, user)} />

class AdminView extends Component {
  componentWillUnmount() {
    this.props.editShopField(null)
  }
  render() {
    const {
      editShop,
      editShopField,
      openEditShopCropper,
      closeEditShopCropper,
      uploadEditShopImage,
      onUploadEditShopImageFailure,
      switchToShopUser,
      shop,
      user,
      children,
    } = this.props
    return (
      <GridLayout
        Image={shop.isCropperOpen ?
            <ImageCropper isOpen={shop.isCropperOpen} image={shop.imagePreview} uploadImage={img => uploadEditShopImage(img, shop, user)} closeCropper={closeEditShopCropper} />
            :
            <Avatar shop={shop} openEditShopCropper={img => openEditShopCropper(img[0])} onUploadEditShopImageFailure={onUploadEditShopImageFailure} />
          }
        Canopy={children}
        ChatBox={<ShopChat thread={shop} threadType='shop' />}
        Header={<NameField isEditing={shop.focused === 'name'} shop={shop} user={user} editShop={editShop} editShopField={editShopField} />}
        SubHeader={<DescriptionField isEditing={shop.focused === 'description'} shop={shop} user={user} editShop={editShop} editShopField={editShopField} />}
        Gutter={<PublicField shop={shop} user={user} editShop={editShop} />}
        GutterRight={
          user.id === shop.userId ?
            <Button basic onClick={switchToShopUser}>Done</Button>
            :
            <ShareMenu url={`https://kuwau.com/shop/${shop.slug}`} shopId={shop.id} />
        } />
    )
  }
}


const ConnectedAdminView = reduxForm({
  form: 'editShop',
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
  openEditShopCropper: img => dispatch(openEditShopCropper(img)),
  closeEditShopCropper: () => dispatch(closeEditShopCropper()),
  uploadEditShopImage: (img, shop, user) => dispatch(uploadEditShopImage(img, shop, user)),
  onUploadEditShopImageFailure: () => dispatch(onUploadEditShopImageFailure()),
  editShopField: field => dispatch(editShopField(field)),
  deleteShop: (shopId, user) => dispatch(deleteShop(shopId, user)),
  switchToShopUser: () => dispatch(switchToShopUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedAdminView)
