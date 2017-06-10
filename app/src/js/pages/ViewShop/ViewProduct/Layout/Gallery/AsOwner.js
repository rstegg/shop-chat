import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Grid, Label, Dimmer, Loader, Image, Icon, Header, Segment } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import { length } from 'ramda'

import ProductAdminMenu from 'components/ProductAdminMenu'
import ProductSidebar from 'components/ProductSidebar'

import ImageCropper from 'components/ImageCropper'
import Dropzone from 'components/Dropzone'

import EditorField from 'elements/Input/EditorField'
import CheckboxField from 'elements/Input/CheckboxField'

import {
  openEditProductCropper,
  closeEditProductCropper,
  openAddGalleryProductCropper,
  closeAddGalleryProductCropper,
  editProduct,
  addGalleryImage,
  deleteProductGalleryImage,
  uploadEditProductImage,
  onUploadEditProductImageFailure,
  uploadGalleryProductImage,
  onUploadGalleryProductImageFailure,
  editProductField
} from 'actions/products'

import { validate } from './validators'
import { normalizePrice } from './normalize'

const Avatar = ({product, openEditProductCropper, onUploadEditProductImageFailure}) =>
  <Dropzone className='ui image editable avatar-image' onDropAccepted={openEditProductCropper} onDropRejected={onUploadEditProductImageFailure}>
    {product.image_loading && <Dimmer active><Loader /></Dimmer>}
    <Image src={product.image || '/images/productholder.png'} />
    {product.image_error && <Label basic color='red'>Invalid image</Label>}
  </Dropzone>

const AddGalleryImageButton = ({addGalleryImage}) =>
  <Card onClick={addGalleryImage} style={{display: 'flex'}}>
    <Image src='/images/add_image_btn.png' />
  </Card>

const GalleryAvatar = ({product, index, openAddGalleryProductCropper, onUploadGalleryProductImageFailure, onDeleteGalleryImage}) =>
  <Card>
    <Dropzone className='ui image editable gallery-image' onDropAccepted={openAddGalleryProductCropper} onDropRejected={onUploadGalleryProductImageFailure}>
      {product.gallery[index].image_loading && <Dimmer active><Loader /></Dimmer>}
      <Image src={product.gallery[index].image || '/images/productholder.png'} />
      {product.gallery[index].image_error && <Label basic color='red'>Invalid image</Label>}
    </Dropzone>
    <Icon name='delete' style={{position: 'absolute'}} onClick={() => onDeleteGalleryImage(index)} />
  </Card>

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

const PublicField = ({product, user, editProduct, style}) =>
  <Field component={CheckboxField} name='is_public' label='Public' style={style} onSubmit={is_public => editProduct({...product, is_public}, user)} />

const PriceField = ({isEditing, product, user, editProduct, editProductField}) =>
  <EditorField
    isEditing={isEditing}
    placeholder='Price' name='price'
    normalize={normalizePrice}
    onClick={() => editProductField('price')} onClickOutside={() => editProductField(null)}
    onSubmit={price => editProduct({...product, price}, user)}>
    <Header as='h4'>${product.price}</Header>
  </EditorField>

class AdminGridView extends Component {
  render() {
    const {
      user,
      product,
      editProduct,
      editProductField,
      addGalleryImage,
      deleteProductGalleryImage,
      uploadGalleryProductImage,
      onUploadGalleryProductImageFailure,
      openAddGalleryProductCropper,
      closeAddGalleryProductCropper,
      openEditProductCropper,
      closeEditProductCropper,
      uploadEditProductImage,
      onUploadEditProductImageFailure,
    } = this.props
    return (
      <div>
        <ProductSidebar editMode={product.editMode}>
          <div className='edit-product-container'>
            <Grid celled='internally'>
              <Grid.Column width={10} stretched>
                <Segment basic>
                  <Segment>
                    {product.isCropperOpen ?
                      <ImageCropper
                        isOpen={product.isCropperOpen}
                        image={product.imagePreview}
                        uploadImage={img => uploadEditProductImage(img, product, user)}
                        closeCropper={closeEditProductCropper} />
                      :
                      <Avatar
                        product={product}
                        openEditProductCropper={img => openEditProductCropper(img[0])}
                        onUploadEditProductImageFailure={onUploadEditProductImageFailure} />
                    }
                    {product.isGalleryCropperOpen ?
                      <ImageCropper
                        isGalleryImage={true}
                        isOpen={product.isGalleryCropperOpen}
                        image={product.imagePreview}
                        uploadImage={img => uploadGalleryProductImage(img, product.galleryActiveIndex, product, user)}
                        closeCropper={closeAddGalleryProductCropper} />
                      :
                      null
                    }

                  </Segment>
                  <Card.Group itemsPerRow={4}>
                    { !!product.gallery && product.gallery.map((image, i) =>
                      <GalleryAvatar key={`gallery-${i}`} index={i} product={product}
                        onDeleteGalleryImage={index => deleteProductGalleryImage(index, product, user)}
                        openAddGalleryProductCropper={img => openAddGalleryProductCropper(img[0], i)}
                        onUploadGalleryProductImageFailure={onUploadGalleryProductImageFailure} />)}

                    { !!product.gallery && product.gallery.length < 4 ? <AddGalleryImageButton addGalleryImage={() => addGalleryImage()} /> : null}
                  </Card.Group>
                </Segment>
              </Grid.Column>
              <Grid.Column width={6} stretched>
                <Segment compact>
                  <NameField isEditing={product.focused === 'name'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
                </Segment>
                <Segment compact>
                  <DescriptionField isEditing={product.focused === 'description'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
                </Segment>
                <Segment compact>
                  <PriceField isEditing={product.focused === 'price'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
                </Segment>
              </Grid.Column>
            </Grid>
          </div>
          <ProductAdminMenu PublicField={<PublicField product={product} user={user} editProduct={editProduct} style={{position: 'absolute', left: '25px'}} />} />
        </ProductSidebar>
      </div>
    )
  }
}

const ConnectedAdminGridView = reduxForm({
  form: 'editProduct',
  validate
})(AdminGridView)

const mapStateToProps = ({user, products}) =>
({
  user,
  product: products.current,
  initialValues: products.current
})

const mapDispatchToProps = dispatch =>
({
  editProduct: (product, user) => dispatch(editProduct(product, user)),
  uploadEditProductImage: (img, product, user) => dispatch(uploadEditProductImage(img, product, user)),
  onUploadEditProductImageFailure: () => dispatch(onUploadEditProductImageFailure()),
  uploadGalleryProductImage: (img, index, product, user) => dispatch(uploadGalleryProductImage(img, index, product, user)),
  onUploadGalleryProductImageFailure: () => dispatch(onUploadGalleryProductImageFailure()),
  editProductField: field => dispatch(editProductField(field)),
  openEditProductCropper: img => dispatch(openEditProductCropper(img)),
  closeEditProductCropper: () => dispatch(closeEditProductCropper()),
  addGalleryImage: () => dispatch(addGalleryImage()),
  deleteProductGalleryImage: (index, product, user) => dispatch(deleteProductGalleryImage(index, product, user)),
  openAddGalleryProductCropper: (img, index) => dispatch(openAddGalleryProductCropper(img, index)),
  closeAddGalleryProductCropper: () => dispatch(closeAddGalleryProductCropper()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedAdminGridView)
