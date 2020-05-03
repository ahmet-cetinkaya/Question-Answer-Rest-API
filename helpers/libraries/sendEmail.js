const nodemailer = require('nodemailer');

const sendEmail = async (mailOptions) => {
  let transporter = nodemailer.createTransport({
    // host: process.env.STMP_HOST,
    // port: process.env.STMP_PORT,
    service: 'Gmail',
    auth: {
      user: process.env.STMP_USER,
      pass: process.env.STMP_PASS,
    },
  });

  let info = await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
