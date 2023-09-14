const bodyParser = require('body-parser')

const tutores = require('./tutoresRoutes')
const abrigos = require('./abrigosRoutes')
const pets = require('./petsRoutes')
const adocao = require('./adocaoRoutes')
const auth = require('./authRoutes')
const role = require('./role')

module.exports = app => {
    app.use(bodyParser.json(), 
    auth, tutores, abrigos,
    pets, adocao, role)
}