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
            });

            return Adocao;
        } catch (error) {
            throw new Error(error);
        }
    }

    async buscarTodasAdocao() {
        const Adocao = await database.Adocao.findAll()

        return Adocao
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
            Adocao.pet_id = dto.pet_id
            Adocao.tutor_id = dto.tutor_id
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