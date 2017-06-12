import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Grid, Segment } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'
import { pipe, path } from 'ramda'

import ProductAdminMenu from 'components/Product/AdminMenu'
import ProductSidebar from 'components/Product/Sidebar'
import ProductGallerySegment from 'components/Product/Segment/GallerySegment'

import ImageCropper from 'components/ImageCropper'

import AddGalleryImageButton from 'elements/Product/Button/AddGalleryImageButton'

import AvatarField from 'elements/Product/Field/AvatarField'
import GalleryAvatarField from 'elements/Product/Field/GalleryAvatarField'
import NameField from 'elements/Product/Field/NameField'
import DescriptionField from 'elements/Product/Field/DescriptionField'
import PriceField from 'elements/Product/Field/PriceField'
import PublicField from 'elements/Product/Field/PublicField'

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

const getPrimaryRGB = path(['themes', 'primary', 'rgb'])
const getSecondaryRGB = path(['themes', 'secondary', 'rgb'])
const getBackgroundRGB = path(['themes', 'background', 'rgb'])
const getSegmentRGB = path(['themes', 'segment', 'rgb'])

const toRGBStyle = rgba => !!rgba ? `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})` : `rgba(255,255,255,1)`

const hasAlpha = rgba => !!rgba && rgba.a === 0 ? 'none' : '0 1px 2px 0 rgba(34,36,38,.15)'

const getPrimary = pipe(getPrimaryRGB, toRGBStyle)
const getSecondary = pipe(getSecondaryRGB, toRGBStyle)
const getBackground = pipe(getBackgroundRGB, toRGBStyle)
const getSegment = pipe(getSegmentRGB, toRGBStyle)

const getSegmentAlpha = pipe(getSegmentRGB, hasAlpha)

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
        <ProductSidebar product={product}>
          <div className='edit-product-container' style={{backgroundColor: getBackground(product)}}>
            <Grid celled='internally'>
              <Grid.Column width={6} stretched>
                <Segment basic>
                  <ProductGallerySegment>
                    {product.isCropperOpen ?
                      <ImageCropper
                        isOpen={product.isCropperOpen}
                        image={product.imagePreview}
                        uploadImage={img => uploadEditProductImage(img, product, user)}
                        closeCropper={closeEditProductCropper} />
                      :
                      <AvatarField
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

                  </ProductGallerySegment>
                  <Card.Group itemsPerRow={4}>
                    { !!product.gallery && product.gallery.map((image, i) =>
                      <GalleryAvatarField key={`gallery-${i}`} index={i} product={product}
                        onDeleteGalleryImage={index => deleteProductGalleryImage(index, product, user)}
                        openAddGalleryProductCropper={img => openAddGalleryProductCropper(img[0], i)}
                        onUploadGalleryProductImageFailure={onUploadGalleryProductImageFailure} />)}

                    { !!product.gallery && product.gallery.length < 4 ? <AddGalleryImageButton addGalleryImage={() => addGalleryImage()} /> : null}
                  </Card.Group>
                </Segment>
              </Grid.Column>
              <Grid.Column width={10} stretched>
                <ProductGallerySegment>
                  <NameField isEditing={product.focused === 'name'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
                </ProductGallerySegment>
                <ProductGallerySegment>
                  <DescriptionField isEditing={product.focused === 'description'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
                </ProductGallerySegment>
                <ProductGallerySegment>
                  <PriceField isEditing={product.focused === 'price'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
                </ProductGallerySegment>
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
