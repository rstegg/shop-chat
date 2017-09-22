const { curry } = require('ramda')

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    slug: DataTypes.STRING,
    layout: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'grid'
    },
    gallery: DataTypes.ARRAY(DataTypes.STRING),
    themes: DataTypes.JSONB,
    elements: DataTypes.ARRAY(DataTypes.JSONB),
    options: DataTypes.ARRAY(DataTypes.JSONB),
    isPublic: DataTypes.BOOLEAN,
    subCategory: DataTypes.STRING,
    tags: DataTypes.ARRAY(DataTypes.STRING),
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '0'
    },
    image: DataTypes.STRING
  })

  Product.associate = ({ Shop, User, Thread, Offer }) => {
    Product.belongsTo(Shop)
    Product.belongsTo(User)
    Product.belongsTo(Thread)
    Product.hasMany(Offer)
  }

  Product.getProductByShop = curry((slug, shop) =>
    Product.findOne({
      include: SingleProductAssociations,
      where: { slug, shopId: shop.id },
      attributes: productParams
    })
    .then(product =>
      !product ? Promise.reject('Invalid product id')
      : product
    )
  )

  return Product

}
