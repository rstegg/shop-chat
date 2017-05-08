import {
  onFetchProductsSuccess,
  onFetchSingleProductSuccess,
  onEditProductSuccess,
  onDeleteProductSuccess,
  onCreateProductSuccess,
  onUploadProductImageSuccess,
  onUploadFreeProductImageSuccess,
  onShareProductSuccess
} from '../actions/products'
import su from 'superagent'
import { Observable } from 'rxjs/Rx'

const API_HOST = '/api/v1'

const api = {
  fetchProducts: ({token}) => {
    const request = su.get(`${API_HOST}/products`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  fetchSingleProduct: ({productId, token}) => {
    const request = su.get(`${API_HOST}/product/${productId}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  createProduct: ({product, token}) => {
   const request = su.product(`${API_HOST}/products`)
      .send({product})
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  shareProduct: ({name, email, message, token, url, productId}) => {
   const request = su.product(`${API_HOST}/share/product`)
      .send({name, email, message, token, url, productId})
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  uploadProductImage: ({image, token}) => {
    const request = su.product(`${API_HOST}/image/product`)
      .attach('image', image)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  editProduct: ({id, name, description, image, amount, product_type, is_public, token}) => {
   const request = su.put(`${API_HOST}/product/${id}`)
      .send({name, description, image, amount, product_type, is_public})
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  deleteProduct: ({id, token}) => {
   const request = su.delete(`${API_HOST}/product/${id}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  }
}

export const fetchProducts = action$ =>
  action$.ofType('FETCH_PRODUCTS')
    .mergeMap(action =>
      api.fetchProducts(action.payload)
        .map(onFetchProductsSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_PRODUCTS_FAILURE'
        }))
      )

export const fetchSingleProduct = action$ =>
  action$.ofType('FETCH_SINGLE_PRODUCT')
    .mergeMap(action =>
      api.fetchSingleProduct(action.payload)
        .map(onFetchSingleProductSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_SINGLE_PRODUCT_FAILURE'
        }))
      )

export const shareProduct = action$ =>
  action$.ofType('SHARE_PRODUCT')
    .mergeMap(action =>
      api.shareProduct(action.payload)
        .map(onShareProductSuccess)
        .catch(error => Observable.of({
          type: 'SHARE_PRODUCT_FAILURE'
        }))
      )

export const createProduct = action$ =>
  action$.ofType('CREATE_PRODUCT')
    .mergeMap(action =>
      api.createProduct(action.payload)
        .map(onCreateProductSuccess)
        .catch(error => Observable.of({
          type: 'CREATE_PRODUCT_FAILURE'
        }))
      )

export const uploadProductImage = action$ =>
  action$.ofType('UPLOAD_PRODUCT_IMAGE')
    .mergeMap(action =>
      api.uploadProductImage(action.payload)
        .map(onUploadProductImageSuccess)
        .catch(error => Observable.of({
          type: 'UPLOAD_PRODUCT_IMAGE_FAILURE'
        }))
    )

export const editProduct = action$ =>
  action$.ofType('EDIT_PRODUCT')
    .mergeMap(action =>
      api.editProduct(action.payload)
        .map(onEditProductSuccess)
        .catch(error => Observable.of({
          type: 'EDIT_PRODUCT_FAILURE'
        }))
      )

export const deleteProduct = action$ =>
  action$.ofType('DELETE_PRODUCT')
    .mergeMap(action =>
      api.deleteProduct(action.payload)
        .map(onDeleteProductSuccess)
        .catch(error => Observable.of({
          type: 'DELETE_PRODUCT_FAILURE'
        }))
      )
