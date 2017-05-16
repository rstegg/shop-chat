import React, { Component } from 'react'
import { connect } from 'react-redux'

import AdminView from './AsOwner'
import UserView from './AsUser'

import { fetchPendingOffer } from 'actions/chat'

class PendingOffer extends Component {
  render() {
    const { offer, user } = this.props
    if(parseInt(offer.sellerId) === user.id) { //TODO: figure out why it's a string when it's initially sent?
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
