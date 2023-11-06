'use strict';

const nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');

const options = {
    viewEngine: {
        extName: '.hbs',
        // partialsDir: '/views/emails/',
        // layoutsDir: '',
        // defaultLayout: '',
    },
    // viewPath: path.join(__dirname, '../views/emails/')
};

let transporter = nodemailer.createTransport({
    //host: 'email-smtp.us-east-1.amazonaws.com',
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // true for 465, false for other ports,
    pool: true,
    rateLimit: 20,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PSWD
    }
});
transporter.use('compile', hbs(options));

const BASE_URL = process.env.BASE_URL;
const SENT_FROM = process.env.EMAIL;

module.exports = {
    emailXaabaar: function ({ sender_email, sender_name, sender_phone = '', subject = 'From Contact Page', message }) {
        const template = 'emailCBA';
        const data = {
            sender_name,
            sender_email,
            sender_phone,
            message,
            base_url: BASE_URL
        };

        const mailOptions = {
            from: sender_name + '<' + SENT_FROM + '>',
            to: 'uzosystems@gmail.com',
            replyTo: sender_email,
            subject: subject,
            template: template,
            context: data
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });
    }
}