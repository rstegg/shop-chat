import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Redirect, NavLink } from 'react-router-dom'
import { Card, Image, Button, Grid } from 'semantic-ui-react'

import ProductMenu from 'components/ProductMenu'

import { fetchSingleProduct, deleteProduct } from 'actions/products'

const renderType = (price_type, price) =>
  price_type === 'fixed' ? `Price: $${price}` : 'Offers welcome'

class ViewProduct extends Component {
  componentWillMount() {
    const { match: { params }, fetchSingleProduct, user } = this.props
    fetchSingleProduct(params.id, params.shopId, user)
  }
  render() {
    const { product, user, deleteProduct } = this.props
    if(!product) {
      return <Redirect to='/' />
    }
    return (
      <Grid>
        <Grid.Column>
          <Grid.Row>
            <Card>
              <Image src={product.image || '/images/productholder.png'} className='product--image' />
              <Card.Content>
                <Card.Header>{product.name}</Card.Header>
                {product.user &&
                  <NavLink to={`/user/${product.user.username}`}>
                    started by <Image avatar src={product.user.image || '/images/placeholder.png'} /> {product.user.username}
                  </NavLink>
                }
                <Card.Meta>{renderType(product.price_type, product.price)}</Card.Meta>
                <Card.Description>{product.description}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                { product.userId === user.id &&
                  <div className='ui two buttons'>
                    <Button as={NavLink} to={`/products/edit/${product.slug}`} basic color='green'>Edit</Button>
                    <Button basic color='red' onClick={() => deleteProduct(product.id, user)}>Delete</Button>
                  </div>
                }
              </Card.Content>
            </Card>
          </Grid.Row>
          <Grid.Row>
            <ProductMenu url={`https://kuwau.com/product/${product.slug}`} productId={product.id} />
          </Grid.Row>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = ({products, user, shop}) =>
({
  product: products.current,
  user,
})

const mapDispatchToProps = dispatch =>
({
  fetchSingleProduct: (id, shopId, user) => dispatch(fetchSingleProduct(id, shopId, user)),
  deleteProduct: (id, user) => dispatch(deleteProduct(id, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProduct)
