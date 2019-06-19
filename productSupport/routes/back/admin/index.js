var express = require('express');
var router = express.Router();
var productController = require('../../../controllers/productController');
var Ticket = require('../../../models/Ticket');
var Product = require('../../../models/Product');
var User = require('../../../models/User');
var helpers = require('../../../helper/Departments');
var auth = require('../../../helper/authentication')
/* GET home page. */
router.all('/*',auth.userAuthicated, (req, res, next) => {
    next();
});
router.get('/products', function (req, res, next) {
    Product.find({}).then(result => {
        res.render('backUsers/admin/products', {title: 'Express', products: result});
    })
});
router.get('/products/delete/:id', function (req, res, next) {
    console.log(req.params.id)
    Product.findByIdAndDelete({_id: req.params.id}).then(result => {
        res.redirect('/admin/products');
    })
});
router.post('/products/update/:id', function (req, res, next) {
    console.log(req.params.id)
    Product.findByIdAndUpdate({_id: req.params.id}, {
        $set: {
            name: req.body.name
        }
    }).then(result => {
        res.redirect('/admin/products');
    })
});
router.post('/products/create', function (req, res, next) {
    product = productController.addProduct(req.body.name);
    product.then(result => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(result));
    })
});
router.get('/tickets/all', function (req, res, next) {
    Ticket.find({}).populate('product').then(tickets => {

        res.render('backUsers/admin/tickets', {title: 'Express', tickets: tickets, departments: helpers.departments});
    });
});
router.get('/ticket/view/:id', function (req, res, next) {
    Ticket.findById({_id: req.params.id}).populate('product').then(ticket => {

        res.render('backUsers/admin/viewTicket', {ticket: ticket, departments: helpers.departments});
    });
});
router.get('/allUsers', function (req, res, next) {
    User.find({}).then(users => {
        res.render('backUsers/admin/users', {users: users});
    })
});
router.get('/adminDashboard', function (req, res, next) {

        res.render('backUsers/admin/adminDashboard');

});
module.exports = router;