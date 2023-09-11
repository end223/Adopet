const database = require('../models');

class PetService {
    async cadastrar(dto) {
        try {
            const pet = await database.pets.create({
                abrigos_id: dto.abrigos_id,
                nome: dto.nome,
                adotado: dto.adotado,   
                idade: dto.idade,
                descricao: dto.descricao,
                endereco: dto.endereco,
                imagem: dto.imagem    
            });

            return pet;
        } catch (error) {
            throw new Error('Error ao cadastrar Pet');
        }
    }

    async buscarTodosPets() {
        const pets = await database.pets.findAll()

        return pets
    }

    async buscarPetPorId(id) {
        const pet = await database.pets.findOne({
            where: {
                id: id
            }
        })

        if (!pet) {
            throw new Error(' Pet Não cadastrado')
        }

        return pet

    }

    async atualizarPet(dto) {
        const pet = await this.buscarPetPorId(dto.id)
        try {
            pet.abrigos_id = dto.abrigos_id
            pet.nome = dto.nome
            pet.adotado = dto.adotado
            pet.idade = dto.idade
            pet.descricao = dto.descricao
            pet.endereco = dto.endereco
            pet.imagem = dto.imagem
            await pet.save()
            return pet
        } catch (error) {
            throw new Error('Erro ao editar Pet!')
        }
    }   

    async deletarPet(id) {
        await this.buscarPetPorId(id)

        try {
            await database.pets.destroy({
                where: {
                    id: id
                }
            })

        } catch (error) {
            throw new Error('Erro ao deletar Pet!')
        }
    }

}

module.exports = PetService