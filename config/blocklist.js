// config/blocklist.js
const redisClient = require('./redis');

const blocklist = {
  async adicionar(token) {
    await redisClient.set(`blocklist:${token}`, 'blocked', 'EX', 86400); // Expira em 24 horas
  },
  async verificar(token) {
    const resultado = await redisClient.get(`blocklist:${token}`);
    return resultado === 'blocked';
  },
};

module.exports = blocklist;
