const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Adocao extends Model {
        static associate(models) {
          // Associação com o modelo de animais (pets)
          Adocao.belongsTo(models.Pets, {
            foreignKey: 'pet_id',
          });
    
          // Associação com o modelo de tutores
          Adocao.belongsTo(models.Tutores, {
            foreignKey: 'tutor_id',
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
          pet_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              notEmpty: true,
            },
          },
          tutor_id: {
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
        }
      );
    
      return Adocao;
      
    };