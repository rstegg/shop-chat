module.exports = (sequelize, DataTypes) =>
  sequelize.define('threads', {
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate () {
        this.hasMany(sequelize.models['users'], { foreignKey: { allowNull: true }, onDelete: 'CASCADE' })
        this.hasMany(sequelize.models['messages'], { foreignKey: { allowNull: true }, onDelete: 'CASCADE' })
        this.hasMany(sequelize.models['shops'], { foreignKey: { allowNull: true }, onDelete: 'CASCADE' })
        this.hasMany(sequelize.models['products'], { foreignKey: { allowNull: true }, onDelete: 'CASCADE' })
      }
    }
  })
