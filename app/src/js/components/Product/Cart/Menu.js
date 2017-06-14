import React from 'react'
import { connect } from 'react-redux'
import { path } from 'ramda'

import { Button, Segment } from 'semantic-ui-react'

import SocialMenu from 'components/SocialMenu'
import PurchaseButtons from './PurchaseButtons'

import { switchToProductAdmin } from 'actions/products'

import isMobile from 'utils/isMobile'

const productUserId = path(['user', 'id'])

const ProductCartMenu = ({user, product, switchToProductAdmin}) =>
  <Segment basic className='product-cart-menu'>
    { user.id === productUserId(product) ?
        <Segment compact>
          <Button fluid basic color='yellow' onClick={switchToProductAdmin}>Edit Product</Button>
        </Segment>
      :
      <Segment compact>
        <SocialMenu url={`https://kuwau.com/product/${product.slug}`} productId={product.id} />
        <PurchaseButtons />
      </Segment>
    }
  </Segment>

const mapStateToProps = ({user, products}) =>
({
  product: products.current,
  user
})

const mapDispatchToProps = dispatch =>
({
  switchToProductAdmin: () => dispatch(switchToProductAdmin())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCartMenu)
