var nodemailer = require('nodemailer');
module.exports = {
    transporter:   nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'baderabed77@gmail.com',
                pass: '20120145'
            }
        })

};


