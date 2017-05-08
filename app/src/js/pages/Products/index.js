import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card } from 'semantic-ui-react'
import ProductsList from './list'
import RouterButton from '../../elements/RouterButton'

import { fetchProducts, refreshProducts, setCurrentProduct } from '../../redux/actions/products'

class Products extends Component {
  componentDidMount() {
    if(this.props.user.isAuthenticated) {
      this.props.fetchProducts(this.props.user)
    }
    this.props.refreshProducts()
  }
  render() {
    const { products, setCurrentProduct, user } = this.props
    if(!user.isAuthenticated) {
      return <Redirect to="/login" from="/products" />
    }
    return (
      <Card className='products'>
        <Card.Content>
          <Card.Header>Products</Card.Header>
        </Card.Content>
        <Card.Content>
            <ProductsList
              products={products.list}
              setCurrentProduct={setCurrentProduct}
            />
        </Card.Content>
        <Card.Content extra>
          <RouterButton to='/products/new' from='/products' label='start a product' />
        </Card.Content>
      </Card>
    )
  }
}
const mapStateToProps = ({products, user}) =>
({
  products,
  user
})

const mapDispatchToProps = dispatch =>
({
  fetchProducts: user => dispatch(fetchProducts(user)),
  refreshProducts: () => dispatch(refreshProducts()),
  setCurrentProduct: Product => dispatch(setCurrentProduct(Product)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Products)
