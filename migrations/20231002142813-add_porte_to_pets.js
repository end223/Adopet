module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('pets', 'porte', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('pets', 'porte');
  },
};
