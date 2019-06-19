var express = require('express');
var router = express.Router();
var UserController = require('../../controllers/userController');
var {reCAPTCHA} = require('../../config/security');
var ticketController = require('../../controllers/TicketController')
var auth = require('../../helper/authentication')
var Ticket = require('../../models/Ticket');
var Product = require('../../models/Product');
var helpers = require('../../helper/Departments');
UserController.login();
router.get('/Ticket/create', function (req, res, next) {
    Product.find({}).then(result => {
        res.render('frontUsers/createTicket', {
            reCAPTCHA: reCAPTCHA.formElement(),
            products: result,
            departments: helpers.departments
        });
    })

});
router.post('/Ticket/create', function (req, res, next) {
    ticketController.addTicket(req.body.email, req.body.name, req.body.title, req.body.content, req.body.product, req.body.department);
    res.redirect('back');
    // reCAPTCHA.validateRequest(req)
    //     .then(function () {
    //         // validated and secure
    //         ticketController.addTicket(req.body.email,req.body.name,req.body.title,req.body.content,req.content.product);
    //         res.json('true')
    //     })
    //     .catch(function (errorCodes) {
    //         // invalid
    //         res.json({
    //             formSubmit: false,
    //             errors: reCAPTCHA.translateErrors(errorCodes) // translate error codes to human readable text
    //         });
    //     });

});
router.get('/Ticket/all', function (req, res, next) {
    Ticket.find({}).populate('product').then(result => {
        Product.find({}).then(products => {

            res.render('frontUsers/myTickets', {tickets: result, departments: helpers.departments, products: products});
        })
    })
});
router.post('/Ticket/update/:id', function (req, res, next) {
    Ticket.findByIdAndUpdate({_id: req.params.id}, {
        $set: {
            userName: req.body.name,
            email: req.body.email,
            title: req.body.title,
            content: req.body.content,
            product: req.body.product,
            department: req.body.department,
        }
    }).then(result => {
        res.redirect('/productSupport/Ticket/all');
    })
});
router.get('/Ticket/delete/:id', function (req, res, next) {

    Ticket.findByIdAndDelete({_id: req.params.id}).then(result => {
        res.redirect('/productSupport/Ticket/all');
    })
});
router.get('/signIn', function (req, res, next) {

    res.render('frontUsers/signIn');
});
router.post('/login', function (req, res, next) {
    UserController.userRedirect(req, res, next);
});
router.get('/userDashboard', auth.userAuthicated, function (req, res, next) {
    Ticket.find({}).populate('product').then(result => {
        Product.find({}).then(products => {
            res.render('frontUsers/dashboard', {
                reCAPTCHA: reCAPTCHA.formElement(),
                products: products,
                tickets: result,
                departments: helpers.departments
            });
        })

    })
});
router.post('/signIn', function (req, res, next) {
    UserController.adduser(req.body.name, req.body.email, req.body.password);
    res.redirect('/');
});
router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});
router.get('/email', function (req, res, next) {
    res.render('frontUsers/email');
});
module.exports = router;