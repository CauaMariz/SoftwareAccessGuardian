const nodemailer = require('nodemailer');
const transportMail = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true', 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function enviarCodigoEmail(email, codigo) {
  await transportMail.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Sistema de recuperação de senha - Access Guardian',
    text: `Seu código de recuperação é: ${codigo}`
  });
}
module.exports = {
  enviarCodigoEmail
};
