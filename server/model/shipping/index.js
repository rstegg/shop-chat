module.exports = (sequelize, DataTypes) =>
  sequelize.define('shippings', {
    carrier: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tracking: {
      type: DataTypes.STRING,
      allowNull: true
    },
    method: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    packed: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: false
    },
    shipped: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: false
    },
    delivered: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: false
    },
    shippingLabelUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    customsLabelUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate () {
        this.belongsTo(sequelize.models['users'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
        this.belongsTo(sequelize.models['addresses'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
      }
    }
  })
