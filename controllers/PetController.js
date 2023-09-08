const PetService = require('../services/PetService')

const petService = new PetService()

class PetController {
    static async cadastrar(req, res) {
        const { nome, porte, adotado, idade, descricao, endereco, abrigos_id, imagem } = req.body

        try {
            const pets = await petService.cadastrar({ nome, porte, adotado, idade, descricao, endereco, abrigos_id, imagem })

            res.status(200).send(pets)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarTodosPets(req, res) {
        const pets = await petService.buscarTodosPets()
        try {
            res.status(200).send(pets)
        } catch (error) {
            res.status(400).send({ message: 'Não encontrado' })
        }

    }

    static async buscarPetPorId(req, res) {
        try {
            const { id } = req.params
            const pet = await petService.buscarPetPorId(id)

            res.status(200).json(pet)
        } catch (error) {
            res.status(400).send({ message: 'Pet informado não encontrado' })
        }
    }

    static async atualizarPet(req, res) {
        const { id } = req.params
        const { nome, porte, adotado, idade, descricao, endereco, abrigos_id, imagem } = req.body

        try {
            const pet = await petService.atualizarPet({ id, nome, porte, adotado, idade, descricao, endereco, abrigos_id, imagem })

            res.status(200).json(pet)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletarPet(req, res) {
        const { id } = req.params

        try {
            await petService.deletarPet(id)

            res.status(200).json({ message: 'Pet deletado com sucesso' })
        } catch (error) {
            res.status(400).send({ message: 'Erro ao deletar Pet' })
        }
    }

}    

module.exports = PetController