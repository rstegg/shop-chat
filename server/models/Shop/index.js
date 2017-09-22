const Unique = type =>
({
  type,
  allowNull: false,
  defaultValue: false
})

module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define('shop', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    isPublic: DataTypes.BOOLEAN,
    slug: Unique(DataTypes.STRING),
    image: DataTypes.STRING
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
