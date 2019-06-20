var express = require('express');
var Ticket = require('../../../models/Ticket');
var router = express.Router();

router.get('/assign/:ticket_id', function (req, res, next) {
    Ticket.findById({_id: req.params.ticket_id}).then(ticket => {
        ticket.workedBy = req.user.id;
        ticket.save().then(done => {
            res.redirect('back');
        })
    })


});

module.exports = router;