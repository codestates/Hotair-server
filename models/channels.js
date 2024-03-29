'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class channels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ chats, users }) {
      // define association here
      this.hasMany(chats, { foreignKey: 'channelId' });
      this.belongsToMany(users, {
        through: 'usersChannelsJoin',
        foreignKey: 'channelId',
      });
    }
  }
  channels.init(
    {
      channelName: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'channels',
    },
  );
  return channels;
};
