import React from 'react'
import { connect } from 'react-redux'

import { NavLink } from 'react-router-dom'
import moment from 'moment'
import { Button, Card, Image } from 'semantic-ui-react'

import { approveOffer, rejectOffer } from 'actions/chat' //TODO[ACTION] actions/offer

const AdminView = ({ offer, user }) =>
  <Card>
    <Card.Content>
      <Image floated='left' size='mini' src={offer.avatar || '/images/placeholder.png'} />
      <Card.Header as={NavLink} to={`/user/${offer.username}`}>
        { offer.username }
      </Card.Header>
      <Card.Meta>
        {moment(offer.timestamp).fromNow()}
      </Card.Meta>
      <Card.Description>
        Offer for {offer.product_name} at <strong>{offer.price}</strong>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <div className='ui two buttons'>
        <Button basic color='green' onClick={() => approveOffer(offer.id, user)}>Approve</Button>
        <Button basic color='red' onClick={() => rejectOffer(offer.id, user)}>Decline</Button>
      </div>
    </Card.Content>
  </Card>

const mapStateToProps = ({user}) =>
({
  user
})

const mapDispatchToProps = dispatch =>
({
  approveOffer: (offerId, user) => dispatch(approveOffer(offerId, user)),
  rejectOffer: (offerId, user) => dispatch(rejectOffer(offerId, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminView)
