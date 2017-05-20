module.exports = (sequelize, DataTypes) =>
  sequelize.define('offers', {
    state: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'open'
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    seller_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate () {
        this.belongsTo(sequelize.models['users'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
        this.belongsTo(sequelize.models['products'], { foreignKey: { allowNull: true }, onDelete: 'CASCADE' })
        this.hasMany(sequelize.models['messages'], { foreignKey: { allowNull: true }, onDelete: 'CASCADE' })
      }
    }
  })
