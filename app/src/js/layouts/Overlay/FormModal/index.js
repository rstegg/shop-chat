import React from 'react'

import AddCreditCard from './AddCreditCard'
import AddBitcoin from './AddBitcoin'
import WithdrawBitcoin from './WithdrawBitcoin'
import WithdrawBank from './WithdrawBank'

export default () =>
  <div>
    <AddCreditCard />
    <AddBitcoin />
    <WithdrawBank />
    <WithdrawBitcoin />
  </div>
