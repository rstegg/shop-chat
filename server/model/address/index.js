module.exports = (sequelize, DataTypes) =>
  sequelize.define('addresses', {
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
  }, {
    freezeTableName: true,
    classMethods: {
      associate () {
        this.belongsTo(sequelize.models['users'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
        this.hasMany(sequelize.models['shippings'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
      }
    }
  })
