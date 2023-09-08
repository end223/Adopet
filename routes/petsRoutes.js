const { Router } = require('express')
const PetController = require('../controllers/PetController')

const router = Router()

router
    .post('/pets', PetController.cadastrar)


    module.exports = router