const { Router } = require('express')
const SegurancaController = require('../controllers/SegurancaController')
const passport = require('../config/passportConfig');

const router = Router()

router
    .post('/seguranca/acl', passport.authenticate('bearer', { session: false }), SegurancaController.cadastrarAcl)
    .post('/seguranca/permissoes-roles', passport.authenticate('bearer', { session: false }), SegurancaController.cadastrarPermissoesRoles)

module.exports = router