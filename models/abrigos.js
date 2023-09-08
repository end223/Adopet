const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class abrigos extends Model {

    static associate(models) {
      
      abrigos.hasMany(models.pets, {
        foreignKey: 'abrigos_id',
        as: 'pets',
      });
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