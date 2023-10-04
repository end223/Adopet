'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('abrigos', 'telefone', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('abrigos', 'telefone');
  }
};
