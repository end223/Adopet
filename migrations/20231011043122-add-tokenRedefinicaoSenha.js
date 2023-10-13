// sequelize/migrations/xxxxxx-create-verification-token.js

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('tutores', 'tokenRedefinicaoSenha', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('tutores', 'tokenRedefinicaoSenha');
  },
};
