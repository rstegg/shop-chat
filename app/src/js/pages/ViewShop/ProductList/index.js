import React, { Component } from 'react'
import { connect } from 'react-redux'
import { path } from 'ramda'

import { Card } from 'semantic-ui-react'
import ProductList from './list'
import RouterButton from 'elements/Button/RouterButton'

import { fetchProducts, refreshProducts } from 'actions/products'

const getId = path(['id'])

class Products extends Component {
  componentWillMount() {
    const { user, shop, products, refreshProducts, fetchProducts } = this.props
    refreshProducts()
    console.log(shop);
    if (getId(shop) && products.fetchable) {
      fetchProducts(shop.id, user)
    }
  }
  componentDidMount() {
    const { user, shop, products, refreshProducts, fetchProducts } = this.props
    refreshProducts()
    console.log(shop);
    if (getId(shop) && products.fetchable) {
      fetchProducts(shop.id, user)
    }
  }
  componentWillUpdate(nextProps) {
    const { user, shop, products, fetchProducts } = nextProps
    if (getId(shop) && products.fetchable) {
      console.log("[ProductList/componentWillUpdate] componentWillUpdate checking necessary to fetch all products with shop.id and not shop.slug [params.shopId === shop.slug]")
      fetchProducts(getId(shop), user)
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
            <ProductList
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
