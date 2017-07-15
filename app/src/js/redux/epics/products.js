import { combineEpics } from 'redux-observable'
import {
  onFetchProductsSuccess,
  onFetchSingleProductSuccess,
  onEditProductSuccess,
  onDeleteProductSuccess,
  onCreateProductSuccess,
  onUploadProductImageSuccess,
  onUploadEditProductImageSuccess,
  onUploadGalleryProductImageSuccess,
  onUploadEditProductLayoutSuccess,
  onUploadEditProductThemeSuccess,
  onDeleteProductGalleryImageSuccess,
  onShareProductSuccess
} from 'actions/products'
import { Observable } from 'rxjs/Rx'

import { authGet, authPost, authImagePost, authPut, authDelete } from './helpers/authReq'

const api = {
  fetchProducts: ({ shopId, token }) =>
    authGet(`products/${shopId}`, token),
  fetchSingleProduct: ({ productId, shopId, token }) =>
    authGet(`products/${shopId}/${productId}`, token),
  createProduct: ({ product, shopId, token }) =>
    authPost(`products/${shopId}`, { product }, token),
  shareProduct: ({ name, email, message, token, url, productId }) =>
    authPost('products/share', { name, email, message, token, url, productId }, token),
  uploadProductImage: ({ image, token }) =>
    authImagePost('image/product', image, token),
  uploadEditProductImage: ({ image, product, token }) =>
    authImagePost(`image/${product.shopId}/product/${product.id}`, image, token),
  uploadGalleryProductImage: ({ image, index, product, user }) =>
    authImagePost(`image/${product.shopId}/product/${product.id}/gallery/${index}`, image, user.token),
  deleteProductGalleryImage: ({ index, product, user }) =>
    authDelete(`products/${product.shopId}/${product.id}/gallery/${index}`, user.token),
  uploadEditProductLayout: ({ layout, product, user }) =>
    authPut(`products/${product.shopId}/${product.id}/layout`, { layout }, user.token),
  uploadEditProductTheme: ({ theme, color, product, user }) =>
    authPut(`products/${product.shopId}/${product.id}/theme`, { theme, color }, user.token),
  editProduct: ({ product, shopId, token }) =>
    authPut(`products/${shopId}/${product.id}`, { product }, token),
  deleteProduct: ({ id, shopId, token }) =>
    authDelete(`products/${shopId}/${id}`, token),
}

const fetchProducts = action$ =>
  action$.ofType('FETCH_PRODUCTS')
    .mergeMap(action =>
      api.fetchProducts(action.payload)
        .map(onFetchProductsSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_PRODUCTS_FAILURE',
          error
        }))
      )

const fetchSingleProduct = action$ =>
  action$.ofType('FETCH_SINGLE_PRODUCT')
    .mergeMap(action =>
      api.fetchSingleProduct(action.payload)
        .map(onFetchSingleProductSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_SINGLE_PRODUCT_FAILURE',
          error
        }))
      )

const shareProduct = action$ =>
  action$.ofType('SHARE_PRODUCT')
    .mergeMap(action =>
      api.shareProduct(action.payload)
        .map(onShareProductSuccess)
        .catch(error => Observable.of({
          type: 'SHARE_PRODUCT_FAILURE',
          error
        }))
      )

const createProduct = action$ =>
  action$.ofType('CREATE_PRODUCT')
    .mergeMap(action =>
      api.createProduct(action.payload)
        .map(onCreateProductSuccess)
        .catch(error => Observable.of({
          type: 'CREATE_PRODUCT_FAILURE',
          error
        }))
      )

const uploadProductImage = action$ =>
  action$.ofType('UPLOAD_PRODUCT_IMAGE')
    .mergeMap(action =>
      api.uploadProductImage(action.payload)
        .map(onUploadProductImageSuccess)
        .catch(error => Observable.of({
          type: 'UPLOAD_PRODUCT_IMAGE_FAILURE',
          error
        }))
    )

const uploadEditProductImage = action$ =>
  action$.ofType('UPLOAD_EDIT_PRODUCT_IMAGE')
    .mergeMap(action =>
      api.uploadEditProductImage(action.payload)
        .map(onUploadEditProductImageSuccess)
        .catch(error => Observable.of({
          type: 'UPLOAD_PRODUCT_IMAGE_FAILURE',
          error
        }))
    )

const uploadGalleryProductImage = action$ =>
  action$.ofType('UPLOAD_GALLERY_PRODUCT_IMAGE')
    .mergeMap(action =>
      api.uploadGalleryProductImage(action.payload)
        .map(onUploadGalleryProductImageSuccess)
        .catch(error => Observable.of({
          type: 'UPLOAD_GALLERY_PRODUCT_IMAGE_FAILURE',
          payload: {
            error,
            index: action.payload.index
          }
        }))
    )

const uploadEditProductLayout = action$ =>
  action$.ofType('UPLOAD_EDIT_PRODUCT_LAYOUT')
    .mergeMap(action =>
      api.uploadEditProductLayout(action.payload)
        .map(onUploadEditProductLayoutSuccess)
        .catch(error => Observable.of({
          type: 'UPLOAD_EDIT_PRODUCT_LAYOUT_FAILURE',
          error
        }))
    )

const uploadEditProductTheme = action$ =>
  action$.ofType('UPLOAD_EDIT_PRODUCT_THEME')
    .mergeMap(action =>
      api.uploadEditProductTheme(action.payload)
        .map(onUploadEditProductThemeSuccess)
        .catch(error => Observable.of({
          type: 'UPLOAD_EDIT_PRODUCT_THEME_FAILURE',
          error
        }))
    )

const editProduct = action$ =>
  action$.ofType('EDIT_PRODUCT')
    .mergeMap(action =>
      api.editProduct(action.payload)
        .map(onEditProductSuccess)
        .catch(error => Observable.of({
          type: 'EDIT_PRODUCT_FAILURE',
          error
        }))
      )

const deleteProduct = action$ =>
  action$.ofType('DELETE_PRODUCT')
    .mergeMap(action =>
      api.deleteProduct(action.payload)
        .map(onDeleteProductSuccess)
        .catch(error => Observable.of({
          type: 'DELETE_PRODUCT_FAILURE',
          error
        }))
      )

const deleteProductGalleryImage = action$ =>
  action$.ofType('DELETE_PRODUCT_GALLERY_IMAGE')
    .mergeMap(action =>
      api.deleteProductGalleryImage(action.payload)
        .map(onDeleteProductGalleryImageSuccess)
        .catch(error => Observable.of({
          type: 'DELETE_PRODUCT_GALLERY_IMAGE_FAILURE',
          error
        }))
      )

export default combineEpics(
  fetchProducts,
  fetchSingleProduct,
  shareProduct,
  createProduct,
  uploadProductImage,
  uploadEditProductImage,
  uploadGalleryProductImage,
  uploadEditProductLayout,
  uploadEditProductTheme,
  editProduct,
  deleteProduct,
  deleteProductGalleryImage
)
