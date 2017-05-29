export const onSaveShippingSettings = (shipping, user) =>
({
  type: 'SAVE_SHIPPING_SETTINGS',
  payload: {
    shipping,
    user
  }
})

export const onSaveShippingSettingsSuccess = res =>
({
  type: 'SAVE_SHIPPING_SETTINGS_SUCCESS',
  payload: {
    shipping: res.body.shipping,
    token: res.body.token
  }
})

export const onSaveShippingSettingsFailure = error =>
({
  type: 'SAVE_SHIPPING_SETTINGS_FAILURE',
  payload: {
    error
  }
})
