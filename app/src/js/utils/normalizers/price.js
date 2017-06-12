import { length } from 'ramda'

const normalizePrice = value => {
  if (!value) {
    return value
  }

  if(!value.includes('.')) {
    return value
  }
  const onlyNums = value.replace(/^[0-9]([.,][0-9]{1,3})?$/g, '')
  const integers = onlyNums.split('.')[0]
  const decimals = onlyNums.split('.')[1]

  const withDecimals = integers.concat('.').concat(decimals)
  
  if(length(decimals) > 2) {
    const numVals = parseFloat(withDecimals, 10)
    const withFixedDecimals = numVals.toFixed(2)
    return withFixedDecimals.toString()
  }

  return withDecimals
}

export default normalizePrice
