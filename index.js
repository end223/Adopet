const express = require('express')
const routes = require('./routes')
const passport = require('passport');


const app = express()
const port = 8000

app.use(passport.initialize());

routes(app)

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`))


module.exports = app