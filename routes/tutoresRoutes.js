const { Router } = require('express')
const TutoresController = require('../controllers/TutorController')

const router = Router()

router
    .post('/tutores', TutoresController.cadastrar)
    .get('/tutores')
    .get('/tutores/id/:id')
    .put('/tutores/id/:id')
    .delete('/tutores/id/:id')

    module.exports = router