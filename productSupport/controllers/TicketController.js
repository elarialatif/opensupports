var {transporter} = require('../config/email');
var emailExistence = require('email-existence');
var Ticket = require('../models/Ticket')
var logController = require('./logController');
var logAction = require('../helper/LogActions');
module.exports = {
    addTicket: function (Email, name, Title, Content, product, department) {

        Ticket.findOne().limit(1).sort({$natural: -1}).then(res => {
            let number = 1;
            if (res && res.number) {
                number = Number(res.number) + 1;
            }
            newTicket = new Ticket();
            newTicket.userName = name;
            newTicket.email = Email;
            newTicket.title = Title;
            newTicket.content = Content;
            newTicket.product = product;
            newTicket.number = number;
            newTicket.department = department;
            // newTicket.productNo = 1;
            newTicket.save().then(res => {
                var mailOptions = {
                    from: 'baderabed77@gmail.com',
                    to: res.email,
                    subject: 'Sending Email using Node.js',
                    html: '<h1 style="color: red"> ticket created sucessfuly with no :  </h1> ' +
                    '<h4>' + res.id + '</h4>'
                };
                let LogName = 'تم اضافة المشكلة رقم ';
                let Model = 'Ticket';
                logController.addLog(LogName, name, Model, res.id, logAction.create, Email);
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            }).catch(err => {
                console.log(err)
            });
        });


    },

}
// emailExistence.check(req.body.email, function (error, response) {
//     if (response) {
//         var mailOptions = {
//             from: 'badrabed66@gmail.com',
//             to: req.body.email,
//             subject: 'Sending Email using Node.js',
//             text: req.body.content
//         };
//         transporter.sendMail(mailOptions, function (error, info) {
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log('Email sent: ' + info.response);
//             }
//         });
//         res.send('email send ');
//     }
//     else {
//         res.send('email  not vaild ');
//     }
//
//
// });
