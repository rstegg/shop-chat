const Default = (type, defaultValue) =>
({
  type,
  defaultValue
})

module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define('offer', {
    state: Default(DataTypes.STRING, 'open'),
    productName: DataTypes.STRING,
    price: DataTypes.STRING,
    sellerId: DataTypes.INTEGER
  })

  Offer.associate = ({ User, Product, Message }) => {
    Offer.belongsTo(User)
    Offer.belongsTo(Product)
    Offer.hasMany(Message)
  }

  return Offer
}
