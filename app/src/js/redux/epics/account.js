import { onSaveAccountSettingsSuccess, onSaveAccountSettingsFailure } from 'actions/login'
import su from 'superagent'
import { Observable } from 'rxjs/Rx'

const API_HOST = '/api/v1'

const api = {
  saveAccountSettings: ({account, user}) => {
    const request = su.post(`${API_HOST}/account`)
        .send({account})
        .set('Accept', 'application/json')
        .set('Authorization', user.token)
    return Observable.fromPromise(request)
  }
}

export const onSaveAccountSettings = action$ =>
  action$.ofType('SAVE_ACCOUNT_SETTINGS')
    .mergeMap(action =>
      api.saveAccountSettings(action.payload)
        .map(onSaveAccountSettingsSuccess)
        .catch(error => Observable.of(onSaveAccountSettingsFailure(error.response.text)))
    )
