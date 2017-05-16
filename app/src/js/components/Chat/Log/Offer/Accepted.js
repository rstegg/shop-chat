import React from 'react'
import { NavLink } from 'react-router-dom'
import moment from 'moment'
import { Card, Image, Message } from 'semantic-ui-react'

const AcceptedOffer = ({ offer }) =>
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
          <Message.Header>Offer accepted! 😍</Message.Header>
          <p>{offer.product} sold at <strong>{offer.price}</strong></p>
        </Message>
      </Card.Description>
    </Card.Content>
  </Card>

export default AcceptedOffer
