import React from 'react'
import { NavLink } from 'react-router-dom'
import moment from 'moment'
import { Card, Image, Message } from 'semantic-ui-react'

// offer: { avatar, username, timestamp, product, price }

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
        <Message.Header>Offer rejected 😲</Message.Header>
        <p>Offer for {offer.product} at <strong style={{textDecoration: 'line-through'}}>${offer.price}</strong></p>
      </Message>
    </Card.Description>
  </Card.Content>
</Card>

export default RejectedOffer
