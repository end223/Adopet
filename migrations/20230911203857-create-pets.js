
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      abrigos_id: { 
        type: Sequelize.INTEGER,
        references: {
          model: 'Abrigos', 
          key: 'id' 
        },
      nome: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      adotado: {
        type: Sequelize.BOOLEAN
      },
      idade: {
        type: Sequelize.STRING
      },
      porte: {
        type: Sequelize.STRING
      },
      endereco: {
        type: Sequelize.STRING
      },
        allowNull: false
      },
      imagem: {
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
    await queryInterface.dropTable('Pets');
  }
};