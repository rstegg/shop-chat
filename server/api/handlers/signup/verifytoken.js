const { models } = require('../../../db')
const { User } = models

const { mailgun } = require('../../service/mail')

const {pathEq} = require('ramda')

module.exports = (req, res) => {
    User.findOne({ where: { permalink: req.params.permalink }})
      .then(user => {
        if (!pathEq(['verify_token'], req.params.verify_token, user)) {
          return res.status(200).send('Invalid verification token. Please try again or contact support.')
        }
        return User.update({ verified: true }, { where: { permalink: req.params.permalink }, returning: true, plain: true })
      })
      .then(updatedUser => {
        const verified = {
          subscribed: true,
          name: user.name,
          address: user.email
        }
        mailgun.lists('news@mg.kuwau.com').members().create(verified, (err, data) => {
          if(err) {
            console.log(err);
          }
          res.redirect('/')
        })
      })
    .catch(err => res.redirect('/')) //TODO: if this fails, we want to know
}
