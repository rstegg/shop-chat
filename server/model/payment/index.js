module.exports = (sequelize, DataTypes) =>
  sequelize.define('payments', {
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
  }, {
    freezeTableName: true,
    classMethods: {
      associate () {
        this.belongsTo(sequelize.models['users'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
        this.hasManu(sequelize.models['users'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
        // this.hasMany(sequelize.models['transactions'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
      }
    }
  })
