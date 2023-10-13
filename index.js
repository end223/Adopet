const express = require('express')
const routes = require('./routes')
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();

const app = express()
const port = process.env.PORT || 3001;

app.use(cors({ origin: 'https://adopet-spwr.onrender.com' }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://adopet-spwr.onrender.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use(passport.initialize());

routes(app)

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`))


module.exports = app