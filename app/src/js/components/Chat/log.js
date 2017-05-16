import React from 'react'
import moment from 'moment'

import AcceptedOffer from './Log/Offer/Accepted'
import RejectedOffer from './Log/Offer/Rejected'
import PendingOffer from './Log/Offer/Pending'
import TextMessage from './Log/Message'

// FIXME: Commented for importance
// export default messages => {
//   //FIXME: this function uses a map to calculate an accumulation of time differences between messages
//   // Show user info (username, avatar and timestamp) if:
//   // usernames are different between messages, OR if 15 seconds has passed between showing user info
//   let timeAcc = 0
//   const renderedMessages = messages.map((message, i) => {
//     const prevMessage = messages[i-1]
//     let shouldShow = true
//       if(prevMessage && prevMessage.username === message.username) {
//         shouldShow = false
//         const timeDiff = moment.duration(moment(prevMessage.timestamp).diff(moment(message.timestamp)))
//         timeAcc += Math.abs(timeDiff.asMilliseconds())
//         if(timeAcc >= 15000) {
//           shouldShow = true
//           timeAcc = 0
//         }
//       }
//       if(shouldShow) {
//         return (
//           <Comment key={i}>
//             <Comment.Avatar src={message.avatar || '/images/placeholder.png'} />
//             <Comment.Content>
//               <Comment.Author as={NavLink} to={`/user/${message.username}`}>{message.username}</Comment.Author>
//               <Comment.Metadata>
//                 <div>{moment(message.timestamp).fromNow()}</div>
//               </Comment.Metadata>
//               <Comment.Text>{message.text}</Comment.Text>
//             </Comment.Content>
//           </Comment>
//         )
//       }
//       return (
//         <Comment key={i}>
//           <Comment.Avatar />
//           <Comment.Content>
//             <Comment.Text>{message.text}</Comment.Text>
//           </Comment.Content>
//         </Comment>
//       )
//   })
//   return renderedMessages
// }

const ChatMessages = messages => {
  //FIXME: this function uses a map to calculate an accumulation of time differences between messages
  // Show user info (username, avatar and timestamp) if:
  // usernames are different between messages, OR if 15 seconds has passed between showing user info
  let timeAcc = 0
  const renderedMessages = messages.map((message, i) => {
    if(message.is_offer) {
      if(message.state === 'accepted') {
        return <AcceptedOffer key={i} offer={message} />
      }
      if(message.state === 'rejected') {
        return <RejectedOffer key={i} offer={message} />
      }
      if(message.state === 'open') {
        return <PendingOffer key={i} offer={message} />
      }
    }
    const prevMessage = messages[i-1]
    let shouldShow = true
      if(prevMessage && prevMessage.username === message.username) {
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
