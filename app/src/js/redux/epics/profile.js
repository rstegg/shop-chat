import { combineEpics } from 'redux-observable'
import { onUploadProfileImageSuccess, onEditProfileSuccess, onFetchProfileSuccess } from 'actions/profile'
import { Observable } from 'rxjs/Rx'
import { authGet, authImagePost, authPut } from './helpers/authReq'

const api = {
  fetchProfile: ({ username, token }) =>
    authGet(`profile/${username}`, token),
  editProfile: ({ profile, token }) =>
   authPut('profile', { profile }, token),
  uploadProfileImage: ({ image, token }) =>
    authImagePost('image/profile', image, token)
}

const fetchProfile = action$ =>
  action$.ofType('FETCH_PROFILE')
    .mergeMap(action =>
      api.fetchProfile(action.payload)
        .map(onFetchProfileSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_PROFILE_FAILURE',
          error
        }))
    )

const editProfile = action$ =>
  action$.ofType('EDIT_PROFILE')
    .mergeMap(action =>
      api.editProfile(action.payload)
        .map(onEditProfileSuccess)
        .catch(error => Observable.of({
          type: 'EDIT_PROFILE_FAILURE',
          error
        }))
    )

const uploadProfileImage = action$ =>
  action$.ofType('UPLOAD_PROFILE_IMAGE')
    .mergeMap(action =>
      api.uploadProfileImage(action.payload)
        .map(onUploadProfileImageSuccess)
        .catch(error => Observable.of({
          type: 'UPLOAD_PROFILE_IMAGE_FAILURE',
          error
        }))
    )

export default combineEpics(
  fetchProfile,
  editProfile,
  uploadProfileImage
)
