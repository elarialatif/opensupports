var {transporter} = require('../config/email');
var emailExistence = require('email-existence');
var Ticket = require('../models/Ticket')

module.exports = {
    addTicket: function (Email, name, Title,Content,product,department) {
        newTicket = new Ticket();
        newTicket.userName = name;
        newTicket.email = Email;
        newTicket.title = Title;
        newTicket.content = Content;
        newTicket.product = product;
        newTicket.department = department;
       // newTicket.productNo = 1;
        newTicket.save().then(res => {
            var mailOptions = {
            from: 'baderabed77@gmail.com',
            to: res.email,
            subject: 'Sending Email using Node.js',
            html: '<h1 style="color: red"> ticket created sucessfuly with no :  </h1> ' +
            '<h4>'+ res.id +'</h4>'
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        }).catch(err=>{
            console.log(err)
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
