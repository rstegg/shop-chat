import {
  resetAccount,
  onSaveAccountSettings,
  onSaveAccountSettingsSuccess,
  onSaveAccountSettingsFailure
} from '@actions/account'

const action = type =>
({
  type
})

const actionPayload = (type, payload) =>
({
  type,
  payload
})

test('action reset account', () => {
  expect(resetAccount()).toEqual(action('RESET_ACCOUNT'))
})

test('action save account', () => {
  const account = {
    name: 'My Name',
    email: 'test@test.com',
    username: 'user',
    oldPassword: 'pass',
  }
  const user = {
    name: 'My Name',
    email: 'test@test.com',
    username: 'user',
    oldPassword: 'pass',
  }
  expect(onSaveAccountSettings(account, user))
  .toEqual(actionPayload('SAVE_ACCOUNT_SETTINGS', { account, user }))
})

test('action save account success', () => {
  const res = {
    body: {
      account: {
        name: 'My Name',
        username: 'user'
      }
    }
  }
  const account = {
    name: 'My Name',
    username: 'user'
  }
  expect(onSaveAccountSettingsSuccess(res))
  .toEqual(actionPayload('SAVE_ACCOUNT_SETTINGS_SUCCESS', { account }))
})

test('action save account failure', () => {
  const error = {
    status: 400,
    text: 'invalid password'
  }
  expect(onSaveAccountSettingsFailure(error))
  .toEqual(actionPayload('SAVE_ACCOUNT_SETTINGS_FAILURE', { error }))
})
