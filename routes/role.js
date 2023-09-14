const { Router } = require('express')
const RoleController = require('../controllers/RoleController')

const router = Router()

router
    .post('/roles', RoleController.cadastrar)
    .get('/roles')
    .get('/roles/:id')
    .put('/roles/:id')
    .delete('/roles/:id')

module.exports = router