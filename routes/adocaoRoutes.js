const { Router } = require('express')
const AdocaoController = require('../controllers/AdocaoController')
const roles = require('../middleware/roles')
const permissoesRoles = require('../middleware/permissoesRoles')
const permissoes = require('../middleware/permissoes')
const passport = require('../config/passportConfig');



const router = Router()

router
    .post('/adocao', passport.authenticate('bearer', { session: false }), roles(["Abrigo"]), permissoes(["Cadastrar"]), AdocaoController.cadastrar)
    .get('/adocao', passport.authenticate('bearer', { session: false }), roles(["Abrigo"]), permissoes(["Listar"]), AdocaoController.buscarTodasAdocao)
    .get('/adocao/id/:id', passport.authenticate('bearer', { session: false }), permissoesRoles(["Listar"]), AdocaoController.buscarAdocaoPorId)
    .put('/adocao/id/:id', passport.authenticate('bearer', { session: false }), roles(["Abrigo"]), permissoes(["Editar"]), AdocaoController.atualizarAdocao)
    .delete('/adocao/id/:id', passport.authenticate('bearer', { session: false }), roles(["Abrigo"]), permissoes(["Deletar"]), AdocaoController.deletarAdocao)

    module.exports = router