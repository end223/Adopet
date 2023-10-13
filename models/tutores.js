const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tutores extends Model {
    static associate(models) {
      tutores.belongsToMany(models.roles, {
        through: models.tutores_roles,
        as: 'tutor_roles',
        foreignKey: 'tutor_id'
      })
      
      tutores.belongsToMany(models.permissoes, {
        through: models.tutores_permissoes,
        as: 'tutor_permissoes',
        foreignKey: 'tutor_id'
      })      

      tutores.hasMany(models.Adocao, {
        foreignKey: 'tutor'
      })
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
      verificado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      tokenRedefinicaoSenha: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
    }, {
    sequelize,
    modelName: 'Tutores',
    tableName: 'tutores',
    defaultScope: {
      attributes: { 
        exclude: ['senha'] },
    },
  });
  return tutores;
};