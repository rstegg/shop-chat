import React from 'react'
import { connect } from 'react-redux'

import { Card } from 'semantic-ui-react'
import ProductList from './list'
import RouterButton from 'elements/Button/RouterButton'

import { refreshProducts } from 'actions/products'

const Products = ({ profile, user }) =>
  <Card className='products'>
    <Card.Content>
      <Card.Header>Products</Card.Header>
    </Card.Content>
    <Card.Content>
        <ProductList
          products={profile.products}
        />
    </Card.Content>
    {
      profile.userId === user.id &&
      <Card.Content extra>
        <RouterButton to='/products/new' label='new product' />
      </Card.Content>
    }
  </Card>

const mapStateToProps = ({ user, profile }) =>
({
  user,
  profile
})

const mapDispatchToProps = dispatch =>
({
  refreshProducts: () => dispatch(refreshProducts())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products)
