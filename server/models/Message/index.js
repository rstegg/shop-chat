module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    contentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  })

  Message.associate = ({ User, Thread, Offer }) => {
    Message.belongsTo(User)
    Message.belongsTo(Thread)
    Message.belongsTo(Offer)
  }

  return Message
}
