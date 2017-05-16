module.exports = function(sequelize, DataTypes) {
  return {
    Offer: require('./model/offer')(sequelize, DataTypes),
    Payment: require('./model/payment')(sequelize, DataTypes),
    Product: require('./model/product')(sequelize, DataTypes),
    Shop: require('./model/shop')(sequelize, DataTypes),
    User: require('./model/user')(sequelize, DataTypes),
  }
}
