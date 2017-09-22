module.exports = (sequelize, DataTypes) => {
  const Thread = sequelize.define('thread', {
    name: DataTypes.STRING,
    owner: DataTypes.STRING
  })

  Thread.associate = ({ User, Message, Shop, Product }) => {
    Thread.hasMany(User)
    Thread.hasMany(Message)
    Thread.hasMany(Shop)
    Thread.hasMany(Product)
  }

  return Thread

}
