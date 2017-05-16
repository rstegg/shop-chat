import React from 'react'
import { Comment } from 'semantic-ui-react'

const CommentWithUser = ({ message }) =>
  <Comment>
    <Comment.Avatar />
    <Comment.Content>
      <Comment.Text>{message.text}</Comment.Text>
    </Comment.Content>
  </Comment>

export default CommentWithUser
