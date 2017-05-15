export const sendMessage = (text, user) =>
({
  type: 'WS/SEND_HOME_CHAT_MESSAGE',
  payload: {
    text,
    username: user.username,
    avatar: user.image || '',
    token: user.token
  }
})

export const sendRoomChatMessage = (text, user, roomId) =>
({
  type: 'WS/SEND_ROOM_CHAT_MESSAGE',
  payload: {
    text,
    roomId,
    username: user.username,
    avatar: user.image || '',
    token: user.token
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

export const sendOffer = (product, price, roomId, user) =>
({
  type: 'WS/SEND_SHOP_OFFER',
  payload: {
    product,
    price,
    roomId,
    username: user.username,
    avatar: user.image || '',
    token: user.token
  }
})

export const fetchMessages = user =>
({
  type: 'WS/FETCH_HOME_CHAT_MESSAGES',
  payload: {
    token: user.token
  }
})

export const fetchRoomChatMessages = (user, shop) =>
({
  type: 'WS/FETCH_ROOM_CHAT_MESSAGES',
  payload: {
    token: user.token,
    roomId: shop.slug
  }
})

export const joinChatRoom = (roomId, user) =>
({
  type: 'WS/JOIN_ROOM',
  payload: {
    roomId,
    token: user.token,
    username: user.username,
    avatar: user.image || ''
  }
})
