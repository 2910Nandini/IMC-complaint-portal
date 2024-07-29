const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async function (email, title, body) {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS     //app specific password
      }
    });

    let info = await transporter.sendMail({
      from: "Indore Municipal Corporation",
      to: email,
      subject: title,
      html: body,
    });
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    //TODO: handle error here
    console.error(error.message);
    throw new Error('Failed to send OTP');
  }
};

module.exports = mailSender;