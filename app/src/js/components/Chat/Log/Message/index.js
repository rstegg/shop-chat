import React, { Component } from 'react'

import CommentWithUser from './WithUser'
import CommentWithoutUser from './WithoutUser'

class TextMessage extends Component {
  render() {
    const { message, withUserInfo } = this.props
    if(withUserInfo) {
      return <CommentWithUser message={message} />
    }
    return <CommentWithoutUser message={message} />
  }
}

export default TextMessage
