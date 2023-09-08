'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class abrigos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  abrigos.init(
    {
      cidade: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
          notEmpty: true, 
        },
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
          notEmpty: true, 
        },
      },
      endereco: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
          notEmpty: true, 
        },
      },
    }, {
    sequelize,
    modelName: 'abrigos',
  });
  return abrigos;
};