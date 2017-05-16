import React, { Component } from 'react'
import { connect } from 'react-redux'

import AdminView from './AsOwner'
import UserView from './AsUser'

import { fetchPendingOffer } from 'actions/chat'

class PendingOffer extends Component {
  componentWillMount() {
    const { message, user } = this.props
    this.props.fetchPendingOffer(message, user)
  }
  render() {
    const { message, user } = this.props
    if(message.userId === user.id) {
      return <AdminView />
    }
    return <UserView />
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
