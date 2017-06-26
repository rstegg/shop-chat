import React from 'react'

const MessageWithoutUserInfo = ({ message }) =>
  <article className="media">
    {message.text}
  </article>

export default MessageWithoutUserInfo
