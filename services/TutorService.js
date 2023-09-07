const database = require('../models');
const { hash } = require('bcryptjs');
const uuid = require('uuid');

class TutorService {
    async cadastrar(dto) {
        const tutor = await database.tutores.findOne({
            where: {
                email: dto.email
            }
        })
        
        if (tutor) {
            throw new Error('E-mail já cadastrado')
        }

        try {
            const senhaHash = await hash(dto.senha, 8)
    
            const novoTutor = await database.tutores.create({
                id : uuid.v4(),
                nome: dto.nome,
                email: dto.email,
                senha: senhaHash
            })
    
            return novoTutor
        } catch (error) {
            throw new Error('Erro ao cadastrar Tutor')
            
        }

    }

    async buscarTodosTutores() {
        const tutores = await database.tutores.findAll()

        return tutores
    }

}

module.exports = TutorService