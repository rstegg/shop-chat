const { curry } = require('ramda')

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
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
  })

  Product.associate = ({ Shop, User, Thread, Offer }) => {
    Product.belongsTo(Shop)
    Product.belongsTo(User)
    Product.belongsTo(Thread)
    Product.hasMany(Offer)
  }

  Product.getProductsByShop = (slug, shop) =>
    Product.findOne({
      include: SingleProductAssociations,
      where: { slug, shopId: shop.id },
      attributes: productParams
    })
    .then(product =>
      !product ? Promise.reject('Invalid product id')
      : product
    )

  return Product

}
