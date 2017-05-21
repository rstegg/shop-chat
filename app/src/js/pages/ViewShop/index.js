import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import AdminView from './AsOwner'
import UserView from './AsUser'

import { fetchSingleShop, deleteShop, joinShop } from 'actions/shops'

class ViewShop extends Component {
  componentWillMount() {
    const { match: { params }, user } = this.props
    this.props.fetchSingleShop(params.id, user)
  }
  componentWillUpdate(nextProps) {
    const { shop, match: { params }, user, fetchable } = this.props
    if(shop.slug !== params.id && fetchable) {
      this.props.fetchSingleShop(params.id, user)
    }
  }
  render() {
    const { shop, user, joinShop, deleteShop } = this.props
    if(!shop) {
      return <Redirect to='/' />
    }
    if(shop.userId === user.id) {
      const adminViewProps = { shop, user, deleteShop }
      return <AdminView {...adminViewProps} />
    }
    const userViewProps = { shop, user, joinShop }
    return <UserView {...userViewProps} />
  }
}

const mapStateToProps = ({shops, user}) =>
({
  shop: shops.current,
  user,
  fetchable: shops.fetchable
})

const mapDispatchToProps = dispatch =>
({
  fetchSingleShop: (shopId, user) => dispatch(fetchSingleShop(shopId, user)),
  deleteShop: (shopId, user) => dispatch(deleteShop(shopId, user)),
  joinShop: (shopId, user) => dispatch(joinShop(shopId, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewShop)
