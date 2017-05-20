module.exports = (sequelize, DataTypes) =>
  sequelize.define('messages', {
    content_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate () {
        this.belongsTo(sequelize.models['users'], { foreignKey: { allowNull: true }, onDelete: 'CASCADE' })
        this.belongsTo(sequelize.models['threads'], { foreignKey: { allowNull: true }, onDelete: 'CASCADE' })
        this.belongsTo(sequelize.models['offers'], { foreignKey: { allowNull: true }, onDelete: 'CASCADE' })
      }
    }
  })
