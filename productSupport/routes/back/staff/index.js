var express = require('express');
var Ticket = require('../../../models/Ticket');
var Log = require('../../../models/Log');
var Comment = require('../../../models/Comment');
var logAction = require('../../../helper/LogActions');
var staffMiddleware = require('../../../Middlewares/stuff');
var router = express.Router();
router.all('/*', staffMiddleware.stuffAuthicated, (req, res, next) => {
    req.app.locals.layout = 'layouts/backUsers/app';
    next();
});
router.get('/assign/:ticket_id', function (req, res, next) {
    Ticket.findById({_id: req.params.ticket_id}).then(ticket => {
        ticket.workedBy = req.user.id;
        ticket.save().then(done => {
            res.redirect('back');
        })
    })


});
router.get('/dashboard', function (req, res, next) {
    Ticket.find({}).then(tickets => {
        Ticket.find({$and: [{status: 'closed', workedBy: req.user.id}]}).then(closedTickets => {
            Log.find({email: req.user.email}).then(logs => {
                Comment.find({user: req.user.id}).then(comments => {
                    res.render('backUsers/staff/dashboard', {
                        allTickets: Object.keys(tickets).length,
                        closedTickets: Object.keys(closedTickets).length,
                        comments: Object.keys(comments).length,
                        logs: logs,
                        logAction: logAction
                    });
                })

            });


        })
    })


});
module.exports = router;