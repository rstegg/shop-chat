const crypto = require('crypto')

//TODO: Clean up model

module.exports = (sequelize, DataTypes) =>
  sequelize.define('users', {
    stripeBitcoins: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    stripeCards: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true,
    },
    stripeBanks: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true,
    },
    stripeCustomer: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    stripeAccount: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
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
    permalink: {
      type: DataTypes.STRING,
      allowNull: false
    },
    verify_token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'individual'
    },
    ip_address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIP: true,
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    verifyNeeded: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate () {
        this.belongsTo(sequelize.models['threads'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
        this.hasMany(sequelize.models['shops'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
        this.hasMany(sequelize.models['products'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
        this.hasMany(sequelize.models['messages'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
        this.hasMany(sequelize.models['offers'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
      }
    },
    instanceMethods: {
      validPassword(password) {
        const testhash = crypto.createHash('md5').update(password + this.salt).digest("hex");
        if (testhash === this.password) {
          return true;
        } else {
          return false;
        }
      }
    }
  })
