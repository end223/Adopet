const { Router } = require('express')
const PetController = require('../controllers/PetController')
const roles = require('../middleware/roles')
const permissoes = require('../middleware/permissoes')
const permissoesRoles = require('../middleware/permissoesRoles')
const autenticadoMiddleware = require('../middleware/autenticado')





const router = Router()

router
    .post('/pets', roles(["Abrigo"]), permissoes(["Cadastrar"]), PetController.cadastrar)
    .get('/pets', autenticadoMiddleware, permissoes(["Listar"]), PetController.buscarTodosPets)
    .get('/pets/id/:id', permissoesRoles(["Listar"]), PetController.buscarPetPorId) 
    .put('/pets/id/:id', roles(["Abrigo"]), permissoes(["Editar"]), PetController.atualizarPet)
    .delete('/pets/id/:id', roles(["Abrigo"]), permissoes(["Deletar"]), PetController.deletarPet)

    module.exports = router