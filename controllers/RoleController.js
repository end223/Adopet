const RoleService = require('../services/RoleService');
const roleService = new RoleService();

class RoleController {
    static async cadastrar (req, res) {
        const { nome, descricao } = req.body

        try {
            const role = await roleService.cadastrar({ nome, descricao })

            res.status(201).send(role)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = RoleController;