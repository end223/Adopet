const database = require('../models')
const { compare } = require ('bcryptjs') 
const { sign } = require ('jsonwebtoken')
const jsonSecret = require ('../config/jsonSecret')


class AuthService {
    async login (dto){
        const tutores = await database.Tutores.findOne({
            attributes: ['id', 'email', 'senha'],
            where: {
                email: dto.email
            }
        })
        if (!tutores) {
            throw new Error('Tutor não cadastrado')
        }    

        const senhasIguais = await compare(dto.senha, tutores.senha)
        
        if (!senhasIguais) {
            throw new Error('Usuario ou senha inválido')
        }

        const acessToken = sign({ 
            id: tutores.id,
            email: tutores.email
        }, jsonSecret.secret, {
            expiresIn: 86400
        })

        return { acessToken }

        }

    }

module.exports = AuthService