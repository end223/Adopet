const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class pets extends Model {
    static associate(models) {

      pets.belongsTo(models.Abrigos, {
        foreignKey: 'abrigos_id',
      });
    }
  }
  pets.init(
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
      porte: {
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
      tableName: 'pets',
    }
  );

  return pets;
};
