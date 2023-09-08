
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class pets extends Model {
    static associate(models) {

      pets.belongsTo(models.abrigos, {
        foreignKey: 'abrigos_id',
        as: 'abrigos', 
      });
    }
  }
  pets.init(
    {
      nome: {
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
      descricao: DataTypes.STRING,
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
      abrigos_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'pets',
    }
  );

  return pets;
};
