const database = require('../models');

class PetService {
    async cadastrar(dto) {
        try {
            const Pet = await database.Pets.create({
                abrigos_id: dto.abrigos_id,
                nome: dto.nome,
                adotado: dto.adotado,   
                idade: dto.idade,
                descricao: dto.descricao,
                endereco: dto.endereco,
                imagem: dto.imagem    
            });

            return Pet;
        } catch (error) {
            throw new Error('Error ao cadastrar Pet');
        }
    }

    async buscarTodosPets() {
        const Pets = await database.Pets.findAll()

        return Pets
    }

    async buscarPetPorId(id) {
        const Pet = await database.Pets.findOne({
            where: {
                id: id
            }
        })

        if (!Pet) {
            throw new Error(' Pet Não cadastrado')
        }

        return Pet

    }

    async atualizarPet(dto) {
        const Pet = await this.buscarPetPorId(dto.id)
        try {
            Pet.abrigos_id = dto.abrigos_id
            Pet.nome = dto.nome
            Pet.adotado = dto.adotado
            Pet.idade = dto.idade
            Pet.descricao = dto.descricao
            Pet.endereco = dto.endereco
            Pet.imagem = dto.imagem
            await Pet.save()
            return Pet
        } catch (error) {
            throw new Error('Erro ao editar Pet!')
        }
    }   

    async deletarPet(id) {
        await this.buscarPetPorId(id)

        try {
            await database.Pets.destroy({
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