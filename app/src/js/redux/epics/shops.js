import { onFetchShopsSuccess, onFetchSingleShopSuccess, onCreateShopSuccess, onEditShopSuccess, onDeleteShopSuccess, onUploadShopImageSuccess, onUploadEditShopImageSuccess } from 'actions/shops'
import su from 'superagent'
import { Observable } from 'rxjs/Rx'

const API_HOST = '/api/v1'

const api = {
  fetchShops: ({token}) => {
    const request = su.get(`${API_HOST}/shops`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  fetchSingleShop: ({shopId, token}) => {
    const request = su.get(`${API_HOST}/shops/${shopId}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  createShop: ({shop, user}) => {
   const request = su.post(`${API_HOST}/shops`)
      .send({shop})
      .set('Accept', 'application/json')
      .set('Authorization', user.token)
    return Observable.fromPromise(request)
  },
  editShop: ({shop, user}) => {
   const request = su.put(`${API_HOST}/shops/${shop.id}`)
      .send({shop})
      .set('Accept', 'application/json')
      .set('Authorization', user.token)
    return Observable.fromPromise(request)
  },
  deleteShop: ({shopId, user}) => {
   const request = su.delete(`${API_HOST}/shops/${shopId}`)
      .set('Accept', 'application/json')
      .set('Authorization', user.token)
    return Observable.fromPromise(request)
  },
  uploadShopImage: ({image, token}) => {
    const request = su.post(`${API_HOST}/image/shop`)
      .attach('image', image)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  uploadEditShopImage: ({image, shopId, token}) => {
    const request = su.post(`${API_HOST}/image/shop/${shopId}`)
      .attach('image', image)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  }
}

export const fetchShops = action$ =>
  action$.ofType('FETCH_SHOPS')
    .mergeMap(action =>
      api.fetchShops(action.payload)
        .map(onFetchShopsSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_SHOPS_FAILURE'
        }))
      )

export const fetchSingleShop = action$ =>
  action$.ofType('FETCH_SINGLE_SHOP')
    .mergeMap(action =>
      api.fetchSingleShop(action.payload)
        .map(onFetchSingleShopSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_SINGLE_SHOP_FAILURE'
        }))
      )

export const createShop = action$ =>
  action$.ofType('CREATE_SHOP')
    .mergeMap(action =>
      api.createShop(action.payload)
        .map(onCreateShopSuccess)
        .catch(error => Observable.of({
          type: 'CREATE_SHOP_FAILURE'
        }))
      )

export const editShop = action$ =>
  action$.ofType('EDIT_SHOP')
    .mergeMap(action =>
      api.editShop(action.payload)
        .map(onEditShopSuccess)
        .catch(error => Observable.of({
          type: 'EDIT_SHOP_FAILURE'
        }))
      )

export const deleteShop = action$ =>
  action$.ofType('DELETE_SHOP')
    .mergeMap(action =>
      api.deleteShop(action.payload)
        .map(onDeleteShopSuccess)
        .catch(error => Observable.of({
          type: 'DELETE_SHOP_FAILURE'
        }))
      )

export const uploadShopImage = action$ =>
  action$.ofType('UPLOAD_SHOP_IMAGE')
    .mergeMap(action =>
      api.uploadShopImage(action.payload)
        .map(onUploadShopImageSuccess)
        .catch(error => Observable.of({
          type: 'UPLOAD_SHOP_IMAGE_FAILURE',
          error
        }))
      )

export const uploadEditShopImage = action$ =>
  action$.ofType('UPLOAD_EDIT_SHOP_IMAGE')
    .mergeMap(action =>
      api.uploadEditShopImage(action.payload)
        .map(onUploadEditShopImageSuccess)
        .catch(error => Observable.of({
          type: 'UPLOAD_EDIT_SHOP_IMAGE_FAILURE'
        }))
      )
