import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { push } from 'react-router-redux'
import { path } from 'ramda'

import ProductSidebar from 'components/Sidebar'

import AdminGridView from './Layout/Grid/AsOwner'
import UserGridView from './Layout/Grid/AsUser'
import AdminImageView from './Layout/Image/AsOwner'
import UserImageView from './Layout/Image/AsUser'
import AdminGalleryView from './Layout/Gallery/AsOwner'
import UserGalleryView from './Layout/Gallery/AsUser'

import { fetchSingleProduct } from 'actions/products'

const getName = path([ 'name' ])
const getSlug = path([ 'slug' ])
const getProductId = path([ 'productId' ])
const getUsername = path([ 'username' ])

class ViewProduct extends Component {
  componentWillMount() {
    const { match: { params }, user, product, fetchSingleProduct, isFetchingProduct } = this.props
    if (getSlug(product) !== getProductId(params) && isFetchingProduct !== getProductId(params)) {
      fetchSingleProduct(params.productId, params.username, user)
    }
  }
  componentWillUpdate(nextProps) {
    const { user, product, fetchSingleProduct, redirectToNewProduct, isFetchingProduct } = this.props
    const { match: { params } } = nextProps
    if (getSlug(product) !== getProductId(params) && isFetchingProduct !== getProductId(params)) {
      fetchSingleProduct(params.productId, params.username, user)
    }
    const nextProduct = nextProps.product
    if (getName(nextProduct) !== getName(product)) {
      redirectToNewProduct(getUsername(nextProduct), getSlug(nextProduct))
    }
  }
  render() {
    const { match: { params }, product } = this.props
    if (!product.name) {
      return <Redirect to={`/user/${params.username}`} />
    }
    let ProductView
    if (product.isAdmin) {
      switch (product.layout) {
      case 'image':
        ProductView = AdminImageView
        break
      case 'gallery':
        ProductView = AdminGalleryView
        break
      case 'grid':
      default:
        ProductView = AdminGridView
        break
      }
      return <ProductSidebar> <ProductView {...this.props} /> </ProductSidebar>
    }
    switch (product.layout) {
    case 'image':
      ProductView = UserImageView
      break
    case 'gallery':
      ProductView = UserGalleryView
      break
    case 'grid':
    default:
      ProductView = UserGridView
      break
    }
    return <ProductView {...this.props} />
  }
}

const mapStateToProps = ({ products, orders, user }) =>
({
  product: products.current,
  isFetchingProduct: products.isFetching,
  user,
  orders
})

const mapDispatchToProps = dispatch =>
({
  fetchSingleProduct: (productId, username, user) => dispatch(fetchSingleProduct(productId, username, user)),
  redirectToNewProduct: (username, slug) => dispatch(push(`/user/${username}/product/${slug}`))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProduct)
