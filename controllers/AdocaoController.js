const AdocaoService = require('../services/AdocaoService')

const adocaoService = new AdocaoService()

class AdocaoController {
    static async cadastrar(req, res) {
        const { pet_id, tutor_id, data, status } = req.body

        try {
            const adocao = await adocaoService.cadastrar({ pet_id, tutor_id, data, status })
            const responseData = {
                adocao: {
                    id: adocao.id,
                    pet_id: adocao.pet_id,
                    tutor_id: adocao.tutor_id,
                    data: adocao.data,
                    status: adocao.status
                }
            };

            res.status(200).json(responseData);
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarAdocaoPorId(req, res) {
        try {
            const { id } = req.params
            const adocao = await adocaoService.buscarAdocaoPorId(id)

            res.status(200).json(adocao)
        } catch (error) {
            res.status(400).send({ message: 'Adoção informada não encontrada' })
        }
    }

    static async deletarAdocao(req, res) {
        const { id } = req.params

        try {
            await adocaoService.deletarAdocao(id)

            res.status(200).json({ message: 'Adoção detelada com sucesso' })
        } catch (error) {
            res.status(400).send({ message: 'Erro ao deletar Adoção' })
        }
    }

}

module.exports = AdocaoController