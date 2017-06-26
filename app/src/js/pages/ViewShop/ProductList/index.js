import React, { Component } from 'react'
import { connect } from 'react-redux'
import { path } from 'ramda'

import Card from 'elements/Card'
import ProductList from './list'
import RouterButton from 'elements/Button/RouterButton'

import { fetchProducts, refreshProducts } from 'actions/products'

const getId = path(['id'])

class Products extends Component {
  componentWillMount() {
    const { user, shop, products, refreshProducts, fetchProducts } = this.props
    refreshProducts()
    if(getId(shop) && products.fetchable) {
      fetchProducts(shop.id, user)
    }
  }
  componentWillUpdate(nextProps) {
    const { user, shop, products, fetchProducts } = nextProps
    if(getId(shop) && products.fetchable) {
      console.log("[ProductList/componentWillUpdate] componentWillUpdate checking necessary to fetch all products with shop.id and not shop.slug [params.shopId === shop.slug]")
      fetchProducts(getId(shop), user)
    }
  }
  render() {
    const { products, shop, user } = this.props
    return (
      <Card className='products'>
        <Card.Title>Products</Card.Title>
        <Card.Content>
          <ProductList
            products={products.list}
          />
        </Card.Content>
        {
          shop.userId === user.id &&
          <Card.Footer>
            <Card.Action>
              <RouterButton to={`/shop/${shop.slug}/products/new`} label='new product' />
            </Card.Action>
          </Card.Footer>
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
