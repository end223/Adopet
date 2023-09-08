const bodyParser = require('body-parser')

const tutores = require('./tutoresRoutes')
const abrigos = require('./abrigosRoutes')

module.exports = app => {
    app.use(bodyParser.json(), 
    tutores, abrigos)
}