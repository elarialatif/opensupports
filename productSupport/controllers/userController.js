var User = require('../models/User');
var passwordHash = require('password-hash');
var passport = require('passport');
var passportLocal = require('passport-local').Strategy;
var logController = require('./logController');
var logAction = require('../helper/LogActions');
module.exports = {
    adduser: function (name, email, password, role, products, departments, authUser) {
        newuser = new User();
        newuser.name = name;
        newuser.email = email;
        newuser.role = role;
        newuser.products = products;
        newuser.departments = departments;
        newuser.password = passwordHash.generate(password);
        newuser.save().then(user => {
            let LogName = 'تم اضافة المستخدم رقم ';
            let Model = 'User';
            logController.addLog(LogName, authUser.name, Model, user.id, logAction.create);
        })
    },
    login: function () {

        passport.use(new passportLocal({usernameField: 'email'}, (email, password, done) => {

            User.findOne({email: email}).then(user => {
                //  user.test();

                if (!user) return done(null, false);

                if (user) {
                    if (!passwordHash.verify(password, user.password)) {
                        return done(null, false);
                    }
                    else {

                        return done(null, user);
                    }


                }
                // if(!user.validPassword()) return done(null,false,{message:'no user found'})
            })
        }));

        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });

        passport.deserializeUser(function (id, done) {
            User.findById(id, function (err, user) {
                done(err, user);
            });
        });
        // passport.authenticate('local', {
        //     successRedirect: '/admin',
        //     failureRedirect: '/login',
        //     failureFlash: true,
        // })
    },
    userRedirect: function (req, res, next) {

        passport.authenticate('local', {

            failureRedirect: '/',
            failureFlash: true,
        })(req, res, next => {
            if (req.user.role === 'user') {
                res.redirect('/productSupport/userDashboard')
            }
            else if (req.user.role === 'admin') {
                res.redirect('/admin/adminDashboard')
            }
        })
    }
}