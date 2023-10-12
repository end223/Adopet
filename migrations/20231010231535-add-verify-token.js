// sequelize/migrations/xxxxxx-create-verification-token.js

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Tutores', 'verificationToken', {
      type: Sequelize.STRING, // ou outro tipo apropriado
      allowNull: true,
      defaultValue: null, // Pode ser nulo para começar
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('Tutores', 'verificationToken');
  },
};
