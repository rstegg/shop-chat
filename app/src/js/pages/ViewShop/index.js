import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { path } from 'ramda'

import ShopAdminMenu from 'components/ShopAdminMenu'

import AdminView from './AsOwner'
import UserView from './AsUser'

import { fetchSingleShop, switchToShopAdmin } from 'actions/shops'

const getShopSlug = path(['slug'])

class ViewShop extends Component {
  componentWillMount() {
    const { match: { params }, user, fetchSingleShop } = this.props
    fetchSingleShop(params.shopId, user)
  }
  componentWillUpdate(nextProps) {
    const { match: { params }, user, shop, fetchSingleShop, isFetching } = nextProps
    if(!!shop && getShopSlug(shop) !== params.shopId && isFetching !== params.shopId) {
      console.log("[ViewShop/componentWillUpdate] If you see this in console, then this block is useful")
      fetchSingleShop(params.shopId, user)
    }
  }
  render() {
    const { product, shop, user, children, switchToShopAdmin } = this.props
    if(!shop) {
      return <Redirect to='/' />
    }
    if(shop.isAdmin) {
      const adminViewProps = { shop, user }
      return (
        <AdminView {...adminViewProps} >
          {children}
          <ShopAdminMenu />
        </AdminView>
      )
    }
    let userViewProps = { shop, user }
    if(shop.userId === user.id) {
      userViewProps = { shop, user, switchToShopAdmin }
    }
    return (
      <UserView {...userViewProps} >
        {children}
      </UserView>
    )
  }
}

const mapStateToProps = ({shops, products, user}) =>
({
  shop: shops.current,
  product: products.current,
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
