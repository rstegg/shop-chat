import React from 'react'
import { NavLink } from 'react-router-dom'
import moment from 'moment'

const MessageWithUserInfo = ({ message }) =>
  <article className="media">
    <figure className="media-left">
      <p className="image is-64x64">
        <img src={message.user && (message.user.image || '/images/placeholder.png')} />
      </p>
    </figure>
    <div className="media-content">
      <div className="content">
        <p>
          <strong>
            {message.user && <NavLink to={`/user/${message.user.username}`}>{message.user.username}</NavLink>}
          </strong>
          <small>
            &nbsp;·&nbsp;{moment(message.createdAt).fromNow()}
          </small>
          <br />
          {message.text}
          <br />
        </p>
      </div>
    </div>
  </article>

export default MessageWithUserInfo
