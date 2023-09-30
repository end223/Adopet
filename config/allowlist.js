// config/allowlist.js
const redisClient = require('./redis');

const allowlist = {
  async adicionar(token) {
    await redisClient.set(`allowlist:${token}`, 'authorized', 'EX', 86400); // Expira em 24 horas
  },

  async remover(token) {
    await redisClient.del(`allowlist:${token}`);
  },

  async verificar(token) {
    const resultado = await redisClient.get(`allowlist:${token}`);
    return resultado === 'authorized';
  },
};

module.exports = allowlist;
