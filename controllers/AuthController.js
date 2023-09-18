const AuthService = require('../services/AuthService')

const authService = new AuthService()

class AuthController {
    static async login(req, res) {
      const { email, senha } = req.body;
  
      try {
        const { accessToken, refreshToken } = await authService.login({
          email,
          senha,
        });
  
        res.status(200).send({ accessToken, refreshToken });
      } catch (error) {
        res.status(401).send({ message: error.message });
      }
    }
  }
  
  module.exports = AuthController;
  