const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class adocao extends Model {
        static associate(models) {
          
          adocao.belongsTo(models.Pets, {
            foreignKey: 'pet',
          });
          adocao.belongsTo(models.Tutores, {
            foreignKey: 'tutor',
          });
        }
      }
    
      adocao.init(
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
    
      return adocao;
      
    };