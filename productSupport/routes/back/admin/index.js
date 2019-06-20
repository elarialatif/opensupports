var express = require('express');
var router = express.Router();
var productController = require('../../../controllers/productController');
var Ticket = require('../../../models/Ticket');
var Product = require('../../../models/Product');
var User = require('../../../models/User');
var helpers = require('../../../helper/Departments');
var auth = require('../../../Middlewares/authentication')
var AdminAuth = require('../../../Middlewares/admin')
var logController = require('../../../controllers/logController');
var logAction = require('../../../helper/LogActions');
var Log = require('../../../models/Log');
var Comment = require('../../../models/Comment')
/* GET home page. */
router.all('/*', AdminAuth.AdminAuthicated, (req, res, next) => {
    req.app.locals.layout = 'layouts/backUsers/app';
    next();
});
router.get('/products', function (req, res, next) {
    Product.find({}).then(result => {
        res.render('backUsers/admin/products', {title: 'Express', products: result});
    })
});
router.get('/products/delete/:id', function (req, res, next) {

    Product.findByIdAndDelete({_id: req.params.id}).then(result => {

        let LogName = 'تم مسح  المنتج  رقم ';
        let Model = 'Product';
        logController.addLog(LogName, req.user.name, Model, result.id, logAction.delete);
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
        let LogName = 'تم تعديل  المنتج  رقم ';
        let Model = 'Product';
        logController.addLog(LogName, req.user.name, Model, result.id, logAction.edit);
        res.redirect('/admin/products');
    })
});
router.post('/products/create', function (req, res, next) {
    product = productController.addProduct(req.body.name, req.user);
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
        Comment.find({ticket: req.params.id}).then(comments => {
            res.render('backUsers/admin/viewTicket', {
                ticket: ticket,
                departments: helpers.departments,
                comments: comments
            });
        })

    });
});
router.get('/allUsers', function (req, res, next) {
    User.find({}).then(users => {
        res.render('backUsers/admin/users', {users: users});
    })
});
router.get('/adminDashboard', function (req, res, next) {
    Ticket.find({}).then(tickets => {
        Ticket.find({status: 'closed'}).then(closedTickets => {
            User.find({}).then(users => {
                Log.find({}).then(logs => {
                    Comment.find({}).then(comments => {
                        res.render('backUsers/admin/adminDashboard', {
                            allTickets: Object.keys(tickets).length,
                            closedTickets: Object.keys(closedTickets).length,
                            users: Object.keys(users).length,
                            comments: Object.keys(comments).length,
                            logs: logs,
                            logAction: logAction
                        });
                    })

                });

            });

        })
    })


});
router.get('/myAccount', function (req, res, next) {

    res.render('backUsers/admin/myAccount');

});
module.exports = router;