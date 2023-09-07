const { Router } = require('express')
const TutoresController = require('../controllers/TutorController')

const router = Router()

router
    .post('/tutores', TutoresController.cadastrar)
    .get('/tutores', TutoresController.buscarTodosTutores)
    .get('/tutores/id/:id', TutoresController.buscarTutorPorId) 
    .put('/tutores/id/:id', TutoresController.atualizarTutor)
    .delete('/tutores/id/:id', TutoresController.deletarTutor)

    module.exports = router