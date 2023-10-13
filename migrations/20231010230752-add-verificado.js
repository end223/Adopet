'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('tutores', 'verificado', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false, 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tutores', 'verificado');
  }
};
