const TutorService = require('../services/TutorService')

const tutorService = new TutorService()

class TutorController {
    static async cadastrar(req, res) {
        const { nome, email, senha } = req.body

        try {
            const tutor = await tutorService.cadastrar({ nome, email, senha})
    
            res.status(200).send(tutor)
        } catch (error) {
            res.status(400).send({ message: error.message})
        }
    }

    static async buscarTodosTutores(req, res) {
       const tutores = await tutorService.buscarTodosTutores()
       try {
           res.status(200).send(tutores)
       } catch (error) {
        res.status(400).send({ message: 'Não encontrado'})
       }

    }
    
    static async buscarTutorPorId(req, res) {
        try {
            const { id } = req.params
            const tutor = await tutorService.buscarTutorPorId(id)
    
            res.status(200).json(tutor)
        } catch (error) {
            res.status(400).send({ message: 'Tutor informado não encontrado'})
        }
    }

}        

module.exports = TutorController