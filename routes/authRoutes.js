const { Router } = require('express')
const AuthController = require('../controllers/AuthController')
const TutoresController = require('../controllers/TutorController')



const router = Router();

router
    .post('/auth/login', AuthController.login)
    .post('/auth/register', TutoresController.cadastrar)
    .post('/auth/logout', AuthController.logout)
    .post('/refresh-token', AuthController.refreshAccessToken);
    

    router.post('/auth/login/abrigo', AuthController.loginAbrigo);
    router.post('/auth/login/tutor', AuthController.loginTutor);   

module.exports = router;
