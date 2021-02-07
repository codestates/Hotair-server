'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usersLikesJoin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  usersLikesJoin.init(
    {
      userId: DataTypes.INTEGER,
      likeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'usersLikesJoin',
    },
  );
  return usersLikesJoin;
};
