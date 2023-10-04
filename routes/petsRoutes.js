const { Router } = require('express')
const PetController = require('../controllers/PetController')
const roles = require('../middleware/roles')
const permissoes = require('../middleware/permissoes')
const permissoesRoles = require('../middleware/permissoesRoles')
const passport = require('../config/passportConfig');


const router = Router()

router
    .post('/pets', roles(["Abrigo"]), permissoes(["Cadastrar"]), PetController.cadastrar)
    .get('/pets', PetController.buscarTodosPets)
    .get('/pets/abrigo/:abrigoId', PetController.buscarPetsPorAbrigo)
    .get('/pets/id/:id', PetController.buscarPetPorId) 
    .put('/pets/id/:id',  passport.authenticate('bearer', { session: false }),PetController.atualizarPet)
    .delete('/pets/id/:id',  passport.authenticate('bearer', { session: false }), roles(["Abrigo"]), permissoes(["Deletar"]), PetController.deletarPet)

    module.exports = router 