module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    contentType: DataTypes.STRING,
    text: DataTypes.STRING
  })

  Message.associate = ({ User, Thread, Offer }) => {
    Message.belongsTo(User)
    Message.belongsTo(Thread)
    Message.belongsTo(Offer)
  }

  return Message
}
