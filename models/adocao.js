const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Adocao extends Model {
        static associate(models) {
          
          Adocao.belongsTo(models.Pets, {
            foreignKey: 'pet',
          });
          Adocao.belongsTo(models.Tutores, {
            foreignKey: 'tutor',
          });
        }
      }
    
      Adocao.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
          },
          pet: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              notEmpty: true,
            },
          },
          tutor: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
              notEmpty: true,
            },
          },
          data: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
              notEmpty: true,
            },
          },
        },
        {
          sequelize,
          modelName: 'Adocao',

          tableName: 'adocao',

        }
      );
    
      return Adocao;
      
    };