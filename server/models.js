module.exports = function(sequelize, DataTypes) {
  return {
    User: require('./model/user')(sequelize, DataTypes),
    Shop: require('./model/shop')(sequelize, DataTypes),
    Payment: require('./model/payment')(sequelize, DataTypes),
    Product: require('./model/product')(sequelize, DataTypes)
  }
}
