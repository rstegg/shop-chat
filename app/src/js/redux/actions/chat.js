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

export const sendShopChatMessage = (text, user, shop) =>
({
  type: 'WS/SEND_SHOP_CHAT_MESSAGE',
  payload: {
    text,
    roomId: shop.slug,
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

export const fetchShopChatMessages = (user, shop) =>
({
  type: 'WS/FETCH_SHOP_CHAT_MESSAGES',
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
