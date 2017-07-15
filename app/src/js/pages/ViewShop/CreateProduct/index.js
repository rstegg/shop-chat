import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom'

import { Button, Grid, Segment, Image, Label, Dimmer, Loader } from 'semantic-ui-react'
import CreateProductForm from './form'

import { createProduct, openCreateProductCropper, closeCreateProductCropper, uploadProductImage, onUploadProductImageFailure } from 'actions/products'

import Dropzone from 'components/Dropzone'
import ImageCropper from 'components/ImageCropper'

const tagsArray = tags => tags.split(' ')

const Avatar = ({product, openCropper, onUploadProductImageFailure}) =>
  <Dropzone className='ui image editable avatar-image' onDropAccepted={openCropper} onDropRejected={onUploadProductImageFailure}>
    {product.imageLoading && <Dimmer active><Loader /></Dimmer>}
    <Image src={product.image || '/images/productholder.png'} />
    {product.imageError && <Label basic color='red'>Invalid image</Label>}
  </Dropzone>

class CreateProduct extends Component {
  render() {
    const { user, shop, product, createProduct, openCreateProductCropper, closeCreateProductCropper, uploadProductImage, onUploadProductImageFailure } = this.props
    if (!user.isAuthenticated) {
      return <Redirect to='/login' />
    }
    if (product.isCreated || user.id !== shop.userId) {
      return <Redirect to={`/shop/${shop.slug}`} />
    }
    return (
      <Grid celled='internally' className='product-container'>
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
          <CreateProductForm onSubmit={values => createProduct(({...values, tags: tagsArray(values.tags), image: product.image}), shop.id, user)} />
          <Button basic color='red' as={NavLink} to={`/shop/${shop.slug}`}>Cancel</Button>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = ({user, shops, products}) =>
({
  user,
  shop: shops.current,
  product: products.new
})

const mapDispatchToProps = dispatch =>
({
  createProduct: (product, shopId, user) => dispatch(createProduct(product, shopId, user)),
  uploadProductImage: (img, user) => dispatch(uploadProductImage(img, user)),
  onUploadProductImageFailure: () => dispatch(onUploadProductImageFailure()),
  openCreateProductCropper: img => dispatch(openCreateProductCropper(img)),
  closeCreateProductCropper: () => dispatch(closeCreateProductCropper()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateProduct)
