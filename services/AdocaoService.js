const database = require('../models');
const uuid = require('uuid');

class AdocaoService {
    async cadastrar(dto) {
        try {
            const Adocao = await database.Adocao.create({
                id: uuid.v4(),
                pet: dto.pet,
                tutor: dto.tutor,
                data: dto.data,
            });

            return Adocao;
        } catch (error) {
            throw new Error(error);
        }
    }

    async buscarTodasAdocao(offset, limit) {
        const Adocoes = await database.Adocao.findAll({
            offset: offset,
            limit: limit,
        });
    
        return Adocoes;
    }
    

    async buscarAdocaoPorId(id) {
        const Adocao = await database.Adocao.findOne({
            where: {
                id: id
            }
        })

        if (!Adocao) {
            throw new Error('Não cadastrada')
        }

        return Adocao

    }

    async atualizarAdocao(dto) {
        const Adocao = await this.buscarAdocaoPorId(dto.id)
        try {
            Adocao.pet = dto.pet
            Adocao.tutor = dto.tutor
            Adocao.data = dto.data
            await Adocao.save()
            return Adocao
        } catch (error) {
            throw new Error('Erro ao editar Adocao!')
        }
    } 

async deletarAdocao(id) {
    await this.buscarAdocaoPorId(id)

    try {
        await database.Adocao.destroy({
            where: {
                id: id
            }
        })

    } catch (error) {
        throw new Error('Erro ao deletar Adoção!')
    }
}

}

module.exports = AdocaoService