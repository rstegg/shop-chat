const crypto = require('crypto')

//TODO: Clean up model

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
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
    }
  })

  User.associate = ({ Thread, Shop, Product, Message, Offer }) => {
    User.belongsTo(Thread)
    User.hasMany(Shop)
    User.hasMany(Product)
    User.hasMany(Message)
    User.hasMany(Offer)
  }

  User.prototype.validPassword = function(password) {
    const testhash = crypto.createHash('md5').update(password + this.salt).digest("hex");
    if (testhash === this.password) {
      return true;
    } else {
      return false;
    }
  }

  return User
}
