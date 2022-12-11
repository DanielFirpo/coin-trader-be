const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASS,
      clientId: process.env.EMAIL_OAUTH_CLIENTID,
      clientSecret: process.env.EMAIL_OAUTH_CLIENT_SECRET,
      refreshToken: process.env.EMAIL_OAUTH_REFRESH_TOKEN
    }
  });

module.exports = function sendEmail(to, subject, html) {

    const message = {
        to: to,
        subject: subject,
        html: html,
        from: process.env.EMAIL_USERNAME

    };
    

    transport.sendMail(message, function(err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });

}