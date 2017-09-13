module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define('shop', {
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
  })

  Shop.associate = ({ User, Thread, Product }) => {
    Shop.belongsTo(User)
    Shop.belongsTo(Thread)
    Shop.hasMany(Product)
  }

  Shop.findShopBySlug = slug =>
    Shop.findOne({
      where: { slug },
      attributes: [ 'id', 'name', 'description', 'isPublic', 'slug', 'image', ]
    })
    .then(shop =>
      !shop ? Promise.reject('Invalid shop')
      : shop
    )

  return Shop
}
