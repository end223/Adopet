const { Router } = require('express')
const AdocaoController = require('../controllers/AdocaoController')
const roles = require('../middleware/roles')

const router = Router()

router
    .post('/adocao', roles(["Abrigo"]), AdocaoController.cadastrar)
    .get('/adocao', AdocaoController.buscarTodasAdocao)
    .get('/adocao/id/:id', AdocaoController.buscarAdocaoPorId)
    .put('/adocao/id/:id', roles(["Abrigo"]), AdocaoController.atualizarAdocao)
    .delete('/adocao/id/:id', roles(["Abrigo"]), AdocaoController.deletarAdocao)

    module.exports = router