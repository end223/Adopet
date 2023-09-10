const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tutores extends Model {
    static associate(models) {
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