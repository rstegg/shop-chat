import React from 'react'
import { NavLink } from 'react-router-dom'
import moment from 'moment'
import { Card, Image, Message } from 'semantic-ui-react'

const RejectedOffer = ({ offer }) =>
<Card>
  <Card.Content>
    <Image floated='left' size='mini' src={offer.avatar || '/images/placeholder.png'} />
    <Card.Header as={NavLink} to={`/user/${offer.username}`}>
      {offer.username}
    </Card.Header>
    <Card.Meta>
      {moment(offer.timestamp).fromNow()}
    </Card.Meta>
    <Card.Description>
      <Message info>
        <Message.Header style={{textAlign: 'center'}}>Offer rejected 😲</Message.Header>
        <p style={{textAlign: 'center'}}>Offer for <strong>{offer.product_name}</strong> at <strong style={{textDecoration: 'line-through'}}>${offer.price}</strong></p>
      </Message>
    </Card.Description>
  </Card.Content>
</Card>

export default RejectedOffer
