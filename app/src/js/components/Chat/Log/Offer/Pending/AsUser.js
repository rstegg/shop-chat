import React from 'react'
import { NavLink } from 'react-router-dom'
import moment from 'moment'
import { Card, Image } from 'semantic-ui-react'

const UserView = ({ offer }) =>
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
        Offer for {offer.product_name} at <strong>{offer.price}</strong>
      </Card.Description>
    </Card.Content>
  </Card>

export default UserView
