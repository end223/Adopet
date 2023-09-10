
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Abrigos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cidade: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
      },
      endereco: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Abrigos');
  }
};