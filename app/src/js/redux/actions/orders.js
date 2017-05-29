export const productBuyNow = product =>
({
  type: 'PRODUCT_BUY_NOW',
  payload: {
    product
  }
})

export const productAddToCart = product =>
({
  type: 'PRODUCT_ADD_TO_CART',
  payload: {
    product
  }
})

export const productRemoveFromCart = product =>
({
  type: 'PRODUCT_REMOVE_FROM_CART',
  payload: {
    product
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
