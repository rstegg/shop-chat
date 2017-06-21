import {
  resetLogin,
  onLoginSubmit,
  onLoginSuccess,
  onLoginFailure
} from '@actions/login'

const action = type =>
({
  type
})

const actionPayload = (type, payload) =>
({
  type,
  payload
})

test('action reset login', () => {
  expect(resetLogin()).toEqual(action('RESET_LOGIN'))
})

test('action login submit', () => {
  const username = 'test_username'
  const password = 'test_password'
  expect(onLoginSubmit({username, password}))
  .toEqual(actionPayload('LOGIN_SUBMIT', { username, password }))
})

test('action login success', () => {
  const res = {
    body: {
      user: {
        name: 'My Name',
        username: 'user'
      },
      token: 'JWT TEST.TOKEN'
    }
  }
  const user = {
    name: 'My Name',
    username: 'user'
  }
  const token = 'JWT TEST.TOKEN'
  expect(onLoginSuccess(res))
  .toEqual(actionPayload('LOGIN_SUCCESS', { user, token }))
})

test('action login failure', () => {
  const error = {
    status: 400,
    text: 'invalid login'
  }
  expect(onLoginFailure(error))
  .toEqual(actionPayload('LOGIN_FAILURE', { error }))
})
