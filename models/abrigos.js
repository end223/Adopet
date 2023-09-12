const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Abrigos extends Model {
    static associate(models) {
      
      Abrigos.hasMany(models.Pets, {
        foreignKey: 'abrigos_id',
      });
    }
  }
  Abrigos.init(
    {
      ong: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
          notEmpty: true, 
        },
      },
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
    }, {
    sequelize,
    modelName: 'Abrigos',
  });
  return Abrigos;
};