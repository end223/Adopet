const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class adocao extends Model {
        static associate(models) {
          // Associação com o modelo de animais (pets)
          adocao.belongsTo(models.pets, {
            foreignKey: 'animal',
            as: 'animal',
          });
    
          // Associação com o modelo de tutores
          adocao.belongsTo(models.tutores, {
            foreignKey: 'tutor',
            as: 'tutor',
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
          animal: {
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
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
              notEmpty: true,
            },
          },
        },
        {
          sequelize,
          modelName: 'adocao',
        }
      );
    
      return adocao;
      
    };