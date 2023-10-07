const nodeMailer = require('nodemailer');
require('dotenv').config();
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASSWORD
    }
});

async function mailLink(emailToSend, linkMade, attachmentsGiven = [], subject = "") {
    let mailOptions = {
        from: process.env.MAIL_EMAIL,
        to: emailToSend,
        subject: subject,
        text: linkMade,
        attachments: attachmentsGiven
    }
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                reject();
            } else {
                console.log('Email sent: ' + info.response);
                resolve();
            }
        });
    })
}

module.exports = {
    mailLink
}