'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tutores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tutores.init(
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      telefone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
    }, {
    sequelize,
    modelName: 'tutores',
    defaultScope: {
      attributes: { 
        exclude: ['senha'] },
    },
  });
  return tutores;
};