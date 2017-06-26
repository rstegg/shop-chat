import React, { Component } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { path, length } from 'ramda'


import { Button, Image, Header, Label, Dimmer, Loader } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'

import ShareMenu from 'components/SocialMenu'
import ImageCropper from 'components/ImageCropper'
import Dropzone from 'components/Dropzone'

import CheckboxField from 'elements/Input/CheckboxField'
import EditorField from 'elements/Input/EditorField'

const getName = path(['name'])

import {
  deleteShop,
  editShop,
  editShopField,
  switchToShopUser,
  openEditShopCropper,
  closeEditShopCropper,
  uploadEditShopImage,
  onUploadEditShopImageFailure
} from 'actions/shops'

import ShopChat from 'components/Chat'
import GridLayout from 'layouts/Grid'

import { validate } from './validators'

const Avatar = ({shop, openEditShopCropper, onUploadEditShopImageFailure}) =>
  <Dropzone className='editable' onDropAccepted={openEditShopCropper} onDropRejected={onUploadEditShopImageFailure}>
    {shop.image_loading && <div>Loading...</div>}
    <img src={shop.image || '/images/productholder.png'} alt={shop.name} />
    {shop.image_error && <div>Invalid image</div>}
  </Dropzone>

const NameField = ({isEditing, shop, user, editShop, editShopField}) =>
  <EditorField
    isEditing={shop.focused === 'name'}
    placeholder='Name' name='name'
    onClick={() => editShopField('name')} onClickOutside={() => editShopField(null)}
    onSubmit={name => {
      if(length(name)) {
        editShop({...shop, name}, user)
      }
    }}>
    <p className='title'>
      <Header as='h1'>{shop.name}</Header>
    </p>
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
  componentWillUpdate(nextProps) {
    const nextShop = nextProps.shop
    const { shop, redirectToNewStore } = this.props
    if(getName(nextShop) !== getName(shop)) {
      redirectToNewStore(nextShop.slug)
    }
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
          <div className='tile is-ancestor shop-container'>
            <div className='tile is-vertical is-8'>
              <div className='tile'>
                <div className='tile is-vertical'>
                  <article className='tile is-child notification is-primary'>
                    <figure className='image is-4by3'>
                      {shop.isCropperOpen ?
                        <ImageCropper isOpen={shop.isCropperOpen} image={shop.imagePreview} uploadImage={img => uploadEditShopImage(img, shop, user)} closeCropper={closeEditShopCropper} />
                        :
                        <Avatar shop={shop} openEditShopCropper={img => openEditShopCropper(img[0])} onUploadEditShopImageFailure={onUploadEditShopImageFailure} />
                      }
                    </figure>
                  </article>
                  <article className='tile is-child notification is-warning'>
                    <NameField isEditing={shop.focused === 'name'} shop={shop} user={user} editShop={editShop} editShopField={editShopField} />
                    <p className='subtitle'><DescriptionField isEditing={shop.focused === 'description'} shop={shop} user={user} editShop={editShop} editShopField={editShopField} /></p>
                    <p className='subtitle'><PublicField shop={shop} user={user} editShop={editShop} /></p>
                  </article>
                </div>
                <div className='tile'>
                  <article className='tile is-child notification is-info'>
                    {children}
                  </article>
                </div>
              </div>
              <div className='tile'>
                <article className='tile is-child notification is-danger'>
                  <p className='title'>Share</p>
                  <div className='content'>
                    {
                      user.id === shop.userId ?
                      <Button basic onClick={switchToShopUser}>Done</Button>
                      :
                      <ShareMenu url={`https://kuwau.com/shop/${shop.slug}`} shopId={shop.id} />
                    }
                  </div>
                </article>
              </div>
            </div>
            <div className='tile'>
                <ShopChat thread={shop} threadType='shop' />
            </div>
          </div>
    )
  }
}


const ConnectedAdminView = reduxForm({
  form: 'editShop',
  validate
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
  redirectToNewStore: slug => dispatch(replace(`/shop/${slug}`))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedAdminView)
