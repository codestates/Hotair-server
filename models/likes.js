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
      this.belongsTo(chats, { foreignKey: 'chatId' });
      this.belongsToMany(users, {
        through: 'usersLikesJoin',
        foreignKey: 'likeId',
      });
    }
  }
  likes.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      chatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'likes',
    },
  );
  return likes;
};
