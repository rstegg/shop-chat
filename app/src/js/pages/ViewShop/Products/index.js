import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card } from 'semantic-ui-react'
import ProductsList from './list'
import RouterButton from 'elements/RouterButton'

import { fetchProducts, refreshProducts } from 'actions/products'

class Products extends Component {
  componentWillMount() {
    const { user, shop, products, refreshProducts, fetchProducts } = this.props
    refreshProducts()
    if(user.isAuthenticated && shop.id && products.fetchable) {
      fetchProducts(shop.id, user)
    }
  }
  componentWillUpdate(nextProps) {
    const { user, fetchProducts } = this.props
    if(user.isAuthenticated && nextProps.shop.id && nextProps.products.fetchable) {
      fetchProducts(nextProps.shop.id, user)
    }
  }
  render() {
    const { products, shop, user } = this.props
    return (
      <Card className='products'>
        <Card.Content>
          <Card.Header>Products</Card.Header>
        </Card.Content>
        <Card.Content>
            <ProductsList
              products={products.list}
            />
        </Card.Content>
        {
          shop.userId === user.id &&
          <Card.Content extra>
            <RouterButton to={`/shop/${shop.slug}/products/new`} label='new product' />
          </Card.Content>
        }
      </Card>
    )
  }
}
const mapStateToProps = ({products, user, shops}) =>
({
  products,
  user,
  shop: shops.current
})

const mapDispatchToProps = dispatch =>
({
  fetchProducts: (shopId, user) => dispatch(fetchProducts(shopId, user)),
  refreshProducts: () => dispatch(refreshProducts())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Products)
