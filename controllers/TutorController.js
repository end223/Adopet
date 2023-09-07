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
}    

module.exports = TutorController