import { onSaveShippingSettingsSuccess, onSaveShippingSettingsFailure } from 'actions/shipping'
import su from 'superagent'
import { Observable } from 'rxjs/Rx'

const API_HOST = '/api/v1'

const api = {
  saveShippingSettings: ({shipping, user}) => {
    const request = su.put(`${API_HOST}/shipping`)
        .send({shipping})
        .set('Accept', 'application/json')
        .set('Authorization', user.token)
    return Observable.fromPromise(request)
  }
}

export const saveShippingSettings = action$ =>
  action$.ofType('SAVE_SHIPPING_SETTINGS')
    .mergeMap(action =>
      api.saveShippingSettings(action.payload)
        .map(onSaveShippingSettingsSuccess)
        .catch(res => {
          const parsedRes = JSON.parse(res.response.text)
          return Observable.of(onSaveShippingSettingsFailure(parsedRes.error))
        })
    )
