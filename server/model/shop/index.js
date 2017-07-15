module.exports = (sequelize, DataTypes) =>
  sequelize.define('shops', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate () {
        this.belongsTo(sequelize.models['users'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
        this.belongsTo(sequelize.models['threads'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
        this.hasMany(sequelize.models['products'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
      }
    }
  })
