module.exports = (sequelize, DataTypes) =>
({
  Message: require('./model/message')(sequelize, DataTypes),
  Offer: require('./model/offer')(sequelize, DataTypes),
  Product: require('./model/product')(sequelize, DataTypes),
  Shop: require('./model/shop')(sequelize, DataTypes),
  Thread: require('./model/thread')(sequelize, DataTypes),
  User: require('./model/user')(sequelize, DataTypes),
})
