import React from 'react'

import AccountSuccessMessage from './Account'
import AddressSuccessMessage from './Address'
import EmailSuccessMessage from './Email'

const AlertBox = () =>
  <div>
    <AccountSuccessMessage />
    <AddressSuccessMessage />
    <EmailSuccessMessage />
  </div>

export default AlertBox
