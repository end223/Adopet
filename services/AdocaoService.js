const database = require('../models');
const uuid = require('uuid');

class AdocaoService {
    async cadastrar(dto) {
        try {
            const adocao = await database.adocao.create({
                id: uuid.v4(),
                pet_id: dto.pet_id,
                tutor_id: dto.tutor_id,
                data: dto.data
            });

            return adocao;
        } catch (error) {
            throw new Error('Erro ao cadastrar Adoção');
        }
    }

    async buscarAdocaoPorId(id) {
        const adocao = await database.adocao.findOne({
            where: {
                id: id
            }
        })

        if (!adocao) {
            throw new Error(' Não cadastrado')
        }

        return adocao

    }

async deletarAdocao(id) {
    await this.buscarAdocaoPorId(id)

    try {
        await database.adocao.destroy({
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