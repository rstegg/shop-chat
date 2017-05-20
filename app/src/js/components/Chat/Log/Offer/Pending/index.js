import React from 'react'
import { connect } from 'react-redux'

import AdminView from './AsOwner'
import UserView from './AsUser'

const PendingOffer = ({offer, user}) =>
    offer.offer && offer.offer.seller_id === user.id ?
      <AdminView offer={offer} />
    :
      <UserView offer={offer} />

const mapStateToProps = ({user}) =>
({
  user
})

export default connect(mapStateToProps)(PendingOffer)
