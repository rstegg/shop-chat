import React, { Component } from 'react'
import { connect } from 'react-redux'
import { path } from 'ramda'

import { Button, Popup } from 'semantic-ui-react'

import ShopChatMenuForm from './form'

import { sendOffer, openOffer, closeOffer } from 'actions/offers'

const getThreadId = path(['thread', 'id'])

class ShopChatMenu extends Component {
  componentWillMount() {
    this.props.closeOffer()
  }
  render() {
    const { user, products, sendOffer, offers, shop, openOffer, closeOffer } = this.props
    return (
      <Popup wide position='top right' on='click'
        trigger={<Button icon='dollar' className='offer-button' type='button' disabled={!products.list.length} />}
        open={offers.isOpen}
        onOpen={openOffer} onClose={closeOffer}>
          <Popup.Header>Make an Offer</Popup.Header>
          <Popup.Content>
            <ShopChatMenuForm
              products={products.list}
              onSubmit={values => {
                sendOffer(values.productId, values.price, getThreadId(shop), user)
                closeOffer()
              }} />
          </Popup.Content>
      </Popup>
    )
  }
}


const mapStateToProps = ({user, products, shops, offers}) =>
({
  offers,
  user,
  products,
  shop: shops.current
})

const mapDispatchToProps = dispatch =>
({
  sendOffer: (product, price, threadId, user) => dispatch(sendOffer(product, price, threadId, user)),
  openOffer: () => dispatch(openOffer()),
  closeOffer: () => dispatch(closeOffer()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopChatMenu)
