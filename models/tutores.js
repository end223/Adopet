const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tutores extends Model {
    static associate(models) {
      Tutores.hasMany(models.Adocao, {
        foreignKey: 'tutor_id'
      })
    }
  }
  Tutores.init(
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
    modelName: 'Tutores',
    defaultScope: {
      attributes: { 
        exclude: ['senha'] },
    },
  });
  return Tutores;
};