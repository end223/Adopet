const database = require('../models');

class PetService {
    async cadastrar(dto) {
        try {
            const pet = await database.pets.create({
                nome: dto.nome,
                porte: dto.porte,
                adotado: dto.adotado,   
                idade: dto.idade,
                descricao: dto.descricao,
                endereco: dto.endereco,
                abrigos_id: dto.abrigos_id,
                imagem: dto.imagem    
            });

            return pet;
        } catch (error) {
            throw new Error('Error ao cadastrar Pet');
        }
    }

}

module.exports = PetService