const mailer = require('nodemailer');

function mail() {
    let transporter = mailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.MAIL_USER || "deltastream.dev@gmail.com",
            pass: process.env.MAIL_PASS
        }
    });

    return transporter;
}

module.exports = mail();