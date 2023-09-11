const bodyParser = require('body-parser')

const tutores = require('./tutoresRoutes')
const abrigos = require('./abrigosRoutes')
const pets = require('./petsRoutes')
const adocao = require('./adocaoRoutes')

module.exports = app => {
    app.use(bodyParser.json(), 
    tutores, abrigos, pets, adocao)
}