const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tutores extends Model {
    static associate(models) {
      Tutores.belongsToMany(models.roles, {
        through: models.tutores_roles,
        as: 'tutor_roles',
        foreignKey: 'tutor_id'
      })
      
      Tutores.belongsToMany(models.permissoes, {
        through: models.tutores_permissoes,
        as: 'tutor_permissoes',
        foreignKey: 'tutor_id'
      })      

      Tutores.hasMany(models.Adocao, {
        foreignKey: 'tutor'
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