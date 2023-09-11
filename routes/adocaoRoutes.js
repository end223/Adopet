const { Router } = require('express')
const AdocaoController = require('../controllers/AdocaoController')

const router = Router()

router
    .post('/adocao', AdocaoController.cadastrar)
    .get('/adocao/id/:id', AdocaoController.buscarAdocaoPorId) 
    .delete('/adocao/id/:id', AdocaoController.deletarAdocao)

    module.exports = router