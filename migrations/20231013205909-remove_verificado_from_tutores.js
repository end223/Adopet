'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tutores', 'verificado');
  },

  down: async (queryInterface, Sequelize) => {
    // Se necessário, você pode adicionar um método "down" para reverter a remoção da coluna, caso seja necessário
  },
};
