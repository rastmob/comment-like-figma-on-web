'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      site_id: {
        type: Sequelize.INTEGER
      },
      page_id: {
        type: Sequelize.INTEGER
      },
      selector: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      },
      parent_id: {
        type: Sequelize.INTEGER
      },
      index: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.INTEGER
      },
      deleted: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comments');
  }
};