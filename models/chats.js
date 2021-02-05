'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ users, channels, likes }) {
      // define association here
      this.belongsTo(users, { foreignKey: 'userId' });
      this.belongsTo(channels, { foreignKey: 'channelId' });
      this.hasMany(likes, {
        foreignKey: 'chatId',
        targetKey: 'id',
      });
    }
  }
  chats.init(
    {
      channelId: {
        type: DataTypes.INTEGER,
      },
      likeId: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'chats',
    },
  );
  return chats;
};
