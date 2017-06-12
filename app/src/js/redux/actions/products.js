export const refreshProducts = () =>
({
  type: 'REFRESH_PRODUCTS'
})

export const openCreateProductCropper = image =>
({
  type: 'OPEN_CREATE_PRODUCT_CROPPER',
  payload: {
    image
  }
})

export const closeCreateProductCropper = () =>
({
  type: 'CLOSE_CREATE_PRODUCT_CROPPER'
})

export const openAddGalleryProductCropper = (image, index) =>
({
  type: 'OPEN_ADD_GALLERY_PRODUCT_CROPPER',
  payload: {
    image,
    index
  }
})

export const closeAddGalleryProductCropper = () =>
({
  type: 'CLOSE_ADD_GALLERY_PRODUCT_CROPPER'
})

export const addGalleryImage = () =>
({
  type: 'ADD_GALLERY_IMAGE'
})

export const deleteProductGalleryImage = (index, product, user) =>
({
  type: 'DELETE_PRODUCT_GALLERY_IMAGE',
  payload: {
    index,
    product,
    user
  }
})

export const onDeleteProductGalleryImageSuccess = (index, product, user) =>
({
  type: 'DELETE_PRODUCT_GALLERY_IMAGE_SUCCESS',
  payload: {
    index,
    product,
    user
  }
})

export const uploadGalleryProductImage = (image, index, product, user) =>
({
  type: 'UPLOAD_GALLERY_PRODUCT_IMAGE',
  payload: {
    image,
    index,
    product,
    user
  }
})

export const onUploadGalleryProductImageFailure = (error, index) =>
({
  type: 'UPLOAD_GALLERY_PRODUCT_IMAGE_FAILURE',
  payload: {
    error,
    index
  }
})

export const onUploadGalleryProductImageSuccess = res =>
({
  type: 'UPLOAD_GALLERY_PRODUCT_IMAGE_SUCCESS',
  payload: {
    image: res.body.image,
    index: res.body.index,
  }
})

export const openChangeProductLayout = () =>
({
  type: 'OPEN_CHANGE_PRODUCT_LAYOUT'
})

export const closeChangeProductLayout = () =>
({
  type: 'CLOSE_CHANGE_PRODUCT_LAYOUT'
})

export const uploadEditProductLayout = (layout, product, user) =>
({
  type: 'UPLOAD_EDIT_PRODUCT_LAYOUT',
  payload: {
    layout,
    product,
    user
  }
})

export const onUploadEditProductLayoutFailure = () =>
({
  type: 'UPLOAD_EDIT_PRODUCT_LAYOUT_FAILURE'
})

export const onUploadEditProductLayoutSuccess = res =>
({
  type: 'UPLOAD_EDIT_PRODUCT_LAYOUT_SUCCESS',
  payload: {
    product: res.body.product
  }
})

export const openAddProductOption = () =>
({
  type: 'OPEN_ADD_PRODUCT_OPTIONS'
})

export const closeAddProductOption = () =>
({
  type: 'CLOSE_ADD_PRODUCT_OPTIONS'
})

export const uploadAddProductOption = (option, product, user) =>
({
  type: 'UPLOAD_ADD_PRODUCT_OPTION',
  payload: {
    option,
    product,
    user
  }
})

export const onUploadAddProductOptionFailure = () =>
({
  type: 'UPLOAD_ADD_PRODUCT_OPTION_FAILURE'
})

export const onUploadAddProductOptionSuccess = res =>
({
  type: 'UPLOAD_ADD_PRODUCT_OPTION_SUCCESS',
  payload: {
    product: res.body.product
  }
})

export const openAddProductElement = () =>
({
  type: 'OPEN_ADD_PRODUCT_ELEMENT'
})

export const closeAddProductElement = () =>
({
  type: 'CLOSE_ADD_PRODUCT_ELEMENT'
})

export const uploadAddProductElement = (element, product, user) =>
({
  type: 'UPLOAD_ADD_PRODUCT_ELEMENT',
  payload: {
    element,
    product,
    user
  }
})

export const onUploadAddProductElementFailure = () =>
({
  type: 'UPLOAD_ADD_PRODUCT_ELEMENT_FAILURE'
})

export const onUploadAddProductElementSuccess = res =>
({
  type: 'UPLOAD_ADD_PRODUCT_ELEMENT_SUCCESS',
  payload: {
    product: res.body.product
  }
})

export const openAddProductMedia = () =>
({
  type: 'OPEN_ADD_PRODUCT_MEDIA'
})

export const closeAddProductMedia = () =>
({
  type: 'CLOSE_ADD_PRODUCT_MEDIA'
})

export const uploadAddProductMedia = (media, product, user) =>
({
  type: 'UPLOAD_ADD_PRODUCT_MEDIA',
  payload: {
    media,
    product,
    user
  }
})

export const onUploadAddProductMediaFailure = () =>
({
  type: 'UPLOAD_ADD_PRODUCT_MEDIA_FAILURE'
})

export const onUploadAddProductMediaSuccess = res =>
({
  type: 'UPLOAD_ADD_PRODUCT_MEDIA_SUCCESS',
  payload: {
    product: res.body.product
  }
})

export const openEditProductTheme = () =>
({
  type: 'OPEN_EDIT_PRODUCT_THEME'
})

export const closeEditProductTheme = () =>
({
  type: 'CLOSE_EDIT_PRODUCT_THEME'
})

export const openEditProductThemeColor = theme =>
({
  type: 'OPEN_EDIT_PRODUCT_THEME_COLOR',
  payload: {
    theme
  }
})

export const closeEditProductThemeColor = () =>
({
  type: 'CLOSE_EDIT_PRODUCT_THEME_COLOR'
})

export const editProductThemeColor = (theme, color) =>
({
  type: 'EDIT_PRODUCT_THEME_COLOR',
  payload: {
    theme,
    color
  }
})

export const uploadEditProductTheme = (theme, color, product, user) =>
({
  type: 'UPLOAD_EDIT_PRODUCT_THEME',
  payload: {
    theme,
    color,
    product,
    user
  }
})

export const onUploadEditProductThemeFailure = () =>
({
  type: 'UPLOAD_EDIT_PRODUCT_THEME_FAILURE'
})

export const onUploadEditProductThemeSuccess = res =>
({
  type: 'UPLOAD_EDIT_PRODUCT_THEME_SUCCESS',
  payload: {
    product: res.body.product
  }
})

export const openEditProductCropper = image =>
({
  type: 'OPEN_EDIT_PRODUCT_CROPPER',
  payload: {
    image
  }
})

export const closeEditProductCropper = () =>
({
  type: 'CLOSE_EDIT_PRODUCT_CROPPER'
})

export const switchToProductAdmin = () =>
({
  type: 'SWITCH_TO_PRODUCT_ADMIN'
})

export const switchToProductUser = () =>
({
  type: 'SWITCH_TO_PRODUCT_USER'
})

export const shareProduct = ({name, email, message, productId}, url, user) =>
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


export const fetchSingleProduct = (productId, shopId, user) =>
({
  type: 'FETCH_SINGLE_PRODUCT',
  payload: {
    productId,
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

export const uploadEditProductImage = (image, product, user) =>
({
  type: 'UPLOAD_EDIT_PRODUCT_IMAGE',
  payload: {
    image,
    product,
    shopId: product.shopId,
    token: user.token,
  }
})

export const onUploadEditProductImageSuccess = res =>
({
  type: 'UPLOAD_EDIT_PRODUCT_IMAGE_SUCCESS',
  payload: {
    image: res.body.image
  }
})

export const editProductField = field =>
({
  type: 'EDIT_PRODUCT_FIELD',
  payload: {
    field
  }
})

export const editProduct = (product, user) =>
({
  type: 'EDIT_PRODUCT',
  payload: {
    product,
    shopId: product.shopId,
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

export const onUploadProductImageFailure = () =>
({
  type: 'UPLOAD_PRODUCT_IMAGE_FAILURE'
})

export const onUploadEditProductImageFailure = () =>
({
  type: 'UPLOAD_EDIT_PRODUCT_IMAGE_FAILURE'
})
