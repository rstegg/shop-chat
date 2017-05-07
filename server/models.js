module.exports = function(sequelize, DataTypes) {
  return {
    Article: require('./model/article')(sequelize, DataTypes),
    User: require('./model/user')(sequelize, DataTypes),
    Post: require('./model/post')(sequelize, DataTypes),
    Shop: require('./model/shop')(sequelize, DataTypes),
    Payment: require('./model/payment')(sequelize, DataTypes),
  }
}
