module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('payment', {
    processor: DataTypes.STRING,
    paymentPackageId: DataTypes.STRING,
    paymentSettingsKey: DataTypes.STRING,
    storedCard: DataTypes.STRING,
    method: DataTypes.STRING, // allowedValues: ['credit', 'debit', 'shipping-credit'],
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'new'
    },
    mode: DataTypes.STRING, // allowedValues: ['authorize', 'capture', 'refund', 'cancel', 'void']
  })

  Payment.associate = ({ User }) => {
    Payment.belongsTo(User)
    // Payment.hasMany(Transactions)
  }

  return Payment
}
