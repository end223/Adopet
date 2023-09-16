const database = require('../models');
const { hash } = require('bcryptjs');
const uuid = require('uuid');

class TutorService {
    async cadastrar(dto) {
        const Tutor = await database.Tutores.findOne({
            where: {
                email: dto.email
            }
        })

        if (Tutor) {
            throw new Error('E-mail já cadastrado')
        }

        try {
            const senhaHash = await hash(dto.senha, 8)

            const novoTutor = await database.Tutores.create({
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
        const Tutores = await database.Tutores.findAll({
            include: [
                {
                    model: database.roles,
                    as: 'tutor_roles',
                    attributes: ['id', 'nome', 'descricao'],
                    through: {
                        attributes: [],
                    }
                },
                {
                    model: database.permissoes,
                    as: 'tutor_permissoes',
                    attributes: ['id', 'nome', 'descricao'],
                    through: {
                        attributes: [],
                    }
                }
            ]
        })

        return Tutores
    }

    async buscarTutorPorId(id) {
        const Tutor = await database.Tutores.findOne({
            include: [
                {
                    model: database.roles,
                    as: 'tutor_roles',
                    attributes: ['id', 'nome', 'descricao'],
                    through: {
                        attributes: [],
                    }
                },
                {
                    model: database.permissoes,
                    as: 'tutor_permissoes',
                    attributes: ['id', 'nome', 'descricao'],
                    through: {
                        attributes: [],
                    }
                }
            ],
            where: {
                id: id
            }
        })

        if (!Tutor) {
            throw new Error('Tutor informado não cadastrado')
        }

        return Tutor

    }

    async atualizarTutor(dto) {
        const Tutor = await this.buscarTutorPorId(dto.id)
        try {
            Tutor.nome = dto.nome
            Tutor.email = dto.email
            Tutor.telefone = dto.telefone
            await Tutor.save()
            return Tutor
        } catch (error) {
            throw new Error('Erro ao editar tutor!')
        }
    }   

    async deletarTutor(id) {
        await this.buscarTutorPorId(id)

        try {
            await database.Tutores.destroy({
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