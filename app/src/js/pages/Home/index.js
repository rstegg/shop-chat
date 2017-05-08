import React from 'react'

import { Card } from 'semantic-ui-react'

import RouterButton from '../../elements/RouterButton'

const Home = () =>
  <Card className='products'>
    <Card.Content>
      <Card.Header>Shop App</Card.Header>
    </Card.Content>
    <Card.Content>
      Shop. Chat. Stuff.
    </Card.Content>
    <Card.Content extra>
      <RouterButton to='/shops/new' from='/' label='start a shop' />
    </Card.Content>
  </Card>

export default Home
