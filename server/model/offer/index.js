module.exports = (sequelize, DataTypes) =>
  sequelize.define('offers', {
    state: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'open'
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sellerId: {
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
