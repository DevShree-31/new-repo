'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Patients.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    number: {
      type:DataTypes.INTEGER,
      validate:{
        is: {
          args: /^[6-9]\d{9}$/, // Mobile number should start with 6-9 and followed by 9 digits
          msg: 'Mobile number must be a 10-digit number starting with 6-9.'
        }
      },
      allowNull:false
    },
    gender: {
      type:DataTypes.CHAR,
      allowNull:false,
    }
  }, {
    sequelize,
    modelName: 'Patients',
  });
  return Patients;
};