const validator = require('validator');

function validarSenha(senha) {
  // A senha deve conter pelo menos uma letra maiúscula, um número e ter entre 6 e 15 caracteres
  const senhaRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,15}$/;
  return senhaRegex.test(senha);
}

function validarNome(nome) {
  // O nome deve ter no mínimo 3 e no máximo 20 caracteres
  return nome.length >= 3 && nome.length <= 25;
}

function validarEmail(email) {
  // Verificar se o email é válido usando o módulo validator
  return validator.isEmail(email);
}

module.exports = {
  validarSenha,
  validarNome,
  validarEmail,
};
