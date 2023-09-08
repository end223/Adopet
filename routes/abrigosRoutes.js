const { Router } = require('express')
const AbrigoController = require('../controllers/AbrigoController')

const router = Router()

router
    .post('/abrigos', AbrigoController.cadastrar)
    .get('/abrigos', AbrigoController.buscarTodosAbrigos)
    .get('/abrigos/id/:id', AbrigoController.buscarAbrigoPorId) 
    .put('/abrigos/id/:id', AbrigoController.atualizarAbrigo)
    .delete('/abrigos/id/:id', AbrigoController.deletarAbrigo)

    module.exports = router