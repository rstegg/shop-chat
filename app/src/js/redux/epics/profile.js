import { onUploadProfileImageSuccess, onEditProfileSuccess, onFetchProfileSuccess } from '../actions/profile'
import su from 'superagent'
import { Observable } from 'rxjs/Rx'

const API_HOST = '/api/v1'

const api = {
  fetchProfile: ({username, token}) => {
    const request = su.get(`${API_HOST}/profile/${username}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  uploadProfileImage: ({image, token}) => {
    const request = su.post(`${API_HOST}/image/profile`)
      .attach('avatar', image)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  editProfile: ({profile, token}) => {
   const request = su.put(`${API_HOST}/profile`)
      .send({profile})
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  }
}

export const fetchProfile = action$ =>
  action$.ofType('FETCH_PROFILE')
    .mergeMap(action =>
      api.fetchProfile(action.payload)
        .map(onFetchProfileSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_PROFILE_FAILURE',
          error
        }))
    )

export const uploadProfileImage = action$ =>
  action$.ofType('UPLOAD_PROFILE_IMAGE')
    .mergeMap(action =>
      api.uploadProfileImage(action.payload)
        .map(onUploadProfileImageSuccess)
        .catch(error => Observable.of({
          type: 'UPLOAD_PROFILE_IMAGE_FAILURE'
        }))
    )

export const editProfile = action$ =>
  action$.ofType('EDIT_PROFILE')
    .mergeMap(action =>
      api.editProfile(action.payload)
        .map(onEditProfileSuccess)
        .catch(error => Observable.of({
          type: 'EDIT_PROFILE_FAILURE'
        }))
    )
