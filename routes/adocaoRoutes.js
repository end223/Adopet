const { Router } = require('express')
const AdocaoController = require('../controllers/AdocaoController')
const roles = require('../middleware/roles')
const permissoesRoles = require('../middleware/permissoesRoles')
const permissoes = require('../middleware/permissoes')


const router = Router()

router
    .post('/adocao', roles(["Abrigo"]), permissoes(["Cadastrar"]), AdocaoController.cadastrar)
    .get('/adocao', permissoes(["Listar"]), AdocaoController.buscarTodasAdocao)
    .get('/adocao/id/:id', permissoesRoles(["Listar"]), AdocaoController.buscarAdocaoPorId)
    .put('/adocao/id/:id', roles(["Abrigo"]), permissoes(["Editar"]), AdocaoController.atualizarAdocao)
    .delete('/adocao/id/:id', roles(["Abrigo"]), permissoes(["Deletar"]), AdocaoController.deletarAdocao)

    module.exports = router