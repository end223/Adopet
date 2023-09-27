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

    async buscarTodosPets(offset, limit) {
        const Pets = await database.Pets.findAll({
            where: {
                adotado: false,
            },
            offset: offset,
            limit: limit,
        });
    
        return Pets;
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
    
    async atualizarAdotado(petId) {
        try {
            const pet = await database.Pets.findOne({
                where: { id: petId },
            });

            if (!pet) {
                throw new Error('Pet não encontrado');
            }

            pet.adotado = true;
            await pet.save();

            return pet;
        } catch (error) {
            throw new Error('Erro ao atualizar adotado do Pet');
        }
    }

    async atualizarAdotadoFalse(petId) {
        try {
            const pet = await database.Pets.findOne({
                where: { id: petId },
            });

            if (!pet) {
                throw new Error('Pet não encontrado');
            }

            pet.adotado = false;
            await pet.save();

            return pet;
        } catch (error) {
            throw new Error('Erro ao atualizar adotado do Pet para false');
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