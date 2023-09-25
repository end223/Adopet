// middleware/autenticado.js

const { verify } = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret.js');
const redisClient = require('../config/redis');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send('Token de acesso não informado');
    }

    const [, accessToken] = token.split(" ");

    try {
        const decodedToken = verify(accessToken, jsonSecret.secret);

        const isTokenRevoked = await redisClient.exists(`blocklist:${decodedToken.id}`);

        if (isTokenRevoked) {
            return res.status(401).send('Token revogado');
        }

        req.tutorId = decodedToken.id;
        req.tutorEmail = decodedToken.email;

        return next();
    } catch (error) {
        res.status(401).send('Usuário não autorizado');
    }
}
