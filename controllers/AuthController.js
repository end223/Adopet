const AuthService = require('../services/AuthService');

const authService = new AuthService();

class AuthController {
    static async login(req, res) {
        const { email, senha } = req.body;

        try {
            const login = await authService.login({ email, senha });

            res.status(200).send(login);
        } catch (error) {
            res.status(401).send({ message: error.message });
        }
    }

    static async logout(req, res) {
        const userId = req.tutorId;

        try {
            await authService.logout(userId);
            res.status(204).send();
        } catch (error) {
            res.status(500).send({ message: 'Erro ao fazer logout' });
        }
    }
}

module.exports = AuthController;
