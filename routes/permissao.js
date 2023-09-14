const { Router } = require('express');

const router = Router();

router
    .post('/permissao')
    .get('/permissao')
    .get('/permissao/:id')
    .put('/permissao/:id')
    .delete('/permissao/:id')

module.exports = router    