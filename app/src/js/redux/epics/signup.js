import { onSignupSuccess, onSignupFailure } from 'actions/signup'
import { path } from 'ramda'
import { Observable } from 'rxjs/Rx'

import { post } from './helpers/req'

const getError = path([ 'response', 'text', 'error' ])

const api = {
  signup: ({ user }) =>
    post('auth/signup', { user })
}

const onSignupSubmit = action$ =>
  action$.ofType('SIGNUP_SUBMIT')
    .mergeMap(action =>
      api.signup(action.payload)
        .map(onSignupSuccess)
        .catch(res => Observable.of(
          onSignupFailure(getError(res))
        ))
      )

export default onSignupSubmit
