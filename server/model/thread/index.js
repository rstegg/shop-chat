module.exports = (sequelize, DataTypes) =>
  sequelize.define('threads', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate () {
        this.hasMany(sequelize.models['users'], { foreignKey: { allowNull: true }, onDelete: 'CASCADE' })
        this.hasMany(sequelize.models['messages'], { foreignKey: { allowNull: true }, onDelete: 'CASCADE' })
        this.hasMany(sequelize.models['shops'], { foreignKey: { allowNull: true }, onDelete: 'CASCADE' })
      }
    }
  })
