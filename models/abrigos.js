const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class abrigos extends Model {
    static associate(models) {
      
      abrigos.hasMany(models.Pets, {
        foreignKey: 'abrigos_id',
      });
    }
  }
  abrigos.init(
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
      telefone: {
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
    tableName: 'abrigos',
  });
  return abrigos;
};