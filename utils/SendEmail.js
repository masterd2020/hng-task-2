const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLEINT_SECRET,
      process.env.REDIRECT_URI
    );
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const sendEmail = async (receiverEmail, subject, message, name) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.SENDER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLEINT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: `Fasasi Toheeb <${process.env.SENDER_EMAIL}>`,
      to: process.env.SENDER_EMAIL,
      subject: subject,
      text: `${message} from ${receiverEmail}`,
      html: `<div><h5>${name}</h5><p>${receiverEmail}</p><br><p>${message}</p></div>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = sendEmail;