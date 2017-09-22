const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^([a-zA-Z]+)[0-9]*\.*[a-zA-Z0-9]+$|^[a-zA-Z]+[0-9]*$/
      }
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    permalink: DataTypes.STRING,
    verifyToken: DataTypes.STRING,
    bio: DataTypes.STRING,
    website: DataTypes.STRING,
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'individual'
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIP: true,
      }
    },
    name: DataTypes.STRING,
    dob: DataTypes.STRING,
    image: DataTypes.STRING
  })

  User.associate = ({ Account, Thread, Shop, Product, Message, Offer }) => {
    User.belongsTo(Thread)
    User.hasMany(Shop)
    User.hasMany(Product)
    User.hasMany(Message)
    User.hasMany(Offer)
  }

  User.prototype.validPassword = function(password) {
    return bcrypt.compare(password, this.password)
  }

  return User
}
