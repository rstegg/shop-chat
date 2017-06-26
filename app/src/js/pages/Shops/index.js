import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Card from 'elements/Card'
import ShopsList from './list'
import RouterButton from 'elements/Button/RouterButton'

import { fetchShops, refreshShops } from 'actions/shops'

class Shops extends Component {
  componentDidMount() {
    if(this.props.user.isAuthenticated) {
      this.props.fetchShops(this.props.user)
      this.props.refreshShops()
    }
  }
  render() {
    const { shops, user } = this.props
    if(!user.isAuthenticated) {
      return <Redirect to='/login' />
    }
    return (
      <Card className='shops'>
        <Card.Title>Shops</Card.Title>
        <Card.Content className='shops-list'>
          <ShopsList
            shops={shops}
           />
        </Card.Content>
        <Card.Footer>
          <Card.Action>
            <RouterButton to='/shops/new' label='start a shop' />
          </Card.Action>
        </Card.Footer>
      </Card>
    )
  }
}
const mapStateToProps = ({shops, user}) =>
({
  shops: shops.list,
  user
})

const mapDispatchToProps = dispatch =>
({
  fetchShops: user => dispatch(fetchShops(user)),
  refreshShops: () => dispatch(refreshShops()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Shops)
