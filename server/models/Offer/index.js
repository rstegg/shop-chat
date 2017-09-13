module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define('offer', {
    state: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'open'
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })

  Offer.associate = ({ User, Product, Message }) => {
    Offer.belongsTo(User)
    Offer.belongsTo(Product)
    Offer.hasMany(Message)
  }

  return Offer
}
