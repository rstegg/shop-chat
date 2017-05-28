export const productBuyNow = productId =>
({
  type: 'PRODUCT_BUY_NOW',
  payload: {
    productId
  }
})

export const productAddToCart = productId =>
({
  type: 'PRODUCT_ADD_TO_CART',
  payload: {
    productId
  }
})

export const productRemoveFromCart = productId =>
({
  type: 'PRODUCT_REMOVE_FROM_CART',
  payload: {
    productId
  }
})

export const openPurchase = () =>
({
  type: 'OPEN_PURCHASE_WINDOW',
})

export const closePurchase = () =>
({
  type: 'CLOSE_PURCHASE_WINDOW',
})
