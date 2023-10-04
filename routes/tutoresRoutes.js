const { Router } = require('express')
const TutoresController = require('../controllers/TutorController')
const passport = require('../config/passportConfig');

const router = Router()


router
    .post('/tutores', TutoresController.cadastrar)
    .get('/tutores', passport.authenticate('bearer', { session: false }), TutoresController.buscarTodosTutores)
    .get('/tutores/id/:id', passport.authenticate('bearer', { session: false }), TutoresController.buscarTutorPorId) 
    .put('/tutores/id/:id', passport.authenticate('bearer', { session: false }), TutoresController.atualizarTutor)
    .delete('/tutores/id/:id', TutoresController.deletarTutor)

    module.exports = router