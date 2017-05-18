import React from 'react'
import moment from 'moment'

import AcceptedOffer from './Log/Offer/Accepted'
import RejectedOffer from './Log/Offer/Rejected'
import PendingOffer from './Log/Offer/Pending'
import TextMessage from './Log/Message'

import { propEq } from 'ramda'

const sameUsername = propEq('username')

const ChatMessages = messages => {
  //FIXME: this function uses a map to calculate an accumulation of time differences between messages
  // Show user info (username, avatar and timestamp) if:
  // usernames are different between messages, OR if 15 seconds has passed between showing user info
  let timeAcc = 0
  const renderedMessages = messages.map((message, i) => {
    if(message.is_offer) {
      switch(message.state) {
        case 'accepted':
          return <AcceptedOffer key={i} offer={message} />
        case 'rejected':
          return <RejectedOffer key={i} offer={message} />
        case 'open':
        default:
          return <PendingOffer key={i} offer={message} />
      }
    }
    const prevMessage = messages[i-1]
    let shouldShow = true
      if(sameUsername(message.username, prevMessage) && !prevMessage.is_offer) {
        shouldShow = false
        const timeDiff = moment.duration(moment(prevMessage.timestamp).diff(moment(message.timestamp)))
        timeAcc += Math.abs(timeDiff.asMilliseconds())
        if(timeAcc >= 15000) {
          shouldShow = true
          timeAcc = 0
        }
      }
      if(shouldShow) {
        return <TextMessage key={i} message={message} withUserInfo />
      }
    return <TextMessage key={i} message={message} />
  })
  return renderedMessages
}

export default ChatMessages
