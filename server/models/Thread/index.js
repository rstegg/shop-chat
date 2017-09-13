module.exports = (sequelize, DataTypes) => {
  const Thread = sequelize.define('thread', {
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  })

  Thread.associate = ({ User, Message, Shop, Product }) => {
    Thread.hasMany(User)
    Thread.hasMany(Message)
    Thread.hasMany(Shop)
    Thread.hasMany(Product)
  }

  return Thread

}
