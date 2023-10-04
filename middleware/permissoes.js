// middlewares/permissoes.js

const database = require('../models');

const permissoes = (listaDePermissoes) => {
  return async (req, res, next) => {
    const { user } = req; 

    try {
      const tutor = await database.Tutores.findOne({
        include: [
          {
            model: database.permissoes,
            as: 'tutor_permissoes',
            attributes: ['id', 'nome'],
          },
        ],
        where: {
          id: user.id, 
        },
      });

      if (!tutor) {
        return res.status(401).send('Tutor não cadastrado');
      }

      const permissoesCadastradas = tutor.tutor_permissoes
        .map((permissao) => permissao.nome)
        .some((permissao) => listaDePermissoes.includes(permissao));

      if (!permissoesCadastradas) {
        return res.status(401).send('Tutor não possui permissão para acessar essa rota');
      }

      return next();
    } catch (error) {
      return res.status(500).send('Erro ao verificar as permissões');
    }
  };
};

module.exports = permissoes;
