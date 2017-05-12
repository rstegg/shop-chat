import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import AdminView from './AsOwner'
import UserView from './AsUser'

import { fetchSingleShop, deleteShop, joinShop } from '../../redux/actions/shops'
import { joinChatRoom } from '../../redux/actions/chat'

class ViewShop extends Component {
  componentWillMount() {
    const { match: { params }, user } = this.props
    this.props.fetchSingleShop(params.id, user)
    this.props.joinChatRoom(params.id, user) //TODO: save chat rooms in postgres, check against it
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
  user
})

const mapDispatchToProps = dispatch =>
({
  fetchSingleShop: (shopId, user) => dispatch(fetchSingleShop(shopId, user)),
  deleteShop: (shopId, user) => dispatch(deleteShop(shopId, user)),
  joinShop: (shopId, user) => dispatch(joinShop(shopId, user)),
  joinChatRoom: (roomId, user) => dispatch(joinChatRoom(roomId, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewShop)
