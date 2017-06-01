import React from 'react'

import AlertBox from 'components/AlertBox'
import AddCreditCard from 'components/AddCreditCard'
import AddBitcoin from 'components/AddBitcoin'
import WithdrawBitcoin from 'components/WithdrawBitcoin'
import WithdrawBank from 'components/WithdrawBank'

export default () =>
  <div>
    <AlertBox />
    <AddCreditCard />
    <AddBitcoin />
    <WithdrawBank />
    <WithdrawBitcoin />
  </div>
