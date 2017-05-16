import React from 'react'
import { connect } from 'react-redux'

import AdminView from './AsOwner'
import UserView from './AsUser'

const PendingOffer = ({offer, user}) =>
    parseInt(offer.sellerId, 10) === user.id ?
      <AdminView offer={offer} />
    :
      <UserView offer={offer} />

const mapStateToProps = ({user}) =>
({
  user
})

export default connect(mapStateToProps)(PendingOffer)
