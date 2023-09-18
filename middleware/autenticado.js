const { verify, decode, sign } = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret.js');

const validRefreshTokens = new Set();

module.exports = async (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return res.status(401).send('Acesso não autorizado: AccessToken não informado');
  }

  const [, accessTokenValue] = accessToken.split(' ');

  try {
    verify(accessTokenValue, jsonSecret.secret);

    const { id, email } = await decode(accessTokenValue);

    req.tutorId = id;
    req.tutorEmail = email;

    return next();
  } catch (error) {
    const refreshToken = req.cookies.refreshToken; // Recuperando o refreshToken do cookie.

    if (!refreshToken || !validRefreshTokens.has(refreshToken)) {
      return res.status(401).send('Acesso não autorizado: Token inválido');
    }

    try {
      const decodedRefreshToken = verify(refreshToken, jsonSecret.refreshSecret);

      const newAccessToken = sign(
        {
          id: decodedRefreshToken.id,
          email: decodedRefreshToken.email,
        },
        jsonSecret.secret,
        {
          expiresIn: 86400, 
        }
      );

      res.setHeader('Authorization', `Bearer ${newAccessToken}`);

      return next();
    } catch (refreshTokenError) {
      return res.status(401).send('Acesso não autorizado: RefreshToken inválido');
    }
  }
};
