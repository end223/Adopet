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

}    

module.exports = PetController