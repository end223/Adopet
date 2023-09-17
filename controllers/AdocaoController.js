const AdocaoService = require('../services/AdocaoService')
const petService = require('../services/PetService')

const adocaoService = new AdocaoService()
const PetService = new petService()


class AdocaoController {
    static async cadastrar(req, res) {
        const { pet_id, tutor_id, data } = req.body

        try {
            const adocao = await adocaoService.cadastrar({ pet_id, tutor_id, data });
        
            await PetService.atualizarAdotado(pet_id);
        
            const responseData = {
                adocao: {
                    id: adocao.id,
                    pet_id: adocao.pet_id,
                    tutor_id: adocao.tutor_id,
                    data: adocao.data,
                }
            };
        
            res.status(200).json(responseData);
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarTodasAdocao(req, res) {
        const adocao = await adocaoService.buscarTodasAdocao()
        try {
            res.status(200).send(adocao)
        } catch (error) {
            res.status(400).send({ message: 'Não encontrado' })
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

    static async atualizarAdocao(req, res) {
        const { id } = req.params
        const { pet_id, tutor_id, data } = req.body

        try {
            const adocao = await adocaoService.atualizarAdocao({ id, pet_id, tutor_id, data })

            res.status(200).json(adocao)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletarAdocao(req, res) {
        const { id } = req.params

        try {
            await adocaoService.deletarAdocao(id)

            await petService.atualizarAdotadoFalse(adocao.pet_id);

            res.status(200).json({ message: 'Adoção detelada com sucesso' })
        } catch (error) {
            res.status(400).send({ message: 'Erro ao deletar Adoção' })
        }
    }

}

module.exports = AdocaoController