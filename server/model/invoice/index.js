module.exports = (sequelize, DataTypes) =>
  sequelize.define('invoices', {
    transaction: {
      type: DataTypes.STRING,
      allowNull: true
    },
    shipping: {
      type: DataTypes.STRING,
      decimal: true,
      allowNull: true
    },
    taxes: {
      type: DataTypes.STRING,
      decimal: true,
      allowNull: true
    },
    subtotal: {
      type: DataTypes.STRING,
      decimal: true
    },
    discounts: {
      type: DataTypes.STRING,
      decimal: true,
      allowNull: true
    },
    total: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate () {
        this.belongsTo(sequelize.models['users'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
      }
    }
  })
