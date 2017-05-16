import React from 'react'
import { NavLink } from 'react-router-dom'
import moment from 'moment'
import { Comment } from 'semantic-ui-react'

const CommentWithUser = ({ message }) =>
  <Comment>
    <Comment.Avatar src={message.avatar || '/images/placeholder.png'} />
    <Comment.Content>
      <Comment.Author as={NavLink} to={`/user/${message.username}`}>{message.username}</Comment.Author>
      <Comment.Metadata>
        <div>{moment(message.timestamp).fromNow()}</div>
      </Comment.Metadata>
      <Comment.Text>{message.text}</Comment.Text>
    </Comment.Content>
  </Comment>

export default CommentWithUser
