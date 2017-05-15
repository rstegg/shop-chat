import { onSignupSuccess, onSignupFailure } from '../actions/signup'
import su from 'superagent'
import { Observable } from 'rxjs/Rx'

const API_HOST = '/api/v1'

const api = {
  signup: ({user}) => {
    const request = su.post(`${API_HOST}/signup`)
        .send({user})
        .set('Accept', 'application/json')
    return Observable.fromPromise(request)
  }
}

const onSignupSubmit = action$ =>
  action$.ofType('SIGNUP_SUBMIT')
    .mergeMap(action =>
      api.signup(action.payload)
        .map(onSignupSuccess)
        .catch(error => Observable.of(onSignupFailure(error.response.text)))
      )

export default onSignupSubmit
