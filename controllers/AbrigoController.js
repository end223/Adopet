const AbrigoService = require('../services/AbrigoService')

const abrigoService = new AbrigoService()

class AbrigoController {
    static async cadastrar(req, res) {
        const { ong, cidade, estado, endereco, telefone } = req.body

        try {
            const abrigos = await abrigoService.cadastrar({ ong, cidade, estado, endereco, telefone })

            res.status(200).send(abrigos)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarTodosAbrigos(req, res) {
        const abrigos = await abrigoService.buscarTodosAbrigos()
        try {
            res.status(200).send(abrigos)
        } catch (error) {
            res.status(400).send({ message: 'Não encontrado' })
        }

    }

    static async buscarAbrigoPorId(req, res) {
        try {
            const { id } = req.params
            const abrigo = await abrigoService.buscarAbrigoPorId(id)

            res.status(200).json(abrigo)
        } catch (error) {
            res.status(400).send({ message: 'Abrigo informado não encontrado' })
        }
    }

    static async atualizarAbrigo(req, res) {
        const { id } = req.params
        const { ong, cidade, estado, endereco, telefone } = req.body

        try {
            const abrigo = await abrigoService.atualizarAbrigo({ id, ong, cidade, estado, endereco, telefone })

            res.status(200).json(abrigo)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletarAbrigo(req, res) {
        const { id } = req.params

        try {
            await abrigoService.deletarAbrigo(id)

            res.status(200).json({ message: 'Abrigo deletado com sucesso' })
        } catch (error) {
            res.status(400).send({ message: 'Erro ao deletar Abrigo' })
        }
    }

}

module.exports = AbrigoController