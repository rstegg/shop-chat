import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card } from 'semantic-ui-react'
import ShopsList from './list'
import RouterButton from 'elements/Button/RouterButton'

class Shops extends Component {
  render() {
    const { profile, user } = this.props
    return (
      <Card className='profile-shops-container'>
        <Card.Content className='shops-list'>
          <Card.Header>Shops</Card.Header>
          <Card.Description>
            <ShopsList
              shops={profile.shops || []}
             />
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          { profile.id === user.id && <RouterButton to='/shops/new' label='start a shop' /> }
        </Card.Content>
      </Card>
    )
  }
}
const mapStateToProps = ({user, profile}) =>
({
  user,
  profile
})

export default connect(
  mapStateToProps,
)(Shops)
