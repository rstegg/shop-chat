export const leaveChatThread = (threadId, user) =>
({
  type: 'WS/LEAVE_THREAD',
  payload: {
    threadId,
    user
  }
})

export const sendThreadChatMessage = (text, user, threadId) =>
({
  type: 'WS/SEND_THREAD_CHAT_MESSAGE',
  payload: {
    text,
    user,
    threadId
  }
})

export const openOffer = () =>
({
  type: 'OPEN_OFFER_WINDOW',
})

export const closeOffer = () =>
({
  type: 'CLOSE_OFFER_WINDOW',
})

export const sendOffer = (productId, price, threadId, user) =>
({
  type: 'WS/SEND_SHOP_OFFER',
  payload: {
    productId,
    price,
    threadId,
    user
  }
})

export const acceptOffer = (offer, user) =>
({
  type: 'WS/ACCEPT_OFFER',
  payload: {
    offer: offer.offer,
    threadId: offer.threadId,
    user
  }
})

export const rejectOffer = (offer, user) =>
({
  type: 'WS/REJECT_OFFER',
  payload: {
    offer: offer.offer,
    threadId: offer.threadId,
    user
  }
})

export const fetchThreadChatMessages = (user, shop) =>
({
  type: 'WS/FETCH_THREAD_CHAT_MESSAGES',
  payload: {
    user
  }
})

export const joinChatThread = (threadId, user) =>
({
  type: 'WS/JOIN_THREAD',
  payload: {
    threadId,
    user
  }
})
