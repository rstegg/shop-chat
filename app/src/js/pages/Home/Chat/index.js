import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'

import { reset } from 'redux-form'

import { Card, Comment } from 'semantic-ui-react'

import HomeChatForm from './form'
import HomeChatMessages from './log'

import { sendMessage, fetchMessages } from 'actions/chat'

class HomeChat extends Component {
  componentWillMount() {
    const { fetchMessages, user } = this.props
    fetchMessages(user)
  }
  scrollEnd() {
    const node = findDOMNode(this.messagesEnd)
    node.scrollIntoView({behavior: "smooth"})
  }
  componentDidMount() {
    this.scrollEnd()
  }
  componentDidUpdate() {
    this.scrollEnd()
  }
  render() {
    const { user, chat, sendMessage, clearHomeChat } = this.props
    return (
      <Card className='chat__container'>
        <Card.Content>
          <Card.Header>Shop App</Card.Header>
        </Card.Content>
        <Card.Content>
          <Comment.Group>
          { !!chat.messages.length && HomeChatMessages(chat.messages) }
            <div className='chat-scroll' ref={el => this.messagesEnd = el}></div>
          </Comment.Group>
        </Card.Content>
        <Card.Content extra>
          <HomeChatForm onSubmit={v => {
            if(!!v.text) {
              sendMessage(v.text, user)
              clearHomeChat()
            }
          }} />
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = ({user, chat}) =>
({
  user,
  chat
})

const mapDispatchToProps = dispatch =>
({
  fetchMessages: user => dispatch(fetchMessages(user)),
  sendMessage: (msg, user) => dispatch(sendMessage(msg, user)),
  clearHomeChat: () => dispatch(reset('sendHomeChatMessage'))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeChat)
