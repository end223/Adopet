const PetService = require('../services/PetService')

const petService = new PetService()

class PetController {
    static async cadastrar(req, res) {
        const { nome, adotado, idade, porte, descricao, endereco, abrigos_id, imagem } = req.body

        try {
            const pets = await petService.cadastrar({ nome, adotado, idade, porte, descricao, endereco, abrigos_id, imagem })

            res.status(200).send(pets)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarTodosPets(req, res) {
        let { page } = req.query;
        const itemsPerPage = 10;
    
        // Defina o valor padrão da página como 1 se não for especificado na query
        if (!page || isNaN(parseInt(page))) {
            page = 1;
        } else {
            page = parseInt(page);
        }
    
        const offset = (page - 1) * itemsPerPage;
    
        try {
            const pets = await petService.buscarTodosPets(offset, itemsPerPage);
            res.status(200).send(pets);
        } catch (error) {
            res.status(400).send({ message: 'Não encontrado' });
        }
    }

    static async buscarPetsPorAbrigo(req, res) {
        const { abrigoId } = req.params;
        let { page } = req.query;
        const itemsPerPage = 10;
    
        // Defina o valor padrão da página como 1 se não for especificado na query
        if (!page || isNaN(parseInt(page))) {
            page = 1;
        } else {
            page = parseInt(page);
        }
    
        const offset = (page - 1) * itemsPerPage;
    
        try {
            const pets = await petService.buscarPetsPorAbrigo(abrigoId, offset, itemsPerPage);
            res.status(200).send(pets);
        } catch (error) {
            res.status(400).send({ message: 'Não encontrado' });
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
        const { nome, adotado, idade, porte, descricao, endereco, abrigos_id, imagem } = req.body

        try {
            const pet = await petService.atualizarPet({ id, nome, adotado, idade, porte, descricao, endereco, abrigos_id, imagem })

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