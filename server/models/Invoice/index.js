module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('invoice', {
    transaction: DataTypes.STRING,
    shipping: DataTypes.STRING,
    taxes: DataTypes.STRING,
    subtotal: DataTypes.STRING,
    discounts: DataTypes.STRING,
    total: DataTypes.STRING
  })

  Invoice.associate = ({ User }) => {
    Invoice.belongsTo(User)
  }

  return Invoice
}
