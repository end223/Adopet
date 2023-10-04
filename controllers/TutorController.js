const TutorService = require('../services/TutorService')
const AuthService = require('../services/AuthService');

const authService = new AuthService();

const tutorService = new TutorService()

class TutorController {
    static async cadastrar(req, res) {
        const { nome, email, senha } = req.body

        try {
            const tutor = await tutorService.cadastrar({ nome, email, senha })

            res.status(200).send(tutor)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async registrar(req, res) {
        const { nome, email, senha, confirmarSenha } = req.body;
    
        try {
          if (senha !== confirmarSenha) {
            return res.status(400).send({ message: 'As senhas não coincidem' });
          }
    
          const novoTutor = await tutorService.registrar({
            nome,
            email,
            senha,
            confirmarSenha, // Não é necessário incluir isso aqui, apenas para fins de documentação
          });
    
          res.status(201).send( novoTutor );
        } catch (error) {
          res.status(400).send({ message: error.message });
        }
      }
    
    

    static async buscarTodosTutores(req, res) {
        const tutores = await tutorService.buscarTodosTutores()
        try {
            res.status(200).send(tutores)
        } catch (error) {
            res.status(400).send({ message: 'Não encontrado' })
        }

    }

    static async buscarTutorPorId(req, res) {
        try {
            const { id } = req.params
            const tutor = await tutorService.buscarTutorPorId(id)

            res.status(200).json(tutor)
        } catch (error) {
            res.status(400).send({ message: 'Tutor informado não encontrado' })
        }
    }

    static async atualizarTutor(req, res) {
        const { id } = req.params
        const { nome, telefone } = req.body

        try {
            const tutor = await tutorService.atualizarTutor({ id, nome, telefone })

            res.status(200).json(tutor)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletarTutor(req, res) {
        const { id } = req.params

        try {
            await tutorService.deletarTutor(id)

            res.status(200).json({ message: 'Tutor deletado com sucesso' })
        } catch (error) {
            res.status(400).send({ message: 'Erro ao deletar Tutor' })
        }
    }

}

module.exports = TutorController