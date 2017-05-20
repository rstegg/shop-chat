import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'

import { reset } from 'redux-form'

import { Card, Comment, Message } from 'semantic-ui-react'

import RoomChatForm from './form'
import RoomChatMessages from './log'

import { sendRoomChatMessage, fetchRoomChatMessages, joinChatRoom } from 'actions/chat'

class RoomChat extends Component {
  componentWillMount() {
    const { user, chat, room, joinChatRoom } = this.props
    if(!chat.rooms.includes(room.id)) {
      joinChatRoom(room.id, user)
    }
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
    const { user, chat, room, roomType, sendRoomChatMessage, clearRoomChat } = this.props
    return (
      <Card className='chat__container room-chat'>
        <Card.Content>
          <Card.Header>{!!room && room.name} chat</Card.Header>
        </Card.Content>
        <Card.Content>
          <Comment.Group>
          { !!chat.messages.length ?
            RoomChatMessages(chat.messages)
            : <Message info>
                <Message.Header style={{textAlign: 'center'}}>No chat activity 😞</Message.Header>
                <p style={{textAlign: 'center'}}>Share the link for others to join!</p>
              </Message>
          }
            <div className='chat-scroll' ref={el => this.messagesEnd = el}></div>
          </Comment.Group>
        </Card.Content>
        <Card.Content extra>
          <RoomChatForm
            roomType={roomType}
            onSubmit={v => {
            if(!!v.text) {
              sendRoomChatMessage(v.text, user, room.id)
              clearRoomChat()
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
  fetchRoomChatMessages: user => dispatch(fetchRoomChatMessages(user)),
  sendRoomChatMessage: (msg, user, threadId) => dispatch(sendRoomChatMessage(msg, user, threadId)),
  joinChatRoom: (threadId, user) => dispatch(joinChatRoom(threadId, user)),
  clearRoomChat: () => dispatch(reset('sendRoomChatMessage')),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomChat)
