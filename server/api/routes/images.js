const { models } = require('../../db')
const { User, Shop } = models

const passport = require('passport')
const jwt = require('jsonwebtoken')

const router = require('express').Router()

const AWS = require('aws-sdk')
const multer = require('multer')
const imager = require('multer-imager')
const shortId = require('shortid')

const s3 = new AWS.S3({

});

const uploadProfileImage = require('../handlers/images/uploadProfileImage')
const uploadProductImage = require('../handlers/images/uploadProductImage')
const uploadShopImage = require('../handlers/images/uploadShopImage')

module.exports = () => {

  const upload = multer({
    storage: imager({
      dirname: 'avatars',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'us-east-1',
      bucket: 'payup-storage',
      acl: 'public-read',
      contentType: imager.AUTO_CONTENT_TYPE,
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      filename: (req, file, cb) => {
        cb(null, shortId.generate() + '__' + Date.now().toString())
      },
      gm: {
        format: 'png',
        width: 200,
        height: 200,
        options: '%@'
      }
    })
  })
  const success =
    (req, res) => res.status(200).json({image: req.file.location})

  router.use(passport.authenticate('jwt', { session: false }))
  .post(`/image/shop`,
    passport.authenticate('jwt', { session: false }),
    upload.single('image'),
    success
  )
  .post(`/image/product`,
    passport.authenticate('jwt', { session: false }),
    upload.single('image'),
    success
  )
  .post(`/image/shop/:id`, //EDIT SHOP IMAGE
    upload.single('image'),
    uploadShopImage
  )
  .post(`/image/profile`, //EDIT PROFILE IMAGE
    passport.authenticate('jwt', { session: false }),
    upload.single('avatar'),
    uploadProfileImage
  )
  .post(`/image/:shopId/product/:id`, //EDIT PRODUCT IMAGE
    passport.authenticate('jwt', { session: false }),
    upload.single('image'),
    uploadProductImage
  )

  return router
}
