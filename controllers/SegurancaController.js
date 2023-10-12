const SegurancaService = require('../services/SegurancaService');
const segurancaService = new SegurancaService()

class SegurancaController {
    static async cadastrarAcl(req, res) {
        const { roles, permissoes } = req.body
        const { user } = req

        try {
            const acl = await segurancaService.cadastrarAcl({ roles, permissoes }, user.id);

            res.status(201).send(acl)
        } catch (error) {
            res.status(400).send({ message: error.message})
            console.error('Message error: ', error.message)
        }
    }

    static async cadastrarPermissoesRoles(req, res) {
        const { roleId, permissoes } = req.body

        try {
            const permissoesRole = await segurancaService.cadastrarPermissoesRoles({ roleId, permissoes})

            res.status(201).send(permissoesRole)
        } catch (error) {
            res.status(400).send({ message: error.message})
        }
    }
}

module.exports = SegurancaController