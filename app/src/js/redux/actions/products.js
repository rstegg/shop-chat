export const refreshProducts = () =>
({
  type: 'REFRESH_PRODUCTS'
})

export const saveFreeProduct = product =>
({
  type: 'SAVE_FREE_PRODUCT',
  payload: {
    product
  }
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

export const deleteProduct = (id, user) =>
({
  type: 'DELETE_PRODUCT',
  payload: {
    id,
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

export const setCurrentProduct = product =>
({
  type: 'SET_CURRENT_PRODUCT',
  payload: {
    product
  }
})

export const fetchProducts = user =>
({
  type: 'FETCH_PRODUCTS',
  payload: {
    token: user.token
  }
})

export const onFetchProductsSuccess = res =>
({
  type: 'FETCH_PRODUCTS_SUCCESS',
  payload: {
    products: res.body.products
  }
})


export const fetchSingleProduct = (id, user) =>
({
  type: 'FETCH_SINGLE_PRODUCT',
  payload: {
    productId: id,
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

export const createProduct = (product, {token}) =>
({
  type: 'CREATE_PRODUCT',
  payload: {
    product,
    token
  }
})

export const onCreateProductSuccess = res =>
({
  type: 'CREATE_PRODUCT_SUCCESS',
  payload: {
    product: res.body.product
  }
})

export const uploadProductImage = (image, {token}) =>
({
  type: 'UPLOAD_PRODUCT_IMAGE',
  payload: {
    image,
    token
  }
})

export const onUploadProductImageSuccess = res =>
({
  type: 'UPLOAD_PRODUCT_IMAGE_SUCCESS',
  payload: {
    image: res.body.image
  }
})

export const uploadFreeProductImage = image =>
({
  type: 'UPLOAD_FREE_PRODUCT_IMAGE',
  payload: {
    image
  }
})

export const onUploadFreeProductImageSuccess = res =>
({
  type: 'UPLOAD_FREE_PRODUCT_IMAGE_SUCCESS',
  payload: {
    image: res.body.image
  }
})

export const editProduct = ({id, name, description, image, amount, product_type, is_public}, {token}) =>
({
  type: 'EDIT_PRODUCT',
  payload: {
    id,
    name,
    description,
    image,
    amount,
    product_type,
    is_public,
    token,
  }
})

export const onEditProductSuccess = res =>
({
  type: 'EDIT_PRODUCT_SUCCESS',
  payload: {
    product: res.body.product
  }
})
