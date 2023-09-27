// config/passportConfig.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Strategy: BearerStrategy } = require('passport-http-bearer');
const AuthService = require('../services/AuthService');
const allowlist = require('./allowlist'); 

const authService = new AuthService();

// Configuração da estratégia Local
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'senha',
    },
    async (email, senha, done) => {
      try {
        const user = await authService.findByEmail(email);

        if (!user) {
          return done(null, false, { message: 'Usuário não encontrado' });
        }

        const senhaCorreta = await authService.verificarSenha(user, senha);

        if (!senhaCorreta) {
          return done(null, false, { message: 'Senha incorreta' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Configuração da estratégia Bearer
passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const isTokenAuthorized = await allowlist.verificar(token);
      if (!isTokenAuthorized) {
        return done(null, false, { message: 'Token inválido' });
      }

      const user = await authService.verifyToken(token);

      if (!user) {
        return done(null, false, { message: 'Usuário não encontrado' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);


module.exports = passport;
