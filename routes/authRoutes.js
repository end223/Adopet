const { Router } = require('express')
const AuthController = require('../controllers/AuthController')
const TutoresController = require('../controllers/TutorController')
const autenticadoMiddleware = require('../middleware/autenticado')

const router = Router();

router.post('/auth/login', AuthController.login)
    .post('/auth/register', TutoresController.cadastrar)
    .post('/auth/logout', autenticadoMiddleware, AuthController.logout)

module.exports = router;


//router
    //.post('/auth/register', AuthController.register)
    //.get('/auth/register', AuthController.showRegister)

    //.post('/auth/login', AuthController.login)
    //.get('/auth/login', AuthController.showLogin)

    //.get('/auth/logout', AuthController.logout)

    //.get('/dashboard', AuthController.showDashboard)


    module.exports = router