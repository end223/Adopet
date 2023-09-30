// controllers/authController.js
const AuthService = require('../services/AuthService');
const allowlist = require('../config/allowlist'); 
const blocklist = require('../config/blocklist'); 

const authService = new AuthService();

class AuthController {
  static async login(req, res) {
    try {
      const { email, senha } = req.body;
      const login = await authService.login({ email, senha });
      await allowlist.adicionar(login.accessToken);
      res.status(200).send(login);
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  }

  static async loginAbrigo(req, res) {
    const { email, senha } = req.body;
    try {
      const login = await authService.loginAbrigo({ email, senha });

      await allowlist.adicionar(login.accessToken);

      res.status(200).send(login);
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  }

  static async loginTutor(req, res) {
    const { email, senha } = req.body;
    try {
      const login = await authService.loginTutor({ email, senha });

      await allowlist.adicionar(login.accessToken);

      res.status(200).send(login);
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  }


  static async refreshAccessToken(req, res) {
    try {
      const { refreshToken } = req.body;
      const newAccessToken = await authService.refreshAccessToken(refreshToken);
      res.status(200).send(newAccessToken);
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  }


  static async logout(req, res) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).send('Token de acesso não informado');
      }
      const [, accessToken] = token.split(' ');

      await allowlist.remover(accessToken);

      await blocklist.adicionar(accessToken);


      res.status(200).send('Logout realizado com sucesso');
    } catch (error) {
      res.status(500).send('Erro ao realizar logout');
    }
  }
}

module.exports = AuthController;
