'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tutores_permissoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tutores_permissoes.init({
    tutores_id: DataTypes.UUID,
    permissao_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'tutores_permissoes',
  });
  return tutores_permissoes;
};