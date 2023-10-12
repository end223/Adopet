const express = require('express')
const routes = require('./routes')
const passport = require('passport');
const cors = require('cors'); // Importe o pacote cors


const app = express()
const port = process.env.PORT || 3001;

app.use(cors());

app.use(passport.initialize());

routes(app)

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`))


module.exports = app