import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { path } from 'ramda'

import AdminView from './AsOwner'
import UserView from './AsUser'

import { fetchSingleProduct, switchToProductAdmin } from 'actions/products'

const productUserId = path(['user', 'id'])

class ViewProduct extends Component {
  componentWillMount() {
    const { match: { params }, user, fetchSingleProduct } = this.props
    fetchSingleProduct(params.productId, params.shopId, user)
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
      return <AdminView {...adminViewProps} />
    }
    const userViewProps = { product, user, switchToProductAdmin }
    return <UserView {...userViewProps} />
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
