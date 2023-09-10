
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Adocao', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      tutor: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tutores',
          key: 'id',
        },
      },
      animal: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pets',
          key: 'id',
        },
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Adocao');
  },
};
