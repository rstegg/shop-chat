import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card } from 'semantic-ui-react'
import ShopsList from './list'
import RouterButton from '../../elements/RouterButton'

import { fetchShops, setCurrentShop, refreshShops } from '../../redux/actions/shops'

class Shops extends Component {
  componentDidMount() {
    if(this.props.user.isAuthenticated) {
      this.props.fetchShops(this.props.user)
      this.props.refreshShops()
    }
  }
  render() {
    const { shops, setCurrentShop } = this.props
    if(!this.props.user.isAuthenticated) {
      return <Redirect to='/login' from='/shops' />
    }
    return (
      <Card className='products'>
        <Card.Content className='card__list'>
          <Card.Header>Shops</Card.Header>
          <Card.Description>
            <ShopsList
              shops={shops}
              setCurrentShop={setCurrentShop}
             />
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <RouterButton to='/pages/new' from='/shops' label='start a shop' />
        </Card.Content>
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
  setCurrentShop: shop => dispatch(setCurrentShop(shop)),
  refreshShops: () => dispatch(refreshShops()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Shops)
