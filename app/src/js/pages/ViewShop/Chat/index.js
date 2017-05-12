import React, { Component } from 'react'
import { connect } from 'react-redux'

import { reset } from 'redux-form'

import { Card, Comment } from 'semantic-ui-react'

import ShopChatForm from './form'
import ShopChatMessages from './log'

import { sendShopChatMessage, fetchShopChatMessages } from '../../../redux/actions/chat'

class ShopChat extends Component {
  componentWillUpdate(nextProps) {
    if(nextProps.shop.id && !this.props.shop.id) {
      const { fetchShopChatMessages, user } = this.props
      fetchShopChatMessages(user, nextProps.shop)
    }
  }
  render() {
    const { user, chat, shop, sendShopChatMessage, clearShopChat } = this.props
    return (
      <Card>
        <Card.Content>
          <Card.Header>Shop App</Card.Header>
        </Card.Content>
        <Card.Content>
          <Comment.Group>
          { !!chat.messages.length && ShopChatMessages(chat.messages) }
          </Comment.Group>
        </Card.Content>
        <Card.Content extra>
          <ShopChatForm onSubmit={v => {
            if(!!v.text) {
              sendShopChatMessage(v.text, user, shop)
              clearShopChat()
            }
          }} />
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = ({user, chat, shops}) =>
({
  user,
  chat,
  shop: shops.current
})

const mapDispatchToProps = dispatch =>
({
  fetchShopChatMessages: user => dispatch(fetchShopChatMessages(user)),
  sendShopChatMessage: (msg, user, shop) => dispatch(sendShopChatMessage(msg, user, shop)),
  clearShopChat: () => dispatch(reset('sendShopChatMessage'))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopChat)
