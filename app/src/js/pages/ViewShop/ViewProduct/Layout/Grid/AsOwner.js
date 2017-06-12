import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Button, Segment } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'
import { pipe, path } from 'ramda'

import ProductAdminMenu from 'components/Product/AdminMenu'
import ProductSidebar from 'components/Product/Sidebar'
import ProductGridSegment from 'components/Product/Segment/GridSegment'

import ImageCropper from 'components/ImageCropper'

import AvatarField from 'elements/Product/Field/AvatarField'
import NameField from 'elements/Product/Field/NameField'
import DescriptionField from 'elements/Product/Field/DescriptionField'
import PriceField from 'elements/Product/Field/PriceField'
import PublicField from 'elements/Product/Field/PublicField'

import {
  openEditProductCropper,
  closeEditProductCropper,
  editProduct,
  deleteProduct,
  uploadEditProductImage,
  onUploadEditProductImageFailure,
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
      deleteProduct,
      editProductField,
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
              <Grid.Row columns={2}>
                <Grid.Column width={8} stretched>
                  <Segment basic>
                    <ProductGridSegment>
                      {product.isCropperOpen ?
                        <ImageCropper isOpen={product.isCropperOpen} image={product.imagePreview} uploadImage={img => uploadEditProductImage(img, product, user)} closeCropper={closeEditProductCropper} />
                        :
                        <AvatarField product={product} openEditProductCropper={img => openEditProductCropper(img[0])} onUploadEditProductImageFailure={onUploadEditProductImageFailure} />
                      }
                    </ProductGridSegment>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={8} stretched>
                  <ProductGridSegment>
                    <NameField isEditing={product.focused === 'name'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
                  </ProductGridSegment>
                  <ProductGridSegment>
                    <PriceField isEditing={product.focused === 'price'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
                  </ProductGridSegment>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={8} stretched>
                  <ProductGridSegment>
                    <DescriptionField isEditing={product.focused === 'description'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
                  </ProductGridSegment>
                </Grid.Column>
                <Grid.Column width={8} stretched>
                  <Segment>
                    <Button fluid basic color='red' onClick={() => deleteProduct(product.id, product.shopId, user)} style={{justifyContent: 'center'}}>Remove listing</Button>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
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
  deleteProduct: (productId, shopId, user) => dispatch(deleteProduct(productId, shopId, user)),
  editProduct: (product, user) => dispatch(editProduct(product, user)),
  uploadEditProductImage: (img, product, user) => dispatch(uploadEditProductImage(img, product, user)),
  onUploadEditProductImageFailure: () => dispatch(onUploadEditProductImageFailure()),
  editProductField: field => dispatch(editProductField(field)),
  openEditProductCropper: img => dispatch(openEditProductCropper(img)),
  closeEditProductCropper: () => dispatch(closeEditProductCropper()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedAdminGridView)
