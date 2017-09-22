const False = type =>
({
  type,
  allowNull: true,
  defaultValue: false
})

module.exports = (sequelize, DataTypes) => {

  const Shipping = sequelize.define('shipping', {
    carrier: DataTypes.STRING,
    tracking: DataTypes.STRING,
    method: DataTypes.STRING,
    rate: DataTypes.STRING,
    packed: False(DataTypes.BOOLEAN),
    shipped: False(DataTypes.BOOLEAN),
    delivered: False(DataTypes.BOOLEAN),
    shippingLabelUrl: DataTypes.STRING,
    customsLabelUrl: DataTypes.STRING
  })

  Shipping.associate = ({ User, Address }) => {
    Shipping.belongsTo(User)
    Shipping.belongsTo(Address)
  }

  return Shipping

}
