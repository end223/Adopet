const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pets extends Model {
    static associate(models) {

      Pets.belongsTo(models.Abrigos, {
        foreignKey: 'abrigos_id',
      });
    }
  }
  Pets.init(
    {
      abrigos_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
        },
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      adotado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      idade: {
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
      imagem: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },  
    },
    {
      sequelize,
      modelName: 'Pets',
    }
  );

  return Pets;
};
