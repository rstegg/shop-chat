import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Button, Segment } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'
import { pipe, path } from 'ramda'

import ProductAdminMenu from 'components/ProductAdminMenu'
import ProductSidebar from 'components/ProductSidebar'

import ImageCropper from 'components/ImageCropper'

import AvatarField from 'elements/Product/Fields/AvatarField'
import NameField from 'elements/Product/Fields/NameField'
import DescriptionField from 'elements/Product/Fields/DescriptionField'
import PriceField from 'elements/Product/Fields/PriceField'
import PublicField from 'elements/Product/Fields/PublicField'

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
                    <Segment>
                      {product.isCropperOpen ?
                        <ImageCropper isOpen={product.isCropperOpen} image={product.imagePreview} uploadImage={img => uploadEditProductImage(img, product, user)} closeCropper={closeEditProductCropper} />
                        :
                        <AvatarField product={product} openEditProductCropper={img => openEditProductCropper(img[0])} onUploadEditProductImageFailure={onUploadEditProductImageFailure} />
                      }
                    </Segment>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={8} stretched>
                  <Segment compact style={{backgroundColor: getSegment(product), borderColor: getSegment(product), boxShadow: getSegmentAlpha(product)}}>
                    <NameField isEditing={product.focused === 'name'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
                  </Segment>
                  <Segment compact style={{backgroundColor: getSegment(product), borderColor: getSegment(product), boxShadow: getSegmentAlpha(product)}}>
                    <PriceField isEditing={product.focused === 'price'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
                  </Segment>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={8} stretched>
                  <Segment>
                    <DescriptionField isEditing={product.focused === 'description'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
                  </Segment>
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
