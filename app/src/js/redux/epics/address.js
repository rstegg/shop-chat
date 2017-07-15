import { onSaveAddressSettingsSuccess, onSaveAddressSettingsFailure } from 'actions/address'
import su from 'superagent'
import { Observable } from 'rxjs/Rx'

const API_HOST = '/api/v1'

const api = {
  saveAddressSettings: ({ address, user }) => {
    const request = su.put(`${API_HOST}/address`)
        .send({ address })
        .set('Accept', 'application/json')
        .set('Authorization', user.token)
    return Observable.fromPromise(request)
  }
}

export const saveAddressSettings = action$ =>
  action$.ofType('SAVE_ADDRESS_SETTINGS')
    .mergeMap(action =>
      api.saveAddressSettings(action.payload)
        .map(onSaveAddressSettingsSuccess)
        .catch(res => Observable.of(onSaveAddressSettingsFailure(res)))
    )
