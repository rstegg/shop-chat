export const refreshShops = () =>
({
  type: 'REFRESH_SHOPS'
})

export const openCreateShopCropper = image =>
({
  type: 'OPEN_CREATE_SHOP_CROPPER',
  payload: {
    image
  }
})

export const closeCreateShopCropper = () =>
({
  type: 'CLOSE_CREATE_SHOP_CROPPER'
})

export const openEditShopCropper = image =>
({
  type: 'OPEN_EDIT_SHOP_CROPPER',
  payload: {
    image
  }
})

export const closeEditShopCropper = () =>
({
  type: 'CLOSE_EDIT_SHOP_CROPPER'
})

export const switchToShopAdmin = () =>
({
  type: 'SWITCH_TO_SHOP_ADMIN'
})

export const switchToShopUser = () =>
({
  type: 'SWITCH_TO_SHOP_USER'
})

export const fetchShops = user =>
({
  type: 'FETCH_SHOPS',
  payload: {
    token: user.token
  }
})

export const onFetchShopsSuccess = res =>
({
  type: 'FETCH_SHOPS_SUCCESS',
  payload: {
    shops: res.body.shops
  }
})

export const fetchSingleShop = (id, user) =>
({
  type: 'FETCH_SINGLE_SHOP',
  payload: {
    shopId: id,
    token: user.token
  }
})

export const onFetchSingleShopSuccess = res =>
({
  type: 'FETCH_SINGLE_SHOP_SUCCESS',
  payload: {
    shop: res.body.shop
  }
})

export const createShop = (shop, user) =>
({
  type: 'CREATE_SHOP',
  payload: {
    shop,
    user
  }
})

export const onCreateShopSuccess = res =>
({
  type: 'CREATE_SHOP_SUCCESS',
  payload: {
    shop: res.body.shop
  }
})

export const editShopField = field =>
({
  type: 'EDIT_SHOP_FIELD',
  payload: {
    field
  }
})

export const editShop = (shop, user) =>
({
  type: 'EDIT_SHOP',
  payload: {
    shop,
    user
  }
})

export const onEditShopSuccess = res =>
({
  type: 'EDIT_SHOP_SUCCESS',
  payload: {
    shop: res.body.shop
  }
})

export const deleteShop = (shopId, user) =>
({
  type: 'DELETE_SHOP',
  payload: {
    shopId,
    user
  }
})

export const onDeleteShopSuccess = res =>
({
  type: 'DELETE_SHOP_SUCCESS',
  payload: {
    shop: res.body.shop
  }
})

export const joinShop = (shopId, user) =>
({
  type: 'JOIN_SHOP',
  payload: {
    shopId,
    user
  }
})

export const onJoinShopSuccess = res =>
({
  type: 'JOIN_SHOP_SUCCESS',
  payload: {
    shop: res.body.shop
  }
})

export const uploadShopImage = (image, user) =>
({
  type: 'UPLOAD_SHOP_IMAGE',
  payload: {
    image,
    token: user.token
  }
})

export const onUploadShopImageSuccess = res =>
({
  type: 'UPLOAD_SHOP_IMAGE_SUCCESS',
  payload: {
    image: res.body.image
  }
})

export const uploadEditShopImage = (image, shop, user) =>
({
  type: 'UPLOAD_EDIT_SHOP_IMAGE',
  payload: {
    image,
    token: user.token,
    shopId: shop.id
  }
})

export const onUploadEditShopImageSuccess = res =>
({
  type: 'UPLOAD_EDIT_SHOP_IMAGE_SUCCESS',
  payload: {
    image: res.body.image
  }
})

export const onUploadShopImageFailure = () =>
({
  type: 'UPLOAD_SHOP_IMAGE_FAILURE'
})

export const onUploadEditShopImageFailure = () =>
({
  type: 'UPLOAD_EDIT_SHOP_IMAGE_FAILURE'
})
