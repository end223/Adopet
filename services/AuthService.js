const database = require('../models');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret');
const redisClient = require('../config/redis');

class AuthService {
    async login(dto) {
        const tutores = await database.Tutores.findOne({
            attributes: ['id', 'email', 'senha'],
            where: {
                email: dto.email
            }
        });

        if (!tutores) {
            throw new Error('Tutor não cadastrado');
        }

        const senhasIguais = await compare(dto.senha, tutores.senha);

        if (!senhasIguais) {
            throw new Error('Usuário ou senha inválidos');
        }

        const accessToken = sign(
            {
                id: tutores.id,
                email: tutores.email
            },
            jsonSecret.secret,
            {
                expiresIn: '1d'
            }
        );

        await redisClient.set(`allowlist:${tutores.id}`, accessToken);

        return { accessToken };
    }

    async logout(userId) {
        const accessToken = await redisClient.get(`allowlist:${userId}`);

        if (accessToken) {
            await redisClient.set(`blocklist:${userId}`, accessToken, 'EX', 86400);
            await redisClient.del(`allowlist:${userId}`);
        }
    }
}

module.exports = AuthService;
