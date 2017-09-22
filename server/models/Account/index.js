module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('account', {
    stripeBitcoins: DataTypes.ARRAY(DataTypes.STRING),
    stripeCards: DataTypes.ARRAY(DataTypes.JSONB),
    stripeBanks: DataTypes.ARRAY(DataTypes.JSONB),
    stripeCustomer: DataTypes.JSONB,
    stripeAccount: DataTypes.JSONB
  })

  Account.associate = ({ User }) => {
    Account.belongsTo(User)
  }

  Account.findAccountByUser = user =>
    Account.findOne({ where: { userId: user.id }})
      .then(account =>
        !account ? Promise.reject('invalid user')
        : account
      )

  return Account
}
