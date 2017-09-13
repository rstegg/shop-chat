module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('payment', {
    processor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    paymentPackageId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    paymentSettingsKey: {
      type: DataTypes.STRING,
      allowNull: false
    },
    storedCard: {
      type: DataTypes.STRING,
      allowNull: true
    },
    method: {
      type: DataTypes.STRING,
      // allowedValues: ['credit', 'debit', 'shipping-credit'],
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'new'
    },
    mode: {
      type: DataTypes.STRING,
      allowNull: true
      // allowedValues: ['authorize', 'capture', 'refund', 'cancel', 'void']
    },
  })

  Payment.associate = ({ User }) => {
    Payment.belongsTo(User)
    // this.hasMany(sequelize.models['transactions'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
  }

  return Payment
}
