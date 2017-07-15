import { onLoginSuccess, onLoginFailure } from 'actions/login'
import { path } from 'ramda'
import { Observable } from 'rxjs'

import { post } from './helpers/req'

const getError = path([ 'response', 'text', 'error' ])

const api = {
  login: ({ username, password }) =>
    post('auth/login', { username, password })
}

const onLoginSubmit = action$ =>
  action$.ofType('LOGIN_SUBMIT')
    .mergeMap(action =>
      api.login(action.payload)
        .map(onLoginSuccess)
        .catch(res => Observable.of(
          onLoginFailure(getError(res))
        ))
    )

export default onLoginSubmit
