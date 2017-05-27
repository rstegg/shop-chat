import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { path } from 'ramda'

import AdminView from './AsOwner'
import UserView from './AsUser'

import { fetchSingleProduct } from 'actions/products'

const productUserId = path(['user', 'id'])

class ViewProduct extends Component {
  componentWillMount() {
    const { match: { params }, fetchSingleProduct, user } = this.props
    fetchSingleProduct(params.id, params.shopId, user)
  }
  componentWillUpdate(nextProps) {
    const { match: { params }, product, user, fetchSingleProduct, isFetching } = this.props
    if(product.slug !== params.id && isFetching !== params.id) {
      fetchSingleProduct(params.id, params.shopId, user)
    }
  }
  render() {
    const { match: { params }, product, user } = this.props
    if(!product) {
      return <Redirect to={`/shop/${params.shopId}`} />
    }
    if(productUserId(product) === user.id) {
      const adminViewProps = { product, user }
      return <AdminView {...adminViewProps} />
    }
    const userViewProps = { product, user }
    return <UserView {...userViewProps} />
  }
}

const mapStateToProps = ({products, user, shop}) =>
({
  product: products.current,
  isFetching: products.isFetching,
  shop,
  user,
})

const mapDispatchToProps = dispatch =>
({
  fetchSingleProduct: (productId, shopId, user) => dispatch(fetchSingleProduct(productId, shopId, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProduct)
