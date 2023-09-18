const { Router } = require('express')
const AbrigoController = require('../controllers/AbrigoController')
const roles = require('../middleware/roles')
const permissoes = require('../middleware/permissoes')
const permissoesRoles = require('../middleware/permissoesRoles')

const router = Router()

router
    .post('/abrigos', roles(["Tutor"]), permissoes(["Cadastrar"]), AbrigoController.cadastrar)
    .get('/abrigos', permissoesRoles(["Listar"]), AbrigoController.buscarTodosAbrigos)
    .get('/abrigos/id/:id', permissoesRoles(["Listar"]), AbrigoController.buscarAbrigoPorId) 
    .put('/abrigos/id/:id', roles(["Tutor"]), permissoes(["Editar"]), AbrigoController.atualizarAbrigo)
    .delete('/abrigos/id/:id', roles(["Tutor"]), permissoes(["Deletar"]), AbrigoController.deletarAbrigo)

    module.exports = router