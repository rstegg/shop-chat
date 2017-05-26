export const uploadProfileImage = (image, user) =>
({
  type: 'UPLOAD_PROFILE_IMAGE',
  payload: {
    image,
    token: user.token
  }
})

export const onUploadAvatarSuccess = res =>
({
  type: 'UPLOAD_PROFILE_IMAGE_SUCCESS',
  payload: {
    image: res.body.image
  }
})

export const fetchProfile = (username, user) =>
({
  type: 'FETCH_PROFILE',
  payload: {
    username,
    token: user.token
  }
})

export const onFetchProfileSuccess = res =>
({
  type: 'FETCH_PROFILE_SUCCESS',
  payload: {
    profile: res.body.profile
  }
})

export const editProfileField = field =>
({
  type: 'EDIT_PROFILE_FIELD',
  payload: {
    field
  }
})

export const editProfile = (profile, user) =>
({
  type: 'EDIT_PROFILE',
  payload: {
    profile,
    token: user.token
  }
})

export const onEditProfileSuccess = res =>
({
  type: 'EDIT_PROFILE_SUCCESS',
  payload: {
    user: res.body.profile
  }
})

export const refreshProfileEditing = () =>
({
  type: 'REFRESH_PROFILE_EDITING'
})
