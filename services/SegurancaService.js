const database = require('../models')
const Sequelize = require('sequelize')

class SegurancaService {
    async cadastrarAcl(dto) {
        const Tutores = await database.Tutores.findOne({
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
                id: dto.tutorId
            }
        })

        if (!Tutores) {
            throw new Error('Usuario não cadastrado')
        }

        const rolesCadastradas = await database.roles.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: dto.roles
                }
            }
        })

        const permissoesCadastradas = await database.permissoes.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: dto.permissoes
                }
            }
        })

        await Tutores.removeTutor_roles(Tutores.tutor_roles)
        await Tutores.removeTutor_permissoes(Tutores.tutor_permissoes)

        await Tutores.addTutor_roles(rolesCadastradas)
        await Tutores.addTutor_permissoes(permissoesCadastradas)

        const novoTutor = await database.Tutores.findOne({
            include: [
                {
                    model: database.roles,
                    as:'tutor_roles',
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

        return novoTutor
    }

    async cadastrarPermissoesRoles(dto) {
        const role = await database.roles.findOne({
            include: [
                {
                    model: database.permissoes,
                    as: 'roles_das_permissoes',
                    attributes: ['id', 'nome', 'descricao'],
                    through: {
                        attributes: [],
                    }
                }
            ],
            where: {
                id: dto.roleId
            }
        })

        if (!role) {
            throw new Error('Role não cadastrada')
        }

        const permissoesCadastradas = await database.permissoes.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: dto.permissoes
                }
            }
        })
        
        await role.removeRoles_das_permissoes(role.roles_das_permissoes)

        await role.addRoles_das_permissoes(permissoesCadastradas)

        const novaRole = await database.roles.findOne({
            include: [
                {
                    model: database.permissoes,
                    as: 'roles_das_permissoes',
                    attributes: ['id', 'nome', 'descricao'],
                    through: {
                        attributes: [],
                    }
                }
            ],
            where: {
                id: dto.roleId
            }
        })

        return novaRole
    }
}

module.exports = SegurancaService