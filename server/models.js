module.exports = (sequelize, DataTypes) =>
({
  Address: require('./model/address')(sequelize, DataTypes),
  Message: require('./model/message')(sequelize, DataTypes),
  Offer: require('./model/offer')(sequelize, DataTypes),
  Product: require('./model/product')(sequelize, DataTypes),
  Shop: require('./model/shop')(sequelize, DataTypes),
  Shipping: require('./model/shipping')(sequelize, DataTypes),
  Thread: require('./model/thread')(sequelize, DataTypes),
  User: require('./model/user')(sequelize, DataTypes),
})
