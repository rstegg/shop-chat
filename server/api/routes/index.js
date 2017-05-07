const login = require('./login')
const signup = require('./signup')
const articles = require('./articles')
const posts = require('./posts')
const shops = require('./shops')
const profile = require('./profile')
const images = require('./images')
const feed = require('./feed')

module.exports = [
  login,
  signup,
  posts,
  articles,
  shops,
  profile,
  images,
  feed
]
