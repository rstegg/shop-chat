export const refreshProducts = () =>
({
  type: 'REFRESH_PRODUCTS'
})

export const shareProduct = ({name, email, message, productId}, user, url) =>
({
  type: 'SHARE_PRODUCT',
  payload: {
    name,
    email,
    message,
    productId,
    token: user.token,
    url
  }
})

export const onShareProductSuccess = res =>
({
  type: 'SHARE_PRODUCT_SUCCESS',
  payload: {
    product: res.body.product
  }
})

export const deleteProduct = (id, shopId, user) =>
({
  type: 'DELETE_PRODUCT',
  payload: {
    id,
    shopId,
    token: user.token
  }
})

export const onDeleteProductSuccess = res =>
({
  type: 'DELETE_PRODUCT_SUCCESS',
  payload: {
    product: res.body.product
  }
})

export const fetchProducts = (shopId, user) =>
({
  type: 'FETCH_PRODUCTS',
  payload: {
    token: user.token,
    shopId
  }
})

export const onFetchProductsSuccess = res =>
({
  type: 'FETCH_PRODUCTS_SUCCESS',
  payload: {
    products: res.body.products
  }
})


export const fetchSingleProduct = (id, shopId, user) =>
({
  type: 'FETCH_SINGLE_PRODUCT',
  payload: {
    productId: id,
    shopId,
    token: user.token
  }
})

export const onFetchSingleProductSuccess = res =>
({
  type: 'FETCH_SINGLE_PRODUCT_SUCCESS',
  payload: {
    product: res.body.product
  }
})

export const createProduct = (product, shopId, user) =>
({
  type: 'CREATE_PRODUCT',
  payload: {
    product,
    shopId,
    token: user.token
  }
})

export const onCreateProductSuccess = res =>
({
  type: 'CREATE_PRODUCT_SUCCESS',
  payload: {
    product: res.body.product
  }
})

export const uploadProductImage = (image, user) =>
({
  type: 'UPLOAD_PRODUCT_IMAGE',
  payload: {
    image,
    token: user.token
  }
})

export const onUploadProductImageSuccess = res =>
({
  type: 'UPLOAD_PRODUCT_IMAGE_SUCCESS',
  payload: {
    image: res.body.image
  }
})

export const editProduct = (product, shopId, user) =>
({
  type: 'EDIT_PRODUCT',
  payload: {
    product,
    shopId,
    token: user.token,
  }
})

export const onEditProductSuccess = res =>
({
  type: 'EDIT_PRODUCT_SUCCESS',
  payload: {
    product: res.body.product
  }
})
