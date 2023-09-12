const database = require('../models');
const uuid = require('uuid');

class AdocaoService {
    async cadastrar(dto) {
        try {
            const Adocao = await database.Adocao.create({
                id: uuid.v4(),
                pet_id: dto.pet_id,
                tutor_id: dto.tutor_id,
                data: dto.data,
                status: dto.status
            });

            return Adocao;
        } catch (error) {
            throw new Error(error);
        }
    }

    async buscarAdocaoPorId(id) {
        const Adocao = await database.Adocao.findOne({
            where: {
                id: id
            }
        })

        if (!Adocao) {
            throw new Error(' Não cadastrado')
        }

        return Adocao

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