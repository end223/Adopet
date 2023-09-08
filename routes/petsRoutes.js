const { Router } = require('express')
const PetController = require('../controllers/PetController')

const router = Router()

router
    .post('/pets', PetController.cadastrar)
    .get('/pets', PetController.buscarTodosPets)
    .get('/pets/id/:id', PetController.buscarPetPorId) 
    .put('/pets/id/:id', PetController.atualizarPet)
    .delete('/pets/id/:id', PetController.deletarPet)

    module.exports = router