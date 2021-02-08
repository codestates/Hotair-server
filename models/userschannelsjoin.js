'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usersChannelsJoin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  usersChannelsJoin.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: { model: 'users', key: 'id' },
      },
      channelId: {
        type: DataTypes.INTEGER,
        references: { model: 'channels', key: 'id' },
      },
    },
    {
      sequelize,
      modelName: 'usersChannelsJoin',
    },
  );
  return usersChannelsJoin;
};
