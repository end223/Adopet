'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tutores', 'verificado', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Defina o valor padrão como false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tutores', 'verificado');
  }
};
