export const sendMessage = (text, user) =>
({
  type: 'WS/SEND_HOME_CHAT_MESSAGE',
  payload: {
    text,
    user
  }
})

export const sendRoomChatMessage = (text, user, threadId) =>
({
  type: 'WS/SEND_ROOM_CHAT_MESSAGE',
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

export const fetchMessages = user =>
({
  type: 'WS/FETCH_HOME_CHAT_MESSAGES',
  payload: {
    user
  }
})

export const fetchRoomChatMessages = (user, shop) =>
({
  type: 'WS/FETCH_ROOM_CHAT_MESSAGES',
  payload: {
    user
  }
})

export const joinChatRoom = (threadId, user) =>
({
  type: 'WS/JOIN_ROOM',
  payload: {
    threadId,
    user
  }
})
