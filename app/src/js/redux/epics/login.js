import { onLoginSuccess, onLoginFailure } from 'actions/login'
import su from 'superagent'
import { Observable } from 'rxjs/Rx'

const API_HOST = '/api/v1'

const api = {
  login: ({username, password}) => {
    const request = su.post(`${API_HOST}/login`)
        .send({username, password})
        .set('Accept', 'application/json')
    return Observable.fromPromise(request)
  }
}

const onLoginSubmit = action$ =>
  action$.ofType('LOGIN_SUBMIT')
    .mergeMap(action =>
      api.login(action.payload)
        .map(onLoginSuccess)
        .catch(res => {
          const parsedRes = res.response.text
          return Observable.of(onLoginFailure(parsedRes.error))
        })
    )

export default onLoginSubmit
