module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('invoice', {
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
  })

  Invoice.associate = ({ User }) => {
    Invoice.belongsTo(User)
  }

  return Invoice
}
