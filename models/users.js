'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ chats, likes, channels }) {
      // define association here
      this.hasMany(chats, { foreignKey: 'userId' });
      this.belongsToMany(channels, {
        through: 'usersChannelsJoin',
        foreignKey: 'userId',
      });
      this.hasMany(likes, {
        foreignKey: 'userId',
      });
    }

    toJSON() {
      return { ...this.get(), password: undefined };
    }
  }
  users.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: true,
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          is: /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/,
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      avatar: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
        validate: {
          is: /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/,
        },
      },
      isUser: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'users',
    },
  );
  return users;
};
