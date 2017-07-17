import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { pipe, path } from 'ramda'

import ProductAdminMenu from 'components/Product/AdminMenu'
import ProductSidebar from 'components/Product/Sidebar'
import ProductImageSegment from 'components/Product/Segment/ImageSegment'

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
  uploadEditProductImage,
  onUploadEditProductImageFailure,
  editProductField
} from 'actions/products'

import { validate } from './validators'

import isMobile from 'utils/isMobile'

const getBackgroundRGB = path([ 'themes', 'background' ])

const toRGBStyle = rgba => rgba ? `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})` : 'rgba(255,255,255,1)'
const getBackground = pipe(getBackgroundRGB, toRGBStyle)

const AdminGridView = ({
  user,
  product,
  editProduct,
  editProductField,
  openEditProductCropper,
  closeEditProductCropper,
  uploadEditProductImage,
  onUploadEditProductImageFailure,
}) =>
  isMobile ?
    <div className='edit-product-container' style={{ background: getBackground(product) }}>
        {product.isCropperOpen ?
          <ImageCropper isOpen={product.isCropperOpen} image={product.imagePreview} uploadImage={img => uploadEditProductImage(img, product, user)} closeCropper={closeEditProductCropper} />
          :
          <AvatarField className='product-image-underlay' product={product} openEditProductCropper={img => openEditProductCropper(img[0])} onUploadEditProductImageFailure={onUploadEditProductImageFailure} />
        }
      <div style={{ display: 'flex', width: '100%', pointerEvents: 'none', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <ProductImageSegment>
          <NameField isEditing={product.focused === 'name'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
        </ProductImageSegment>
        <ProductImageSegment>
          <PriceField isEditing={product.focused === 'price'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
        </ProductImageSegment>
        <ProductImageSegment>
          <DescriptionField isEditing={product.focused === 'description'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
        </ProductImageSegment>
      </div>
    </div>
  :
    <ProductSidebar>
      <div className='edit-product-container' style={{ background: getBackground(product) }}>
          {product.isCropperOpen ?
            <ImageCropper isOpen={product.isCropperOpen} image={product.imagePreview} uploadImage={img => uploadEditProductImage(img, product, user)} closeCropper={closeEditProductCropper} />
            :
            <AvatarField className='product-image-underlay' product={product} openEditProductCropper={img => openEditProductCropper(img[0])} onUploadEditProductImageFailure={onUploadEditProductImageFailure} />
          }
        <div style={{ display: 'flex', width: '100%', pointerEvents: 'none', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <ProductImageSegment>
            <NameField isEditing={product.focused === 'name'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
          </ProductImageSegment>
          <ProductImageSegment>
            <PriceField isEditing={product.focused === 'price'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
          </ProductImageSegment>
          <ProductImageSegment>
            <DescriptionField isEditing={product.focused === 'description'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
          </ProductImageSegment>
        </div>
      </div>
      <ProductAdminMenu PublicField={<PublicField product={product} user={user} editProduct={editProduct} style={{ position: 'absolute', left: '25px' }} />} />
    </ProductSidebar>

const ConnectedAdminGridView = reduxForm({
  form: 'editProduct',
  validate
})(AdminGridView)

const mapStateToProps = ({ user, products }) =>
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
  editProductField: field => dispatch(editProductField(field)),
  openEditProductCropper: img => dispatch(openEditProductCropper(img)),
  closeEditProductCropper: () => dispatch(closeEditProductCropper()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedAdminGridView)
