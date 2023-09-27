const { Router } = require('express')
const AuthController = require('../controllers/AuthController')
const TutoresController = require('../controllers/TutorController')
const passport = require('../config/passportConfig');



const router = Router();

router
    .post('/auth/login', AuthController.login)
    .post('/cadastro', TutoresController.registrar)
    .post('/auth/logout', AuthController.logout)
    .post('/refresh-token', passport.authenticate('bearer', { session: false }), AuthController.refreshAccessToken);
    

    router.post('/auth/login/abrigo', AuthController.loginAbrigo);
    router.post('/auth/login/tutor', AuthController.loginTutor);   

module.exports = router;
