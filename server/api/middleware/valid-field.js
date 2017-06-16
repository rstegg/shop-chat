const { path } = require('ramda')

const validField = p => obj => Boolean(path([p], obj))

module.exports = validField
