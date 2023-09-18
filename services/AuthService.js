const database = require('../models')
const { compare } = require ('bcryptjs') 
const { sign } = require ('jsonwebtoken')
const jsonSecret = require ('../config/jsonSecret')


class AuthService {
    async login(dto) {
      const tutores = await database.Tutores.findOne({
        attributes: ['id', 'email', 'senha'],
        where: {
          email: dto.email,
        },
      });
      if (!tutores) {
        throw new Error('Tutor não cadastrado');
      }
  
      const senhasIguais = await compare(dto.senha, tutores.senha);
  
      if (!senhasIguais) {
        throw new Error('Usuário ou senha inválido');
      }
  
      const accessToken = sign(
        {
          id: tutores.id,
          email: tutores.email,
        },
        jsonSecret.secret,
        {
          expiresIn: 86400,
        }
      );
  
      const refreshToken = sign(
        {
          id: tutores.id,
          email: tutores.email,
        },
        jsonSecret.refreshSecret,
        {
          expiresIn: 604800,
        }
      );
  
      return { accessToken, refreshToken };
    }
  }
  
  module.exports = AuthService;
  