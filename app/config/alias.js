'use strict'

const path = require('path')
const paths = require('./paths')

// config after eject: we're in ./config/
module.exports = {
  'react-native': 'react-native-web',
  'actions': path.join(paths.appSrc, 'js/redux/actions'),
  'components': path.join(paths.appSrc, 'js/components'),
  'elements': path.join(paths.appSrc, 'js/elements'),
  'layouts': path.join(paths.appSrc, 'js/layouts'),
  'pages': path.join(paths.appSrc, 'js/pages'),
  'utils': path.join(paths.appSrc, 'js/utils')
}
