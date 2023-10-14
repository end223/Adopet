const express = require('express');
const routes = require('./routes');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: [
  'https://adopet-spwr.onrender.com',
  'https://adopet-mm6rzcr19-dontkxsh-gmailcom.vercel.app'
],

  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Content-Type, Authorization'
}));

app.use(passport.initialize());

routes(app);

app.listen(port, () => console.log(`Servidor está rodando na porta ${port}`));

module.exports = app;
