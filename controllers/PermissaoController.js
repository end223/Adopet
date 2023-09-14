const PermissaoService = require('../services/PermissaoService')
const permissaoService = new PermissaoService()

class PermissaoController {
    static async cadastrar (req, res) {
        const { nome, descricao } = req.body

        try {
            const permissao = await permissaoService.cadastrar({ nome, descricao })
            
            return res.status(201).json(permissao)
        } catch (error) {
            res.status(400).json({ message: error.message})
        }
    }

}

module.exports = PermissaoController