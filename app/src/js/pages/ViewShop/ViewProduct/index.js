import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import AdminGridView from './Layout/Grid/AsOwner'
import UserGridView from './Layout/Grid/AsUser'
import AdminImageView from './Layout/Image/AsOwner'
import UserImageView from './Layout/Image/AsUser'
import AdminGalleryView from './Layout/Gallery/AsOwner'
import UserGalleryView from './Layout/Gallery/AsUser'

import { fetchSingleProduct, switchToProductAdmin } from 'actions/products'

class ViewProduct extends Component {
  componentWillMount() {
    const { match: { params }, user, product, fetchSingleProduct, isFetchingProduct } = this.props
    if(!!product && product.slug !== params.productId && isFetchingProduct !== params.productId) {
      fetchSingleProduct(params.productId, params.shopId, user)
    }
  }
  componentWillUpdate() {
    const { match: { params }, user, product, fetchSingleProduct, isFetchingProduct } = this.props
    if(!!product && product.slug !== params.productId && isFetchingProduct !== params.productId) {
      console.log("[ViewProduct/componentWillUpdate] If you see this in console, then this block might be useful")
      fetchSingleProduct(params.productId, params.shopId, user)
    }
  }
  render() {
    const { match: { params }, product, user, switchToProductAdmin } = this.props
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
    const userViewProps = { product, user, switchToProductAdmin }
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

const mapStateToProps = ({products, user, shops}) =>
({
  product: products.current,
  isFetchingProduct: products.isFetching,
  shop: shops.current,
  user,
})

const mapDispatchToProps = dispatch =>
({
  fetchSingleProduct: (productId, shopId, user) => dispatch(fetchSingleProduct(productId, shopId, user)),
  switchToProductAdmin: () => dispatch(switchToProductAdmin()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProduct)
