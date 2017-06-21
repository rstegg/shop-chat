import {
  resetAddress,
  onSaveAddressSettings,
  onSaveAddressSettingsSuccess,
  onSaveAddressSettingsFailure
} from '@actions/address'

const action = type =>
({
  type
})

const actionPayload = (type, payload) =>
({
  type,
  payload
})

test('action reset address', () => {
  expect(resetAddress()).toEqual(action('RESET_ADDRESS'))
})

test('action save address', () => {
  const address = {
    name: "James Test",
    line1: "1122 Test Ave",
    line2: null,
    city: "Testville",
    region: "CA",
    country: "United States",
    zip: "90210"
  }
  const user = {
    name: 'My Name',
    email: 'test@test.com',
    username: 'user',
    address: {
      country: "United States"
    }
  }
  expect(onSaveAddressSettings(address, user))
  .toEqual(actionPayload('SAVE_ADDRESS_SETTINGS', { address, user }))
})

test('action save address success', () => {
  const res = {
    body: {
      address: {
        name: "James Test",
        line1: "1122 Test Ave",
        line2: null,
        city: "Testville",
        region: "CA",
        country: "United States",
        zip: "90210"
      }
    }
  }
  const address = {
    name: "James Test",
    line1: "1122 Test Ave",
    line2: null,
    city: "Testville",
    region: "CA",
    country: "United States",
    zip: "90210"
  }
  expect(onSaveAddressSettingsSuccess(res))
  .toEqual(actionPayload('SAVE_ADDRESS_SETTINGS_SUCCESS', { address }))
})

test('action save address failure', () => {
  const error = {
    status: 400,
    text: 'invalid address'
  }
  expect(onSaveAddressSettingsFailure(error))
  .toEqual(actionPayload('SAVE_ADDRESS_SETTINGS_FAILURE', { error }))
})
