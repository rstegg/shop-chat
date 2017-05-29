const crypto = require('crypto')

module.exports = (sequelize, DataTypes) =>
  sequelize.define('shippings', {
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
      }
    },
    instanceMethods: {
      validPassword(password) {
        const testhash = crypto.createHash('md5').update(password + this.salt).digest("hex");
        if(testhash === this.password) {
          return true;
        } else {
          return false;
        }
      }
    }
  })
