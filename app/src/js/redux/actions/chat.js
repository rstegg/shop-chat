export const sendMessage = (text, user) =>
({
  type: 'WS/SEND_HOME_CHAT_MESSAGE',
  payload: {
    text,
    user
  }
})

export const sendRoomChatMessage = (text, user, roomId) =>
({
  type: 'WS/SEND_ROOM_CHAT_MESSAGE',
  payload: {
    text,
    user,
    roomId
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

export const sendOffer = (productId, price, roomId, user) =>
({
  type: 'WS/SEND_SHOP_OFFER',
  payload: {
    productId,
    price,
    roomId,
    user
  }
})

export const acceptOffer = (offer, user) =>
({
  type: 'WS/ACCEPT_OFFER',
  payload: {
    offer,
    user
  }
})

export const rejectOffer = (offer, user) =>
({
  type: 'WS/REJECT_OFFER',
  payload: {
    offer,
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
    user,
    roomId: shop.slug
  }
})

export const joinChatRoom = (roomId, user) =>
({
  type: 'WS/JOIN_ROOM',
  payload: {
    roomId,
    user
  }
})
