const bodyParser = require('body-parser')

const tutores = require('./tutoresRoutes')

module.exports = app => {
    app.use(bodyParser.json(), 
    tutores)
}