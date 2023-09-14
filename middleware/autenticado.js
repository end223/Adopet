const { verify, decode } = require ('jsonwebtoken');
const jsonSecret = require ('../config/jsonSecret.js');


module.exports = async (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).send('Acess token não informado')
    }

    const [, acessToken] = token.split(" ")

    try {
        verify(acessToken, jsonSecret.secret)

        const { id, email } = await decode(acessToken)

        req.tutorId = id
        req.tutorEmail = email
        
        return next()

    } catch (error) {
        res.status(401).send('Usuario não autorizado')
    }
}