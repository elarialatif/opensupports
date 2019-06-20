var express = require('express');
var FroalaEditor = require('wysiwyg-editor-node-sdk/lib/froalaEditor');
const fs = require('fs');
var passwordHash = require('password-hash');
var router = express.Router();
var UserController = require('../../controllers/userController');
var User = require('../../models/User');
var {reCAPTCHA} = require('../../config/security');
var ticketController = require('../../controllers/TicketController')
var auth = require('../../Middlewares/authentication')
var userMiddleware = require('../../Middlewares/user')
var adminMiddleware = require('../../Middlewares/admin')
var Ticket = require('../../models/Ticket');
var Product = require('../../models/Product');
var helpers = require('../../helper/Departments');
var Userhelper = require('../../helper/user');
var logController = require('../../controllers/logController');
var logAction = require('../../helper/LogActions')
var path = require('path');
UserController.login();

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'layouts/frontUsers/app';
    next();
});
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
router.post('/Ticket/all', function (req, res, next) {
    console.log(req.body);
    if (req.body.email || req.user) {
        userEmail = req.body.email || req.user.email;
        Ticket.find({email: userEmail}).populate('product').then(result => {
            Product.find({}).then(products => {

                res.render('frontUsers/myTickets', {
                    tickets: result,
                    departments: helpers.departments,
                    products: products
                });
            })
        })
    }
    else {
        res.redirect('/');
    }


});
router.post('/Ticket/update/:id', function (req, res, next) {
    var val;
    if (req.body.email) {
        val = {
            userName: req.body.name,
            email: req.body.email,
            title: req.body.title,
            content: req.body.content,
            product: req.body.product,
            department: req.body.department,
        }
    }
    else {
        let status = 'closed';
        if (req.body.status) {
            status = req.body.status;
        }

        val = {
            status:status,
            department: req.body.department,
        }
    }
    Ticket.findByIdAndUpdate({_id: req.params.id}, {
        $set:
        val

    }).then(result => {
        let LogName = 'تم تعديل  المشكلة  رقم ';
        let Model = 'Ticket';
        logController.addLog(LogName, req.user.name, Model, result.id, logAction.edit);
        res.redirect('back');
    })
});
router.get('/Ticket/delete/:id', function (req, res, next) {

    Ticket.findByIdAndDelete({_id: req.params.id}).then(result => {
        let LogName = 'تم مسح  المشكلة  رقم ';
        let Model = 'Ticket';
        logController.addLog(LogName, req.user.name, Model, result.id, logAction.delete);
        if (req.user.role === 'admin') {
            res.redirect('/admin/tickets/all');
        }
        else {
            res.redirect('/productSupport/Ticket/all');
        }

    })
});
router.get('/signIn', adminMiddleware.AdminAuthicated, function (req, res, next) {
    Product.find({}).then(products => {
        res.render('frontUsers/signIn', {
            roles: Userhelper.userTypes,
            products: products,
            departments: helpers.departments
        });
    })

});
router.post('/login', function (req, res, next) {
    UserController.userRedirect(req, res, next);
});
router.get('/userDashboard', userMiddleware.userAuthicated, function (req, res, next) {
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
    var errors = {};
    if (req.body.email) {
        User.findOne({email: req.body.email}).then(user => {
            if (user) {
                errors.user = 'الاميل موجود من قبل ';
            }
        })
    }
    if (!req.body.name) {
        errors.Name = 'الاسم مطلوب';
    }
    if (!req.body.email) {
        errors.email = 'الاميل  مطلوب';
    }
    if (!req.body.role) {
        errors.role = 'الصلاحية مطلوبة';
    }
    if (!req.body.products) {
        errors.products = 'المشروع  مطلوب';
    }
    if (!req.body.departments) {
        errors.departments = 'القسم مطلوب';
    }
    if (!req.body.password) {
        errors.password = 'رقم السر  مطلوب';
    }
    if (req.body.password !== req.body.repeated_password) {
        errors.repeated_password = 'كلمة السر غير متطابقة';
    }
    var form = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        departments: req.body.departments,
    };
    if (Object.keys(errors).length !== 0) {
        Product.find({}).then(products => {
            res.render('frontUsers/signIn', {
                roles: Userhelper.userTypes,
                products: products,
                departments: helpers.departments,
                errors: errors,
                form: form,
            });
        })
    }
    else {
        UserController.adduser(req.body.name, req.body.email, req.body.password, req.body.role, req.body.products, req.body.departments, req.user);
        res.redirect('/');
    }

});
router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});
router.post('/uploadeImageFromEditor', function (req, res, next) {
    // Store image.

    FroalaEditor.Image.upload(req, '../public/images/uploads/', function (err, data) {
        // Return data.
        if (err) {
            res.send(JSON.stringify(err));
        }
        var link = data.link.replace('../public', '');
        newdata = {link: link};
        res.send(newdata);
    });
});
router.post('/delete_file', function (req, res, next) {
    // Do delete.
    fs.unlink(path.join(__dirname, '../../public/' + req.body.src), function (err) {
        console.log(err)
        if (err) {
            res.status(404).end(JSON.stringify(err));
        }

        return res.end();
    });
});
router.post('/editProfile', function (req, res, next) {
    User.findOne({email: req.user.email}).then(user => {
        if (req.body.newEmail) {
            user.email = req.body.newEmail;
        } else {
            if (passwordHash.verify(req.body.oldPassword, user.password) && req.body.password === req.body.repeatNewPassword) {
                user.password = passwordHash.generate(req.body.password);
            }
            else {
                res.redirect('back')
            }

        }
        user.save().then(done => {
            res.redirect('/productSupport/logout');
        });

    }).catch(err => {
        console.log(err);
    });

});
module.exports = router;