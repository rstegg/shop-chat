const { curry } = require('ramda')

const productParams = [ 'id', 'name', 'slug', 'isPublic', 'description', 'gallery', 'layout', 'themes', 'category', 'subCategory', 'price', 'image' ]

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
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

  Product.associate = ({ User, Thread, Offer }) => {
    Product.belongsTo(User)
    Product.belongsTo(Thread)
    Product.hasMany(Offer)
  }

  Product.getProductBySlug = (slug, User, Thread) =>
    Product.findOne({
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'image']
        },
        {
          model: Thread,
          attributes: [ 'id', 'name', 'owner' ]
        }
      ],
      where: { slug },
      attributes: productParams
    })
    .then(product =>
      !product ? Promise.reject('Invalid product id')
      : product
    )

  return Product

}
