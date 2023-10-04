const { Router } = require('express')
const AbrigoController = require('../controllers/AbrigoController')
const roles = require('../middleware/roles')
const permissoes = require('../middleware/permissoes')
const permissoesRoles = require('../middleware/permissoesRoles')

const router = Router()

router
    .post('/abrigos', roles(["Abrigo"]), permissoes(["Cadastrar"]), AbrigoController.cadastrar)
    .get('/abrigos', AbrigoController.buscarTodosAbrigos)
    .get('/abrigos/id/:id', permissoesRoles(["Listar"]), AbrigoController.buscarAbrigoPorId) 
    .put('/abrigos/id/:id', AbrigoController.atualizarAbrigo)
    .delete('/abrigos/id/:id', roles(["Abrigo"]), permissoes(["Deletar"]), AbrigoController.deletarAbrigo)

    module.exports = router