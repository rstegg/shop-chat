module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('address', {
    name: DataTypes.STRING,
    line1: DataTypes.STRING,
    line2: DataTypes.STRING,
    city: DataTypes.STRING,
    region: DataTypes.STRING,
    country: DataTypes.STRING,
    zip: DataTypes.STRING,
    phone: DataTypes.STRING
  })

  Address.associate = ({ User, Shipping }) => {
    Address.belongsTo(User)
    Address.hasMany(Shipping)
  }
  return Address
}
