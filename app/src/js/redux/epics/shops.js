import { combineEpics } from 'redux-observable'
import {
  onFetchShopsSuccess,
  onFetchSingleShopSuccess,
  onCreateShopSuccess,
  onEditShopSuccess,
  onDeleteShopSuccess,
  onUploadShopImageSuccess,
  onUploadEditShopImageSuccess
} from 'actions/shops'
import su from 'superagent'
import { Observable } from 'rxjs/Rx'

import { authGet, authPost, authImagePost, authPut, authDelete } from './helpers/authReq'

const api = {
  fetchShops: ({token}) =>
    authGet(`shops`, token),
  fetchSingleShop: ({shopId, token}) =>
    authGet(`shops/${shopId}`, token),
  createShop: ({shop, user}) =>
    authPost(`shops`, { shop }, user.token),
  editShop: ({shop, user}) =>
    authPut(`shops/${shop.id}`, { shop }, user.token),
  deleteShop: ({shopId, user}) =>
    authDelete(`shops/${shopId}`, user.token),
  uploadShopImage: ({image, token}) =>
    authImagePost(`image/shop`, image, token),
  uploadEditShopImage: ({image, shopId, token}) =>
    authImagePost(`image/shop/${shopId}`, image, token),
}

const fetchShops = action$ =>
  action$.ofType('FETCH_SHOPS')
    .mergeMap(action =>
      api.fetchShops(action.payload)
        .map(onFetchShopsSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_SHOPS_FAILURE'
        }))
      )

const fetchSingleShop = action$ =>
  action$.ofType('FETCH_SINGLE_SHOP')
    .mergeMap(action =>
      api.fetchSingleShop(action.payload)
        .map(onFetchSingleShopSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_SINGLE_SHOP_FAILURE'
        }))
      )

const createShop = action$ =>
  action$.ofType('CREATE_SHOP')
    .mergeMap(action =>
      api.createShop(action.payload)
        .map(onCreateShopSuccess)
        .catch(error => Observable.of({
          type: 'CREATE_SHOP_FAILURE'
        }))
      )

const editShop = action$ =>
  action$.ofType('EDIT_SHOP')
    .mergeMap(action =>
      api.editShop(action.payload)
        .map(onEditShopSuccess)
        .catch(error => Observable.of({
          type: 'EDIT_SHOP_FAILURE'
        }))
      )

const deleteShop = action$ =>
  action$.ofType('DELETE_SHOP')
    .mergeMap(action =>
      api.deleteShop(action.payload)
        .map(onDeleteShopSuccess)
        .catch(error => Observable.of({
          type: 'DELETE_SHOP_FAILURE'
        }))
      )

const uploadShopImage = action$ =>
  action$.ofType('UPLOAD_SHOP_IMAGE')
    .mergeMap(action =>
      api.uploadShopImage(action.payload)
        .map(onUploadShopImageSuccess)
        .catch(error => Observable.of({
          type: 'UPLOAD_SHOP_IMAGE_FAILURE',
          error
        }))
      )

const uploadEditShopImage = action$ =>
  action$.ofType('UPLOAD_EDIT_SHOP_IMAGE')
    .mergeMap(action =>
      api.uploadEditShopImage(action.payload)
        .map(onUploadEditShopImageSuccess)
        .catch(error => Observable.of({
          type: 'UPLOAD_EDIT_SHOP_IMAGE_FAILURE'
        }))
      )

export default combineEpics(
  fetchShops,
  fetchSingleShop,
  createShop,
  editShop,
  deleteShop,
  uploadShopImage,
  uploadEditShopImage
)
