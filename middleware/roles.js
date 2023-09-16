const database = require('../models')

const roles = (listaRoles) => {
    return async (req, res, next) => {
        const { tutorId } = req

        const tutor = await database.Tutores.findOne({
            include: [
                {
                    model: database.roles,
                    as: 'tutor_roles',
                    attributes: ['id', 'nome']
                }
            ],
            where: {
                id: tutorId
            }
        })    
        
        if (!tutor) {
            return res.status(401).send('Tutor não cadastrado')
        }

        const rolesCadastradas = tutor.tutor_roles
            .map(role => role.nome)
            .some((role) => listaRoles.includes(role))
            
        if (!rolesCadastradas) {
            return res.status(401).send('Você não tem permissão para acessar esse recurso')
        }

        return next()
    }
}

module.exports = roles