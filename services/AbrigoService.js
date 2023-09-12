const database = require('../models');

class AbrigoService {
    async cadastrar(dto) {
        try {
            const Abrigo = await database.Abrigos.create({
                ong: dto.ong,
                cidade: dto.cidade,
                estado: dto.estado,
            });

            return Abrigo;
        } catch (error) {
            throw new Error(error);
        }
    }


    async buscarTodosAbrigos() {
        const Abrigos = await database.Abrigos.findAll()

        return Abrigos
    }

    async buscarAbrigoPorId(id) {
        const Abrigo = await database.Abrigos.findOne({
            where: {
                id: id
            }
        })

        if (!Abrigo) {
            throw new Error(' Não cadastrado')
        }

        return Abrigo

    }

    async atualizarAbrigo(dto) {
        const Abrigo = await this.buscarAbrigoPorId(dto.id)
        try {
            Abrigo.ong = dto.ong
            Abrigo.cidade = dto.cidade
            Abrigo.estado = dto.estado
            await Abrigo.save()
            return Abrigo
        } catch (error) {
            throw new Error('Erro ao editar Abrigo!')
        }
    }   

    async deletarAbrigo(id) {
        await this.buscarAbrigoPorId(id)

        try {
            await database.Abrigos.destroy({
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