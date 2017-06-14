import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { replace } from 'react-router-redux'
import { path } from 'ramda'

import AdminGridView from './Layout/Grid/AsOwner'
import UserGridView from './Layout/Grid/AsUser'
import AdminImageView from './Layout/Image/AsOwner'
import UserImageView from './Layout/Image/AsUser'
import AdminGalleryView from './Layout/Gallery/AsOwner'
import UserGalleryView from './Layout/Gallery/AsUser'

import { fetchSingleProduct } from 'actions/products'

const getName = path(['name'])
const getSlug = path(['slug'])
const getShopSlug = path(['shop', 'slug'])

class ViewProduct extends Component {
  componentWillMount() {
    const { match: { params }, user, product, fetchSingleProduct, isFetchingProduct } = this.props
    if(!!product && product.slug !== params.productId && isFetchingProduct !== params.productId) {
      fetchSingleProduct(params.productId, params.shopId, user)
    }
  }
  componentWillUpdate(nextProps) {
    const { match: { params }, user, product, fetchSingleProduct, redirectToNewProduct, isFetchingProduct } = this.props
    if(!!product && product.slug !== params.productId && isFetchingProduct !== params.productId) {
      console.log("[ViewProduct/componentWillUpdate] If you see this in console, then this block might be useful")
      fetchSingleProduct(params.productId, params.shopId, user)
    }
    const nextProduct = nextProps.product
    if(getName(nextProduct) !== getName(product)) {
      redirectToNewProduct(getShopSlug(nextProduct), getSlug(nextProduct))
    }
  }
  render() {
    const { match: { params }, product, user } = this.props
    if(!product) {
      return <Redirect to={`/shop/${params.shopId}`} />
    }
    if(product.isAdmin) {
      const adminViewProps = { product, user }
      switch(product.layout) {
        case 'image':
          return <AdminImageView {...adminViewProps} />
        case 'gallery':
          return <AdminGalleryView {...adminViewProps} />
        case 'grid':
        default:
          return <AdminGridView {...adminViewProps} />
      }
    }
    const userViewProps = { product, user }
    switch(product.layout) {
      case 'image':
        return <UserImageView {...userViewProps} />
      case 'gallery':
        return <UserGalleryView {...userViewProps} />
      case 'grid':
      default:
        return <UserGridView {...userViewProps} />
    }
  }
}

const mapStateToProps = ({products, shops, orders, user}) =>
({
  product: products.current,
  isFetchingProduct: products.isFetching,
  shop: shops.current,
  user,
  orders
})

const mapDispatchToProps = dispatch =>
({
  fetchSingleProduct: (productId, shopId, user) => dispatch(fetchSingleProduct(productId, shopId, user)),
  redirectToNewProduct: (shopSlug, productSlug) => dispatch(replace(`/shop/${shopSlug}/product/${productSlug}`))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProduct)
