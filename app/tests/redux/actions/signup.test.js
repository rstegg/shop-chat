import {
  resetSignup,
  onSignupSubmit,
  onSignupSuccess,
  onSignupFailure
} from '@actions/signup'

const action = type =>
({
  type
})

const actionPayload = (type, payload) =>
({
  type,
  payload
})

test('action reset signup', () => {
  expect(resetSignup()).toEqual(action('RESET_SIGNUP'))
})

test('action signup submit', () => {
  const user = {
    name: 'Test Joe',
    username: 'test_username',
    email: 'test@email.com',
    password: 'test_password'
  }
  expect(onSignupSubmit(user))
  .toEqual(actionPayload('SIGNUP_SUBMIT', { user }))
})

test('action signup success', () => {
  const res = {
    body: {
      user: {
        name: 'Test Joe',
        username: 'test_username',
        email: 'test@email.com'
      },
      token: 'JWT TEST.TOKEN'
    }
  }
  const user = {
    name: 'Test Joe',
    username: 'test_username',
    email: 'test@email.com'
  }
  const token = 'JWT TEST.TOKEN'
  expect(onSignupSuccess(res))
  .toEqual(actionPayload('SIGNUP_SUCCESS', { user, token }))
})

test('action signup failure', () => {
  const error = {
    status: 400,
    text: 'invalid signup'
  }
  expect(onSignupFailure(error))
  .toEqual(actionPayload('SIGNUP_FAILURE', { error }))
})
