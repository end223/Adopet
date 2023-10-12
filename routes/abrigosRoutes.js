const { Router } = require('express')
const AbrigoController = require('../controllers/AbrigoController')
const roles = require('../middleware/roles')
const permissoes = require('../middleware/permissoes')
const permissoesRoles = require('../middleware/permissoesRoles')
const passport = require('../config/passportConfig');

const router = Router()

router
    .post('/abrigos', passport.authenticate('bearer', { session: false }), roles(["Abrigo"]), permissoes(["Cadastrar"]), AbrigoController.cadastrar)
    .get('/abrigos', AbrigoController.buscarTodosAbrigos)
    .get('/abrigos/id/:id', AbrigoController.buscarAbrigoPorId) 
    .put('/abrigos/id/:id', passport.authenticate('bearer', { session: false }), roles(["Abrigo"]), permissoes(["Editar"]), AbrigoController.atualizarAbrigo)
    .delete('/abrigos/id/:id', passport.authenticate('bearer', { session: false }), roles(["Abrigo"]), permissoes(["Deletar"]), AbrigoController.deletarAbrigo)

    module.exports = router