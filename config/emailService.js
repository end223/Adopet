const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

async function sendConfirmationEmail(userId, userEmail) {
  try {
    const confirmationLink = `${process.env.BASE_URL}/confirm?userId=${userId}`;
    const mailOptions = {
      from: '<adopet@adopet.com.br>',
      to: userEmail,
      subject: 'Confirmação de E-mail',
      text: `Clique no link a seguir para confirmar seu e-mail: ${confirmationLink}`,
    };

    const info = await transporter.sendMail(mailOptions);
    return ({ message: 'E-mail de confirmação enviado' });
  } catch (error) {
    return ({ message:'Erro ao enviar e-mail de confirmação: '})
  }
}

async function enviarEmailRedefinicaoSenha(userEmail, resetLink) {
  try {
    const mailOptions = {
      from: '<adopet@adopet.com.br>',
      to: userEmail,
      subject: 'Redefinição de Senha',
      text: `Clique no link a seguir para redefinir sua senha: ${resetLink}`,
    };

    const info = await transporter.sendMail(mailOptions);
    return ({ message: 'E-mail de redefinição de senha enviado' });
  } catch (error) {
    return ({ message:'Erro ao enviar e-mail de redefinição de senha'})
  }
}

module.exports = {
  sendConfirmationEmail,
  enviarEmailRedefinicaoSenha,
};
