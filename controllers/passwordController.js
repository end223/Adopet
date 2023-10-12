const passwordService = require('../services/passwordService');

class PasswordController {
  static async esqueceuSenha(req, res) {
    const { email } = req.body;

    try {
      await passwordService.enviarLinkRedefinicaoSenha(email);
      res.status(200).send({ message: 'Um e-mail de redefinição de senha foi enviado para o seu endereço de e-mail.' });
    } catch (error) {
      res.status(500).send({ message: 'Erro ao enviar o e-mail de redefinição de senha.' });
    }
  }

  static async redefinirSenha(req, res) {
    const token = req.query.token;

    const { novaSenha } = req.body;

    try {
      await passwordService.redefinirSenha(token, novaSenha);
      res.status(200).send({ message: 'Senha redefinida com sucesso.' });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}


module.exports = PasswordController;
