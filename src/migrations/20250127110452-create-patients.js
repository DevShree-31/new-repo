'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
          is: {
            args: /^[6-9]\d{9}$/, // Mobile number should start with 6-9 and followed by 9 digits
            msg: 'Mobile number must be a 10-digit number starting with 6-9.'
          }
        }
      },
      gender: {
        type: Sequelize.CHAR,
        allowNull:false
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
    await queryInterface.dropTable('Patients');
  }
};