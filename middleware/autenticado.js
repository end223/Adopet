// middleware/autenticado.js
const { verify, decode } = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret');
const allowlist = require('../config/allowlist'); // Importe a allowlist

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send('Token de acesso não informado');
  }

  const [, accessToken] = token.split(' ');

  try {
    const { id, email } = await decode(accessToken);
    req.tutorId = id;
    req.tutorEmail = email;

    const isTokenAuthorized = await allowlist.verificar(accessToken);
    if (!isTokenAuthorized) {
      return res.status(401).send('Token de acesso não autorizado');
    }

    return next();
  } catch (error) {
    res.status(401).send('Usuário não autorizado');
  }
};
