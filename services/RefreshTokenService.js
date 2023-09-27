const { verify, sign } = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret');

class RefreshTokenService {
  generateRefreshToken(payload) {
    return sign(payload, jsonSecret.refreshSecret, {
      expiresIn: '7d', // Pode ajustar a expiração conforme necessário
    });
  }

  async verifyRefreshToken(refreshToken) {
    try {
      const decoded = await verify(refreshToken, jsonSecret.refreshSecret);
      return decoded;
    } catch (error) {
      throw new Error('RefreshToken inválido');
    }
  }
}

module.exports = RefreshTokenService;
