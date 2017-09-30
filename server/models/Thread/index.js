module.exports = (sequelize, DataTypes) => {
  const Thread = sequelize.define('thread', {
    name: DataTypes.STRING,
    owner: DataTypes.STRING
  })

  Thread.associate = ({ User, Message, Product }) => {
    Thread.hasMany(User)
    Thread.hasMany(Message)
    Thread.hasMany(Product)
  }

  return Thread

}
