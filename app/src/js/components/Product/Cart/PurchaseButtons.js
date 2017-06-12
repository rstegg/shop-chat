import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { times } from 'ramda'

import { Button, Dropdown, Divider, Menu, Segment } from 'semantic-ui-react'

import { productSetQuantity, productAddToCart, productBuyNow } from 'actions/orders'

const options = times(n => ({ key: n, text: String(n), value: n }), 30)

const QuantityDropdown = ({value, onChange}) =>
  <Dropdown
    value={value}
    onChange={(_,data) => {
      onChange(data.value)
    }}
    options={options} />

const PurchaseButtons = ({product, productSetQuantity, productAddToCart, productBuyNow}) =>
  <Segment compact style={{width: '100%'}}>
    Qty: <QuantityDropdown value={product.purchasingQuantity} onChange={quantity => productSetQuantity(product, quantity)} />
    <Divider />
    <Button.Group fluid vertical>
      <Button basic color='green' as={NavLink} to='/checkout/review' type='button'  onClick={() => productBuyNow(product)} style={{justifyContent: 'center'}}>Buy now</Button>
      <Divider />
      <Button basic color='orange' onClick={() => productAddToCart(product)} style={{justifyContent: 'center'}}>Add to cart</Button>
    </Button.Group>
  </Segment>

const mapStateToProps = ({products}) =>
({
  product: products.current
})

const mapDispatchToProps = dispatch =>
({
  productSetQuantity: (product, quantity) => dispatch(productSetQuantity(product, quantity)),
  productAddToCart: product => dispatch(productAddToCart(product)),
  productBuyNow: product => dispatch(productBuyNow(product))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchaseButtons)
