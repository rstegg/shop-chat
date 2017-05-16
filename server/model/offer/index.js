module.exports = function(sequelize, DataTypes) {
  return sequelize.define('offers', {
    state: {
      type: DataTypes.STRING,
      allowNull: false,
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
      allowNull: true
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
        this.belongsTo(sequelize.models['products'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
      }
    }
  })
}
