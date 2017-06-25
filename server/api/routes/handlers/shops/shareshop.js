const { models } = requireDb
const { Shop } = models

const { mailgun } = apiRequire('service/mail')

const shortId = require('shortid')
const mailcomposer = require('mailcomposer')
const shareEmailTemplate = apiRequire('emails/share')

const validate = req =>
  Shop.findOne({
      where: { id: req.body.shopId }
  })
  .then(shop =>
      !shop ? Promise.reject('invalid shop')
      : shop
  )

module.exports = (req, res) =>
  validate(req)
    .then(shop =>
      mailcomposer({
        from: 'kuwau.com <hello@mg.kuwau.com>',
        to: req.body.email,
        subject: `Dear ${req.body.name}, someone shared a post with you at kuwau.com!`,
        text: `${req.user.name} shared a link on kuwau.com! ${req.body.url}`,
        html: shareEmailTemplate(req.body.name, req.user.name, req.body.url, req.body.message)
      })
      .build((mailBuildError, message) =>
        mailBuildError ? Promise.reject(mailBuildError)
        : mailgun.messages().sendMime({
            to: req.body.email,
            message: message.toString('ascii')
          }, (sendError, body) =>
            sendError ? Promise.reject(sendError)
            : body
        )
      )
    )
    .then(msg => res.status(200).json({sent: true}))
    .then(error => res.status(400).json({error}))
