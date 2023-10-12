const emailService = require('../config/emailService');
const database = require('../models');
const { hash } = require('bcrypt');
const crypto = require('crypto');

async function gerarToken() {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(20, (err, buffer) => {
        if (err) {
          reject(err);
        } else {
          const token = buffer.toString('hex');
          resolve(token);
        }
      });
    });
  }

async function enviarLinkRedefinicaoSenha(email) {
  const usuario = await database.Tutores.findOne({ where: { email } });
  if (!usuario) {
    throw new Error('Usuário não encontrado.');
  }

  const token = await gerarToken();

  usuario.tokenRedefinicaoSenha = token;
  await usuario.save();

  const resetLink = `http://localhost:8000/redefinir-senha?token=${token}`;
  await emailService.enviarEmailRedefinicaoSenha(usuario.email, resetLink);
}

async function redefinirSenha(token, novaSenha) {
  const usuario = await database.Tutores.findOne({ where: { tokenRedefinicaoSenha: token } });
  if (!usuario) {
    throw new Error('Token inválido ou expirado.');
  }

  usuario.senha = await hash(novaSenha, 8);
  usuario.tokenRedefinicaoSenha = null;
  await usuario.save();
}

module.exports = {
  enviarLinkRedefinicaoSenha,
  redefinirSenha,
};
