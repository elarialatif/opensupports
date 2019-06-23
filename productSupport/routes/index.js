var express = require('express');
var router = express.Router();
var Comment = require('../models/Comment');
var Ticket = require('../models/Ticket');
var auth = require('../Middlewares/authentication');
var Notification = require('../config/notification');
/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.user) {
        res.redirect('back');
    }
    else {
        res.render('index', {title: 'Express'});
    }

});
router.post('/addComment', auth.userAuthicated, function (req, res, next) {
    let comment = new Comment();
    comment.comment = req.body.comment;
    comment.user = req.user.id;
    comment.ticket = req.body.ticket_id;
    comment.save().then(result => {
        Comment.findById({_id: result.id}).populate('user').then(comment => {
            var sendTo = '';
            if (req.user.role === 'admin') {
                Ticket.findById({_id: req.body.ticket_id}).then(ticket => {

                    Notification.addNotifction(`<a href="/admin/ticket/view/${req.body.ticket_id}">${req.body.ticket_id}تمت اضافة رد على المشكلة رقم  #</a> `, req.user.id, ticket.workedBy, 'adminComment');
                    sendTo = ticket.workedBy;
                })
            } else {
                Notification.addNotifction(`<a href="/admin/ticket/view/${req.body.ticket_id}">${req.body.ticket_id}تمت اضافة رد على المشكلة رقم  #</a> `, req.user.id, '', 'userCommit');

            }

            res.send({
                comment: comment,
                message: `<a href="/admin/ticket/view/${req.body.ticket_id}">${req.body.ticket_id}تمت اضافة رد على المشكلة رقم  #</a> `,
                sendTo:sendTo,
            });
        })

    }).catch(err => {
        console.log(err)
        res.send({err: 'an error happened please try again '});
    })
});
router.get('/deleteComment/:id', auth.userAuthicated, function (req, res, next) {
    Comment.findByIdAndDelete({_id: req.params.id}).then(comment => {
        res.redirect('back');
    })
});
module.exports = router;
