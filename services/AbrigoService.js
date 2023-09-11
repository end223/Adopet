const database = require('../models');

class AbrigoService {
    async cadastrar(dto) {
        try {
            const abrigo = await database.abrigos.create({
                ong: dto.ong,
                cidade: dto.cidade,
                estado: dto.estado,
                endereco: dto.endereco
            });

            return abrigo;
        } catch (error) {
            throw new Error('Erro ao cadastrar Abrigo');
        }
    }


    async buscarTodosAbrigos() {
        const abrigos = await database.abrigos.findAll()

        return abrigos
    }

    async buscarAbrigoPorId(id) {
        const abrigo = await database.abrigos.findOne({
            where: {
                id: id
            }
        })

        if (!abrigo) {
            throw new Error(' Não cadastrado')
        }

        return abrigo

    }

    async atualizarAbrigo(dto) {
        const abrigo = await this.buscarAbrigoPorId(dto.id)
        try {
            abrigo.ong = dto.ong
            abrigo.cidade = dto.cidade
            abrigo.estado = dto.estado
            abrigo.endereco = dto.endereco
            await abrigo.save()
            return abrigo
        } catch (error) {
            throw new Error('Erro ao editar Abrigo!')
        }
    }   

    async deletarAbrigo(id) {
        await this.buscarAbrigoPorId(id)

        try {
            await database.abrigos.destroy({
                where: {
                    id: id
                }
            })

        } catch (error) {
            throw new Error('Erro ao deletar abrigo!')
        }
    }

}

module.exports = AbrigoService