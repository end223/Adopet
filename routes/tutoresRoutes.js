const { Router } = require('express')
const TutoresController = require('../controllers/TutorController')
const roles = require('../middleware/roles')
const permissoes = require('../middleware/permissoes')
const passport = require('../config/passportConfig');

const router = Router()


router
    .post('/tutores', TutoresController.cadastrar)
    .get('/tutores', TutoresController.buscarTodosTutores)
    .get('/tutores/id/:id', passport.authenticate('bearer', { session: false }), TutoresController.buscarTutorPorId) 
    .put('/tutores/id/:id', passport.authenticate('bearer', { session: false }), TutoresController.atualizarTutor)
    .delete('/tutores/id/:id', passport.authenticate('bearer', { session: false }), roles(["Abrigo"]), permissoes(["Deletar"]), TutoresController.deletarTutor)

    module.exports = router