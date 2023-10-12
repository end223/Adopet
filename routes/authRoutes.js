const { Router } = require('express')
const AuthController = require('../controllers/AuthController')
const TutoresController = require('../controllers/TutorController')
const PasswordController = require('../controllers/passwordController')
const passport = require('../config/passportConfig');



const router = Router();

router
    .post('/auth/login',  AuthController.login)
    .post('/cadastro', TutoresController.registrar)
    .post('/auth/logout', AuthController.logout)
    .get('/confirm', TutoresController.confirmarEmail)
    .post('/esqueceu-senha', PasswordController.esqueceuSenha)
    .post('/redefinir-senha', PasswordController.redefinirSenha)
    .post('/auth/refresh', passport.authenticate('bearer', { session: false }), AuthController.refreshAccessToken);
    

    router.post('/login/abrigo', AuthController.loginAbrigo);
    router.post('/login/tutor', AuthController.loginTutor);   

module.exports = router;
