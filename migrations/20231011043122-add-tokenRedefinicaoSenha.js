// sequelize/migrations/xxxxxx-create-verification-token.js

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Tutores', 'tokenRedefinicaoSenha', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('Tutores', 'tokenRedefinicaoSenha');
  },
};
