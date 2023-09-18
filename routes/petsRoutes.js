const { Router } = require('express')
const PetController = require('../controllers/PetController')
const permissoes = require('../middleware/permissoes')

const router = Router()

router
    .post('/pets', permissoes(["Funções de Tutor"]), PetController.cadastrar)
    .get('/pets', PetController.buscarTodosPets)
    .get('/pets/id/:id', PetController.buscarPetPorId) 
    .put('/pets/id/:id', permissoes(["Funções de Tutor"]), PetController.atualizarPet)
    .delete('/pets/id/:id', permissoes(["Funções de Abrigo"]), PetController.deletarPet)

    module.exports = router