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

export const openOffer = () =>
({
  type: 'OPEN_OFFER_WINDOW',
})

export const closeOffer = () =>
({
  type: 'CLOSE_OFFER_WINDOW',
})
