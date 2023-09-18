const { Router } = require('express')
const PetController = require('../controllers/PetController')
const roles = require('../middleware/roles')
const permissoes = require('../middleware/permissoes')
const permissoesRoles = require('../middleware/permissoesRoles')


const router = Router()

router
    .post('/pets', roles(["Tutor"]), permissoes(["Cadastrar"]), PetController.cadastrar)
    .get('/pets', permissoes(["Listar"]), PetController.buscarTodosPets)
    .get('/pets/id/:id', permissoesRoles(["Listar"]), PetController.buscarPetPorId) 
    .put('/pets/id/:id', roles(["Tutor", "Abrigo"]), permissoes(["Editar"]), PetController.atualizarPet)
    .delete('/pets/id/:id', roles(["Tutor", "Abrigo"]), permissoes(["Deletar"]), PetController.deletarPet)

    module.exports = router