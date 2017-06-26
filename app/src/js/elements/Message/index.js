import React from 'react'

const Message = ({header, content}) =>
  <article class='message'>
    <div class='message-header'>
      <p><strong>{header}</strong></p>
    </div>
    <div class='message-body'>
      {content}
    </div>
  </article>

Message.Error = ({header, content}) =>
  <article class='message is-danger'>
    <div class='message-header'>
      <p><strong>{header}</strong></p>
    </div>
    <div class='message-body'>
      {content}
    </div>
  </article>

export default Message
