import React, { Component } from 'react'
import { connect } from 'react-redux'

import AdminView from './AsOwner'
import UserView from './AsUser'

import { fetchPendingOffer } from 'actions/chat'

class PendingOffer extends Component {
  render() {
    const { offer, user } = this.props
    if(offer.userId === user.id) {
      return <AdminView offer={offer} />
    }
    return <UserView offer={offer} />
  }
}


const mapStateToProps = ({user}) =>
({
  user
})

const mapDispatchToProps = dispatch =>
({
  fetchPendingOffer: (message, user) => dispatch(fetchPendingOffer(message, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingOffer)
