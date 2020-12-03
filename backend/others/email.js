const nodemailer= require('nodemailer');

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "144c8b9973b2ae",
      pass: "649595e89d0b75"
    }
  });

  const sendMail = async function(to,token){
    const mailOptions = {
        from : process.env.ADMIN_MAIL,
        to : to,
        subject: 'Password reset token',
        text: `In order to reset your password send a post request to /api/v1/users/password-reset/${to}/${token} or goto /password-reset/${to}/${token}`,
        html: `In order to reset your password send a post request to /api/v1/users/password-reset/${to}/${token} or goto <a href="localhost:3000/password-reset/${to}/${token}"> /password-reset/${to}/${token}</a>`
    }

    await transport.sendMail(mailOptions);
}

module.exports = sendMail;