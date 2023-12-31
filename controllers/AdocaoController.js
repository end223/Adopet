const AdocaoService = require('../services/AdocaoService')
const petService = require('../services/PetService')

const adocaoService = new AdocaoService()
const PetService = new petService()


class AdocaoController {
    static async cadastrar(req, res) {
        const { pet } = req.body;
        const tutorId = req.user.id;
        const data = new Date(); 

        try {
            const adocao = await adocaoService.cadastrar({ pet, tutor: tutorId, data });
        
            await PetService.atualizarAdotado(pet);
        
            const responseData = {
                adocao: {
                    id: adocao.id,
                    pet: adocao.pet,
                    tutor: adocao.tutor,
                    data: adocao.data,
                }
            };
        
            res.status(200).json(responseData);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async buscarTodasAdocao(req, res) {
        let { page } = req.query;
        const itemsPerPage = 10;
    
        if (!page || isNaN(parseInt(page))) {
            page = 1;
        } else {
            page = parseInt(page);
        }
    
        const offset = (page - 1) * itemsPerPage;
    
        try {
            const adocoes = await adocaoService.buscarTodasAdocao(offset, itemsPerPage);
            res.status(200).send(adocoes);
        } catch (error) {
            res.status(400).send({ message: 'Não encontrado' });
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
        const { pet, tutor, data } = req.body

        try {
            const adocao = await adocaoService.atualizarAdocao({ id, pet, tutor, data })

            res.status(200).json(adocao)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletarAdocao(req, res) {
        const { id } = req.params

        try {
            await adocaoService.deletarAdocao(id)

            await PetService.atualizarAdotadoFalse(adocao.pet);

            res.status(200).json({ message: 'Adoção detelada com sucesso' })
        } catch (error) {
            res.status(400).send({ message: 'Erro ao deletar Adoção' })
        }
    }

}

module.exports = AdocaoController