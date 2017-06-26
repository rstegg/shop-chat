import React from 'react'
import { connect } from 'react-redux'

import Card from 'elements/Card'

const Home = ({user}) =>
  <Card>
    <Card.Content>
      <Card.Header>Shop App</Card.Header>
    </Card.Content>
    <Card.Content>
      Shop. Chat. Stuff.
    </Card.Content>
  </Card>


const mapStateToProps = ({user}) =>
({
  user
})

export default connect(
  mapStateToProps
)(Home)
