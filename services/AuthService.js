// services/authservice.js

const database = require('../models');
const { compare } = require('bcryptjs');
const { sign, verify } = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret');
const RefreshTokenService = require('./RefreshTokenService');
const allowlist = require('../config/allowlist');
const { sendConfirmationEmail } = require('../config/emailService');

class AuthService {
  constructor() {
    this.refreshTokenService = new RefreshTokenService();
  }

  async login(dto) {
    const tutores = await database.Tutores.findOne({
      attributes: ['id', 'email', 'senha', 'verificado'],
      where: {
        email: dto.email,
      },
    });
    if (!tutores) {
      return { message: "Tutor não cadastrado" };
    }

    if (!tutores.verificado) {
      sendConfirmationEmail(tutores.id, tutores.email);

      return { message: "E-mail não verificado, confirme o cadastro no link enviado para o email." };
    }

    const senhasIguais = await compare(dto.senha, tutores.senha);

    if (!senhasIguais) {
      return { message: "Usuário ou senha inválidos" };
    }

    const accessToken = this.generateAccessToken({
      id: tutores.id,
      email: tutores.email,
    });

    const refreshToken = this.refreshTokenService.generateRefreshToken({
      id: tutores.id,
      email: tutores.email,
    });

    await allowlist.adicionar(accessToken);
    await allowlist.adicionar(refreshToken);

    const user = {
      id: tutores.id,
      email: tutores.email,
    };
  
    return { user, token: accessToken, refreshToken: refreshToken }; 
  }

  async loginAbrigo(dto) {
    dto.role = 'Abrigo';
    return this.loginWithRole(dto);
  }

  async loginTutor(dto) {
    dto.role = 'Tutor';
    return this.loginWithRole(dto);
  }

  async loginWithRole(dto) {
    const tutores = await database.Tutores.findOne({
      attributes: ['id', 'email', 'senha'],
      where: {
        email: dto.email,
      },
      include: [{
        model: database.roles,
        as: 'tutor_roles', 
        where: {
          nome: dto.role,
        }
      }]
    });

    if (!tutores) {
      return { message: "Não cadastrado ou sem papel adequado" };
    }

    const senhasIguais = await compare(dto.senha, tutores.senha);

    if (!senhasIguais) {
      return { message: "Email ou senha inválidos" }
    }

    let tokenPayload = {
      id: tutores.id,
      email: tutores.email,
    }

    const user = {
      id: tutores.id,
      email: tutores.email,
    };

    const accessToken = this.generateAccessToken(tokenPayload);

    await allowlist.adicionar(accessToken);

    return { user, token: accessToken };
  }

  generateAccessToken(payload) {
    return sign(payload, jsonSecret.secret, {
      expiresIn: '24h', 
    });
  }

  async findByEmail(email) {
    return await database.Tutores.findOne({
      where: {
        email: email,
      },
    });
  }

  async verificarSenha(user, senha) {
    return await compare(senha, user.senha);
  }

  async verifyToken(accessToken) {
    try {
      const decoded = await verify(accessToken, jsonSecret.secret);
      return decoded;
    } catch (error) {
      throw new Error('Token de acesso inválido');
    }
  }

  async refreshAccessToken(refreshToken) {
    const decoded = await this.refreshTokenService.verifyRefreshToken(refreshToken);

    const accessToken = this.generateAccessToken({
      id: decoded.id,
      email: decoded.email,
    });

    return { accessToken };
  }
}

module.exports = AuthService;
