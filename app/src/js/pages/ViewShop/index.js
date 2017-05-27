import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import AdminView from './AsOwner'
import UserView from './AsUser'

import { fetchSingleShop, switchToShopAdmin } from 'actions/shops'

class ViewShop extends Component {
  componentWillMount() {
    const { match: { params }, fetchSingleShop, user } = this.props
    fetchSingleShop(params.id, user)
  }
  componentWillUpdate(nextProps) {
    const { shop, match: { params }, user, fetchSingleShop, isFetching } = this.props
    if(shop.slug !== params.id && isFetching !== params.id) {
      fetchSingleShop(params.id, user)
    }
  }
  render() {
    const { shop, user, switchToShopAdmin } = this.props
    if(!shop) {
      return <Redirect to='/' />
    }
    if(shop.isAdmin) {
      const adminViewProps = { shop, user }
      return <AdminView {...adminViewProps} />
    }
    let userViewProps = { shop, user }
    if(shop.userId === user.id) {
      userViewProps = { shop, user, switchToShopAdmin }
    }
    return <UserView {...userViewProps} />
  }
}

const mapStateToProps = ({shops, user}) =>
({
  shop: shops.current,
  user,
  isFetching: shops.isFetching
})

const mapDispatchToProps = dispatch =>
({
  fetchSingleShop: (shopId, user) => dispatch(fetchSingleShop(shopId, user)),
  switchToShopAdmin: () => dispatch(switchToShopAdmin())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewShop)
