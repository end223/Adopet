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
                id: uuid.v4(),
                nome: dto.nome,
                email: dto.email,
                telefone: dto.telefone,
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

    async buscarTutorPorId(id) {
        const tutor = await database.tutores.findOne({
            where: {
                id: id
            }
        })

        if (!tutor) {
            throw new Error('Tutor informado não cadastrado')
        }

        return tutor

    }

    async atualizarTutor(dto) {
        const tutor = await this.buscarTutorPorId(dto.id)
        try {
            tutor.nome = dto.nome
            tutor.email = dto.email
            tutor.telefone = dto.telefone
            await tutor.save()
            return tutor
        } catch (error) {
            throw new Error('Erro ao editar tutor!')
        }
    }   

    async deletarTutor(id) {
        await this.buscarTutorPorId(id)

        try {
            await database.tutores.destroy({
                where: {
                    id: id
                }
            })

        } catch (error) {
            throw new Error('Erro ao deletar tutor!')
        }
    }

}

module.exports = TutorService