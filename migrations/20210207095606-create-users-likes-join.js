'use strict';

const likes = require('../models/likes');
const users = require('../models/users');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usersLikesJoins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: users, key: 'id' },
      },
      likeId: {
        type: Sequelize.INTEGER,
        references: { model: 'likes', key: 'id' },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usersLikesJoins');
  },
};
