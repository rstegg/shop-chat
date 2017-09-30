import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Grid, Segment, Image, Label, Dimmer, Loader } from 'semantic-ui-react'
import CreateProductForm from './form'

import { createProduct, openCreateProductCropper, closeCreateProductCropper, uploadProductImage, onUploadProductImageFailure } from 'actions/products'

import Dropzone from 'components/Dropzone'
import ImageCropper from 'components/ImageCropper'

const tagsArray = tags => tags.split(' ')

const Avatar = ({ product, openCropper, onUploadProductImageFailure }) =>
  <Dropzone className='ui image editable avatar-image' onDropAccepted={openCropper} onDropRejected={onUploadProductImageFailure}>
    {product.imageLoading && <Dimmer active><Loader /></Dimmer>}
    <Image src={product.image || '/images/productholder.png'} />
    {product.imageError && <Label basic color='red'>Invalid image</Label>}
  </Dropzone>

const CreateProduct = ({
  user,
  product,
  createProduct,
  openCreateProductCropper,
  closeCreateProductCropper,
  uploadProductImage,
  onUploadProductImageFailure
}) =>
  !user.isAuthenticated ?
    <Redirect to='/login' />
  : product.isCreated ? <Redirect to={`/user/${user.username}`} />
  : <Grid celled='internally' className='product-container'>
      <Grid.Column width={6} stretched>
        <Segment basic>
          <Segment>
            {product.isCropperOpen ?
              <ImageCropper isOpen={product.isCropperOpen} image={product.imagePreview} uploadImage={img => uploadProductImage(img, user)} closeCropper={closeCreateProductCropper} />
              :
              <Avatar product={product} openCropper={img => openCreateProductCropper(img[0])} onUploadProductImageFailure={onUploadProductImageFailure} />
            }
          </Segment>
        </Segment>
      </Grid.Column>
      <Grid.Column width={10} stretched>
        <CreateProductForm
          user={user}
          onSubmit={values => createProduct(({ ...values, tags: tagsArray(values.tags), image: product.image }), user)}
        />
      </Grid.Column>
    </Grid>

const mapStateToProps = ({ user, products }) =>
({
  user,
  product: products.new
})

const mapDispatchToProps = dispatch =>
({
  createProduct: (product, user) => dispatch(createProduct(product, user)),
  uploadProductImage: (img, user) => dispatch(uploadProductImage(img, user)),
  onUploadProductImageFailure: () => dispatch(onUploadProductImageFailure()),
  openCreateProductCropper: img => dispatch(openCreateProductCropper(img)),
  closeCreateProductCropper: () => dispatch(closeCreateProductCropper()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateProduct)
