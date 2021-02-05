'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ chats, users }) {
      // define association here
      this.belongsTo(chats, { foreignKey: 'chatId', targetKey: 'id' });
      this.belongsTo(users, { foreignKey: 'userId', targetKey: 'id' });
    }
  }
  likes.init(
    {
      chatId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'likes',
    },
  );
  return likes;
};
