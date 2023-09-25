const { verify } = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret.js');

module.exports = async (req, res, next) => {
  const refreshToken = req.headers['refresh-token'];

  if (!refreshToken) {
    return res.status(401).send('Refresh token não informado');
  }

  try {
    verify(refreshToken, jsonSecret.refreshSecret);

    return next();
  } catch (error) {
    return res.status(401).send('Refresh token inválido');
  }
};