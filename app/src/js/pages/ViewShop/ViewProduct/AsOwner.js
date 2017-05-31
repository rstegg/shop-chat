import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Button, Label, Dimmer, Loader, Image, Header, Segment } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import { length } from 'ramda'

import ShareMenu from 'components/SocialMenu'
import ImageCropper from 'components/ImageCropper'
import Dropzone from 'components/Dropzone'

import EditorField from 'elements/EditorField'
import CheckboxField from 'elements/CheckboxField'

import { openEditProductCropper, closeEditProductCropper, switchToProductUser, editProduct, deleteProduct, uploadEditProductImage, onUploadEditProductImageFailure, editProductField } from 'actions/products'

import { validate } from './validators'
import { normalizePrice } from './normalize'

const Avatar = ({product, openEditProductCropper, onUploadEditProductImageFailure}) =>
  <Dropzone className='ui image editable avatar-image' onDropAccepted={openEditProductCropper} onDropRejected={onUploadEditProductImageFailure}>
    {product.image_loading && <Dimmer active><Loader /></Dimmer>}
    <Image src={product.image || '/images/productholder.png'} />
    {product.image_error && <Label basic color='red'>Invalid image</Label>}
  </Dropzone>

const NameField = ({isEditing, product, user, editProduct, editProductField}) =>
  <EditorField
    isEditing={product.focused === 'name'}
    placeholder='Name' name='name'
    onClick={() => editProductField('name')} onClickOutside={() => editProductField(null)}
    onSubmit={name => {
      if(length(name)) {
        editProduct({...product, name}, user)
      }
    }}>
    <Header as='h1'>{product.name}</Header>
  </EditorField>

const DescriptionField = ({isEditing, product, user, editProduct, editProductField}) =>
  <EditorField
    isEditing={isEditing}
    placeholder='Description' name='description'
    onClick={() => editProductField('description')} onClickOutside={() => editProductField(null)}
    onSubmit={description => editProduct({...product, description}, user)}>
    <Header as='h4'>{product.description || 'Add a description'}</Header>
  </EditorField>

const PublicField = ({product, user, editProduct}) =>
  <Field component={CheckboxField} name='is_public' label='Public' onSubmit={is_public => editProduct({...product, is_public}, user)} />

const PriceField = ({isEditing, product, user, editProduct, editProductField}) =>
  <EditorField
    isEditing={isEditing}
    placeholder='Price' name='price'
    normalize={normalizePrice}
    onClick={() => editProductField('price')} onClickOutside={() => editProductField(null)}
    onSubmit={price => editProduct({...product, price}, user)}>
    <Header as='h4'>${product.price || '0.00'}</Header>
  </EditorField>

class AdminView extends Component {
  componentWillUnmount() {
    this.props.editProductField(null)
  }
  render() {
    const {
      deleteProduct,
      editProduct,
      editProductField,
      switchToProductUser,
      openEditProductCropper,
      closeEditProductCropper,
      uploadEditProductImage,
      onUploadEditProductImageFailure,
      product,
      user,
    } = this.props
    return (
      <Grid celled='internally' className='product__container'>
        <Grid.Column width={6} stretched>
          <Segment basic>
            <Segment>
              {product.isCropperOpen ?
                <ImageCropper isOpen={product.isCropperOpen} image={product.imagePreview} uploadImage={img => uploadEditProductImage(img, product, user)} closeCropper={closeEditProductCropper} />
                :
                <Avatar product={product} openEditProductCropper={img => openEditProductCropper(img[0])} onUploadEditProductImageFailure={onUploadEditProductImageFailure} />
              }
            </Segment>
            <Segment>
              <NameField isEditing={product.focused === 'name'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
            </Segment>
            <Segment>
              <DescriptionField isEditing={product.focused === 'description'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
            </Segment>
            <Segment>
              <PriceField isEditing={product.focused === 'price'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
            </Segment>
            <Segment>
              <PublicField product={product} user={user} editProduct={editProduct} />
            </Segment>
            <Segment style={{display: 'flex', justifyContent: 'center'}}>
              {user.id === product.user.id ?
                <Button basic onClick={switchToProductUser}>Done</Button>
                :
                <ShareMenu url={`https://kuwau.com/shop/${product.slug}`} shopId={product.id} />
              }
            </Segment>
          </Segment>
        </Grid.Column>
        <Grid.Column width={10} stretched>
          <ShareMenu url={`https://kuwau.com/product/${product.slug}`} productId={product.id} />
          <Segment>
            <Button fluid basic color='red' onClick={() => deleteProduct(product.id, product.shopId, user)} style={{justifyContent: 'center'}}>Remove listing</Button>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

const ConnectedAdminView = reduxForm({
  form: 'editProduct',
  validate
})(AdminView)

const mapStateToProps = state =>
({
  user: state.user,
  product: state.products.current,
  initialValues: state.products.current
})

const mapDispatchToProps = dispatch =>
({
  deleteProduct: (productId, shopId, user) => dispatch(deleteProduct(productId, shopId, user)),
  editProduct: (product, user) => dispatch(editProduct(product, user)),
  uploadEditProductImage: (img, product, user) => dispatch(uploadEditProductImage(img, product, user)),
  onUploadEditProductImageFailure: () => dispatch(onUploadEditProductImageFailure()),
  editProductField: field => dispatch(editProductField(field)),
  openEditProductCropper: img => dispatch(openEditProductCropper(img)),
  closeEditProductCropper: () => dispatch(closeEditProductCropper()),
  switchToProductUser: () => dispatch(switchToProductUser())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedAdminView)
