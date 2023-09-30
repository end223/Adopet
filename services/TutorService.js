const database = require('../models');
const { hash } = require('bcryptjs');
const uuid = require('uuid');
const { validarSenha, validarNome, validarEmail } = require('../config/validacoesComuns')

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
                senha: senhaHash
            })

            return novoTutor
        } catch (error) {
            throw new Error('Erro ao cadastrar Tutor')

        }

    }

    async registrar(dto) {

        if (!validarNome(dto.nome)) {
            return { message:'O nome deve ter no mínimo 3 e no máximo 25 caracteres'};
          }
      
          if (!validarEmail(dto.email)) {
            return { message:'Utilize um e-mail válido'};
          }

        const tutorExistente = await database.Tutores.findOne({
          where: {
            email: dto.email,
          },
        });
    
        if (tutorExistente) {
            return { message: 'E-mail já cadastrado'};
        }
        
        if (dto.senha !== dto.confirmarSenha) {
            return { message: 'As senhas não coincidem'};
          }
    
        try {
          const senhaHash = await hash(dto.senha, 8);
    
          const novoTutor = await database.Tutores.create({
            id: uuid.v4(),
            nome: dto.nome,
            email: dto.email,
            senha: senhaHash,
          });
    
          return novoTutor;
        } catch (error) {
            return { message:'Erro ao cadastrar Tutor'};
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