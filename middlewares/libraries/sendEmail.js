const nodemailer = require('nodemailer');

const sendEmail = async (mailOptions) => {
  let transporter = nodemailer.createTransport({
    host: process.env.STMP_HOST,
    port: process.env.STMP_PORT,
    auth: {
      user: process.env.STMP_USER,
      pass: process.env.STMP_PASS,
    },
  });

  let info = await transporter.sendMail(mailOptions);
  console.log(`!: sendEmail -> info`, info);
};

module.exports = sendEmail;
