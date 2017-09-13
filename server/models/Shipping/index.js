module.exports = (sequelize, DataTypes) => {

  const Shipping = sequelize.define('shipping', {
    carrier: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tracking: {
      type: DataTypes.STRING,
      allowNull: true
    },
    method: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    packed: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: false
    },
    shipped: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: false
    },
    delivered: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: false
    },
    shippingLabelUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    customsLabelUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  })

  Shipping.associate = ({ User, Address }) => {
    Shipping.belongsTo(User)
    Shipping.belongsTo(Address)
  }

  return Shipping

}
