module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('address', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    line1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    line2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    }
  })

  Address.associate = ({ User, Shipping }) => {
    Address.belongsTo(User)
    Address.hasMany(Shipping)
  }
  return Address
}
