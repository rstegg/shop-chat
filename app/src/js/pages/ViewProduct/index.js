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
  render() {
    const { product, user } = this.props
    if(!product) {
      return <Redirect to='/' />
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
