module.exports = (sequelize, DataTypes) =>
  sequelize.define('products', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    layout: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'grid'
    },
    gallery: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: []
    },
    themes: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    elements: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true
    },
    options: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    subCategory: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '0'
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate () {
        this.belongsTo(sequelize.models['shops'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
        this.belongsTo(sequelize.models['users'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
        this.belongsTo(sequelize.models['threads'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
        this.hasMany(sequelize.models['offers'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
      }
    }
  })
