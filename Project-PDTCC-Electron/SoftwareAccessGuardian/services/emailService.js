const nodemailer = require('nodemailer');
const path = require('path');
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
    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 500px;
        margin: auto;
        padding: 25px;
        background-color: #174493;
        border-radius: 10px;
        text-align: center;
      ">

        <img
           src="cid:logoAccessGuardian"
           alt="Access Guardian"
           style="width: 150px; margin-bottom: 20px;"
        >

        <h2 style="color: #f3f3f3ff;">
          Recuperação de senha
        </h2>

        <p style="color: #f3f3f3ff; font-size: 15px;">
          Recebemos uma solicitação para redefinir sua senha.
          Utilize o código abaixo:
        </p>

        <div style="
          background-color: #ffffff;
          padding: 15px;
          margin: 20px 0;
          border-radius: 8px;
          font-size: 28px;
          font-weight: bold;
          letter-spacing: 5px;
          color: #222;
        ">
          ${codigo}
        </div>

        <p style="color: #f3f3f3ff; font-size: 13px;">
          Se você não solicitou essa alteração, ignore este e-mail.
        </p>

        <hr style="border: none; border-top: 1px solid #ddd;">

        <p style="color: #f3f3f3ff; font-size: 12px;">
          Access Guardian — Sistema de controle de acesso escolar
        </p>

      </div>
    `,

    attachments: [
      {
        filename: 'logo_fundo_azul.png',
        path: path.join(__dirname, '..', 'images', 'logos', 'logo_fundo_azul.png'),
        cid: 'logoAccessGuardian'
      }
    ]
  });
}
module.exports = {
  enviarCodigoEmail
};
