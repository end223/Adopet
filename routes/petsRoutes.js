const { Router } = require('express')
const PetController = require('../controllers/PetController')
const roles = require('../middleware/roles')
const permissoes = require('../middleware/permissoes')
const permissoesRoles = require('../middleware/permissoesRoles')
const passport = require('../config/passportConfig');


const router = Router()

router
    .post('/pets', roles(["Abrigo"]), permissoes(["Cadastrar"]), PetController.cadastrar)
    .get('/pets', passport.authenticate('bearer', { session: false }), permissoes(["Listar"]), PetController.buscarTodosPets)
    .get('/pets/id/:id', permissoesRoles(["Listar"]), PetController.buscarPetPorId) 
    .put('/pets/id/:id', roles(["Abrigo"]), permissoes(["Editar"]), PetController.atualizarPet)
    .delete('/pets/id/:id', roles(["Abrigo"]), permissoes(["Deletar"]), PetController.deletarPet)

    module.exports = router