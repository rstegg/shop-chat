import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { prop } from 'ramda'

import AdminView from './AsOwner'
import UserView from './AsUser'

import { fetchSingleShop, switchToShopAdmin } from 'actions/shops'

const getShopSlug = prop('slug')
const getShopId = prop('shopId')

class ViewShop extends Component {
  componentWillMount() {
    const { match: { params }, user, shop, fetchSingleShop, isFetching } = this.props
    if (getShopSlug(shop) !== getShopId(params) && isFetching !== getShopId(params)) {
      fetchSingleShop(getShopId(params), user)
    }
  }
  componentWillUpdate(nextProps) {
    const { match: { params }, user, shop, fetchSingleShop, isFetching } = nextProps
    if (getShopSlug(shop) !== getShopId(params) && isFetching !== getShopId(params)) {
      console.log("[ViewShop/componentWillUpdate] If you see this in console, then this block is useful")
      fetchSingleShop(params.shopId, user)
    }
  }
  render() {
    const { shop, isFetching, children } = this.props
    if (!shop && !isFetching) {
      return <Redirect to='/' />
    }
    const Hoc = shop.isAdmin ? AdminView : UserView
    return (
      <Hoc {...this.props} >
        {children}
      </Hoc>
    )
  }
}

const mapStateToProps = ({shops, user}) =>
({
  shop: shops.current,
  isFetching: shops.isFetching,
  user
})

const mapDispatchToProps = dispatch =>
({
  fetchSingleShop: (shopId, user) => dispatch(fetchSingleShop(shopId, user)),
  switchToShopAdmin: () => dispatch(switchToShopAdmin()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewShop)
