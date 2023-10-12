const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS, 
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log('Erro ao verificar a configuração do transporte:', error);
  } else {
    console.log('Configuração do transporte verificada com sucesso:', success);
  }
});


async function sendConfirmationEmail(userId, userEmail) {
  try {
    const confirmationLink = `${process.env.BASE_URL}/confirm?userId=${userId}`;
    const mailOptions = {
      from: 'ivanilde.pe.sousa2@hotmail.com',
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
      from: 'ivanilde.pe.sousa2@hotmail.com',
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
